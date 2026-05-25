# Module 0 AI Authoring Guide

Use this guide when creating or modifying Python foundations lessons.

## Module Role

Module 0 is a readiness and remediation track, not a mandatory beginner course. It diagnoses Python gaps, repairs only what is needed, and provides the post-Module-1 stock pipeline bridge.

The remediation path should feel like a small engineering project. Learners review concepts only when tests reveal a gap, then return to implementation. Do not turn the refresher into answer-key study or a syntax encyclopedia.

## Authoring Priorities

1. Keep the diagnostic first.
2. Keep Week 01 conditional remediation as the FinAgent intake mini-project.
3. Keep Week 02 optional reinforcement.
4. Keep Week 03 as the post-Module-1 integration bridge.
5. Use `concept-review-map.md` for targeted concept review and best-practice references.
6. Connect every Python pattern to later AI engineering work.

## Lesson Requirements

Each learner-facing lesson should include:

- a realistic AI engineering use case
- `workbench.py` or `diagnostic_workbench.py`
- tests that import before learner edits
- progressive hints
- a rubric or gate
- concept-review pointers when a Python gap is likely
- one reflection prompt about how the Python pattern transfers to FinAgent

## Guardrails

- Do not turn this into a beginner syntax tour.
- Do not require learners to complete every folder before Module 1.
- Do not provide final implementations as the main remediation path.
- Do not rename stable folders to fix wording problems.
- Treat TODO test failures as expected only after import and collection are clean.
- Use `python -m pytest` in commands.

## Pedagogy Enforcement

Every Module 0 lesson must make the teaching style visible:

- explain the concept like a knowledgeable friend at a cafe, using a small notebook-style example before formal terms
- include a useful diagram, mind map, flow table, or tiny visual trace when it clarifies the learner's next action
- search the web before publishing for one current, high-quality visual or video resource for the exact Python or pytest topic
- add optional book/course references from `../resources/curated-learning-resources.md` when deeper study would help
- frame the Python skill as a real AI engineering repair or readiness problem
- ask learners to predict a test result before editing
- make learners inspect the failing test or diagnostic output first
- teach one small Python behavior at a time
- route stuck learners to concept review and best-practice references before direct answers
- use hints to nudge, not solve
- end with a transfer prompt that connects the Python pattern to FinAgent or later modules

If a lesson reads like syntax notes without a trace, prediction, test interpretation, and transfer prompt, revise it before adding more content.

## Good Module 0 Slice

A good slice teaches one Python habit through a practical task: validate input, transform data, manage config, handle errors, stream values, or compose a small pipeline.
