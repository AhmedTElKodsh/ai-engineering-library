# AI Engineering Library

Text-first, test-guided curriculum for junior AI engineers with intermediate Python experience.

The active course is **Course 1: Junior AI Engineering With Python**. It teaches learners to build, test, evaluate, and explain practical LLM, RAG, tool, agent, and production workflows through small projects and a final educational FinAgent capstone.

## Active Structure

```text
.
|-- .kiro/specs/
|   |-- README.md
|   `-- curriculum-planning/
|-- curriculum/
|   |-- 00-python-foundations/
|   |-- 01-module-1-whole-game/
|   |-- 02-module-2-first-principles/
|   |-- 03-module-3-mcp-integration/
|   |-- 04-module-4-agentic-workflows/
|   |-- 05-module-5-production/
|   |-- 06-capstone-projects/
|   |-- specializations/web-scraping/
|   |-- resources/
|   |-- templates/
|   |-- AI_AUTHORING_GUIDE.md
|   |-- ROADMAP.md
|   `-- SPEC.md
|-- conftest.py
|-- requirements.txt
`-- README.md
```

## Canonical Planning

The maintained planning home is:

- `.kiro/specs/curriculum-planning/README.md`
- `.kiro/specs/curriculum-planning/ROADMAP.md`
- `.kiro/specs/curriculum-planning/SPEC.md`
- `.kiro/specs/curriculum-planning/CURRICULUM_REVIEW.md`

Large source inputs, generated research dumps, local books, and agent scratch folders stay out of the committed project surface. Do not recreate competing root-level spec folders.

## Curriculum Contract

The learner-facing course is:

- text-first and project-based
- learner-written, not solution-dump driven
- test-guided, with expected TODO failures in starter workbenches
- built around stable module folder paths
- centered on FinAgent as the recurring product spine and final capstone

Use `workbench.py` for learner-editable files. Keep reviewer-only reference behavior under `.kiro/specs/curriculum-planning/implementation-notes/`.

## Learner-Ready Status

| Area | Current learner-ready surface | Status | Verification |
| --- | --- | --- | --- |
| Web Data Acquisition bridge | Core Lab 1 HTTP inspection; Core Lab 2 fixture-first static extraction; Core Lab 3 API-first collection | Scaffolded with TODO workbenches, tests, hints, rubrics, and authoring plans | `python -m pytest curriculum/specializations/web-scraping/core-lab-01-http-inspection/tests curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/tests curriculum/specializations/web-scraping/core-lab-03-api-first-collection/tests --collect-only -q` |
| Module 4 | Phase 1 AI-ready ingestion/chunking; Phase 2 citation/abstention RAG | Scaffolded with TODO workbenches, tests, hints, and rubrics | `python -m pytest curriculum/04-module-4-agentic-workflows/week-01-basic-rag/tests curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/tests --collect-only -q` |
| Module 5 | Week 1 golden eval scaffold | Scaffolded with TODO workbench, tests, hints, and rubric | `python -m pytest curriculum/05-module-5-production/week-01-golden-datasets/tests --collect-only -q` |
| Module 6 | Week 1 FinAgent capstone kickoff | Scaffolded with scope, eval harness, and portfolio evidence ledger TODOs | `python -m pytest curriculum/06-capstone-projects/week-01-build/tests --collect-only -q` |

## Verification

For starter curriculum files, clean collection/import health is the first regression gate. Many behavior tests are expected to fail until learners complete TODOs.

Useful commands:

```powershell
python -m pytest --collect-only curriculum/00-python-foundations curriculum/01-module-1-whole-game curriculum/02-module-2-first-principles -q
python -m pytest --collect-only curriculum/02-module-2-first-principles -q
```

Use this when plugin noise makes pytest collection noisy:

```powershell
$env:PYTEST_DISABLE_PLUGIN_AUTOLOAD='1'
```

## Non-Goals

This repo no longer treats the hosted learning platform as the active MVP. React apps, backend microservices, Kubernetes, object storage, search clusters, dashboards, and hosted code playgrounds are parked planning ideas unless a future lesson explicitly teaches them.

Private books, generated corpora, local exports, and tool scratch folders should stay out of the committed project surface.
