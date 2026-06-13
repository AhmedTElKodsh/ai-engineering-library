# Authoring Plan: Module 4 Phase 3

## Scope

Create a plain-Python explicit workflow pattern lab after citation/abstention RAG and before framework-managed state.

## Acceptance Checks

- [x] `README.md` frames prompt chaining, routing, gated tool use, and trace summaries as explicit workflows.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define fixture loading, routing, step planning, deterministic tool use, gate decisions, full workflow trace, and trace summary behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates routing, chaining, tool boundaries, gates, traceability, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-03-core-patterns/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.
## Learner Logic Enhancement

- Current capability the learner brings into this lesson: cited RAG answers, abstention behavior, and source-grounding checks from the earlier Module 4 labs.
- New capability added by this lesson: compose a fixed workflow with route classification, prompt-chain steps, bounded evidence lookup, gate decisions, and trace summaries.
- Failure mode the learner must reproduce, inspect, or prevent: a request takes the wrong route, calls a tool without enough evidence, or answers when the safe response is abstention or refusal.
- FinAgent or practical AI-system improvement: FinAgent can use explicit workflow gates before any autonomous agent loop is justified.
- Explanation artifact the learner should leave with: a short trace summary explaining route, steps, tool use, gate decision, final status, and why this is safer than a free-running agent.

## Scope Boundary Enhancement

- Minimum required path: load workflow cases, classify the request, build an explicit step plan, run the deterministic evidence tool, evaluate the gate, return a traceable response, and summarize the trace.
- Optional enrichment only after the minimum path works: add one extra route or negative case for missing evidence, unsafe advice, unauthorized data, or malformed input.
- Advanced doorway, named briefly but not required: framework-managed state, dynamic tool selection, planner/executor/evaluator teams, multi-agent collaboration, and long-running orchestration belong to later Course 3 depth unless a bounded Course 1 lab explicitly justifies them.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for fixture loading, route selection, prompt-chain planning, evidence-tool results, gate decisions, workflow traces, and trace summaries.
- Failure evidence: unsupported or risky cases end in abstention/refusal rather than an evidence-free answer.
- Explanation evidence: learner note names the simpler path used and the stop condition that prevents runaway behavior.
- Transfer evidence: FinAgent callback showing how route/gate/trace patterns protect cited market summaries before agent autonomy.

## Source Evidence Enhancement

Use `../WORKFLOW_VS_AGENT_DECISION_TREE.md` before changing this lesson.

- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`, p.132-135, `B14_B14_P0132_C001`, `B14_B14_P0133_C001`, `B14_B14_P0135_C001` for the distinction between fixed workflows and agents that dynamically decide actions.
- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`, p.342 and p.376, `B14_B14_P0342_C001`, `B14_B14_P0376_C001` for tool registration, dynamic execution, debugging, observability, transparency, and control.
- Local PDF `Principles of Building AI Agents`, p.66-67 and p.71 for branches, chains, conditions, and traceable workflow steps before autonomy.
- B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection`, p.328 and p.334-335, `B05_B05_P0328_C001`, `B05_B05_P0334_C001`, `B05_B05_P0335_C001` for planner/executor/evaluator patterns as later review-loop or advanced depth.
- Assessment conversion rule: each source insight must become a route decision, step-plan assertion, allowed-tool boundary, gate decision, stop/refusal condition, trace-summary field, or learner explanation prompt.
