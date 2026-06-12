# Authoring Plan: Module 3 Phase 4

## Scope

Create a secure MCP-style and agent-handoff boundary lab after provider, tool,
and context contracts.

This phase teaches learners to enforce role policies, detect injection-like
instructions, redact secrets, build minimal handoffs, and authorize tool calls
inside the receiving role's boundary. It must stay local and testable.

## Acceptance Checks

- [x] `README.md` frames permissions, injection checks, secret redaction, and
  handoff gates as integration safety work.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define explicit role-policy authorization, injection detection,
  secret redaction, safe handoff construction, injection refusal, and
  handoff-scoped tool-call authorization.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates permission boundaries, refusal behavior,
  secret-safety, handoff minimality, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/03-module-3-mcp-integration/week-04-security-a2a/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: provider, tool,
  context, output, and trace contracts.
- New capability added by this lesson: carry security policy through MCP-style
  tool exposure and role-to-role handoff.
- Failure mode the learner must reproduce, inspect, or prevent: unauthorized
  tools, leaked secrets, prompt injection, or handoffs that expose unrelated
  state.
- FinAgent or practical AI-system improvement: FinAgent collaboration remains
  bounded, auditable, and safe before Module 4 workflow expansion.
- Explanation artifact the learner should leave with: a short note naming the
  allowed action, refused action, redaction rule, handoff fields, and remaining
  security risk.

## Scope Boundary Enhancement

- Minimum required path: check tool permissions, detect injection signals, redact
  secret values, build a minimal handoff, and authorize only handoff-scoped tool
  calls.
- Optional enrichment only after the minimum path works: add one unsupported
  capability, role mismatch, or secret-like key pattern.
- Advanced doorway, named briefly but not required: remote MCP servers,
  enterprise authorization systems, long-running multi-agent handoffs, and
  distributed audit trails belong to Course 3 or specializations.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for permissions, injection detection, redaction,
  handoff construction, and handoff-scoped authorization.
- Failure evidence: unauthorized tools and unsafe handoffs are refused.
- Explanation evidence: learner note explains how security policy travels with
  the handoff.
- Transfer evidence: FinAgent callback showing why Module 4 workflows should use
  explicit permissions and refusal behavior.

## Source Evidence Enhancement

Use `../TOOL_CONTRACT_EVIDENCE_CHECKLIST.md` before changing this lesson. Use
`../PROMPTOPS_EVIDENCE_CHECKLIST.md` when the lesson touches injection or prompt
content.

- B15 `AI Agents with MCP`, Chapter 2, section 6, `B15_B15_S0006_C003` for MCP
  clients deciding which primitives and server capabilities are supported.
- B15 `AI Agents with MCP`, Chapter 2, section 6, `B15_B15_S0006_C022` for tool
  descriptions and input schemas that may need translation while keeping a
  stable internal schema.
- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`,
  Chapter 13, p.411-413, `B14_B14_P0411_C001`, `B14_B14_P0412_C001`,
  `B14_B14_P0413_C001` for inspecting, verifying, and consuming tool servers
  through a test path.
- Local PDF `Principles of Building AI Agents`, p.49-50 and p.57-58 for
  guardrails, authorization, and MCP as a standard client/server boundary.
- Assessment conversion rule: each source insight must become an allowlist rule,
  unsupported-capability refusal, secret-redaction check, handoff field,
  authorization assertion, trace field, or learner explanation prompt.
