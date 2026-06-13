# Reference Behavior: Module 1 Week 3 Local FinAgent Request Boundary

Scaffold: `curriculum/main-track/01-module-1-whole-game/week-03-deploy/workbench.py`

## Intent

This lesson should package the deterministic FinAgent analysis behind a local request/response boundary without introducing hosted infrastructure.

## Intended Behavior

- Validate request payloads and normalize ticker/price fields.
- Reject malformed payloads with structured errors.
- Analyze movement and risk using deterministic rules.
- Return a structured response with summary, trace, and safe educational language.
- Compose the full flow in `handle_request`.

## Reviewer Edge Cases

- Missing fields should produce clear validation failures.
- Bad numeric fields should not reach analysis.
- Response trace should expose enough information to debug the request.

## Do Not Accept

- Real servers, network calls, or platform dependencies.
- Unstructured string-only responses.
- Responses that hide validation errors behind generic messages.
