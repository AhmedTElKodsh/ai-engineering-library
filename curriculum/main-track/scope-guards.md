# Main Track Scope Guards

Use this file whenever the main track starts expanding. The core question is:
does this help the learner complete the 30-day transformation, or should it
move to `../extended-concepts/`?

## Required Core Test

A main-track item must pass all five gates:

| Gate | Keep in main-track only if... |
| --- | --- |
| 30-day necessity | the learner cannot reasonably complete the core outcome without it |
| Daily time box | it can produce observable evidence inside a bounded daily slice |
| Milestone integrity | it strengthens Day 7, 14, 21, 28, or 30 instead of replacing the gate |
| Evidence portfolio | it creates code, tests, evals, traces, notes, demo proof, or explanation |
| Scope guard | it has a clear "not today" boundary |

## Default Deferrals

Move or delay these unless a specific main-track day cannot work without them:

- transformer internals beyond API/RAG decision intuition
- training math and fine-tuning implementation
- advanced RAG variants before simple cited retrieval works
- framework state machines before plain Python workflow state works
- multi-agent collaboration before a single bounded workflow passes
- long-term memory architectures before traceable state exists
- production-scale eval platforms before local golden evals exist
- hosted CI/CD before a local quality gate works
- enterprise observability stacks before structured local traces exist
- full frontend/backend platforms before one runnable service boundary works
- custom model serving, distributed systems depth, and enterprise governance

## Learner Permission Statements

- Do not optimize prompts before you can reproduce failures.
- Do not add agents before the tool contract is clear.
- Do not deploy before you have an evaluation note.
- Do not chase multi-agent systems inside the core unless the single-workflow baseline works.
- Do not keep adding features to avoid writing the limitation note.
- Do not treat extended concepts as missing work; treat them as the next learning shelf.

