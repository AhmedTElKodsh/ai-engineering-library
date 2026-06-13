"""CI-style regression gate workbench for Module 5 Week 2.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class VersionNote:
    prompt_version: str
    model_version: str
    index_version: str
    dataset_version: str


@dataclass(frozen=True)
class EvalRun:
    run_id: str
    total: int
    passed: int
    failed: int
    failure_categories: dict[str, int] = field(default_factory=dict)


@dataclass(frozen=True)
class GateDecision:
    status: str
    reasons: list[str]
    version_note: VersionNote


def load_eval_run(path: Path) -> EvalRun:
    """Load one deterministic eval result fixture."""
    # TODO: Read UTF-8 JSON and return an EvalRun.
    return EvalRun("", 0, 0, 0, {})


def load_version_note(path: Path) -> VersionNote:
    """Load prompt/model/index/dataset version notes."""
    # TODO: Read UTF-8 JSON and return a VersionNote.
    return VersionNote("", "", "", "")


def compute_pass_rate(eval_run: EvalRun) -> float:
    """Return the pass rate as a rounded percentage."""
    # TODO: Return passed / total as a percentage rounded to one decimal place.
    return 0.0


def evaluate_release_gate(eval_run: EvalRun, version_note: VersionNote, min_pass_rate: float) -> GateDecision:
    """Decide whether a CI-style gate should pass or fail."""
    # TODO: Fail when pass rate is below threshold, failures exist, or versions are missing.
    return GateDecision("", [], version_note)


def build_ci_command_checklist(test_paths: list[str], eval_command: str) -> list[str]:
    """Build the repeatable command checklist a teammate could run."""
    # TODO: Include unit test command, eval command, and review-gate command.
    return []


def build_gate_report(eval_run: EvalRun, decision: GateDecision, checklist: list[str]) -> dict[str, object]:
    """Build a compact report for release review."""
    # TODO: Return run_id, pass_rate, status, reasons, versions, failure_categories, and checklist.
    return {}
