# Authoring Plan: Module 4 Phase 7

## Scope

Create an optional multi-role review workflow lab after resumable orchestration.

This phase teaches role assignment, minimal handoffs, role reviews, severity
rules, and collaboration outcomes. It must stay deterministic and must not
simulate personalities or create autonomous multi-agent systems.

## Acceptance Checks

- [x] `README.md` frames multi-role work as ownership, handoff shape, review
  severity, and outcome rules.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define role assignment, handoff shape, role-review collection,
  collaboration outcome, and full workflow trace behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates role ownership, minimal context, safety review,
  outcome clarity, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-07-collaboration/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: resumable workflow
  traces and failure recovery.
- New capability added by this lesson: split review work across explicit roles
  without over-sharing context.
- Failure mode the learner must reproduce, inspect, or prevent: missed safety
  review, vague ownership, over-shared context, or unclear approval outcome.
- FinAgent or practical AI-system improvement: FinAgent review flows can include
  engineer, safety, and writer perspectives without losing auditability.
- Explanation artifact the learner should leave with: a short role-to-outcome
  trace explaining why the final decision is approve, revise, or block.

## Scope Boundary Enhancement

- Minimum required path: assign roles, create minimal handoffs, collect role
  reviews, decide outcome from severity, and return a review trace.
- Optional enrichment only after the minimum path works: add one role or severity
  rule and explain why it is needed.
- Advanced doorway, named briefly but not required: autonomous multi-agent
  debate, dynamic planner/evaluator teams, real-time collaboration systems, and
  distributed agent memory belong to Course 3.

## Source Evidence Enhancement

Use `../WORKFLOW_VS_AGENT_DECISION_TREE.md`,
`../MEMORY_SAFETY_EVIDENCE_CHECKLIST.md`, and Module 3's secure handoff plan
before changing this lesson.

- B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection`, p.328
  and p.334-335 for planner/executor/evaluator patterns as advanced inspiration,
  not required autonomy.
- Local PDF `Principles of Building AI Agents`, p.40-41 for deliberate context
  selection into memory or handoff state.
- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`, p.342 and
  p.376 for debugging, observability, transparency, and control in tool/workflow
  execution.
- Assessment conversion rule: each source insight must become a role rule,
  minimal-context handoff field, severity decision, review outcome, trace field,
  or learner explanation prompt.
