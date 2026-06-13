# Authoring Plan: Module 0 Week 1

## Scope

Create the FinAgent intake mini-project for learners whose diagnostic shows
everyday Python gaps.

This week repairs core functions, strings, collections, control flow, and small
reusable helpers through tests. It is a readiness bridge, not an answer-key
worksheet or a required detour for learners who are already ready for Module 1.

## Acceptance Checks

- [x] `README.md` frames the lesson as targeted Python repair connected to
  FinAgent intake, prompt, routing, retry, and data-shaping habits.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define type classification, safe conversion, profile/stat shaping,
  string formatting, prompt construction, truncation, chunking, config merging,
  grouping, routing, validation, memoization, retry, and counters.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates correctness, process, transfer, code quality, and
  verification.
- [x] No learner-facing solution file exists.

## Verification

```powershell
python -m pytest curriculum/main-track/00-python-foundations/week-01-python-essentials -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic

- Current capability: read diagnostic failures and identify a Python gap.
- New capability: implement small reusable Python behaviors used later by
  FinAgent.
- Failure mode: off-by-one, type conversion, grouping, formatting, retry, or
  state mistakes.
- FinAgent improvement: intake and data-shaping code becomes predictable.
- Explanation artifact: learner maps one repaired Python pattern to a later
  AI-system boundary.

## Scope Boundary

- Minimum path: complete the TODOs needed for the diagnostic repair lane.
- Optional enrichment: add one focused edge case after required behavior works.
- Advanced doorway: provider APIs, RAG, tools, agents, and deployment remain in
  later modules.
