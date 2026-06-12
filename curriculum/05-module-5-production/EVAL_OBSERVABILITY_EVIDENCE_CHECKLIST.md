# Eval and Observability Evidence Checklist

Use this checklist before creating or revising a Module 5 lesson that adds golden datasets, eval summaries, release gates, logs, traces, monitoring plans, cost/latency notes, or production review loops.

This file is an authoring aid. It keeps Course 1 production work concrete: a learner should produce evidence a teammate can rerun, inspect, and use to make a release decision.

## Source Evidence Baseline

| Source | Evidence locator | Planning takeaway | Use in Module 5 |
|---|---|---|---|
| B01 `Generative AI in Action` | Chapter 12, p.403, `B01_B01_P0403_C001` | LLM evaluation can be treated like testable output behavior, including task-specific eval frameworks. | Teach small pytest-style evals before broad platform tooling. |
| B01 `Generative AI in Action` | Chapter 11, p.363, `B01_B01_P0363_C001` | Observability combines monitoring, logging, and tracing to diagnose whether the application works as intended. | Require structured logs/traces and failure categories before calling a system production-shaped. |
| B01 `Generative AI in Action` | Chapter 11, p.367, `B01_B01_P0367_C001` | Prompt and response telemetry can aid debugging but must be handled carefully because of privacy/legal implications. | Require redaction and secret-safety checks for logs and traces. |
| B01 `Generative AI in Action` | Chapter 11, p.381-382, `B01_B01_P0381_C001`, `B01_B01_P0382_C001` | Production deployment needs cost management, human review, monitoring, logging, tracing, and LLMOps discipline. | Require cost/latency notes and human-review/release gates where risk is high. |
| B10 `LLM Engineer's Handbook` | Chapter 7, p.291 and p.300-303, `B10_B10_P0291_C001`, `B10_B10_P0300_C001`, `B10_B10_P0302_C001`, `B10_B10_P0303_C001` | LLM and RAG evaluation should compare behavior with fit-for-task metrics; judge-based evals need caution and monitoring. | Keep Course 1 evals deterministic first, then label optional judge-based checks as advanced. |
| B12 `Designing Machine Learning Systems` | Chapter 5, p.229, `B12_B12_P0229_C001` | Production systems need measurable evaluation, not only intuition that the model is good. | Require an eval objective and a repeatable command. |
| B12 `Designing Machine Learning Systems` | Chapter 7, p.323-324, `B12_B12_P0323_C001`, `B12_B12_P0324_C001` | Production failures can come from feedback loops, outliers, and system effects after deployment. | Require failure categories and monitoring notes, not just pass/fail scores. |
| B03 `Introducing MLOps` | Chapter 8, p.137, `B03_B03_P0137_C001` | Governance artifacts must be trackable and connected to the work they approve. | Require release notes, review artifacts, or traceable decision records. |
| Local PDF `Principles of Building AI Agents` | p.80-83 and p.118-124 | Agent systems need traces for every step of nondeterministic runs and evals that score agent quality, textual faithfulness, and tool usage. | Require traceable run evidence and eval summaries before production-readiness claims. |
| Local PDF `Hands-On RAG for Production` | p.46, p.59, p.61, p.63, p.68-70 | Production RAG needs latency monitoring, response-quality measurement, POC-to-production requirements, KPI thresholds, observability, upgrade evaluation, and ongoing maintenance. | Require RAG production lessons to record latency/quality targets, monitoring signals, and release or upgrade decisions. |
| Local PDF `Hands-On RAG for Production` | p.47-50 and p.55 | Production RAG requires security, PII/privacy handling, access controls, audit trails, and prompt-injection mitigation. | Require redaction, access-control, audit, and prompt-injection safety checks when production lessons touch RAG data. |
| Local PDF `LLMOps` | p.52, p.54, and p.56-58 | LLM production reliability depends on documented KPIs, SLO/SLA-style expectations, model/risk notes, cost comparison, knowledge-limit behavior, safe logging, and review triggers. | Require release-gate lessons to include thresholds, model/config rationale, risk notes, and human-review conditions. |
| Local PDF `LLMOps` | p.163-164 and p.167 | LLM-facing APIs need input validation, error handling, credential safety, authentication/authorization, rate limiting, monitoring, logging, and versioning. | Require service-boundary or CI lessons to treat API behavior as an observable contract, even when the lab remains local. |
| Local PDF `LLMOps` | p.183 and p.205-206 | Evaluation and observability should cover prompt construction, retrieval, inference metadata, postprocessing, feedback, prompt versions, model versions, token counts, latency, and retrieved documents. | Require monitoring lessons to identify the failing pipeline stage, not only the final failed answer. |
| Local PDF `LLMOps` | p.211, p.218, p.224, p.229, and p.251-253 | Governance, privacy, security, audit artifacts, risk review, and restore planning are production concerns, but Course 1 should keep them as inspectable notes and checks. | Require redaction/audit notes and optional restore/runbook notes; defer enterprise governance platforms and infrastructure depth to Course 3. |

