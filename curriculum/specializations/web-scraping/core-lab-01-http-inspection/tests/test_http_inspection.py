import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    PageInspection,
    build_sample_inspection,
    decide_source_use,
    extraction_target_table,
)


def test_sample_inspection_is_complete_enough_to_review():
    inspection = build_sample_inspection()

    assert inspection.url.startswith("https://")
    assert inspection.status_code == 200
    assert "html" in inspection.content_type
    assert inspection.title
    assert inspection.robots_reviewed is True
    assert inspection.terms_reviewed is True
    assert inspection.selectors


def test_decide_source_use_requires_permission_and_structure():
    allowed = PageInspection(
        url="https://example.com/market-note",
        status_code=200,
        content_type="text/html",
        title="Market Note",
        robots_reviewed=True,
        terms_reviewed=True,
        selectors=["article", "h1"],
    )
    blocked = PageInspection(
        url="https://example.com/private",
        status_code=403,
        content_type="text/html",
        title="Private",
        robots_reviewed=True,
        terms_reviewed=True,
        selectors=["article"],
    )

    assert decide_source_use(allowed).allowed is True
    assert decide_source_use(blocked).allowed is False


def test_extraction_target_table_preserves_citation_fields():
    rows = extraction_target_table(build_sample_inspection())
    field_names = {row["field"] for row in rows}

    assert {"title", "body", "source_url", "collected_at"}.issubset(field_names)
    assert all(row["purpose"] for row in rows)
