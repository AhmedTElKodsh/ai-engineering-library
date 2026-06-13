# Reference Behavior: Module 2 Phase 2 Embeddings

Scaffold: `curriculum/main-track/02-module-2-first-principles/week-02-embeddings/workbench.py`

## Intent

This lesson should teach tiny vector search without libraries: normalize terms, build vocabulary, vectorize notes, compute similarity, search, tie-break, and format grounded context.

## Intended Behavior

- Normalize terms by lowercasing and removing punctuation.
- Build sorted unique vocabulary from notes.
- Vectorize term counts in vocabulary order.
- Compute dot product, magnitude, and cosine similarity with zero-vector handling.
- Build an index that stores notes, vocabulary, and vectors.
- Return relevant results sorted by score and stable document order on ties.
- Format grounded context with sources for FinAgent.

## Reviewer Edge Cases

- Empty or unrelated queries should return no positive matches.
- Equal scores should preserve original note order.
- Zero vector similarity should be `0.0`, not an exception.

## Do Not Accept

- Embedding APIs or vector databases.
- Unstable vocabulary ordering.
- Context output that drops source IDs.
