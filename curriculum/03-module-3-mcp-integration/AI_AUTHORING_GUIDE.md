# Module 3 AI Authoring Guide

Use this guide when creating or modifying LLM API, PromptOps, tool, and MCP lessons.

Use `PROMPTOPS_EVIDENCE_CHECKLIST.md` before changing prompt templates, prompt
regression tests, structured output prompts, prompt-injection behavior, or
prompt trace expectations.

Use `TOOL_CONTRACT_EVIDENCE_CHECKLIST.md` before changing local tools,
MCP-style tools, resource adapters, tool permissions, tool traces, or
tool-related failure behavior.

## Module Role

Module 3 teaches model and tool boundaries as explicit contracts. Learners build provider wrappers, prompt templates, structured outputs, local tools, and MCP-style interfaces only after they can test the boundary.

## Authoring Priorities

1. Teach LLM API and PromptOps before tools.
2. Teach structured outputs and validation before agents.
3. Use mocks and local fixtures before real providers.
4. Keep secrets out of code, prompts, logs, tests, and summaries.
5. Treat MCP as a connection standard, not an invitation to overbuild.
6. Convert prompt source evidence into testable learner behavior before adding
   prompt prose.

## Lesson Requirements

Each week needs:

- a boundary or contract story
- an expected time to finish near the top of the README and learner-editable workbench file
- `workbench.py`
- tests for valid input, malformed input, missing output, and trace metadata
- progressive hints
- a rubric with safety and contract criteria
- reference validation outside the learner folder
- PromptOps evidence checklist coverage when the lesson edits prompt behavior
- Tool contract evidence checklist coverage when the lesson edits tool behavior

## Guardrails

- Do not require paid APIs for the first green path.
- Do not hardcode API keys, model names, or provider-specific behavior into the core exercise.
- Do not introduce autonomous agents before the learner can validate prompts, outputs, and tools.
- Do not hide essential behavior behind LangChain, LangGraph, or MCP helpers before the learner builds the underlying contract.

## Pedagogy Enforcement

Every Module 3 lesson must make the teaching style visible:

- explain the boundary like a knowledgeable friend at a cafe, using simple request/response examples before framework names
- include a useful diagram, mind map, contract table, or sequence diagram when it clarifies the API/tool/MCP interaction
- search the web before publishing for one current, high-quality visual or video resource for the exact provider, prompt, tool, or MCP topic
- add optional book/course references from `../resources/curated-learning-resources.md` when deeper study would help
- frame the work as a boundary, contract, or failure-containment problem
- ask learners to inspect schemas, prompt templates, traces, or tests before code
- require a prediction about malformed input or structured output
- make secret safety and failure boundaries part of the learner task
- use mocks or fixtures as the first evidence source
- end by explaining what the boundary allows, refuses, logs, and hides from the model

If the lesson starts with framework usage before contract reasoning, revise it before implementation.

## Good Module 3 Slice

A good slice lets learners test a model/provider boundary, prompt contract, or local tool without network dependency, then optionally swap in a real provider later.

## Instructor Guidance

Use learner-facing phase titles even when stable folder names remain week-based:

- `week-01-fundamentals`: Phase 1 - LLM Provider Boundary Lab
- `week-02-server-building`: Phase 2 - Local Tool Server Contract Lab
- `week-03-context-engineering`: Phase 3 - Structured Context And Trace Lab
- `week-04-security-a2a`: Phase 4 - Secure MCP And Agent Handoff Lab

Use MCP terms consistently:

- `client`: the application that asks for model or tool capability
- `server`: the boundary that exposes tools, resources, or prompts
- `tool`: an action with a typed input and output contract
- `resource`: readable context exposed through a stable identifier
- `prompt template`: versioned instruction text with testable inputs and outputs
