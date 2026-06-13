# AI Engineering Library

Text-first, test-guided curriculum for junior AI engineers with intermediate Python experience.

The active course is **Course 1: Junior AI Engineering With Python**. It teaches learners to build, test, evaluate, and explain practical LLM, RAG, tool, agent, and production workflows through small projects and a final educational FinAgent capstone.

## Start Here

- `START_HERE.md` is the learner front door.
- `START_HERE_2_HOURS_PER_DAY.md` is the busy-learner route.
- `START_HERE_30_DAY_PROJECT_LAUNCH.md` is the full-time accelerated project
  launch overlay. It is not the canonical complete curriculum.
- `LEARNER_READY_MATRIX.md` is the source of truth for assignable lessons.
- `TROUBLESHOOTING.md` covers common local setup and pytest issues.
- `HOW_TO_USE_AI_ASSISTANTS.md` explains acceptable AI help.
- `FINANCE_SAFETY.md` defines the FinAgent educational boundary.
- `curriculum/resources/diagrams/course-visual-map.md` provides standard module diagrams.

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
|   |-- 30-day-project-launch/
|   |   |-- README.md
|   |   |-- daily-plan.md
|   |   |-- project-backlog-template.md
|   |   |-- no-vibe-coding-protocol.md
|   |   |-- milestone-rubric.md
|   |   |-- continuation-roadmap.md
|   |   |-- timetable.md
|   |   |-- productivity-tools.md
|   |   |-- planning-review.md
|   |   `-- templates/
|   |-- specializations/web-scraping/
|   |-- resources/
|   |-- templates/
|   |-- AI_AUTHORING_GUIDE.md
|   |-- LEARNER_JOURNEY_MAP.md
|   |-- ROADMAP.md
|   `-- SPEC.md
|-- conftest.py
|-- CONTRIBUTING.md
|-- FINANCE_SAFETY.md
|-- HOW_TO_USE_AI_ASSISTANTS.md
|-- LEARNER_READY_MATRIX.md
|-- LICENSE
|-- requirements.txt
|-- START_HERE.md
|-- START_HERE_30_DAY_PROJECT_LAUNCH.md
|-- START_HERE_2_HOURS_PER_DAY.md
|-- TROUBLESHOOTING.md
`-- README.md
```

## Canonical Planning

The maintained planning home is:

- `.kiro/specs/curriculum-planning/README.md`
- `.kiro/specs/curriculum-planning/ROADMAP.md`
- `.kiro/specs/curriculum-planning/SPEC.md`
- `.kiro/specs/curriculum-planning/CURRICULUM_REVIEW.md`
- `curriculum/LEARNER_JOURNEY_MAP.md`

Large source inputs, generated research dumps, local books, and agent scratch folders stay out of the committed project surface. Do not recreate competing root-level spec folders.

## Curriculum Contract

The learner-facing course is:

- text-first and project-based
- learner-written, not solution-dump driven
- test-guided, with expected TODO failures in learner workbenches
- built around stable module folder paths
- centered on FinAgent as the recurring product spine and final capstone

The 30-day project launch route is an accelerated overlay for full-time
learners who need to start project work quickly. It points into the existing
modules and produces portfolio evidence, but Course 1 remains the complete path.

Every module and week should make the learner logic visible:

1. what the learner can already do
2. what new capability is being added
3. what failure this catches
4. how it improves FinAgent or a practical AI system
5. what the learner should be able to explain afterward

Advanced topics are treated as doorways, not hidden requirements. Course 1
builds the minimum reliable foundation for later deep dives into ML/DL,
fine-tuning, GraphRAG, multimodal systems, advanced agents, and full LLMOps.

Use `workbench.py` for learner-editable files. Keep reviewer-only reference behavior under `.kiro/specs/curriculum-planning/implementation-notes/`.

## Learner-Ready Status

Use `LEARNER_READY_MATRIX.md` as the single source of truth. The current
assignable Course 1 surface includes Module 0, Module 1, Module 2, Module 3,
the web-data bridge plus portfolio mini-project, Module 4, Module 5, and the
Module 6 FinAgent capstone scaffolds through the runnable local integration
milestone.

Reviewer-only reference validation is tracked separately from learner scaffold
readiness. Use the strict gate for PRs and CI:

```powershell
python scripts/validate_curriculum_references.py --strict
python scripts/validate_curriculum_quality.py --strict
```

Large cleanup work should follow `MIGRATION_COMMIT_PLAN.md` so archive
de-indexing, planning convention changes, CI gates, and learner-facing pedagogy
updates remain separately reviewable.

## Verification

For learner curriculum files, clean collection/import health is the first regression gate. Many behavior tests are expected to fail until learners complete TODOs.

Useful commands:

```powershell
python -m pytest --collect-only curriculum/00-python-foundations curriculum/01-module-1-whole-game curriculum/02-module-2-first-principles -q
python -m pytest --collect-only curriculum/02-module-2-first-principles -q
python scripts/validate_curriculum_quality.py --strict
```

Use this when plugin noise makes pytest collection noisy:

```powershell
$env:PYTEST_DISABLE_PLUGIN_AUTOLOAD='1'
```

This repo intentionally has no active root JavaScript platform tooling. If a
future lesson needs frontend, backend, search, or deployment infrastructure, it
should introduce that tooling inside the bounded lesson path.

Legacy root tests for the old `teaching_methodology_evaluator` prototype are
skipped unless that package is restored as an active project. The active test
surface is `curriculum/`.

## Non-Goals

This repo no longer treats the hosted learning platform as the active MVP. React apps, backend microservices, Kubernetes, object storage, search clusters, dashboards, and hosted code playgrounds are parked planning ideas unless a future lesson explicitly teaches them.

Private books, generated corpora, local exports, and tool scratch folders should stay out of the committed project surface.
