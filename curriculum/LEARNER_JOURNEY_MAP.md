# AI Engineering Learner Journey

This is a roadmap toward mastery, not a claim that mastery can be completed by
finishing a fixed list of lessons.

## Roadmap Shape

The milestones are sequential capability gates. Inside each milestone, the
learner builds vertical slices across software, models, data, evaluation,
security, and operations. The same layers deepen instead of waiting in separate
queues.

| Engineering layer | Milestone 1: Implementer | Milestone 2: Production Engineer | Milestone 3: Advanced Systems Engineer |
| --- | --- | --- | --- |
| Software | functions, schemas, tests, explicit workflow | async, architecture, packaging, independent second build | scale, maintainability, team and platform decisions |
| Models | one provider boundary, structured output | routing, fallbacks, streaming, model selection | inference strategy and model adaptation decisions |
| Data and retrieval | controlled sources, provenance, basic RAG | persistent lifecycle, advanced retrieval and evaluation | large-scale search and knowledge architecture |
| Evaluation | small task-specific dataset introduced early | automated regression and human calibration | evaluation governance and judge calibration |
| Security | validation, least privilege, refusal, human gate | auth, privacy, secrets, threat modelling | isolation, compliance, adversarial resilience |
| Operations | local service, trace, version and cost evidence | deployment, monitoring, caching, CI/CD | SLOs, incidents, recovery, capacity and economics |
| Agency | one explicit bounded workflow | evaluated agent or MCP integration when justified | complex autonomy only where evidence supports it |

## Milestone 1: AI Application Implementer

**Planning range:** 30-45 focused hours.

The learner builds, tests, evaluates, exposes, and defends one bounded,
source-grounded application.

Minimum evidence:

- deterministic baseline with validated inputs
- fixture-backed provider and structured output
- task-specific evaluation cases
- retrieval with citations and abstention
- one least-privilege tool
- one visible workflow with bounded retry and human escalation
- one tested local HTTP boundary
- trace, version, cost/latency, limitation, and transfer evidence

Exit level: guided junior implementer. This is not production readiness or
mastery.

## Milestone 2: Production AI Engineer

**Planning range:** 80-120 additional focused hours, with evidence-gated
completion.

The learner independently builds and operates a second application with reduced
scaffolding. Depth includes provider failure handling, persistent data
lifecycle, advanced retrieval and evaluation, authentication and privacy,
deployment, tracing, monitoring, cost controls, CI/CD, reproducible packaging,
and one real MCP client/server integration.

Exit level: credible junior production practitioner.

## Milestone 3: Advanced AI Systems Engineer

There is no honest fixed-hour mastery promise.

Common evidence includes architecture reviews, multi-provider strategy,
evaluation governance, reliability and incident analysis, authorization and
isolation, performance and inference economics, and decisions under ambiguous
constraints.

The learner then chooses one or two specializations:

- agentic systems
- RAG, search, and knowledge systems
- LLMOps and platform engineering
- model adaptation
- multimodal systems
- AI safety and security

Completion requires operated-project evidence and defensible judgment, not
exposure to every specialization.

## Learning Loop

Across all milestones:

1. inspect
2. predict
3. run
4. implement
5. verify
6. explain
7. transfer

Scaffolding fades over time: Milestone 1 exposes contracts and progressive
hints, Milestone 2 provides thinner behavioral requirements, and Milestone 3
uses ambiguous constraints, architecture review, and operational failures.
