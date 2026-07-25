"""Run curriculum-contract checks that do not solve learner TODOs.

The curriculum intentionally starts with failing behavior tests. These checks
guard the parts that should still be healthy before a learner edits anything:
workbench imports, fixture syntax, reviewer-note shape, and lesson contract
signals.
"""

from __future__ import annotations

import argparse
import ast
import importlib.util
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path

import yaml


REPO_ROOT = Path(__file__).resolve().parents[1]
CURRICULUM_ROOT = REPO_ROOT / "curriculum"
REFERENCE_ROOT = REPO_ROOT / ".kiro" / "specs" / "curriculum-planning" / "implementation-notes"
CUMULATIVE_SPINE = (
    CURRICULUM_ROOT
    / "main-track"
    / "06-capstone-projects"
    / "week-03-integration-build"
)
MILESTONE_MAP = CURRICULUM_ROOT / "main-track" / "milestone-1-45-hour-map.md"
MAIN_TRACK_INDEX = CURRICULUM_ROOT / "main-track" / "README.md"
ROOT_README = REPO_ROOT / "README.md"
TWO_HOUR_PLAN = REPO_ROOT / "START_HERE_2_HOURS_PER_DAY.md"

SCAFFOLD_NAMES = {"workbench.py", "diagnostic_workbench.py"}
REFERENCE_REQUIRED_SECTIONS = ["## Intent", "## Intended Behavior", "## Reviewer Edge Cases"]
VALIDATION_REQUIRED_SECTIONS = ["## Commands", "## Expected Starter State", "## Reviewer Checks"]
SPINE_REQUIRED_FUNCTIONS = {
    "load_market_snapshot",
    "build_deterministic_summary",
    "load_evidence_chunks",
    "validate_request",
    "retrieve_evidence",
    "compose_finagent_brief",
    "run_finagent_workflow",
    "call_provider_with_retry",
    "dispatch_tool",
    "load_evaluation_cases",
    "run_milestone_application",
    "run_evaluation",
    "service_health",
    "handle_service_request",
    "build_http_server",
}
SPINE_REQUIRED_CHECKPOINTS = {
    "checkpoint_2",
    "checkpoint_3",
    "checkpoint_6",
    "checkpoint_7",
    "checkpoint_8",
    "checkpoint_9",
}
CAPABILITY_ROW = re.compile(
    r"^\|\s*(\d+)\s*\|.*?\|\s*(outside clock|[\d.]+h)\s*"
    r"\|\s*(outside clock|[\d.]+h)\s*\|",
    re.MULTILINE,
)


@dataclass(frozen=True)
class Issue:
    path: Path
    message: str

    def format(self) -> str:
        return f"{self.path.relative_to(REPO_ROOT)}: {self.message}"


def slug_for_scaffold(path: Path) -> str:
    relative = path.relative_to(CURRICULUM_ROOT)
    return "-".join(part.lower().replace("_", "-") for part in relative.parent.parts)


def discover_scaffolds() -> list[Path]:
    return sorted(
        path
        for path in CURRICULUM_ROOT.rglob("*.py")
        if path.name in SCAFFOLD_NAMES
        and "templates" not in path.parts
        and "resources" not in path.parts
    )


def import_scaffold(path: Path) -> Issue | None:
    module_name = "curriculum_quality_" + "_".join(path.relative_to(REPO_ROOT).parts).replace(".", "_")
    spec = importlib.util.spec_from_file_location(module_name, path)
    if spec is None or spec.loader is None:
        return Issue(path, "could not build import spec")

    module = importlib.util.module_from_spec(spec)
    previous_workbench = sys.modules.pop("workbench", None)
    previous_diagnostic = sys.modules.pop("diagnostic_workbench", None)
    sys.modules[module_name] = module
    try:
        spec.loader.exec_module(module)
    except Exception as error:  # noqa: BLE001 - report import error without hiding type.
        return Issue(path, f"import failed: {type(error).__name__}: {error}")
    finally:
        sys.modules.pop("workbench", None)
        sys.modules.pop("diagnostic_workbench", None)
        sys.modules.pop(module_name, None)
        if previous_workbench is not None:
            sys.modules["workbench"] = previous_workbench
        if previous_diagnostic is not None:
            sys.modules["diagnostic_workbench"] = previous_diagnostic

    return None


