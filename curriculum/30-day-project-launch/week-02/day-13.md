# Day 13 - RAG Evaluation

Deliverable: golden questions, eval runner, and failure taxonomy

Calendar date: Friday 2026-06-26
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Make answer quality inspectable. Eval output should distinguish retrieval,
citation, refusal, and formatting failures.

## Read Or Trace

Required:

- `curriculum/main-track/05-module-5-production/week-01-golden-datasets/`
- `curriculum/main-track/04-module-4-agentic-workflows/RAG_CITATION_ABSTENTION_CHECKLIST.md`
  Minimum Test Set section

Optional if blocked or ahead:

- Module 5 eval observability notes

## Build

- small golden eval set
- eval runner over mock or fixture-backed answers
- result rows with expected behavior, observed behavior, pass/fail, and failure
  category
- summary report

## Required Eval Cases

- supported cited answer
- unsupported abstention
- citation mismatch
- malformed structured output or formatting failure

## Minimum Path

- 4-6 golden cases
- deterministic eval command
- failure categories for retrieval, citation, refusal, and formatting

## Stretch

- baseline score saved to `evals/latest_run.json`
- one manually reviewed ambiguous case

## Before You Run

Which case is most likely to fail, and what category should it report?

## Evidence First

Inspect one eval row with expected behavior, observed behavior, and failure
category before changing the runner.

## Smallest Change

Run 4-6 deterministic cases before adding scores, dashboards, or manually
reviewed ambiguous cases.

## Explain Like A Teammate

How do these evals separate retrieval failure from generation or formatting
failure?

## One Step Stronger

Add one intentionally negative or malformed-output case after the runner
produces a summary.

## Evidence To Capture

- eval set path
- eval command
- summary report
- one passing case
- one failing or intentionally negative case

## Done Criteria

Done when eval output distinguishes retrieval, citation, refusal, and formatting
failures.

## Do Not Do Today

- report subjective answer quality without examples
- score only happy-path questions
- hide malformed output as a generic failure
