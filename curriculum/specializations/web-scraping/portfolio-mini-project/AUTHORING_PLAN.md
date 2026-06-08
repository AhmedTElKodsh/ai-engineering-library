# Authoring Plan: Web Data Portfolio Mini-Project

## Scope

Create a fixture-first portfolio project that composes the six web data core
labs into one reviewable artifact: approved sources, collected records, cleaned
records, a quality report, RAG-ready chunks, and a short ethics reflection.

## Acceptance Checks

- [x] `README.md` frames the project as synthesis after Core Labs 1-6.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define source approval, fixture collection, normalization, quality reporting, and portfolio packaging.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates source approval, provenance, quality, packaging, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/specializations/web-scraping/portfolio-mini-project/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: inspect, collect, normalize, review, and package bounded web data from the core labs.
- New capability added by this lesson: compose those skills into a portfolio artifact a reviewer can inspect end to end.
- Failure mode the learner must reproduce, inspect, or prevent: unapproved source use, missing provenance, stale data, and uncited RAG chunks.
- FinAgent or practical AI-system improvement: produce safe, cited market-context evidence for later retrieval and capstone workflows.
- Explanation artifact the learner should leave with: a short ethics and production-failure reflection.

## Scope Boundary Enhancement

- Minimum required path: approved fixture sources, normalized records, quality report, package manifest, and reflection.
- Optional enrichment only after the minimum path works: add another fixture source or one extra quality rule.
- Advanced doorway, named briefly but not required: scheduled crawling, browser automation, and legal review workflow.

## Evidence Portfolio Enhancement

- Technical evidence: tests, fixture records, cleaned records, manifest.
- Failure evidence: blocked source or failed-quality record.
- Explanation evidence: quality report and reflection.
- Transfer evidence: how the package can feed RAG or FinAgent without overclaiming freshness.
