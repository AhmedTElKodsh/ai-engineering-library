# Authoring Plan: Module 5 Week 5

## Scope

Create a cost, latency, caching, batching, and retry tradeoff lab after
monitoring and before capstone release decisions.

This week teaches learners to optimize from measured constraints. The first
green path should be arithmetic and policy decisions, not external pricing APIs,
queues, hosted caches, or distributed systems.

## Acceptance Checks

- [x] `README.md` frames cost, latency, cache, batch, and retry decisions as
  measurable reliability tradeoffs.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define call-cost math, batch-latency estimation, cache eligibility,
  transient-error retry policy, validation-error refusal, and optimization
  recommendations.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates measured tradeoffs, reliability protection,
  budget reasoning, recommendation clarity, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/main-track/05-module-5-production/week-05-optimization/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: logs, traces,
  monitoring notes, and failure categories from earlier Module 5 work.
- New capability added by this lesson: compare cost, latency, caching, batching,
  and retry choices using small, inspectable calculations and policies.
- Failure mode the learner must reproduce, inspect, or prevent: retrying
  validation errors, caching nondeterministic or empty prompts, ignoring budget
  overruns, or choosing an optimization without evidence.
- FinAgent or practical AI-system improvement: FinAgent optimization choices are
  tied to measured cost/latency constraints instead of vibes.
- Explanation artifact the learner should leave with: a short recommendation
  that names the measured budget issue and the lowest-risk action.

## Scope Boundary Enhancement

- Minimum required path: estimate call cost, estimate batch latency, decide cache
  eligibility, choose retry policy, and build an optimization report.
- Optional enrichment only after the minimum path works: add one extra transient
  failure, cache-risk note, or budget threshold.
- Advanced doorway, named briefly but not required: live pricing APIs, distributed
  queues, semantic caches, load testing, autoscaling, and production tail-latency
  dashboards belong to Course 3 or later production depth.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for cost math, latency math, cache policy,
  retry policy, and budget recommendations.
- Failure evidence: validation errors are not retried and unsafe cache cases are
  rejected.
- Explanation evidence: learner note explains what was optimized and what risk
  remains.
- Transfer evidence: FinAgent callback showing how a cost or latency budget would
  affect release readiness.

## Source Evidence Enhancement

Use `../EVAL_OBSERVABILITY_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B01 `Generative AI in Action`, Chapter 11, p.381-382,
  `B01_B01_P0381_C001`, `B01_B01_P0382_C001` for cost management, human review,
  monitoring, logging, tracing, and LLMOps as production concerns.
- Local PDF `Hands-On RAG for Production`, p.46, p.59, p.61, p.63, and p.68-70
  for latency monitoring, response-quality measurement, KPI thresholds,
  observability, and upgrade/release decisions.
- Local PDF `LLMOps`, p.52, p.54, and p.56-58 for KPIs, SLO/SLA-style
  expectations, cost comparison, and risk notes.
- Local PDF `LLMOps`, p.183 and p.205-206 for token counts, latency, inference
  metadata, and stage-level observability.
- Assessment conversion rule: each source insight must become a cost estimate,
  latency estimate, budget field, retry rule, cache rule, recommendation, or
  learner explanation prompt.
