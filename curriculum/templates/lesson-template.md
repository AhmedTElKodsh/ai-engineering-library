# Lesson Title

## Learning Goal

Write one sentence that names the concrete skill.

## Real-World Context

Explain where this appears in AI engineering.

## Story Or Failure

Frame the lesson as a concrete mission, product problem, debugging case, or realistic failure. Use cafe-style storytelling: clear, friendly, concrete, and small-example driven.

## Visual Map

Add a Mermaid diagram, mind map, sequence sketch, table, or small visual that helps the learner see the flow before coding.

## Before You Run

Ask the learner to predict one output, failure, intermediate value, or design tradeoff before running code.

## Read

Introduce only the concept the learner needs for the next code decision. Keep deeper theory tied to the observed problem.

## Trace

Give the learner something to inspect before they edit code.

## Evidence First

Point the learner to the first test, log, trace, fixture, or data example that should guide their next edit.

## Explain

Answer these before coding:

1. What input does the code receive?
2. What output should it produce?
3. What can go wrong?

## Modify

Make one constrained change to existing code.

Name the smallest useful change before the learner edits.

## Create

Complete the TODOs in the starter file.

## Verify

Run:

```powershell
python -m pytest tests -v
```

Use test failures as feedback. Fix the smallest piece of behavior first.

Explain the expected starting failure and how the learner should distinguish an intended TODO failure from an import or path error.

## Reflect

- What did the tests prove?
- What did they not prove?
- Where would this fail in production?
- How does this transfer to FinAgent, production AI engineering, or the next module?

## Extension

Add one small feature or edge-case test.

## Cafe Visual Break

Optional if the learner wants another explanation style:

- Video or visual resource: [title](url) - why it helps
- Book or course reference: [title](url) - when to use it

These resources are optional. Return to `workbench.py` after the visual pass.

## Authoring Checklist

Before publishing this lesson, copy `curriculum/templates/lesson-quality-checklist.md` into the lesson folder as `AUTHORING_PLAN.md` and fill it in with the actual scaffold, learner-start, and reference-validation evidence.
