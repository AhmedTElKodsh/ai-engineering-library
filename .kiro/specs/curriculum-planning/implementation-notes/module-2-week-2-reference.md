# Module 2 Week 2 Reference Behavior

This note records intended behavior for reviewers without placing complete answers in the learner-facing workbench.

## Intended Scope

Module 2 Week 2 introduces deterministic vector retrieval for FinAgent market notes. It should remain first-principles:

- plain Python only
- no NumPy
- no vector database
- no embedding API
- no LLM calls

## Expected Learner Behaviors

- `normalize_terms(text)` lowercases and extracts alphanumeric terms.
- `build_vocabulary(texts)` returns sorted unique terms across all texts.
- `vectorize(text, vocabulary)` returns term-frequency floats in vocabulary order.
- `dot_product(left, right)` sums position-wise products.
- `magnitude(vector)` returns Euclidean length.
- `cosine_similarity(left, right)` returns cosine similarity and returns `0.0` for zero vectors.
- `build_index(notes)` stores vocabulary, original notes, and one aligned vector per note.
- `search(query, index, top_k)` vectorizes the query, scores notes, sorts by score descending, preserves source order for ties, and returns only positive matches.
- `build_grounded_context(results)` formats source-grounded context lines with note ID, ticker, score, and original note text.

## Pedagogical Intent

The tests are expected to fail in the learner workbench state. The first failures should point learners toward vector math and text normalization before retrieval.

The FinAgent callback is retrieval of grounded market notes before a later module adds LLM summarization.
