"""Run structural quality checks that do not solve learner TODOs.

The curriculum intentionally starts with failing behavior tests. These checks
guard the parts that should still be healthy before a learner edits anything:
workbench imports, fixture syntax, reviewer-note shape, and lesson contract
signals.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from dataclasses import dataclass
from pathlib import Path

import yaml


REPO_ROOT = Path(__file__).resolve().parents[1]
CURRICULUM_ROOT = REPO_ROOT / "curriculum"
REFERENCE_ROOT = REPO_ROOT / ".kiro" / "specs" / "curriculum-planning" / "implementation-notes"

SCAFFOLD_NAMES = {"workbench.py", "diagnostic_workbench.py"}
REFERENCE_REQUIRED_SECTIONS = ["## Intent", "## Intended Behavior", "## Reviewer Edge Cases"]
VALIDATION_REQUIRED_SECTIONS = ["## Commands", "## Expected Starter State", "## Reviewer Checks"]


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

    print(f"Scaffolds imported: {len(scaffolds) - len([issue for issue in issues if 'import failed' in issue.message])}/{len(scaffolds)}")
    print(f"Quality issues: {len(issues)}")
    if issues:
        print()
        for issue in issues:
            print(f"- {issue.format()}")

    return 1 if args.strict and issues else 0


if __name__ == "__main__":
    raise SystemExit(main())
