# Phase 6 Hints

## Layer 1

Inference uses parameters. Training changes parameters.

## Layer 2

For squared error `(prediction - target) ** 2`, the gradient with respect to prediction is `2 * error`.

## Layer 3

Fine-tuning needs examples and is usually not the first fix for missing data, bad math, or weak formatting.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
