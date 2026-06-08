# Reviewer Reference Validation

This folder holds instructor-only reference behavior for learner scaffolds.

Use this pattern for each assignable workbench:

```text
<curriculum-path-slug>-reference.md
<curriculum-path-slug>-validation.md
```

Example:

```text
00-python-foundations-week-00-diagnostic-reference.md
00-python-foundations-week-00-diagnostic-validation.md
```

Reference notes should describe intended behavior, edge cases, and why the
visible tests match the lesson goal. Validation notes should record the commands
or reviewer checks that prove the scaffold is solvable.

Inventory current coverage:

```powershell
python scripts/validate_curriculum_references.py
```

Use strict mode when reference coverage becomes a required gate:

```powershell
python scripts/validate_curriculum_references.py --strict
```
