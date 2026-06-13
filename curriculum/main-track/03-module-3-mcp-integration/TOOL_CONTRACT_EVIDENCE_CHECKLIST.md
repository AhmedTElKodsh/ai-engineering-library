# Tool Contract Evidence Checklist

Use this checklist before creating or revising a Module 3 lesson that exposes a local tool, MCP-style tool, resource adapter, or tool-using assistant behavior.

This file is an authoring aid. It should help lesson authors convert source-backed tool ideas into tests, traces, rubrics, and learner explanations without adding framework-heavy agent scope.

## Source Evidence Baseline

| Source | Evidence locator | Planning takeaway | Use in Module 3 |
|---|---|---|---|
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 11, p.354, `B14_B14_P0354_C001` | Tool calls appear inside an agent state and must be executed as explicit steps. | Require traceable tool-call records rather than invisible helper calls. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 13, p.396, `B14_B14_P0396_C001` | MCP server/client work includes building, exposing, testing, and consuming tools. | Teach MCP as a boundary pattern with tests before broader ecosystem depth. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 13, p.399, `B14_B14_P0399_C001` | Agents often need wrappers for external context sources; MCP is one way to organize that integration. | Require local wrappers/adapters to declare what they expose and why. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 13, p.411-413, `B14_B14_P0411_C001`, `B14_B14_P0412_C001`, `B14_B14_P0413_C001` | Tool servers should be inspected, verified, and consumed through a test host/client. | Require a test path that proves the tool contract works before agent integration. |
| B15 `AI Agents with MCP` | Chapter 2, section 6, `B15_B15_S0006_C003` | MCP clients decide how they support resources, prompts, tools, and server capabilities. | Require authors to name the supported primitive and reject unsupported capabilities. |
| B15 `AI Agents with MCP` | Chapter 2, section 6, `B15_B15_S0006_C022` | Tool descriptions and input schemas may need translation between provider formats. | Require a stable internal tool schema before provider-specific formatting. |
| B04 `AI Engineering` | Chapter 6, section 11, `B04_B04_S0011_C027` | Tool use can fail through invalid tools, incorrect parameter values, or goal failure. | Require negative tests for malformed inputs, wrong values, or unsupported actions. |
| Local PDF `Principles of Building AI Agents` | p.35 and p.37 | Tool calling depends on clear communication about what the tool does and when to use it; tool design should be planned before coding. | Require authors to define tool purpose, allowed use, input schema, output schema, and negative cases before implementation. |
| Local PDF `Principles of Building AI Agents` | p.57-58 | MCP standardizes the client/server boundary for exposing and consuming tools. | Keep MCP lessons focused on inspectable tool boundaries before ecosystem depth. |

Do not copy book text into learner-facing files. Use these locators to justify the authoring gate, then assess the learner through behavior.

## Authoring Gate

A Module 3 tool-facing lesson or revision is ready to implement only when its `AUTHORING_PLAN.md` answers all of these:

| Question | Required answer |
|---|---|
| What capability is exposed? | Name the tool, resource, prompt template, or adapter and the user problem it supports. |
| What is intentionally not exposed? | List refused actions, unsupported resources, high-impact operations, or provider-only features. |
| What input schema is accepted? | Define required fields, optional fields, type constraints, and validation errors. |
| What output schema is returned? | Define success shape, error shape, missing-output behavior, and trace metadata. |
| What permission boundary exists? | State who or what may call the tool and which operations need refusal or human review. |
| What failure is practiced first? | Name the expected learner TODO failure before implementation. |
| What test proves safe failure? | Include malformed input, missing output, unsupported tool, permission refusal, or unsafe action. |
| What trace is recorded? | Include tool name, sanitized arguments, status, error category, and source or fixture ID when relevant. |
| What must the trace hide? | Exclude secrets, credentials, raw private prompts, unrelated memory, and unnecessary user data. |
| What does the learner explain? | Require a short note on what the tool allows, refuses, logs, hides, and hands to the next boundary. |

## Minimum Test Set

Every tool-contract exercise should include at least five of these tests. Pick the smallest set that proves the contract without turning the lesson into a platform project.

| Test type | Required learner evidence |
|---|---|
| Valid input test | A normal request returns the expected structured output. |
| Missing input test | Missing required fields fail with a clear validation error. |
| Wrong type/value test | Incorrect types or out-of-range values are rejected before tool execution. |
| Unsupported capability test | Unknown tools, unsupported resources, or out-of-scope actions are refused. |
| Permission/refusal test | Unsafe or high-impact actions require refusal or human review. |
| Missing output test | Empty or incomplete tool results become normalized errors, not silent success. |
| Trace test | Tool name, sanitized arguments, status, and error category are recorded. |
| Secret-safety test | Secrets and credentials never appear in tool arguments, prompts, logs, traces, or summaries. |
| Adapter translation test | Internal schema remains stable even if a provider-specific format changes. |

## Rubric Hooks

Add these rubric checks when a lesson touches tools or MCP-style boundaries:

- Tool input and output contracts are explicit and tested.
- Invalid inputs fail before the model or workflow can act on them.
- Tool errors are normalized so downstream code can handle them predictably.
- Permissions and refused actions are visible in tests, traces, or learner notes.
- Trace metadata is useful for debugging and does not leak secrets or unrelated context.
- The learner can explain why MCP/tool boundaries are contracts, not a shortcut to autonomy.

## Scope Boundaries

Keep Module 3 focused on small, inspectable contracts.

- Do not require a live remote MCP server for the first green path.
- Do not introduce a large tool catalog.
- Do not let an agent choose arbitrary tools before each tool has standalone tests.
- Do not hide validation inside framework helpers without making the schema and failure behavior visible.
- Defer enterprise MCP ecosystems, provider-specific tool routing, distributed tools, and long-running orchestration to later modules or Course 3.
