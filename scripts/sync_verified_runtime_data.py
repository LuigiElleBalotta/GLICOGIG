#!/usr/bin/env python3
"""Copia byte-per-byte i dataset verificati 1.0.16 nel runtime React."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

DATASETS = (
    (
        ROOT / "docs/extracted/glicoden-1.0.16-catalog-17813.json",
        ROOT / "src/data/glicoden-1.0.16-catalog.json",
        "alimenti",
        307,
    ),
    (
        ROOT / "docs/extracted/glicoden-1.0.16-recipes-17814.json",
        ROOT / "src/data/glicoden-1.0.16-recipes.json",
        "ricette",
        209,
    ),
    (
        ROOT / "docs/extracted/glicoden-1.0.16-learning-19701.json",
        ROOT / "src/data/glicoden-1.0.16-learning.json",
        "capitoli",
        50,
    ),
    (
        ROOT / "docs/extracted/glicoden-1.0.16-quiz-19765.json",
        ROOT / "src/data/glicoden-1.0.16-quiz.json",
        "domande",
        157,
    ),
)


def validate_and_copy(source: Path, destination: Path, collection_key: str, expected_count: int) -> None:
    raw = source.read_bytes()
    payload = json.loads(raw)
    collection = payload.get(collection_key)
    if not isinstance(collection, list) or len(collection) != expected_count:
        actual = len(collection) if isinstance(collection, list) else type(collection).__name__
        raise ValueError(f"{source.name}: {collection_key}={actual}, atteso {expected_count}")

    ids = [item.get("id") for item in collection if isinstance(item, dict)]
    if len(ids) != expected_count or any(not isinstance(item_id, str) or not item_id for item_id in ids):
        raise ValueError(f"{source.name}: ID mancanti o non validi")
    if len(set(ids)) != expected_count:
        raise ValueError(f"{source.name}: ID duplicati")

    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(raw)
    print(f"{source.name} -> {destination.relative_to(ROOT)} ({expected_count})")


def main() -> None:
    for source, destination, collection_key, expected_count in DATASETS:
        validate_and_copy(source, destination, collection_key, expected_count)


if __name__ == "__main__":
    main()
