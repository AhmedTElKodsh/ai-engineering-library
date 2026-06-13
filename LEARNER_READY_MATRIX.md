# Learner-Ready Matrix

This file is the source of truth for what a learner can be assigned now. Module
READMEs may summarize it, but status changes should be made here first.

Status meanings:

- `assignable`: learner-facing README, workbench, tests, hints, and rubric exist.
- `scaffolded`: learner files exist, but the slice is optional, advanced, or not part of the required core path.
- `planned`: not part of the current assignable path.
- `instructor-only`: planning, source material, or reviewer material.

Reference validation meanings:

- `pending`: reviewer-only intended behavior is not yet documented for every scaffold.
- `protocol`: the validation script can inventory the expected reference files.
- `done`: reviewer-only reference behavior exists and has been checked.

| Module | Week/Lab | Status | Has README | Has workbench | Has tests | Has hints | Has rubric | Reference validation | Assignable now? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Module 0 | Week 0 diagnostic | assignable | yes | diagnostic workbench | yes | yes | yes | done | yes |
| Module 0 | Weeks 1-3 Python foundations | assignable | yes | yes | yes | yes | yes | done | yes |
| Module 1 | Weeks 1-3 whole-game FinAgent | assignable | yes | yes | yes | yes | yes | done | yes |
| Module 2 | Required phases: tokenization, embeddings, attention, context/decoding | assignable | yes | yes | yes | yes | yes | done | yes |
| Module 3 | Phases 1-4 LLM APIs, PromptOps, tools, and MCP boundaries | assignable | yes | yes | yes | yes | yes | done | yes |
| Web data bridge | Core Labs 1-6 | assignable | yes | yes | yes | yes | yes | done | yes |
| Web data bridge | Portfolio mini-project | assignable | yes | yes | yes | yes | yes | done | yes |
| Module 4 | Required bridge plus Phases 1-4 AI-ready data, RAG, and explicit workflows | assignable | yes | yes | yes | yes | yes | done | yes |
| Module 5 | Required weeks: evals, CI gate, service boundary, monitoring, optimization | assignable | yes | yes | yes | yes | yes | done | yes |
| Module 6 | Capstone order: kickoff, integration build, then polish evidence; folder names are legacy labels | assignable | yes | yes | yes | yes | yes | done | yes |
| Extended concepts | Model internals, advanced agentic systems, reproducible packaging, model adaptation | scaffolded | yes | yes | yes | yes | yes | done | optional |
| Route | 30-day project launch overlay, timetable, and productivity guide | assignable | yes | no route guide only | no dedicated tests | no dedicated hints | milestone rubric | protocol | yes |
| Planning | `.kiro/specs/curriculum-planning/` | instructor-only | yes | no | no | no | no | protocol | no |

## Validation Commands

Collection/import health:

```powershell
python -m pytest --collect-only curriculum -q
```

Strict reference gate:

```powershell
python scripts/validate_curriculum_references.py --strict
```

Current validation state:

```text
Scaffolds found: 42
Reference-complete: 42
Reference-pending: 0
```

The strict gate is now the reviewer reference command for PRs and CI.
