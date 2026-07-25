# Milestone 1: AI Application Implementer

This is the route index for the first AI Engineering milestone. Folder names
such as `week-*` are legacy organization labels, not instructions to complete
every folder.

## Source Of Truth

| Question | Use this file |
| --- | --- |
| What do I run first? | `../../START_HERE.md` |
| What is the capability order and hour budget? | `milestone-1-45-hour-map.md` |
| What command runs the current checkpoint or support slice? | `06-capstone-projects/week-03-integration-build/README.md` |
| What proves completion? | `milestones.md` plus the map's stop conditions |
| What is intentionally deferred? | `scope-guards.md` |
| How do I spread the route across sessions? | `../../START_HERE_2_HOURS_PER_DAY.md` |
| What comes after Milestone 1? | `../LEARNER_JOURNEY_MAP.md` |
| What does the repository currently prove? | `../../LEARNER_READY_MATRIX.md` |

Run commands from the repository root unless a lesson explicitly says
otherwise.

## Route Contract

Module 0 placement happens before the clock. The route then spends 30 hours on
the guided path or 40 hours on the full path, with at most five additional
recovery hours.

Every required block improves
`06-capstone-projects/week-03-integration-build`. Open it at Block 1 and keep
the same application and evidence record through Block 9. Supporting labs are
time-capped repairs selected by that scaffold, not a second course sequence.

Milestone 1 ends at **AI Application Implementer** readiness: the learner can
build, test, evaluate, expose, modify, and defend one bounded source-grounded
application. Completion is controlled by the map's stop conditions and the
cumulative scaffold's required evidence, transfer task, and exit defense.

It does not prove live-provider behavior, hosted deployment, production
operations, advanced systems design, or mastery. Folder names and unused TODOs
do not expand that claim. Follow `../../REFERENCE_AFTER_EFFORT.md` before
opening instructor implementation details.

## Maintainer Gates

```powershell
python -m pytest --collect-only curriculum/main-track -q
python scripts/validate_curriculum_references.py --strict --executable
python scripts/validate_curriculum_quality.py --strict
```

These commands prove structural health, reviewer-note coverage, and one
fixture-backed executable reference. They do not prove learner completion,
live-provider behavior, hosted deployment, or production readiness.
