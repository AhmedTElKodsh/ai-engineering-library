# Authoring Plan: Module 4 Phase 8

## Scope

Create an optional production multi-agent boundary lab after deterministic
multi-role review.

This phase teaches policy checks, authorization, action append traces, maximum
step limits, stop reasons, and run reports. It must not execute real agents,
network calls, or tools in the required path.

## Acceptance Checks

- [x] `README.md` frames production multi-agent work as policy and trace
  boundaries, not autonomous execution.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define authorization, refused actions, action appends, stop
  decisions, max-step boundaries, and run-report fields.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates policy clarity, authorization, stop conditions,
  run-report evidence, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/extended-concepts/02-agentic-systems/week-04-production-multi-agent-boundaries/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: deterministic
  multi-role review and explicit handoff outcomes.
- New capability added by this lesson: add production-shaped policy, auth,
  max-step, stop-reason, and run-report boundaries around multi-agent
  experiments.
- Failure mode the learner must reproduce, inspect, or prevent: unauthorized
  calls, runaway loops, missing stop reasons, or unreviewable run reports.
- FinAgent or practical AI-system improvement: advanced FinAgent agent
  experiments stay auditable and stoppable.
- Explanation artifact the learner should leave with: a short run report naming
  allowed actions, refused actions, stop reason, and production risk.

## Scope Boundary Enhancement

- Minimum required path: authorize action requests, append allowed/refused
  actions to a trace, decide when to stop, and build a run report.
- Optional enrichment only after the minimum path works: add one policy reason,
  role, or stop reason.
- Advanced doorway, named briefly but not required: real multi-agent execution,
  distributed tools, remote MCP ecosystems, enterprise authorization, hosted
  monitoring, and governance platforms belong to Course 3.

## Source Evidence Enhancement

Use `../WORKFLOW_VS_AGENT_DECISION_TREE.md` and
`../../03-module-3-mcp-integration/TOOL_CONTRACT_EVIDENCE_CHECKLIST.md` before
changing this lesson.

- Local PDF `Principles of Building AI Agents`, p.49-50 for guardrails and
  authorization around agent boundaries.
- Local PDF `Principles of Building AI Agents`, p.80-83 and p.118-124 for traces
  and evals that make nondeterministic agentic behavior inspectable.
- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`, p.342 and
  p.376 for tool execution transparency, debugging, observability, and control.
- Local PDF `LLMOps`, p.57-58 and p.211-229 for lightweight risk, privacy,
  security, and review notes before production claims.
- Assessment conversion rule: each source insight must become an authorization
  rule, refused-action path, max-step stop condition, run-report field, risk
  note, or learner explanation prompt.
