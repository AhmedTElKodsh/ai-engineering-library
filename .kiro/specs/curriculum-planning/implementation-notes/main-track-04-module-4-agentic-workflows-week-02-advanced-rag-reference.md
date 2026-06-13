# Reference Behavior: Module 4 Phase 2 Citation And Abstention RAG

Scaffold: `curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag/workbench.py`

## Intent

This lesson should build a small source-grounded retriever that cites supporting chunks and abstains when evidence is too weak.

## Intended Behavior

- Load deterministic bridge-shaped chunks with source URL metadata.
- Normalize searchable terms by lowercasing, removing punctuation, and dropping short terms.
- Rank chunks by keyword overlap and stable score ordering.
- Return supported answers with citations and reason `supported_by_retrieval`.
- Abstain without citations when retrieval evidence is insufficient.
- Build trace records with query, result count, chunk IDs, scores, matched terms, and sources.
- Optional extension hooks should support tiny vocabulary, vectorization, cosine similarity, and hybrid retrieval.

## Reviewer Edge Cases

- Unsupported price-prediction or advice questions should abstain.
- Trace output should be useful for debugging a bad retrieval result.
- Hybrid extension should not replace the required keyword baseline.

## Do Not Accept

- Answers without citations.
- Confident output for unsupported questions.
- Retrieval that drops source metadata.
