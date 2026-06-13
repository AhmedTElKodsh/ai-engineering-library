# Validation: Module 3 Phase 2 Local Tool Server Contract

Scaffold: `curriculum/main-track/03-module-3-mcp-integration/week-02-server-building/workbench.py`

## Commands

```powershell
python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-02-server-building --collect-only -q
python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-02-server-building -q
```

## Expected Starter State

Collection should succeed. TODO failures should map to tool listing, validation, dispatch, or trace behavior.

## Reviewer Checks

- Confirm unknown and malformed tool calls are tested.
- Confirm tool specs are explicit enough to become MCP-style contracts later.
- Confirm no external server is required.
