"""RAG-ready packaging workbench for Web Data Acquisition Core Lab 6."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class ReviewedRecord:
    record_id: str
    title: str
    summary: str
    source_url: str
    source_heading: str
    collected_at: str
    extraction_assumption: str
    quality_status: str


@dataclass(frozen=True)
class RagPackageChunk:
    chunk_id: str
    record_id: str
    text: str
    citation: str
    metadata: dict[str, str] = field(default_factory=dict)


@dataclass(frozen=True)
class RefusalRule:
    rule_id: str
    trigger: str
    response: str


def load_reviewed_records(path: Path) -> list[ReviewedRecord]:
    """Load records that have already passed the provenance review gate."""
    # TODO: Read UTF-8 JSON and return reviewed records.
    return []


def build_chunk_text(record: ReviewedRecord) -> str:
    """Create the text a retriever should index for one reviewed record."""
    # TODO: Combine title, heading, and summary without dropping source context.
    return ""


def package_records_for_rag(records: list[ReviewedRecord], max_words: int = 45) -> list[RagPackageChunk]:
    """Convert reviewed records into citation-ready chunks."""
    # TODO: Skip non-passed records, split long text by max_words, and preserve citation metadata.
    return []


def build_refusal_rules(records: list[ReviewedRecord]) -> list[RefusalRule]:
    """Write rules for questions the packaged data should not answer confidently."""
    # TODO: Include stale, missing-provenance, and financial-advice refusal rules.
    return []


def build_package_manifest(
    records: list[ReviewedRecord],
    chunks: list[RagPackageChunk],
    refusal_rules: list[RefusalRule],
) -> dict[str, object]:
    """Summarize the package before Module 4 consumes it."""
    # TODO: Return record_count, packaged_record_count, chunk_count, citation_count, refusal_rule_ids, and source_urls.
    return {}
