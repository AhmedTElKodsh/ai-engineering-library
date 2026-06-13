# Phase 6: Training Versus Inference Lab

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | explain inference-time model behavior at toy scale. |
| What new capability am I adding? | connect loss, simple gradient updates, and adaptation decisions. |
| What failure does this help me catch? | training/inference confusion and premature fine-tuning decisions. |
| How does this improve FinAgent or a practical AI system? | keeps FinAgent adaptation choices grounded in evidence and cost. |
| What should I be able to explain afterward? | when to use code, prompting, RAG, tools, or later training. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** read the scenario, inspect the tests or fixtures, complete the TODOs in `workbench.py`, run the verification command, and write the reflection/evidence note.
- **Optional enrichment:** add one edge case, comparison, or small test after the required behavior works.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Course 1 task.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

Folder: `week-02-training-vs-inference`
Expected time to finish: 4-6 hours
File to edit: `workbench.py`
Test folder: `tests/`

## Learning Goal

Understand loss, gradients, and adaptation decisions without training a real LLM.

## Real-World Context

FinAgent should not jump to fine-tuning because it sounds advanced. This lab uses tiny linear prediction to show what training changes, what inference does not change, and when system design may be a better fix.

## Evidence First

Run:

```powershell
python -m pytest tests -v
```

Expected first run: tests collect cleanly and fail on TODO behavior.

## Section Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Loss | `python -m pytest tests -k "predict or mean_squared_error" -v` | explain how prediction error becomes a number |
| Gradient step | `python -m pytest tests -k "gradient_step or train_one_epoch" -v` | explain which parameters change during training |
| Adaptation decision | `python -m pytest tests -k recommend_adaptation -v` | explain when fine-tuning is not the first fix |

