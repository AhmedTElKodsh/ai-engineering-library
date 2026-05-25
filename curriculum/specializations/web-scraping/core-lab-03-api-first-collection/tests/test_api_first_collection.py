import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    build_api_collection_report,
    collect_api_records,
    load_api_fixture,
    validate_api_item,
)


FIXTURE = PROJECT_ROOT / "fixtures" / "market_api_response.json"


def test_load_api_fixture_reads_json_payload():
    payload = load_api_fixture(FIXTURE)

    assert payload["endpoint"] == "https://api.example.com/market-notes"
    assert len(payload["items"]) == 3


def test_validate_api_item_reports_missing_required_fields():
    errors = validate_api_item({"id": "bad-1", "symbol": "", "headline": "Missing fields"})

    assert "symbol" in errors
    assert "summary" in errors
    assert "source_url" in errors
    assert "published_at" in errors


def test_collect_api_records_separates_clean_and_failed_layers():
    payload = load_api_fixture(FIXTURE)

    clean_records, failed_records = collect_api_records(payload)

    assert len(clean_records) == 2
    assert len(failed_records) == 1
    assert clean_records[0].record_id == "api-001"
    assert clean_records[0].symbol == "AAPL"
    assert clean_records[0].endpoint == "https://api.example.com/market-notes"
    assert clean_records[0].collected_at == "2026-05-25T10:00:00Z"
    assert failed_records[0].record_id == "api-003"
    assert "symbol" in failed_records[0].reason


def test_build_api_collection_report_summarizes_evidence():
    clean_records, failed_records = collect_api_records(load_api_fixture(FIXTURE))

    report = build_api_collection_report(clean_records, failed_records)

    assert report["clean_count"] == 2
    assert report["failed_count"] == 1
    assert report["symbols"] == ["AAPL", "MSFT"]
    assert report["failure_reasons"]["symbol"] == 1
