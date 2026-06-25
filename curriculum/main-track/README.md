# Main Track: 30-Day Core

This is the active 30-day core path for Course 1: Junior AI Engineering With
Python. It replaces the archived 30-day overlay as the learner-facing route and
uses the archived plan only as pacing history. Use `30-day-map.md` for the
daily path, `milestones.md` for checkpoint gates, `scope-guards.md` for what to
defer, `../LEARNER_JOURNEY_MAP.md` for the capability ladder, and
`../../LEARNER_READY_MATRIX.md` for assignable status.

Run commands from the repository root unless a lesson says otherwise.

## 30-Day Contract

The main track is complete when a learner can show evidence that they can build,
test, evaluate, explain, and locally package a bounded AI engineering workflow.
It is not complete because every interesting AI topic has been covered.

Use a 5-7 focused-hour day when running the full-time path. If a learner has
less time, keep the same order and protect the milestone outputs instead of
adding more scope.

## Core Pacing

| Days | Core phase | Required outcome | Milestone |
| ---: | --- | --- | --- |
| 1-7 | Foundations, deterministic baseline, data quality | validated local project slice with tests, logs, and documented limits | Day 7 deterministic assistant |
| 8-14 | Provider boundary, prompts, embeddings, RAG, evals | cited Q&A behavior with abstention and failure evidence | Day 14 cited Q&A system |
| 15-21 | Typed tools, explicit workflow, verifier, safety | bounded workflow with traceable state and stop conditions | Day 21 bounded AI workflow |
| 22-28 | Service boundary, versioning, observability, local quality gate | production-shaped local app with demo and failure analysis | Day 28 production-shaped app |
| 29-30 | Portfolio package, defense, next backlog | reviewer-ready evidence, limitations, and continuation plan | Day 30 portfolio defense |

Task estimate rule: a single learner-editable function, test case, prompt
contract, workflow step, or documentation section should usually produce
evidence in 20-45 minutes. If it does not, reduce the slice before adding scope.

## Core Versus Delayed

| Label | Meaning | Belongs where |
| --- | --- | --- |
| Core | required to complete the 30-day transformation | `curriculum/main-track/` |
| Practice | daily build, test, trace, or explanation work | the matching day or module |
| Checkpoint | must pass before continuing | `milestones.md` and local rubrics |
| Stretch | optional only when the day's evidence is already done | local notes or backlog |
| Extended | useful after the 30-day core, but not required for it | `curriculum/extended-concepts/` |

## Learner Order

| Order | Module | Required scope | Verification |
| ---: | --- | --- | --- |
| 0 | `00-python-foundations` | Diagnostic, Python essentials, production Python, stock pipeline bridge | `python -m pytest --collect-only curriculum/main-track/00-python-foundations -q` |
| 1 | `01-module-1-whole-game` | First deterministic FinAgent slice, modification, local boundary | `python -m pytest --collect-only curriculum/main-track/01-module-1-whole-game -q` |
| 2 | `02-module-2-first-principles` | Tokenization, embeddings, attention, context windows, decoding, and model-choice intuition | `python -m pytest --collect-only curriculum/main-track/02-module-2-first-principles -q` |
| 3 | `03-module-3-mcp-integration` | Provider boundary, local tool contract, context tracing, security handoff | `python -m pytest --collect-only curriculum/main-track/03-module-3-mcp-integration -q` |
| Bridge | `../specializations/web-scraping` | Source inspection, fixture extraction, API-first collection, RAG-ready evidence | `python -m pytest --collect-only curriculum/specializations/web-scraping -q` |
| 4 | `04-module-4-agentic-workflows` | AI-ready data, cited RAG, explicit workflows, critique/retry review loops | `python -m pytest --collect-only curriculum/main-track/04-module-4-agentic-workflows -q` |
| 5 | `05-module-5-production` | Golden evals, CI gate, service boundary, monitoring, optimization, release evidence | `python -m pytest --collect-only curriculum/main-track/05-module-5-production -q` |
| 6 | `06-capstone-projects` | FinAgent kickoff, integration build, polish and defense; folder names keep legacy labels | `python -m pytest --collect-only curriculum/main-track/06-capstone-projects -q` |

## Extended Concepts

Some learner-ready labs are intentionally delayed so the required path stays
focused. Use `../extended-concepts/README.md` after the related main concept
works and the matching milestone evidence exists. The delayed material includes
tiny transformer internals, training-versus-inference math, framework state
machines, advanced orchestration, multi-agent boundaries, reproducible
packaging depth, and fine-tuning/model-adaptation depth.

## Evidence Outputs

Each module should leave a reviewer with:

- passing or intentionally failing TODO-driven tests that collect cleanly
- a short failure or trace note
- a portfolio artifact named in the lesson README
- a rubric-backed explanation of what changed and why

Behavior tests are expected to fail in starter state. Import errors, missing
fixtures, broken paths, and skipped learner imports are regressions.

## Maintainer Gates

```powershell
python -m pytest --collect-only curriculum/main-track -q
python -m pytest --collect-only curriculum/extended-concepts -q
python -m pytest --collect-only curriculum/specializations -q
python scripts/validate_curriculum_references.py --strict
python scripts/validate_curriculum_quality.py --strict
```