def check_fixtures() -> list[Issue]:
    issues: list[Issue] = []
    for path in sorted(CURRICULUM_ROOT.rglob("*")):
        if path.suffix.lower() == ".json":
            try:
                json.loads(path.read_text(encoding="utf-8"))
            except Exception as error:  # noqa: BLE001
                issues.append(Issue(path, f"invalid JSON fixture: {error}"))
        elif path.suffix.lower() in {".yaml", ".yml"}:
            try:
                yaml.safe_load(path.read_text(encoding="utf-8"))
            except Exception as error:  # noqa: BLE001
                issues.append(Issue(path, f"invalid YAML fixture: {error}"))
    return issues


def check_reference_notes(scaffolds: list[Path]) -> list[Issue]:
    issues: list[Issue] = []
    for scaffold in scaffolds:
        slug = slug_for_scaffold(scaffold)
        reference_note = REFERENCE_ROOT / f"{slug}-reference.md"
        validation_note = REFERENCE_ROOT / f"{slug}-validation.md"

        for path, sections in (
            (reference_note, REFERENCE_REQUIRED_SECTIONS),
            (validation_note, VALIDATION_REQUIRED_SECTIONS),
        ):
            if not path.exists():
                issues.append(Issue(path, "missing reviewer note"))
                continue
            text = path.read_text(encoding="utf-8")
            if f"Scaffold: `{scaffold.relative_to(REPO_ROOT).as_posix()}`" not in text:
                issues.append(Issue(path, "missing exact scaffold path"))
            for section in sections:
                if section not in text:
                    issues.append(Issue(path, f"missing section {section}"))

    legacy_notes = [
        path
        for path in REFERENCE_ROOT.glob("*.md")
        if path.name != "README.md"
        and not path.name.startswith("spec-")
        and not any(path.name == f"{slug_for_scaffold(scaffold)}-{kind}.md" for scaffold in scaffolds for kind in ("reference", "validation"))
    ]
    for path in legacy_notes:
        issues.append(Issue(path, "legacy or non-canonical reviewer note name"))
    return issues


def check_lesson_contract(scaffolds: list[Path]) -> list[Issue]:
    issues: list[Issue] = []
    for scaffold in scaffolds:
        folder = scaffold.parent
        for filename in ("README.md", "hints.md", "rubric.md"):
            path = folder / filename
            if not path.exists():
                issues.append(Issue(path, "missing learner-facing file"))
                continue
            text = path.read_text(encoding="utf-8")
            if filename == "README.md":
                banned = [
                    "Bring forward the previous module or week capability",
                    "Complete the primary TODO behavior",
                ]
                for phrase in banned:
                    if phrase in text:
                        issues.append(Issue(path, f"generic learner logic remains: {phrase}"))
            if filename == "hints.md":
                hint_markers = sum(
                    1
                    for line in text.splitlines()
                    if line.startswith("## Layer") or line.startswith("## Hint")
                )
                if hint_markers < 3:
                    issues.append(Issue(path, "hints should include at least three progressive hint levels"))
            if filename == "rubric.md" and len([line for line in text.splitlines() if line.startswith("|")]) < 6:
                issues.append(Issue(path, "rubric table is too thin to assess mastery"))
    return issues


