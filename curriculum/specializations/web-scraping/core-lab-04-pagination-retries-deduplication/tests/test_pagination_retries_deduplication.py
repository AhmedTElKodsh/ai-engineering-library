import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    FetchFailure,
    build_fetch_plan,
    deduplicate_records,
    discover_next_page_url,
    extract_listing_records,
    load_page_fixture,
    summarize_collection,
)


FIXTURE_DIR = PROJECT_ROOT / "fixtures"
PAGE_1 = FIXTURE_DIR / "market-listings-page-1.html"
PAGE_2 = FIXTURE_DIR / "market-listings-page-2.html"


def test_load_page_fixture_reads_html():
    html = load_page_fixture(PAGE_1)

    assert "Market Context Directory" in html


def test_discover_next_page_url_resolves_relative_link():
    html = load_page_fixture(PAGE_1)

    next_url = discover_next_page_url(html, "https://example.com/research/listings?page=1")

    assert next_url == "https://example.com/research/listings?page=2"


def test_discover_next_page_url_returns_none_on_last_page():
    html = load_page_fixture(PAGE_2)

    assert discover_next_page_url(html, "https://example.com/research/listings?page=2") is None


def test_extract_listing_records_preserves_page_and_source_metadata():
    records = extract_listing_records(
        load_page_fixture(PAGE_1),
        page_url="https://example.com/research/listings?page=1",
    )

    assert len(records) == 3
    assert records[0].record_id == "listing-001"
    assert records[0].title == "Cloud Revenue Watch"
    assert records[0].source_url == "https://example.com/research/cloud-revenue"
    assert records[0].page_url.endswith("page=1")
    assert len(records[0].content_hash) == 12


def test_deduplicate_records_removes_repeated_url_and_content():
    page_1_records = extract_listing_records(load_page_fixture(PAGE_1), "https://example.com/research/listings?page=1")
    page_2_records = extract_listing_records(load_page_fixture(PAGE_2), "https://example.com/research/listings?page=2")

    deduped = deduplicate_records(page_1_records + page_2_records)

    assert [record.record_id for record in deduped] == [
        "listing-001",
        "listing-002",
        "listing-003",
        "listing-004",
    ]


def test_build_fetch_plan_includes_timeout_and_rate_limit_metadata():
    plan = build_fetch_plan(
        [
            "https://example.com/research/listings?page=1",
            "https://example.com/research/listings?page=2",
        ],
        delay_seconds=1.5,
        timeout_seconds=10.0,
    )

    assert plan == [
        {
            "page_url": "https://example.com/research/listings?page=1",
            "timeout_seconds": 10.0,
            "delay_before_next_seconds": 1.5,
            "max_attempts": 3,
        },
        {
            "page_url": "https://example.com/research/listings?page=2",
            "timeout_seconds": 10.0,
            "delay_before_next_seconds": 0.0,
            "max_attempts": 3,
        },
    ]


def test_summarize_collection_counts_records_and_failures():
    records = deduplicate_records(
        extract_listing_records(load_page_fixture(PAGE_1), "https://example.com/research/listings?page=1")
        + extract_listing_records(load_page_fixture(PAGE_2), "https://example.com/research/listings?page=2")
    )
    failures = [
        FetchFailure(
            page_url="https://example.com/research/listings?page=3",
            reason="timeout",
            attempts=3,
        )
    ]

    report = summarize_collection(records, failures)

    assert report["record_count"] == 4
    assert report["failed_count"] == 1
    assert report["source_urls"][0] == "https://example.com/research/cloud-revenue"
    assert report["failure_reasons"]["timeout"] == 1
