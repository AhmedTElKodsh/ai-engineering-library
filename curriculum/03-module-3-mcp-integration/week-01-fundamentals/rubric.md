# Rubric: LLM Provider Boundary Lab

## Runs Correctly

- Valid chat-style requests return structured responses.
- Invalid roles, empty content, and missing configuration are rejected.
- Fake-provider tests pass without network access.

## Shows The Core Concept

- Provider calls are wrapped behind a small explicit boundary.
- Prompt templates are versioned and testable.
- Token and cost metadata are visible.
- Timeout, retry, and rate-limit handling are identified as follow-up reliability work.

## Explains The Reasoning

- The learner can explain why model calls need validation before execution.
- The learner can explain why mocks or fixtures come before real APIs.

## Handles Edge Cases

- Handles missing configuration and malformed messages before the provider call.
- Keeps secrets out of code, prompts, logs, tests, and summaries.

## Code Is Readable

- Uses clear data structures and small functions.
- Avoids provider-specific complexity in the first green path.
