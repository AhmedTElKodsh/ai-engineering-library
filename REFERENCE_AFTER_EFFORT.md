# Reference After Effort

Reference material belongs after a real attempt, not before it.

## Learner Rule

Open reviewer/reference notes only after:

1. reading the lesson README
2. inspecting the tests
3. making an implementation attempt
4. running pytest
5. writing down what failed

## Instructor Rule

Reviewer-only reference behavior belongs under:

```text
.kiro/specs/curriculum-planning/implementation-notes/
```

Use the naming pattern:

```text
<curriculum-path-slug>-reference.md
<curriculum-path-slug>-validation.md
```

Examples:

```text
02-module-2-first-principles-week-04-transformer-reference.md
02-module-2-first-principles-week-04-transformer-validation.md
```

The slug is the learner scaffold folder path under `curriculum/`, joined with
hyphens. This is the convention enforced by
`scripts/validate_curriculum_references.py` and
`scripts/validate_curriculum_quality.py`.

The reference note should explain intended behavior, hidden edge cases, and how
the visible tests map to the lesson goal. It should not be linked from the local
learner README before the learner has completed the exercise.
