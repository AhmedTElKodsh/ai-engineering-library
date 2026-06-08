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
## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capability, new capability, failure caught, FinAgent/practical transfer, and next advanced doorway | Explains the main lesson purpose and transfer | Treats the lesson as disconnected tasks |
| Failure Literacy | Reproduces and explains a realistic failure before or during the fix | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the minimum path and clearly labels optional enrichment | Completes the core task with minor scope drift | Pulls advanced work into the required path or skips core evidence |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
