# Phase 4: Critique And Review Loop Lab

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | run explicit workflows with evidence gates. |
| What new capability am I adding? | add critique, retry, revision, and human-review checkpoints. |
| What failure does this help me catch? | low-quality drafts, repeated failed retries, and missing review escalation. |
| How does this improve FinAgent or a practical AI system? | improves FinAgent output quality without giving up control. |
| What should I be able to explain afterward? | how critique loops improve work while staying bounded. |

## Before You Run

Predict what should happen to a draft that has no citations and contains advice-like wording. It should be critiqued, revised or blocked, and high-risk output should require review.

## Worked Trace

Read `tests/test_critique_review_loop.py` before editing:

```text
critique_draft -> should_retry -> revise_draft -> run_review_loop
```

The goal is not to make a model "self-correct" magically. The goal is to make failure categories visible and bounded.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k critique -v` | name missing-citation and advice issues |
| Retry gate | `python -m pytest tests -k retry -v` | explain the attempt limit |
| Revision | `python -m pytest tests -k revise -v` | show the limitation language added without dropping citations |
| Minimum complete | `python -m pytest tests -v` | walk through the final trace |

## Smallest Change

Implement critique before revision. If the issue detector is vague, the retry and review loop will only make vague mistakes faster.

Use `hints.md` after naming the first failing issue category. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Critique issue fixed:
Retry or human-review gate explained:
How this strengthens FinAgent:
AI assistance used:
```

