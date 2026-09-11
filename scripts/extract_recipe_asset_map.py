#!/usr/bin/env python3
"""Verifica e pubblica la mappa immagini ricetta della sorgente 1.0.16.

La relazione viene provata tramite identità testuale esatta tra Recipe.id,
chiavi RECIPE_IMG della funzione Hermes #17916 e assets[].name del manifest.
Non vengono usati ordine, slug, similarità o confronto visivo.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import tempfile
from collections import Counter
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path
from typing import Any, Iterable

from hermes_dec.parsers.hbc_bytecode_parser import parse_hbc_bytecode
from hermes_dec.parsers.hbc_file_parser import HBCReader

EXPECTED_COUNT = 209
EXPECTED_HERMES_VERSION = 96
RECIPE_FUNCTION_ID = 17916
RECIPE_FUNCTION_OFFSET = 4_915_712
RECIPE_FUNCTION_SIZE = 3_898
RECIPE_IMAGE_FUNCTION_ID = 17922
RECIPE_IMAGE_FUNCTION_OFFSET = 4_919_610
RECIPE_IMAGE_FUNCTION_SIZE = 24
EXPECTED_DEPENDENCY_SLOTS = tuple(range(5, 214))
RECIPE_SUBDIRECTORY = "/assets/assets/recipes"
MD5_PATTERN = re.compile(r"[0-9a-f]{32}")

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PROJECT_ROOT.parent / "GLICODEN_1.0.16"
BUNDLE_PATH = SOURCE_ROOT / "resources" / "assets" / "index.android.bundle"
MANIFEST_PATH = SOURCE_ROOT / "resources" / "assets" / "app.manifest"
DRAWABLE_PATH = SOURCE_ROOT / "resources" / "res" / "drawable-mdpi"
RECIPES_PATH = PROJECT_ROOT / "src" / "data" / "verified-1.0.16-recipes.json"
REPORT_PATH = PROJECT_ROOT / "docs" / "recipe-asset-map-1.0.16.json"
LOOKUP_PATH = PROJECT_ROOT / "src" / "generated" / "recipeAssetMap.ts"
PUBLIC_RECIPES_PATH = PROJECT_ROOT / "public" / "recipes"


@dataclass(frozen=True)
class HermesRecipeAsset:
    recipe_id: str
    dependency_slot: int


@dataclass(frozen=True)
class VerifiedRecipeAsset:
    recipe_id: str
    recipe_name: str
    dependency_slot: int
    manifest_name: str
    packager_hash: str
    payload_sha256: str
    resources_filename: str
    source_path: Path
    public_filename: str
    public_url: str
    payload: bytes


def reject_duplicate_json_keys(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Chiave JSON duplicata: {key!r}")
        result[key] = value
    return result


def load_json(path: Path) -> tuple[Any, bytes]:
    raw = path.read_bytes()
    try:
        value = json.loads(raw.decode("utf-8"), object_pairs_hook=reject_duplicate_json_keys)
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise ValueError(f"JSON non valido: {path}") from error
    return value, raw


def sha256_bytes(payload: bytes) -> str:
    return hashlib.sha256(payload).hexdigest()


def md5_bytes(payload: bytes) -> str:
    return hashlib.md5(payload).hexdigest()  # noqa: S324 - verifica hash Expo, non sicurezza


def relative_to_project(path: Path) -> str:
    return Path(os.path.relpath(path, PROJECT_ROOT)).as_posix()


def instruction_args(instruction: Any, count: int) -> tuple[Any, ...]:
    return tuple(getattr(instruction, f"arg{index}") for index in range(1, count + 1))


def assert_instruction(
    instruction: Any,
    expected_name: str,
    expected_args: tuple[Any, ...],
    context: str,
) -> None:
    actual_name = instruction.inst.name
    actual_args = instruction_args(instruction, len(expected_args))
    if actual_name != expected_name or actual_args != expected_args:
        raise ValueError(
            f"{context}: istruzione inattesa {actual_name}{actual_args}; "
            f"attesa {expected_name}{expected_args}"
        )


def instruction_matches(
    instruction: Any,
    expected_name: str,
    expected_args: tuple[Any, ...],
) -> bool:
    return (
        instruction.inst.name == expected_name
        and instruction_args(instruction, len(expected_args)) == expected_args
    )


def require_function_header(
    reader: HBCReader,
    function_id: int,
    expected_offset: int,
    expected_size: int,
    expected_name: str,
) -> Any:
    if not 0 <= function_id < len(reader.function_headers):
        raise ValueError(f"Funzione Hermes assente: #{function_id}")
    header = reader.function_headers[function_id]
    actual_name = reader.strings[header.functionName]
    if (
        header.offset != expected_offset
        or header.bytecodeSizeInBytes != expected_size
        or actual_name != expected_name
    ):
        raise ValueError(
            f"Header Hermes #{function_id} inatteso: "
            f"offset={header.offset}, bytes={header.bytecodeSizeInBytes}, "
            f"nome={actual_name!r}"
        )
    return header


def verify_recipe_image_lookup(reader: HBCReader) -> str:
    header = require_function_header(
        reader,
        RECIPE_IMAGE_FUNCTION_ID,
        RECIPE_IMAGE_FUNCTION_OFFSET,
        RECIPE_IMAGE_FUNCTION_SIZE,
        "recipeImage",
    )
    instructions = list(parse_hbc_bytecode(header, reader))
    expected_names = (
        "GetEnvironment",
        "LoadFromEnvironment",
        "LoadParam",
        "GetByVal",
        "LoadConstNull",
        "JNotEqual",
        "LoadConstNull",
        "Ret",
    )
    if tuple(item.inst.name for item in instructions) != expected_names:
        raise ValueError("#17922 non conserva la forma di lookup diretto con fallback null")
    for index, name, args in (
        (0, "GetEnvironment", (0, 0)),
        (1, "LoadFromEnvironment", (1, 0, 2)),
        (2, "LoadParam", (0, 1)),
        (3, "GetByVal", (0, 1, 0)),
        (4, "LoadConstNull", (1,)),
        (6, "LoadConstNull", (0,)),
        (7, "Ret", (0,)),
    ):
        assert_instruction(instructions[index], name, args, f"#17922[{index}]")
    return sha256_bytes("\n".join(str(item) for item in instructions).encode("utf-8"))


def extract_hermes_recipe_assets(reader: HBCReader) -> tuple[list[HermesRecipeAsset], str]:
    header = require_function_header(
        reader,
        RECIPE_FUNCTION_ID,
        RECIPE_FUNCTION_OFFSET,
        RECIPE_FUNCTION_SIZE,
        "",
    )
    instructions = list(parse_hbc_bytecode(header, reader))
    if len(instructions) < 10:
        raise ValueError("#17916 è strutturalmente troppo corta")
    for index, name, args in (
        (0, "CreateEnvironment", (2,)),
        (1, "LoadParam", (4, 2)),
        (2, "LoadParam", (7, 6)),
        (3, "LoadParam", (5, 7)),
    ):
        assert_instruction(instructions[index], name, args, f"#17916[{index}]")

    object_starts = [
        index
        for index in range(1, len(instructions))
        if instruction_matches(instructions[index - 1], "StoreToEnvironment", (2, 1, 1))
        and instruction_matches(instructions[index], "NewObject", (1,))
    ]
    if len(object_starts) != 1:
        raise ValueError(
            "#17916: impossibile identificare univocamente l'oggetto RECIPE_IMG"
        )
    body_start = object_starts[0] + 1
    body_ends = [
        index
        for index in range(body_start, len(instructions))
        if instruction_matches(instructions[index], "StoreToEnvironment", (2, 2, 1))
    ]
    if len(body_ends) != 1:
        raise ValueError("#17916: salvataggio RECIPE_IMG assente o ambiguo")
    body_end = body_ends[0]
    body = instructions[body_start:body_end]
    if len(body) != EXPECTED_COUNT * 4:
        raise ValueError(
            f"#17916: corpo RECIPE_IMG di {len(body)} istruzioni; "
            f"attese {EXPECTED_COUNT * 4}"
        )

    extracted: list[HermesRecipeAsset] = []
    for entry_index in range(EXPECTED_COUNT):
        chunk = body[entry_index * 4:(entry_index + 1) * 4]
        load, get, call, put = chunk
        if load.inst.name != "LoadConstUInt8" or instruction_args(load, 1) != (3,):
            raise ValueError(f"RECIPE_IMG[{entry_index}]: slot depMap non strutturale")
        dependency_slot = load.arg2
        assert_instruction(get, "GetByVal", (3, 5, 3), f"RECIPE_IMG[{entry_index}].depMap")
        assert_instruction(call, "Call2", (3, 4, 0, 3), f"RECIPE_IMG[{entry_index}].require")
        if put.inst.name != "PutNewOwnById" or instruction_args(put, 2) != (1, 3):
            raise ValueError(f"RECIPE_IMG[{entry_index}]: assegnazione chiave inattesa")
        string_id = put.arg3
        if not 0 <= string_id < len(reader.strings):
            raise ValueError(f"RECIPE_IMG[{entry_index}]: string_id fuori intervallo")
        recipe_id = reader.strings[string_id]
        if not isinstance(recipe_id, str) or not recipe_id:
            raise ValueError(f"RECIPE_IMG[{entry_index}]: chiave vuota o non testuale")
        extracted.append(HermesRecipeAsset(recipe_id, dependency_slot))

    expected_tail = (
        ("StoreToEnvironment", (2, 2, 1)),
        ("CreateClosure", (1, 2, RECIPE_IMAGE_FUNCTION_ID)),
        ("StoreToEnvironment", (2, 3, 1)),
        ("CreateClosure", (1, 2, 17923)),
        ("StoreToEnvironment", (2, 4, 1)),
        ("Ret", (0,)),
    )
    tail = instructions[body_end:]
    if len(tail) != len(expected_tail):
        raise ValueError("#17916: coda inattesa dopo RECIPE_IMG")
    for index, (name, args) in enumerate(expected_tail):
        assert_instruction(tail[index], name, args, f"#17916.tail[{index}]")

    recipe_ids = [item.recipe_id for item in extracted]
    dependency_slots = [item.dependency_slot for item in extracted]
    if len(recipe_ids) != EXPECTED_COUNT or len(set(recipe_ids)) != EXPECTED_COUNT:
        raise ValueError("#17916: le 209 chiavi RECIPE_IMG non sono univoche")
    if tuple(dependency_slots) != EXPECTED_DEPENDENCY_SLOTS:
        raise ValueError(
            "#17916: gli slot depMap non corrispondono esattamente a 5..213"
        )
    if len(set(dependency_slots)) != EXPECTED_COUNT:
        raise ValueError("#17916: slot depMap duplicati")

    digest = sha256_bytes("\n".join(str(item) for item in instructions).encode("utf-8"))
    return extracted, digest


def load_recipe_names(path: Path) -> tuple[dict[str, str], bytes]:
    root, raw = load_json(path)
    if not isinstance(root, dict) or not isinstance(root.get("ricette"), list):
        raise ValueError("Dataset ricette: root.ricette assente o non-array")
    recipes = root["ricette"]
    if len(recipes) != EXPECTED_COUNT:
        raise ValueError(
            f"Dataset ricette: {len(recipes)} record; attesi {EXPECTED_COUNT}"
        )
    result: dict[str, str] = {}
    for index, recipe in enumerate(recipes):
        if not isinstance(recipe, dict):
            raise ValueError(f"Dataset ricette[{index}]: record non-oggetto")
        recipe_id = recipe.get("id")
        recipe_name = recipe.get("nome")
        if not isinstance(recipe_id, str) or not recipe_id:
            raise ValueError(f"Dataset ricette[{index}]: id assente o vuoto")
        if not isinstance(recipe_name, str) or not recipe_name:
            raise ValueError(f"Dataset ricette[{index}]: nome assente o vuoto")
        if recipe_id in result:
            raise ValueError(f"Dataset ricette: id duplicato {recipe_id!r}")
        result[recipe_id] = recipe_name
    return result, raw


def load_manifest_recipe_assets(path: Path) -> tuple[dict[str, dict[str, Any]], dict[str, Any], bytes]:
    root, raw = load_json(path)
    if not isinstance(root, dict) or not isinstance(root.get("assets"), list):
        raise ValueError("Manifest: assets assente o non-array")
    if not isinstance(root.get("id"), str) or not root["id"]:
        raise ValueError("Manifest: id assente o non valido")
    if type(root.get("commitTime")) is not int:
        raise ValueError("Manifest: commitTime assente o non intero")
    if not all(isinstance(asset, dict) for asset in root["assets"]):
        raise ValueError("Manifest: almeno un asset non è un oggetto")

    selected = [
        asset for asset in root["assets"]
        if asset.get("subdirectory") == RECIPE_SUBDIRECTORY
    ]
    if len(selected) != EXPECTED_COUNT:
        raise ValueError(
            f"Manifest: {len(selected)} record ricetta; attesi {EXPECTED_COUNT}"
        )

    by_name: dict[str, dict[str, Any]] = {}
    resources_filenames: set[str] = set()
    for index, asset in enumerate(selected):
        name = asset.get("name")
        packager_hash = asset.get("packagerHash")
        resources_filename = asset.get("resourcesFilename")
        if not isinstance(name, str) or not name:
            raise ValueError(f"Manifest ricette[{index}]: name assente o vuoto")
        if name in by_name:
            raise ValueError(f"Manifest ricette: name duplicato {name!r}")
        if asset.get("type") != "jpg":
            raise ValueError(f"Manifest ricette[{index}]: type non jpg")
        if type(asset.get("scale")) is not int or asset["scale"] != 1:
            raise ValueError(f"Manifest ricette[{index}]: scale non esattamente 1")
        scales = asset.get("scales")
        if not isinstance(scales, list) or len(scales) != 1 or type(scales[0]) is not int or scales[0] != 1:
            raise ValueError(f"Manifest ricette[{index}]: scales non esattamente [1]")
        if asset.get("resourcesFolder") != "drawable":
            raise ValueError(f"Manifest ricette[{index}]: resourcesFolder non drawable")
        if not isinstance(packager_hash, str) or not MD5_PATTERN.fullmatch(packager_hash):
            raise ValueError(f"Manifest ricette[{index}]: packagerHash non MD5 lowercase")
        if not isinstance(resources_filename, str) or not resources_filename:
            raise ValueError(f"Manifest ricette[{index}]: resourcesFilename assente")
        if resources_filename in resources_filenames:
            raise ValueError(
                f"Manifest ricette: resourcesFilename duplicato {resources_filename!r}"
            )
        resources_filenames.add(resources_filename)
        by_name[name] = asset
    return by_name, root, raw


def verify_physical_assets(
    hermes_assets: Iterable[HermesRecipeAsset],
    recipe_names: dict[str, str],
    manifest_assets: dict[str, dict[str, Any]],
) -> list[VerifiedRecipeAsset]:
    if not DRAWABLE_PATH.is_dir():
        raise ValueError(f"Directory drawable assente: {DRAWABLE_PATH}")
    drawable_entries = list(DRAWABLE_PATH.iterdir())
    verified: list[VerifiedRecipeAsset] = []
    source_paths: set[Path] = set()
    public_filenames: set[str] = set()

    for hermes_asset in hermes_assets:
        recipe_id = hermes_asset.recipe_id
        asset = manifest_assets[recipe_id]
        resources_filename = asset["resourcesFilename"]
        candidates = [
            path for path in drawable_entries
            if path.stem == resources_filename
        ]
        if len(candidates) != 1:
            raise ValueError(
                f"{recipe_id}: trovati {len(candidates)} file fisici per "
                f"resourcesFilename={resources_filename!r}; atteso uno"
            )
        source_path = candidates[0]
        expected_filename = f"{resources_filename}.jpg"
        if source_path.name != expected_filename or not source_path.is_file():
            raise ValueError(
                f"{recipe_id}: file fisico inatteso {source_path.name!r}; "
                f"atteso {expected_filename!r}"
            )
        resolved_source = source_path.resolve()
        if resolved_source in source_paths:
            raise ValueError(f"{recipe_id}: file fisico riutilizzato ambiguamente")
        source_paths.add(resolved_source)

        payload = source_path.read_bytes()
        if len(payload) < 4 or not payload.startswith(b"\xff\xd8") or not payload.endswith(b"\xff\xd9"):
            raise ValueError(f"{recipe_id}: firma JPEG non valida")
        payload_md5 = md5_bytes(payload)
        if payload_md5 != asset["packagerHash"]:
            raise ValueError(
                f"{recipe_id}: MD5 {payload_md5} diverso da "
                f"packagerHash {asset['packagerHash']}"
            )
        public_filename = expected_filename
        if public_filename in public_filenames:
            raise ValueError(f"{recipe_id}: nome file pubblico duplicato")
        public_filenames.add(public_filename)
        verified.append(
            VerifiedRecipeAsset(
                recipe_id=recipe_id,
                recipe_name=recipe_names[recipe_id],
                dependency_slot=hermes_asset.dependency_slot,
                manifest_name=asset["name"],
                packager_hash=asset["packagerHash"],
                payload_sha256=sha256_bytes(payload),
                resources_filename=resources_filename,
                source_path=source_path,
                public_filename=public_filename,
                public_url=f"/recipes/{public_filename}",
                payload=payload,
            )
        )

    if len(verified) != EXPECTED_COUNT:
        raise ValueError(f"File verificati: {len(verified)}; attesi {EXPECTED_COUNT}")
    return verified


def aggregate_payload_sha256(assets: Iterable[VerifiedRecipeAsset]) -> str:
    digest = hashlib.sha256()
    for asset in sorted(assets, key=lambda item: item.public_filename):
        digest.update(asset.public_filename.encode("utf-8"))
        digest.update(b"\0")
        digest.update(asset.payload)
        digest.update(b"\0")
    return digest.hexdigest()


def build_report(
    assets: list[VerifiedRecipeAsset],
    manifest: dict[str, Any],
    input_hashes: dict[str, str],
    recipe_function_hash: str,
    lookup_function_hash: str,
) -> dict[str, Any]:
    md5_counts = Counter(asset.packager_hash for asset in assets)
    duplicate_md5_groups = {
        digest: sorted(asset.recipe_id for asset in assets if asset.packager_hash == digest)
        for digest, count in sorted(md5_counts.items())
        if count > 1
    }
    records = {
        asset.recipe_id: {
            "recipeId": asset.recipe_id,
            "recipeName": asset.recipe_name,
            "dependencySlot": asset.dependency_slot,
            "manifestName": asset.manifest_name,
            "packagerHash": asset.packager_hash,
            "payloadSha256": asset.payload_sha256,
            "resourcesFilename": asset.resources_filename,
            "sourceFile": relative_to_project(asset.source_path),
            "publicFile": f"public/recipes/{asset.public_filename}",
            "publicUrl": asset.public_url,
        }
        for asset in sorted(assets, key=lambda item: item.recipe_id)
    }
    return {
        "_provenance": {
            "sourceVersion": "1.0.16",
            "bundle": {
                "path": relative_to_project(BUNDLE_PATH),
                "sha256": input_hashes["bundle"],
                "hermesVersion": EXPECTED_HERMES_VERSION,
            },
            "manifest": {
                "path": relative_to_project(MANIFEST_PATH),
                "sha256": input_hashes["manifest"],
                "id": manifest["id"],
                "commitTime": manifest["commitTime"],
            },
            "recipeDataset": {
                "path": relative_to_project(RECIPES_PATH),
                "sha256": input_hashes["recipes"],
            },
            "functions": {
                "recipeAssetModule": {
                    "id": RECIPE_FUNCTION_ID,
                    "offset": RECIPE_FUNCTION_OFFSET,
                    "bytecodeSize": RECIPE_FUNCTION_SIZE,
                    "instructionSha256": recipe_function_hash,
                },
                "recipeImage": {
                    "id": RECIPE_IMAGE_FUNCTION_ID,
                    "offset": RECIPE_IMAGE_FUNCTION_OFFSET,
                    "bytecodeSize": RECIPE_IMAGE_FUNCTION_SIZE,
                    "instructionSha256": lookup_function_hash,
                },
            },
            "matchingRule": "Recipe.id === RECIPE_IMG key === manifest asset.name",
        },
        "_validation": {
            "expectedCount": EXPECTED_COUNT,
            "recipeCount": len(assets),
            "hermesKeyCount": len(assets),
            "manifestRecordCount": len(assets),
            "physicalFileCount": len(assets),
            "uniqueRecipeIdCount": len({asset.recipe_id for asset in assets}),
            "uniqueHermesKeyCount": len({asset.recipe_id for asset in assets}),
            "uniqueManifestNameCount": len({asset.manifest_name for asset in assets}),
            "uniqueResourceFilenameCount": len({asset.resources_filename for asset in assets}),
            "uniquePhysicalFileCount": len({asset.source_path.resolve() for asset in assets}),
            "dependencySlotCount": len({asset.dependency_slot for asset in assets}),
            "dependencySlotMin": min(asset.dependency_slot for asset in assets),
            "dependencySlotMax": max(asset.dependency_slot for asset in assets),
            "dependencySlotsExactly5Through213": tuple(
                asset.dependency_slot for asset in assets
            ) == EXPECTED_DEPENDENCY_SLOTS,
            "recipeIdsEqualHermesKeys": True,
            "hermesKeysEqualManifestNames": True,
            "singlePhysicalFilePerResourceCount": len(assets),
            "jpegSignatureMatchCount": len(assets),
            "packagerMd5MatchCount": len(assets),
            "distinctPayloadMd5Count": len(md5_counts),
            "duplicatePayloadMd5GroupCount": len(duplicate_md5_groups),
            "duplicatePayloadMd5Groups": duplicate_md5_groups,
            "publicJpegAggregateSha256": aggregate_payload_sha256(assets),
        },
        "recipes": records,
    }


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def build_typescript_lookup(assets: list[VerifiedRecipeAsset]) -> str:
    lines = [
        "// Generato da scripts/extract_recipe_asset_map.py; non modificare manualmente.",
        "export interface RecipeAsset {",
        "  readonly recipeId: string",
        "  readonly recipeName: string",
        "  readonly src: string",
        "}",
        "",
        "export const RECIPE_ASSET_BY_ID: Readonly<Record<string, RecipeAsset>> = Object.freeze({",
    ]
    for asset in sorted(assets, key=lambda item: item.recipe_id):
        lines.extend(
            [
                f"  {ts_string(asset.recipe_id)}: Object.freeze({{",
                f"    recipeId: {ts_string(asset.recipe_id)},",
                f"    recipeName: {ts_string(asset.recipe_name)},",
                f"    src: {ts_string(asset.public_url)},",
                "  }),",
            ]
        )
    lines.extend(["})", ""])
    return "\n".join(lines)


def ensure_publish_allowed(force: bool) -> None:
    existing = [path for path in (REPORT_PATH, LOOKUP_PATH) if path.exists()]
    if PUBLIC_RECIPES_PATH.exists():
        existing.append(PUBLIC_RECIPES_PATH)
    if existing and not force:
        raise FileExistsError(
            "Output già esistenti; rieseguire con --force: "
            + ", ".join(str(path) for path in existing)
        )
    if PUBLIC_RECIPES_PATH.exists():
        unexpected = [
            path for path in PUBLIC_RECIPES_PATH.iterdir()
            if not path.is_file() or path.suffix != ".jpg"
        ]
        if unexpected:
            raise ValueError(
                "public/recipes contiene elementi non gestiti: "
                + ", ".join(path.name for path in unexpected)
            )


def publish_staged(stage_root: Path, force: bool) -> None:
    ensure_publish_allowed(force)
    stage_report = stage_root / REPORT_PATH.name
    stage_lookup = stage_root / LOOKUP_PATH.name
    stage_recipes = stage_root / "recipes"

    backup_root = stage_root / "backup"
    backup_root.mkdir()
    report_existed = REPORT_PATH.exists()
    lookup_existed = LOOKUP_PATH.exists()
    recipes_existed = PUBLIC_RECIPES_PATH.exists()
    if report_existed:
        shutil.copy2(REPORT_PATH, backup_root / REPORT_PATH.name)
    if lookup_existed:
        shutil.copy2(LOOKUP_PATH, backup_root / LOOKUP_PATH.name)
    if recipes_existed:
        shutil.copytree(PUBLIC_RECIPES_PATH, backup_root / "recipes")

    try:
        REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
        LOOKUP_PATH.parent.mkdir(parents=True, exist_ok=True)
        PUBLIC_RECIPES_PATH.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(stage_report, REPORT_PATH)
        shutil.copy2(stage_lookup, LOOKUP_PATH)
        if PUBLIC_RECIPES_PATH.exists():
            shutil.rmtree(PUBLIC_RECIPES_PATH)
        shutil.copytree(stage_recipes, PUBLIC_RECIPES_PATH)
    except Exception:
        if REPORT_PATH.exists():
            REPORT_PATH.unlink()
        if LOOKUP_PATH.exists():
            LOOKUP_PATH.unlink()
        if PUBLIC_RECIPES_PATH.exists():
            shutil.rmtree(PUBLIC_RECIPES_PATH)
        if report_existed:
            shutil.copy2(backup_root / REPORT_PATH.name, REPORT_PATH)
        if lookup_existed:
            shutil.copy2(backup_root / LOOKUP_PATH.name, LOOKUP_PATH)
        if recipes_existed:
            shutil.copytree(backup_root / "recipes", PUBLIC_RECIPES_PATH)
        raise


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--force",
        action="store_true",
        help="Sostituisce esclusivamente gli output generati da questo script.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    for required_path in (BUNDLE_PATH, MANIFEST_PATH, RECIPES_PATH):
        if not required_path.is_file():
            raise FileNotFoundError(f"Input richiesto assente: {required_path}")

    bundle_bytes = BUNDLE_PATH.read_bytes()
    source = BytesIO(bundle_bytes)
    reader = HBCReader()
    reader.read_whole_file(source)
    if reader.header.version != EXPECTED_HERMES_VERSION:
        raise ValueError(
            f"Versione Hermes {reader.header.version}; attesa {EXPECTED_HERMES_VERSION}"
        )

    hermes_assets, recipe_function_hash = extract_hermes_recipe_assets(reader)
    lookup_function_hash = verify_recipe_image_lookup(reader)
    recipe_names, recipes_raw = load_recipe_names(RECIPES_PATH)
    manifest_assets, manifest, manifest_raw = load_manifest_recipe_assets(MANIFEST_PATH)

    hermes_names = {asset.recipe_id for asset in hermes_assets}
    recipe_ids = set(recipe_names)
    manifest_names = set(manifest_assets)
    if recipe_ids != hermes_names:
        raise ValueError(
            "Set Recipe.id e chiavi RECIPE_IMG diversi: "
            f"solo dataset={sorted(recipe_ids - hermes_names)}, "
            f"solo Hermes={sorted(hermes_names - recipe_ids)}"
        )
    if hermes_names != manifest_names:
        raise ValueError(
            "Set chiavi RECIPE_IMG e manifest.name diversi: "
            f"solo Hermes={sorted(hermes_names - manifest_names)}, "
            f"solo manifest={sorted(manifest_names - hermes_names)}"
        )

    verified_assets = verify_physical_assets(
        hermes_assets,
        recipe_names,
        manifest_assets,
    )
    input_hashes = {
        "bundle": sha256_bytes(bundle_bytes),
        "manifest": sha256_bytes(manifest_raw),
        "recipes": sha256_bytes(recipes_raw),
    }
    report = build_report(
        verified_assets,
        manifest,
        input_hashes,
        recipe_function_hash,
        lookup_function_hash,
    )
    report_text = json.dumps(
        report,
        ensure_ascii=False,
        indent=2,
        allow_nan=False,
    ) + "\n"
    lookup_text = build_typescript_lookup(verified_assets)

    with tempfile.TemporaryDirectory(prefix="recipe-assets-1.0.16-") as temporary:
        stage_root = Path(temporary)
        (stage_root / REPORT_PATH.name).write_text(report_text, encoding="utf-8")
        (stage_root / LOOKUP_PATH.name).write_text(lookup_text, encoding="utf-8")
        stage_recipes = stage_root / "recipes"
        stage_recipes.mkdir()
        for asset in verified_assets:
            (stage_recipes / asset.public_filename).write_bytes(asset.payload)
        staged_files = list(stage_recipes.iterdir())
        if len(staged_files) != EXPECTED_COUNT:
            raise ValueError(
                f"Staging JPEG: {len(staged_files)} file; attesi {EXPECTED_COUNT}"
            )
        publish_staged(stage_root, args.force)

    validation = report["_validation"]
    print(
        "Verifica ricette 1.0.16 completata: "
        f"Hermes={validation['hermesKeyCount']}, "
        f"slot={validation['dependencySlotMin']}..{validation['dependencySlotMax']}, "
        f"dataset={validation['recipeCount']}, "
        f"manifest={validation['manifestRecordCount']}, "
        f"JPEG={validation['physicalFileCount']}, "
        f"MD5={validation['packagerMd5MatchCount']}"
    )
    print(
        "Payload: "
        f"MD5 distinti={validation['distinctPayloadMd5Count']}, "
        f"gruppi duplicati={validation['duplicatePayloadMd5GroupCount']}, "
        f"aggregate SHA-256={validation['publicJpegAggregateSha256']}"
    )
    print(
        "Input SHA-256: "
        f"bundle={input_hashes['bundle']}; "
        f"manifest={input_hashes['manifest']}; "
        f"recipes={input_hashes['recipes']}"
    )
    print(
        "Output SHA-256: "
        f"report={sha256_bytes(report_text.encode('utf-8'))}; "
        f"lookup={sha256_bytes(lookup_text.encode('utf-8'))}"
    )
    print(f"Output: {REPORT_PATH}; {LOOKUP_PATH}; {PUBLIC_RECIPES_PATH}")


if __name__ == "__main__":
    main()
