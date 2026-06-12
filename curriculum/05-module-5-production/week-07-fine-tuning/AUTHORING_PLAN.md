# Authoring Plan: Module 5 Week 7

## Scope

Create a model selection and adaptation decision lab after production
optimization.

This week teaches learners to compare deterministic code, prompt-only design,
structured outputs, RAG, tools, agents, and fine-tuning from task evidence.
Fine-tuning stays a decision option in Course 1, not a required PyTorch,
Hugging Face, LoRA, or GPU implementation lab.

## Acceptance Checks

- [x] `README.md` frames model adaptation as an evidence-backed choice, not a
  prestige move.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define option scoring, best-first ranking, structured-output choice,
  RAG choice for missing knowledge, tool preference for calculation, and the
  narrow case where fine-tuning can be justified.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates decision quality, simpler-alternative comparison,
  fine-tuning boundary, risk reasoning, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/05-module-5-production/week-07-fine-tuning/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: cost, latency, cache,
  retry, release, and observability tradeoff evidence from Module 5.
- New capability added by this lesson: choose the simplest sufficient adaptation
  strategy for a task and defend why fine-tuning is or is not justified.
- Failure mode the learner must reproduce, inspect, or prevent: using
  fine-tuning to fix missing knowledge, calculation errors, output-format issues,
  or weak system boundaries.
- FinAgent or practical AI-system improvement: FinAgent gets a maintainable
  model/system decision note before advanced adaptation work is considered.
- Explanation artifact the learner should leave with: a decision note naming the
  task, failure type, first choice, simpler alternatives considered, fine-tuning
  boundary, and remaining risk.

## Scope Boundary Enhancement

- Minimum required path: score adaptation options, rank them, choose the first
  option, and build a reviewer-readable decision note.
- Optional enrichment only after the minimum path works: add one extra
  requirement case for safety, style, latency, or missing knowledge and defend
  the ranking.
- Advanced doorway, named briefly but not required: supervised fine-tuning,
  LoRA/QLoRA, data curation for training, GPU workflows, distillation,
  quantization, and model serving belong to Course 3 or a future adaptation
  specialization.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for scoring, ranking, adaptation choice, and
  decision note behavior.
- Failure evidence: premature fine-tuning recommendations are rejected for
  calculation, missing-knowledge, and format problems.
- Explanation evidence: learner note compares simpler alternatives before naming
  fine-tuning.
- Transfer evidence: FinAgent callback showing why a tool, structured output, or
  RAG is often safer and cheaper than training.

## Source Evidence Enhancement

Use `../EVAL_OBSERVABILITY_EVIDENCE_CHECKLIST.md` before changing this lesson.
Use `../../02-module-2-first-principles/MODEL_MECHANISM_EVIDENCE_CHECKLIST.md`
when connecting adaptation choices to model-task intuition.

- Local PDF `LLMOps`, p.52, p.54, and p.56-58 for model/config rationale, cost
  comparison, risk notes, and production readiness expectations.
- Local PDF `Natural Language Processing with Transformers`, p.99-100 and p.122
  for body/head task framing and why different tasks may need different output
  layers.
- Local PDF `Natural Language Processing with Transformers`, p.233-234 and
  p.254-255 for production transformer efficiency as a tradeoff space rather
  than a Course 1 implementation requirement.
- Ledger decision: full fine-tuning and LoRA implementation are deferred for
  Course 1; the required learner outcome is a decision framework and comparison
  with deterministic code, prompts, structured outputs, RAG, tools, and agents.
- Assessment conversion rule: each source insight must become an option score,
  ranking rule, simpler-alternative check, fine-tuning boundary note, risk note,
  or learner explanation prompt.
