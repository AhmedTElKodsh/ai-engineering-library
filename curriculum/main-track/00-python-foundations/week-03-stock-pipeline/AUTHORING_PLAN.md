# Authoring Plan: Module 0 Week 3

## Scope

Create the post-Module-1 stock research pipeline bridge.

This project applies Python foundations to local CSV-backed market data:
loading, validation, grouping, metrics, streaming summaries, and bounded
educational reporting.

## Acceptance Checks

- [x] `README.md` frames the project as a deterministic data spine for FinAgent.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define CSV loading, row validation, typed records, grouping, metrics,
  report rendering, failure handling, and educational safety language.
- [x] Fixture data is local and deterministic.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates data correctness, safety, transfer, code quality,
  and verification.

## Verification

```powershell
python -m pytest curriculum/main-track/00-python-foundations/week-03-stock-pipeline/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic

- Current capability: trace Module 1 FinAgent behavior and Module 0 utilities.
- New capability: build a CSV-backed stock data pipeline with validation and
  summaries.
- Failure mode: bad rows, missing prices, invalid windows, misleading metrics,
  or unsafe summaries.
- FinAgent improvement: deterministic data-loading and metrics spine before LLMs.
- Explanation artifact: learner traces raw CSV to clean records, metrics, and an
  educational report.

## Scope Boundary

- Minimum path: load fixture CSV, validate rows, group by ticker, calculate
  metrics, and render a bounded report.
- Optional enrichment: add one bad-row or metric edge case.
- Advanced doorway: live market APIs, trading logic, investment advice, and
  model-generated summaries stay out of scope.
