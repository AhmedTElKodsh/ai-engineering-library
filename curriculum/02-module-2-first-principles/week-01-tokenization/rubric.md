# Rubric: Market Text Tokenization Lab

## Correctness

- Converts text to UTF-8 byte values and back without losing content.
- Counts adjacent pairs accurately.
- Merges pairs left to right without overlapping.
- Trains deterministic BPE merges up to the requested vocabulary size or until no pairs remain.
- Encodes by applying learned merges in order.
- Decodes merged and base tokens back to the original text.
- Estimates token budgets for each original input snippet.

## Learning Process

- Uses test failures as the main guide.
- Implements one behavior at a time.
- Can explain the difference between bytes, tokens, and token IDs.
- Can explain why punctuation and spacing can change token counts.

## FinAgent Connection

- Connects token budgets to market note length checks.
- Explains why long stock summaries should be measured before they enter an LLM context window.
- Avoids making investment recommendations in reflection examples.

## Code Quality

- Uses plain Python data structures.
- Keeps helper logic readable.
- Avoids external tokenizer or numerical libraries.
- Handles empty text and short token lists gracefully.

## Verification

- Runs `python -m pytest tests -v`.
- Reviews every failing test before changing code.
- Adds at least one extension test for a stock-market headline with punctuation.
