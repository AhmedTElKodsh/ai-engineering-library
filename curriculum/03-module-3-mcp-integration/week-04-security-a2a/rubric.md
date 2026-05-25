# Rubric: Secure MCP And Agent Handoff Lab

## Runs Correctly

- Allowed tool or handoff requests pass.
- Disallowed, injected, or malformed requests are refused.
- Secret-safe configuration checks are explicit.

## Shows The Core Concept

- MCP-style integration is treated as a permissioned contract.
- Agent handoff is structured, bounded, and testable.
- Security checks happen before action.

## Explains The Reasoning

- The learner can explain why external context is untrusted.
- The learner can explain where secrets belong and why they must not enter prompts or traces.

## Handles Edge Cases

- Handles missing permissions, unknown tools, suspicious instructions, and incomplete handoff objects.
- Keeps refusal messages useful without exposing sensitive internals.

## Code Is Readable

- Keeps permissions, injection checks, and handoff validation separate.
- Names refusal reasons clearly.
