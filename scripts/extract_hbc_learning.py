#!/usr/bin/env python3
"""Estrae lossless i 50 capitoli Impara e applica il merge Hermes verificato.

La funzione #19701 costruisce il dataset italiano/inglese; #19714, #19716 e
#19718 costruiscono le mappe ES/DE/FR. Il merge replica #19702-#19704 senza
normalizzare, tradurre o completare contenuti. I soli foodId aggiunti dopo il
merge provengono da una mappa esatta validata contro il catalogo estratto.
"""

from __future__ import annotations

import argparse
import copy
import json
import os
import re
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path
from typing import Any

from hermes_dec.parsers.hbc_bytecode_parser import parse_hbc_bytecode
from hermes_dec.parsers.hbc_file_parser import HBCReader

from extract_hbc_datasets import decode_buffered_array, decode_buffered_object


SOURCE_BRAND_PLACEHOLDER = "[SOURCE_BRAND]"

# Collegamenti verificati contro source-1.0.16-catalog-17813.json.
# La chiave è l'etichetta italiana embedded del blocco esempio: nessun fuzzy match.
VERIFIED_EXAMPLE_FOOD_IDS: dict[str, str] = {
    "Pane bianco": "pane-bianco",
    "Banana": "banana",
    "Anguria": "anguria",
    "Lenticchie cotte": "lenticchie-cotte",
    "Riso bianco cotto": "riso-bianco-cotto",
    "Succo d’arancia": "succo-darancia",
    "Pasta cotta al dente": "pasta-cotta-al-dente",
    "Spaghetti al dente": "spaghetti-cotti-al-dente",
    "Orzo perlato cotto": "orzo-perlato-cotto",
    "Porridge d’avena": "porridge-davena",
    "Mandorle": "mandorle",
    "Cioccolato fondente": "cioccolato-fondente",
    "Insalata di alghe (wakame)": "insalata-di-alghe",
    "Mela con buccia": "mela-con-buccia",
    "Pane integrale": "pane-integrale",
    "Eritritolo": "eritritolo",
    "Noci": "noci",
}


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


@dataclass(frozen=True)
class FunctionSpec:
    function_id: int
    offset: int


@dataclass
class Construction:
    registers: dict[int, Any]
    environment: dict[int, Any]
    objects: list[dict[str, Any]]
    arrays: list[list[Any]]


def load_reader(path: Path) -> tuple[HBCReader, BytesIO]:
    source = BytesIO(path.read_bytes())
    reader = HBCReader()
    reader.read_whole_file(source)
    return reader, source


def construct_literals(reader: HBCReader, spec: FunctionSpec) -> Construction:
    header = reader.function_headers[spec.function_id]
    if header.offset != spec.offset:
        raise ValueError(
            f"#{spec.function_id}: offset {header.offset}, atteso {spec.offset}"
        )

    registers: dict[int, Any] = {}
    environment: dict[int, Any] = {}
    objects: list[dict[str, Any]] = []
    arrays: list[list[Any]] = []

    for instruction in parse_hbc_bytecode(header, reader):
        name = instruction.inst.name
        target_register = instruction.arg1 if hasattr(instruction, "arg1") else None

        if name == "NewObject":
            value: Any = {}
            registers[target_register] = value
            objects.append(value)
        elif name in ("NewObjectWithBuffer", "NewObjectWithBufferLong"):
            value = decode_buffered_object(reader, instruction)
            registers[target_register] = value
            objects.append(value)
        elif name == "NewArray":
            value = [None] * instruction.arg2
            registers[target_register] = value
            arrays.append(value)
        elif name == "NewArrayWithBuffer":
            value = decode_buffered_array(reader, instruction)
            registers[target_register] = value
            arrays.append(value)
        elif name == "LoadConstString":
            registers[target_register] = reader.strings[instruction.arg2]
        elif name in ("LoadConstUInt8", "LoadConstInt"):
            registers[target_register] = instruction.arg2
        elif name == "LoadConstZero":
            registers[target_register] = 0
        elif name == "LoadConstTrue":
            registers[target_register] = True
        elif name == "LoadConstFalse":
            registers[target_register] = False
        elif name in ("LoadConstNull", "LoadConstUndefined"):
            registers[target_register] = None
        elif name == "LoadParam":
            registers[target_register] = {}
        elif name == "Mov" and instruction.arg2 in registers:
            registers[target_register] = registers[instruction.arg2]
        elif name in ("PutNewOwnById", "PutNewOwnByIdShort", "PutById"):
            target = registers.get(instruction.arg1)
            value = registers.get(instruction.arg2)
            key_index = instruction.arg3 if name != "PutById" else instruction.arg4
            if isinstance(target, dict):
                target[reader.strings[key_index]] = value
        elif name in ("PutOwnByIndex", "PutOwnByIndexL"):
            target = registers.get(instruction.arg1)
            if isinstance(target, list):
                index = instruction.arg3
                if not 0 <= index < len(target):
                    raise ValueError(f"#{spec.function_id}: indice array fuori limite {index}")
                target[index] = registers.get(instruction.arg2)
        elif name in ("StoreToEnvironment", "StoreNPToEnvironment"):
            environment[instruction.arg2] = registers.get(instruction.arg3)

    return Construction(registers, environment, objects, arrays)


