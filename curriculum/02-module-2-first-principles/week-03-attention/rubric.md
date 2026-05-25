# Rubric: Market Context Attention Lab

## Correctness

- Computes dot products for equal-length vectors.
- Rejects mismatched vector dimensions.
- Scales scores by square root of vector dimension.
- Implements stable softmax.
- Produces weights that sum to 1.
- Computes weighted sums across value vectors.
- Validates that keys, values, and sources align.
- Returns attention output, weights, and sources together.
- Identifies the highest-weight source.
- Explains the top attended source with ID, ticker, and rounded weight.

## Learning Process

- Implements math helpers before the full attention function.
- Uses each failing test to guide the next TODO.
- Can explain query, key, value, score, weight, and output in plain language.
- Can describe why attention is useful but not a perfect explanation.

## FinAgent Connection

- Connects attention weights to debugging market-context focus.
- Avoids presenting attention weights as financial evidence.
- Explains how retrieved notes from Phase 2 become candidate context for attention.
- Maintains source IDs so later modules can preserve traceability.

## Code Quality

- Uses plain Python lists and `math`.
- Avoids NumPy, transformer libraries, and LLM calls.
- Keeps validation errors clear.
- Keeps result ordering deterministic.

## Verification

- Runs `python -m pytest tests -v`.
- Reviews all failing tests before changing code.
- Adds one extension test for an ambiguous attention case.
