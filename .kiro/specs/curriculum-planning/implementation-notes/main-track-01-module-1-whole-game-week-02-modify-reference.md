# Reference Behavior: Module 1 Week 2 FinAgent Risk Signal Extension

Scaffold: `curriculum/main-track/01-module-1-whole-game/week-02-modify/workbench.py`

## Intent

This lesson should teach learners to modify an existing product slice by adding risk labeling and richer but still safe summary language.

## Intended Behavior

- Assign risk labels from absolute percentage movement.
- Format percentages with two decimal places and a percent sign.
- Build a risk-aware summary that includes ticker, direction, risk label, and educational caveat.

## Reviewer Edge Cases

- Negative and positive moves with the same magnitude should receive the same risk label.
- Boundary values should follow the documented threshold rules.
- Summary language should not imply personalized advice.

## Do Not Accept

- Rewriting Week 1 wholesale instead of extending the new behavior.
- Risk labels based only on direction.
- Missing disclaimer or uncertainty language.
