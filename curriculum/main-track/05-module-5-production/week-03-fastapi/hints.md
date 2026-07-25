# Hints: Local Service Boundary

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the first failing test and named the behavior it is asking for.

The hints are layered. Start with Layer 1, then move down only when the previous layer is not enough.

## Layer 1

Name the contract before editing code. For this lesson, focus on health metadata, request validation, error shape, advice refusal, and trace fields.

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
- transfer evidence: FinAgent can expose an API-style contract without adding hosted infrastructure

## Function Hint Index

Use these anchors from `workbench.py` when a TODO points here. They are stable targets, so learners can jump from a function to its matching hint section without relying on brittle line numbers.

### health_check

Use this hint entry for `health_check`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### validate_service_request

Use this hint entry for `validate_service_request`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### handle_service_request

Use this hint entry for `handle_service_request`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_error_response

Use this hint entry for `build_error_response`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
