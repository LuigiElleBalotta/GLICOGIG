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

RECIPE_SHARD_PATHS = tuple(
    ROOT / f"src/data/verified-1.0.16-recipes-{index:02d}.json"
    for index in range(1, 4)
)
RECIPE_SHARD_MAX_BYTES = 400_000


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


def serialize_payload(payload: Any) -> str:
    return json.dumps(payload, ensure_ascii=False, indent=2, allow_nan=False) + "\n"


def serialize_shard_payload(payload: Any) -> str:
    return json.dumps(
        payload,
        ensure_ascii=False,
        separators=(",", ":"),
        allow_nan=False,
    ) + "\n"


def serialized_record_size(record: Any) -> int:
    serialized = json.dumps(
        record,
        ensure_ascii=False,
        separators=(",", ":"),
        allow_nan=False,
    )
    return len(f"{serialized},".encode("utf-8"))


def balanced_recipe_boundaries(collection: list[Any]) -> tuple[int, int]:
    if len(collection) < len(RECIPE_SHARD_PATHS):
        raise ValueError("ricette insufficienti per generare tre shard non vuoti")

    prefix_sizes = [0]
    for record in collection:
        prefix_sizes.append(prefix_sizes[-1] + serialized_record_size(record))

    total_size = prefix_sizes[-1]
    best_score: tuple[int, int, int, int, int] | None = None
    best_boundaries: tuple[int, int] | None = None
    for first_end in range(1, len(collection) - 1):
        for second_end in range(first_end + 1, len(collection)):
            sizes = (
                prefix_sizes[first_end],
                prefix_sizes[second_end] - prefix_sizes[first_end],
                total_size - prefix_sizes[second_end],
            )
            score = (
                max(sizes),
                max(sizes) - min(sizes),
                sum(abs(size * 3 - total_size) for size in sizes),
                first_end,
                second_end,
            )
            if best_score is None or score < best_score:
                best_score = score
                best_boundaries = (first_end, second_end)

    if best_boundaries is None:
        raise ValueError("impossibile determinare le frontiere degli shard ricette")
    return best_boundaries


def write_recipe_shards(curated: dict[str, Any]) -> None:
    collection = curated.get("ricette")
    if not isinstance(collection, list):
        raise ValueError("payload ricette curato non valido")

    first_end, second_end = balanced_recipe_boundaries(collection)
    ranges = ((0, first_end), (first_end, second_end), (second_end, len(collection)))
    for path, (start, end) in zip(RECIPE_SHARD_PATHS, ranges, strict=True):
        shard = {
            key: collection[start:end] if key == "ricette" else value
            for key, value in curated.items()
        }
        path.write_text(serialize_shard_payload(shard), encoding="utf-8")

    loaded_shards = [
        json.loads(path.read_text(encoding="utf-8")) for path in RECIPE_SHARD_PATHS
    ]
    expected_metadata = {key: value for key, value in curated.items() if key != "ricette"}
    combined_collection: list[Any] = []
    for path, shard in zip(RECIPE_SHARD_PATHS, loaded_shards, strict=True):
        shard_metadata = {key: value for key, value in shard.items() if key != "ricette"}
        shard_collection = shard.get("ricette")
        if shard_metadata != expected_metadata or not isinstance(shard_collection, list):
            raise ValueError(f"{path.name}: struttura o metadati non corrispondenti")
        combined_collection.extend(shard_collection)

        shard_size = path.stat().st_size
        if shard_size > RECIPE_SHARD_MAX_BYTES:
            raise ValueError(
                f"{path.name}: {shard_size} byte supera il limite "
                f"{RECIPE_SHARD_MAX_BYTES}"
            )

    combined_payload = {
        key: combined_collection if key == "ricette" else value
        for key, value in curated.items()
    }
    if combined_payload != curated:
        raise ValueError("drift rilevato: la concatenazione degli shard non è lossless")

    for path, shard in zip(RECIPE_SHARD_PATHS, loaded_shards, strict=True):
        print(
            f"{path.relative_to(ROOT)} "
            f"({len(shard['ricette'])}, {path.stat().st_size} byte)"
        )


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
    destination.write_text(serialize_payload(curated), encoding="utf-8")
    if collection_key == "ricette":
        write_recipe_shards(curated)
    print(f"{source.name} -> {destination.relative_to(ROOT)} ({expected_count})")


def main() -> None:
    for source, destination, collection_key, expected_count in DATASETS:
        validate_and_sync(source, destination, collection_key, expected_count)


if __name__ == "__main__":
    main()
