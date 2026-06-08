# Reference Behavior: Module 2 Phase 5 Context Window And Decoding

Scaffold: `curriculum/02-module-2-first-principles/week-05-forward-pass/workbench.py`

## Intent

This lesson should connect model mechanics to product decisions: token estimates, context selection, softmax probabilities, decoding strategy, and model-choice tradeoffs.

## Intended Behavior

- Estimate tokens deterministically and treat blank text as zero.
- Select high-priority context items within a budget while preserving trace evidence.
- Compute softmax probabilities that sum to one.
- Decode the next token with greedy and temperature modes.
- Produce a model strategy note that names quality, latency, cost, and context tradeoffs.

## Reviewer Edge Cases

- Context selection should not exceed budget.
- Temperature mode should remain deterministic if the scaffold specifies fixed ordering.
- Blank or empty inputs should not create phantom context.

## Do Not Accept

- Real model calls.
- Model-selection notes that always pick the largest model.
- Context selection that drops source identity.
