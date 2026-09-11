#!/usr/bin/env python3
"""Localizza funzioni Hermes che costruiscono grandi dataset embedded.

Produce un inventario strutturale delle funzioni con molti literal object/array,
utile per trovare catalogo, ricette, quiz e contenuti senza affidarsi agli ID
funzione della baseline.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from io import BytesIO
from pathlib import Path
from typing import Any

from hermes_dec.parsers.hbc_bytecode_parser import parse_hbc_bytecode
from hermes_dec.parsers.hbc_file_parser import HBCReader

SOURCE_BRAND_PLACEHOLDER = "[SOURCE_BRAND]"


def redact_source_brand(value: Any, source_brand: str) -> Any:
    if isinstance(value, str):
        return re.sub(
            re.escape(source_brand),
            SOURCE_BRAND_PLACEHOLDER,
            value,
            flags=re.IGNORECASE,
        )
    if isinstance(value, list):
        return [redact_source_brand(item, source_brand) for item in value]
    if isinstance(value, dict):
        return {
            key: redact_source_brand(item, source_brand)
            for key, item in value.items()
        }
    return value


def load(path: Path) -> HBCReader:
    reader = HBCReader()
    source = BytesIO(path.read_bytes())
    reader.read_whole_file(source)
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


def parse_args() -> argparse.Namespace:
    project_root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--baseline-bundle",
        type=Path,
        default=os.environ.get("SOURCE_BASELINE_BUNDLE"),
    )
    parser.add_argument(
        "--candidate-bundle",
        type=Path,
        default=os.environ.get("SOURCE_CANDIDATE_BUNDLE"),
    )
    parser.add_argument("--source-brand", default=os.environ.get("SOURCE_BRAND"))
    parser.add_argument(
        "--output",
        type=Path,
        default=project_root / "docs" / "version-1.0.16-datasets.json",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.baseline_bundle is None or args.candidate_bundle is None:
        raise ValueError("Configura entrambi i bundle con argomenti o variabili SOURCE_*")
    if not args.source_brand:
        raise ValueError("Imposta --source-brand o SOURCE_BRAND per la redazione")

    bundles = {
        "1.0.0": args.baseline_bundle,
        "1.0.16": args.candidate_bundle,
    }
    report = {
        version: redact_source_brand(inspect(load(path)), args.source_brand)
        for version, path in bundles.items()
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    print(
        "Dataset candidati: "
        + ", ".join(f"{version}={len(items)}" for version, items in report.items())
        + f"; report {args.output}"
    )


if __name__ == "__main__":
    main()
