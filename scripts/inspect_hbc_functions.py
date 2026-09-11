#!/usr/bin/env python3
"""Cerca, disassembla e decompila funzioni selettive nei bundle Hermes."""

from __future__ import annotations

import argparse
import json
import os
import re
from contextlib import redirect_stderr, redirect_stdout
from io import BytesIO, StringIO
from pathlib import Path
from typing import Any

from hermes_dec.decompilation.hbc_decompiler import HermesDecompiler, decompile_function
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


def redact_text(value: str, source_brand: str) -> str:
    return redact_source_brand(value, source_brand)


def load_reader(path: Path) -> HBCReader:
    reader = HBCReader()
    source = BytesIO(path.read_bytes())
    reader.read_whole_file(source)
    reader._inspection_source = source
    return reader


def inspect_function(reader: HBCReader, function_id: int) -> dict[str, Any]:
    header = reader.function_headers[function_id]
    direct_strings: set[str] = set()
    referenced_functions: set[int] = set()
    opcodes: dict[str, int] = {}
    instructions = list(parse_hbc_bytecode(header, reader))
    for instruction in instructions:
        name = instruction.inst.name
        opcodes[name] = opcodes.get(name, 0) + 1
        for index, operand in enumerate(instruction.inst.operands, start=1):
            meaning = operand.operand_meaning
            if meaning is None:
                continue
            value = getattr(instruction, f"arg{index}")
            if meaning.name == "string_id" and 0 <= value < len(reader.strings):
                direct_strings.add(reader.strings[value])
            elif meaning.name == "function_id":
                referenced_functions.add(value)
    return {
        "function_id": function_id,
        "name": reader.strings[header.functionName],
        "offset": header.offset,
        "bytecode_size": header.bytecodeSizeInBytes,
        "instruction_count": len(instructions),
        "opcodes": dict(sorted(opcodes.items())),
        "direct_strings": sorted(direct_strings, key=str.casefold),
        "referenced_functions": sorted(referenced_functions),
    }


def search_functions(reader: HBCReader, terms: list[str]) -> list[dict[str, Any]]:
    lowered_terms = [term.casefold() for term in terms]
    matches: list[dict[str, Any]] = []
    for function_id in range(len(reader.function_headers)):
        item = inspect_function(reader, function_id)
        candidates = [item["name"], *item["direct_strings"]]
        matched_terms = sorted(
            {
                term
                for term, lowered in zip(terms, lowered_terms, strict=True)
                if any(lowered in value.casefold() for value in candidates)
            },
            key=str.casefold,
        )
        if matched_terms:
            item["matched_terms"] = matched_terms
            matches.append(item)
    return matches


def disassemble(reader: HBCReader, function_id: int) -> str:
    item = inspect_function(reader, function_id)
    header = reader.function_headers[function_id]
    lines = [
        f"# Function #{function_id} {item['name']!r}",
        f"# offset={header.offset} bytes={header.bytecodeSizeInBytes}",
        "",
    ]
    lines.extend(str(instruction) for instruction in parse_hbc_bytecode(header, reader))
    return "\n".join(lines) + "\n"


def decompile(reader: HBCReader, function_id: int) -> str:
    state = HermesDecompiler()
    state.hbc_reader = reader
    state.calldirect_function_ids = set()
    state.indent_level = 0
    output = StringIO()
    with redirect_stdout(output), redirect_stderr(output):
        decompile_function(state, function_id)
    return output.getvalue().rstrip() + "\n"


def parse_target(value: str) -> tuple[str, int]:
    separator = ":" if ":" in value else "#" if "#" in value else ""
    if not separator:
        raise argparse.ArgumentTypeError("Formato funzione atteso: VERSIONE#ID")
    version, function_id = value.split(separator, maxsplit=1)
    try:
        return version, int(function_id)
    except ValueError as error:
        raise argparse.ArgumentTypeError("L'ID funzione deve essere numerico") from error


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--search", action="append", default=[])
    parser.add_argument("--function", action="append", type=parse_target, default=[])
    parser.add_argument("--output-dir", type=Path)
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
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if not args.source_brand:
        raise ValueError("Imposta --source-brand o SOURCE_BRAND per la redazione")

    project_root = Path(__file__).resolve().parents[1]
    output_dir = args.output_dir or project_root / "docs" / "hbc-functions"
    bundles = {
        "1.0.0": args.baseline_bundle,
        "1.0.16": args.candidate_bundle,
    }
    requested_versions = {version for version, _ in args.function}
    if args.search:
        requested_versions.update(bundles)
    unknown = requested_versions - set(bundles)
    if unknown:
        raise ValueError(f"Versioni sconosciute: {sorted(unknown)}")
    missing = sorted(version for version in requested_versions if bundles[version] is None)
    if missing:
        raise ValueError(
            "Configura i bundle richiesti con gli argomenti o le variabili SOURCE_*: "
            + ", ".join(missing)
        )

    readers = {
        version: load_reader(bundles[version])
        for version in requested_versions
    }
    output_dir.mkdir(parents=True, exist_ok=True)

    if args.search:
        report = {
            version: search_functions(readers[version], args.search)
            for version in sorted(readers)
        }
        report = redact_source_brand(report, args.source_brand)
        output = output_dir / "search-results.json"
        output.write_text(
            json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
            encoding="utf-8",
        )
        print(
            "Ricerca funzioni: "
            + ", ".join(f"{version}={len(items)}" for version, items in report.items())
            + f"; {output}"
        )

    for version, function_id in args.function:
        reader = readers[version]
        if not 0 <= function_id < len(reader.function_headers):
            raise ValueError(f"{version}: ID funzione fuori intervallo: {function_id}")
        stem = f"source-{version}-function-{function_id}"
        disassembly_output = output_dir / f"{stem}.disasm.txt"
        decompiled_output = output_dir / f"{stem}.decompiled.js"
        disassembly_output.write_text(
            redact_text(disassemble(reader, function_id), args.source_brand),
            encoding="utf-8",
        )
        decompiled_output.write_text(
            redact_text(decompile(reader, function_id), args.source_brand),
            encoding="utf-8",
        )
        print(f"{version} #{function_id}: {disassembly_output}; {decompiled_output}")


if __name__ == "__main__":
    main()
