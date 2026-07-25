# Hints: Local FinAgent Request Boundary

## How To Use This File

Open this only after you have read the failing test or the unclear TODO. Move through the layers in order: identify the failing contract first, then take the smallest hint that lets you continue.

Use these only after you have read the failing test and identified the request-boundary behavior it expects.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when individual helpers pass but the response contract fails.

## Layer 1

Separate boundary work from analysis work. A request handler receives messy outside data; the analyzer should receive clean, trusted values.

Before editing, answer:

- Is this test about validation, analysis, response shape, or trace metadata?
- What input is allowed to reach the stock-summary logic?
- What should happen when request data is missing or malformed?

## Layer 2

### Validation Boundary

Normalize the ticker before checking it. Use the same simple ticker rule from earlier lessons so the deploy boundary agrees with the local FinAgent.

Validation should produce a clear refusal or error shape. Do not let invalid input drift into the calculation layer.

### Response Shape

Return a dictionary because this boundary is preparing learners for JSON responses. Keep keys stable so later tests and clients can rely on them.

Trace metadata can be simple. It should answer what operation ran, what source was used, and whether the result succeeded.

Read `build_response` as packaging, not analysis. The request already carries the trusted ticker and source; the analysis dictionary already carries movement data. This function should assemble those pieces into:

- machine-readable fields callers can inspect directly
- one human-readable summary
- one trace dictionary for debugging
- one disclaimer that always travels with the answer

If you feel tempted to parse the summary later, that is a sign the field belongs in `analysis` or `trace` instead.

### Example Contract

Input objects:

```python
request = DeploymentRequest("MSFT", 100.0, 102.5, "lesson fixture")
analysis = {"change_percent": 2.5, "movement": "up", "risk": "watchlist"}
```

Expected response shape:

```python
{
    "ticker": "MSFT",
    "analysis": analysis,
    "summary": "human-readable sentence that includes MSFT and 2.50%",
    "trace": {
        "operation": "finagent.local_analysis",
        "source": "lesson fixture",
        "status": "ok",
    },
    "disclaimer": "text that includes not financial advice",
}
```

The exact summary wording is less important than the stable fields. Future CLI, API, or MCP callers should read `ticker`, `analysis`, and `trace` directly instead of scraping values out of the sentence.

## Layer 3

### Reading The Tests

If a valid request fails, compare the cleaned values sent into the analyzer with the raw request values.

If an invalid request fails, check whether the code refused early enough.

If a trace assertion fails, add only the missing diagnostic fact instead of rewriting the main response.

### Final Check

Run validation tests first, then response-shape tests. The boundary is done when clean requests succeed and malformed requests never reach analysis.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system

## Function Hint Index

Use these anchors from `workbench.py` when a TODO points here. They are stable targets, so learners can jump from a function to its matching hint section without relying on brittle line numbers.

### validate_request

Use this hint entry for `validate_request`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### analyze_move

Use this hint entry for `analyze_move`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### build_response

Use this hint entry for `build_response`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.

### handle_request

Use this hint entry for `handle_request`. First read the function docstring and the nearest TODO, then compare the expected input and output shape in the tests.
