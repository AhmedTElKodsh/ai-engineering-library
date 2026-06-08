# Week 7: Model Selection And Adaptation

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | compare production cost and reliability tradeoffs. |
| What new capability am I adding? | choose between code, prompting, structured outputs, RAG, tools, agents, and fine-tuning. |
| What failure does this help me catch? | premature fine-tuning and model-choice arguments without evidence. |
| How does this improve FinAgent or a practical AI system? | keeps FinAgent adaptation decisions practical and maintainable. |
| What should I be able to explain afterward? | why fine-tuning is sometimes useful and often not first. |

## Before You Run

Predict the best option for a calculation failure. A tool or deterministic function should usually beat prompt-only or fine-tuning.

## Worked Trace

Read `tests/test_model_adaptation.py` before editing:

```text
score_option -> rank_options -> choose_adaptation -> build_decision_note
```

This is a decision framework. It does not require hands-on fine-tuning in Course 1.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k score -v` | explain why tools win calculation tasks |
| Ranking | `python -m pytest tests -k rank -v` | defend the best-first order |
| Adaptation choice | `python -m pytest tests -k choose -v` | explain the fine-tuning boundary |
| Minimum complete | `python -m pytest tests -v` | write a decision note a reviewer can challenge |

## Smallest Change

Score the alternatives from task evidence. Do not make fine-tuning the default answer.

Use `hints.md` after naming the mistaken recommendation. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Decision rule fixed:
Simpler alternative considered:
Why fine-tuning is or is not justified:
AI assistance used:
```

