# Hints: Critique And Review Loop

Use these only after you have read the first failing test and named the behavior it is asking for.

The hints are layered. Start with Layer 1, then move down only when the previous layer is not enough.

## Layer 1

Name the contract before editing code. For this lesson, focus on draft quality, critique rules, retry limits, and human-review escalation.

Before changing workbench.py, answer:

- Which test is failing first?
- What input shape or state does that test create?
- What output shape, refusal, trace, or decision does it expect?

## Layer 2

Split the behavior into two small steps: validate the input or state first, then build the response or decision object.

Keep the implementation deterministic. If you are tempted to add a framework, live service, model call, or external dependency, write down what the plain-Python boundary should prove first.

## Layer 3

Check the edge case before polishing the happy path. Look for missing fields, empty collections, invalid requests, unsafe intent, retry limits, or unsupported evidence.

If the test expects a trace, include enough names, statuses, reasons, or counts that a reviewer could debug the run without reading your whole implementation.

## Failure Lab

Write one sentence that starts with: This failure is teaching me... Use the failing test name and assertion message as evidence.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: FinAgent can improve drafts without hiding repeated failures or bypassing human review
