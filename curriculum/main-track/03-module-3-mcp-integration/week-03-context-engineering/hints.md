# Hints: Structured Context And Trace Lab

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

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
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system

## Function Hint Index

Use these anchors from `workbench.py` when a TODO points here. They are stable targets, so learners can jump from a function to its matching hint section without relying on brittle line numbers.

### sanitize_text

Use this hint entry for `sanitize_text`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### validate_context_items

Use this hint entry for `validate_context_items`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### prepare_model_context

Use this hint entry for `prepare_model_context`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### validate_structured_answer

Use this hint entry for `validate_structured_answer`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_trace_record

Use this hint entry for `build_trace_record`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
