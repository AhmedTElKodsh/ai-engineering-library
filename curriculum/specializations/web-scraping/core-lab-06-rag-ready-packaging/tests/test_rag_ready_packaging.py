import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    build_chunk_text,
    build_package_manifest,
    build_refusal_rules,
    load_reviewed_records,
    package_records_for_rag,
)


FIXTURE = PROJECT_ROOT / "fixtures" / "reviewed-market-records.json"


def test_load_reviewed_records_preserves_quality_status():
    records = load_reviewed_records(FIXTURE)

    assert len(records) == 4
    assert records[0].record_id == "listing-001"
    assert records[0].quality_status == "passed"


def test_build_chunk_text_combines_title_heading_and_summary():
    record = load_reviewed_records(FIXTURE)[0]

    text = build_chunk_text(record)

    assert text.startswith("Cloud Revenue Watch")
    assert "Source section: Market Context Directory" in text
    assert "Cloud vendors report steady enterprise demand." in text


def test_package_records_for_rag_skips_failed_records_and_preserves_citations():
    records = load_reviewed_records(FIXTURE)

    chunks = package_records_for_rag(records, max_words=12)

    assert [chunk.record_id for chunk in chunks] == [
        "listing-001",
        "listing-001",
        "listing-002",
        "listing-002",
        "listing-003",
        "listing-003",
    ]
    assert chunks[0].chunk_id == "listing-001-chunk-001"
    assert chunks[0].citation == "Cloud Revenue Watch | https://example.com/research/cloud-revenue"
    assert chunks[0].metadata["source_url"] == "https://example.com/research/cloud-revenue"
    assert chunks[0].metadata["collected_at"] == "2026-05-25T10:00:00Z"
    assert chunks[0].metadata["quality_status"] == "passed"


def test_build_refusal_rules_covers_uncertain_or_unsafe_questions():
    rules = build_refusal_rules(load_reviewed_records(FIXTURE))
    rule_ids = [rule.rule_id for rule in rules]

    assert rule_ids == ["stale-data", "missing-provenance", "financial-advice"]
    assert any("cannot verify freshness" in rule.response for rule in rules)
    assert any("not financial advice" in rule.response for rule in rules)


def test_build_package_manifest_counts_citations_and_sources():
    records = load_reviewed_records(FIXTURE)
    chunks = package_records_for_rag(records, max_words=12)
    rules = build_refusal_rules(records)

    manifest = build_package_manifest(records, chunks, rules)

    assert manifest["record_count"] == 4
    assert manifest["packaged_record_count"] == 3
    assert manifest["chunk_count"] == 6
    assert manifest["citation_count"] == 6
    assert manifest["refusal_rule_ids"] == ["stale-data", "missing-provenance", "financial-advice"]
    assert manifest["source_urls"] == [
        "https://example.com/research/cloud-revenue",
        "https://example.com/research/edge-ai-devices",
        "https://example.com/research/semiconductor-supply",
    ]
