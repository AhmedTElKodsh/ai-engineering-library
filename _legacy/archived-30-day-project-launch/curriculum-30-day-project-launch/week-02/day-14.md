# Day 14 - Milestone 2: Cited Q&A System

Deliverable: RAG assistant with citations, abstention, evals, and failure notes

Calendar date: Saturday 2026-06-27
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Defend grounded LLM behavior. Today is cleanup only: tighten docs, eval notes,
and failure examples instead of adding tools or agents.

## Read Or Trace

- `curriculum/30-day-project-launch/milestone-rubric.md`
- Day 14 section of the milestone rubric
- Day 7 milestone notes
- Week 2 daily logs

## Run

Run:

```powershell
python -m pytest
```

Also run the project eval command and save the output summary in the daily log.

## Milestone Evidence

- provider wrapper with mock mode
- prompt template and structured output schema
- chunked records with metadata
- retrieval ranking tests
- cited answer and abstention tests
- eval set and latest eval output
- failure taxonomy
- known retrieval limitation
- Day 14 note scored against `milestone-rubric.md`

## Minimum Path

- rerun tests
- rerun eval command
- fill Day 14 milestone note
- score against the Day 14 rubric

## Stretch

- add one good-answer trace and one abstention trace
- add retrieval settings or prompt version notes

## Before You Run

Which evidence proves that citations are real and unsupported answers stop?

## Evidence First

Inspect test output, eval output, retrieved chunks, cited answer examples, and
abstention examples before editing milestone notes.

## Smallest Change

Close citation, abstention, or eval evidence gaps before adding tools or agents.

## Explain Like A Teammate

What improved since Day 7, what remains mock-only, and what Week 3 must not
automate prematurely?

## One Step Stronger

Add one good-answer trace or abstention trace after the pass standard is met.

## Pass Standard

The project retrieves chunks, answers supported questions with citations,
abstains on unsupported questions, and has eval evidence that exposes failure
categories.

## Evidence Checklist

- [ ] Provider calls are isolated behind one wrapper boundary.
- [ ] The first successful path works without a paid API key.
- [ ] Prompt template is named, versioned, and rendered through code.
- [ ] Structured output is validated before downstream use.
- [ ] Prompt or output tests include at least one negative case.
- [ ] Retrieval ranks a tiny local corpus reproducibly.
- [ ] Chunks preserve source metadata for citation.
- [ ] RAG answers cite retrieved chunks only.
- [ ] Unsupported or weak-evidence questions abstain.
- [ ] Eval cases cover supported, unsupported, citation mismatch, and formatting
  failure.
- [ ] Daily logs name first failures, final commands, limitations, and AI use.
- [ ] Day 14 is scored against `milestone-rubric.md`.

## Done Criteria

Done when another engineer can run tests and evals, inspect citations, and see
unsupported questions abstain.

## Do Not Do Today

- add tools or agents
- treat mock-only model behavior as production-ready
- move to Week 3 before cited RAG behavior is measurable
