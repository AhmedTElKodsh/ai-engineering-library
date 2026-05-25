"""API-first collection workbench for Web Data Acquisition Core Lab 3."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class ApiRecord:
    record_id: str
    symbol: str
    headline: str
    summary: str
    source_url: str
    published_at: str
    collected_at: str
    endpoint: str


@dataclass(frozen=True)
class FailedApiRecord:
    record_id: str
    reason: str


def load_api_fixture(path: Path) -> dict[str, object]:
    """Load a deterministic JSON response fixture."""
    # TODO: Read the fixture using UTF-8 and parse JSON into a dictionary.
    return {}


def validate_api_item(item: dict[str, object]) -> list[str]:
    """Return missing or invalid required fields for one API item."""
    # TODO: Require id, symbol, headline, summary, source_url, and published_at.
    return []


def collect_api_records(payload: dict[str, object]) -> tuple[list[ApiRecord], list[FailedApiRecord]]:
    """Convert API payload items into clean records and failed records."""
    # TODO: Preserve endpoint and collected_at from the payload. Clean valid
    # records and keep malformed items in failed records with useful reasons.
    return [], []


def build_api_collection_report(
    clean_records: list[ApiRecord],
    failed_records: list[FailedApiRecord],
) -> dict[str, object]:
    """Build a compact collection report."""
    # TODO: Return clean_count, failed_count, symbols, and failure reasons.
    return {}
