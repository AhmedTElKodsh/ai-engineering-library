# Validation: Module 2 Phase 6 Training Versus Inference

Scaffold: `curriculum/02-module-2-first-principles/week-06-backpropagation/workbench.py`

## Commands

```powershell
python -m pytest curriculum/02-module-2-first-principles/week-06-backpropagation --collect-only -q
python -m pytest curriculum/02-module-2-first-principles/week-06-backpropagation -q
```

## Expected Starter State

Collection should succeed. TODO failures should explain inference, loss, update, epoch, or adaptation behavior.

## Reviewer Checks

- Confirm tests distinguish inference from training.
- Confirm parameter updates are inspectable.
- Confirm adaptation recommendation avoids premature fine-tuning.
