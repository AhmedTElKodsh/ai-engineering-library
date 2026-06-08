"""Inventory reviewer-only reference validation for learner scaffolds.

Starter curriculum tests are expected to fail until learners complete TODOs.
This script checks the instructor side of the contract: every assignable
workbench should have reviewer-only notes that describe intended behavior and
validation expectations.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
CURRICULUM_ROOT = REPO_ROOT / "curriculum"
REFERENCE_ROOT = REPO_ROOT / ".kiro" / "specs" / "curriculum-planning" / "implementation-notes"


@dataclass(frozen=True)
class ReferenceCheck:
    scaffold: Path
    slug: str
    reference_note: Path
    validation_note: Path

    @property
    def has_reference_note(self) -> bool:
        return self.reference_note.exists()

    @property
    def has_validation_note(self) -> bool:
        return self.validation_note.exists()

    @property
    def complete(self) -> bool:
        return self.has_reference_note and self.has_validation_note


def slug_for_scaffold(path: Path) -> str:
    relative = path.relative_to(CURRICULUM_ROOT)
    parent_parts = relative.parent.parts
    return "-".join(part.lower().replace("_", "-") for part in parent_parts)


def discover_scaffolds() -> list[Path]:
    scaffold_names = {"workbench.py", "diagnostic_workbench.py"}
    scaffolds = [
        path
        for path in CURRICULUM_ROOT.rglob("*.py")
        if path.name in scaffold_names
        and "templates" not in path.parts
        and "resources" not in path.parts
    ]
    return sorted(scaffolds)


def build_checks() -> list[ReferenceCheck]:
    checks: list[ReferenceCheck] = []
    for scaffold in discover_scaffolds():
        slug = slug_for_scaffold(scaffold)
        checks.append(
            ReferenceCheck(
                scaffold=scaffold,
                slug=slug,
                reference_note=REFERENCE_ROOT / f"{slug}-reference.md",
                validation_note=REFERENCE_ROOT / f"{slug}-validation.md",
            )
        )
    return checks


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Exit with failure when any scaffold is missing reviewer notes.",
    )
    args = parser.parse_args()

    checks = build_checks()
    complete = [check for check in checks if check.complete]
    missing = [check for check in checks if not check.complete]

    print(f"Scaffolds found: {len(checks)}")
    print(f"Reference-complete: {len(complete)}")
    print(f"Reference-pending: {len(missing)}")

    if missing:
        print()
        print("Missing reviewer reference notes:")
        for check in missing:
            scaffold = check.scaffold.relative_to(REPO_ROOT)
            needs: list[str] = []
            if not check.has_reference_note:
                needs.append(check.reference_note.name)
            if not check.has_validation_note:
                needs.append(check.validation_note.name)
            print(f"- {scaffold}: {', '.join(needs)}")

    if args.strict and missing:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
