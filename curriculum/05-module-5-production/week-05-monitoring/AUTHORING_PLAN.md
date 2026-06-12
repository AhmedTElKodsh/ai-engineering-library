# Authoring Plan: Module 5 Week 5

## Scope

Create a local monitoring and review-loop lab over structured log events, failure categories, summaries, and reviewer actions.

This lesson stays local. It does not require cloud dashboards, hosted tracing, alerting vendors, incident-management tooling, or enterprise LLMOps platforms.

## Acceptance Checks

- [x] `README.md` frames monitoring as inspectable evidence before dashboards.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define structured log events, failure categorization, monitoring summaries, and review-loop actions.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates contract correctness, failure handling, trace/evidence quality, scope discipline, FinAgent transfer, and reflection.

## Verification

```powershell
python -m pytest curriculum/05-module-5-production/week-05-monitoring/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: golden evals, release-gate decisions, local service boundaries, and reproducible package/review habits.
- New capability added by this lesson: turn run events into structured logs, actionable failure categories, monitoring summaries, and review-loop actions.
- Failure mode the learner must reproduce, inspect, or prevent: vague or missing traces hide whether a bad AI run failed at citation retrieval, safety refusal, service behavior, or review.
- FinAgent or practical AI-system improvement: FinAgent can explain what went wrong after a bad run instead of leaving only an opaque failed answer.
- Explanation artifact the learner should leave with: a short monitoring note naming the smallest test run, visible failure category, reviewer action, and next stronger check.

## Scope Boundary Enhancement

- Minimum required path: build safe log events, categorize citation and safety failures, summarize category counts, and map categories to review actions.
- Optional enrichment only after the minimum path works: add one extra category for latency, malformed output, permission denial, or unknown failure.
- Advanced doorway, named briefly but not required: hosted tracing, service-level alerts, drift dashboards, automated incident workflows, and enterprise governance programs belong to Course 3.

## Evidence Portfolio Enhancement

- Technical evidence: implementation of structured log-event fields, deterministic failure categorization, category summaries, and review-loop action selection.
- Failure evidence: at least one failed event becomes an actionable category instead of `unknown`.
- Explanation evidence: learner note names what the trace reveals and which review action should happen next.
- Transfer evidence: FinAgent callback showing how monitoring evidence protects cited finance answers, refusals, and release decisions.

## Source Evidence Enhancement

Use `../EVAL_OBSERVABILITY_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B01 `Generative AI in Action`, p.363, p.367, and p.381-382, `B01_B01_P0363_C001`, `B01_B01_P0367_C001`, `B01_B01_P0381_C001`, `B01_B01_P0382_C001` for monitoring, logging, tracing, privacy-sensitive telemetry, cost, human review, and production observability.
- B12 `Designing Machine Learning Systems`, p.323-324, `B12_B12_P0323_C001`, `B12_B12_P0324_C001` for system effects, feedback loops, and deployment-time failures.
- Local PDF `Principles of Building AI Agents`, p.80-83 for traces that expose step-by-step behavior in nondeterministic agent runs.
- Local PDF `Hands-On RAG for Production`, p.68-70 for monitoring, post-deployment issue response, and upgrade evaluation.
- Local PDF `LLMOps`, p.183 and p.205-206 for prompt, retrieval, inference, postprocessing, feedback, token-count, latency, retrieved-document, and version trace fields.
- Local PDF `LLMOps`, p.211, p.218, p.224, and p.229 for privacy/security distinction, LLMSecOps goals, audit artifacts, risk review, and real-world edge-case inspection.

## Assessment Conversion Rule

Each source insight must become one of: a structured log field, pipeline-stage trace, failure category, safe telemetry exclusion, review-loop action, risk note, or learner explanation prompt.
