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
## Learner Logic Enhancement

- Current capability the learner brings into this lesson: fixture-first collection, API-first records, pagination, retries, and deduplication from the earlier web-data labs.
- New capability added by this lesson: turn collected records into reviewable provenance rows and a data-quality report before any RAG handoff.
- Failure mode the learner must reproduce, inspect, or prevent: duplicate, stale, missing-provenance, failed-request, or weak-summary records enter retrieval as if they were trustworthy evidence.
- FinAgent or practical AI-system improvement: FinAgent receives source records with review fields and a clear ready/not-ready gate before cited answer generation.
- Explanation artifact the learner should leave with: a short quality report naming record count, issue count, issue types, reviewed URLs, and whether the dataset is ready for RAG.

## Scope Boundary Enhancement

- Minimum required path: load fixture records, normalize provenance fields, create a provenance table, detect duplicate/stale/missing/weak records, and summarize a RAG-readiness report.
- Optional enrichment only after the minimum path works: add one extra issue type for blocked access, selector drift, missing timestamp, permission mismatch, or malformed source URL.
- Advanced doorway, named briefly but not required: live crawling, scheduled refresh, legal review workflow, monitoring dashboards, and production data catalogs belong to later specialization depth.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for fixture loading, normalized source records, provenance table rows, issue detection, and quality report output.
- Failure evidence: at least one duplicate, stale, missing-provenance, or weak-summary record blocks RAG readiness.
- Explanation evidence: learner note explains why provenance is required before source-grounded generation.
- Transfer evidence: FinAgent callback showing how a market-context record becomes either approved evidence or a blocked source.

## Source Evidence Enhancement

Use `../../../04-module-4-agentic-workflows/RAG_CITATION_ABSTENTION_CHECKLIST.md` before changing this lesson.

- B02 `Big Book of Data Engineering` and B12 `Designing Machine Learning Systems` provide indexed support for data quality, provenance, and reviewable data pipelines.
- B09 `Hands-On Large Language Models` and B07 `RAG with Python Cookbook` provide indexed support for retrieval metadata and RAG packaging basics.
- Local PDF `Principles of Building AI Agents`, p.88 and p.92-93 for chunking, embedding, metadata, indexing, querying, and reranking as RAG pipeline decisions.
- Local PDF `Hands-On RAG for Production`, p.12-14 and p.41-43 for separated ingest/query flows and retrieval failure categories.
- Local PDF `Hands-On RAG for Production`, p.47-50 and p.55 for access/privacy, PII handling, audit assumptions, and prompt-injection risk in production RAG data.
- Assessment conversion rule: each source insight must become a provenance field, quality issue, readiness gate, reviewed URL, blocked-source reason, or learner explanation prompt.
