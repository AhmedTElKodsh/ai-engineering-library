"""HTTP and page-inspection workbench for Web Data Acquisition Core Lab 1.

Learners complete the TODOs using plain Python data structures.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class PageInspection:
    url: str
    status_code: int
    content_type: str
    title: str
    robots_reviewed: bool
    terms_reviewed: bool
    selectors: list[str] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class SourceDecision:
    allowed: bool
    reasons: list[str]
    required_limits: list[str]


def build_sample_inspection() -> PageInspection:
    """Return one deterministic inspected source for the lab."""
    # TODO: Return a realistic inspection for a public market-context page.
    return PageInspection("", 0, "", "", False, False)


def decide_source_use(inspection: PageInspection) -> SourceDecision:
    """Decide whether a source can be used for bounded collection."""
    # TODO: Require HTTP 200, HTML content, robots review, terms review,
    # a title, and at least one selector before allowing collection.
    return SourceDecision(False, [], [])


def extraction_target_table(inspection: PageInspection) -> list[dict[str, str]]:
    """Describe fields the next lab should extract and preserve."""
    # TODO: Return rows for title, body/summary, source_url, and collected_at.
    return []
