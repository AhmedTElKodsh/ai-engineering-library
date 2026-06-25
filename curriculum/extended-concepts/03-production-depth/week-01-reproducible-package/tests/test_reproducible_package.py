import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import build_container_plan, build_reviewer_runbook, build_run_manifest, validate_manifest  # noqa: E402


def test_build_run_manifest_names_command_and_env():
    manifest = build_run_manifest("finagent", "python -m finagent", ["MODEL_NAME"])

    assert manifest["app_name"] == "finagent"
    assert manifest["command"] == "python -m finagent"
    assert manifest["required_env"] == ["MODEL_NAME"]


def test_validate_manifest_reports_missing_fields():
    assert validate_manifest({"app_name": "finagent"}) == ["command", "required_env", "artifact_paths"]


def test_build_container_plan_uses_non_root_user():
    plan = build_container_plan("python:3.12-slim", "python -m finagent")

    assert plan["base_image"] == "python:3.12-slim"
    assert plan["non_root_user"] is True


def test_build_reviewer_runbook_includes_test_and_run_commands():
    manifest = build_run_manifest("finagent", "python -m finagent", [])
    commands = build_reviewer_runbook(manifest, "python -m pytest")

    assert "python -m pytest" in commands
    assert "python -m finagent" in commands
