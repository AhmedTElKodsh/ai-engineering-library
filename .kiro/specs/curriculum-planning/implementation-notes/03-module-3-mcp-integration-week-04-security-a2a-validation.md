# Validation: Module 3 Phase 4 Secure MCP And Agent Handoff

Scaffold: `curriculum/03-module-3-mcp-integration/week-04-security-a2a/workbench.py`

## Commands

```powershell
python -m pytest curriculum/03-module-3-mcp-integration/week-04-security-a2a --collect-only -q
python -m pytest curriculum/03-module-3-mcp-integration/week-04-security-a2a -q
```

## Expected Starter State

Collection should succeed. TODO failures should point at security boundary behavior.

## Reviewer Checks

- Confirm default-deny behavior is tested.
- Confirm prompt-injection and secret-redaction examples are explicit.
- Confirm handoff context remains minimal.
