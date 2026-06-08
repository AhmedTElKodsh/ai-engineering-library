# Reference Behavior: Module 4 Phase 1 AI-Ready Ingestion And Chunking

Scaffold: `curriculum/04-module-4-agentic-workflows/week-01-basic-rag/workbench.py`

## Intent

This lesson should teach that reliable RAG starts before retrieval: raw records, normalized text, provenance metadata, failed-record evidence, chunks, and pipeline reporting.

## Intended Behavior

- Normalize text without destroying meaningful case where required.
- Preserve source metadata and provenance fields.
- Separate clean records from failed records with reasons.
- Chunk clean records while carrying source IDs and citation metadata.
- Build pipeline reports with counts and named failures.
- Return full pipeline output for inspection.

## Reviewer Edge Cases

- Missing required fields should become failed records, not crashes.
- Chunk metadata should include enough source information for later citation.
- Failed-record counts should match actual failed rows.

## Do Not Accept

- Silent record dropping.
- Chunks without provenance.
- Retrieval behavior before ingestion quality is proven.