def largest_dict(construction: Construction) -> dict[str, Any]:
    candidates = [value for value in construction.objects if value]
    if not candidates:
        raise ValueError("Nessun oggetto costruito")
    return max(candidates, key=len)


def merge_translation(
    chapters: list[dict[str, Any]],
    translations: dict[str, Any],
    suffix: str,
) -> None:
    """Replica mergeTraduzione #19702 con le diramazioni di #19704."""

    for chapter in chapters:
        translated = translations.get(chapter["id"])
        if not isinstance(translated, dict):
            raise ValueError(f"Traduzione {suffix} assente per {chapter['id']}")
        chapter[f"titolo{suffix}"] = translated.get("t")
        chapter[f"sottotitolo{suffix}"] = translated.get("s")

        blocks = chapter.get("blocchi")
        translated_blocks = translated.get("b")
        if not isinstance(blocks, list) or not isinstance(translated_blocks, list):
            raise ValueError(f"Blocchi {suffix} non validi per {chapter['id']}")
        if len(blocks) != len(translated_blocks):
            raise ValueError(
                f"Blocchi {suffix} disallineati per {chapter['id']}: "
                f"{len(blocks)} != {len(translated_blocks)}"
            )

        for block, translated_block in zip(blocks, translated_blocks, strict=True):
            if not isinstance(block, dict) or not isinstance(translated_block, dict):
                raise ValueError(f"Blocco {suffix} non oggetto per {chapter['id']}")
            block_type = block.get("t")
            if block_type in ("p", "nota"):
                if translated_block.get("testo"):
                    block[f"testo{suffix}"] = translated_block["testo"]
            elif block_type == "esempio":
                if translated_block.get("testo"):
                    block[f"testo{suffix}"] = translated_block["testo"]
                if translated_block.get("cibo"):
                    block[f"cibo{suffix}"] = translated_block["cibo"]
            elif block_type == "link":
                if translated_block.get("label"):
                    block[f"label{suffix}"] = translated_block["label"]
            elif block_type == "punti":
                if translated_block.get("voci"):
                    block[f"voci{suffix}"] = translated_block["voci"]


def add_verified_example_food_links(
    chapters: list[dict[str, Any]],
    catalog_path: Path,
) -> dict[str, Any]:
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    foods = catalog.get("alimenti")
    if not isinstance(foods, list):
        raise ValueError(f"Catalogo non valido: {catalog_path}")

    catalog_ids = {
        food.get("id")
        for food in foods
        if isinstance(food, dict) and isinstance(food.get("id"), str)
    }
    missing_ids = sorted(set(VERIFIED_EXAMPLE_FOOD_IDS.values()) - catalog_ids)
    if missing_ids:
        raise ValueError(f"foodId verificati assenti dal catalogo: {missing_ids}")

    linked = 0
    unlinked: list[dict[str, str]] = []
    for chapter in chapters:
        for block in chapter.get("blocchi", []):
            if not isinstance(block, dict) or block.get("t") != "esempio":
                continue
            food_name = block.get("cibo")
            food_id = (
                VERIFIED_EXAMPLE_FOOD_IDS.get(food_name)
                if isinstance(food_name, str)
                else None
            )
            if food_id:
                block["foodId"] = food_id
                linked += 1
            else:
                unlinked.append({
                    "chapter_id": str(chapter.get("id", "")),
                    "cibo": str(food_name or ""),
                })

    expected_unlinked = [{"chapter_id": "calorie", "cibo": "Olio e frutta secca"}]
    if linked != 28 or unlinked != expected_unlinked:
        raise ValueError(
            f"Collegamenti esempio inattesi: linked={linked}, unlinked={unlinked}"
        )
    return {
        "linked": linked,
        "unlinked": unlinked,
        "catalog": "docs/extracted/source-1.0.16-catalog-17813.json",
        "match": "etichetta italiana esatta",
    }


