# Authoring Plan: Module 0 Week 2

## Scope

Create the optional Python-for-production repair lab.

This week practices error handling, context managers, classes, magic methods,
comprehensions, generators, and state updates only when a learner needs those
habits for later AI engineering work.

## Acceptance Checks

- [x] `README.md` frames Week 2 as optional repair lanes, not a mandatory wall
  before Module 1.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define reliability, object, streaming, and state-update behaviors.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates reliability, clarity, transfer, code quality, and
  verification.
- [x] No learner-facing solution file exists.

## Verification

```powershell
python -m pytest curriculum/main-track/00-python-foundations/week-02-production-python -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic

- Current capability: write small tested Python functions from Week 1.
- New capability: handle failures, resources, objects, streaming, and state more
  safely.
- Failure mode: resource leaks, unclear exceptions, mutation bugs, brittle state,
  or hidden partial failures.
- FinAgent improvement: future clients, tools, pipelines, and traces have more
  reliable Python underneath.
- Explanation artifact: learner explains why one production pattern is safer
  than the naive version.

## Scope Boundary

- Minimum path: complete the repair lane that matches the learner's actual
  friction.
- Optional enrichment: add one edge case to the selected lane.
- Advanced doorway: async clients, web frameworks, cloud resources, and live API
  calls stay out of this repair lab.
