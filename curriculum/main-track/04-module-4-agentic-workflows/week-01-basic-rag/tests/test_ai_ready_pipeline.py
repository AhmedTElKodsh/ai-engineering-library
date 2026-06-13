import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    RawRecord,
    build_pipeline_report,
    chunk_records,
    load_fixture_records,
    normalize_metadata,
    normalize_text,
    prepare_records,
    run_pipeline,
)


def test_normalize_text_collapses_whitespace_without_lowercasing():
    text = "  AAPL   revenue\nimproved\twhile margins   stayed flat.  "

    assert normalize_text(text) == "AAPL revenue improved while margins stayed flat."


def test_normalize_metadata_preserves_provenance_values():
    metadata = {" Publisher ": " Example News ", "": "ignored", "Topic": " Earnings "}

    assert normalize_metadata(metadata) == {"publisher": "Example News", "topic": "Earnings"}


def test_prepare_records_keeps_clean_records_and_reports_bad_records():
    records = [
        RawRecord(
            record_id="doc-1",
            source_id="market-note",
            title="AAPL Revenue Note",
            body=" AAPL revenue improved.  Margin pressure remains. ",
            collected_at="2026-05-01T09:00:00Z",
            metadata={"Publisher": "Example News"},
        ),
        RawRecord(
            record_id="doc-2",
            source_id="market-note",
            title="Blank Body",
            body="   ",
            collected_at="2026-05-01T09:05:00Z",
            metadata={"Publisher": "Example News"},
        ),
    ]

    clean_records, failed_records = prepare_records(records)

    assert len(clean_records) == 1
    assert clean_records[0].record_id == "doc-1"
    assert clean_records[0].text == "AAPL revenue improved. Margin pressure remains."
    assert clean_records[0].metadata == {"publisher": "Example News"}
    assert len(failed_records) == 1
    assert failed_records[0].record_id == "doc-2"
    assert "body" in failed_records[0].reason


def test_chunk_records_preserves_source_metadata_for_citations():
    records, _failed = prepare_records(
        [
            RawRecord(
                record_id="doc-1",
                source_id="annual-report",
                title="Company Risk Factors",
                body="one two three four five six seven",
                collected_at="2026-05-02T10:00:00Z",
                metadata={"Publisher": "Company Filing", "Ticker": "AAPL"},
            )
        ]
    )

    chunks = chunk_records(records, max_words=3)

    assert [chunk.text for chunk in chunks] == ["one two three", "four five six", "seven"]
    assert chunks[0].chunk_id == "doc-1-chunk-001"
    assert chunks[0].metadata["title"] == "Company Risk Factors"
    assert chunks[0].metadata["collected_at"] == "2026-05-02T10:00:00Z"
    assert chunks[0].metadata["publisher"] == "Company Filing"
    assert chunks[0].metadata["ticker"] == "AAPL"


def test_build_pipeline_report_counts_and_names_failures():
    raw_records = load_fixture_records()
    clean_records, failed_records = prepare_records(raw_records)
    chunks = chunk_records(clean_records, max_words=8)

    report = build_pipeline_report(raw_records, clean_records, failed_records, chunks)

    assert report["raw_count"] == 4
    assert report["clean_count"] == 3
    assert report["failed_count"] == 1
    assert report["chunk_count"] >= 3
    assert report["failed_reasons"] == {"missing_body": 1}
    assert "doc-missing-body" in report["failed_record_ids"]


def test_run_pipeline_returns_clean_records_failures_chunks_and_report():
    output = run_pipeline(load_fixture_records(), max_words=8)

    assert len(output.clean_records) == 3
    assert len(output.failed_records) == 1
    assert len(output.chunks) >= 3
    assert output.report["raw_count"] == 4
    assert output.report["source_ids"] == ["company-filing", "market-news", "research-note"]