def validate(
    chapters: list[dict[str, Any]],
    raw_translations: dict[str, dict[str, Any]],
) -> dict[str, Any]:
    if len(chapters) != 50:
        raise ValueError(f"Capitoli inattesi: {len(chapters)}")
    if not all(isinstance(chapter, dict) for chapter in chapters):
        raise ValueError("Almeno un capitolo non è un oggetto")

    ids = [chapter.get("id") for chapter in chapters]
    if not all(isinstance(value, str) and value for value in ids):
        raise ValueError("Almeno un capitolo non ha ID")
    if len(set(ids)) != len(ids):
        raise ValueError("ID capitolo duplicati")

    block_counts: dict[str, int] = {}
    total_blocks = 0
    block_types: dict[str, int] = {}
    for chapter in chapters:
        blocks = chapter.get("blocchi")
        if not isinstance(blocks, list) or not all(isinstance(block, dict) for block in blocks):
            raise ValueError(f"Blocchi non validi per {chapter['id']}")
        block_counts[chapter["id"]] = len(blocks)
        total_blocks += len(blocks)
        for block in blocks:
            block_type = block.get("t")
            if isinstance(block_type, str):
                block_types[block_type] = block_types.get(block_type, 0) + 1

    if total_blocks != 226:
        raise ValueError(f"Blocchi inattesi: {total_blocks}")

    expected_ids = set(ids)
    translation_validation: dict[str, Any] = {}
    for language, translations in raw_translations.items():
        actual_ids = set(translations)
        if actual_ids != expected_ids:
            raise ValueError(
                f"ID {language} disallineati: mancanti={sorted(expected_ids - actual_ids)}, "
                f"extra={sorted(actual_ids - expected_ids)}"
            )
        mismatches = []
        for chapter_id, expected_count in block_counts.items():
            translated_blocks = translations[chapter_id].get("b")
            actual_count = len(translated_blocks) if isinstance(translated_blocks, list) else -1
            if actual_count != expected_count:
                mismatches.append(
                    {"id": chapter_id, "base": expected_count, language: actual_count}
                )
        if mismatches:
            raise ValueError(f"Blocchi {language} disallineati: {mismatches}")
        translation_validation[language] = {
            "chapter_count": len(translations),
            "block_counts_match": True,
        }

    return {
        "chapter_count": len(chapters),
        "unique_id_count": len(set(ids)),
        "block_count": total_blocks,
        "block_types": dict(sorted(block_types.items())),
        "translations": translation_validation,
    }


def parse_args(default_output: Path, default_catalog: Path) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=default_output)
    parser.add_argument("--catalog", type=Path, default=default_catalog)
    parser.add_argument(
        "--candidate-bundle",
        type=Path,
        default=os.environ.get("SOURCE_CANDIDATE_BUNDLE"),
    )
    parser.add_argument("--source-brand", default=os.environ.get("SOURCE_BRAND"))
    parser.add_argument("--force", action="store_true")
    return parser.parse_args()


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    args = parse_args(
        project_root / "docs" / "extracted" / "source-1.0.16-learning-19701.json",
        project_root / "docs" / "extracted" / "source-1.0.16-catalog-17813.json",
    )
    if args.candidate_bundle is None:
        raise ValueError("Configura il bundle candidate con argomento o SOURCE_CANDIDATE_BUNDLE")
    if not args.source_brand:
        raise ValueError("Imposta --source-brand o SOURCE_BRAND per la redazione")
    bundle = args.candidate_bundle
    if args.output.exists() and not args.force:
        raise FileExistsError(f"Output già esistente (usa --force): {args.output}")

    reader, source = load_reader(bundle)
    specs = {
        "base": FunctionSpec(19701, 5234803),
        "es": FunctionSpec(19714, 5241307),
        "de": FunctionSpec(19716, 5246037),
        "fr": FunctionSpec(19718, 5250759),
    }
    built = {key: construct_literals(reader, spec) for key, spec in specs.items()}

    base_environment = built["base"].environment
    chapters = base_environment.get(5)
    if not isinstance(chapters, list):
        raise ValueError("CAPITOLI non trovato nello slot 5 di #19701")
    if not all(isinstance(chapter, dict) for chapter in chapters):
        raise ValueError("CAPITOLI contiene valori incompleti")

    raw_translations = {
        language: largest_dict(built[language]) for language in ("es", "de", "fr")
    }
    unified = copy.deepcopy(chapters)
    for language, translations in raw_translations.items():
        merge_translation(unified, translations, f"_{language}")
    link_validation = add_verified_example_food_links(unified, args.catalog)

    base_sections = base_environment.get(0)
    section_maps = {
        "en": base_environment.get(1),
        "es": base_environment.get(2),
        "de": base_environment.get(3),
        "fr": base_environment.get(4),
    }
    if not isinstance(base_sections, list) or not all(
        isinstance(mapping, dict) for mapping in section_maps.values()
    ):
        raise ValueError("SEZIONI o mappe lingua non trovate negli slot 0-4")
    sections = {
        "it": base_sections,
        **{
            language: [mapping[section] for section in base_sections]
            for language, mapping in section_maps.items()
        },
    }

    validation = validate(unified, raw_translations)
    validation["example_food_links"] = link_validation
    output = {
        "_provenance": {
            "version": "1.0.16",
            "hermes_version": reader.header.version,
            "bundle": "candidate/resources/assets/index.android.bundle",
            "functions": {
                key: {"function_id": spec.function_id, "offset": spec.offset}
                for key, spec in specs.items()
            },
            "merge_functions": [19702, 19703, 19704],
            "merge_note": "Vista unificata ottenuta replicando esattamente i rami per p/nota/esempio/link/punti.",
            "verified_enrichment": "foodId aggiunti solo da mappa esatta validata contro il catalogo estratto.",
        },
        "_validation": validation,
        "sezioni": sections,
        "capitoli": unified,
        "traduzioni_raw": raw_translations,
    }
    redacted_output = redact_source_brand(output, args.source_brand)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(redacted_output, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    print(
        f"learning: {validation['chapter_count']} capitoli, "
        f"{validation['block_count']} blocchi, lingue it/en/es/de/fr; {args.output}"
    )
    source.close()


if __name__ == "__main__":
    main()
