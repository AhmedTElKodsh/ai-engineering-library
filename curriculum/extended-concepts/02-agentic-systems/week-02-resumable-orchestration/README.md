# Phase 6: Resumable Orchestration Lab

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | represent workflow state explicitly. |
| What new capability am I adding? | add resumable steps, retry limits, and failure recovery traces. |
| What failure does this help me catch? | infinite retries, duplicate steps, and lost progress after interruption. |
| How does this improve FinAgent or a practical AI system? | helps FinAgent recover from tool or evidence failures predictably. |
| What should I be able to explain afterward? | how resumability changes workflow design and testing. |

## Before You Run

Predict the next step after this completed list:

```text
["validate_request", "retrieve_context"]
```

The workflow should resume at the first required step not yet completed.

## Worked Trace

Read the tests and sketch the run:

```text
record_checkpoint -> handle_step_error -> should_retry -> resume_from_checkpoint -> run_orchestration
```

The important idea is not "more automation." It is bounded recovery: the workflow should know where it stopped and why.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k checkpoint -v` | explain why duplicate checkpoints are harmful |
| Retry budget | `python -m pytest tests -k retry -v` | show when retry is allowed and when it stops |
| Resume path | `python -m pytest tests -k resume -v` | name the next unfinished step |
| Minimum complete | `python -m pytest tests -v` | explain the final trace in order |

## Smallest Change

Start with pure data transformations. Add no timers, queues, background workers, or real orchestration framework in the required path.

Use `hints.md` after you can name the first failed assertion. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Checkpoint behavior fixed:
Retry or resume failure handled:
Trace field I would inspect during an incident:
AI assistance used:
```

