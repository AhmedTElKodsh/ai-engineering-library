# Validation: Module 2 Phase 4 Transformer Block

Scaffold: `curriculum/main-track/extended-concepts/01-model-internals/week-01-tiny-transformer/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/extended-concepts/01-model-internals/week-01-tiny-transformer --collect-only -q
python -m pytest curriculum/main-track/extended-concepts/01-model-internals/week-01-tiny-transformer -q
```

## Expected Starter State

Collection should succeed. TODO failures should include direct primitive failures before whole-block behavior passes.

## Reviewer Checks

- Confirm tests directly cover `dot_product`, `softmax`, and `weighted_sum`.
- Confirm empty sequence behavior is specified.
- Confirm trace shape keys and attention weights are tested.
