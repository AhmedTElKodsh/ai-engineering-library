# Hints: Web Data Portfolio Mini-Project

Use these only after you have read the failing test and identified which
portfolio artifact it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are
stuck. Use Layer 3 when the artifact exists but provenance, quality, or package
evidence still fails.

## Layer 1

This project is composition. Each test maps to one core-lab habit.

Before editing, answer:

- Is this failure about source approval, collection, normalization, quality, packaging, or reflection?
- Which provenance field must survive this step?
- Is a record allowed to feed retrieval, or should it become refusal evidence?

## Layer 2

### Source Approval

Treat the source catalog as a gate. A source is usable only when it is approved,
has an allowed collection method, and includes attribution guidance.

### Collection And Normalization

Raw records should preserve source IDs and URLs. Clean records can add normalized
fields, but they should not erase where the data came from.

### Quality Report

Count blocked records separately from accepted records. Missing provenance,
duplicates, and stale records are useful failure evidence.

### Package Manifest

The manifest should make review easy: chunk count, citation count, source URLs,
quality counts, refusal rules, and a short reviewer note.

## Layer 3

### Reading The Tests

If approved-source tests fail, inspect the catalog before touching records.

If duplicate counts fail, compare normalized titles and source URLs.

If citation tests fail, check whether each packaged chunk includes a source URL
and title.

### Final Check

The final package should answer a reviewer question: can this data safely feed a
small RAG or FinAgent demo, and what must it refuse?

## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the
failing test name, assertion message, malformed fixture, missing field, unsafe
output, weak citation, or unclear trace. Write one sentence about what the
failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
