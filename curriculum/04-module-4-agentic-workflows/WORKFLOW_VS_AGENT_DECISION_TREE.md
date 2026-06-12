# Workflow vs Agent Decision Tree

Use this decision tree before creating or revising a Module 4 lesson that adds routing, tool use, critique, state machines, orchestration, collaboration, or multi-agent behavior.

The Course 1 default is the simplest inspectable system that can satisfy the user need. Agents are useful only when the task genuinely needs dynamic action selection, tool composition, or adaptive control that a simpler path cannot handle safely.

## Source Evidence Baseline

| Source | Evidence locator | Planning takeaway | Use in Module 4 |
|---|---|---|---|
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 5, p.132-133, `B14_B14_P0132_C001`, `B14_B14_P0133_C001` | Workflows choose among a fixed set of options; agents dynamically select and combine tools to reach objectives. | Make learners choose fixed workflow first unless dynamic tool choice is justified. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 5, p.135, `B14_B14_P0135_C001` | Agents perceive data, reason, decide actions, and create flows in real time. | Require extra gates when a lesson grants autonomy. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 11, p.342, `B14_B14_P0342_C001` | Tool-based agents need tool registration, dynamic execution, debugging, and observability. | Do not add tool-using agents before tool contracts and traces exist. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 11, p.376, `B14_B14_P0376_C001` | Agent workflows should preserve transparency and control. | Require trace summaries, stop conditions, and failure categories. |
| B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection` | p.328, p.334-335, `B05_B05_P0328_C001`, `B05_B05_P0334_C001`, `B05_B05_P0335_C001` | Planner, executor, and evaluator roles can improve review loops, but add coordination complexity. | Keep planner/evaluator patterns as critique/review or optional advanced doorway unless needed. |
| Local PDF `Principles of Building AI Agents` | p.66-67 and p.71 | Graph-style workflows reduce excessive agent freedom by decomposing tasks into branches, chains, merges, conditions, and traceable steps. | Require fixed routes and decomposed workflow steps before bounded autonomy. |

Do not copy book text into learner-facing files. Use these locators to justify route decisions, tests, and rubric criteria.

## Decision Tree

Start at the top and stop at the first option that safely solves the problem.

| Question | If yes | If no |
|---|---|---|
| Can deterministic Python solve it with clear inputs and outputs? | Use deterministic code plus unit tests. | Continue. |
| Does the system only need to transform or summarize known input? | Use one prompt/provider boundary with regression and structured-output tests. | Continue. |
| Does the answer need source evidence? | Use RAG with citations, abstention, and retrieval traces. | Continue. |
| Does the task require several known steps in a predictable order? | Use an explicit workflow with named steps and a trace. | Continue. |
| Does the task need routing among a fixed set of safe options? | Use an explicit router with route-decision tests. | Continue. |
| Does an intermediate result need review or correction? | Add critique, retry, and human-review gates. | Continue. |
| Does the system need to choose or combine tools dynamically at run time? | Consider a bounded agent loop with tool permissions, stop conditions, and trace logs. | Do not use an agent. |
| Does the task need multiple specialized roles with separate responsibilities? | Consider an optional multi-role or multi-agent workflow after the single-workflow path is tested. | Keep one workflow. |

## Required Evidence By Choice

| Choice | Minimum evidence |
|---|---|
| Deterministic code | Unit tests for normal, edge, and invalid inputs. |
| Prompt/provider call | Prompt regression test, structured output check, and trace metadata. |
| RAG | Retrieval trace, citation check, abstention case, and unsupported-claim test. |
| Explicit workflow | Route/step plan, stop condition, trace summary, and failure path. |
| Critique/review loop | Reviewer criteria, retry limit, human-review condition, and final decision trace. |
| Bounded agent loop | Tool contract tests, permission/refusal tests, loop limit, trace log, and fallback behavior. |
| Multi-role/multi-agent workflow | Role policy, handoff contract, conflict/refusal case, shared-state boundary, and stop condition. |

## Authoring Gate

A Module 4 workflow or agent lesson is ready to implement only when its `AUTHORING_PLAN.md` answers all of these:

| Question | Required answer |
|---|---|
| Why is a simpler path insufficient? | Name the simpler path and the concrete gap it cannot solve. |
| What choices can the system make? | List fixed routes, dynamic tool choices, review decisions, or role handoffs. |
| What stops the loop? | Define max steps, success condition, refusal condition, or human-review gate. |
| What tools or data can it access? | Name allowed tools/resources and refused capabilities. |
| What evidence supports the output? | Name source IDs, citations, trace entries, or review criteria. |
| What failure is practiced first? | Identify the expected learner TODO failure before implementation. |
| What negative case proves safety? | Include unsupported claim, unauthorized tool, missing citation, runaway loop, or unsafe request. |
| What trace is recorded? | Include route, steps, tools, gate decision, final status, and refusal or stop reason. |
| What does the learner explain? | Require a short note on why the chosen design is simpler or safer than an agent, or why a bounded agent is justified. |

## Rubric Hooks

Add these rubric checks when a lesson touches workflows or agents:

- The design uses the least autonomous pattern that solves the task.
- Routes, steps, tools, and stop conditions are explicit.
- Agent autonomy is bounded by permissions, loop limits, refusal behavior, and trace logs.
- Evidence and citations remain visible when answers depend on retrieval.
- Review or critique loops have clear criteria and do not run indefinitely.
- The learner can defend when not to use an agent.

## Scope Boundaries

Keep Course 1 focused on controlled workflows.

- Do not introduce autonomous agents before prompt, tool, RAG, and workflow contracts are testable.
- Do not use a framework to hide route, state, or stop-condition reasoning.
- Do not require multi-agent collaboration for the required Course 1 path.
- Do not let agentic behavior produce financial advice or unsupported predictions.
- Defer distributed multi-agent systems, advanced planner/executor/evaluator teams, and long-running orchestration platforms to Course 3 or a specialization.
