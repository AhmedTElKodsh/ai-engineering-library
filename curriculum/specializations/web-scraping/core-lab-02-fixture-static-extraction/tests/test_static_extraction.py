import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    extract_market_notes,
    load_fixture_html,
    normalize_text,
    records_to_jsonl_rows,
)


FIXTURE = PROJECT_ROOT / "fixtures" / "market_notes.html"


def test_load_fixture_html_reads_local_file():
    html = load_fixture_html(FIXTURE)

    assert "Cloud Revenue Watch" in html


def test_normalize_text_collapses_whitespace():
    assert normalize_text(" Cloud\n revenue\t watch  ") == "Cloud revenue watch"


def test_extract_market_notes_returns_records_and_failures():
    html = load_fixture_html(FIXTURE)

    records, failed = extract_market_notes(html, collected_at="2026-05-25T09:00:00Z")

    assert len(records) == 2
    assert len(failed) == 1
    assert records[0].record_id == "market-news-001"
    assert records[0].source_url == "https://example.com/cloud-revenue"
    assert records[0].summary.startswith("Cloud vendors")
    assert failed[0].source_id == "broken-card"
    assert "summary" in failed[0].reason


def test_records_to_jsonl_rows_preserves_provenance():
    html = load_fixture_html(FIXTURE)
    records, _failed = extract_market_notes(html, collected_at="2026-05-25T09:00:00Z")

    rows = records_to_jsonl_rows(records)

    assert rows[0]["record_id"] == "market-news-001"
    assert rows[0]["source_url"].startswith("https://")
    assert rows[0]["collected_at"] == "2026-05-25T09:00:00Z"
    assert rows[0]["assumptions"]
