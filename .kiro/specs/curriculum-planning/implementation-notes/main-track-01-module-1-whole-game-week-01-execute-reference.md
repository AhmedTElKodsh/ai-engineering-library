# Reference Behavior: Module 1 Week 1 First FinAgent Stock Summary

Scaffold: `curriculum/main-track/01-module-1-whole-game/week-01-execute/workbench.py`

## Intent

This lesson should let learners run the first deterministic FinAgent slice: validate inputs, compute movement, classify it, and return a grounded educational summary.

## Intended Behavior

- Parse plain and dollar-prefixed prices.
- Reject blank, negative, zero-where-invalid, and nonnumeric prices.
- Normalize valid tickers and reject malformed symbols.
- Calculate percentage change with clear rounding.
- Classify movement with simple thresholds.
- Build a summary that includes ticker, prices, movement, and educational disclaimer.

## Reviewer Edge Cases

- Previous close of zero should fail before percentage calculation.
- Ticker normalization should uppercase valid symbols.
- Summary language should remain educational and avoid trading advice.

## Do Not Accept

- LLM calls or external market APIs.
- Advice language such as buy, sell, hold, or guaranteed direction.
- Hardcoded ticker-specific output.
