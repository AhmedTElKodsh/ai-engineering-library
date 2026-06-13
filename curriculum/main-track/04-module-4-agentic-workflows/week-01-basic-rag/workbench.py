"""AI-ready ingestion and chunking workbench for Module 4 Phase 1.

Expected time to finish: 5-7 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class RawRecord:
    """One source record before validation and cleaning."""

    record_id: str
    source_id: str
    title: str
    body: str
    collected_at: str
    metadata: dict[str, str] = field(default_factory=dict)


@dataclass(frozen=True)
class CleanRecord:
    """A validated record that is safe to chunk for retrieval."""

    record_id: str
    source_id: str
    title: str
    text: str
    collected_at: str
    metadata: dict[str, str]


@dataclass(frozen=True)
class FailedRecord:
    """A record that could not enter the clean retrieval set."""

    record_id: str
    source_id: str
    reason: str


@dataclass(frozen=True)
class Chunk:
    """Retrieval-ready text with citation metadata."""

    chunk_id: str
    record_id: str
    source_id: str
    text: str
    metadata: dict[str, str]


@dataclass(frozen=True)
class PipelineOutput:
    """The complete output of one deterministic ingestion run."""

    clean_records: list[CleanRecord]
    failed_records: list[FailedRecord]
    chunks: list[Chunk]
    report: dict[str, object]


def load_fixture_records() -> list[RawRecord]:
    """Return a small deterministic source set for the lab."""
    # TODO: Return three useful market-context records and one bad record
    # that is missing retrievable body text.
    return []


def normalize_text(text: str) -> str:
    """Trim text and collapse repeated whitespace without changing meaning."""
    # TODO: Collapse newlines, tabs, and repeated spaces into single spaces.
    return ""


def normalize_metadata(metadata: dict[str, str]) -> dict[str, str]:
    """Normalize metadata keys and values while preserving provenance."""
    # TODO: Trim keys and values, lowercase keys, and skip blank keys.
    return {}


def prepare_records(records: list[RawRecord]) -> tuple[list[CleanRecord], list[FailedRecord]]:
    """Validate and clean raw records, keeping failed-record evidence."""
    # TODO: Validate record_id, source_id, title, body, and collected_at.
    # Clean valid records; report invalid records with a useful reason.
    return [], []


def chunk_records(records: list[CleanRecord], max_words: int = 40) -> list[Chunk]:
    """Split clean records into simple word chunks with citation metadata."""
    # TODO: Split each clean record into max_words chunks. Each chunk should
    # include record_id, source_id, collected_at, title, and record metadata.
    return []


def build_pipeline_report(
    raw_records: list[RawRecord],
    clean_records: list[CleanRecord],
    failed_records: list[FailedRecord],
    chunks: list[Chunk],
) -> dict[str, object]:
    """Build a compact report that makes the run inspectable."""
    # TODO: Return counts, failed reasons, source IDs, and chunk IDs.
    return {}


def run_pipeline(records: list[RawRecord], *, max_words: int = 40) -> PipelineOutput:
    """Run the full fixture-first ingestion pipeline."""
    # TODO: Prepare records, chunk clean records, and build the report.
    return PipelineOutput(clean_records=[], failed_records=[], chunks=[], report={})

