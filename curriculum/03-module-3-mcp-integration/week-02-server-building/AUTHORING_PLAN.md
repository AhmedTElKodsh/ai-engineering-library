# Authoring Plan: Module 3 Phase 2

## Scope

Create a local tool-server contract lab after provider boundaries and before
structured context or security handoffs.

This phase teaches learners to expose only explicit FinAgent tools, validate
arguments, normalize success/error responses, and record tool traces. The first
green path must stay local and deterministic.

## Acceptance Checks

- [x] `README.md` frames local tools as contracts with schemas, validation,
  dispatch, structured responses, and traces.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define allowed tool listing, quote lookup, moving average,
  dispatcher success, unknown-tool refusal, and missing-argument refusal.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates schema clarity, validation, refusal, traceability,
  and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/03-module-3-mcp-integration/week-02-server-building/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: provider requests and
  prompt artifacts behind a tested boundary.
- New capability added by this lesson: expose deterministic capabilities as
  tools with explicit allowed inputs, outputs, errors, and trace metadata.
- Failure mode the learner must reproduce, inspect, or prevent: unknown tools,
  missing required arguments, malformed inputs, or hidden tool execution.
- FinAgent or practical AI-system improvement: FinAgent gains safe tool contracts
  before MCP-style integration or agent workflows.
- Explanation artifact the learner should leave with: a short note naming what
  each tool allows, refuses, logs, and hides.

## Scope Boundary Enhancement

- Minimum required path: list allowed tools, implement quote and moving-average
  tools, dispatch valid requests, refuse unknown tools, and refuse missing
  required arguments.
- Optional enrichment only after the minimum path works: add one wrong-type,
  out-of-range, or permission/refusal case.
- Advanced doorway, named briefly but not required: remote MCP servers,
  provider-specific tool schemas, large tool catalogs, arbitrary agent tool
  choice, and distributed tools belong to later modules or Course 3.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for tool listing, tool behavior, dispatch,
  refusals, and traces.
- Failure evidence: unknown or malformed tool calls return normalized errors.
- Explanation evidence: learner note distinguishes tool contract from model
  choice.
- Transfer evidence: FinAgent callback showing how tool contracts protect market
  calculations and quote lookups.

## Source Evidence Enhancement

Use `../TOOL_CONTRACT_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`,
  Chapter 13, p.396, `B14_B14_P0396_C001` for building, exposing, testing, and
  consuming tools.
- B04 `AI Engineering`, Chapter 6, section 11, `B04_B04_S0011_C027` for tool
  failure through invalid tools, wrong parameters, or goal failure.
- Local PDF `Principles of Building AI Agents`, p.35 and p.37 for designing what
  tools do and when they should be called before coding them.
- Assessment conversion rule: each source insight must become an input schema,
  output schema, refused action, malformed-input test, trace field, or learner
  explanation prompt.
