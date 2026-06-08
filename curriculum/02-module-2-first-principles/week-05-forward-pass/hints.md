# Phase 5 Hints

## Layer 1

Start with `estimate_tokens`. The budget tests are easier when token counting is predictable.

## Layer 2

For context selection, sort by priority descending. Add an item only when its token count still fits the remaining budget.

## Layer 3

Stable softmax subtracts the largest scaled logit before exponentiating.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
