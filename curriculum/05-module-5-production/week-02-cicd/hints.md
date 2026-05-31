# Hints: CI/CD Release Gate

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
