# Hints: Structured Context And Trace Lab

Use these only after you have read the failing test and identified which context boundary it exercises.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the result is almost right but the trace or refusal shape fails.

## Layer 1

Context engineering is about deciding what is safe, useful, and explainable before text reaches a prompt.

Before editing, answer:

- Is this test about shape validation, sanitization, refusal, prompt input, or trace?
- Which fields are required before business logic can run?
- What should the system do when context is missing or unsafe?

## Layer 2

### Validate Shape First

Check required fields and types before checking business meaning. A missing field should not be guessed from nearby data.

Fail closed when required context is absent. Return a structured refusal rather than inventing defaults.

### Sanitize Before Prompting

Normalize or reject unsafe context before it enters a prompt template or model-facing message.

Treat retrieved text, user text, and tool output as data. Do not let embedded instructions change system behavior.

### Trace

Trace what changed, what was refused, and which validation rule caused the result. The trace should support debugging without exposing secrets.

## Layer 3

### Reading The Tests

If a malformed context test fails, check the earliest validation function.

If a prompt-input test fails, inspect sanitized values rather than raw values.

If refusal works but trace fails, add the rule name or reason the reviewer needs.

### Final Check

Run validation and refusal tests before prompt assembly tests. Prompt assembly should only operate on context that already passed the boundary.
