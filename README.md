# AI Engineering Library

A text-first, test-guided curriculum for learners who have working Python
fundamentals and want to build reliable AI applications.

The active route is **Milestone 1: AI Application Implementer**. It offers a
30-hour fast path or 40-hour full path, plus at most five recovery hours. A
Python-ready learner builds, tests, evaluates, exposes, modifies, and defends
one bounded, source-grounded application. This is the first of three capability
milestones, not a mastery or production readiness claim.

## Start

One-time PowerShell setup:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

1. Open `START_HERE.md`.
2. Run the placement sample before starting the clock.
3. Follow `curriculum/main-track/milestone-1-45-hour-map.md`.
4. Keep the cumulative implementation in
   `curriculum/main-track/06-capstone-projects/week-03-integration-build/`.

Use `START_HERE_2_HOURS_PER_DAY.md` for the same route in short sessions.

## Sources Of Truth

| Question | File |
| --- | --- |
| What should the learner do next? | `START_HERE.md` |
| What fits inside 30-45 hours? | `curriculum/main-track/milestone-1-45-hour-map.md` |
| What proves each capability? | `curriculum/main-track/milestones.md` |
| What is deferred? | `curriculum/main-track/scope-guards.md` |
| What comes after Milestone 1? | `curriculum/LEARNER_JOURNEY_MAP.md` |
| What does the repository currently prove? | `LEARNER_READY_MATRIX.md` |
| What governs curriculum changes? | `.kiro/specs/curriculum-planning/` |

Supporting learner policies:

- `HOW_TO_USE_AI_ASSISTANTS.md`
- `REFERENCE_AFTER_EFFORT.md`
- `FINANCE_SAFETY.md`
- `TROUBLESHOOTING.md`

## Repository Shape

```text
.
|-- .kiro/specs/curriculum-planning/   # planning and reviewer evidence
|-- curriculum/
|   |-- main-track/                    # Milestone 1 lesson library and route
|   |-- extended-concepts/             # later-milestone depth
|   |-- specializations/               # optional post-core branches
|   |-- resources/
|   `-- templates/
|-- assets/                             # shared lesson presentation
|-- lessons/                            # guided companion lessons
|-- learning-records/                   # learner contract and evidence notes
|-- reference/                         # gated reference material
|-- scripts/                           # curriculum validators
|-- START_HERE.md
|-- START_HERE_2_HOURS_PER_DAY.md
`-- LEARNER_READY_MATRIX.md
```

Local books, research corpora, agent workspaces, generated output, caches, and
historical archives are not part of the committed curriculum surface.

## Curriculum Contract

- Build one cumulative product; do not substitute disconnected mini-projects.
- Use the loop: inspect, predict, run, implement, verify, explain, transfer.
- Learners write the implementation. AI supplies bounded hints and review.
- Introduce evaluation with the first probabilistic boundary.
- Preserve provenance before retrieval; prove citations and abstention before
  adding tool authority.
- Prove one explicit bounded workflow before agent autonomy.
- Label fixture, live-provider, local integration, hosted, and production
  evidence separately.
- Add no Milestone 1 topic without removing equal scope and naming the gate it
  improves.

`workbench.py` is learner-editable. Instructor reference behavior belongs under
`.kiro/specs/curriculum-planning/implementation-notes/` and is opened only
after a serious learner attempt.

## Verification

Run from the repository root:

```powershell
.\.venv\Scripts\python.exe -m pytest --collect-only curriculum/main-track curriculum/extended-concepts curriculum/specializations -q
.\.venv\Scripts\python.exe scripts/validate_curriculum_references.py --strict --executable
.\.venv\Scripts\python.exe scripts/validate_curriculum_quality.py --strict
.\.venv\Scripts\python.exe -m compileall -q curriculum reference scripts
.\.venv\Scripts\python.exe -m ruff check curriculum reference scripts
```

Expected TODO behavior failures are part of learner scaffolds. Import errors,
missing fixtures, broken paths, or unexplained collection failures are defects.

The reference gate proves one fixture-backed cumulative implementation,
including a loopback HTTP test. It does not prove live-provider behavior,
learner independence, hosted deployment, or production operation.
