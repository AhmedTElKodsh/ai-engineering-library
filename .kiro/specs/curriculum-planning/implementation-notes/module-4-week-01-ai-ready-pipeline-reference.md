# Module 4 Week 1 Reviewer Note

This note records the intended reference behavior for `curriculum/04-module-4-agentic-workflows/week-01-basic-rag` without placing a full solution in the learner folder.

## Intended Slice

The learner builds an AI-ready ingestion pipeline before RAG:

1. Load deterministic fixture records.
2. Normalize text by trimming and collapsing whitespace.
3. Normalize metadata by trimming keys/values, lowercasing keys, and dropping blank keys.
4. Validate `record_id`, `source_id`, `title`, `body`, and `collected_at`.
5. Convert valid records to `CleanRecord`.
6. Convert invalid records to `FailedRecord` with stable reasons such as `missing_body`.
7. Create word-window chunks with chunk IDs like `doc-1-chunk-001`.
8. Build a report with raw, clean, failed, and chunk counts plus failed reasons and source IDs.

## Scope Guardrail

This phase should not add embeddings, vector databases, LLM calls, LangChain, LangGraph, live web scraping, or agent loops. Those belong after source identity, failed-record handling, and chunk metadata are testable.

