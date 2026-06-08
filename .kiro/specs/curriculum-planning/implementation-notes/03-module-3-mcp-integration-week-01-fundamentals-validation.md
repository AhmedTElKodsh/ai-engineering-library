# Validation: Module 3 Phase 1 LLM Provider Boundary

Scaffold: `curriculum/03-module-3-mcp-integration/week-01-fundamentals/workbench.py`

## Commands

```powershell
python -m pytest curriculum/03-module-3-mcp-integration/week-01-fundamentals --collect-only -q
python -m pytest curriculum/03-module-3-mcp-integration/week-01-fundamentals -q
```

## Expected Starter State

Collection should succeed. Assertion messages should teach the boundary concept.

## Reviewer Checks

- Confirm the fake provider is sufficient for all required tests.
- Confirm trace tests cover tokens and cost.
- Confirm validation happens before provider calls.
