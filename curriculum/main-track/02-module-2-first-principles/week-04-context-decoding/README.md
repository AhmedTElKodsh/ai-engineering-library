# Phase 4: Context Window And Decoding Lab

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | trace attention outputs for market context. |
| What new capability am I adding? | inspect context windows, decoding choices, and model-boundary decisions. |
| What failure does this help me catch? | truncation, unsupported decoding assumptions, and wrong model-fit choices. |
| How does this improve FinAgent or a practical AI system? | helps FinAgent choose prompts, retrieval, or tools before bigger models. |
| What should I be able to explain afterward? | how context and decoding choices affect answer reliability. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** read the scenario, inspect the tests or fixtures, complete the TODOs in `workbench.py`, run the verification command, and write the reflection/evidence note.
- **Optional enrichment:** add one edge case, comparison, or small test after the required behavior works.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Course 1 task.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

Folder: `week-04-context-decoding`
Expected time to finish: 4-6 hours
File to edit: `workbench.py`
Test folder: `tests/`

## Learning Goal

Explore context windows, logits, decoding choices, and model-selection tradeoffs with small inspectable functions.

## Real-World Context

FinAgent cannot send every market note to a model. It must budget context, choose what to keep, and understand how decoding settings affect output risk. This lab keeps those decisions deterministic.

## Evidence First

Run:

```powershell
python -m pytest tests -v
```

Expected first run: tests collect cleanly and fail on TODO behavior.

## Section Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Context budget | `python -m pytest tests -k "estimate_tokens or select_context" -v` | explain what gets kept when the budget is tight |
| Decoding | `python -m pytest tests -k "softmax or decode_next_token" -v` | explain how greedy and temperature decoding differ |
| Decision note | `python -m pytest tests -k choose_model_strategy -v` | explain why a larger model is not always the right fix |

## Evidence Artifact

Write a short note with kept context IDs, dropped context IDs, decoding mode, and model-strategy decision.

