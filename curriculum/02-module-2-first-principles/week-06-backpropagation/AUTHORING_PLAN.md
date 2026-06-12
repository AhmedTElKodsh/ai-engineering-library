# Authoring Plan: Module 2 Phase 6

## Scope

Create a training-versus-inference lab after context and decoding.

This phase teaches learners to inspect loss, gradients, parameter updates,
inference traces, and adaptation decisions with a tiny linear model. It must not
turn Course 1 into a real LLM training, fine-tuning, PyTorch, Hugging Face, GPU,
or LoRA lab.

## Acceptance Checks

- [x] `README.md` frames loss, gradients, training state, inference state, and
  adaptation choices as small inspectable mechanisms.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define prediction, mean squared error, gradient update,
  one-epoch training, inference trace immutability, and adaptation recommendation
  boundaries.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates mechanism accuracy, training/inference distinction,
  adaptation judgment, traceability, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/02-module-2-first-principles/week-06-backpropagation/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: context budgeting,
  logits, probabilities, decoding choices, and model-strategy notes.
- New capability added by this lesson: distinguish inference from training and
  see how loss can drive parameter updates in a tiny model.
- Failure mode the learner must reproduce, inspect, or prevent:
  training/inference confusion, mutating model state during inference, or
  recommending fine-tuning for bad math, missing knowledge, or weak formatting.
- FinAgent or practical AI-system improvement: FinAgent adaptation decisions are
  grounded in evidence, cost, and simpler alternatives.
- Explanation artifact the learner should leave with: a short note explaining
  what changed during training, what did not change during inference, and which
  adaptation path is the first choice.

## Scope Boundary Enhancement

- Minimum required path: implement prediction, loss, one gradient step,
  one-epoch training, inference trace, and a simple adaptation recommendation.
- Optional enrichment only after the minimum path works: add one failure case for
  missing knowledge, style, output format, or calculation and defend the
  adaptation recommendation.
- Advanced doorway, named briefly but not required: full pretraining,
  supervised fine-tuning, LoRA/QLoRA, optimizer variants, backprop through
  transformers, GPU training, distillation, quantization, pruning, and ONNX
  belong to Course 2/3 or a future adaptation specialization.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for prediction, loss, parameter update,
  training, inference trace, and adaptation recommendation.
- Failure evidence: inference does not mutate model parameters and fine-tuning
  is not recommended as the first fix for calculation failures.
- Explanation evidence: learner note separates training-time changes from
  inference-time behavior.
- Transfer evidence: FinAgent callback showing when deterministic code,
  structured output, RAG, tools, or later training is the practical choice.

## Source Evidence Enhancement

Use `../MODEL_MECHANISM_EVIDENCE_CHECKLIST.md` before changing this lesson.
Use `../../05-module-5-production/EVAL_OBSERVABILITY_EVIDENCE_CHECKLIST.md` if
future edits connect this lesson to production adaptation decisions.

- B13 `Build a Large Language Model (From Scratch)` indexed baseline for
  from-scratch model internals as useful later-course depth, not Course 1 scope.
- Local PDF `Natural Language Processing with Transformers`, p.99-100 and p.122
  for model body/head and task-framing concepts that support adaptation
  decisions.
- Local PDF `Natural Language Processing with Transformers`, p.233-234 and
  p.254-255 for production efficiency and optimization as advanced doorway
  topics.
- Ledger decision: Course 1 keeps full fine-tuning and LoRA implementation
  deferred; the required outcome is mechanism intuition and adaptation judgment.
- Assessment conversion rule: each source insight must become a loss assertion,
  parameter-update check, inference immutability check, adaptation rule,
  advanced-doorway note, or learner explanation prompt.
