# Hints: Capstone Polish

Use these only after you have read the failing test or rubric item and identified the polish artifact it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the artifact exists but does not yet feel interview-ready.

## Layer 1

Polish is about making the capstone reviewable: demo flow, release evidence, limitation note, and interview answers.

Before editing, answer:

- Is this task about demo sequence, release evidence, limitations, or interview readiness?
- What should the reviewer learn from this artifact?
- Which safety or evidence boundary must be stated plainly?

## Layer 2

### Demo Script

A useful demo is a sequence, not a paragraph: setup, safe answer, abstention or refusal, and evidence review.

Each step should show a behavior the capstone claims to support.

### Release Evidence

Summarize release checks from the check objects. The capstone is ready only when every required check passes and there are no blockers.

The release summary should make blockers visible rather than burying them in prose.

### Limitations And Interview Answers

The limitation note should protect the user and the learner. Name stale data, missing citations, unsupported predictions, and the investment-advice boundary directly.

Interview answers should be short but specific. Cover architecture, evals, source grounding, safety, and what to improve next.

## Layer 3

### Reading The Tests Or Rubric

If a demo test fails, check whether the sequence includes each required behavior.

If release readiness is wrong, inspect blockers before totals.

If interview answers feel generic, add one concrete artifact or design decision to each answer.

### Final Check

Read the polish package as if you were the interviewer. It should make the project easy to understand, verify, and question.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
