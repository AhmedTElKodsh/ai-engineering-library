# Week 3: Local Service Boundary

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | gate behavior with CI-style evidence. |
| What new capability am I adding? | shape local service health, validation, success, and error responses. |
| What failure does this help me catch? | advice requests, malformed tickers, and unstructured error output. |
| How does this improve FinAgent or a practical AI system? | prepares FinAgent for an API boundary without requiring a server. |
| What should I be able to explain afterward? | how service contracts protect callers and preserve traceability. |

## Before You Run

Predict what should happen to `{"ticker": " aapl ", "question": "Should I buy?"}`. The ticker can normalize, but the advice request must still be refused.

## Worked Trace

Read `tests/test_service_boundary.py` before editing:

```text
health_check -> validate_service_request -> build_error_response -> handle_service_request
```

This is FastAPI-style behavior with plain Python. The lesson is the boundary contract, not the framework.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k health -v` | name the service metadata a reviewer expects |
| Validation | `python -m pytest tests -k validate -v` | explain normalization and advice refusal |
| Error shape | `python -m pytest tests -k error -v` | show machine-readable error fields |
| Minimum complete | `python -m pytest tests -v` | trace a successful request end to end |

## Smallest Change

Keep the required path local. Do not add FastAPI, sockets, or live routes until the plain request/response contract is correct.

Use `hints.md` after naming the failing boundary. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Request or error boundary fixed:
Unsafe request refused:
Trace field I would log:
AI assistance used:
```

