# Curriculum Authoring Spec

## Scope

This spec governs learner-facing curriculum, supporting tests, hints, rubrics,
templates, and instructor reference notes.

The active product is Milestone 1: a 30-45 hour, fixture-first route to one
bounded AI application. It does not include a hosted learning platform,
production-readiness claim, or comprehensive AI syllabus.

## Source Hierarchy

1. `curriculum/LEARNER_JOURNEY_MAP.md` defines milestone outcomes.
2. `curriculum/main-track/milestone-1-45-hour-map.md` defines Milestone 1 order
   and budget.
3. `curriculum/main-track/milestones.md` defines capability gates.
4. `curriculum/main-track/scope-guards.md` decides core versus deferred work.
5. This file defines how curriculum changes are authored.

Folder presence, old plans, books, generated research, and framework popularity
do not override this hierarchy.

## Learner Loop

Every required lesson makes this sequence visible:

1. inspect the problem, contract, code, data, or test
2. predict behavior before execution
3. run the smallest relevant command
4. implement one coherent behavior
5. verify and classify the result
6. explain the decision and limitation
7. transfer the idea to the cumulative application

Reference behavior is available only after a serious attempt and recorded
failure.

## Lesson Contract

Each assignable lesson must state:

- prior capability
- new capability
- failure it teaches the learner to detect
- exact cumulative-product change
- explanation target
- minimum path and optional boundary
- estimated core time and explicit ceiling
- starting command and expected initial result
- required artifact and focused verification
- safety, privacy, or authority boundary when applicable
- deferred concepts

Use a realistic failure, worked trace, or small example before long theory.
Use a diagram or table only when it clarifies the next action. Optional
resources follow the core path and never substitute for the exercise.

## Learner-Written Code

- `workbench.py` is the learner-editable surface.
- Starters expose contracts and meaningful TODOs, not disguised solutions.
- Hints progress from question, to concept, to pseudocode, to narrow code shape.
- Learners must be able to explain submitted behavior and AI assistance.
- Full reference implementations stay outside learner-facing folders.

## Test Contract

Tests are teaching interfaces. They must:

- collect and import before learner implementation
- name the behavior or failure clearly
- cover a normal case, edge case, and relevant refusal or failure
- avoid network access on the required path
- use deterministic fixtures for probabilistic or external boundaries
- distinguish expected TODO failures from infrastructure defects
- leave a focused command in the lesson README

For each assignable scaffold, keep:

```text
.kiro/specs/curriculum-planning/implementation-notes/<path-slug>-reference.md
.kiro/specs/curriculum-planning/implementation-notes/<path-slug>-validation.md
```

The reference note describes intended behavior and edge cases. The validation
note records reproducible reviewer proof.

## AI-System Evidence Contract

Required evidence grows with the product:

| Boundary | Minimum proof |
| --- | --- |
| deterministic code | validated inputs, normal test, rejected-input test |
| model provider | fixture response, schema validation, malformed response, trace |
| evaluation | representative cases, deterministic checks, failure taxonomy |
| retrieval | provenance, ranking evidence, citation, abstention |
| tool | typed contract, least privilege, denied or malformed call |
| workflow | visible state, stop condition, bounded retry, human gate |
| service | validated request/response and real local HTTP request |
| operations | trace, versions, latency/cost note, repeatable local gate |
| completion | transfer modification, demo, limitations, defense |

Never merge evidence labels:

- **fixture**: deterministic local simulation
- **live provider**: real external model or service call
- **local integration**: real local process or HTTP boundary
- **hosted**: deployed and reached outside the local process
- **production**: operated under real users, reliability targets, and response

## Scope And Time Control

Milestone 1 has 40 planned hours and at most five recovery hours. Python
remediation is outside that clock.

A new core topic is accepted only if it:

- replaces existing scope
- improves the same cumulative product
- leaves assessable evidence
- fits the revised budget
- names its ceiling and later-milestone handoff

Optional enrichment begins only after required gates pass and is limited to one
short branch.

## File And Documentation Rules

- Learner content lives under `curriculum/`.
- Planning lives only under `.kiro/specs/curriculum-planning/`.
- Instructor implementation details live in `implementation-notes/`.
- Stable module paths remain until an explicit migration updates all references.
- Current documents describe current truth; Git history holds completed plans
  and old review logs.
- Do not keep pointer files, duplicate roadmaps, generated reports, private
  source inventories, or dead platform scaffolding in the committed surface.
- Prefer one maintained document over a summary that merely points to it.

## Acceptance Gate

Run from the repository root:

```powershell
python -m pytest --collect-only curriculum/main-track curriculum/extended-concepts curriculum/specializations -q
python scripts/validate_curriculum_references.py --strict --executable
python scripts/validate_curriculum_quality.py --strict
python -m compileall -q curriculum reference scripts
python -m ruff check curriculum reference scripts
```

Passing proves structural and fixture-backed reference health. It does not
prove learner completion, live-provider behavior, timing, hosted deployment,
or production readiness.
