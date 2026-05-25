# Rubric: Local Tool Server Contract Lab

## Runs Correctly

- Valid tool calls return structured results.
- Unknown tools and malformed inputs return structured refusals.
- Tests can run without a real MCP server or external API.

## Shows The Core Concept

- Tool inputs and outputs are treated as contracts.
- Dispatcher behavior is explicit and testable.
- Deterministic code remains separate from model behavior.

## Explains The Reasoning

- The learner can explain why a model should not call arbitrary code directly.
- The learner can explain what the server boundary allows, refuses, and logs.

## Handles Edge Cases

- Handles missing fields, wrong types, unsupported tools, and malformed outputs.
- Avoids leaking secrets or internal stack traces.

## Code Is Readable

- Keeps validation, dispatch, and tool implementation understandable.
- Avoids framework magic in the first implementation.
