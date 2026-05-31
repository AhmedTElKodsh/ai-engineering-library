# Authoring Plan: Core Lab 5

## Scope

Create a fixture-first lab for provenance tables, dataset quality checks, and a RAG-readiness gate.

## Acceptance Checks

- [x] `README.md` frames provenance and quality as a pre-RAG review gate.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define fixture loading, normalization, provenance table output, issue detection, and report behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates provenance, quality checks, reviewability, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-05-provenance-data-quality/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.
