# Reference Behavior: Module 3 Phase 4 Secure MCP And Agent Handoff

Scaffold: `curriculum/03-module-3-mcp-integration/week-04-security-a2a/workbench.py`

## Intent

This lesson should teach permission checks, prompt-injection detection, secret redaction, minimal handoffs, and bounded agent-to-agent tool authorization.

## Intended Behavior

- Require explicit role policy before tool access.
- Detect common secret-exfiltration and instruction-override phrases.
- Redact secret values while preserving variable names.
- Reject handoffs that contain injection risks.
- Preserve only minimal handoff context.
- Authorize handoff tool calls within role and tool boundaries.

## Reviewer Edge Cases

- Unknown roles and tools should be denied by default.
- Secret redaction should not remove the key name needed for debugging.
- Handoff authorization should check both sender/receiver context and tool policy.

## Do Not Accept

- Allow-by-default permissions.
- Handoffs that pass full conversation state unnecessarily.
- Logging raw secrets.
