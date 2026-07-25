"""Runnable FinAgent integration build workbench."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from functools import partial
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


@dataclass(frozen=True)
class MarketSnapshot:
    ticker: str
    company_name: str
    price: float
    previous_close: float
    currency: str
    as_of: str


@dataclass(frozen=True)
class EvidenceChunk:
    chunk_id: str
    ticker: str
    text: str
    citation: str
    collected_at: str
    tags: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class FinAgentRequest:
    ticker: str
    question: str


@dataclass(frozen=True)
class WorkflowStep:
    name: str
    status: str
    detail: str


@dataclass(frozen=True)
class FinAgentBrief:
    ticker: str
    answer: str
    citations: list[str]
    uncertainty: str
    safety_note: str
    trace: list[WorkflowStep] = field(default_factory=list)


@dataclass(frozen=True)
class ModelResult:
    ok: bool
    content: str
    citations: list[str]
    attempts: int
    error: str | None = None


@dataclass(frozen=True)
class ToolCall:
    name: str
    arguments: dict[str, object]
    approved: bool = False


@dataclass(frozen=True)
class ToolResult:
    ok: bool
    data: dict[str, object]
    error: str | None


@dataclass(frozen=True)
class EvaluationCase:
    case_id: str
    request: dict[str, object]
    expected_status: str
    requires_citations: bool
    expected_abstained: bool


@dataclass(frozen=True)
class MilestoneResult:
    status: str
    brief: FinAgentBrief
    model: ModelResult | None
    tool: ToolResult | None
    abstained: bool
    trace: list[WorkflowStep]
    metrics: dict[str, object]


class TransientProviderError(RuntimeError):
    """Retryable fixture-provider failure used by focused tests."""


class FixtureProvider:
    """Deterministic provider double; learners implement the boundary around it."""

    def __init__(
        self,
        failures_before_success: int = 0,
        output_override: dict[str, object] | None = None,
    ) -> None:
        self.failures_before_success = failures_before_success
        self.output_override = output_override
        self.calls = 0

    def generate(self, brief: FinAgentBrief) -> dict[str, object]:
        self.calls += 1
        if self.calls <= self.failures_before_success:
            raise TransientProviderError("simulated transient provider failure")
        return self.output_override or {
            "content": brief.answer,
            "citations": brief.citations,
        }


def load_market_snapshot(path: Path) -> MarketSnapshot:
    """Load deterministic market snapshot data from a local JSON fixture."""
    # Hint reference: hints.md#load_market_snapshot
    # TODO: Read UTF-8 JSON and return a MarketSnapshot.
    # TODO: Reject malformed tickers, non-positive prices, and missing metadata.
    # Hint: this boundary turns fixture JSON into typed data the workflow can trust.
    return MarketSnapshot("", "", 0.0, 0.0, "", "")


def build_deterministic_summary(snapshot: MarketSnapshot) -> str:
    """Summarize validated market movement without retrieval or a model."""
    # Hint reference: hints.md#build_deterministic_summary
    # TODO: Calculate signed percentage movement from previous_close to price.
    # TODO: Return a stable educational sentence with ticker, price, currency,
    # direction, percentage, timestamp, and non-advice wording.
    return ""


def load_evidence_chunks(path: Path) -> list[EvidenceChunk]:
    """Load deterministic citation chunks from a local JSON fixture."""
    # Hint reference: hints.md#load_evidence_chunks
    # TODO: Read UTF-8 JSON and return EvidenceChunk objects.
    # TODO: Reject chunks without non-empty identity, text, citation, or timestamp.
    # Hint: preserve provenance fields; later boundaries must not invent them.
    return []


def validate_request(request: FinAgentRequest) -> dict[str, object]:
    """Validate ticker shape and finance-safety boundaries."""
    # Hint reference: hints.md#validate_request
    # TODO: Return accepted/refused status, reason, and normalized ticker.
    # Hint: validation should explain refusal without needing to run retrieval.
    # Keep this as a decision record: accepted status, safe reason, and clean ticker.
    # Later workflow steps should read the decision instead of repeating checks.
    return {}


def retrieve_evidence(
    request: FinAgentRequest,
    chunks: list[EvidenceChunk],
    max_chunks: int = 2,
) -> list[EvidenceChunk]:
    """Retrieve fixture evidence for the request without live services."""
    # Hint reference: hints.md#retrieve_evidence
    # TODO: Select matching ticker chunks, rank simple keyword overlap, then
    # apply max_chunks as the explicit local context budget.
    # Hint: filter by ticker first; break equal scores by chunk_id for stability.
    return []


def compose_finagent_brief(
    request: FinAgentRequest,
    snapshot: MarketSnapshot,
    evidence: list[EvidenceChunk],
) -> FinAgentBrief:
    """Compose an educational, cited FinAgent brief from deterministic inputs."""
    # Hint reference: hints.md#compose_finagent_brief
    # TODO: Include movement, citations, uncertainty, and non-advice safety note.
    # Hint: this function writes the brief; it should not reload files or redo validation.
    return FinAgentBrief(request.ticker, "", [], "", "")


def run_finagent_workflow(
    request: FinAgentRequest,
    snapshot_path: Path,
    evidence_path: Path,
) -> FinAgentBrief:
    """Run the local FinAgent integration workflow and return a traced result."""
    # Hint reference: hints.md#run_finagent_workflow
    # TODO: Validate, load fixtures, retrieve evidence, refuse unsafe requests,
    # abstain when retrieval is empty, compose a cited brief, and attach a trace.
    # Hint: trace the major steps so failures are visible without a debugger.
    # This function is orchestration glue; do not hide file loading, retrieval,
    # validation, and composition inside one uninspectable block.
    return FinAgentBrief(request.ticker, "", [], "", "")


def call_provider_with_retry(
    brief: FinAgentBrief,
    provider: FixtureProvider,
    max_attempts: int = 2,
) -> ModelResult:
    """Validate structured fixture-provider output behind a bounded retry."""
    # Hint reference: hints.md#call_provider_with_retry
    # TODO: Retry only TransientProviderError up to max_attempts.
    # TODO: Accept non-empty content and only citations already present in brief.
    # TODO: Fail closed with a structured ModelResult for invalid output.
    return ModelResult(False, "", [], 0, "not_implemented")


def dispatch_tool(call: ToolCall, snapshot: MarketSnapshot) -> ToolResult:
    """Dispatch one allowlisted, approval-gated, read-only quote tool."""
    # Hint reference: hints.md#dispatch_tool
    # TODO: Allow only quote_lookup with explicit approval.
    # TODO: Require a ticker argument that matches the loaded snapshot.
    # TODO: Return structured quote data; never expose files or environment values.
    return ToolResult(False, {}, "not_implemented")


def load_evaluation_cases(path: Path) -> list[EvaluationCase]:
    """Load the shared Milestone 1 evaluation dataset."""
    # Hint reference: hints.md#load_evaluation_cases
    # TODO: Parse the cases array and preserve every expected behavior field.
    return []


def run_milestone_application(
    request: FinAgentRequest,
    snapshot_path: Path,
    evidence_path: Path,
    provider: FixtureProvider | None = None,
    tool_call: ToolCall | None = None,
) -> MilestoneResult:
    """Compose the deterministic workflow, provider boundary, tool, and metrics."""
    # Hint reference: hints.md#run_milestone_application
    # TODO: Run the deterministic brief first and stop on refusal or abstention.
    # TODO: Run an optional tool only through dispatch_tool; stop before the
    # provider when approval is missing or the tool is denied.
    # TODO: Call the fixture provider, preserve trace steps, and record latency,
    # token estimates, provider mode, and actual fixture cost.
    blank = FinAgentBrief(request.ticker, "", [], "", "")
    return MilestoneResult(
        "not_implemented",
        blank,
        None,
        None,
        False,
        [],
        {},
    )


def run_evaluation(
    cases_path: Path,
    snapshot_path: Path,
    evidence_path: Path,
) -> dict[str, object]:
    """Run all golden cases and group failures by behavior category."""
    # Hint reference: hints.md#run_evaluation
    # TODO: Run each case through run_milestone_application.
    # TODO: Compare status, citation requirement, and abstention behavior.
    # TODO: Return totals plus case IDs and a failure_categories list.
    return {"total": 0, "passed": 0, "failed": 0, "failures": []}


def service_health() -> dict[str, object]:
    """Return local service metadata without claiming live-provider evidence."""
    # Hint reference: hints.md#service_health
    # TODO: Return ok status, service/version, fixture provider mode, and
    # live_provider_verified=False.
    return {"status": "not_implemented"}


def handle_service_request(
    payload: object,
    snapshot_path: Path,
    evidence_path: Path,
) -> dict[str, object]:
    """Validate an HTTP payload and serialize the cumulative application result."""
    # Hint reference: hints.md#handle_service_request
    # TODO: Require an object with typed ticker/question/tool/approval fields,
    # then convert it into FinAgentRequest and an optional ToolCall.
    # TODO: Run the milestone application and return a JSON-safe response.
    # TODO: Use a 4xx status for malformed input; refusals are valid app responses.
    return {"ok": False, "status_code": 501, "error": "not_implemented"}


class _FinAgentHTTPHandler(BaseHTTPRequestHandler):
    """Small local adapter around the learner-owned service contract."""

    def __init__(
        self,
        *args: object,
        snapshot_path: Path,
        evidence_path: Path,
        **kwargs: object,
    ) -> None:
        self.snapshot_path = snapshot_path
        self.evidence_path = evidence_path
        super().__init__(*args, **kwargs)

    def _send(self, status_code: int, payload: dict[str, object]) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802 - BaseHTTPRequestHandler contract.
        if self.path != "/health":
            self._send(404, {"ok": False, "error": "not found"})
            return
        self._send(200, service_health())

    def do_POST(self) -> None:  # noqa: N802 - BaseHTTPRequestHandler contract.
        if self.path != "/brief":
            self._send(404, {"ok": False, "error": "not found"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self._send(400, {"ok": False, "error": "invalid content length"})
            return
        if length <= 0 or length > 64 * 1024:
            self._send(413, {"ok": False, "error": "invalid request size"})
            return
        try:
            payload = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            self._send(400, {"ok": False, "error": "request must be UTF-8 JSON"})
            return
        response = handle_service_request(
            payload,
            self.snapshot_path,
            self.evidence_path,
        )
        status_code = response.get("status_code", 200)
        self._send(status_code if isinstance(status_code, int) else 500, response)

    def log_message(self, format: str, *args: object) -> None:
        return


def build_http_server(
    snapshot_path: Path,
    evidence_path: Path,
    host: str = "127.0.0.1",
    port: int = 0,
) -> ThreadingHTTPServer:
    """Build the real loopback adapter used by the service checkpoint."""
    # ponytail: stdlib loopback adapter; adopt FastAPI in Milestone 2 when
    # framework-specific routing, dependency injection, or OpenAPI matters.
    handler = partial(
        _FinAgentHTTPHandler,
        snapshot_path=snapshot_path,
        evidence_path=evidence_path,
    )
    return ThreadingHTTPServer((host, port), handler)
