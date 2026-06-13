# Reference Behavior: Module 5 Week 7 Model Adaptation Decision

Scaffold: `curriculum/main-track/extended-concepts/03-production-depth/week-02-model-adaptation/workbench.py`

## Intent

This lesson should teach that fine-tuning is one adaptation option, not the default. Learners compare deterministic code, prompts, RAG, tools, and fine-tuning against requirement evidence.

## Intended Behavior

- Score adaptation options based on task, data, risk, cost, latency, and maintenance.
- Prefer tools for calculation-heavy requirements.
- Rank options deterministically.
- Explain when fine-tuning is inappropriate or appropriate.
- Build decision notes with task, failure, recommendation, and tradeoffs.

## Reviewer Edge Cases

- Fine-tuning can win only when labeled examples and style/adaptation need justify it.
- Calculation tasks should prefer tools or deterministic code.
- Decision notes should name failure modes.

## Do Not Accept

- Fine-tuning as a default recommendation.
- Rankings without criteria.
- Notes that omit safety, data, or maintenance tradeoffs.
