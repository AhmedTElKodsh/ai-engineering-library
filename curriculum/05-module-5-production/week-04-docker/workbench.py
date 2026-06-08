"""Reproducible local package workbench for Module 5 Week 4."""

from __future__ import annotations


def build_run_manifest(app_name: str, command: str, env_keys: list[str]) -> dict[str, object]:
    """Return a reproducible local run manifest."""
    # TODO: Include app_name, command, required_env, and artifact_paths.
    return {}


def validate_manifest(manifest: dict[str, object]) -> list[str]:
    """Return missing manifest fields."""
    # TODO: Check app_name, command, required_env, and artifact_paths.
    return []


def build_container_plan(base_image: str, entrypoint: str) -> dict[str, object]:
    """Return a Docker-style packaging plan without building an image."""
    # TODO: Include base_image, entrypoint, copy_paths, and non_root_user.
    return {}


def build_reviewer_runbook(manifest: dict[str, object], test_command: str) -> list[str]:
    """Return commands a reviewer can run."""
    # TODO: Include install, test, and app run commands.
    return []
