# Phase 1: LLM Provider Boundary Lab

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | explain tokens, context, and model-boundary limits. |
| What new capability am I adding? | build a deterministic LLM provider wrapper with prompt and cost traces. |
| What failure does this help me catch? | invalid chat roles, blank content, bad templates, and missing cost evidence. |
| How does this improve FinAgent or a practical AI system? | lets FinAgent call model providers through a testable boundary. |
| What should I be able to explain afterward? | how provider calls are validated, rendered, traced, and costed. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** read the scenario, inspect the tests or fixtures, complete the TODOs in `workbench.py`, run the verification command, and write the reflection/evidence note.
- **Optional enrichment:** add one edge case, comparison, or small test after the required behavior works.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Course 1 task.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

Folder: `week-01-fundamentals`  
Expected time to finish: 4-6 hours  
File to edit: `workbench.py`  
Test folder: `tests/`  
Core test file: `tests/test_provider_boundary.py`

## Learning Goal

Build a small provider boundary that treats model calls as testable request/response contracts instead of hidden API magic.

## What You Will Build

- a message format for system, user, and assistant turns
- a provider adapter that can use a fake provider first
- token and cost estimate logging
- a short note about provider risks that this first boundary does not solve yet
- prompt-template tests that run without a paid API

## Success Looks Like

- Valid messages pass through the boundary with trace metadata.
- Malformed messages fail before any provider is called.
- Prompt templates are versioned and covered by regression examples.
- No secrets appear in code, prompts, logs, tests, or summaries.

## Learner Loop

1. Read the message contract.
2. Inspect the tests and fake provider before editing.
3. Predict which malformed request should fail first.
4. Implement one boundary behavior in `workbench.py`.
5. Run the smallest relevant test.
6. Record what the trace proves.
7. Reflect on what a real provider adds and what it can break.

## Expected First Run And Checkpoints

Run `python -m pytest tests -v`. The first run should collect cleanly and fail
on TODO behavior.

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Message contract | `python -m pytest tests -k validate_messages -v` | explain which roles and empty messages are refused |
| Prompt and cost | `python -m pytest tests -k "render_prompt or estimate" -v` | explain how prompt versions, token estimates, and cost estimates are recorded |
| Provider boundary | `python -m pytest tests -k call_provider -v` | explain why validation happens before a provider is called |

## Evidence Artifact

```text
Boundary behavior implemented:
Input accepted:
Input refused:
Trace fields recorded:
Prompt template checked:
Remaining provider risk:
```

## Connection To Module 2

Module 2 showed what model-facing mechanisms do. This phase creates the first safe boundary around real or mocked model access.

