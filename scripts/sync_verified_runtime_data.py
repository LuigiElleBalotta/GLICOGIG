#!/usr/bin/env python3
"""Valida gli estratti redatti e genera i payload runtime curati 1.0.16."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SOURCE_BRAND_PLACEHOLDER = "[SOURCE_BRAND]"

DATASETS = (
    (
        ROOT / "docs/extracted/source-1.0.16-catalog-17813.json",
        ROOT / "src/data/verified-1.0.16-catalog.json",
        "alimenti",
        307,
    ),
    (
        ROOT / "docs/extracted/source-1.0.16-recipes-17814.json",
        ROOT / "src/data/verified-1.0.16-recipes.json",
        "ricette",
        209,
    ),
    (
        ROOT / "docs/extracted/source-1.0.16-learning-19701.json",
        ROOT / "src/data/verified-1.0.16-learning.json",
        "capitoli",
        50,
    ),
    (
        ROOT / "docs/extracted/source-1.0.16-quiz-19765.json",
        ROOT / "src/data/verified-1.0.16-quiz.json",
        "domande",
        157,
    ),
)


def curate_runtime_copy(value: Any) -> Any:
    if isinstance(value, str):
        return (
            value.replace(
                f"Stima {SOURCE_BRAND_PLACEHOLDER} dai componenti",
                "Stima dai componenti",
            )
            .replace(
                f"Stima {SOURCE_BRAND_PLACEHOLDER} da referenze standard",
                "Stima da referenze standard",
            )
            .replace(SOURCE_BRAND_PLACEHOLDER, "GLICOGIG")
        )
    if isinstance(value, list):
        return [curate_runtime_copy(item) for item in value]
    if isinstance(value, dict):
        return {key: curate_runtime_copy(item) for key, item in value.items()}
    return value


def validate_and_sync(
    source: Path,
    destination: Path,
    collection_key: str,
    expected_count: int,
) -> None:
    payload = json.loads(source.read_text(encoding="utf-8"))
    collection = payload.get(collection_key)
    if not isinstance(collection, list) or len(collection) != expected_count:
        actual = len(collection) if isinstance(collection, list) else type(collection).__name__
        raise ValueError(f"{source.name}: {collection_key}={actual}, atteso {expected_count}")

    ids = [item.get("id") for item in collection if isinstance(item, dict)]
    if len(ids) != expected_count or any(
        not isinstance(item_id, str) or not item_id for item_id in ids
    ):
        raise ValueError(f"{source.name}: ID mancanti o non validi")
    if len(set(ids)) != expected_count:
        raise ValueError(f"{source.name}: ID duplicati")

    if collection_key == "capitoli":
        provenance = payload.get("_provenance")
        if isinstance(provenance, dict):
            provenance["bundle"] = "candidate/resources/assets/index.android.bundle"

    curated = curate_runtime_copy(payload)
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(
        json.dumps(curated, ensure_ascii=False, indent=2, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    print(f"{source.name} -> {destination.relative_to(ROOT)} ({expected_count})")


def main() -> None:
    for source, destination, collection_key, expected_count in DATASETS:
        validate_and_sync(source, destination, collection_key, expected_count)


if __name__ == "__main__":
    main()
