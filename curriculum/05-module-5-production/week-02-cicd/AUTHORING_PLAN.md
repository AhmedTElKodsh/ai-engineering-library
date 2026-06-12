# Authoring Plan: Module 5 Week 2

## Scope

Create a CI-style regression gate lab over the Week 1 golden eval scaffold.

## Acceptance Checks

- [x] `README.md` frames CI-style gating as local, rerunnable release evidence.
- [x] `workbench.py` is TODO-first and learner-editable.
- [x] Tests define eval-run loading, version-note loading, pass-rate calculation, gate decisions, command checklist, and gate report behavior.
- [x] `hints.md` provides progressive help without giving full code.
- [x] `rubric.md` evaluates eval evidence, versioning, gate behavior, reproducibility, reviewability, and reflection.
- [x] Reviewer-only reference behavior lives outside the learner folder.

## Verification

```powershell
python -m pytest curriculum/05-module-5-production/week-02-cicd/tests -v
```

Expected initial state: collection succeeds and assertions fail because `workbench.py` contains learner TODOs.
## Learner Logic Enhancement

- Current capability the learner brings into this lesson: Week 1 golden examples, failure categories, and eval summary behavior.
- New capability added by this lesson: convert eval evidence plus prompt/model/index version notes into a rerunnable release gate.
- Failure mode the learner must reproduce, inspect, or prevent: a change ships despite a low pass rate, remaining eval failures, or missing version context.
- FinAgent or practical AI-system improvement: FinAgent can explain why a cited finance-answer change is ready, blocked, or needs review before release.
- Explanation artifact the learner should leave with: a short gate report naming pass rate, failures, versions, commands, and release recommendation.

## Scope Boundary Enhancement

- Minimum required path: load deterministic eval output, load version notes, calculate pass rate, fail unsafe or incomplete gates, and emit a command checklist.
- Optional enrichment only after the minimum path works: add one extra gate reason for latency, cost, or missing citation evidence.
- Advanced doorway, named briefly but not required: hosted CI, deployment automation, A/B traffic splitting, model registry workflows, and enterprise LLMOps belong to Course 3.

## Evidence Portfolio Enhancement

- Technical evidence: implementation of eval-run loading, version-note loading, pass-rate calculation, gate decision, command checklist, and gate report behavior.
- Failure evidence: failing fixture with below-threshold pass rate or remaining failure categories blocks the release.
- Explanation evidence: report explains which gate failed and which command reruns the evidence.
- Transfer evidence: FinAgent callback showing how prompt/model/index versions protect cited market summaries from silent regression.

## Source Evidence Enhancement

Use `../EVAL_OBSERVABILITY_EVIDENCE_CHECKLIST.md` before changing this lesson.

- B01 `Generative AI in Action`, p.403, `B01_B01_P0403_C001` for LLM output behavior as testable eval evidence.
- B10 `LLM Engineer's Handbook`, p.291 and p.300-303, `B10_B10_P0291_C001`, `B10_B10_P0300_C001`, `B10_B10_P0302_C001`, `B10_B10_P0303_C001` for fit-for-task evaluation and judge-based caution.
- B12 `Designing Machine Learning Systems`, p.229, `B12_B12_P0229_C001` for measurable offline evaluation before production claims.
- B03 `Introducing MLOps`, p.137, `B03_B03_P0137_C001` for traceable governance artifacts.
- Local PDF `LLMOps`, p.52, p.54, p.56-58, and p.205-206 for KPI thresholds, risk notes, knowledge-limit behavior, stored input/output review, prompt/model version traceability, and release-gate documentation.
