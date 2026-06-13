# Week 4: Monitoring And Review Loop

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | expose and test a local service boundary. |
| What new capability am I adding? | add structured logs, failure categories, summaries, and review actions. |
| What failure does this help me catch? | missing traces, vague incidents, and unclassified production failures. |
| How does this improve FinAgent or a practical AI system? | lets FinAgent explain what went wrong after a bad run. |
| What should I be able to explain afterward? | how logs and failure categories drive operational review. |

## Before You Run

Predict which category fits an event that says citations were missing. It should not be filed as generic unknown if the failure can be named.

## Worked Trace

Read `tests/test_monitoring_review.py` before editing:

```text
build_log_event -> categorize_failure -> summarize_monitoring_events -> build_review_loop
```

Monitoring is not a dashboard first. It starts with structured evidence a human can inspect.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k log_event -v` | explain the required event fields |
| Categories | `python -m pytest tests -k categorize -v` | map failures to actionable names |
| Summary | `python -m pytest tests -k summarize -v` | show category counts |
| Minimum complete | `python -m pytest tests -v` | explain the review loop actions |

## Smallest Change

Make logs consistent before adding review actions. A review loop built on vague logs teaches the team very little.

Use `hints.md` after naming the failure category. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Log or category fixed:
Failure now visible to a reviewer:
Review action I would take next:
AI assistance used:
```

