# Authoring Plan: Module 3 Phase 3

## Scope

Create a structured context and trace lab after local tool contracts and before
secure handoff.

This phase teaches learners to sanitize retrieved/user context, validate source
metadata, validate structured answers, and build traces that prove citation
grounding without leaking raw prompt content.

## Acceptance Checks

- [x] `README.md` frames context engineering as sanitized inputs, structured
  outputs, and safe traces.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define injection-like text sanitization, source/ticker metadata
  validation, rendered context lines, structured answer validation, and trace
  records that hide raw answer text.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates sanitization, context contracts, output validation,
  trace safety, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-03-context-engineering/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: local tools with
  structured success/error behavior.
- New capability added by this lesson: prepare safe model context and validate
  structured answers before downstream use.
- Failure mode the learner must reproduce, inspect, or prevent: prompt injection
  in retrieved text, missing source metadata, malformed output, unsupported
  confidence labels, or trace leakage.
- FinAgent or practical AI-system improvement: FinAgent can preserve
  source-grounded context across model calls without trusting raw text blindly.
- Explanation artifact the learner should leave with: a short note naming what
  context was sanitized, what output was refused, and what trace fields prove.

## Scope Boundary Enhancement

- Minimum required path: sanitize text, validate context items, render model
  context, validate structured answers, and build safe trace records.
- Optional enrichment only after the minimum path works: add one invented
  citation, missing metadata, or unsafe retrieved-text case.
- Advanced doorway, named briefly but not required: full prompt-injection
  classifiers, privacy review platforms, model-judge citation checks, and
  enterprise prompt governance belong to Module 5 or Course 3.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for sanitization, context validation, context
  rendering, answer validation, and trace records.
- Failure evidence: malformed or unsafe context fails closed.
- Explanation evidence: learner note explains what traces reveal and what they
  hide.
- Transfer evidence: FinAgent callback showing how context and traces support
  later RAG and eval work.

## Source Evidence Enhancement

Use `../PROMPTOPS_EVIDENCE_CHECKLIST.md` and
`../TOOL_CONTRACT_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B01 `Generative AI in Action`, Chapter 6, p.203-204,
  `B01_B01_P0203_C001`, `B01_B01_P0204_C001` for prompt injection as unsafe
  instruction redirection.
- B01 `Generative AI in Action`, Chapter 13, p.415, `B01_B01_P0415_C001` for
  prompt injection as a safety and production risk.
- Local PDF `Principles of Building AI Agents`, p.33-34 for structured output as
  application data that should be validated.
- Assessment conversion rule: each source insight must become a sanitization
  rule, required context field, structured-output validation, citation-grounding
  check, safe trace field, or learner explanation prompt.
