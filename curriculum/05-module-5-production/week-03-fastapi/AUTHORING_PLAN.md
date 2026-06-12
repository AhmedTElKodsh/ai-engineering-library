# Authoring Plan: Module 5 Week 3

## Scope

Create a local service-boundary lab after CI-style release gates and before
packaging or deployment work.

This week teaches FastAPI-style request and response contracts with plain
Python first: health metadata, input validation, ticker normalization, unsafe
advice refusal, structured errors, and traceable success responses. The lesson
must not require a running web server for the first green path.

## Acceptance Checks

- [x] `README.md` frames health, validation, structured errors, success
  responses, and trace fields as the API boundary.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define health metadata, ticker normalization, advice refusal,
  structured error response, and traceable success output.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates service contract clarity, validation, safety,
  error shape, traceability, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/05-module-5-production/week-03-fastapi/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: golden evals,
  version notes, release gates, and CI-style command evidence from Weeks 1-2.
- New capability added by this lesson: shape local service contracts that callers
  can depend on before adding a real framework route.
- Failure mode the learner must reproduce, inspect, or prevent: malformed
  payloads, advice-seeking prompts, unnormalized tickers, unstructured errors,
  or success responses with no trace.
- FinAgent or practical AI-system improvement: FinAgent gains a safe request
  boundary before any API, CLI, or hosted service exposes its behavior.
- Explanation artifact the learner should leave with: a short note explaining
  what the boundary validates, what it refuses, and which trace field would help
  debug a bad request.

## Scope Boundary Enhancement

- Minimum required path: implement health metadata, validate one local payload,
  normalize ticker symbols, refuse advice requests, return structured error
  responses, and include a trace in successful responses.
- Optional enrichment only after the minimum path works: add one extra validation
  case such as empty questions, unsupported ticker format, or missing payload
  fields.
- Advanced doorway, named briefly but not required: real FastAPI routes, auth,
  rate limiting, streaming, hosted deployment, OpenAPI schemas, and distributed
  tracing belong to later production depth unless a bounded Course 1 lab adds
  them explicitly.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for health, validation, refusal, error shape,
  and success trace behavior.
- Failure evidence: unsafe advice requests and malformed payloads fail with
  clear, machine-readable responses.
- Explanation evidence: learner note names the service contract and how it
  protects downstream callers.
- Transfer evidence: FinAgent callback showing how local request boundaries
  preserve the finance safety contract before deployment.

## Source Evidence Enhancement

Use `../EVAL_OBSERVABILITY_EVIDENCE_CHECKLIST.md` before changing this lesson.
Use `../../../FINANCE_SAFETY.md` for finance-domain refusal boundaries.

- B10 `LLM Engineer's Handbook`, Chapter 7, p.300-303,
  `B10_B10_P0300_C001`, `B10_B10_P0302_C001`, `B10_B10_P0303_C001` for small,
  repeatable evaluation and monitoring evidence before production claims.
- B12 `Designing Machine Learning Systems`, production-system evidence baseline
  from the ledger for making system behavior observable, testable, and
  reviewable.
- Local PDF `LLMOps Managing Large Language Models in Production`, p.163-164 and
  p.167 for API error handling, input validation, security, monitoring, and
  logging as production boundary concerns.
- Local PDF `LLMOps Managing Large Language Models in Production`, p.205-206 for
  tracing prompt/model/version and inference metadata when debugging
  regressions.
- Local PDF `Principles of Building AI Agents`, p.105 and p.109 for step traces,
  observability, and evaluation as part of debuggable AI behavior.
- Assessment conversion rule: each source insight must become a validation rule,
  refusal case, structured error field, trace field, health metadata field, or
  learner explanation prompt.
