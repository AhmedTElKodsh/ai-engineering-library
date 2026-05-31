# Hints: LLM Provider Boundary Lab

Use these only after you have read the failing test and identified the boundary behavior it expects.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the provider call works but the contract still fails.

## Layer 1

Treat the provider boundary as a contract, not just a function call. The fake provider should receive the same clean shape a real provider would receive.

Before editing, answer:

- Is this test about message shape, model configuration, tracing, or secret hygiene?
- What should be rejected before the provider is called?
- What normalized response should the rest of the app see?

## Layer 2

### Request Contract

List the required message fields before writing provider code. Validate roles, content, and model configuration at the edge.

Bad input should fail before any provider work happens. A boundary is only useful if malformed requests cannot pass through it.

### Provider And Trace

The provider adapter should hide provider-specific details behind a stable local shape.

A useful trace includes identity, version, size/cost estimates, timing, and normalized status. It should help debug without leaking secrets.

### Secret Hygiene

Configuration may name an environment variable, but learner-facing code should not contain real keys or log key values.

## Layer 3

### Reading The Tests

If a validation test fails, check whether the provider was called too early.

If response shape fails, compare provider-specific fields with the normalized fields the test expects.

If trace tests fail, add the missing diagnostic fact without exposing credentials or prompt internals.

### Final Check

Run validation tests before provider tests. Then run the full lab to prove the boundary blocks bad input and preserves useful trace data.
