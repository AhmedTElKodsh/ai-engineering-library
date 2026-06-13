# Reference Behavior: Module 0 Week 2 Production Python

Scaffold: `curriculum/main-track/00-python-foundations/week-02-production-python/workbench.py`

## Intent

This lesson should turn Python basics into maintainable engineering patterns: custom exceptions, validation, context managers, dataclass-like models, pipelines, embeddings, batching, generators, immutable state updates, and nested access.

## Intended Behavior

- Custom exceptions should preserve message, code/status, and details.
- Validation functions should reject missing or out-of-range configuration.
- Context managers should record setup, elapsed time, and cleanup behavior predictably.
- Model and agent helpers should expose inspectable dictionaries and stats.
- Pipeline, vector, batching, streaming, and metadata helpers should be deterministic.

## Reviewer Edge Cases

- `safe_divide` should distinguish division by zero from type errors.
- `Suppress` should catch only configured exception types.
- `EmbeddingVector` equality should include both vector values and model identity.
- `deep_get` should return the default for missing paths and the original object for an empty path.

## Do Not Accept

- Silent mutation of inputs where immutable updates are expected.
- Context managers that skip cleanup on exceptions.
- Iterator helpers that materialize everything when the test expects streaming behavior.
