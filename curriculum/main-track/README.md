# Main Track: Course 1

This is the canonical learner path for Course 1: Junior AI Engineering With
Python. Use `../LEARNER_JOURNEY_MAP.md` for the capability ladder and
`../../LEARNER_READY_MATRIX.md` for assignable status.

Run commands from the repository root unless a lesson says otherwise.

## Estimated Timeline

The main track is not tied to the June 14 launch calendar. Use these estimates
when assigning the full Course 1 path. The 30-day route may trace selected
modules faster, but the full track should preserve time for tests, reflection,
and portfolio evidence.

| Order | Module | Expected effort | Pacing note |
| ---: | --- | ---: | --- |
| 0 | `00-python-foundations` | 2-20 hours depending on diagnostic result | complete only the remediation needed |
| 1 | `01-module-1-whole-game` | 9-15 hours | 3 phases, about 3-5 hours each |
| 2 | `02-module-2-first-principles` | 16-24 required hours | 4 phases, about 4-6 hours each |
| 3 | `03-module-3-mcp-integration` | 16-24 hours | 4 phases, about 4-6 hours each |
| Bridge | `../specializations/web-scraping` | 8-14 hours | use only the labs needed for source-quality work |
| 4 | `04-module-4-agentic-workflows` | 20-30 hours | bridge plus 4 core phases |
| 5 | `05-module-5-production` | 20-30 required hours | 5 weeks, about 4-6 hours each |
| 6 | `06-capstone-projects` | 12-18 hours | 3 scaffold weeks, about 4-6 hours each |

Task estimate rule: a single learner-editable function, test case, prompt
contract, workflow step, or documentation section should usually produce
evidence in 20-45 minutes. If it does not, reduce the slice before adding scope.

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
focused. Use `../extended-concepts/README.md` after the related main concept is
working. The delayed material includes tiny transformer internals,
training-versus-inference math, framework state machines, advanced
orchestration, multi-agent boundaries, reproducible packaging depth, and
fine-tuning/model-adaptation depth.

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
python scripts/validate_curriculum_references.py --strict
python scripts/validate_curriculum_quality.py --strict
```
