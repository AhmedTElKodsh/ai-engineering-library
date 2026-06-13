# Python Foundations to AI Engineering Connections

Every Module 0 unit maps directly to later AI engineering work. Use this file when you need to explain why a Python exercise matters.

## Week 00: Diagnostic Inventory

**Later use:** every module requires reading test output, identifying failures, and choosing the next smallest fix.

**Transfer question:** when pytest fails, can you tell whether the problem is setup, import, assertion, or design?

## Week 01: Python Essentials

Week 01 is now framed as the FinAgent intake mini-project. The learner should use `concept-review-map.md` when a test exposes a Python gap, then return to implementation rather than searching for a finished answer.

| Python practice | Later use |
| --- | --- |
| type checks and conversion | structured tool inputs, model output parsing, API schemas |
| strings and formatting | prompts, educational summaries, logs |
| lists, dictionaries, and sets | JSON payloads, metadata, retrieved chunks, citation lists |
| control flow | request routing, fallback logic, agent stop conditions |
| functions and closures | pytest fixtures, retry wrappers, cache helpers, LangGraph nodes |
| decorators | tracing, retries, memoization, rate-limit protection |

**FinAgent callback:** Week 01 gives you the raw tools for validating ticker input, formatting a safe summary, and grouping rows by source or symbol.

**Review habit:** each hard test should produce a short concept note: failing test, concept reviewed, what the concept does, expected behavior, and smallest next change.

## Week 02: Production Python Reinforcement

| Python practice | Later use |
| --- | --- |
| custom exceptions | malformed tool calls, bad market data, provider failures |
| context managers | files, database sessions, temporary resources, tracing spans |
| classes and inheritance | clients, tools, agents, domain models |
| magic methods | chain composition, vector-like objects, readable debug output |
| comprehensions | embedding batches, retrieval filters, metric summaries |
| generators | streaming LLM responses, large document pipelines, batch processing |
| immutable state updates | graph state, workflow snapshots, audit-friendly transformations |

**FinAgent callback:** Week 02 is optional reinforcement. Use it when Module 1 or the stock pipeline reveals gaps in reliability habits.

## Week 03: Post-Module-1 Stock Research Pipeline

The stock pipeline is the required bridge after Module 1. It combines:

- CSV fixture loading
- typed financial rows
- validation errors
- grouping and metrics
- generator-based report lines
- source-aware educational disclaimers
- tests for normal and failure paths

**Later use:** the same functions can become FinAgent tools, MCP adapters, RAG source loaders, or production pipeline steps.

## Extension: AI Client Simulator

The AI-client simulator is optional extra practice for:

- provider configuration
- prompt building
- retries
- streaming
- response parsing
- batch processing

**Later use:** Modules 3 and 4 revisit these ideas with real tool contracts, retrieval, and agent workflows.

## Summary

The entry gate is complete when the student can run the diagnostic and complete Week 01 if needed. The bridge is complete when the student finishes Module 1 and then uses the stock pipeline to show that Python patterns help FinAgent stay testable, source-aware, and honest about its limits.
