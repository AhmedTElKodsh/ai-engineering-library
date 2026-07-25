# AI Engineering Capability Milestones

The roadmap uses three sequential capability milestones. Each milestone
delivers a complete system and deepens the same engineering layers: software,
models, data, evaluation, security, and operations.

| Milestone | Planning range | Exit question |
| --- | ---: | --- |
| 1. AI Application Implementer | 30-45 hours | Can the learner build, evaluate, expose, and defend one bounded AI application? |
| 2. Production AI Engineer | 80-120 additional focused hours; evidence-gated | Can the learner independently rebuild and operate a second system under realistic constraints? |
| 3. Advanced AI Systems Engineer | no honest fixed mastery clock | Can the learner make and defend architecture decisions under scale, reliability, security, and organizational constraints? |

## Milestone 1 Gates

Every gate must show a runnable artifact, focused verification, at least one
failure or refusal, and a short explanation.

### Gate 0: Readiness

- the environment command runs
- the learner can read a focused pytest failure
- Python gaps are named and routed to repair outside the timed core

### Gate A: Deterministic Baseline

- inputs are validated before processing
- one useful deterministic workflow runs
- normal and rejected-input behavior are tested
- limitations are documented

### Gate B: Model Boundary and Evaluation

- model behavior is isolated behind a fixture-backed boundary
- output is validated before application use
- the first task-specific evaluation set exists
- fixture and live-provider evidence are labelled separately

### Gate C: Grounded Retrieval

- source records preserve provenance
- retrieval behavior is inspectable
- supported answers carry citations
- unsupported questions abstain
- eval evidence distinguishes retrieval and generation failures

### Gate D: Bounded Action

- one tool has typed input/output and least-privilege authority
- denied and malformed calls are tested
- workflow state and termination are visible
- retries are bounded and human escalation is explicit

### Gate E: Implementer Defense

- one documented service boundary is tested over real HTTP
- logs or traces expose relevant request, retrieval, tool, model, and final status
- a local quality command is repeatable
- the learner completes one unfamiliar change
- the demo includes a normal case, edge case, and refusal or abstention
- claims distinguish local, fixture, live, and production evidence

## Milestone 2 Gate

Milestone 2 is complete only after the learner independently builds a second
system with reduced scaffolding and demonstrates production depth such as
async/provider failure handling, persistent data lifecycle, authentication,
automated regression evaluation, deployment, tracing, monitoring, cost control,
and one real MCP client/server integration.

The 80-120 hour range is a planning estimate, not an automatic pass.

## Milestone 3 Gate

Milestone 3 requires operated-project evidence: architecture reviews,
performance and reliability trade-offs, authorization/isolation decisions,
incident or rollback analysis, and evaluation governance. The learner then
develops one or two specializations rather than superficially completing all
advanced topics.

Completion hours alone never prove mastery.
