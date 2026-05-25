# Hints: Secure MCP And Agent Handoff Lab

## Hint 1: Permissions Are Positive Lists

Start from what is allowed. Do not try to detect every possible bad action after the fact.

## Hint 2: Treat Context As Untrusted

Retrieved text, user text, and tool output can all contain instructions. Validate the source and intended use before acting.

## Hint 3: Never Echo Secrets

Logs and traces may say which configuration key was required, but they should not contain the value.

## Hint 4: Handoffs Need Boundaries

A useful handoff includes task, evidence, constraints, and next action. It should not include unrelated memory, hidden prompts, or credentials.
