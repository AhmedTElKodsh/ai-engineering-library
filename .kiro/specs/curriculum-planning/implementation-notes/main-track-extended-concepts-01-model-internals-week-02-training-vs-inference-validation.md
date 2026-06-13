# Validation: Module 2 Phase 6 Training Versus Inference

Scaffold: `curriculum/main-track/extended-concepts/01-model-internals/week-02-training-vs-inference/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/extended-concepts/01-model-internals/week-02-training-vs-inference --collect-only -q
python -m pytest curriculum/main-track/extended-concepts/01-model-internals/week-02-training-vs-inference -q
```

## Expected Starter State

Collection should succeed. TODO failures should explain inference, loss, update, epoch, or adaptation behavior.

## Reviewer Checks

- Confirm tests distinguish inference from training.
- Confirm parameter updates are inspectable.
- Confirm adaptation recommendation avoids premature fine-tuning.
