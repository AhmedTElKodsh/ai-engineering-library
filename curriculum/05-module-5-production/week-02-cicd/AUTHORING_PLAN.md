# Authoring Plan: Module 5 Week 2

## Scope

Create a CI-style regression gate lab over the Week 1 golden eval scaffold.

## Acceptance Checks

- [x] `README.md` frames CI-style gating as local, rerunnable release evidence.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define eval-run loading, version-note loading, pass-rate calculation, gate decisions, command checklist, and gate report behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates eval evidence, versioning, gate behavior, reproducibility, reviewability, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/05-module-5-production/week-02-cicd/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.