def check_cumulative_spine() -> list[Issue]:
    issues: list[Issue] = []
    workbench = CUMULATIVE_SPINE / "workbench.py"
    spine_readme = CUMULATIVE_SPINE / "README.md"
    integration_tests = CUMULATIVE_SPINE / "tests" / "test_integration_build.py"
    checkpoint_tests = CUMULATIVE_SPINE / "tests" / "test_milestone_checkpoints.py"
    evaluation_fixture = CUMULATIVE_SPINE / "fixtures" / "evaluation_cases.json"
    start_here = REPO_ROOT / "START_HERE.md"

    try:
        tree = ast.parse(workbench.read_text(encoding="utf-8"))
        functions = {
            node.name
            for node in ast.walk(tree)
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))
        }
        for name in sorted(SPINE_REQUIRED_FUNCTIONS - functions):
            issues.append(Issue(workbench, f"missing cumulative function {name}"))
    except Exception as error:  # noqa: BLE001
        issues.append(Issue(workbench, f"could not inspect cumulative functions: {error}"))

    try:
        route_text = spine_readme.read_text(encoding="utf-8")
        for marker in ("| 4 |", "| 5 |"):
            if marker not in route_text:
                issues.append(Issue(spine_readme, f"missing separate route row {marker}"))
        for marker in (
            "percentage_change or validate_ticker",
            "validate_structured_answer",
            "load_golden_examples or summarize_eval",
            "estimate_tokens or select_context",
            "prepare_records or chunk_records",
            "quote_lookup or dispatch_tool_refuses",
            'health or error',
            "load_version_note or build_ci_command_checklist",
            "demo_script or limitation_note or interview_defense",
            "7h 30m",
        ):
            if marker not in route_text:
                issues.append(Issue(spine_readme, f"missing focused support marker {marker}"))
        if "selected checks" in route_text:
            issues.append(Issue(spine_readme, "supporting route still contains vague selectors"))
    except OSError as error:
        issues.append(Issue(spine_readme, f"could not inspect cumulative route: {error}"))

    try:
        integration_text = integration_tests.read_text(encoding="utf-8")
        for contract in (
            "test_load_evidence_chunks_rejects_missing_provenance",
            "test_retrieve_evidence_ranks_before_applying_context_budget",
            "test_run_finagent_workflow_abstains_without_approved_evidence",
        ):
            if contract not in integration_text:
                issues.append(Issue(integration_tests, f"missing {contract} contract"))
    except OSError as error:
        issues.append(Issue(integration_tests, f"could not read integration tests: {error}"))

    try:
        test_text = checkpoint_tests.read_text(encoding="utf-8")
        for checkpoint in sorted(SPINE_REQUIRED_CHECKPOINTS):
            if checkpoint not in test_text:
                issues.append(Issue(checkpoint_tests, f"missing {checkpoint} contract"))
        for contract in (
            "test_checkpoint_6_workflow_stops_before_provider_without_tool_approval",
            "test_checkpoint_7_service_contract_rejects_malformed_payloads",
            "input_tokens_estimated",
            "test_checkpoint_9_evaluation_reports_failure_categories",
        ):
            if contract not in test_text:
                issues.append(Issue(checkpoint_tests, f"missing {contract} contract"))
    except OSError as error:
        issues.append(Issue(checkpoint_tests, f"could not read checkpoint tests: {error}"))

    try:
        payload = json.loads(evaluation_fixture.read_text(encoding="utf-8"))
        cases = payload.get("cases") if isinstance(payload, dict) else None
        if not isinstance(cases, list) or not 10 <= len(cases) <= 15:
            issues.append(Issue(evaluation_fixture, "evaluation set must contain 10-15 cases"))
        else:
            case_ids = [case.get("case_id") for case in cases if isinstance(case, dict)]
            if len(case_ids) != len(cases) or len(set(case_ids)) != len(case_ids):
                issues.append(Issue(evaluation_fixture, "case IDs must be present and unique"))
            statuses = {
                case.get("expected_status")
                for case in cases
                if isinstance(case, dict)
            }
            required_statuses = {"supported", "abstained", "refused"}
            if not required_statuses.issubset(statuses):
                issues.append(
                    Issue(
                        evaluation_fixture,
                        "evaluation set must cover supported, abstained, and refused",
                    )
                )
    except Exception as error:  # noqa: BLE001
        issues.append(Issue(evaluation_fixture, f"could not inspect evaluation set: {error}"))

    try:
        entrypoint = start_here.read_text(encoding="utf-8")
        if "week-00-diagnostic -q" in entrypoint:
            issues.append(Issue(start_here, "entrypoint runs the full diagnostic TODO suite"))
        for marker in (
            "test_setup.py",
            "swap_without_temp",
            "safe_divide_zero_division",
        ):
            if marker not in entrypoint:
                issues.append(Issue(start_here, f"missing diagnostic entrypoint marker {marker}"))
    except OSError as error:
        issues.append(Issue(start_here, f"could not inspect learner entrypoint: {error}"))

    return issues


