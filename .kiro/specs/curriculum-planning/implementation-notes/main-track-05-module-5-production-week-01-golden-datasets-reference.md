# Reference Behavior: Module 5 Week 1 Golden Datasets

Scaffold: `curriculum/main-track/05-module-5-production/week-01-golden-datasets/workbench.py`

## Intent

This lesson should teach repeatable evaluation before production hardening: golden examples, observed answers, pass/fail categories, and summary reports.

## Intended Behavior

- Load golden examples that cover supported, unsupported, citation, and refusal behavior.
- Evaluate observed answers against expected behavior.
- Fail missing citations when citations are required.
- Summarize pass/fail counts and failure categories.

## Reviewer Edge Cases

- Supported answers without citation should fail.
- Unsupported/advice-like cases should require refusal or abstention.
- Summary counts should match individual evaluation results.

## Do Not Accept

- Only happy-path examples.
- Evaluation rules hidden in prose instead of code.
- Missing failure category evidence.
