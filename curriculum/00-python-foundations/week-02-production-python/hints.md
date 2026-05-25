# Week 02 Hints

Use these only after you have read the failing test and traced the relevant class or function.

## Layer 1

Do not solve the whole file at once. Pick one failure, implement one behavior, then re-run that specific test.

## Layer 2

For custom exceptions, make invalid states loud. A clear error now is safer than a misleading result later.

For context managers, ask what should happen before the block, after the block, and when the block raises an exception.

## Layer 3

For `__or__`, think of a pipeline: the left step runs first, then passes its result into the right step.

For generators, use `yield` when the caller should receive values one at a time instead of waiting for a full list.
