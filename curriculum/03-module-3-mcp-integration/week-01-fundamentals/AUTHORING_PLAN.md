# Authoring Plan: Module 3 Phase 1

## Scope

Create the provider-boundary and PromptOps foundation before tools, RAG, or
agents.

This phase teaches learners to validate chat messages, render versioned prompt
templates, estimate tokens/cost, call a fake provider, and record trace metadata
without using a paid API for the first green path.

## Acceptance Checks

- [x] `README.md` frames model calls as validated request/response contracts.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define message validation, prompt rendering, prompt version traces,
  token/cost estimates, provider calls, and trace metadata.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates boundary validation, prompt traceability, cost
  evidence, provider isolation, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/03-module-3-mcp-integration/week-01-fundamentals/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: model mechanism and
  context-limit intuition from Module 2.
- New capability added by this lesson: place model calls behind a testable,
  prompt-versioned, cost-traced boundary.
- Failure mode the learner must reproduce, inspect, or prevent: invalid chat
  roles, blank content, missing prompt variables, untraceable prompt changes, or
  hidden cost.
- FinAgent or practical AI-system improvement: FinAgent can use fake or real
  providers through the same tested interface.
- Explanation artifact the learner should leave with: a short note naming what
  the provider boundary accepts, refuses, logs, and still does not solve.

## Scope Boundary Enhancement

- Minimum required path: validate messages, render a prompt template, estimate
  tokens/cost, call a fake provider, and return trace metadata.
- Optional enrichment only after the minimum path works: add one malformed
  message, missing variable, or secret-safety negative case.
- Advanced doorway, named briefly but not required: streaming, retries,
  rate-limits, provider failover, prompt-management platforms, and production
  prompt governance belong to later Module 5 or Course 3 depth.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for message validation, prompt rendering,
  token/cost estimates, provider call, and trace metadata.
- Failure evidence: malformed messages fail before provider execution.
- Explanation evidence: learner note explains why prompt changes are software
  changes.
- Transfer evidence: FinAgent callback showing how provider isolation supports
  later tools, RAG, and evals.

## Source Evidence Enhancement

Use `../PROMPTOPS_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B01 `Generative AI in Action`, Chapter 6, p.208, `B01_B01_P0208_C001` for
  prompt quality checks and regression behavior.
- B14 `AI Agents and Applications with LangChain, LangGraph, and MCP`, Chapter 2,
  p.40, `B14_B14_P0040_C001` for parameterized prompt templates.
- Local PDF `Principles of Building AI Agents`, p.20 and p.33-34 for provider
  choice, model routing, and structured output as early design decisions.
- Assessment conversion rule: each source insight must become a validation rule,
  prompt-template assertion, version trace, cost/token note, or learner
  explanation prompt.
