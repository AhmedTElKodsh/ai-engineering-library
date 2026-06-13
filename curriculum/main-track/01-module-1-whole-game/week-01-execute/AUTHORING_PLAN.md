# Authoring Plan: Module 1 Phase 1

## Scope

Create the first whole-game deterministic FinAgent stock-summary slice.

This phase teaches learners to run a complete product loop before introducing
LLMs, RAG, tools, agents, or deployment infrastructure.

## Acceptance Checks

- [x] `README.md` frames whole-game-first learning, prediction before execution,
  test-guided implementation, safety boundary, and reflection.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define price parsing, invalid-value refusal, percentage movement,
  zero previous-close failure, movement classification, ticker validation, and
  grounded safe summary text.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates correctness, source grounding, safety, process, and
  verification.

## Verification

```powershell
python -m pytest curriculum/main-track/01-module-1-whole-game/week-01-execute/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic

- Current capability: run pytest and read a scaffolded Python workbench.
- New capability: execute the first deterministic FinAgent stock-summary slice.
- Failure mode: missing validation, incorrect movement math, invalid tickers, or
  unsafe advice language.
- FinAgent improvement: first inspectable product loop.
- Explanation artifact: learner explains how input data becomes a safe
  educational market summary.

## Scope Boundary

- Minimum path: parse prices, calculate movement, classify movement, validate
  ticker, and build a grounded educational summary.
- Optional enrichment: add one validation or formatting edge case.
- Advanced doorway: LLM calls, RAG, live data, agents, and hosted deployment stay
  out of Phase 1.
