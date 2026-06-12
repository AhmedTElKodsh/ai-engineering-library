# Authoring Plan: Module 2 Phase 5

## Scope

Create a context window and decoding lab after the tiny transformer block and
before training-versus-inference work.

This phase teaches learners to inspect context selection, token budgets, logits,
probabilities, decoding modes, and model-strategy decisions with toy functions.
It must not require a live model, hosted provider, Hugging Face download, or GPU
workflow.

## Acceptance Checks

- [x] `README.md` frames context windows, decoding choices, and model-boundary
  decisions as inspectable first-principles behavior.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define token estimation, context selection, kept/dropped evidence,
  softmax probabilities, greedy/temperature decoding, and model-strategy notes.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates context budgeting, decoding reasoning, model-fit
  judgment, traceability, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/02-module-2-first-principles/week-05-forward-pass/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: tokenization,
  embeddings, attention, and a tiny transformer trace.
- New capability added by this lesson: choose which context fits a budget and
  understand how logits become token choices.
- Failure mode the learner must reproduce, inspect, or prevent: truncation that
  drops important evidence, decoding assumptions that imply false certainty, or
  choosing a bigger model when deterministic code or retrieval is the right fix.
- FinAgent or practical AI-system improvement: FinAgent can reason about prompt
  context limits and decoding risk before adding larger models.
- Explanation artifact the learner should leave with: a short note naming kept
  context IDs, dropped context IDs, decoding mode, and model-strategy decision.

## Scope Boundary Enhancement

- Minimum required path: estimate tokens, select context by priority within a
  budget, compute probabilities, decode the next token, and choose a model
  strategy from task evidence.
- Optional enrichment only after the minimum path works: add one truncation,
  unsupported decoding mode, or larger-context edge case.
- Advanced doorway, named briefly but not required: beam search, sampling
  strategies beyond the toy, KV caches, long-context architectures, production
  tokenizer quirks, and live model evaluation belong to Course 2/3 depth.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for token estimation, context selection,
  probability calculation, decoding, and strategy notes.
- Failure evidence: dropped context is visible and unsupported choices are not
  hidden behind fluent answers.
- Explanation evidence: learner note explains how context and decoding affect
  reliability.
- Transfer evidence: FinAgent callback showing when retrieval, tools, or
  deterministic code should beat a larger-context model.

## Source Evidence Enhancement

Use `../MODEL_MECHANISM_EVIDENCE_CHECKLIST.md` before changing this lesson.

- Local PDF `Natural Language Processing with Transformers`, p.99-100 and p.122
  for task/body/head and generation framing.
- Local PDF `Natural Language Processing with Transformers`, p.100-101 and p.151
  for decoder masking and decoding choices as generation-time behavior.
- Local PDF `Natural Language Processing with Transformers`, p.233-234 and
  p.254-255 for production efficiency topics as advanced doorway material.
- B09 `Hands-On Large Language Models` indexed baseline for visual LLM intuition
  and concrete mechanism explanations.
- Assessment conversion rule: each source insight must become a token-budget
  assertion, kept/dropped context record, probability check, decoding decision,
  model-strategy note, or learner explanation prompt.
