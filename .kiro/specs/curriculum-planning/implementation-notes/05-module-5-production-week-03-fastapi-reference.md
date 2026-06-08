# Reference Behavior: Module 5 Week 3 Local Service Boundary

Scaffold: `curriculum/05-module-5-production/week-03-fastapi/workbench.py`

## Intent

This lesson should teach service-boundary behavior without requiring a hosted API: health metadata, request validation, advice refusal, structured errors, and success traces.

## Intended Behavior

- Return health metadata for service name/version/status.
- Validate and normalize ticker requests.
- Refuse advice-like requests before analysis.
- Build structured error responses.
- Handle valid service requests with response content and trace.

## Reviewer Edge Cases

- Advice intent should be refused even with a valid ticker.
- Error responses should include machine-readable fields.
- Success traces should show validated request data.

## Do Not Accept

- Real FastAPI server requirement in the starter path.
- Advice responses.
- Unstructured error strings.
