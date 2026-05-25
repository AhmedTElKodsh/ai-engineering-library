# Hints: AI-Ready Ingestion And Chunking Lab

## Hint 1: Clean Text Before Chunking

Chunking messy text spreads the mess into every retrieval result. Make `normalize_text` boring and deterministic before touching chunks.

## Hint 2: Preserve Provenance

Every clean record and chunk should keep `record_id`, `source_id`, `title`, and `collected_at`. A later citation cannot recover metadata that this pipeline dropped.

## Hint 3: Report Bad Records

Do not crash the whole pipeline because one fixture is incomplete. Put the rejected record in `failed_records` with a short reason such as `missing_body`.

## Hint 4: Chunk Simply

Use word windows first. You are not optimizing retrieval yet; you are proving that source-grounded chunks can be produced and inspected.

## Hint 5: Keep The First Path Local

No LLM, vector database, web request, or LangGraph node belongs in this phase. Fixture-first evidence is the point.