def check_milestone_hour_budget() -> list[Issue]:
    issues: list[Issue] = []
    try:
        text = MILESTONE_MAP.read_text(encoding="utf-8")
        rows = {
            int(block): (fast, full)
            for block, fast, full in CAPABILITY_ROW.findall(text)
        }
        if set(rows) != set(range(10)):
            issues.append(Issue(MILESTONE_MAP, "hour table must contain Blocks 0-9"))
            return issues

        def hours(label: str) -> float:
            return 0.0 if label == "outside clock" else float(label.removesuffix("h"))

        fast_total = sum(hours(fast) for fast, _full in rows.values())
        full_total = sum(hours(full) for _fast, full in rows.values())
        if fast_total != 30:
            issues.append(Issue(MILESTONE_MAP, f"fast path totals {fast_total:g}h, expected 30h"))
        if full_total != 40:
            issues.append(Issue(MILESTONE_MAP, f"full path totals {full_total:g}h, expected 40h"))
        if "Recovery/remediation allowance | **0h** | **5h**" not in text:
            issues.append(Issue(MILESTONE_MAP, "missing explicit five-hour recovery allowance"))
        if "design budget, not cohort timing evidence" not in text:
            issues.append(Issue(MILESTONE_MAP, "timeline is not labelled as unverified by cohorts"))
    except Exception as error:  # noqa: BLE001
        issues.append(Issue(MILESTONE_MAP, f"could not inspect hour budget: {error}"))
    return issues


def check_route_index() -> list[Issue]:
    issues: list[Issue] = []
    try:
        text = MAIN_TRACK_INDEX.read_text(encoding="utf-8")
        for marker in (
            "## Source Of Truth",
            "## Route Contract",
            "milestone-1-45-hour-map.md",
            "week-03-integration-build/README.md",
        ):
            if marker not in text:
                issues.append(Issue(MAIN_TRACK_INDEX, f"missing route-index marker {marker}"))
        for duplicated_heading in (
            "## Honest Time Contract",
            "## Existing Lesson Assets Used by the Route",
            "## Evidence Rule",
        ):
            if duplicated_heading in text:
                issues.append(
                    Issue(MAIN_TRACK_INDEX, f"route index duplicates {duplicated_heading}")
                )
    except OSError as error:
        issues.append(Issue(MAIN_TRACK_INDEX, f"could not inspect route index: {error}"))
    return issues


def check_route_terminology() -> list[Issue]:
    issues: list[Issue] = []
    learner_docs = (
        path
        for path in (CURRICULUM_ROOT / "main-track").rglob("*.md")
        if path.name == "README.md"
        or "CHECKLIST" in path.name
        or "TEMPLATE" in path.name
    )
    for path in learner_docs:
        text = path.read_text(encoding="utf-8")
        if re.search(r"\bCourse [123]\b", text):
            issues.append(Issue(path, "uses superseded Course terminology"))

    try:
        root_text = ROOT_README.read_text(encoding="utf-8")
        if "30-hour fast path or 40-hour full path" not in root_text:
            issues.append(Issue(ROOT_README, "missing honest fast/full route wording"))
    except OSError as error:
        issues.append(Issue(ROOT_README, f"could not inspect root route wording: {error}"))

    try:
        pacing_text = TWO_HOUR_PLAN.read_text(encoding="utf-8")
        if "totaling no more than five hours" not in pacing_text:
            issues.append(Issue(TWO_HOUR_PLAN, "recovery sessions exceed or obscure five-hour cap"))
    except OSError as error:
        issues.append(Issue(TWO_HOUR_PLAN, f"could not inspect pacing recovery cap: {error}"))
    return issues


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true", help="Exit non-zero when any issue is found.")
    args = parser.parse_args()

    scaffolds = discover_scaffolds()
    issues: list[Issue] = []
    issues.extend(issue for path in scaffolds if (issue := import_scaffold(path)) is not None)
    issues.extend(check_fixtures())
    issues.extend(check_reference_notes(scaffolds))
    issues.extend(check_lesson_contract(scaffolds))
    issues.extend(check_cumulative_spine())
    issues.extend(check_milestone_hour_budget())
    issues.extend(check_route_index())
    issues.extend(check_route_terminology())

    print(f"Scaffolds imported: {len(scaffolds) - len([issue for issue in issues if 'import failed' in issue.message])}/{len(scaffolds)}")
    print(f"Curriculum-contract issues: {len(issues)}")
    print("Executable-reference-proof: not checked")
    if issues:
        print()
        for issue in issues:
            print(f"- {issue.format()}")

    return 1 if args.strict and issues else 0


if __name__ == "__main__":
    raise SystemExit(main())
