# Week 5: Cost, Latency, And Reliability Optimization

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | read logs and failure categories. |
| What new capability am I adding? | compare cost, latency, caching, batching, and retry tradeoffs. |
| What failure does this help me catch? | expensive prompts, slow batches, retry misuse, and validation retries. |
| How does this improve FinAgent or a practical AI system? | keeps FinAgent optimizations tied to measured constraints. |
| What should I be able to explain afterward? | how to choose an optimization without harming reliability. |

## Before You Run

Predict whether a validation error should be retried. It should not; retry is for transient failures such as timeout or rate limit.

## Worked Trace

Read `tests/test_optimization_tradeoffs.py` before editing:

```text
estimate_call_cost -> estimate_batch_latency -> should_cache -> choose_retry_policy -> build_optimization_report
```

Optimization is a tradeoff note before it is a code trick.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k cost -v` | explain the token-to-cost calculation |
| Latency and cache | `python -m pytest tests -k "latency or cache" -v` | name what should and should not be cached |
| Retry policy | `python -m pytest tests -k retry -v` | separate transient errors from validation errors |
| Minimum complete | `python -m pytest tests -v` | defend the optimization report |

## Smallest Change

Do the arithmetic and policy checks directly. Do not introduce external pricing APIs, queues, or caches in the required path.

Use `hints.md` after naming the first tradeoff failure. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Cost, latency, cache, or retry rule fixed:
Budget or reliability risk handled:
Recommendation I can defend:
AI assistance used:
```

