# Week 01: FinAgent Intake Mini-Project

**Time estimate:** 2-3 hours  
**Goal:** repair Python gaps by building the small intake, routing, prompt, and retry habits FinAgent needs.

This chapter is not filler and it is not a worksheet of right answers. Treat it like a mini-project: every function is a small part of a future FinAgent intake layer. If a concept is rusty, review the concept first, then return to the failing test and implement the behavior yourself.

## Project Story

FinAgent will eventually receive messy user inputs, ticker symbols, configuration, source snippets, and model-facing prompts. Before that system can be trusted, the Python underneath it must do small things reliably:

- identify data shapes
- convert text safely
- build readable prompts
- chunk and group records
- route requests
- retry unreliable operations

## Progression From Week 00

Use Week 01 when the diagnostic points to everyday Python gaps. The order is intentional:

1. Start with values and types so inputs become predictable.
2. Move to strings because predictable values become prompts and summaries.
3. Move to collections because prompts, sources, and records arrive in batches.
4. Move to control flow because FinAgent must route different requests safely.
5. End with functions and decorators because later systems reuse retry, cache, and counter patterns.

Each section gives you a smaller version of behavior that appears again in Module 1 and the Week 03 stock pipeline.

## What You Will Implement

| Section | Functions | Real Use |
| --- | --- | --- |
| Types and data | `classify_type`, `safe_convert_to_int`, `build_profile`, `calculate_stats` | schemas, parsed model output, metric aggregation |
| Strings and prompts | `format_greeting`, `build_prompt`, `truncate` | prompt templates and context-window limits |
| Collections | `chunk_list`, `merge_configs`, `group_by_key`, `unique_sources` | batching, metadata, retrieved-source handling |
| Control flow | `fizzbuzz`, `route_request`, `is_valid_temperature` | request routing and config validation |
| Functions | `apply_discount`, `memoize`, `retry`, `make_counter` | caching, retries, closures, reusable behavior |

## How To Learn When You Get Stuck

Use `../concept-review-map.md` before asking for or searching for a complete answer.

1. Name the failing test.
2. Match it to the concept: type conversion, strings, lists, dictionaries, decorators, or pytest.
3. Review the linked official reference.
4. Write the review note from the template.
5. Make the smallest code change and rerun the focused test.

This is deliberate practice. The best answer is the one you can explain and adjust later when FinAgent becomes more complex.

## How To Work

Run:

```powershell
python -m pytest week-01-python-essentials -v
```

Then open `workbench.py` and replace one `pass` at a time. Do not try to solve the whole file in one pass. Let the tests guide your next change.

Recommended working loop:

1. Pick the first failing test in one section.
2. Read the test and predict the intended behavior in plain English.
3. Read only the matching function docstring in `workbench.py`.
4. Use `hints.md` if the next step is unclear.
5. Change one behavior.
6. Re-run the focused test.
7. Write one review note if you had to revisit a concept.

Tiny flow trace:

| Signal | Learner action | Output |
| --- | --- | --- |
| failing test name | find the matching function | one behavior target |
| unclear concept | use `../concept-review-map.md` | two-sentence review note |
| clear expected behavior | edit one TODO | focused test result |
| focused test passes | move to the next section | steady progress without answer hunting |

Focused test pattern:

```powershell
python -m pytest week-01-python-essentials/test_chapter_01.py -k safe_convert_to_int -v
```

## Core Ideas

### Types Are Routing Signals

AI systems constantly route data based on type: string prompts, numeric scores, boolean flags, dictionaries of metadata. `classify_type` teaches that even simple checks have edge cases, such as `bool` being a subclass of `int`.

### Strings Become Prompts

The prompt patterns in this chapter are intentionally plain. Later modules may use framework helpers, but underneath them you are still composing structured text from variables.

### Collections Become Pipelines

Chunking, grouping, merging, and deduplicating are the backbone of RAG and data processing. Practice these with small lists before they appear as documents, embeddings, and citations.

### Functions Become System Boundaries

`memoize` and `retry` are small here, but they become caching and network resilience later. A decorator is not magic; it is a function that wraps another function.

## Done Criteria

You are done when:

- all Week 01 tests pass
- your review notes name any concept you had to revisit
- you can explain why `bool` must be checked before `int`
- you can explain how `build_prompt` maps to RAG prompts
- you can explain how `retry` would protect an unreliable API call
- you can point to one function that should stay deterministic even after AI features are added

## Optional Review References

- Python tutorial: https://docs.python.org/3/tutorial/
- Python data structures: https://docs.python.org/3/tutorial/datastructures.html
- Python errors and exceptions: https://docs.python.org/3/tutorial/errors.html
- Python functools: https://docs.python.org/3/library/functools.html
- Pytest assertions: https://docs.pytest.org/en/stable/how-to/assert.html
- Visual pytest walkthrough: https://realpython.com/pytest-python-testing/
