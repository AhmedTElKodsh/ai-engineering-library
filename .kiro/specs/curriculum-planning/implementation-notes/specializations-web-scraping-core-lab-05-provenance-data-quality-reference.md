# Reference Behavior: Web Data Core Lab 5 Provenance And Data Quality

Scaffold: `curriculum/specializations/web-scraping/core-lab-05-provenance-data-quality/workbench.py`

## Intent

This lab should teach source review before RAG packaging: provenance normalization, review tables, quality issues, and blocking decisions.

## Intended Behavior

- Load reviewed records from fixtures.
- Normalize source records while preserving provenance.
- Build provenance tables with review fields.
- Find quality issues such as duplicates, stale data, missing source fields, and short records.
- Summarize issue types and block RAG readiness when issues exist.

## Reviewer Edge Cases

- Duplicate detection should preserve evidence of both records.
- Stale records should be flagged by date/age rules.
- Missing provenance should block RAG packaging.

## Do Not Accept

- Treating all extracted records as RAG-ready.
- Quality reports without issue categories.
- Dropping provenance in review tables.
