#!/usr/bin/env python3
"""Localizza funzioni Hermes che costruiscono grandi dataset embedded.

Produce un inventario strutturale delle funzioni con molti literal object/array,
utile per trovare catalogo, ricette, quiz e contenuti senza affidarsi agli ID
funzione della versione 1.0.0.
"""

from __future__ import annotations

import json
from io import BytesIO
from pathlib import Path
from typing import Any

from hermes_dec.parsers.hbc_bytecode_parser import parse_hbc_bytecode
from hermes_dec.parsers.hbc_file_parser import HBCReader


def load(path: Path) -> HBCReader:
    reader = HBCReader()
    source = BytesIO(path.read_bytes())
    reader.read_whole_file(source)
    # hermes-dec usa ancora lo stream durante parse_hbc_bytecode.
    reader._dataset_source = source
    return reader


def inspect(reader: HBCReader) -> list[dict[str, Any]]:
    candidates: list[dict[str, Any]] = []
    for function_id, header in enumerate(reader.function_headers):
        counts: dict[str, int] = {}
        direct_strings: set[str] = set()
        parse_error: str | None = None
        try:
            for instruction in parse_hbc_bytecode(header, reader):
                name = instruction.inst.name
                counts[name] = counts.get(name, 0) + 1
                for operand_index, operand in enumerate(instruction.inst.operands, start=1):
                    meaning = operand.operand_meaning
                    if meaning is None or meaning.name != "string_id":
                        continue
                    string_id = getattr(instruction, f"arg{operand_index}")
                    if 0 <= string_id < len(reader.strings):
                        direct_strings.add(reader.strings[string_id])
        except Exception as error:
            parse_error = f"{type(error).__name__}: {error}"

        put_index = counts.get("PutOwnByIndex", 0)
        buffered_objects = counts.get("NewObjectWithBuffer", 0) + counts.get(
            "NewObjectWithBufferLong", 0
        )
        buffered_arrays = counts.get("NewArrayWithBuffer", 0) + counts.get(
            "NewArrayWithBufferLong", 0
        )
        if not (
            put_index >= 10
            or buffered_objects >= 10
            or buffered_arrays >= 10
            or header.bytecodeSizeInBytes >= 5_000
        ):
            continue

        candidates.append(
            {
                "function_id": function_id,
                "name": reader.strings[header.functionName],
                "offset": header.offset,
                "bytecode_size": header.bytecodeSizeInBytes,
                "put_own_by_index": put_index,
                "buffered_objects": buffered_objects,
                "buffered_arrays": buffered_arrays,
                "new_arrays": counts.get("NewArray", 0),
                "instruction_count": sum(counts.values()),
                "opcodes": dict(sorted(counts.items())),
                "direct_strings": sorted(direct_strings, key=str.casefold),
                "parse_error": parse_error,
            }
        )
    return sorted(
        candidates,
        key=lambda item: (
            -item["put_own_by_index"],
            -item["buffered_objects"],
            -item["bytecode_size"],
        ),
    )


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    workspace_root = project_root.parent
    bundles = {
        "1.0.0": workspace_root
        / "resources"
        / "com.fabiodenuzzo.diabetecibo.apk"
        / "assets"
        / "index.android.bundle",
        "1.0.16": workspace_root
        / "GLICODEN_1.0.16"
        / "resources"
        / "assets"
        / "index.android.bundle",
    }
    report = {version: inspect(load(path)) for version, path in bundles.items()}
    output = project_root / "docs" / "version-1.0.16-datasets.json"
    output.write_text(
        json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    print(
        "Dataset candidati: "
        + ", ".join(f"{version}={len(items)}" for version, items in report.items())
        + f"; report {output}"
    )


if __name__ == "__main__":
    main()
