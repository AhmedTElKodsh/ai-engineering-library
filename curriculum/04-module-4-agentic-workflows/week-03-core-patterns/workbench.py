"""Explicit workflow pattern workbench for Module 4 Phase 3.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class WorkflowCase:
    case_id: str
    user_request: str
    available_evidence: list[str]
    risk_level: str


@dataclass(frozen=True)
class WorkflowStep:
    step_id: str
    action: str
    input_text: str
    expected_output: str


@dataclass(frozen=True)
class ToolResult:
    tool_name: str
    ok: bool
    output: str
    evidence_ids: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class WorkflowTrace:
    case_id: str
    route: str
    steps: list[WorkflowStep]
    tool_results: list[ToolResult]
    gate_decision: str
    final_response: str


def load_workflow_cases(path: Path) -> list[WorkflowCase]:
    """Load deterministic workflow cases from a JSON fixture."""
    # TODO: Read UTF-8 JSON and return WorkflowCase objects.
    return []


def classify_request(case: WorkflowCase) -> str:
    """Route a request to answer, retrieve_then_answer, or refuse."""
    # TODO: Use risk level and available evidence to choose a simple route.
    return ""


def build_prompt_chain_plan(case: WorkflowCase, route: str) -> list[WorkflowStep]:
    """Create explicit workflow steps before any tool call runs."""
    # TODO: Build inspectable steps for the selected route.
    return []


def run_evidence_tool(case: WorkflowCase, query: str) -> ToolResult:
    """Run a deterministic evidence lookup over available fixture evidence."""
    # TODO: Return ok=True when evidence exists; otherwise return a failed tool result.
    return ToolResult("evidence_lookup", False, "", [])


def evaluate_gate(route: str, tool_results: list[ToolResult]) -> str:
    """Decide whether the workflow may answer, must retrieve more, or must stop."""
    # TODO: Gate answers on evidence. Refusal routes should stop without tool success.
    return ""


def run_explicit_workflow(case: WorkflowCase) -> WorkflowTrace:
    """Run the full explicit workflow without autonomous agent decisions."""
    # TODO: Classify, plan, call deterministic tools when needed, gate, and respond.
    return WorkflowTrace(case.case_id, "", [], [], "", "")


def build_trace_summary(trace: WorkflowTrace) -> dict[str, object]:
    """Build a compact trace for debugging workflow behavior."""
    # TODO: Return case_id, route, step_ids, tool_names, gate_decision, and final_response.
    return {}
