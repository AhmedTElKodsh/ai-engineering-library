import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    approved_sources,
    build_quality_report,
    collect_fixture_records,
    load_source_catalog,
    normalize_records,
    package_portfolio_artifact,
)


CATALOG = PROJECT_ROOT / "fixtures" / "source-catalog.json"
RECORDS = PROJECT_ROOT / "fixtures" / "market-context-records.json"


def test_load_source_catalog_preserves_approval_contract():
    catalog = load_source_catalog(CATALOG)

    assert len(catalog) == 2
    assert catalog[0].source_id == "market-notes"
    assert catalog[0].approved is True
    assert catalog[0].collection_method == "fixture"
    assert catalog[0].attribution


def test_approved_sources_filters_unapproved_sources():
    source_map = approved_sources(load_source_catalog(CATALOG))

    assert list(source_map) == ["market-notes"]
    assert source_map["market-notes"].freshness_days == 30


def test_collect_fixture_records_keeps_only_approved_sources():
    source_map = approved_sources(load_source_catalog(CATALOG))
    records = collect_fixture_records(RECORDS, source_map)

    assert [record.record_id for record in records] == ["ctx-001", "ctx-002", "ctx-003"]
    assert all(record.source_id == "market-notes" for record in records)


def test_normalize_records_preserves_citations_and_source_names():
    source_map = approved_sources(load_source_catalog(CATALOG))
    raw_records = collect_fixture_records(RECORDS, source_map)
    clean_records = normalize_records(raw_records, source_map)

    assert clean_records[0].title == "Cloud Revenue Watch"
    assert clean_records[0].source_name == "Market Context Notes"
    assert clean_records[0].citation == "Cloud Revenue Watch | https://example.com/research/cloud-revenue"
    assert clean_records[0].quality_status == "accepted"


def test_build_quality_report_counts_duplicates_and_sources():
    source_map = approved_sources(load_source_catalog(CATALOG))
    clean_records = normalize_records(collect_fixture_records(RECORDS, source_map), source_map)

    report = build_quality_report(clean_records)

    assert report["accepted_count"] == 3
    assert report["duplicate_citation_count"] == 1
    assert report["missing_provenance_count"] == 0
    assert report["source_urls"] == [
        "https://example.com/research/cloud-revenue",
        "https://example.com/research/edge-ai-devices",
    ]


def test_package_portfolio_artifact_is_reviewable_and_refusal_aware():
    source_map = approved_sources(load_source_catalog(CATALOG))
    clean_records = normalize_records(collect_fixture_records(RECORDS, source_map), source_map)
    report = build_quality_report(clean_records)

    package = package_portfolio_artifact(clean_records, report)

    assert package["chunk_count"] == 3
    assert package["citation_count"] == 3
    assert package["quality_report"]["duplicate_citation_count"] == 1
    assert "financial-advice" in package["refusal_rule_ids"]
    assert "not financial advice" in package["ethics_note"].lower()
