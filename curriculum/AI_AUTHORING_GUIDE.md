# AI Authoring Guide

Use this file before creating or modifying any learner-facing curriculum module.

The source of truth is still `.kiro/specs/curriculum-planning/ROADMAP.md` for sequencing and `.kiro/specs/curriculum-planning/SPEC.md` for the authoring contract. This guide turns those planning rules into a practical working checklist for AI assistants.

## Default Workflow

1. Read the module `README.md` and `AI_AUTHORING_GUIDE.md`.
2. Check `curriculum/LEARNER_JOURNEY_MAP.md` so the lesson's place in the minimum path, optional enrichment, and advanced doorway is explicit.
3. Check `.kiro/specs/curriculum-planning/CURRICULUM_REVIEW.md` for the current next implementation order.
4. Keep stable folder names unless a migration is explicitly requested.
5. Use `workbench.py` for learner-editable code.
6. Keep reviewer-only intended behavior under `.kiro/specs/curriculum-planning/implementation-notes/`.
7. Build one vertical slice at a time: `README.md`, `workbench.py`, `tests/`, `hints.md`, and `rubric.md`.
8. Run `python -m pytest` commands from the lesson folder or with explicit paths.
9. Treat expected TODO failures as lesson state only after imports and collection are clean.

## Non-Negotiables

- Learners write meaningful code themselves.
- AI provides hints, explanations, review, debugging help, and reference-after-effort support.
- Do not put full solutions in learner-facing folders.
- Do not require paid APIs for the first successful learner path.
- Do not add hosted platform infrastructure to Layer 1 unless the lesson directly teaches that production concept.
- Do not turn FinAgent into investment advice, trading automation, or a full fintech SaaS.

## Lesson Shape

Every lesson should make this loop visible to the learner:

1. Read the realistic problem.
2. Trace code, tests, logs, data, or a worked example.
3. Predict behavior before running.
4. Modify one constrained behavior.
5. Create the TODO implementation.
6. Verify with tests and interpret failures.
7. Reflect on limits, failure modes, and transfer.

Use the named rituals from the spec:

- Before You Run
- Evidence First
- Smallest Change
- Explain Like a Teammate
- One Step Stronger
- Reference After Effort

## Teaching Delivery Enforcement

Before writing or editing lesson files, make the teaching method explicit in the `AUTHORING_PLAN.md`.

Every learner-facing lesson must include:

- a visible five-question learner logic map: current capability, new capability, failure caught, FinAgent/practical improvement, explanation target
- a clearly labeled minimum path and optional enrichment boundary
- a short advanced doorway that orients the learner without expanding the required task
- an engaging problem frame, mission, or realistic failure
- cafe-style storytelling: explain the concept like a knowledgeable friend with a notebook, small examples, and no condescension
- action before lecture: run, trace, predict, inspect, or compare before long explanation
- concept after context: theory tied to the code decision the learner is about to make
- a worked trace before independent work
- at least two Socratic prompts, including one prediction prompt and one explanation prompt
- an Evidence First moment that starts from a test failure, trace, log, or data example
- at least one useful visual, diagram, mind map, sequence sketch, or table when it clarifies the next action
- one optional visual/video resource found through a fresh web search for the exact lesson topic
- optional book/course references from `curriculum/resources/curated-learning-resources.md` when deeper study helps
- progressive hints that preserve learner agency
- verification copy that explains expected starting failures
- reflection that names transfer to FinAgent, production AI engineering, or the next module
- portfolio evidence: technical artifact, failure artifact, explanation artifact, and transfer artifact

If these elements are missing, stop and revise the lesson surface before adding more code.

## Quality Gate

Before calling a lesson complete, fill out `curriculum/templates/lesson-quality-checklist.md` or an equivalent authoring plan in the lesson folder. For checkpoints, larger projects, and capstone work, use `curriculum/templates/evidence-portfolio-template.md` to capture technical, failure, explanation, and transfer evidence.

The minimum evidence is:

- scaffold imports and test collection are clean
- starting failures are intentional TODO failures
- reference behavior is captured outside learner-facing folders
- tests teach the intended behavior through names and assertion messages
- hints are progressive
- pedagogy is visible in the README, hints, tests, and rubric
- README commands match the actual folder layout
- rubric checks correctness, process, safety, and reflection
- the lesson has a real FinAgent or practical AI engineering callback
