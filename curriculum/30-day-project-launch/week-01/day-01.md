# Day 1 - Setup, Diagnostic, And Project Scope

Deliverable: `PROJECT_SCOPE.md`

Calendar date: Sunday 2026-06-14
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Choose one project spine and define the smallest useful Day 30 outcome. Today
is not about building features. It is about proving the learner environment
works and narrowing the project enough that Week 1 can finish a deterministic
slice.

## Read Or Trace

- `START_HERE.md`
- `START_HERE_30_DAY_PROJECT_LAUNCH.md`
- `LEARNER_READY_MATRIX.md`
- `curriculum/main-track/00-python-foundations/week-00-diagnostic/`
- `curriculum/30-day-project-launch/templates/PROJECT_SCOPE.md`

## Build

1. Run the diagnostic from the curriculum repository root:

```powershell
python -m pytest curriculum/main-track/00-python-foundations/week-00-diagnostic -q
```

2. Create the project folder outside the curriculum source tree.
3. Create a virtual environment, `README.md`, `tests/`, and initial project
   folders.
4. Copy `curriculum/30-day-project-launch/templates/PROJECT_SCOPE.md` into the
   project and fill it in.
5. Choose the Day 7 deterministic outcome in one sentence.

Recommended project folders:

```text
data/
  raw/
  clean/
  processed/
src/
tests/
docs/
logs/
```

## Minimum Path

- diagnostic command run from the curriculum repo root
- project folder created outside the curriculum source tree
- `PROJECT_SCOPE.md` filled with a narrow Day 7 outcome

## Stretch

- add a short architecture sketch or data-flow note to the project `README.md`

## Before You Run

What Python or setup failure do you expect the diagnostic might expose?

## Evidence First

Inspect the diagnostic result and environment error, if any, before editing
project setup files.

## Smallest Change

Create only the project folder, setup notes, and filled scope needed to make Day
2 possible.

## Explain Like A Teammate

Why is this project small enough to finish a deterministic Day 7 slice?

## One Step Stronger

Add one architecture sketch or data-flow note only after the minimum scope is
clear.

## Evidence To Capture

- diagnostic result
- project spine
- deterministic v0 input and output
- non-goals
- first risk

## Done Criteria

Done when the scope names the input, output, deterministic v0, safety boundary,
and expected evidence for Days 7, 14, 21, 28, and 30.

## Do Not Do Today

- add an LLM call
- add a vector database
- build a UI
- start live scraping
