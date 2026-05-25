# Hints: Structured Context And Trace Lab

## Hint 1: Validate Shape First

Check required fields and types before checking business meaning.

## Hint 2: Sanitize Inputs Before Prompts

Normalize or reject unsafe context before it enters a prompt template or model-facing message.

## Hint 3: Fail Closed

If a required field is missing, return a structured refusal instead of guessing a default.

## Hint 4: Preserve Debuggable Trace

Trace what changed, what was refused, and which validation rule caused the result.
