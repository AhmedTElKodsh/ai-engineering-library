# Lesson Quality Checklist

Copy this checklist into a lesson `AUTHORING_PLAN.md` before building a new learner-facing slice. Fill it in with concrete decisions, not generic yes/no answers.

## Lesson Identity

- Module:
- Week or project:
- Stable folder:
- Learner-facing goal:
- FinAgent or practical AI engineering callback:
- Primary concept:
- Secondary operational concern:
- Minimum required path:
- Optional enrichment boundary:
- Advanced doorway:

## Learner Surface

- [ ] `README.md` includes learning goal, realistic context, story, trace, task, verification, reflection, and extension.
- [ ] `README.md` includes the five-question learner logic map: current capability, new capability, failure solved, FinAgent/practical improvement, explanation target.
- [ ] `README.md` names the minimum path, optional enrichment, and advanced doorway without making advanced work required.
- [ ] `workbench.py` is the primary learner-editable file.
- [ ] `workbench.py` imports cleanly before TODOs are completed.
- [ ] `hints.md` uses progressive hints without revealing the full implementation early.
- [ ] `rubric.md` covers correctness, learning process, FinAgent or practical transfer, code quality, and verification.
- [ ] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [ ] No full solution appears in the learner-facing folder.

## Pedagogy

- [ ] Engaging problem frame gives the learner a realistic mission, failure, or role.
- [ ] Cafe-style storytelling explains the concept like a knowledgeable friend using simple examples and plain language.
- [ ] Action-before-lecture moment appears before deep explanation.
- [ ] Concept explanation is tied to the next implementation decision.
- [ ] A useful diagram, mind map, sequence sketch, table, or visual explanation clarifies the next action.
- [ ] Whole-part-whole is visible: complete context, one part, reconnect to the full system.
- [ ] Before You Run prompt asks the learner to predict output, failure, or behavior.
- [ ] Evidence First prompt asks the learner to inspect a test failure, log, trace, or data example.
- [ ] Smallest Change guidance tells the learner which behavior to fix first.
- [ ] Explain Like a Teammate prompt asks for a short written explanation.
- [ ] One Step Stronger asks for a small edge case, variation, or test.
- [ ] Reflection asks what the implementation proves and what it does not prove.
- [ ] Evidence portfolio asks for technical evidence, failure evidence, explanation evidence, and transfer evidence.
- [ ] The lesson avoids research-report prose and keeps citations or source synthesis out of learner flow.
- [ ] The rubric checks learning behavior, not only final correctness.

## Optional References

- [ ] AI author searched the web for a current visual/video resource for the exact topic.
- [ ] Optional video/resource link is included only if it helps the learner understand the lesson.
- [ ] Book/course references are selected from `curriculum/resources/curated-learning-resources.md` or another high-trust source.
- [ ] Resource links are optional and do not replace the hands-on task.
- [ ] No pirated books, unofficial PDF mirrors, or low-trust reposts are linked.

## Test Design

- [ ] Tests import the learner workbench before learner edits.
- [ ] Tests isolate generic `workbench` imports when collection spans multiple lesson folders.
- [ ] Test names describe learner-visible behavior.
- [ ] Assertion messages point to the intended concept.
- [ ] Starting failures are expected TODO failures, not import errors or path errors.
- [ ] Edge cases are included.
- [ ] Failure modes are included where the lesson claims reliability or safety.
- [ ] Verification command uses `python -m pytest`.

## Reference Validation

- [ ] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/`.
- [ ] Reference behavior proves the learner-visible tests are solvable.
- [ ] Hidden or reviewer-only notes cover edge cases not fully shown to learners.
- [ ] Any API, network, secret, or unstable dependency is mocked or optional for the first-success path.

## Scope Control

- [ ] The lesson teaches one primary concept.
- [ ] The lesson adds at most one secondary operational concern.
- [ ] Extension work is clearly marked as optional.
- [ ] Advanced or platform scope is parked rather than pulled into the core lesson.
- [ ] Any advanced doorway is 1-3 sentences and does not expand the required task.

## Completion Evidence

- Scaffold command:

```powershell
python -m pytest --collect-only tests -q
```

- Learner-start command:

```powershell
python -m pytest tests -v
```

- Expected starting result:
- Reference validation path:
- Follow-up files to update:
