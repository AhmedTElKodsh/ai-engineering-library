# Hints: CI/CD Release Gate

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the failing test and identified the release-gate stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the gate decision works but reasons, checklist, or report fail.

## Layer 1

Think of the release gate as a reproducible decision: load fixtures, calculate pass rate, collect reasons, produce checklist, and write a review report.

Before editing, answer:

- Is this test about fixture loading, pass-rate math, gate decision, failure reasons, checklist commands, or report content?
- Which data should make the release fail?
- What would a teammate need to reproduce the decision?

## Layer 2

### Loaders And Metrics

Both fixtures are small JSON files. Convert fixture records into local objects with the same fields before calculating anything.

Pass rate is based on passed checks divided by total checks. If total is zero, the gate should not silently pass.

### Gate Reasons

A failing gate can have more than one reason. Preserve all relevant reasons instead of stopping after the first one.

Common reasons include low pass rate, remaining eval failures, and missing version fields.

### Checklist And Report

The checklist should be concrete commands a teammate can run from the repo root.

The report is for release review. Include enough version, result, and reason information to reproduce the decision.

## Layer 3

### Reading The Tests

If pass rate is off, inspect total count and rounding.

If a failing gate has too few reasons, check whether later reason checks still run after the first failure.

If checklist tests fail, make entries command-like rather than prose-like.

### Final Check

Run loader and metric tests first. Then run gate and report tests to prove the release decision is explainable.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system

## Function Hint Index

Use these anchors from `workbench.py` when a TODO points here. They are stable targets, so learners can jump from a function to its matching hint section without relying on brittle line numbers.

### load_eval_run

Use this hint entry for `load_eval_run`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### load_version_note

Use this hint entry for `load_version_note`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### compute_pass_rate

Use this hint entry for `compute_pass_rate`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### evaluate_release_gate

Use this hint entry for `evaluate_release_gate`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_ci_command_checklist

Use this hint entry for `build_ci_command_checklist`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_gate_report

Use this hint entry for `build_gate_report`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
