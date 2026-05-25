# Phase 3: Local FinAgent Request Boundary

Folder: `week-03-deploy`  
Expected time to finish: 3-5 hours  
File to edit: `workbench.py`  
Test folder: `tests/`

## Learning Goal

Wrap the deterministic FinAgent slice in a small local service-style interface so it can be run, inspected, and tested like a deployable system.

## Learner Outcome

By the end of this lesson, you will have a local deployment adapter that:

- validates an incoming request dictionary
- calls a pure analysis function
- returns a structured response dictionary
- includes trace metadata for debugging
- keeps the educational-not-financial-advice disclaimer visible

## Real-World Context

Deployment is not only Docker and cloud hosting. The first deployment skill is drawing a boundary between the core logic and the interface that receives requests. That boundary is what later becomes a CLI command, FastAPI endpoint, MCP tool, or agent node.

## Read

This lesson turns the Phase 1 and Phase 2 ideas into a small service boundary:

1. Receive a request.
2. Validate required fields.
3. Run deterministic analysis.
4. Return a response that is easy to test.
5. Include trace fields so failures can be diagnosed.

The goal is not to build a full web API yet. The goal is to make FinAgent shippable as a local, inspectable unit.

## Trace

Open `workbench.py` and inspect:

- `DeploymentRequest`
- `validate_request`
- `analyze_move`
- `build_response`
- `handle_request`

Before coding, answer:

1. Which function protects the boundary from malformed input?
2. Which function should stay pure and easy to test?
3. Which response fields would help you debug a failed run?
4. Where should the disclaimer live?

## Modify

Run:

```powershell
python -m pytest tests -v
```

Use the first failure as your next task. Fix one function at a time.

## Create

Complete the TODOs in this order:

1. `validate_request`
2. `analyze_move`
3. `build_response`
4. `handle_request`

## Verify

Run:

```powershell
python -m pytest tests -v
```

The workbench is expected to fail before you complete the TODOs.

## Reflect

- Why does deployable code need structured responses?
- Why should request validation happen before analysis?
- What would change if this became a FastAPI route?
- How does this boundary prepare you for MCP tools later?

## Evidence Artifact

Write a boundary note:

```text
Boundary input:
Validation rules:
Pure analysis step:
Response fields:
Trace fields:
Future CLI/API/MCP change:
Remaining risk:
```

## FinAgent Callback

The final capstone needs every capability to be callable from a clean interface. This lesson creates the first version of that boundary without hiding the logic behind a framework.
