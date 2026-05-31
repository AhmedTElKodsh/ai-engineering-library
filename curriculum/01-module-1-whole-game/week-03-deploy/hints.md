# Hints: Local FinAgent Request Boundary

Use these only after you have read the failing test and identified the request-boundary behavior it expects.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when individual helpers pass but the response contract fails.

## Layer 1

Separate boundary work from analysis work. A request handler receives messy outside data; the analyzer should receive clean, trusted values.

Before editing, answer:

- Is this test about validation, analysis, response shape, or trace metadata?
- What input is allowed to reach the stock-summary logic?
- What should happen when request data is missing or malformed?

## Layer 2

### Validation Boundary

Normalize the ticker before checking it. Use the same simple ticker rule from earlier lessons so the deploy boundary agrees with the local FinAgent.

Validation should produce a clear refusal or error shape. Do not let invalid input drift into the calculation layer.

### Response Shape

Return a dictionary because this boundary is preparing learners for JSON responses. Keep keys stable so later tests and clients can rely on them.

Trace metadata can be simple. It should answer what operation ran, what source was used, and whether the result succeeded.

## Layer 3

### Reading The Tests

If a valid request fails, compare the cleaned values sent into the analyzer with the raw request values.

If an invalid request fails, check whether the code refused early enough.

If a trace assertion fails, add only the missing diagnostic fact instead of rewriting the main response.

### Final Check

Run validation tests first, then response-shape tests. The boundary is done when clean requests succeed and malformed requests never reach analysis.
