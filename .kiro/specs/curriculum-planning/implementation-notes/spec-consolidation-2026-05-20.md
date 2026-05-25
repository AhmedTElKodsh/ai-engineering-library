# Spec Consolidation Map - 2026-05-20

## Purpose

This note records the cleanup decision for `.kiro/specs`. The active planning home is `.kiro/specs/curriculum-planning/`. Old root-level spec folders are preserved as source evidence under `source-material/legacy-specs/`; they are not active roadmaps.

## Active Decisions

- Course 1 remains **Junior AI Engineering With Python**.
- FinAgent remains the **portfolio capstone spine**, scoped as educational analysis with source grounding and no investment advice.
- The broader book/corpus roadmap remains useful, but Course 1 must stay bounded.
- **Web Data Acquisition for AI Systems** is now mandatory as a bounded mini-course, not an optional footnote.
- The stable learner folder for that mini-course is `curriculum/specializations/web-scraping`.
- Advanced scraping, browser automation, sessions, scheduled crawling, and agentic research remain extension work unless promoted by a later course decision.

## Source Disposition

| Source folder | New location | Active use | Deferred or superseded |
| --- | --- | --- | --- |
| `ai-engineering-curriculum-implementation/` | `curriculum-planning/source-material/legacy-specs/ai-engineering-curriculum-implementation/` | diagnostic entry points, module requirements, FinAgent continuity, portfolio and review ideas | hosted platform, oversized bootcamp/platform scope |
| `ai-engineering-curriculum-implementation/capstone-financial/` | `curriculum-planning/source-material/legacy-specs/ai-engineering-curriculum-implementation/capstone-financial/` | FinAgent capstone mapping, financial data/tool/RAG/agent evidence, portfolio assessment | fintech SaaS, trading/advice framing |
| `teaching-methodology-evaluation/` | `curriculum-planning/source-material/legacy-specs/teaching-methodology-evaluation/` | code comprehension, whole-part-whole, Socratic discovery, progress visibility, interview-prep and review evidence | standalone evaluator tool as active curriculum scope |
| `capstone-pedagogical-enhancement/` | `curriculum-planning/source-material/legacy-specs/capstone-pedagogical-enhancement/` | read/explain/modify/create, explain-your-solution, professional workflow, capstone rubrics | separate capstone enhancement project |
| `web-scraping-curriculum/` | `curriculum-planning/source-material/legacy-specs/web-scraping-curriculum/` | ethical scraping, fixture-first tests, progressive projects, TODO boilerplate, measurable success criteria | web scraping as detached optional-only curriculum |

## Web Data Acquisition Gate

The required mini-course must prove:

- fixture-first extraction before live requests
- API-first collection when a stable public endpoint exists
- robots.txt, terms, copyright, privacy, PII, attribution, and rate-limit review
- retries, backoff, timeouts, pagination, deduplication, and URL normalization
- tests for missing fields, malformed HTML, broken selectors, duplicate pages, stale data, and failed requests
- raw, cleaned, processed, and RAG-ready data boundaries
- source URL, timestamp, heading, and provenance metadata
- RAG-ready chunk output with citation metadata
- a portfolio mini-project with code, tests, dataset samples, data-quality report, provenance table, and reflection

## Cleanup Rule

Do not recreate root-level spec folders under `.kiro/specs`. New planning decisions should update `ROADMAP.md`, `SPEC.md`, or a focused note under `curriculum-planning/docs/` or `curriculum-planning/implementation-notes/`.