Do not copy book text into learner-facing files. Use these locators to justify repeatable eval and observability behavior.

## Authoring Gate

A Module 5 production lesson is ready to implement only when its `AUTHORING_PLAN.md` answers all of these:

| Question | Required answer |
|---|---|
| What behavior is being evaluated? | Name the prompt, RAG answer, tool result, service response, log, package, or model-selection decision. |
| What examples define the gate? | List golden examples, edge cases, unsafe cases, or regression fixtures. |
| What command reruns the evidence? | Provide a repo-root command and, when useful, a focused command. |
| What failure categories exist? | Name categories such as missing citation, malformed tool output, unsafe advice, latency budget, cost budget, or unknown. |
| What is the release decision? | Define pass, fail, review, or blocked criteria. |
| What telemetry is captured? | Name log fields, trace fields, metric names, cost estimates, latency estimates, or version notes. |
| What telemetry is forbidden? | Exclude secrets, credentials, raw private prompts, full sensitive responses, and unnecessary personal data. |
| What human review is needed? | Name when a reviewer must inspect the output, trace, release note, or limitation statement. |
| What does the learner explain? | Require a short note about what changed, what failed, and whether the system is ready to release. |

## Minimum Test or Eval Set

Every eval/observability exercise should include at least five of these checks.

| Check type | Required learner evidence |
|---|---|
| Golden normal case | A representative valid input passes the expected behavior. |
| Golden edge case | Ambiguous, empty, stale, malformed, or out-of-domain input is handled predictably. |
| Safety/regression case | Unsafe advice, unsupported claim, missing citation, or permission issue fails the gate. |
| Failure category check | Failed examples map to actionable categories instead of vague unknowns. |
| Eval summary check | The learner produces counts, pass/fail status, and a release recommendation. |
| Structured log check | Logs include event name, status, category, timestamp/run ID, and safe diagnostic fields. |
| Trace check | Trace entries reveal step order and failure location without leaking private content. |
| Cost/latency note | The lesson records a simple budget, estimate, or tradeoff. |
| RAG quality KPI check | RAG lessons record at least one retrieval or answer-quality target such as context precision, context recall, hallucination rate, answer relevance, or citation behavior. |
| Pipeline-stage trace | Monitoring lessons identify whether a failure came from prompt construction, retrieval, inference, postprocessing, feedback, or review. |
| Version note | Prompt, model, index, dataset, or package versions are recorded when relevant. |
| Risk/governance note | High-risk lessons name a lightweight risk, limitation, audit artifact, or restore/runbook assumption. |
| Access/privacy check | Restricted data, PII, or sensitive context is excluded, redacted, or explicitly reviewed before release. |
| Review gate | A human-review condition is triggered for high-risk or uncertain output. |

## Rubric Hooks

Add these rubric checks when a lesson touches production reliability:

- Eval examples represent normal, edge, failure, and safety behavior.
- The verification command is repeatable from a clean checkout.
- Failure categories help a teammate decide what to fix next.
- Logs and traces are useful for debugging and safe to share.
- Cost, latency, versioning, and limitations are visible when they affect the release decision.
- The learner can explain why a feature is ready, not ready, or needs human review.

## Scope Boundaries

Keep Module 5 production work local and reviewable.

- Do not require cloud observability or deployment for the first green path.
- Do not use model-judge evaluation as the only correctness signal.
- Do not optimize cost or latency before defining the measurement.
- Do not claim production readiness from a demo transcript alone.
- Defer full LLMOps platforms, governance programs, drift/retraining systems, and enterprise monitoring stacks to Course 3.
