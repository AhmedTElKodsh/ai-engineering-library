# Authoring Plan: Module 4 Phase 6

## Scope

Create an optional resumable orchestration lab after explicit state-machine
work.

This phase teaches checkpoints, retry budgets, error traces, resume decisions,
and bounded recovery. It must stay as pure data transformations: no queues,
timers, background workers, or orchestration framework in the required path.

## Acceptance Checks

- [x] `README.md` frames resumability as bounded recovery, not more automation.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define checkpoint deduplication, retry budgets, error recording,
  resume-from-checkpoint, and final trace behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates checkpoint clarity, retry safety, resume behavior,
  traceability, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/04-module-4-agentic-workflows/week-06-advanced-orchestration/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: workflow state and
  immutable transitions.
- New capability added by this lesson: resume workflows from explicit
  checkpoints while respecting retry limits.
- Failure mode the learner must reproduce, inspect, or prevent: duplicate
  checkpoints, infinite retries, lost progress, or missing incident trace.
- FinAgent or practical AI-system improvement: FinAgent can recover from tool or
  evidence failures predictably instead of restarting blindly.
- Explanation artifact the learner should leave with: a short trace naming the
  checkpoint, retry decision, resume step, and final status.

## Scope Boundary Enhancement

- Minimum required path: record checkpoints once, record step errors, decide
  retry eligibility, resume from the next unfinished step, and return a trace.
- Optional enrichment only after the minimum path works: add one non-retryable
  error category or blocked status.
- Advanced doorway, named briefly but not required: durable queues, cron jobs,
  distributed orchestrators, background workers, persisted event stores, and
  production incident automation belong to Course 3.

## Source Evidence Enhancement

Use `../WORKFLOW_VS_AGENT_DECISION_TREE.md` and
`../MEMORY_SAFETY_EVIDENCE_CHECKLIST.md` before changing this lesson.

- Local PDF `Principles of Building AI Agents`, p.66-67 and p.71 for explicit
  workflow branches, conditions, and traceable steps.
- Local PDF `Principles of Building AI Agents`, p.80-83 for observability and
  traces of nondeterministic or multi-step AI systems.
- Local PDF `LLMOps`, p.183 and p.205-206 for stage-level failure visibility and
  traceability across a pipeline.
- Assessment conversion rule: each source insight must become a checkpoint,
  retry rule, resume rule, error category, trace field, or learner explanation
  prompt.
