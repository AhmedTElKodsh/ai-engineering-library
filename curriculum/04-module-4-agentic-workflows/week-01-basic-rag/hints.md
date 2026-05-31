# Hints: AI-Ready Ingestion And Chunking Lab

Use these only after you have read the failing test and identified the ingestion stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when clean records exist but chunks or reports still fail.

## Layer 1

Keep the first path local and evidence-first: fixture record, normalized record, failed record, chunk, and report.

Before editing, answer:

- Is this test about cleaning text, preserving provenance, rejecting bad records, chunking, or reporting?
- Which metadata must survive every stage?
- Should this record become a clean record or a failed record?

## Layer 2

### Cleaning And Provenance

Normalize text before chunking. Chunking messy text spreads the mess into every retrieval result.

Every clean record and chunk should keep source identity fields such as record ID, source ID, title, and collection timestamp. Later citations cannot recover metadata that was dropped.

### Failed Records

Do not crash the whole pipeline because one fixture is incomplete. Put rejected records in the failed-record collection with a short reason.

Failure reasons should be stable enough for tests and reviewers to understand what happened.

### Chunking And Scope

Use simple word windows first. This lab proves source-grounded chunks can be produced and inspected; it is not optimizing retrieval yet.

No live LLM, vector database, web request, or graph runtime belongs in this phase.

## Layer 3

### Reading The Tests

If chunk metadata is missing, inspect the transition from clean record to chunk.

If failed-record counts are wrong, classify each fixture record before changing chunking.

If report text fails, list the required quality facts before rewriting the pipeline.

### Final Check

Run cleaning tests before chunking tests. The chunker should only consume records that already passed validation.
