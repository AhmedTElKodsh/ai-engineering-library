"""FinAgent capstone kickoff workbench."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class CapstoneScope:
    product_name: str
    target_user: str
    allowed_behaviors: list[str]
    non_goals: list[str]
    required_sources: list[str]
    safety_limits: list[str]


@dataclass(frozen=True)
class EvalCase:
    case_id: str
    query: str
    expected_behavior: str


@dataclass(frozen=True)
class LedgerEntry:
    artifact: str
    evidence_type: str
    proves: str
    reviewer_check: str


def define_capstone_scope() -> CapstoneScope:
    """Define the smallest credible FinAgent capstone scope."""
    # TODO: Return a scope for an educational stock-market analysis assistant.
    # Hint: scope is a contract; include what the assistant can do and what it refuses.
    return CapstoneScope("", "", [], [], [], [])


def build_eval_cases() -> list[EvalCase]:
    """Return kickoff eval cases for the capstone contract."""
    # TODO: Include cited answer, abstention, malformed ticker, and advice refusal.
    # Hint: each eval case should prove one important behavior boundary.
    return []


def score_eval_case(case: EvalCase, observed_behavior: str) -> dict[str, object]:
    """Score one deterministic capstone eval case."""
    # TODO: Compare expected and observed behavior and return pass/fail evidence.
    # Hint: make the score explainable enough for a reviewer to trust the result.
    return {}


def build_portfolio_evidence_ledger() -> list[LedgerEntry]:
    """List the portfolio evidence the learner must produce."""
    # TODO: Include README, architecture diagram, tests, eval report, trace sample,
    # data provenance note, limitations note, and demo script.
    # Hint: every ledger entry should say what artifact proves and how to review it.
    return []
