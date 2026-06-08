# Reference Behavior: Module 5 Week 6 Optimization Tradeoffs

Scaffold: `curriculum/05-module-5-production/week-06-optimization/workbench.py`

## Intent

This lesson should teach practical optimization tradeoffs: cost, latency, caching, batching, retries, and budget-aware reporting.

## Intended Behavior

- Estimate call cost rounded to six decimals.
- Estimate batch latency from batch counts.
- Cache only deterministic and meaningful prompts.
- Choose retry policies for transient errors.
- Build optimization reports that name budgets and recommended actions.

## Reviewer Edge Cases

- Empty or low-value prompts should not be cached.
- Non-transient errors should not be retried blindly.
- Reports should include cost and latency evidence, not only advice.

## Do Not Accept

- Optimizing before correctness/eval evidence.
- Retrying every error.
- Caching unsafe or nondeterministic prompts.
