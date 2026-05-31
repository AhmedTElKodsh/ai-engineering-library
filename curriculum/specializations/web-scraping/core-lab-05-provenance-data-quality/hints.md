# Hints: Core Lab 5

Use these only after you have read the failing test and identified the provenance or quality stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when quality issues are close but the RAG gate still fails.

## Layer 1

This lab turns collected records into reviewable evidence. Focus on normalization, provenance table, quality issues, and the RAG readiness gate.

Before editing, answer:

- Is this test about fixture loading, field normalization, provenance display, issue detection, or readiness?
- Which fields does a reviewer need to trust the source?
- Which issue should block RAG packaging?

## Layer 2

### Fixture And Normalization

The fixture contains a top-level records list. Start by loading that list consistently.

Trim whitespace on text fields. If a content hash is missing, derive one from stable normalized content.

### Provenance

The provenance table is intentionally smaller than the full record. It should show what a reviewer needs to decide whether the source is usable.

Do not drop source URL, collection time, or status fields that explain trust.

### Quality Issues And Gate

Quality checks should name specific issue types such as duplicates, stale data, missing provenance, or weak summaries.

RAG readiness should be true only when there are usable records and no blocking quality issues.

## Layer 3

### Reading The Tests

If duplicate detection fails, compare normalized identifiers and content hashes.

If stale or missing-provenance checks fail, inspect dates and required provenance fields before changing the gate.

If readiness is wrong, list all detected issues before deciding the final boolean.

### Final Check

Run normalization and issue tests before readiness tests. The gate should summarize quality evidence, not guess from record count alone.
