# Authoring Plan: Core Lab 6

## Scope

Create a fixture-first lab for converting reviewed web records into citation-ready chunks, refusal rules, and a package manifest.

## Acceptance Checks

- [x] `README.md` frames RAG packaging as the handoff from web data acquisition to Module 4.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define reviewed-record loading, chunk text, packaging, refusal rules, and manifest behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates scope, citation metadata, chunking, refusal rules, manifest quality, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-06-rag-ready-packaging/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.
