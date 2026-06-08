"""State machine workbench for Module 4 Phase 5."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class GraphState:
    request: str
    evidence: list[str] = field(default_factory=list)
    route: str = ""
    answer: str = ""
    status: str = "new"


def classify_node(state: GraphState) -> GraphState:
    """Set route based on request text."""
    # TODO: Return a new state with route set to refuse, retrieve, or answer.
    return state


def retrieve_node(state: GraphState) -> GraphState:
    """Attach deterministic evidence for retrieval routes."""
    # TODO: Add evidence when route is retrieve.
    return state


def answer_node(state: GraphState) -> GraphState:
    """Create final answer or refusal from state."""
    # TODO: Answer with citations when evidence exists, refuse unsafe advice, or abstain.
    return state


def run_state_machine(initial: GraphState) -> GraphState:
    """Run classify, optional retrieve, and answer nodes."""
    # TODO: Compose nodes without mutating the original state.
    return initial


def summarize_state(state: GraphState) -> dict[str, object]:
    """Return debuggable state metadata."""
    # TODO: Include route, status, evidence_count, and has_answer.
    return {}
