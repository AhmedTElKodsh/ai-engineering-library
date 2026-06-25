# Week 4: Reproducible Local Package

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | define local service inputs and outputs. |
| What new capability am I adding? | write reproducible package metadata, Dockerfile notes, and run checks. |
| What failure does this help me catch? | unclear clean-checkout commands and missing runtime requirements. |
| How does this improve FinAgent or a practical AI system? | makes FinAgent reviewable and runnable by another engineer. |
| What should I be able to explain afterward? | how packaging evidence differs from application behavior. |

## Before You Run

Predict what a reviewer needs before running a project: command, environment, tests, expected output, and known limits.

## Worked Trace

Read `tests/test_reproducible_package.py` before editing:

```text
build_run_manifest -> validate_manifest -> build_container_plan -> build_reviewer_runbook
```

This is packaging literacy, not a Docker deployment requirement.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k manifest -v` | explain every required manifest field |
| Container plan | `python -m pytest tests -k container -v` | explain why non-root execution matters |
| Runbook | `python -m pytest tests -k runbook -v` | show the reviewer commands |
| Minimum complete | `python -m pytest tests -v` | describe how a clean checkout would be verified |

## Smallest Change

Do not add Dockerfiles or deployment files. This lab produces a package plan and review runbook only.

Use `hints.md` after naming the missing field. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Manifest or runbook field fixed:
Reproducibility risk handled:
Command a reviewer should run:
AI assistance used:
```

