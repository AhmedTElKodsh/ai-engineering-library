# Phase 3: Structured Context And Trace Lab

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | call local tools through explicit contracts. |
| What new capability am I adding? | sanitize context, validate structured answers, and build traces. |
| What failure does this help me catch? | prompt injection, missing metadata, malformed outputs, and weak citations. |
| How does this improve FinAgent or a practical AI system? | helps FinAgent preserve source-grounded context across model calls. |
| What should I be able to explain afterward? | how structured context and trace metadata support debugging. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** read the scenario, inspect the tests or fixtures, complete the TODOs in `workbench.py`, run the verification command, and write the reflection/evidence note.
- **Optional enrichment:** add one edge case, comparison, or small test after the required behavior works.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Course 1 task.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

Folder: `week-03-context-engineering`  
Expected time to finish: 4-6 hours  
File to edit: `workbench.py`  
Test folder: `tests/`  
Core test file: `tests/test_context_trace.py`

## Learning Goal

Validate context, structured outputs, and trace metadata so tool and model results can be trusted only after they pass explicit checks.

## What You Will Build

- a structured output schema for a FinAgent-style response
- input sanitization for user requests and retrieved context
- output validation before downstream use
- normalized errors for missing, malformed, or unsafe fields
- trace metadata that explains what was accepted, refused, and transformed

## Success Looks Like

- Structured outputs are checked before use.
- Missing or malformed tool/model results fail closed.
- Trace records help debug the failure without leaking secrets.
- The learner can explain the difference between context engineering and prompt improvisation.

## Learner Loop

1. Read the structured output contract.
2. Inspect malformed examples before writing code.
3. Predict which field should fail validation first.
4. Implement one sanitizer or validator.
5. Run the smallest relevant test.
6. Record what the trace proves.
7. Reflect on what should be hidden from the model.

## Expected First Run And Checkpoints

Run `python -m pytest tests -v`. The first run should collect cleanly and fail
on TODO behavior.

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Sanitization | `python -m pytest tests -k sanitize_text -v` | explain how unsafe instructions are removed without deleting market content |
| Context contract | `python -m pytest tests -k "validate_context_items or prepare_model_context" -v` | explain which source fields must exist before model use |
| Output and trace | `python -m pytest tests -k "validate_structured_answer or build_trace_record" -v` | explain how citations, confidence, and trace metadata protect downstream steps |

## Evidence Artifact

```text
Structured output expected:
Malformed output refused:
Sanitization rule applied:
Trace fields:
Failure message:
What downstream step is now safer:
```

## Connection To Phase 2

Phase 2 created a tool boundary. Phase 3 makes the context and outputs around that boundary inspectable before an assistant relies on them.

