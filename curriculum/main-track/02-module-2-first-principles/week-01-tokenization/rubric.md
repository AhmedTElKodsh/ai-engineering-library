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
## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capability, new capability, failure caught, FinAgent/practical transfer, and next advanced doorway | Explains the main lesson purpose and transfer | Treats the lesson as disconnected tasks |
| Failure Literacy | Reproduces and explains a realistic failure before or during the fix | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the minimum path and clearly labels optional enrichment | Completes the core task with minor scope drift | Pulls advanced work into the required path or skips core evidence |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
