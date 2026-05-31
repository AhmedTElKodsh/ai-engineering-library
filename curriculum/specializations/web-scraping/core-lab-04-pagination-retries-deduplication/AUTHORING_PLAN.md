# Authoring Plan: Core Lab 4

## Scope

Create a fixture-first lab for pagination, retry planning, rate-limit metadata, and deduplication.

## Acceptance Checks

- [x] `README.md` frames the lab as polite multi-page collection.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define expected pagination, extraction, dedupe, fetch-plan, and summary behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates correctness, reliability, politeness, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/specializations/web-scraping/core-lab-04-pagination-retries-deduplication/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.
