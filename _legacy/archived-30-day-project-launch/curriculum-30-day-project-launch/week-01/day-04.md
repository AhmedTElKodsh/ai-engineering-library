# Day 4 - Deterministic Pipeline v0

Deliverable: local input -> validate -> process -> output workflow

Calendar date: Wednesday 2026-06-17
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Create a useful non-LLM workflow that can be trusted and tested.

## Read Or Trace

- Module 1 whole-game FinAgent flow
- previous project utility and validation tests

## Build

Create the first end-to-end command. It can be a CLI script, module command, or
small Python entry point.

Recommended default shape:

```powershell
python -m src.pipeline --input data/raw/sample.json --output data/processed/report.json
```

Use a different command only if it is documented in the project `README.md`.

Build:

- load one local fixture
- validate request and fixture data
- process the data deterministically
- write a local output file or print a structured report

## Required Verification

Run:

```powershell
python -m pytest
```

Also run the project command and paste the command plus a short output summary
into the daily log.

## Minimum Path

- one fixture input
- one deterministic output
- one documented command

## Stretch

- add a smoke test for the command or a trace table for the pipeline steps

## Before You Run

What output file or report should exist after the command finishes?

## Evidence First

Run the test suite or command once and inspect the missing output, failure, or
trace before changing the pipeline.

## Smallest Change

Make one local input validate, process, and produce one output before adding
more commands or formats.

## Explain Like A Teammate

What does the pipeline do deterministically, and what does it intentionally
avoid doing?

## One Step Stronger

Add one smoke test, trace row, or limitation note after the command works.

## Evidence To Capture

- fixture path
- command used
- output summary
- test command
- first limitation

## Done Criteria

Done when one command runs the deterministic slice with validated input and
clear output.

## Do Not Do Today

- call an LLM to make the output look smarter
- add broad application shell code before the data path works
