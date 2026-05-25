# Phase 1: LLM Provider Boundary Lab

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
