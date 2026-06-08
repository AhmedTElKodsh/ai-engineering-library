# Reference Behavior: Module 0 Week 3 Stock Pipeline

Scaffold: `curriculum/00-python-foundations/week-03-stock-pipeline/workbench.py`

## Intent

This bridge should connect Python foundations to FinAgent through a deterministic stock-data pipeline with validation, grouping, metrics, streaming summaries, and an educational disclaimer.

## Intended Behavior

- Normalize tickers and parse numeric prices from CSV rows.
- Reject missing ticker, date, source, and invalid price data with helpful errors.
- Group records by ticker while preserving row order.
- Calculate rounded percentage changes and moving averages.
- Build report objects and render source-aware educational summaries.

## Reviewer Edge Cases

- Previous close of zero should be rejected before division.
- Moving average windows should handle exact and partial windows intentionally.
- Summary lines should stream as a generator.
- Disclaimers should avoid investment-advice language.

## Do Not Accept

- Dropping failed rows silently.
- Sorting rows in a way that loses fixture order.
- Summaries that imply buy, sell, hold, or guaranteed future movement.
