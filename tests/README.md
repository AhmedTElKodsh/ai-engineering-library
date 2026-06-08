# Legacy Evaluator Tests

The files in this folder belong to the older `teaching_methodology_evaluator`
prototype. That package is not part of the active Course 1 curriculum surface.

The active test gate is:

```powershell
python -m pytest --collect-only curriculum -q
python scripts/validate_curriculum_references.py --strict
```

Keep these tests skipped unless the evaluator package is restored as an active,
documented project.
