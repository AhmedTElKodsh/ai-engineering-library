# Phase 4 Hints

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

## Layer 1

Start with `estimate_tokens`. The budget tests are easier when token counting is predictable.

## Layer 2

For context selection, sort by priority descending. Add an item only when its token count still fits the remaining budget.

## Layer 3

Stable softmax subtracts the largest scaled logit before exponentiating.
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

### estimate_tokens

Use this hint entry for `estimate_tokens`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### select_context

Use this hint entry for `select_context`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### softmax

Use this hint entry for `softmax`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### decode_next_token

Use this hint entry for `decode_next_token`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### choose_model_strategy

Use this hint entry for `choose_model_strategy`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
