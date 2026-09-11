#!/usr/bin/env python3
"""Confronta i bundle Hermes delle versioni sorgente 1.0.0 e 1.0.16.

Il report è intenzionalmente conservativo: distingue le stringhe presenti nel
bundle dalle funzioni che le referenziano direttamente e non interpreta la sola
presenza di una libreria come prova di una funzionalità utente.

Richiede il pacchetto ``hermes-dec`` già usato da ``extract_apk_catalog.py``.
"""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from io import BytesIO
import json
import os
from pathlib import Path
import re
from typing import Any, Iterable

from hermes_dec.parsers.hbc_bytecode_parser import parse_hbc_bytecode
from hermes_dec.parsers.hbc_file_parser import HBCReader


URL_RE = re.compile(r"(?:[a-z][a-z0-9+.-]*://)[^\s\"'<>\\)\]]+", re.IGNORECASE)

KEYWORD_GROUPS: dict[str, tuple[str, ...]] = {
    "barcode": (
        "barcode",
        "codice a barre",
        "openfoodfacts",
        "open food facts",
        "product_name",
        "code-scanner",
    ),
    "firebase_analytics": (
        "analytics",
        "firebase",
        "logevent",
        "setscreen",
        "setuser",
    ),
    "localization": (
        "localization",
        "locale",
        "lingua",
        "language",
        "i18n",
    ),
    "notifications": (
        "notification",
        "notifica",
        "promemoria",
        "reminder",
        "push token",
    ),
    "secure_store_auth": (
        "securestore",
        "secure store",
        "biometric",
        "fingerprint",
        "google signin",
        "sign in",
        "login",
    ),
    "deep_link_share": (
        "://",
        "/i/",
        "sharing",
        "condividi",
        "condivisione",
        "deep link",
        "linking",
    ),
    "recipes": (
        "ricetta",
        "ricette",
        "recipe",
        "ingredients",
        "ingredienti",
        "preparazione",
    ),
    "meal_plan_shopping": (
        "piano alimentare",
        "meal plan",
        "lista della spesa",
        "lista spesa",
        "shopping list",
        "pianifica",
    ),
    "diary_streak": (
        "diario",
        "streak",
        "consecutiv",
        "cronologia",
        "history",
    ),
    "favorites_dishes": (
        "preferit",
        "favorite",
        "favourite",
        "piatti",
        "salvati",
    ),
    "premium_billing": (
        "premium",
        "pro",
        "paywall",
        "purchase",
        "revenuecat",
        "abbonamento",
        "subscription",
        "offering",
    ),
    "catalog_calculations": (
        "calcolaimpatto",
        "fasciada",
        "carboidrati_disponibili",
        "carico glicemico",
        "indice glicemico",
        "alimenti",
        "catalogo",
    ),
}

# Filtri per isolare testo applicativo dal rumore di framework e dipendenze.
NOISE_PARTS = (
    "node_modules",
    "reactnative",
    "react-native",
    "facebook.com",
    "w3.org",
    "ecma",
    "stack trace",
    "native module",
    "unexpected token",
    "invalid argument",
    "not implemented",
    "cannot read",
    "undefined is not",
    "sourceurl",
    "hermes",
)
UI_HINTS = (
    "aliment",
    "analizz",
    "barcode",
    "carboidrat",
    "cena",
    "colazione",
    "condivid",
    "diabete",
    "diario",
    "foto",
    "glicem",
    "ingred",
    "lista",
    "notific",
    "piatto",
    "piano",
    "pranzo",
    "preferit",
    "premium",
    "promemoria",
    "ricett",
    "scansion",
    "spuntino",
)


@dataclass(frozen=True)
class FunctionHit:
    function_id: int
    name: str
    offset: int
    bytecode_size: int
    matched_strings: tuple[str, ...]


@dataclass(frozen=True)
class StructuralCandidate:
    function_id: int
    name: str
    offset: int
    bytecode_size: int
    instruction_count: int
    put_own_by_index_count: int
    new_object_with_buffer_count: int
    largest_buffered_object: int
    direct_strings: tuple[str, ...]


def load_reader(path: Path) -> HBCReader:
    reader = HBCReader()
    source = BytesIO(path.read_bytes())
    reader.read_whole_file(source)
    # hermes-dec legge alcune sezioni in modo lazy durante il parsing funzioni.
    reader._audit_source = source
    return reader


SOURCE_BRAND_PLACEHOLDER = "[SOURCE_BRAND]"


def normalize(value: str) -> str:
    return value.casefold()


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
    if isinstance(value, tuple):
        return tuple(redact_source_brand(item, source_brand) for item in value)
    if isinstance(value, dict):
        return {
            key: redact_source_brand(item, source_brand)
            for key, item in value.items()
        }
    return value


