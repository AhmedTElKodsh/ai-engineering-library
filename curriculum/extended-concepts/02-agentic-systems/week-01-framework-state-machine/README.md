# Phase 5: Framework State Machine Lab

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | implement a plain-Python workflow loop. |
| What new capability am I adding? | model the workflow as immutable state transitions. |
| What failure does this help me catch? | hidden mutation, skipped states, and framework confusion. |
| How does this improve FinAgent or a practical AI system? | prepares FinAgent for framework-style orchestration after the simple version works. |
| What should I be able to explain afterward? | how state machines differ from free-form agent loops. |

## Before You Run

Predict what should happen to a request like `Tell me what stock to buy`. It should not retrieve evidence or answer with advice; it should route to refusal.

## Worked Trace

Read `tests/test_state_machine.py` before editing. Trace the expected path:

```text
GraphState(new) -> classify_node -> retrieve_node when needed -> answer_node -> summarize_state
```

Notice that each node should return a new `GraphState`. The original request state is evidence in the test: if it changes, the system is harder to debug.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k classify -v` | explain why advice routes to `refuse` |
| Retrieval path | `python -m pytest tests -k retrieve -v` | show when evidence is added and when it is not |
| Answer path | `python -m pytest tests -k answer -v` | explain why missing evidence leads to abstention |
| Minimum complete | `python -m pytest tests -v` | prove the original state was not mutated |

## Smallest Change

Implement one node at a time. Do not add a framework dependency; the point is to understand the state contract underneath a framework.

Use `hints.md` only after you can name the failing test or failure category. Check `rubric.md` before final evidence.

## Evidence Artifact

Write:

```text
Smallest test I ran:
State transition I fixed:
Unsafe or unsupported path handled:
Why immutable state helps debugging:
AI assistance used:
```

