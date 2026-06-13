# Authoring Plan: Module 4 Phase 5

## Scope

Create an optional framework-style state-machine lab after plain-Python
workflows and review loops.

This phase teaches immutable workflow state, explicit routes, retrieval states,
abstention, refusal, and debug summaries. It prepares learners for framework
state concepts without requiring LangGraph or any external framework dependency
in the first green path.

## Acceptance Checks

- [x] `README.md` frames state machines as inspectable workflow contracts, not
  free-form agent loops.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define advice refusal routing, retrieval state, abstention without
  evidence, immutable state-machine execution, and debug summaries.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates state transitions, refusal/abstention, immutability,
  traceability, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/extended-concepts/02-agentic-systems/week-01-framework-state-machine/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: explicit workflow
  routes, evidence gates, critique loops, and stop conditions.
- New capability added by this lesson: model those workflow steps as immutable
  state transitions.
- Failure mode the learner must reproduce, inspect, or prevent: hidden mutation,
  skipped states, advice routed into retrieval, or missing-evidence answers.
- FinAgent or practical AI-system improvement: FinAgent can move toward
  framework-style orchestration only after the plain state contract is clear.
- Explanation artifact the learner should leave with: a short state-transition
  trace and why immutable state improves debugging.

## Scope Boundary Enhancement

- Minimum required path: classify route, retrieve evidence only when allowed,
  answer or abstain, preserve original state, and summarize debug metadata.
- Optional enrichment only after the minimum path works: add one extra route or
  state-summary field.
- Advanced doorway, named briefly but not required: LangGraph dependency,
  persisted state stores, streaming graph execution, interrupts, and human-in-
  the-loop platform features belong to later Course 3 depth.

## Source Evidence Enhancement

Use `../WORKFLOW_VS_AGENT_DECISION_TREE.md` and
`../MEMORY_SAFETY_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`, p.132-135
  for fixed workflows versus dynamic agents.
- Local PDF `Principles of Building AI Agents`, p.66-67 and p.71 for branches,
  chains, merging, conditions, and traceable workflow steps.
- Local PDF `Principles of Building AI Agents`, p.40-41 for deliberate state and
  context selection.
- Assessment conversion rule: each source insight must become a route rule,
  immutable-state assertion, evidence/refusal condition, debug summary field, or
  learner explanation prompt.