def matches_any(value: str, needles: Iterable[str]) -> bool:
    lowered = normalize(value)
    return any(needle in lowered for needle in needles)


def extract_urls(strings: Iterable[str]) -> list[str]:
    urls: set[str] = set()
    for value in strings:
        urls.update(match.rstrip(".,;:") for match in URL_RE.findall(value))
    return sorted(urls, key=str.casefold)


def is_notable_added_string(value: str) -> bool:
    stripped = value.strip()
    lowered = normalize(stripped)
    if not (4 <= len(stripped) <= 300) or not stripped.isprintable():
        return False
    if any(part in lowered for part in NOISE_PARTS):
        return False
    if URL_RE.search(stripped):
        return True
    if any(hint in lowered for hint in UI_HINTS):
        return True
    # Testi UI completi in italiano: manteniamo solo frasi, non identificatori.
    return " " in stripped and any(
        token in lowered.split()
        for token in ("aggiungi", "cerca", "continua", "errore", "salva", "scansiona")
    )


def function_name(reader: HBCReader, function_id: int) -> str:
    header = reader.function_headers[function_id]
    return reader.strings[header.functionName]


def inspect_functions(reader: HBCReader) -> tuple[dict[str, list[FunctionHit]], list[StructuralCandidate], list[dict[str, Any]]]:
    grouped_hits: dict[str, list[FunctionHit]] = defaultdict(list)
    structural: list[StructuralCandidate] = []
    named: list[dict[str, Any]] = []

    name_needles = tuple(
        sorted({needle for needles in KEYWORD_GROUPS.values() for needle in needles})
    )

    for function_id, header in enumerate(reader.function_headers):
        name = function_name(reader, function_id)
        lowered_name = normalize(name)
        if name and matches_any(lowered_name, name_needles):
            named.append(
                {
                    "function_id": function_id,
                    "name": name,
                    "offset": header.offset,
                    "bytecode_size": header.bytecodeSizeInBytes,
                }
            )

        direct_strings: set[str] = set()
        instruction_count = 0
        put_own_by_index_count = 0
        buffered_object_count = 0
        largest_buffered_object = 0
        try:
            instructions = parse_hbc_bytecode(header, reader)
            for instruction in instructions:
                instruction_count += 1
                if instruction.inst.name == "PutOwnByIndex":
                    put_own_by_index_count += 1
                elif instruction.inst.name in ("NewObjectWithBuffer", "NewObjectWithBufferLong"):
                    buffered_object_count += 1
                    largest_buffered_object = max(largest_buffered_object, int(instruction.arg3))

                for operand_index, operand in enumerate(instruction.inst.operands, start=1):
                    meaning = operand.operand_meaning
                    if meaning is None or meaning.name != "string_id":
                        continue
                    string_id = getattr(instruction, f"arg{operand_index}")
                    if 0 <= string_id < len(reader.strings):
                        direct_strings.add(reader.strings[string_id])
        except Exception as error:  # Il report deve conservare anche bundle parzialmente leggibili.
            direct_strings.add(f"<PARSE_ERROR:{type(error).__name__}>")

        for group, needles in KEYWORD_GROUPS.items():
            matched = sorted(
                {
                    value
                    for value in direct_strings
                    if matches_any(value, needles)
                },
                key=str.casefold,
            )
            if matches_any(name, needles):
                matched.insert(0, f"<FUNCTION_NAME:{name}>")
            if matched:
                grouped_hits[group].append(
                    FunctionHit(
                        function_id=function_id,
                        name=name,
                        offset=header.offset,
                        bytecode_size=header.bytecodeSizeInBytes,
                        matched_strings=tuple(matched[:30]),
                    )
                )

        root_markers = {
            value
            for value in direct_strings
            if normalize(value) in {"_meta", "alimenti", "totale", "exports"}
        }
        if (
            put_own_by_index_count >= 100
            or buffered_object_count >= 100
            or {"_meta", "alimenti"}.issubset(root_markers)
        ):
            structural.append(
                StructuralCandidate(
                    function_id=function_id,
                    name=name,
                    offset=header.offset,
                    bytecode_size=header.bytecodeSizeInBytes,
                    instruction_count=instruction_count,
                    put_own_by_index_count=put_own_by_index_count,
                    new_object_with_buffer_count=buffered_object_count,
                    largest_buffered_object=largest_buffered_object,
                    direct_strings=tuple(sorted(root_markers)),
                )
            )

    for hits in grouped_hits.values():
        hits.sort(key=lambda item: (item.function_id, item.offset))
    structural.sort(
        key=lambda item: (
            -item.put_own_by_index_count,
            -item.new_object_with_buffer_count,
            item.function_id,
        )
    )
    named.sort(key=lambda item: item["function_id"])
    return grouped_hits, structural, named


