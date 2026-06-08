# Hints: Capstone Build

Use these only after you have read the failing test or checklist item and identified which capstone artifact it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the artifact exists but feels too vague to review.

## Layer 1

A credible capstone is smaller than a fantasy product. Define scope, non-goals, evaluation, evidence, and refusal behavior before polishing.

Before editing, answer:

- Is this task about scope, eval harness, evidence ledger, refusal behavior, or project story?
- What is explicitly out of scope?
- What proof would convince a reviewer this behavior works?

## Layer 2

### Scope

Start by writing the non-goals. A smaller capstone is easier to finish and easier to defend.

Each included feature should connect to a visible artifact or evaluation case.

### Evaluation And Evidence

The eval harness can use deterministic fake outputs first. Do not call a live model just to test the contract.

The evidence ledger is a table of proof. Each row should point to an artifact and explain what it demonstrates.

### Safety

Refusal behavior is a feature. Include it in the scope and eval cases, especially for unsupported claims or unsafe advice.

## Layer 3

### Reading The Tests Or Rubric

If a capstone artifact feels too broad, remove a feature or turn it into a non-goal.

If evals are flaky, replace live behavior with deterministic fixtures for the contract test.

If evidence is weak, add a concrete artifact reference rather than more explanation.

### Final Check

Review the capstone as a stranger would: can they see what it does, what it refuses, how it was tested, and what evidence supports it?
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
