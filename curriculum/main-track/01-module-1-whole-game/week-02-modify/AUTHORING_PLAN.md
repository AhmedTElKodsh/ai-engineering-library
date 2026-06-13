# Authoring Plan: Module 1 Phase 2

## Scope

Create the FinAgent risk-signal extension after the first stock-summary slice.

This phase teaches learners to make a small product behavior change while tests
protect math, formatting, safety language, and scope.

## Acceptance Checks

- [x] `README.md` frames risk labels, percentage formatting, and safer summaries
  as a constrained product extension.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define risk classification, percentage formatting, summary content,
  boundary behavior, and educational disclaimer preservation.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates correctness, safety, maintainability, reflection,
  and verification.

## Verification

```powershell
python -m pytest curriculum/main-track/01-module-1-whole-game/week-02-modify/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic

- Current capability: run and explain the first FinAgent summary.
- New capability: add risk labels, percentage formatting, and safer summary
  behavior.
- Failure mode: misclassified movement, unclear percentages, overconfident
  wording, or lost disclaimer.
- FinAgent improvement: deterministic demo becomes a modifiable product slice.
- Explanation artifact: learner explains how a small behavior change stays
  testable and safe.

## Scope Boundary

- Minimum path: implement risk label, percent formatting, and risk-aware summary.
- Optional enrichment: add one risk-threshold edge case.
- Advanced doorway: prediction models, trading advice, live data, and LLM
  phrasing stay out of scope.
