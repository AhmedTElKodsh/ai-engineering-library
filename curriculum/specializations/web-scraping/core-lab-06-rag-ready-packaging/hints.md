# Hints: Core Lab 6

Use these only after you have read the failing test and identified the packaging stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when chunks exist but citation, metadata, or refusal rules fail.

## Layer 1

This lab packages reviewed records for RAG. Only trusted records become retrieval chunks; blocked records inform refusal rules.

Before editing, answer:

- Is this test about loading reviewed records, chunk text, package filtering, citation metadata, or refusal rules?
- Which records are allowed to become chunks?
- What source facts must each chunk preserve?

## Layer 2

### Loader And Filtering

The fixture contains a top-level records list. Convert each item into the local reviewed-record shape.

Package only records whose quality status passed. Blocked records should not become retrieval chunks.

### Chunk Text And Citations

A useful chunk should include enough human-readable content to support a grounded answer.

Each chunk needs a citation string and metadata that preserve source URL, collection timestamp, and other reviewer-needed provenance.

### Refusal Rules

Write refusal rules for stale data, missing provenance, and financial advice. These are downstream assistant boundaries, not retrieval content.

Refusal rules should be clear enough for a future assistant to apply consistently.

## Layer 3

### Reading The Tests

If blocked records become chunks, inspect filtering before chunk construction.

If citation tests fail, compare required provenance fields against chunk metadata.

If refusal rules fail, check whether each blocked condition has a distinct, readable rule.

### Final Check

Run loader and filtering tests before citation tests. The package is ready only when chunks are citation-ready and refusal boundaries are explicit.
