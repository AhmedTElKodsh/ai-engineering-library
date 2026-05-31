# Authoring Plan: Module 4 Phase 3

## Scope

Create a plain-Python explicit workflow pattern lab after citation/abstention RAG and before framework-managed state.

## Acceptance Checks

- [x] `README.md` frames prompt chaining, routing, gated tool use, and trace summaries as explicit workflows.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define fixture loading, routing, step planning, deterministic tool use, gate decisions, full workflow trace, and trace summary behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates routing, chaining, tool boundaries, gates, traceability, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-03-core-patterns/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.
