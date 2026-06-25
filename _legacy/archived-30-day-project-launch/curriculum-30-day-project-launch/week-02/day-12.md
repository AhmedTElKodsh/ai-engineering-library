# Day 12 - Simple RAG With Citations

Deliverable: query -> retrieve -> answer with citations and abstention

Calendar date: Thursday 2026-06-25
Expected effort: 5-7 focused hours
Task budget: 15 min plan, 45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, 30-45 min evidence log and commit.
Slice rule: keep each function, test, prompt, or doc task to 20-45 minutes before checking evidence.

## Objective

Answer only from retrieved evidence. Unsupported or weak-evidence questions
must abstain instead of producing fluent guesses.

## Read Or Trace

Required:

- `curriculum/main-track/04-module-4-agentic-workflows/RAG_CITATION_ABSTENTION_CHECKLIST.md`
  Authoring Gate and Minimum Test Set sections
- `curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag/`

Optional if blocked or ahead:

- Module 4 README RAG notes

## Build

- query pipeline
- retrieval trace with selected chunks and scores
- retrieved-context prompt
- cited answer schema
- abstention path for unsupported or weak-evidence questions
- citation validation against retrieved chunk IDs

## Required Tests

- supported question returns cited answer
- unsupported question abstains
- answer with citation mismatch fails validation
- unsafe user instruction or unsafe retrieved text is refused, sanitized, or
  isolated

## Minimum Path

- one supported golden question
- one unsupported question
- one citation validation rule
- mock provider answer
- one injection or unsafe-instruction negative case

## Stretch

- invented citation rejection
- weak-evidence threshold
- stale-source warning in answer or abstention
- source-conflict case

## Before You Run

Which retrieved chunk should support the answer claim?

## Evidence First

Inspect the retrieved chunk IDs, scores, and mock answer before changing the RAG
pipeline.

## Smallest Change

Make one supported question answer with a valid retrieved citation before adding
thresholds, source conflicts, or richer answer styles.

## Explain Like A Teammate

What makes abstention safer than a fluent unsupported answer?

## One Step Stronger

Add one unsupported-question, citation-mismatch, injection, or stale-source case
after the cited happy path works.

## Evidence To Capture

- supported query and cited answer
- unsupported query and abstention
- retrieved chunk IDs
- citation mismatch failure
- injection or unsafe-text case

## Done Criteria

Done when unsupported answers are refused or marked insufficient.

## Do Not Do Today

- let citations point to chunks that were not retrieved
- let the model invent sources
- add tools or agents before RAG behavior is measurable
