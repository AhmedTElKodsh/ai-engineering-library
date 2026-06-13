# Validation: Module 2 Phase 2 Embeddings

Scaffold: `curriculum/main-track/02-module-2-first-principles/week-02-embeddings/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/02-module-2-first-principles/week-02-embeddings --collect-only -q
python -m pytest curriculum/main-track/02-module-2-first-principles/week-02-embeddings -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to vector-search primitives.

## Reviewer Checks

- Confirm direct primitive tests exist for vector math.
- Confirm search tests include relevance, tie, and no-match cases.
- Confirm output keeps source grounding.
