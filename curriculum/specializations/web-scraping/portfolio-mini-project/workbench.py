"""Portfolio mini-project workbench for web data acquisition."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class SourceApproval:
    source_id: str
    name: str
    base_url: str
    approved: bool
    collection_method: str
    attribution: str
    freshness_days: int


@dataclass(frozen=True)
class RawPortfolioRecord:
    record_id: str
    source_id: str
    title: str
    summary: str
    source_url: str
    collected_at: str
    tags: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class CleanPortfolioRecord:
    record_id: str
    title: str
    summary: str
    source_url: str
    source_name: str
    collected_at: str
    citation: str
    tags: list[str] = field(default_factory=list)
    quality_status: str = "accepted"


def load_source_catalog(path: Path) -> list[SourceApproval]:
    """Load source approval records from a local JSON catalog."""
    # TODO: Read UTF-8 JSON and return SourceApproval objects.
    return []


def approved_sources(catalog: list[SourceApproval]) -> dict[str, SourceApproval]:
    """Return approved sources keyed by source_id."""
    # TODO: Keep only approved sources with attribution and fixture/api methods.
    return {}


def collect_fixture_records(path: Path, source_map: dict[str, SourceApproval]) -> list[RawPortfolioRecord]:
    """Collect raw records from the local fixture payload."""
    # TODO: Load fixture records and keep only records from approved sources.
    return []


def normalize_records(
    raw_records: list[RawPortfolioRecord],
    source_map: dict[str, SourceApproval],
) -> list[CleanPortfolioRecord]:
    """Normalize raw records while preserving citation metadata."""
    # TODO: Trim text, attach source names, preserve URLs, and build citations.
    return []


def build_quality_report(records: list[CleanPortfolioRecord]) -> dict[str, object]:
    """Summarize portfolio data quality before packaging."""
    # TODO: Count accepted records, duplicate citations, stale-looking records,
    # missing-provenance records, and unique source URLs.
    return {}


def package_portfolio_artifact(
    records: list[CleanPortfolioRecord],
    quality_report: dict[str, object],
) -> dict[str, object]:
    """Build the final reviewable portfolio package manifest."""
    # TODO: Return chunks, citation count, refusal rules, source URLs, quality
    # summary, and an ethics reviewer note.
    return {}
