# Phase 4: Secure MCP And Agent Handoff Lab

Folder: `week-04-security-a2a`  
Expected time to finish: 4-6 hours  
File to edit: `workbench.py`  
Test folder: `tests/`  
Core test file: `tests/test_security_handoff.py`

## Learning Goal

Add permission checks, injection resistance, secret-safe configuration, and a small agent-to-agent handoff contract before exposing capabilities through MCP-style integration.

## What You Will Build

- permission checks for tool access
- prompt-injection refusal examples
- secret-safe configuration boundaries
- a small handoff object between two assistant roles
- tests or acceptance checks for allowed, refused, and malformed handoffs

## Success Looks Like

- Allowed actions are explicit and narrow.
- Unsafe instructions are refused even when they appear inside context.
- Secrets are referenced by configuration names, never copied into prompts or logs.
- Handoff messages include enough context to continue work without exposing unrelated state.

## Learner Loop

1. Read the permission and handoff contract.
2. Inspect the injection and secret-safety examples.
3. Predict which request should be refused.
4. Implement one permission or refusal behavior.
5. Run the smallest relevant test.
6. Record what the trace proves.
7. Reflect on what MCP integration should never make easier by accident.

## Evidence Artifact

```text
Allowed action:
Refused action:
Injection signal:
Secret-safe configuration rule:
Handoff fields:
Remaining security risk:
```

## Connection To Module 4

This phase closes Module 3 by making integration safer. Module 4 can then build richer agent workflows on top of explicit permissions, traces, and refusal behavior.
