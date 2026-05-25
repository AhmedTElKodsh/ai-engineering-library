# Phase 3: Structured Context And Trace Lab

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
