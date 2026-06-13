# Day 3 - Data Models, Validation, And Configuration

Deliverable: config, models, and tests

Calendar date: Tuesday 2026-06-16
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Make project inputs explicit and reject bad input early. No core workflow should
accept raw unvalidated input by the end of today.

## Read Or Trace

- Module 0 configuration patterns
- Module 1 FinAgent boundary notes if using FinAgent
- `FINANCE_SAFETY.md` if the project touches financial data

## Build

Use dataclasses, Pydantic, or simple typed functions, depending on what the
learner project already uses.

Build:

- config loading for local paths and feature flags
- request or source-record model
- validation errors for missing, malformed, unsafe, or unsupported input

## Required Tests

- valid config
- missing config field
- valid model
- bad input model
- unsafe request if the domain needs a refusal boundary

## Minimum Path

- one config object or loader
- one request or source-record model
- tests for valid and invalid input

## Stretch

- add environment-specific config examples or stricter domain validation

## Before You Run

What bad input would be dangerous if it reached the pipeline?

## Evidence First

Inspect one accepted input and one rejected input before adding new model or
config fields.

## Smallest Change

Add one validation boundary that stops one dangerous input before expanding the
configuration surface.

## Explain Like A Teammate

Why does this validation belong before any prompt, model call, or tool call?

## One Step Stronger

Add one unsafe, malformed, or unsupported request case after the basic valid
model works.

## Evidence To Capture

- accepted input example
- rejected input example
- final test command
- validation boundary note

## Done Criteria

Done when no core workflow accepts unvalidated raw input.

## Do Not Do Today

- connect to a live provider
- hide validation inside prompts
- allow unsafe domain requests through because they are easy to format
