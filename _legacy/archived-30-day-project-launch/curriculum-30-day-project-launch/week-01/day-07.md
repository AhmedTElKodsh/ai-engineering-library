# Day 7 - Milestone 1: Deterministic Assistant

Deliverable: deterministic project slice with tests, logs, validated input, and
documented limits

Calendar date: Saturday 2026-06-20
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Defend a reliable non-LLM baseline. Today is cleanup only: tighten the evidence
instead of adding new features.

## Read Or Trace

- `curriculum/30-day-project-launch/milestone-rubric.md`
- Day 7 section of the milestone rubric
- Module 1 gate
- Week 1 daily logs

## Run

Run:

```powershell
python -m pytest
```

If the project has a CLI or script, run that too and record the command.

## Milestone Evidence

- `PROJECT_SCOPE.md`
- daily engineering logs for Days 1-7
- tests for validation and the deterministic path
- sample raw, clean, and processed records
- sample output or report
- known limits and bad-input behavior
- Day 7 note scored against `milestone-rubric.md`

## Minimum Path

- rerun tests
- rerun the documented project command
- fill the Day 7 milestone note
- score against the Day 7 rubric

## Stretch

- add a small sample output with limitations or a trace table

## Before You Run

Which evidence would convince another engineer that the slice is runnable?

## Evidence First

Inspect the latest test output, project command output, and daily logs before
editing milestone notes.

## Smallest Change

Close evidence gaps before adding any new functionality.

## Explain Like A Teammate

What is reliable now, what is still limited, and what Week 2 must not overclaim?

## One Step Stronger

Add one sample output with limitations or one trace table after the pass standard
is met.

## Pass Standard

The project has a local input -> validate -> process -> output workflow that
runs without LLM calls, has tests for the core path and bad input, and explains
its limits honestly.

## Evidence Checklist

- [ ] The diagnostic was run and the result is recorded.
- [ ] `PROJECT_SCOPE.md` is filled in.
- [ ] The project has a virtual environment or documented Python setup.
- [ ] The project has a repeatable test command.
- [ ] At least one utility has normal, malformed, empty, and boundary tests.
- [ ] Input models or validation boundaries reject bad input early.
- [ ] The deterministic pipeline runs from local input to local output.
- [ ] Raw and clean data are separate.
- [ ] Processed records preserve source metadata.
- [ ] RAG-ready records can be produced without embeddings or an LLM.
- [ ] Daily logs name first failures, final commands, limitations, and AI use.
- [ ] Day 7 is scored against `milestone-rubric.md`.

## Done Criteria

Done when another engineer can run the deterministic slice, inspect the output,
and understand its limits.

## Do Not Do Today

- add new major functionality
- turn the milestone into an untested demo
- move to Week 2 before the deterministic baseline is defensible
