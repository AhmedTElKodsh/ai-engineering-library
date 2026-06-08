"""Archived sample research data for legacy evaluator tests.

The active curriculum test surface lives under `curriculum/`. These plain
dictionaries keep the fixture import-safe without restoring the removed
`teaching_methodology_evaluator` package.
"""

SAMPLE_SOURCE_1 = {
    "title": "Spaced Repetition in Technical Education",
    "authors": ["Smith, J.", "Doe, A."],
    "publication_date": "2024-03-15",
    "source_type": "peer-reviewed",
    "url": "https://example.com/paper1",
}

SAMPLE_SOURCE_2 = {
    "title": "Productive Failure in Programming Education",
    "authors": ["Johnson, B."],
    "publication_date": "2024-06-20",
    "source_type": "peer-reviewed",
    "url": "https://example.com/paper2",
}

SAMPLE_SOURCE_3 = {
    "title": "AI-Era Programming Education",
    "authors": ["Lee, C.", "Wang, D."],
    "publication_date": "2025-01-10",
    "source_type": "peer-reviewed",
    "url": "https://example.com/paper3",
}

SAMPLE_FINDINGS_1 = {
    "source": SAMPLE_SOURCE_1,
    "pedagogical_domain": "spaced repetition",
    "key_findings": ["Spaced repetition improves long-term retention"],
}

SAMPLE_FINDINGS_2 = {
    "source": SAMPLE_SOURCE_2,
    "pedagogical_domain": "productive failure",
    "key_findings": ["Students benefit from consolidation after struggle"],
}

SAMPLE_FINDINGS_3 = {
    "source": SAMPLE_SOURCE_3,
    "pedagogical_domain": "code comprehension",
    "key_findings": ["Code comprehension should precede code generation"],
}

ALL_SAMPLE_SOURCES = [SAMPLE_SOURCE_1, SAMPLE_SOURCE_2, SAMPLE_SOURCE_3]
ALL_SAMPLE_FINDINGS = [SAMPLE_FINDINGS_1, SAMPLE_FINDINGS_2, SAMPLE_FINDINGS_3]