def summarize_bundle(path: Path, label: str) -> tuple[HBCReader, dict[str, Any]]:
    reader = load_reader(path)
    strings = list(reader.strings)
    summary = {
        "path": label,
        "bytes": path.stat().st_size,
        "hermes_version": reader.header.version,
        "function_count": len(reader.function_headers),
        "string_count": len(strings),
        "unique_string_count": len(set(strings)),
        "urls": extract_urls(strings),
    }
    return reader, summary


def summarize_assets(manifest_path: Path) -> dict[str, Any]:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    assets = manifest.get("assets", [])
    app_assets = [
        asset
        for asset in assets
        if "/assets/assets/" in asset.get("subdirectory", "")
    ]
    by_directory = Counter(asset.get("subdirectory", "") for asset in app_assets)
    return {
        "manifest_id": manifest.get("id"),
        "commit_time": manifest.get("commitTime"),
        "asset_count": len(assets),
        "app_asset_count": len(app_assets),
        "app_assets_by_directory": dict(sorted(by_directory.items())),
        "app_assets": [
            {
                "path": f"{asset.get('subdirectory', '')}/{asset.get('name', '')}.{asset.get('type', '')}",
                "hash": asset.get("packagerHash"),
                "resource": asset.get("resourcesFilename"),
            }
            for asset in app_assets
        ],
    }


def parse_args() -> argparse.Namespace:
    project_root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--baseline",
        type=Path,
        default=os.environ.get("SOURCE_BASELINE_BUNDLE"),
    )
    parser.add_argument(
        "--candidate",
        type=Path,
        default=os.environ.get("SOURCE_CANDIDATE_BUNDLE"),
    )
    parser.add_argument(
        "--asset-manifest",
        type=Path,
        default=os.environ.get("SOURCE_ASSET_MANIFEST"),
    )
    parser.add_argument("--source-brand", default=os.environ.get("SOURCE_BRAND"))
    parser.add_argument(
        "--output",
        type=Path,
        default=project_root / "docs" / "version-1.0.16-audit.json",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.baseline is None or args.candidate is None or args.asset_manifest is None:
        raise ValueError(
            "Configura baseline, candidate e manifest con argomenti o variabili SOURCE_*"
        )
    if not args.source_brand:
        raise ValueError("Imposta --source-brand o SOURCE_BRAND per la redazione")

    baseline_reader, baseline = summarize_bundle(
        args.baseline.resolve(), "baseline/assets/index.android.bundle"
    )
    candidate_reader, candidate = summarize_bundle(
        args.candidate.resolve(), "candidate/assets/index.android.bundle"
    )

    baseline_strings = set(baseline_reader.strings)
    candidate_strings = set(candidate_reader.strings)
    added_strings = candidate_strings - baseline_strings
    removed_strings = baseline_strings - candidate_strings

    baseline_hits, baseline_structural, baseline_named = inspect_functions(baseline_reader)
    candidate_hits, candidate_structural, candidate_named = inspect_functions(candidate_reader)

    report = {
        "baseline": baseline,
        "candidate": candidate,
        "delta": {
            "bytes": candidate["bytes"] - baseline["bytes"],
            "function_count": candidate["function_count"] - baseline["function_count"],
            "string_count": candidate["string_count"] - baseline["string_count"],
            "unique_added_string_count": len(added_strings),
            "unique_removed_string_count": len(removed_strings),
            "added_urls": sorted(set(candidate["urls"]) - set(baseline["urls"]), key=str.casefold),
            "removed_urls": sorted(set(baseline["urls"]) - set(candidate["urls"]), key=str.casefold),
            "notable_added_strings": sorted(
                (value for value in added_strings if is_notable_added_string(value)),
                key=str.casefold,
            ),
            "notable_removed_strings": sorted(
                (value for value in removed_strings if is_notable_added_string(value)),
                key=str.casefold,
            ),
        },
        "function_evidence": {
            "baseline": {
                group: [asdict(hit) for hit in hits]
                for group, hits in sorted(baseline_hits.items())
            },
            "candidate": {
                group: [asdict(hit) for hit in hits]
                for group, hits in sorted(candidate_hits.items())
            },
        },
        "named_functions": {
            "baseline": baseline_named,
            "candidate": candidate_named,
        },
        "structural_candidates": {
            "baseline": [asdict(item) for item in baseline_structural],
            "candidate": [asdict(item) for item in candidate_structural],
        },
        "assets_1_0_16": summarize_assets(args.asset_manifest.resolve()),
    }
    report = redact_source_brand(report, args.source_brand)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    print(
        f"Report scritto in {args.output}: "
        f"{len(added_strings)} stringhe uniche aggiunte, "
        f"{len(report['delta']['added_urls'])} URL aggiunti, "
        f"{len(candidate_structural)} candidati strutturali."
    )


if __name__ == "__main__":
    main()
