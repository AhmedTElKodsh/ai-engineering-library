# Validation: Module 3 Phase 3 Structured Context And Trace

Scaffold: `curriculum/03-module-3-mcp-integration/week-03-context-engineering/workbench.py`

## Commands

```powershell
python -m pytest curriculum/03-module-3-mcp-integration/week-03-context-engineering --collect-only -q
python -m pytest curriculum/03-module-3-mcp-integration/week-03-context-engineering -q
```

## Expected Starter State

Collection should succeed. TODO failures should expose context validation, sanitization, structured answer, or trace behavior.

## Reviewer Checks

- Confirm injection-like text is included in tests.
- Confirm citation grounding is checked.
- Confirm traces avoid prompt leakage.
