# Week 02: Python for Production

**Time estimate:** 3-4 hours  
**Goal:** practice the intermediate-to-advanced Python patterns that make real systems reliable.

Week 01 taught you to transform data. Week 02 teaches you to build code that survives messy inputs, failures, resource cleanup, object composition, and streaming.

Use this week only when the diagnostic, Module 1, or the stock pipeline shows that these production Python habits need reinforcement. It is a targeted repair lab, not a required detour for every learner.

## What You Will Implement

| Section | Concepts | Real Use |
| --- | --- | --- |
| Error handling | custom exceptions, validation, partial failure processing | LLM API errors, malformed tool input, batch failures |
| Context managers | `__enter__`, `__exit__`, cleanup, suppression | file handles, database sessions, tracing spans |
| OOP and inheritance | base classes, `super()`, model dumps, agent classes | schemas, agent interfaces, reusable clients |
| Magic methods | `__call__`, `__or__`, `__len__`, `__getitem__` | chain composition, vectors, pipeline objects |
| Comprehensions | filtering, indexing, counts | embedding batches and retrieved-document filtering |
| Generators | `yield`, lazy batches, streaming | token streaming and memory-efficient processing |
| Pythonic patterns | unpacking, `zip`, `enumerate`, EAFP | immutable state updates, nested config access |

## How To Work

Run:

```powershell
python -m pytest week-02-production-python -v
```

Open `workbench.py`. Implement one behavior at a time. If a test fails, read the assertion message and fix the concept it names.

If the concept itself is unclear, pause and use `../concept-review-map.md`. Review the relevant Python reference, write a short note, then return to the smallest failing test. Do not use the reference as a source of code to paste.

## Key Ideas

### Validation Is a Product Feature

Bad model configuration, invalid prices, and malformed API responses should fail clearly. Silent defaults often create worse downstream errors.

### Context Managers Define Lifetimes

The `with` statement makes resource lifetime visible. Later, the same pattern appears in file processing, database sessions, observability spans, and temporary configuration.

### Objects Carry Contracts

Classes such as `BaseAgent`, `RAGAgent`, `Step`, and `EmbeddingVector` are small practice versions of real AI engineering abstractions. They should have clear attributes, predictable methods, and useful representations.

### Generators Are Streaming

When you write `yield`, you are practicing the same control flow used by streaming model responses and large document pipelines.

## Done Criteria

You are done when:

- all Week 02 tests pass
- you can name which production Python habit you needed to repair
- you can explain the difference between raising and suppressing exceptions
- you can explain why `Step("a") | Step("b")` creates a pipeline
- you can explain why generators are useful for streaming and large data

## Optional Review References

- Python errors and exceptions: https://docs.python.org/3/tutorial/errors.html
- Python classes: https://docs.python.org/3/tutorial/classes.html
- Python dataclasses: https://docs.python.org/3/library/dataclasses.html
- Python contextlib: https://docs.python.org/3/library/contextlib.html
- Python iterators and generators: https://docs.python.org/3/tutorial/classes.html#iterators
