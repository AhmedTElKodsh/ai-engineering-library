# Day 2 - Pytest, Workbench Discipline, And Git Habit

Deliverable: one small utility, tests, and commit explanation

Calendar date: Monday 2026-06-15
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Prove the local test loop works before the project grows. Build one narrow
utility that the rest of the project will use.

## Read Or Trace

- Module 0 workbench ritual
- `HOW_TO_USE_AI_ASSISTANTS.md`
- any relevant utility examples from the diagnostic workbench

## Build

Choose one small utility. Good options:

- ticker normalization
- document ID normalization
- date parsing
- source URL normalization
- safe filename generation

Write the utility in the learner project, not inside the curriculum source
tree.

## Required Tests

- normal input
- empty input
- malformed input
- boundary input

## Minimum Path

- one utility
- four focused tests
- one passing test command

## Stretch

- add type hints and one property-style edge case if it remains simple

## Before You Run

Which test should fail first, and what behavior should make it pass?

## Evidence First

Read the first failing assertion before changing the utility.

## Smallest Change

Make one test pass before broadening the utility or adding another helper.

## Explain Like A Teammate

What input does this utility accept, reject, or normalize?

## One Step Stronger

Add one boundary or malformed-input case after the normal path passes.

## Evidence To Capture

- first failing assertion
- smallest change that made it pass
- final test command
- commit message or commit explanation

## Done Criteria

Done when the utility is tested, committed, and explainable in plain English.

## Do Not Do Today

- create broad abstractions
- ask AI for a finished module the learner cannot explain
- build multiple unrelated utilities
