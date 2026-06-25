# Continuation Roadmap

Timing: read this in 20-30 minutes on Day 30 after the final defense. Revisit it
weekly during the next 30-60 days.

Calendar if the launch starts Sunday 2026-06-14: Day 31 is Tuesday
2026-07-14. Treat the dates below as planning anchors, not deadlines to protect
at the cost of quality.

Day 30 is a project launch, not the end of Course 1. Use this roadmap to choose
the next stretch of work while returning to the full curriculum for depth.

## Days 31-45: Production RAG Depth

Target window: Tuesday 2026-07-14 through Tuesday 2026-07-28.

- Add hybrid search.
- Try reranking on a small eval set.
- Improve golden questions and failure categories.
- Build retrieval diagnostics or a simple retrieval dashboard.
- Add a user feedback loop for bad answers and missing citations.

Evidence target: retrieval report with before/after eval results and examples
where retrieval still fails.

## Days 46-60: LLMOps And Deployment

Target window: Wednesday 2026-07-29 through Wednesday 2026-08-12.

- Add CI/CD or a repeatable local release workflow.
- Choose one deployment target only if local quality gates are stable.
- Add monitoring or structured run reports.
- Version prompts, indexes, models, and data snapshots.
- Optimize cost and latency with measured baselines.

Evidence target: release note, quality gate output, logs, and rollback or
fallback plan.

## Days 61-75: Advanced Agents

Target window: Thursday 2026-08-13 through Thursday 2026-08-27.

- Convert the workflow to a small state machine where useful.
- Define memory boundaries and what must not be persisted.
- Add tool permissions and tool denial tests.
- Add a human-in-the-loop escalation path.
- Compare one framework against the local explicit workflow before adopting it.

Evidence target: workflow-state diagram, permission tests, and a decision note
explaining whether a framework helped.

## Days 76-90: Model Adaptation Decisions

Target window: Friday 2026-08-28 through Friday 2026-09-11.

- Document when not to fine-tune.
- Define what dataset would be required for adaptation.
- Format a small dataset only if the use case justifies it.
- Try a small classifier or LoRA experiment only if prompt, RAG, and tool
  approaches have been measured and found insufficient.

Evidence target: model-adaptation decision memo with data, eval, and risk
requirements.

## After 90: Specialize In One

- GraphRAG
- multimodal systems
- fine-tuning
- production ML systems
- AI platform engineering

Choose based on the project evidence, not novelty. The best specialization is
the one that solves a real limitation you can already demonstrate.
