# Reference Behavior: Module 5 Week 2 CI Regression Gate

Scaffold: `curriculum/main-track/05-module-5-production/week-02-cicd/workbench.py`

## Intent

This lesson should turn eval output and version notes into a repeatable CI-style release gate.

## Intended Behavior

- Load eval run counts and failure categories.
- Load version notes for prompt, model, index, and code versions.
- Compute pass rate rounded to one decimal place.
- Pass clean evals with complete version notes.
- Fail low score or known failure categories.
- Build rerunnable command checklists and gate reports.

## Reviewer Edge Cases

- Missing version fields should block release.
- Failure categories should appear in reports.
- Pass-rate rounding should be stable.

## Do Not Accept

- Gates that pass despite known failures.
- Reports without version information.
- Commands that cannot run from repo root.
