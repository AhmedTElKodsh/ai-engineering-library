# Module 3: LLM APIs, PromptOps, Tools, and MCP Boundaries

## Reliable Model, Prompt, Tool, And MCP Boundaries

**Duration:** 4 weeks  
**Expected time to finish:** 16-24 hours total, about 4-6 hours per phase  
**Prerequisites:** Module 2 or equivalent comfort with Python, tests, structured data, and basic LLM concepts  
**Pedagogy:** tool contracts first, frameworks second, security always

## Module Overview

Module 3 turns the earlier FinAgent and first-principles work into explicit system boundaries. Learners stop treating model APIs, prompts, and tools as magic helpers and start building small, testable adapters that validate inputs, return structured outputs, handle failure, and preserve an audit trail.

| Question | Answer |
| --- | --- |
| What will I build? | A tested path from prompt and provider boundaries to local tools, structured traces, and MCP-style integration. |
| What skill will I practice? | Observe, reason, modify, verify: inspect contracts first, predict failure paths, implement one boundary behavior, and prove it with tests or planned acceptance criteria. |
| How does this prepare me for the next module? | It gives FinAgent reliable access to outside capabilities before later modules add richer agent workflows and production gates. |

**Previous:** you learned how text, vectors, attention, context budgets, and decoding choices behave.  
**Current:** you connect model behavior to APIs, prompts, tools, resources, and explicit contracts.  
**Next:** you use those contracts as the safer base for agentic workflows.

The book synthesis makes one thing clear: prompt engineering and LLM API work must be treated as engineering, not one-off experimentation. So this module adds API wrappers, chat roles, token/cost logs, prompt templates, schema validation, prompt regression tests, and injection checks before exposing tools or MCP-style interfaces.

For authors extending prompt-related lessons, use `PROMPTOPS_EVIDENCE_CHECKLIST.md`
to connect source evidence to prompt regression tests, structured-output checks,
injection cases, trace metadata, and rubric hooks before editing learner files.
For authors extending tool-related lessons, use
`TOOL_CONTRACT_EVIDENCE_CHECKLIST.md` to connect source evidence to input/output
schemas, malformed-input tests, permission refusals, missing-output behavior,
trace metadata, and rubric hooks.

MCP appears here as a practical interface pattern for exposing tools, resources, and prompts to AI applications. The learner does not need to become an enterprise integration architect in Layer 1. They need to understand the shape of the contract, how to test it, and where permissions and secrets can fail.

## Minimum Path And Advanced Doorway

Use `../../LEARNER_JOURNEY_MAP.md` as the course-level map. Module 3's minimum
path is provider boundaries, prompt contracts, structured output validation,
typed local tools, trace metadata, permissions, and secret-safe configuration.

The advanced doorway is full integration architecture: MCP ecosystems,
multi-provider routing, enterprise prompt management, and large tool catalogs.
Layer 1 keeps the work small so learners understand contracts before scale.

## Layer-Proof Project

**LLM API Playground**

Learners build a small wrapper that can:

- accept model configuration without hardcoded secrets
- send chat-style messages through a mocked or real provider boundary
- record token/cost estimates
- explain which provider failures still need a later reliability layer

**Prompt Engineering Test Suite**

Learners build prompt templates as versioned artifacts. They add structured JSON output expectations, schema validation, regression examples, and prompt-injection tests.

**Tool-Using Research Assistant**

Learners build a small assistant that can:

- validate a research request
- call one or two local tools through typed schemas
- return structured evidence
- handle missing or malformed tool responses
- record a simple trace of what happened

FinAgent reuses the same pattern for market quote tools, indicator calculators, company context resources, and later MCP-style boundaries. Keep the finance boundary in `../../FINANCE_SAFETY.md` visible whenever a provider or tool can produce market-facing text.

## Folder Map

The folder names stay stable for tests and links. The learner-facing titles below are the names to use in docs, plans, and conversations.

| Phase | Folder | Learner-facing title | Learner deliverable | Verification from repo root |
| --- | --- | --- | --- | --- |
| Phase 1 | `week-01-fundamentals` | LLM Provider Boundary Lab | Build an LLM API wrapper, message contract, token/cost log, and prompt template tests | `python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-01-fundamentals/tests -v` |
| Phase 2 | `week-02-server-building` | Local Tool Server Contract Lab | Wrap a small tool set behind a local server-style interface | `python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-02-server-building/tests -v` |
| Phase 3 | `week-03-context-engineering` | Structured Context And Trace Lab | Validate structured outputs, sanitize inputs, normalize errors, and preserve trace metadata | `python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-03-context-engineering/tests -v` |
| Phase 4 | `week-04-security-a2a` | Secure MCP And Agent Handoff Lab | Add permission checks, injection tests, secret-safe configuration, and a small agent-to-agent handoff exercise | `python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-04-security-a2a/tests -v` |

All four phases now include learner scaffolds. Tests are expected to fail before learners complete the TODOs in each `workbench.py`.

Expected first run: each phase should collect tests cleanly and fail on TODO
behavior. If a test fails because of a missing package, fixture, or import path,
fix the scaffold before treating it as learner work.

## Teaching Contract

Every week should follow the standard loop:

1. Read the product boundary.
2. Inspect the schema or test before editing.
3. Predict which malformed input will fail.
4. Implement one contract behavior in `workbench.py`.
5. Run the smallest relevant test.
6. Record what the trace proves.
7. Reflect on what the tool should refuse to do.

## Style Rubric

A strong Module 3 learner:

- treats prompts as versioned, testable artifacts
- tracks token and cost behavior in the first provider boundary
- can name timeout, retry, and rate-limit handling as the next reliability layer
- validates structured outputs before trusting them
- treats tool inputs and outputs as contracts, not suggestions
- validates bad input before an LLM or agent can act on it
- uses mocks or fixtures before real APIs
- keeps secrets out of source code, prompts, logs, and summaries
- understands MCP as a standard connection layer, not a reason to overbuild
- can explain the difference between a tool, a resource, and a prompt template

## FinAgent Connection

FinAgent needs external capabilities, but the final capstone should not start by calling random services from an agent loop. Module 3 teaches the safer sequence:

1. Build a testable model/provider boundary.
2. Turn prompts and outputs into explicit contracts.
3. Build a deterministic local tool.
4. Add validation and trace metadata.
5. Test success, malformed input, and failure paths.
6. Only then expose the tool to an LLM, MCP client, or agent workflow.

## Checkpoint Gate

Learners are ready for Module 4 when they can:

- wrap model calls behind a testable interface
- version and test a prompt template
- validate structured JSON-style output
- define a typed tool contract
- write tests for malformed inputs and missing outputs
- explain where secrets and permissions belong
- build a local tool adapter without hiding behavior behind framework magic
- connect a FinAgent capability through a tested boundary
