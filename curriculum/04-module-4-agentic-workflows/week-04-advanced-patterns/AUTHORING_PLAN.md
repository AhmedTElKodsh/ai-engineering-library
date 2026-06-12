# Authoring Plan: Module 4 Phase 4

## Scope

Create a bounded critique and review loop after explicit workflows and before
framework-managed state or autonomous agents.

This phase teaches learners to inspect draft quality, retry only within a small
attempt budget, preserve citations, add limitation language, and escalate risky
outputs to human review. It must not become an open-ended self-improving agent.

## Acceptance Checks

- [x] `README.md` frames critique, retry, revision, and human-review checkpoints
  as controlled workflow behavior.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define missing-citation detection, advice-language detection,
  high-risk review escalation, retry limits, deterministic revision, citation
  preservation, and traceable loop output.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates critique quality, retry boundaries, revision safety,
  traceability, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-04-advanced-patterns/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: explicit workflow
  routing, evidence gates, deterministic tool use, and trace summaries from
  Phase 3.
- New capability added by this lesson: critique draft outputs, decide whether a
  retry is allowed, revise safely, preserve citations, and escalate risky cases
  to human review.
- Failure mode the learner must reproduce, inspect, or prevent: missing
  citations, investment-advice wording, repeated failed retries, or high-risk
  output that should not be auto-approved.
- FinAgent or practical AI-system improvement: FinAgent can improve educational
  briefs without hiding unsafe language or turning retry loops into autonomy.
- Explanation artifact the learner should leave with: a short trace explaining
  issue categories, retry decision, final status, and review escalation.

## Scope Boundary Enhancement

- Minimum required path: critique one draft, detect issue categories, apply an
  attempt limit, revise deterministically, preserve citation lists, return final
  status, and expose loop trace data.
- Optional enrichment only after the minimum path works: add one extra issue
  category such as stale evidence, vague limitation language, or unsupported
  comparison.
- Advanced doorway, named briefly but not required: planner/evaluator agents,
  dynamic critique prompts, model-judge evaluation, long-running task queues,
  and multi-agent review systems belong to later Course 3 depth unless a bounded
  Course 1 lab explicitly introduces them.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for critique, review escalation, retry limits,
  revision, and loop output.
- Failure evidence: unsafe or unsupported drafts are blocked, revised, or routed
  to human review with named reasons.
- Explanation evidence: learner note names why retry was allowed or refused and
  what stop condition prevents runaway loops.
- Transfer evidence: FinAgent callback showing how critique/review protects
  cited market summaries and educational-use boundaries.

## Source Evidence Enhancement

Use `../WORKFLOW_VS_AGENT_DECISION_TREE.md` before changing this lesson. Use
`../RAG_CITATION_ABSTENTION_CHECKLIST.md` when the critique touches citations or
unsupported claims. Use `../MEMORY_SAFETY_EVIDENCE_CHECKLIST.md` if future edits
store prior attempts or summaries beyond the local trace.

- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`, p.132-135,
  `B14_B14_P0132_C001`, `B14_B14_P0133_C001`, `B14_B14_P0135_C001` for keeping
  fixed workflows distinct from agents that dynamically choose actions.
- B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection`, p.328 and
  p.334-335, `B05_B05_P0328_C001`, `B05_B05_P0334_C001`,
  `B05_B05_P0335_C001` for planner/executor/evaluator and reflection-style
  patterns as useful but bounded review-loop inspiration.
- B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection`, p.147 and
  p.149, `B05_B05_P0147_C001`, `B05_B05_P0149_C001` for tracing claims back to
  support and separating retrieval/support failures from generation failures.
- Local PDF `Principles of Building AI Agents`, p.66-67 and p.71 for branches,
  chains, conditions, and traceable workflow steps before autonomy.
- Local PDF `Principles of Building AI Agents`, p.105 and p.109 for observability,
  step traces, and evaluation as part of making agentic behavior debuggable.
- Assessment conversion rule: each source insight must become an issue category,
  retry rule, stop condition, review-escalation rule, citation-preservation
  assertion, trace field, or learner explanation prompt.
