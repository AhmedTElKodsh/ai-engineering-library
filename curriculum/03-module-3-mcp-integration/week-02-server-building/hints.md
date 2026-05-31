# Hints: Local Tool Server Contract Lab

Use these only after you have read the failing test and identified the tool-server stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when dispatch works but validation or trace still fails.

## Layer 1

Start from the tool contract: stable name, input fields, output fields, refusal cases, and trace facts.

Before editing, answer:

- Is this test about tool definition, input validation, dispatch, error response, or output validation?
- Which malformed inputs should be rejected before tool execution?
- What should a caller learn from a failure without seeing internal details?

## Layer 2

### Tool Contract

Name the tool before writing implementation logic. The contract should make allowed inputs and expected outputs clear.

Validation belongs before dispatch. Unknown tool names and malformed input should not reach the tool implementation.

### Errors And Output

Structured errors should be useful to the caller and safe to expose. Avoid raw exceptions, secrets, or stack-style internals.

Output validation protects the caller from a buggy tool implementation. Treat it as part of the boundary.

### Trace

Trace which tool was requested, whether validation passed, which branch ran, and whether output validation passed.

## Layer 3

### Reading The Tests

If an unknown tool test fails, inspect the dispatcher before individual tools.

If a malformed-input test fails, confirm validation happens before implementation side effects.

If trace output fails, add only the missing boundary fact.

### Final Check

Run contract and validation tests first, then dispatch tests. The lab is done when valid calls work and invalid calls fail in a structured way.
