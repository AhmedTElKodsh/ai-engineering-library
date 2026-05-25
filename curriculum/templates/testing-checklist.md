# Testing Checklist

Before publishing a lesson or project:

- [ ] `workbench.py` imports cleanly.
- [ ] Test collection succeeds before learner TODOs are complete.
- [ ] Tests fail only for intended TODO behavior.
- [ ] Test names describe learner-visible behavior.
- [ ] Assertion messages are helpful.
- [ ] Edge cases are included.
- [ ] Failure modes are included for projects.
- [ ] Hints do not reveal the full solution too early.
- [ ] README commands match the actual file layout.
- [ ] Rubric matches the stated learning goal.
- [ ] Verification commands use `python -m pytest`.
- [ ] Reviewer-only reference behavior is documented outside learner-facing folders.
