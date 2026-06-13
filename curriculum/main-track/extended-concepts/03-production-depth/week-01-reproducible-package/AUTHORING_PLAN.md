# Authoring Plan: Module 5 Week 4

## Scope

Create a reproducible local package and runbook lab after service-boundary
contracts and before monitoring or optimization.

This week teaches learners to make a project reviewable from a clean checkout:
runtime command, required environment variables, artifact paths, non-root
container assumptions, test command, and reviewer runbook. The first green path
must remain a package plan and runbook, not a required Docker deployment.

## Acceptance Checks

- [x] `README.md` frames package metadata, Dockerfile notes, and run checks as
  reproducibility evidence.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define run manifest fields, missing-field validation,
  non-root container planning, and reviewer command runbook behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates reproducibility, security assumptions, command
  clarity, reviewer usefulness, and learner reflection.
- [x] Reviewer-only reference behavior stays outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/extended-concepts/03-production-depth/week-01-reproducible-package/tests -v
```

Expected initial state: collection succeeds and assertions fail because
`workbench.py` contains learner TODOs.

## Learner Logic Enhancement

- Current capability the learner brings into this lesson: local service
  contracts with validation, structured errors, and traceable success responses.
- New capability added by this lesson: describe how a teammate can install,
  configure, test, and run the system without tribal knowledge.
- Failure mode the learner must reproduce, inspect, or prevent: missing runtime
  command, missing environment variable list, missing artifacts, unsafe container
  assumptions, or a runbook that cannot be followed.
- FinAgent or practical AI-system improvement: FinAgent becomes reviewable by a
  teammate before any hosted deployment claim is made.
- Explanation artifact the learner should leave with: a short reproducibility
  note naming the command, env requirements, artifact paths, and verification
  command.

## Scope Boundary Enhancement

- Minimum required path: build a manifest, validate required fields, create a
  container plan, and produce a reviewer runbook with test and run commands.
- Optional enrichment only after the minimum path works: add one restore/runbook
  note naming which artifact should be regenerated or restored after a failed
  release.
- Advanced doorway, named briefly but not required: real Dockerfiles, image
  builds, registries, secrets managers, cloud deployment, health probes, and
  infrastructure-as-code belong to Course 3 or later production depth.

## Evidence Portfolio Enhancement

- Technical evidence: tests pass for manifest construction, validation,
  container plan, and runbook commands.
- Failure evidence: missing fields are named explicitly instead of producing
  vague run failures.
- Explanation evidence: learner note explains how packaging evidence differs
  from application behavior evidence.
- Transfer evidence: FinAgent callback showing how a reviewer could rerun the
  capstone from a clean checkout.

## Source Evidence Enhancement

Use `../EVAL_OBSERVABILITY_EVIDENCE_CHECKLIST.md` before changing this lesson.

- Local PDF `LLMOps`, p.52, p.54, and p.56-58 for production reliability as
  documented goals, KPIs, model/config rationale, risk notes, and review
  expectations.
- Local PDF `LLMOps`, p.211, p.218, p.224, p.229, and p.251-253 for scoped
  governance, audit artifacts, and restore planning as lightweight Course 1
  notes rather than infrastructure depth.
- B03 `Introducing MLOps`, Chapter 8, p.137, `B03_B03_P0137_C001` for governance
  artifacts that are trackable and connected to the work they approve.
- B12 `Designing Machine Learning Systems`, Chapter 5, p.229,
  `B12_B12_P0229_C001` for measurable evidence before production claims.
- Assessment conversion rule: each source insight must become a manifest field,
  missing-field check, reviewer command, non-root/security assumption,
  restore/runbook note, or learner explanation prompt.
