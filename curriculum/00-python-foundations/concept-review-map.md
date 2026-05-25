# Python Concept Review Map

Use this file when a test failure shows a concept gap. The goal is not to find the right answer to paste into `workbench.py`. The goal is to review the smallest concept you are missing, return to the failing test, and implement the behavior yourself.

## How To Use This Map

1. Read the failing test name and assertion.
2. Match the failure to one concept below.
3. Review the short official reference or tutorial.
4. Write a two-sentence note: what the concept does, and how the test is asking you to use it.
5. Return to `workbench.py` and make the smallest useful change.

## Concept References

| If you are stuck on... | Review this | Best-practice checkpoint |
| --- | --- | --- |
| Types and conversions | Python docs: Built-in Types, `int`, `float`, `str`, `bool` | Validate before converting when input may be messy. Remember `bool` is a subclass of `int`. |
| Strings and formatting | Python docs: f-strings and string methods | Keep user-facing text explicit, source-aware, and easy to test. |
| Lists and dictionaries | Python tutorial: data structures | Prefer clear loops while learning. Use comprehensions only when the result stays readable. |
| Grouping records | Python docs: dictionaries and `collections.defaultdict` | Preserve enough metadata so later FinAgent summaries can cite where data came from. |
| Functions | Python tutorial: defining functions | Keep functions small, named for behavior, and covered by one focused test. |
| Decorators and closures | Python docs: function definitions and `functools.wraps` | A decorator should preserve the wrapped function's behavior and make retry/cache behavior visible. |
| Exceptions | Python tutorial: errors and exceptions | Raise specific errors when bad data would make a later answer misleading. |
| Context managers | Python docs: `with` statement and contextlib | Use `with` for files, timers, sessions, and temporary resources that must close reliably. |
| Classes and dataclasses | Python docs: classes and `dataclasses` | Use classes when a concept has named fields and behavior, not just to make code look formal. |
| Generators | Python tutorial: generators and `yield` | Use generators for streaming or large sequences when you do not need all values at once. |
| Pytest failures | Pytest docs: assertions and test discovery | Read the first failure as feedback about one behavior, not as a score on your ability. |

## Recommended References

- Python tutorial: https://docs.python.org/3/tutorial/
- Python built-in types: https://docs.python.org/3/library/stdtypes.html
- Python data structures: https://docs.python.org/3/tutorial/datastructures.html
- Python errors and exceptions: https://docs.python.org/3/tutorial/errors.html
- Python classes: https://docs.python.org/3/tutorial/classes.html
- Python dataclasses: https://docs.python.org/3/library/dataclasses.html
- Python contextlib: https://docs.python.org/3/library/contextlib.html
- Python functools: https://docs.python.org/3/library/functools.html
- Pytest getting started: https://docs.pytest.org/en/stable/getting-started.html
- Pytest assertions: https://docs.pytest.org/en/stable/how-to/assert.html

## Review Note Template

```text
Failing test:
Concept I reviewed:
What the concept does:
What this test expects:
Smallest change I will try:
```

