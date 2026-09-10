#!/usr/bin/env python3
"""Estrae il catalogo alimentare dalla funzione Hermes #14256.

Richiede il pacchetto ``hermes-dec`` disponibile nell'ambiente Python.
Lo script emula soltanto le istruzioni lineari osservate nella funzione del
bundle APK e interrompe l'estrazione se struttura o conteggi non coincidono.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from hermes_dec.parsers.hbc_bytecode_parser import parse_hbc_bytecode
from hermes_dec.parsers.hbc_file_parser import HBCReader
from hermes_dec.parsers.serialized_literal_parser import TagType, unpack_slp_array

FUNCTION_ID = 14256
EXPECTED_FUNCTION_OFFSET = 0x002CD72E
EXPECTED_ENTRY_COUNT = 228
EXPECTED_BASE_FIELD_COUNT = 37


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
        raise ValueError(f"Literal buffer incompleto: attesi {count} valori, trovati {len(values)}")
    return values


def decode_buffered_object(reader: HBCReader, instruction: Any) -> dict[str, Any]:
    if reader.header.version >= 97:
        raise ValueError(f"Versione Hermes {reader.header.version} non supportata da questo estrattore")

    item_count = instruction.arg3
    keys = decode_values(reader, reader.object_keys, instruction.arg4, item_count)
    values = decode_values(reader, reader.object_values, instruction.arg5, item_count)
    if not all(isinstance(key, str) for key in keys):
        raise ValueError("Il buffer delle chiavi contiene valori non testuali")
    return dict(zip(keys, values, strict=True))


def execute_catalog_function(reader: HBCReader) -> dict[str, Any]:
    header = reader.function_headers[FUNCTION_ID]
    if header.offset != EXPECTED_FUNCTION_OFFSET:
        raise ValueError(
            f"Offset funzione inatteso: 0x{header.offset:08x}, atteso 0x{EXPECTED_FUNCTION_OFFSET:08x}"
        )

    registers: dict[int, Any] = {}
    returned: Any = None
    exported: Any = None
    supported = {
        "NewObject",
        "NewObjectWithBuffer",
        "NewObjectWithBufferLong",
        "NewArray",
        "PutById",
        "PutNewOwnById",
        "PutNewOwnByIdShort",
        "PutOwnByIndex",
        "LoadParam",
        "LoadConstUndefined",
        "Ret",
    }

    for instruction in parse_hbc_bytecode(header, reader):
        name = instruction.inst.name
        if name not in supported:
            raise ValueError(f"Istruzione inattesa in #{FUNCTION_ID}: {name}")

        if name == "NewObject":
            registers[instruction.arg1] = {}
        elif name in ("NewObjectWithBuffer", "NewObjectWithBufferLong"):
            registers[instruction.arg1] = decode_buffered_object(reader, instruction)
        elif name == "NewArray":
            registers[instruction.arg1] = [None] * instruction.arg2
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
            target[reader.strings[instruction.arg3]] = registers[instruction.arg2]
        elif name == "PutOwnByIndex":
            target = registers[instruction.arg1]
            target[instruction.arg3] = registers[instruction.arg2]
        elif name == "LoadParam":
            registers[instruction.arg1] = {}
        elif name == "LoadConstUndefined":
            registers[instruction.arg1] = None
        elif name == "Ret":
            returned = registers[instruction.arg1]

    result = exported if exported is not None else returned
    if not isinstance(result, dict):
        raise ValueError("La funzione non ha esportato l'oggetto root atteso")
    return result


def validate_catalog(root: dict[str, Any]) -> None:
    if set(root) != {"_meta", "alimenti"}:
        raise ValueError(f"Chiavi root inattese: {sorted(root)}")
    if not isinstance(root["_meta"], dict) or root["_meta"].get("totale") != EXPECTED_ENTRY_COUNT:
        raise ValueError("Metadati catalogo non coerenti")

    foods = root["alimenti"]
    if not isinstance(foods, list) or len(foods) != EXPECTED_ENTRY_COUNT:
        raise ValueError(f"Attese {EXPECTED_ENTRY_COUNT} voci")

    ids: list[str] = []
    base_fields: set[str] | None = None
    for index, food in enumerate(foods):
        if not isinstance(food, dict) or len(food) < EXPECTED_BASE_FIELD_COUNT:
            raise ValueError(f"Voce {index}: attesi almeno {EXPECTED_BASE_FIELD_COUNT} campi")
        if not isinstance(food.get("id"), str) or not food["id"]:
            raise ValueError(f"Voce {index}: id mancante")
        if not isinstance(food.get("sinonimi"), list):
            raise ValueError(f"Voce {food['id']}: sinonimi non è un array")
        if food.get("revisione") is not None and not isinstance(food["revisione"], dict):
            raise ValueError(f"Voce {food['id']}: revisione non valida")

        fields = set(food)
        if base_fields is None:
            base_fields = fields
        elif not base_fields.issubset(fields):
            missing = sorted(base_fields - fields)
            raise ValueError(f"Voce {food['id']}: campi base mancanti: {missing}")
        ids.append(food["id"])

    if len(set(ids)) != EXPECTED_ENTRY_COUNT:
        raise ValueError("Gli ID del catalogo non sono univoci")


def parse_args() -> argparse.Namespace:
    project_root = Path(__file__).resolve().parents[1]
    workspace_root = project_root.parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--bundle",
        type=Path,
        default=workspace_root / "resources" / "com.fabiodenuzzo.diabetecibo.apk" / "assets" / "index.android.bundle",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=project_root / "src" / "catalog" / "apkCatalogData.json",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    reader = HBCReader()
    with args.bundle.open("rb") as bundle:
        reader.read_whole_file(bundle)
        root = execute_catalog_function(reader)
    validate_catalog(root)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(root, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    field_counts = [len(food) for food in root["alimenti"]]
    print(
        f"Estratte {len(root['alimenti'])} voci ({min(field_counts)}-{max(field_counts)} campi) "
        f"da #{FUNCTION_ID} in {args.output}"
    )


if __name__ == "__main__":
    main()
