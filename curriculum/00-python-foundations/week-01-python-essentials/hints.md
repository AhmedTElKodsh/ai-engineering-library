# Week 01 Hints

Use these only after you have read the failing test and can name the function under test.

## Layer 1

Start with the smallest possible behavior. If the test names one input and one expected output, make that case work before generalizing.

## Layer 2

For type checks, handle `bool` before `int`. In Python, `True` behaves like `1` in some comparisons, so ordering matters.

For collection tasks, write a short loop first. Convert to a comprehension only after the loop is correct.

## Layer 3

For decorators, remember that the outer function receives the original function and returns a wrapper. The wrapper should call the original function and preserve the behavior the tests expect.
