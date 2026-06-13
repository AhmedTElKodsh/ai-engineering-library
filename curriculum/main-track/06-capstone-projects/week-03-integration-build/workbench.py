"""Runnable FinAgent integration build workbench."""

from __future__ import annotations

from dataclasses import dataclass, field
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


def load_market_snapshot(path: Path) -> MarketSnapshot:
    """Load deterministic market snapshot data from a local JSON fixture."""
    # TODO: Read UTF-8 JSON and return a MarketSnapshot.
    return MarketSnapshot("", "", 0.0, 0.0, "", "")


def load_evidence_chunks(path: Path) -> list[EvidenceChunk]:
    """Load deterministic citation chunks from a local JSON fixture."""
    # TODO: Read UTF-8 JSON and return EvidenceChunk objects.
    return []


def validate_request(request: FinAgentRequest) -> dict[str, object]:
    """Validate ticker shape and finance-safety boundaries."""
    # TODO: Return accepted/refused status, reason, and normalized ticker.
    return {}


def retrieve_evidence(
    request: FinAgentRequest,
    chunks: list[EvidenceChunk],
    max_chunks: int = 2,
) -> list[EvidenceChunk]:
    """Retrieve fixture evidence for the request without live services."""
    # TODO: Select matching ticker chunks and rank simple keyword overlap.
    return []


def compose_finagent_brief(
    request: FinAgentRequest,
    snapshot: MarketSnapshot,
    evidence: list[EvidenceChunk],
) -> FinAgentBrief:
    """Compose an educational, cited FinAgent brief from deterministic inputs."""
    # TODO: Include movement, citations, uncertainty, and non-advice safety note.
    return FinAgentBrief(request.ticker, "", [], "", "")


def run_finagent_workflow(
    request: FinAgentRequest,
    snapshot_path: Path,
    evidence_path: Path,
) -> FinAgentBrief:
    """Run the local FinAgent integration workflow and return a traced result."""
    # TODO: Validate, load fixtures, retrieve evidence, refuse unsafe requests,
    # compose a cited brief, and attach a reviewable workflow trace.
    return FinAgentBrief(request.ticker, "", [], "", "")
