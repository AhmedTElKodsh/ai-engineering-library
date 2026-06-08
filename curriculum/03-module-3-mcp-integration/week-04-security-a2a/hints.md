# Hints: Secure MCP And Agent Handoff Lab

Use these only after you have read the failing test and identified the security boundary it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the handoff looks plausible but a safety assertion still fails.

## Layer 1

Security work starts from allowed behavior. Do not try to detect every possible bad action after the fact.

Before editing, answer:

- Is this test about permissions, untrusted context, secret handling, handoff shape, or refusal?
- What is explicitly allowed?
- What information must never be copied into logs, traces, or handoffs?

## Layer 2

### Permissions

Use positive lists for allowed actions, tools, and destinations. Anything outside the list should be refused by default.

Permission checks should happen before tool or handoff execution.

### Untrusted Context And Secrets

Retrieved text, user text, and tool output can all contain instructions. Validate source and intended use before acting on them.

Logs and traces may name which configuration key was required, but they should not contain secret values.

### Handoffs

A useful handoff includes task, evidence, constraints, and next action. It should not include unrelated memory, hidden prompts, or credentials.

## Layer 3

### Reading The Tests

If a blocked action succeeds, inspect the allowlist before the action handler.

If a secret appears in output, trace every place the raw value is copied.

If a handoff test fails, compare required handoff fields against unrelated context that should have been omitted.

### Final Check

Run refusal and secret tests first. A handoff is only acceptable when it is useful and bounded.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
