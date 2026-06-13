# Authoring Plan: Module 1 Phase 3

## Scope

Create the local FinAgent request/response boundary after execute and modify.

This phase teaches deployment thinking as a local service-style adapter:
request validation, pure analysis, structured response, trace metadata, and
visible safety language.

## Acceptance Checks

- [x] `README.md` frames local deployment as an interface boundary, not cloud
  hosting.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define request validation, malformed request refusal, pure analysis,
  structured responses, trace metadata, and disclaimer preservation.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates boundary clarity, safety, traceability, local run
  evidence, and learner reflection.

## Verification

```powershell
python -m pytest curriculum/main-track/01-module-1-whole-game/week-03-deploy/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic

- Current capability: modify FinAgent logic behind tests.
- New capability: package the deterministic workflow behind a local
  request/response boundary.
- Failure mode: malformed requests, missing fields, unclear response shape, or
  missing trace evidence.
- FinAgent improvement: prepares the slice for CLI, FastAPI, MCP, or workflow
  integration later.
- Explanation artifact: learner explains how local deployment boundary differs
  from business logic.

## Scope Boundary

- Minimum path: validate request, run deterministic analysis, build structured
  response, and include trace and disclaimer fields.
- Optional enrichment: add one malformed request or trace-field edge case.
- Advanced doorway: real web servers, containers, authentication, streaming, and
  cloud deployment stay out of Module 1.
