# Hints: Core Lab 2

Use these only after you have read the failing test and identified the extraction stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when extraction returns rows but quality or failure handling still fails.

## Layer 1

Read the fixture before coding. Identify the repeated card shape, required fields, and provenance source.

Before editing, answer:

- Is this test about finding cards, extracting fields, normalizing text, preserving provenance, or separating failures?
- Which fields are required for a clean row?
- What should happen when one card is incomplete?

## Layer 2

### Card Extraction

Identify the repeated card container first. Extract from inside that container so fields from different cards do not mix.

Treat missing title, URL, or summary as a failed extraction. Do not invent values.

### Normalization And Provenance

Normalize whitespace in extracted text. Preserve the source URL accurately enough for citation and review.

Provenance should travel with the clean row, not only appear in a report.

### Clean And Failed Rows

Return clean rows and failed rows separately. Later RAG modules should consume only citation-ready records.

Failure reasons should be short and stable.

## Layer 3

### Reading The Tests

If row counts are wrong, inspect card selection before field extraction.

If text comparisons fail, normalize whitespace before changing selectors.

If failure counts are wrong, classify incomplete cards before building clean rows.

### Final Check

Run fixture-loading and extraction tests before quality tests. The output should make good rows usable and bad rows visible.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
