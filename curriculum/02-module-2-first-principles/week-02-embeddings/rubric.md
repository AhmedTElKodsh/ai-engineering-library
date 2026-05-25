# Rubric: Market Note Similarity Search Lab

## Correctness

- Normalizes text into lowercase alphanumeric terms.
- Builds a deterministic sorted vocabulary.
- Creates term-frequency vectors aligned to vocabulary order.
- Computes dot product, vector magnitude, and cosine similarity correctly.
- Handles zero vectors without crashing.
- Builds an index with matching notes and vectors.
- Searches by score while preserving source order for ties.
- Returns only positive matches.
- Formats grounded context with source IDs, tickers, scores, and original text.

## Learning Process

- Implements vector math before retrieval.
- Uses failing tests to decide the next small change.
- Can explain what each vector position represents.
- Can explain why simple term-count embeddings are limited.

## FinAgent Connection

- Connects retrieval to grounded stock-market analysis.
- Keeps source IDs attached to retrieved notes.
- Can explain how irrelevant retrieval could mislead an answer.
- Avoids pretending this toy embedding has semantic understanding.

## Code Quality

- Uses plain Python lists, dictionaries, dataclasses, and `math`.
- Avoids NumPy, vector databases, embedding APIs, and LLM calls.
- Keeps result ordering deterministic.
- Handles empty queries and no-match cases gracefully.

## Verification

- Runs `python -m pytest tests -v`.
- Reviews all failing tests before changing code.
- Adds at least one extension test for ticker retrieval and one for topic retrieval.
