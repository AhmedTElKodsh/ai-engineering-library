# Extended Concepts: After The 30-Day Core

This folder holds valuable Course 1 deepening labs that should not slow down the
required 30-day main-track core. Use these after the related main concept works,
after the matching milestone evidence exists, or when a learner has a project
reason to go deeper.

Run commands from the repository root unless a lesson says otherwise.

Expected effort: most extended concept labs take 4-6 focused hours. Treat them
as optional deepening blocks, not hidden prerequisites for the main timeline.
If an extended lab threatens a milestone date, return to the main-track
artifact and schedule the extension later.

## Recommended Order

| Order | Folder | Return here after | Why delay it |
| ---: | --- | --- | --- |
| 1 | `01-model-internals/week-01-tiny-transformer` | Day 10 or Module 2 attention/context work | It deepens model mechanics, but the core only needs enough internals to make good API/RAG/system decisions. |
| 2 | `01-model-internals/week-02-training-vs-inference` | Day 13 or Module 2 context/decoding work | Training math is useful later; the main path only needs the model-adaptation decision boundary. |
| 3 | `02-agentic-systems/week-01-framework-state-machine` | Day 17 or Module 4 explicit workflow work | Framework state is easier after plain Python workflow state is already understood. |
| 4 | `02-agentic-systems/week-02-resumable-orchestration` | Day 18 or Module 4 critique/retry work | Retry and resume depth is useful for production, but not required for the first bounded workflow. |
| 5 | `02-agentic-systems/week-03-multi-role-collaboration` | Day 21 after bounded workflow evidence exists | Multi-role review can distract from the simpler workflow/verification loop. |
| 6 | `02-agentic-systems/week-04-production-multi-agent-boundaries` | Day 21 after stop conditions are reliable | Production multi-agent boundaries belong after single-workflow stop conditions are reliable. |
| 7 | `03-production-depth/week-01-reproducible-package` | Day 22-28 after one runnable boundary works | Packaging depth is useful, but a clean local run command is enough for the main path. |
| 8 | `03-production-depth/week-02-model-adaptation` | Day 30 after eval evidence and next backlog exist | Fine-tuning should remain a decision topic until the learner has strong eval evidence. |

## Extension Rule

Every extended concept should state which main-track day, module, or milestone it
extends. If that prerequisite evidence does not exist yet, return to
`../main-track/30-day-map.md` and finish the core artifact first.

## Rule

Do not use this folder to avoid the main path. Use it to deepen a concept only
after the related main-track artifact, tests, and explanation already exist.
