# Week 02: Python for Production

**Time estimate:** 3-4 hours  
**Goal:** practice the intermediate-to-advanced Python patterns that make real systems reliable.

Week 01 taught you to transform data. Week 02 teaches you to build code that survives messy inputs, failures, resource cleanup, object composition, and streaming.

Use this week only when the diagnostic, Module 1, or the stock pipeline shows that these production Python habits need reinforcement. It is a targeted repair lab, not a required detour for every learner.

## Progression From Week 01

Week 02 raises the reliability bar one step at a time:

1. Error handling teaches code to fail clearly instead of hiding bad inputs.
2. Context managers teach resource lifetime before you touch files, sessions, or tracing spans.
3. Classes teach stable contracts for clients, tools, documents, and agents.
4. Magic methods teach small composable objects without framework magic.
5. Comprehensions and generators teach batch and streaming data flow.
6. Pythonic state updates teach audit-friendly transformations for workflows.

Do not use this as a syntax checklist. Use it when a real task shows that one of these habits needs practice.

## Choose Your Repair Lane

You do not need to complete every lane before returning to the main curriculum. Pick the lane that matches the friction you saw in the diagnostic, Module 1, or Week 03.

| Lane | Use it when you struggle with... | Sections to focus on |
| --- | --- | --- |
| Reliability | bad inputs, unclear failures, partial API results | error handling |
| Objects | classes, inheritance, reusable agent or document shapes | OOP and magic methods |
| Streaming | yielding values, chunking batches, memory-friendly loops | generators and comprehensions |
| State | updating dictionaries without surprise mutation | Pythonic patterns |

Finish one lane, then return to the project that exposed the gap. Week 02 is a repair bench, not a wall around Module 1.

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

Expected first run: many tests should fail because this optional repair lab is
mostly TODOs. Use the failure list to choose a repair lane; you do not need to
finish every lane before returning to the main curriculum.

Open `workbench.py`. Implement one behavior at a time. If a test fails, read the assertion message and fix the concept it names.

If the concept itself is unclear, pause and use `../concept-review-map.md`. Review the relevant Python reference, write a short note, then return to the smallest failing test. Do not use the reference as a source of code to paste.

Recommended working loop:

1. Choose one production habit from the table above.
2. Run the full week once to see the current failure shape.
3. Re-run one focused test for that habit.
4. Before editing, predict which class or function the test exercises and what contract it expects.
5. Use `hints.md` for the next question to ask, not for a finished implementation.
6. Make one change and re-run the focused test.
7. Explain how the habit would protect a later FinAgent feature.

Tiny flow trace:

| Production signal | Contract question | Implementation target |
| --- | --- | --- |
| bad input | should this raise, skip, or record a failure? | validation or exception path |
| resource lifetime | what starts and what must always close? | context manager methods |
| object behavior | what state does the object own? | constructor, method, or representation |
| stream behavior | what should arrive one item at a time? | generator or batching function |

## Section Checkpoints

Use one checkpoint at a time. When a checkpoint passes and you can explain the
habit, return to the project that exposed the gap.

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Error handling | `python -m pytest week-02-production-python/test_chapter_02.py -k "ValidationError or APIError or safe_divide or validate_llm_config or process_api_responses" -v` | explain when bad data should raise instead of returning a placeholder |
| Context managers | `python -m pytest week-02-production-python/test_chapter_02.py -k "timer or suppress or managed_resource" -v` | explain what opens, what closes, and whether exceptions are suppressed |
| Objects and composition | `python -m pytest week-02-production-python/test_chapter_02.py -k "base_model or document_schema or agent or step or pipeline or embedding_vector" -v` | explain how object contracts support clients, tools, agents, and chains |
| Batch and streaming | `python -m pytest week-02-production-python/test_chapter_02.py -k "batch_embed or filter_by_score or metadata_index or count_by_category or stream_tokens or batch_generator or document_pipeline or fibonacci" -v` | explain why generators and comprehensions help with large or streaming data |
| State patterns | `python -m pytest week-02-production-python/test_chapter_02.py -k "update_state or zip_to_records or indexed_chunks or deep_get" -v` | explain how to update workflow state without surprise mutation |

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
- Visual context-manager guide: https://realpython.com/python-with-statement/
- Generator walkthrough: https://realpython.com/introduction-to-python-generators/
