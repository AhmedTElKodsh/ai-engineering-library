# Extended Concepts

This folder holds valuable Course 1 deepening labs that should not slow down the
required main-track timeline. Use these after the related main concept works, or
when a learner has a project reason to go deeper.

Run commands from the repository root unless a lesson says otherwise.

Expected effort: most extended concept labs take 4-6 focused hours. Treat them
as optional deepening blocks, not hidden prerequisites for the main timeline.
If an extended lab threatens a milestone date, return to the main-track
artifact and schedule the extension later.

## Recommended Order

| Order | Folder | Return here after | Why delay it |
| ---: | --- | --- | --- |
| 1 | `01-model-internals/week-01-tiny-transformer` | `../main-track/02-module-2-first-principles/week-03-attention` or `week-04-context-decoding` | It deepens model mechanics, but Course 1 only needs enough internals to make good API/RAG/system decisions. |
| 2 | `01-model-internals/week-02-training-vs-inference` | `../main-track/02-module-2-first-principles/week-04-context-decoding` | Training math is useful later; the main path only needs the model-adaptation decision boundary. |
| 3 | `02-agentic-systems/week-01-framework-state-machine` | `../main-track/04-module-4-agentic-workflows/week-04-advanced-patterns` | Framework state is easier after plain Python workflow state is already understood. |
| 4 | `02-agentic-systems/week-02-resumable-orchestration` | `../main-track/04-module-4-agentic-workflows/week-04-advanced-patterns` | Retry and resume depth is useful for production, but not required for the first bounded workflow. |
| 5 | `02-agentic-systems/week-03-multi-role-collaboration` | `../main-track/04-module-4-agentic-workflows/week-04-advanced-patterns` | Multi-role review can distract from the simpler workflow/verification loop. |
| 6 | `02-agentic-systems/week-04-production-multi-agent-boundaries` | `../main-track/04-module-4-agentic-workflows/week-04-advanced-patterns` | Production multi-agent boundaries belong after single-workflow stop conditions are reliable. |
| 7 | `03-production-depth/week-01-reproducible-package` | `../main-track/05-module-5-production/week-03-fastapi` or `week-05-optimization` | Packaging depth is useful, but a clean local run command is enough for the main path. |
| 8 | `03-production-depth/week-02-model-adaptation` | `../main-track/05-module-5-production/week-05-optimization` | Fine-tuning should remain a decision topic until the learner has strong eval evidence. |

## Rule

Do not use this folder to avoid the main path. Use it to deepen a concept only
after the related main-track artifact, tests, and explanation already exist.
