"""Provenance and data-quality workbench for Web Data Acquisition Core Lab 5."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class SourceRecord:
    record_id: str
    title: str
    summary: str
    source_url: str
    source_heading: str
    collected_at: str
    extraction_assumption: str
    content_hash: str


@dataclass(frozen=True)
class QualityIssue:
    record_id: str
    issue_type: str
    detail: str


def load_records_fixture(path: Path) -> list[dict[str, object]]:
    """Load collected record dictionaries from a deterministic JSON fixture."""
    # TODO: Read UTF-8 JSON and return the records list.
    return []


def normalize_source_record(raw: dict[str, object]) -> SourceRecord:
    """Convert one raw record dictionary into a normalized source record."""
    # TODO: Normalize text fields, require provenance fields, and compute/preserve content_hash.
    return SourceRecord("", "", "", "", "", "", "", "")


def build_provenance_table(records: list[SourceRecord]) -> list[dict[str, str]]:
    """Build the review table humans use before downstream RAG packaging."""
    # TODO: Return record_id, source_url, source_heading, collected_at, and extraction_assumption.
    return []


def find_quality_issues(records: list[SourceRecord], max_age_days: int, reference_date: str) -> list[QualityIssue]:
    """Find missing provenance, duplicates, stale records, and weak summaries."""
    # TODO: Check missing fields, duplicate source/content pairs, stale dates, and very short summaries.
    return []


def summarize_quality_report(records: list[SourceRecord], issues: list[QualityIssue]) -> dict[str, object]:
    """Summarize dataset quality for a learner-facing review gate."""
    # TODO: Return record_count, issue_count, ready_for_rag, issue_counts, and reviewed_source_urls.
    return {}
