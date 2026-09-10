#!/usr/bin/env python3
"""Estrae cataloghi, ricette e quiz dalle funzioni lineari dei bundle Hermes.

Richiede ``hermes-dec``. Gli output predefiniti sono documentali e separati dai
file importati dalla web app; per sostituire un output esistente serve
``--force``.
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path
from typing import Any

from hermes_dec.parsers.hbc_bytecode_parser import parse_hbc_bytecode
from hermes_dec.parsers.hbc_file_parser import HBCReader
from hermes_dec.parsers.serialized_literal_parser import TagType, unpack_slp_array


@dataclass(frozen=True)
class DatasetSpec:
    key: str
    version: str
    kind: str
    function_id: int
    function_offset: int
    root_key: str
    bundle: Path
    output_name: str


def decode_values(reader: HBCReader, data: bytes, offset: int, count: int) -> list[Any]:
    values: list[Any] = []
    serialized = unpack_slp_array(data[offset:], count, reader.header.version)
    for item in serialized.items:
        if item.tag_type in (
            TagType.LongStringTag,
            TagType.ShortStringTag,
            TagType.ByteStringTag,
        ):
            values.append(reader.strings[item.value])
        else:
            values.append(item.value)
    if len(values) != count:
        raise ValueError(
            f"Literal buffer incompleto: attesi {count} valori, trovati {len(values)}"
        )
    return values


def decode_buffered_object(reader: HBCReader, instruction: Any) -> dict[str, Any]:
    item_count = instruction.arg3
    keys = decode_values(reader, reader.object_keys, instruction.arg4, item_count)
    values = decode_values(reader, reader.object_values, instruction.arg5, item_count)
    if not all(isinstance(key, str) for key in keys):
        raise ValueError("Il buffer delle chiavi contiene valori non testuali")
    return dict(zip(keys, values, strict=True))


def decode_buffered_array(reader: HBCReader, instruction: Any) -> list[Any]:
    array_size = instruction.arg2
    item_count = instruction.arg3
    if item_count > array_size:
        raise ValueError(
            f"Array buffered non valido: {item_count} valori per {array_size} posizioni"
        )
    values = decode_values(reader, reader.arrays, instruction.arg4, item_count)
    return values + [None] * (array_size - item_count)


def execute_dataset_function(reader: HBCReader, spec: DatasetSpec) -> dict[str, Any]:
    if reader.header.version >= 97:
        raise ValueError(
            f"Versione Hermes {reader.header.version} non supportata da questo estrattore"
        )

    header = reader.function_headers[spec.function_id]
    if header.offset != spec.function_offset:
        raise ValueError(
            f"{spec.key}: offset 0x{header.offset:08x}, "
            f"atteso 0x{spec.function_offset:08x}"
        )

    registers: dict[int, Any] = {}
    returned: Any = None
    exported: Any = None
    supported = {
        "LoadConstString",
        "LoadConstUInt8",
        "LoadConstUndefined",
        "LoadParam",
        "NewArray",
        "NewArrayWithBuffer",
        "NewObject",
        "NewObjectWithBuffer",
        "NewObjectWithBufferLong",
        "PutById",
        "PutNewOwnById",
        "PutNewOwnByIdShort",
        "PutOwnByIndex",
        "PutOwnByIndexL",
        "Ret",
    }

    for instruction in parse_hbc_bytecode(header, reader):
        name = instruction.inst.name
        if name not in supported:
            raise ValueError(f"Istruzione inattesa in #{spec.function_id}: {name}")

        if name == "NewObject":
            registers[instruction.arg1] = {}
        elif name in ("NewObjectWithBuffer", "NewObjectWithBufferLong"):
            registers[instruction.arg1] = decode_buffered_object(reader, instruction)
        elif name == "NewArray":
            registers[instruction.arg1] = [None] * instruction.arg2
        elif name == "NewArrayWithBuffer":
            registers[instruction.arg1] = decode_buffered_array(reader, instruction)
        elif name == "LoadConstString":
            registers[instruction.arg1] = reader.strings[instruction.arg2]
        elif name == "LoadConstUInt8":
            registers[instruction.arg1] = instruction.arg2
        elif name == "LoadParam":
            registers[instruction.arg1] = {}
        elif name == "LoadConstUndefined":
            registers[instruction.arg1] = None
        elif name == "PutById":
            target = registers[instruction.arg1]
            key = reader.strings[instruction.arg4]
            value = registers[instruction.arg2]
            if not isinstance(target, dict):
                raise ValueError(f"Destinazione non oggetto per PutById.{key}")
            target[key] = value
            if key == "exports":
                exported = value
        elif name in ("PutNewOwnById", "PutNewOwnByIdShort"):
            target = registers[instruction.arg1]
            key = reader.strings[instruction.arg3]
            if not isinstance(target, dict):
                raise ValueError(f"Destinazione non oggetto per {name}.{key}")
            target[key] = registers[instruction.arg2]
        elif name in ("PutOwnByIndex", "PutOwnByIndexL"):
            target = registers[instruction.arg1]
            if not isinstance(target, list):
                raise ValueError(f"Destinazione non array per {name}")
            target[instruction.arg3] = registers[instruction.arg2]
        elif name == "Ret":
            returned = registers[instruction.arg1]

    result = exported if exported is not None else returned
    if not isinstance(result, dict):
        raise ValueError(f"#{spec.function_id} non ha esportato un oggetto root")
    return result


def validate_dataset(root: dict[str, Any], spec: DatasetSpec) -> dict[str, Any]:
    entries = root.get(spec.root_key)
    if not isinstance(root.get("_meta"), dict):
        raise ValueError(f"{spec.key}: metadati _meta assenti o non validi")
    if not isinstance(entries, list) or not entries:
        raise ValueError(f"{spec.key}: {spec.root_key} assente, non-array o vuoto")
    if not all(isinstance(entry, dict) for entry in entries):
        raise ValueError(f"{spec.key}: almeno una voce non è un oggetto")

    ids = [entry.get("id") for entry in entries]
    populated_ids = [value for value in ids if isinstance(value, str) and value]
    if populated_ids and len(populated_ids) != len(entries):
        raise ValueError(f"{spec.key}: ID presenti solo in parte delle voci")
    if populated_ids and len(set(populated_ids)) != len(populated_ids):
        raise ValueError(f"{spec.key}: gli ID non sono univoci")

    field_counts = [len(entry) for entry in entries]
    meta = root["_meta"]
    counters = {
        f"_meta.{key}": value
        for key, value in meta.items()
        if "total" in key.casefold() or "totale" in key.casefold()
    }
    counters.update(
        {
            key: value
            for key, value in root.items()
            if key != spec.root_key
            and ("total" in key.casefold() or "totale" in key.casefold())
        }
    )
    return {
        "version": spec.version,
        "kind": spec.kind,
        "function_id": spec.function_id,
        "function_offset": spec.function_offset,
        "root_keys": sorted(root),
        "root_list": spec.root_key,
        "entry_count": len(entries),
        "field_count_min": min(field_counts),
        "field_count_max": max(field_counts),
        "entries_with_id": len(populated_ids),
        "unique_id_count": len(set(populated_ids)),
        "declared_totals": counters,
        "declared_totals_match": {
            key: value == len(entries) for key, value in counters.items()
        },
    }


def build_specs(workspace_root: Path) -> dict[str, DatasetSpec]:
    baseline_bundle = (
        workspace_root
        / "resources"
        / "com.fabiodenuzzo.diabetecibo.apk"
        / "assets"
        / "index.android.bundle"
    )
    candidate_bundle = (
        workspace_root
        / "GLICODEN_1.0.16"
        / "resources"
        / "assets"
        / "index.android.bundle"
    )
    return {
        "1.0.0-catalog": DatasetSpec(
            "1.0.0-catalog", "1.0.0", "catalog", 14256, 2938670, "alimenti",
            baseline_bundle, "glicoden-1.0.0-catalog-14256.json",
        ),
        "1.0.0-recipes": DatasetSpec(
            "1.0.0-recipes", "1.0.0", "recipes", 14257, 2947209, "ricette",
            baseline_bundle, "glicoden-1.0.0-recipes-14257.json",
        ),
        "1.0.16-catalog": DatasetSpec(
            "1.0.16-catalog", "1.0.16", "catalog", 17813, 4796823, "alimenti",
            candidate_bundle, "glicoden-1.0.16-catalog-17813.json",
        ),
        "1.0.16-recipes": DatasetSpec(
            "1.0.16-recipes", "1.0.16", "recipes", 17814, 4827615, "ricette",
            candidate_bundle, "glicoden-1.0.16-recipes-17814.json",
        ),
        "1.0.16-quiz": DatasetSpec(
            "1.0.16-quiz", "1.0.16", "quiz", 19765, 5261973, "domande",
            candidate_bundle, "glicoden-1.0.16-quiz-19765.json",
        ),
    }


def parse_args(spec_keys: tuple[str, ...], default_output: Path) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--only",
        action="append",
        choices=spec_keys,
        help="Estrae solo il dataset indicato; ripetibile. Senza opzione estrae tutti.",
    )
    parser.add_argument("--output-dir", type=Path, default=default_output)
    parser.add_argument(
        "--force",
        action="store_true",
        help="Consente di sostituire output documentali già esistenti.",
    )
    return parser.parse_args()


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    workspace_root = project_root.parent
    specs = build_specs(workspace_root)
    args = parse_args(tuple(specs), project_root / "docs" / "extracted")
    selected = [specs[key] for key in (args.only or specs.keys())]

    outputs = [args.output_dir / spec.output_name for spec in selected]
    existing = [path for path in outputs if path.exists()]
    if existing and not args.force:
        paths = ", ".join(str(path) for path in existing)
        raise FileExistsError(f"Output già esistenti (usa --force): {paths}")

    readers: dict[Path, HBCReader] = {}
    sources: list[BytesIO] = []
    extracted: list[tuple[DatasetSpec, dict[str, Any], dict[str, Any]]] = []
    for spec in selected:
        bundle = spec.bundle.resolve()
        if bundle not in readers:
            source = BytesIO(bundle.read_bytes())
            reader = HBCReader()
            reader.read_whole_file(source)
            readers[bundle] = reader
            sources.append(source)
        root = execute_dataset_function(readers[bundle], spec)
        extracted.append((spec, root, validate_dataset(root, spec)))

    args.output_dir.mkdir(parents=True, exist_ok=True)
    for spec, root, summary in extracted:
        output = args.output_dir / spec.output_name
        output.write_text(
            json.dumps(root, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
            encoding="utf-8",
        )
        totals = ", ".join(
            f"{key}={value}" for key, value in summary["declared_totals"].items()
        )
        print(
            f"{spec.key}: {summary['entry_count']} voci da #{spec.function_id}; "
            f"campi {summary['field_count_min']}-{summary['field_count_max']}; "
            f"totali dichiarati [{totals or 'nessuno'}]; {output}"
        )


if __name__ == "__main__":
    main()
