import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    build_provenance_table,
    find_quality_issues,
    load_records_fixture,
    normalize_source_record,
    summarize_quality_report,
)


FIXTURE = PROJECT_ROOT / "fixtures" / "collected-market-records.json"


def test_load_records_fixture_reads_record_list():
    raw_records = load_records_fixture(FIXTURE)

    assert len(raw_records) == 6
    assert raw_records[0]["record_id"] == "listing-001"


def test_normalize_source_record_preserves_required_provenance():
    raw = load_records_fixture(FIXTURE)[0]

    record = normalize_source_record(raw)

    assert record.record_id == "listing-001"
    assert record.title == "Cloud Revenue Watch"
    assert record.source_url == "https://example.com/research/cloud-revenue"
    assert record.source_heading == "Market Context Directory"
    assert record.collected_at == "2026-05-25T10:00:00Z"
    assert record.extraction_assumption.startswith("Fixture card")
    assert len(record.content_hash) == 12


def test_build_provenance_table_keeps_review_fields_only():
    records = [normalize_source_record(raw) for raw in load_records_fixture(FIXTURE)[:2]]

    table = build_provenance_table(records)

    assert table == [
        {
            "record_id": "listing-001",
            "source_url": "https://example.com/research/cloud-revenue",
            "source_heading": "Market Context Directory",
            "collected_at": "2026-05-25T10:00:00Z",
            "extraction_assumption": "Fixture card title and summary are treated as reviewable source context.",
        },
        {
            "record_id": "listing-002",
            "source_url": "https://example.com/research/semiconductor-supply",
            "source_heading": "Market Context Directory",
            "collected_at": "2026-05-25T10:00:00Z",
            "extraction_assumption": "Fixture card title and summary are treated as reviewable source context.",
        },
    ]


def test_find_quality_issues_flags_duplicates_stale_missing_and_short_records():
    records = [normalize_source_record(raw) for raw in load_records_fixture(FIXTURE)]

    issues = find_quality_issues(records, max_age_days=30, reference_date="2026-05-25")
    issue_pairs = {(issue.record_id, issue.issue_type) for issue in issues}

    assert ("listing-002-copy", "duplicate") in issue_pairs
    assert ("listing-003", "stale") in issue_pairs
    assert ("listing-004", "missing_provenance") in issue_pairs
    assert ("listing-005", "weak_summary") in issue_pairs


def test_summarize_quality_report_counts_issue_types_and_blocks_rag_when_issues_exist():
    records = [normalize_source_record(raw) for raw in load_records_fixture(FIXTURE)]
    issues = find_quality_issues(records, max_age_days=30, reference_date="2026-05-25")

    report = summarize_quality_report(records, issues)

    assert report["record_count"] == 6
    assert report["issue_count"] == 4
    assert report["ready_for_rag"] is False
    assert report["issue_counts"] == {
        "duplicate": 1,
        "missing_provenance": 1,
        "stale": 1,
        "weak_summary": 1,
    }
    assert report["reviewed_source_urls"][0] == "https://example.com/research/cloud-revenue"
