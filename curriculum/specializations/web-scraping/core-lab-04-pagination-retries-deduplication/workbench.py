"""Pagination, retry, and deduplication workbench for Web Data Acquisition Core Lab 4."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class PageFetch:
    page_url: str
    status_code: int
    attempts: int
    body: str


@dataclass(frozen=True)
class ListingRecord:
    record_id: str
    title: str
    source_url: str
    page_url: str
    content_hash: str


@dataclass(frozen=True)
class FetchFailure:
    page_url: str
    reason: str
    attempts: int


def load_page_fixture(path: Path) -> str:
    """Load one deterministic HTML page fixture."""
    # TODO: Read the fixture using UTF-8.
    return ""


def discover_next_page_url(html: str, current_url: str) -> str | None:
    """Return the absolute next-page URL when the page has one."""
    # TODO: Find the link marked as the next page and resolve relative URLs.
    return None


def extract_listing_records(html: str, page_url: str) -> list[ListingRecord]:
    """Extract normalized listing records from one page."""
    # TODO: Extract cards, normalize titles and URLs, and compute a content hash.
    return []


def deduplicate_records(records: list[ListingRecord]) -> list[ListingRecord]:
    """Remove repeated records by normalized source URL and content hash."""
    # TODO: Keep first-seen records while removing duplicate URL/hash pairs.
    return []


def build_fetch_plan(page_urls: list[str], delay_seconds: float, timeout_seconds: float) -> list[dict[str, object]]:
    """Build a polite fetch plan before live requests exist."""
    # TODO: Return one plan item per URL with timeout and delay metadata.
    return []


def summarize_collection(
    records: list[ListingRecord],
    failures: list[FetchFailure],
) -> dict[str, object]:
    """Summarize collected records and failed page fetches."""
    # TODO: Return record_count, failed_count, source_urls, and failure_reasons.
    return {}
