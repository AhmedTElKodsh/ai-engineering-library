# Week 01 Hints

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the failing test and can name the function under test.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when you understand the concept but cannot see the expected behavior.

## Layer 1

Pick one failing test and trace only the function it names. Do not try to solve the whole file at once.

Before editing, answer:

- What input does the test provide?
- What exact output or exception does it expect?
- Is the function supposed to transform one value, filter a collection, summarize data, or wrap another function?

Then make the smallest change that should satisfy that test and run it again.

Work through the sections in this order unless a specific diagnostic gap tells you otherwise:

1. Values and types
2. Strings and prompts
3. Collections
4. Control flow
5. Functions and decorators

This order matters because later functions assume the earlier habits: clean values make clean strings, clean strings and records make useful collections, and small pure functions make retry/cache wrappers easier to reason about.

## Layer 2

### Values And Types

For type checks, be careful with `bool`. In Python, booleans can behave like integers in comparisons, so the order of checks matters.

For string cleanup, think about whitespace, casing, and empty values before you handle the "normal" case.

For numeric functions, separate invalid inputs from valid edge cases. A value can be the right type and still fail a lesson rule.

Checkpoint before moving on: can you explain what the function does for a normal value, an edge value, and a value it should reject?

### Collections

For list and dictionary tasks, write the sentence first: "for each item, keep this value" or "for each item, count this category."

A loop is a good first draft. A comprehension is only better after the behavior is already clear.

For aggregation, decide what the starting value should be before the loop begins.

Checkpoint before moving on: can you point to the data you are preserving for later FinAgent summaries or source tracking?

### Functions And Decorators

For decorators, the outer function receives the original function and returns a wrapper. The wrapper is where before/after behavior belongs.

The wrapped function should still receive the arguments the caller passed. If the test checks the original return value, preserve it.

Checkpoint before moving on: can you say what behavior belongs outside the original function and what behavior must remain unchanged?

## Layer 3

### Reading The Tests

If the test checks one simple input/output pair, make that case work first, then generalize.

If the test checks that the original collection did not change, return a new value instead of mutating the input.

If a decorator test checks call counts or logging, focus on what happens around the original function call.

### Final Check

After each small fix, re-run the matching test. After a section passes, run the full Week 01 test file and confirm no earlier behavior regressed.
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

### classify_type

Use this hint entry for `classify_type`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### safe_convert_to_int

Use this hint entry for `safe_convert_to_int`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_profile

Use this hint entry for `build_profile`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### calculate_stats

Use this hint entry for `calculate_stats`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### format_greeting

Use this hint entry for `format_greeting`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_prompt

Use this hint entry for `build_prompt`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### truncate

Use this hint entry for `truncate`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### chunk_list

Use this hint entry for `chunk_list`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### merge_configs

Use this hint entry for `merge_configs`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### group_by_key

Use this hint entry for `group_by_key`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### unique_sources

Use this hint entry for `unique_sources`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### fizzbuzz

Use this hint entry for `fizzbuzz`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### route_request

Use this hint entry for `route_request`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### is_valid_temperature

Use this hint entry for `is_valid_temperature`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### apply_discount

Use this hint entry for `apply_discount`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### memoize

Use this hint entry for `memoize`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### retry

Use this hint entry for `retry`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### make_counter

Use this hint entry for `make_counter`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
