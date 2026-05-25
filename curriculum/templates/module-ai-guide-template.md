# Module AI Authoring Guide Template

Copy this file to `curriculum/<module>/AI_AUTHORING_GUIDE.md` and customize it before building new lessons.

## Module Role

Explain what this module contributes to the Layer 1 learner journey.

## AI Authoring Priorities

1. Keep the module aligned with `../../.kiro/specs/curriculum-planning/ROADMAP.md`.
2. Follow `../../.kiro/specs/curriculum-planning/SPEC.md`.
3. Use the global `../AI_AUTHORING_GUIDE.md`.
4. Build one learner-ready slice at a time.

## Required Lesson Artifacts

Each week or project needs:

- `README.md`
- `workbench.py`
- `tests/`
- `hints.md`
- `rubric.md`
- reviewer-only reference notes under `.kiro/specs/curriculum-planning/implementation-notes/`

## Module-Specific Guardrails

- Keep stable folder paths.
- Use local fixtures or deterministic examples for the first-success path.
- Do not hide essential behavior in unexplained helpers.
- Make the module's connection to prior modules and FinAgent explicit.

## Pedagogy Enforcement

Every lesson in this module must show the teaching method in learner-facing files:

- engaging problem frame
- cafe-style storytelling, as if a knowledgeable friend is explaining with a notebook in a cafe
- action before lecture
- Socratic prediction before running or editing
- worked trace before independent work
- Evidence First debugging from a failure, log, trace, or data example
- Smallest Change implementation guidance
- Explain Like a Teammate reflection
- One Step Stronger extension
- transfer back to FinAgent, production AI engineering, or the next module
- at least one useful visual, diagram, mind map, or table when it clarifies the topic
- an optional topic-specific video/visual resource found through fresh web search
- optional books/courses from `curriculum/resources/curated-learning-resources.md`

If a lesson lacks these elements, revise the lesson before adding more technical content.

## Verification

Use `python -m pytest`. For TODO workbenches, clean import and expected learner failures are the scaffold gate.
