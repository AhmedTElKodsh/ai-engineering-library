"""Fixture-first static extraction workbench for Web Data Acquisition Core Lab 2."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class ExtractedRecord:
    record_id: str
    source_id: str
    title: str
    source_url: str
    summary: str
    collected_at: str
    assumptions: list[str]


@dataclass(frozen=True)
class FailedExtraction:
    source_id: str
    reason: str


def load_fixture_html(path: Path) -> str:
    """Read fixture HTML from disk."""
    # TODO: Return the fixture text using UTF-8.
    return ""


def normalize_text(text: str) -> str:
    """Collapse repeated whitespace."""
    # TODO: Collapse repeated whitespace into single spaces.
    return ""


def extract_market_notes(html: str, *, collected_at: str) -> tuple[list[ExtractedRecord], list[FailedExtraction]]:
    """Extract citation-ready records from local HTML cards."""
    # TODO: Parse article.note cards, extract title, link, summary, and source_id.
    # Keep broken cards in failed extractions with a useful reason.
    return [], []


def records_to_jsonl_rows(records: list[ExtractedRecord]) -> list[dict[str, object]]:
    """Convert records into JSONL-ready dictionaries."""
    # TODO: Return dictionaries that preserve every provenance field.
    return []
