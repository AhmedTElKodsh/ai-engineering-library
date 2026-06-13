# Day 8 - LLM API Wrapper

Deliverable: provider wrapper with timeout handling, mock mode, normalized
errors, token-cost logging, and optional retries

Calendar date: Sunday 2026-06-21
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Build a replaceable provider boundary. The minimum path can be entirely mock
backed, and the first successful path must work without a paid API key.

## Read Or Trace

Required:

- `curriculum/main-track/03-module-3-mcp-integration/week-01-fundamentals/`

Optional if blocked or ahead:

- Module 3 README provider-boundary notes

## Build

- provider interface or adapter function
- mock provider response
- no-key behavior
- normalized provider error shape
- token/cost/log fields, even if estimated or zero in mock mode

## Required Tests

- mock success
- timeout or simulated timeout
- provider error
- no-key or mock-mode fallback

## Minimum Path

- one wrapper module
- one mock provider
- no direct provider calls outside the wrapper
- tests pass without network or paid API access

## Stretch

- real provider smoke test behind an environment flag
- retry policy with capped attempts

## Before You Run

What should happen when no API key is configured?

## Evidence First

Inspect the no-key behavior, mock response, or simulated provider failure before
adding provider code.

## Smallest Change

Make the mock provider pass without network access before adding retries or a
real provider smoke test.

## Explain Like A Teammate

Where can model calls happen, and what trace fields make provider behavior
debuggable?

## One Step Stronger

Add one timeout, provider-error, or token/cost trace assertion after mock
success works.

## Evidence To Capture

- wrapper module path
- mock-mode command or test
- no-key behavior
- normalized error example
- token/cost trace fields

## Done Criteria

Done when the project can run without a paid API key and direct provider calls
are isolated.

## Do Not Do Today

- scatter direct provider SDK calls across the codebase
- require paid credentials for the first green path
- log secrets, API keys, or full credentials
