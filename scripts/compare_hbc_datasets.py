#!/usr/bin/env python3
"""Confronta i dataset Hermes estratti separando traduzioni e delta reali.

Il report resta documentale: non modifica i dataset importati dalla web app e
non considera i campi ``*_en``, ``*_es``, ``*_de`` e ``*_fr`` come modifiche
italiane, nutrizionali o funzionali.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from pathlib import Path
from typing import Any

TRANSLATION_KEY = re.compile(r"_(?:en|es|de|fr)$", re.IGNORECASE)
NUTRITION_TERMS = (
    "energia",
    "kcal",
    "carboidr",
    "zuccher",
    "fibre",
    "protein",
    "grassi",
    "sodio",
    "porzione",
    "grammi",
    "ig_",
    "carico_glicemico",
    "fascia",
)
EDITORIAL_TERMS = (
    "fonte",
    "revisione",
    "aggiornamento",
    "stato_editoriale",
    "tipo_dato",
    "affidabilita",
    "da_verificare",
    "formula_cg",
)
BEHAVIOR_TERMS = ("ig_variabile", "nascondi", "grammi_per_pezzo")


def strip_translation_fields(value: Any) -> Any:
    if isinstance(value, dict):
        return {
            key: strip_translation_fields(item)
            for key, item in value.items()
            if not TRANSLATION_KEY.search(key)
        }
    if isinstance(value, list):
        return [strip_translation_fields(item) for item in value]
    return value


def diff_values(before: Any, after: Any, path: str = "$") -> list[dict[str, Any]]:
    if isinstance(before, dict) and isinstance(after, dict):
        changes: list[dict[str, Any]] = []
        for key in sorted(before.keys() | after.keys(), key=str.casefold):
            child_path = f"{path}.{key}"
            if key not in before:
                changes.append({"path": child_path, "operation": "added", "after": after[key]})
            elif key not in after:
                changes.append({"path": child_path, "operation": "removed", "before": before[key]})
            else:
                changes.extend(diff_values(before[key], after[key], child_path))
        return changes

    if isinstance(before, list) and isinstance(after, list):
        changes = []
        common = min(len(before), len(after))
        for index in range(common):
            changes.extend(diff_values(before[index], after[index], f"{path}[{index}]"))
        for index in range(common, len(before)):
            changes.append(
                {"path": f"{path}[{index}]", "operation": "removed", "before": before[index]}
            )
        for index in range(common, len(after)):
            changes.append(
                {"path": f"{path}[{index}]", "operation": "added", "after": after[index]}
            )
        return changes

    if before != after or type(before) is not type(after):
        return [{"path": path, "operation": "changed", "before": before, "after": after}]
    return []


def is_translation_path(path: str) -> bool:
    return any(TRANSLATION_KEY.search(component) for component in re.split(r"\.|\[\d+\]", path))


def classify_change(path: str) -> str:
    lowered = path.casefold()
    if any(term in lowered for term in BEHAVIOR_TERMS):
        return "behavior_or_visibility"
    if any(term in lowered for term in EDITORIAL_TERMS):
        return "editorial_or_source"
    if any(term in lowered for term in NUTRITION_TERMS):
        return "nutrition_or_portion"
    return "italian_content_or_structure"


def summarize_changes(changes: list[dict[str, Any]]) -> dict[str, Any]:
    operation_counts = Counter(change["operation"] for change in changes)
    classification_counts = Counter(classify_change(change["path"]) for change in changes)
    path_counts = Counter(change["path"] for change in changes)
    return {
        "change_count": len(changes),
        "operations": dict(sorted(operation_counts.items())),
        "classifications": dict(sorted(classification_counts.items())),
        "paths": dict(sorted(path_counts.items())),
    }


def index_records(root: dict[str, Any], root_key: str, label: str) -> dict[str, dict[str, Any]]:
    records = root.get(root_key)
    if not isinstance(records, list):
        raise ValueError(f"{label}: {root_key} non è un array")
    indexed: dict[str, dict[str, Any]] = {}
    for index, record in enumerate(records):
        if not isinstance(record, dict):
            raise ValueError(f"{label}: voce {index} non è un oggetto")
        record_id = record.get("id")
        if not isinstance(record_id, str) or not record_id:
            raise ValueError(f"{label}: voce {index} senza ID testuale")
        if record_id in indexed:
            raise ValueError(f"{label}: ID duplicato {record_id!r}")
        indexed[record_id] = record
    return indexed


def compare_dataset(
    baseline: dict[str, Any],
    candidate: dict[str, Any],
    *,
    kind: str,
    root_key: str,
) -> dict[str, Any]:
    before_by_id = index_records(baseline, root_key, f"{kind} baseline")
    after_by_id = index_records(candidate, root_key, f"{kind} candidate")
    before_ids = set(before_by_id)
    after_ids = set(after_by_id)
    common_ids = sorted(before_ids & after_ids)
    added_ids = sorted(after_ids - before_ids)
    removed_ids = sorted(before_ids - after_ids)

    translation_only_ids: list[str] = []
    unchanged_ids: list[str] = []
    changed_records: list[dict[str, Any]] = []
    all_non_translation_paths: Counter[str] = Counter()
    all_raw_paths: Counter[str] = Counter()
    raw_translation_change_count = 0

    for record_id in common_ids:
        before = before_by_id[record_id]
        after = after_by_id[record_id]
        raw_changes = diff_values(before, after)
        real_changes = diff_values(
            strip_translation_fields(before),
            strip_translation_fields(after),
        )
        all_raw_paths.update(change["path"] for change in raw_changes)
        raw_translation_change_count += sum(
            1 for change in raw_changes if is_translation_path(change["path"])
        )

        if not real_changes:
            if raw_changes:
                translation_only_ids.append(record_id)
            else:
                unchanged_ids.append(record_id)
            continue

        all_non_translation_paths.update(change["path"] for change in real_changes)
        summary = summarize_changes(real_changes)
        changed_records.append(
            {
                "id": record_id,
                "change_count": summary["change_count"],
                "classifications": summary["classifications"],
                "changes": real_changes,
            }
        )

    meta_changes = diff_values(
        strip_translation_fields(baseline.get("_meta")),
        strip_translation_fields(candidate.get("_meta")),
        "$._meta",
    )
    classification_record_counts = Counter()
    for record in changed_records:
        classification_record_counts.update(record["classifications"].keys())

    return {
        "kind": kind,
        "root_key": root_key,
        "counts": {
            "baseline": len(before_by_id),
            "candidate": len(after_by_id),
            "common": len(common_ids),
            "added": len(added_ids),
            "removed": len(removed_ids),
            "unchanged": len(unchanged_ids),
            "translation_only_changed": len(translation_only_ids),
            "non_translation_changed": len(changed_records),
        },
        "added_ids": added_ids,
        "removed_ids": removed_ids,
        "unchanged_ids": unchanged_ids,
        "translation_only_changed_ids": translation_only_ids,
        "non_translation_changed_ids": [record["id"] for record in changed_records],
        "non_translation_changed_record_counts_by_classification": dict(
            sorted(classification_record_counts.items())
        ),
        "translation_field_change_count_in_common_records": raw_translation_change_count,
        "most_common_raw_change_paths": dict(all_raw_paths.most_common(100)),
        "non_translation_change_paths": dict(sorted(all_non_translation_paths.items())),
        "meta_changes": meta_changes,
        "changed_records": changed_records,
    }


def load_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"Root JSON non oggetto: {path}")
    return value


def parse_args(default_output: Path) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=default_output)
    parser.add_argument("--force", action="store_true")
    return parser.parse_args()


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    extracted = project_root / "docs" / "extracted"
    args = parse_args(project_root / "docs" / "version-1.0.16-dataset-delta.json")
    if args.output.exists() and not args.force:
        raise FileExistsError(f"Output già esistente (usa --force): {args.output}")

    sources = {
        "catalog_baseline": extracted / "glicoden-1.0.0-catalog-14256.json",
        "catalog_candidate": extracted / "glicoden-1.0.16-catalog-17813.json",
        "recipes_baseline": extracted / "glicoden-1.0.0-recipes-14257.json",
        "recipes_candidate": extracted / "glicoden-1.0.16-recipes-17814.json",
    }
    loaded = {key: load_json(path) for key, path in sources.items()}
    report = {
        "method": {
            "description": "Confronto ricorsivo per ID; i campi con suffisso lingua sono esclusi dal delta non-localizzazione.",
            "translation_suffixes_excluded": ["_en", "_es", "_de", "_fr"],
            "list_comparison": "posizionale e ricorsivo",
            "sources": {key: str(path.relative_to(project_root)) for key, path in sources.items()},
        },
        "catalog": compare_dataset(
            loaded["catalog_baseline"],
            loaded["catalog_candidate"],
            kind="catalog",
            root_key="alimenti",
        ),
        "recipes": compare_dataset(
            loaded["recipes_baseline"],
            loaded["recipes_candidate"],
            kind="recipes",
            root_key="ricette",
        ),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(report, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    for key in ("catalog", "recipes"):
        counts = report[key]["counts"]
        print(
            f"{key}: {counts['baseline']} -> {counts['candidate']}; "
            f"aggiunti={counts['added']}, rimossi={counts['removed']}, "
            f"solo traduzioni={counts['translation_only_changed']}, "
            f"delta reali={counts['non_translation_changed']}"
        )
    print(args.output)


if __name__ == "__main__":
    main()
