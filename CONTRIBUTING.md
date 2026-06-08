# Contributing

This repo is a learner-facing curriculum first.

## Keep The Surface Clean

Do not commit:

- local agent or tool workspaces
- private books or generated research dumps
- platform prototypes that are not part of the active learner path
- patch dumps such as `chunk1.diff`
- real secrets or private API keys

## Lesson Contract

Each assignable lesson should include:

- `README.md`
- learner-editable `workbench.py` or clearly named learner file
- tests that collect cleanly
- `hints.md`
- `rubric.md`
- reviewer-only reference notes under `.kiro/specs/curriculum-planning/implementation-notes/`

## Naming

Use `workbench.py` for learner-editable code. Avoid learner-facing names such as
`solution.py`, `answer_key.py`, or `solution_template.py`.

## Before Opening A PR

Run:

```powershell
python -m pytest --collect-only curriculum -q
python scripts/validate_curriculum_references.py --strict
```

If you add or change learner-ready status, update `LEARNER_READY_MATRIX.md`.
