# Week 02 Hints

Use these only after you have read the failing test and traced the relevant class or function.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when you know the concept but cannot see the exact shape of the behavior.

## Layer 1

Do not solve the whole file at once. Pick one failing test, find the matching function or class in `workbench.py`, and make only that behavior pass.

Before writing anything, answer these three questions:

- What input does the test give this function or object?
- What output, attribute, or exception does the test expect?
- Should this behavior return a value, change object state, raise an exception, or yield values over time?

Then re-run only the test you are working on. When that passes, move to the next failure.

Use the same progression as the README unless a real blocker points elsewhere:

1. Error handling
2. Context managers
3. OOP and inheritance
4. Magic methods
5. Comprehensions
6. Generators
7. Pythonic patterns

Each step builds toward a small production system: first reject bad inputs, then manage lifetimes, then define contracts, then compose and stream behavior.

## Layer 2

### Error Handling

For `safe_divide`, first ask whether the problem is invalid input type or an impossible arithmetic operation. Those are different failure stories and should be visible to the caller.

For `validate_llm_config`, check one field at a time. A useful validation error should help the caller identify which field needs repair.

For `process_api_responses`, keep two lists: one for successful data and one for failures. A failure needs to remember where it appeared in the original list.

Before moving on, check that bad data cannot quietly look like good data.

### Context Managers

For context managers, ask what should happen before the `with` block, after the block, and when the block raises an exception.

`__enter__` usually prepares state and returns the object the learner uses inside `with ... as name`.

`__exit__` receives exception information. Its return value controls whether the exception is suppressed.

Before moving on, explain the lifetime in one sentence: "this resource starts here and always ends here."

### OOP And Inheritance

For `BaseModel`, think about where instance attributes live after construction. `model_dump()` should expose those stored attributes as a dictionary.

For subclasses, the main question is: "Which attributes does the base class already know how to set?" Use the subclass to pass the right fields into that base behavior.

For `BaseAgent` and `RAGAgent`, track the call count on the object. The count changes when `run()` actually performs work.

Before moving on, identify what the base class owns and what the subclass adds.

### Magic Methods

For `__call__`, the object should behave like a function.

For `__or__`, think of a pipeline: the left step runs first, then passes its result into the right step.

For `EmbeddingVector`, compare both the model name and the numeric values. Small floating-point differences should not make two otherwise equal vectors fail.

### Comprehensions

For list comprehensions, describe the sentence first: "for each item, keep or transform this value." Then translate that sentence into a comprehension.

For the category counter, first identify the unique category values, then count how many items belong to each value.

### Generators

Use `yield` when the caller should receive values one at a time instead of waiting for a full list.

For chunking problems, the repeated action is "take the next slice, then move forward by the chunk size."

For Fibonacci, keep only the current pair of numbers. Each yielded value should come before you advance the pair.

Before moving on, confirm that the caller can consume the output step by step.

### Pythonic Patterns

For immutable state updates, the original dictionary should still look the same after the function returns.

For `zip_to_records`, each row becomes one dictionary by pairing headers with values in the same positions.

For `deep_get`, try each path segment in order. If any segment is missing, return the default instead of crashing.

## Layer 3

### Reading The Tests

The tests are written as examples. If a test says `assert len(v) == 3`, the required behavior is not mysterious: the object should report the length of the stored vector values.

If a test uses `with pytest.raises(...)`, the function should raise that exception. Do not return an error string or `None`.

For `validate_llm_config`, read the expected message match carefully. The tests name the field that should be visible in each validation failure.

If a test checks an attribute after a method runs, the method must update object state, not only compute a local value.

If a test wraps a generator in `list(...)`, the function should yield each item in sequence. The final list tells you the expected stream.

### Common Stuck Points

For `__exit__`, returning a truthy value means "I handled this exception; do not raise it again." Returning a falsy value means "let the exception continue."

For pipeline chaining, avoid thinking of `a | b | c` as one big operation. It is built left to right: first combine `a` and `b`, then combine the result with `c`.

For `repr`, match the spirit of the expected string: include the class name and the useful identifying fields. The tests mostly care that representations are predictable and readable.

For `deep_get`, EAFP means "try the direct access and recover if it fails." You do not need to pre-check every possible path shape.

### Final Check

After each small fix, run the matching test. After a section is complete, run the full Week 02 test file. If a later test fails, return to the test's example input and expected output before changing unrelated functions.
