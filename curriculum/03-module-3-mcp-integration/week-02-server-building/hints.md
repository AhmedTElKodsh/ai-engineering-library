# Hints: Local Tool Server Contract Lab

## Hint 1: Name The Tool Before The Code

A clear tool contract starts with a stable name, input fields, output fields, and refusal cases.

## Hint 2: Validate Before Dispatch

The dispatcher should reject unknown tool names and malformed input before calling any implementation.

## Hint 3: Return Structured Errors

An error response should be useful to the caller without exposing internal details or secrets.

## Hint 4: Trace The Boundary

Record which tool was requested, whether validation passed, which branch ran, and whether output validation passed.
