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
    # Hint reference: hints.md#load_eval_run
    # TODO: Read UTF-8 JSON and return an EvalRun.
    # Hint: fixture loading is a boundary; convert raw JSON to the dataclass shape.
    return EvalRun("", 0, 0, 0, {})


def load_version_note(path: Path) -> VersionNote:
    """Load prompt/model/index/dataset version notes."""
    # Hint reference: hints.md#load_version_note
    # TODO: Read UTF-8 JSON and return a VersionNote.
    # Hint: missing version fields should be visible to the release gate.
    return VersionNote("", "", "", "")


def compute_pass_rate(eval_run: EvalRun) -> float:
    """Return the pass rate as a rounded percentage."""
    # Hint reference: hints.md#compute_pass_rate
    # TODO: Return passed / total as a percentage rounded to one decimal place.
    # Hint: decide how to handle total=0 before dividing.
    return 0.0


def evaluate_release_gate(eval_run: EvalRun, version_note: VersionNote, min_pass_rate: float) -> GateDecision:
    """Decide whether a CI-style gate should pass or fail."""
    # Hint reference: hints.md#evaluate_release_gate
    # TODO: Fail when pass rate is below threshold, failures exist, or versions are missing.
    # Hint: collect every reason, not just the first reason the gate fails.
    return GateDecision("", [], version_note)


def build_ci_command_checklist(test_paths: list[str], eval_command: str) -> list[str]:
    """Build the repeatable command checklist a teammate could run."""
    # Hint reference: hints.md#build_ci_command_checklist
    # TODO: Include unit test command, eval command, and review-gate command.
    # Hint: commands should be copy-runnable evidence, not vague reminders.
    return []


def build_gate_report(eval_run: EvalRun, decision: GateDecision, checklist: list[str]) -> dict[str, object]:
    """Build a compact report for release review."""
    # Hint reference: hints.md#build_gate_report
    # TODO: Return run_id, pass_rate, status, reasons, versions, failure_categories, and checklist.
    # Hint: this is the release artifact; include inputs, decision, and next commands.
    return {}
