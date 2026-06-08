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
## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capability, new capability, failure caught, FinAgent/practical transfer, and next advanced doorway | Explains the main lesson purpose and transfer | Treats the lesson as disconnected tasks |
| Failure Literacy | Reproduces and explains a realistic failure before or during the fix | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the minimum path and clearly labels optional enrichment | Completes the core task with minor scope drift | Pulls advanced work into the required path or skips core evidence |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
