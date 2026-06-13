# Rubric: Structured Context And Trace Lab

## Runs Correctly

- Valid structured outputs pass validation.
- Missing, malformed, or unsafe fields fail closed.
- Trace metadata is present for success and refusal paths.

## Shows The Core Concept

- Context and outputs are treated as engineering contracts.
- Validation happens before downstream model or tool reliance.
- Failure paths are as deliberate as success paths.

## Explains The Reasoning

- The learner can explain why structured output needs verification.
- The learner can explain what context should be shown to the model and what should remain hidden.

## Handles Edge Cases

- Handles empty context, extra fields, wrong types, and missing source metadata.
- Avoids logging secrets or unsafe raw input.

## Code Is Readable

- Keeps validators small and named by the rule they enforce.
- Keeps trace fields consistent across branches.
## Learning Evidence Add-On

| Evidence | Excellent | Passing | Needs Work |
| --- | --- | --- | --- |
| Learner Logic | Explains current capability, new capability, failure caught, FinAgent/practical transfer, and next advanced doorway | Explains the main lesson purpose and transfer | Treats the lesson as disconnected tasks |
| Failure Literacy | Reproduces and explains a realistic failure before or during the fix | Notes a common failure after tests run | Only reports pass/fail without interpretation |
| Scope Discipline | Completes the minimum path and clearly labels optional enrichment | Completes the core task with minor scope drift | Pulls advanced work into the required path or skips core evidence |
| Portfolio Evidence | Leaves technical, failure, explanation, and transfer evidence | Leaves most evidence types | Leaves no reviewable evidence beyond code |
