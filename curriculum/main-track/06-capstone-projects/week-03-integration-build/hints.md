# Hints: Week 3 Integration Build

Use these only after you have read the failing test and identified which
workflow stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are
stuck. Use Layer 3 when the workflow runs but citations, refusals, or trace
evidence still fail.

## Layer 1

This milestone is a workflow, not a new finance system. Keep every step small,
deterministic, and reviewable.

Before editing, answer:

- Is this failure about fixture loading, request validation, retrieval, brief composition, refusal, or trace?
- What evidence should survive into the final result?
- Should this request be answered or refused?

## Layer 2

### Validation

Ticker validation can be simple: uppercase alphabetic symbols in a small length
range. Advice-seeking language should trigger refusal before retrieval.

### Retrieval

Use direct text matching against fixture chunks. This milestone tests evidence
flow, not embedding quality.

### Brief Composition

The brief should include movement, a grounded interpretation, citations,
uncertainty, and non-advice language. Do not invent facts outside the fixtures.

### Trace

Each major step should leave a short trace item: validation, data loading,
retrieval, safety, and composition or refusal.

## Layer 3

### Reading The Tests

If advice requests are answered, move safety earlier in the workflow.

If citations are missing, inspect retrieval output before changing the brief.

If trace assertions fail, check whether both success and refusal paths record
reviewable steps.

### Final Check

A reviewer should be able to run one command, see a cited educational brief, and
see a refusal for investment advice without guessing which gate made the choice.

## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the
failing test name, assertion message, malformed fixture, missing field, unsafe
output, weak citation, or unclear trace. Write one sentence about what the
failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
