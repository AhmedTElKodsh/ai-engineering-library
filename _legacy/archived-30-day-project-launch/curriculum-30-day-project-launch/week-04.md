# Week 4: Production Hardening And Project Readiness

Timing: use this guide during Days 22-30, Sunday 2026-07-05 through Monday
2026-07-13. Read the current day in 5-10 minutes before starting work, then use
the checklist at the end of the day.

Expected effort: 5-7 focused hours per day, 45-63 focused hours total. Day 28
is the production-shaped local app milestone, and Day 30 is the final portfolio
defense.

Week 4 turns the project into a production-shaped local artifact. The goal is
not hosted SaaS or platform polish. The goal is a runnable boundary, version
notes, logs, traces, a local quality gate, failure analysis, a repeatable demo,
and a portfolio defense that does not overclaim.

Pedagogy: this week follows the main curriculum's project and capstone method.
Run or inspect before polishing, treat failures as learning evidence, separate
minimum proof from presentation polish, and use the final portfolio to explain
what the system proves and what it does not prove.

## Week Goal

Make the project maintainable, observable, and presentable.

By the end of Day 30, another engineer should be able to install or run the
project locally, execute the quality gate, inspect eval and trace evidence, run
a demo path, and understand the next backlog.

## Calendar And Daily Time Boxes

Each day is 5-7 focused hours. Use the standard split: 15 min planning,
45-60 min read/trace, 2.5-3.5 hrs build or polish, 1-2 hrs test/debug/rehearse,
and 30-45 min evidence log and commit.

| Day | Date | Minimum artifact | Build-slice target |
| ---: | --- | --- | --- |
| 22 | Sun 2026-07-05 | runnable service boundary | one entry point and one smoke test |
| 23 | Mon 2026-07-06 | `VERSIONING.md` | prompt/model/data/index version notes |
| 24 | Tue 2026-07-07 | `OBSERVABILITY.md` | trace fields, sample trace, cost/latency note |
| 25 | Wed 2026-07-08 | local quality gate | one repeatable check command |
| 26 | Thu 2026-07-09 | `FAILURE_ANALYSIS.md` | highest-risk failures and expected behavior |
| 27 | Fri 2026-07-10 | `DEMO_SCRIPT.md` | happy path, edge case, refusal/abstention |
| 28 | Sat 2026-07-11 | Milestone 4 evidence | local gate, demo path, production gap |
| 29 | Sun 2026-07-12 | portfolio package | README, architecture, evidence table |
| 30 | Mon 2026-07-13 | `NEXT_30_DAYS.md` | final gate, demo, limitations, next backlog |

Function/task estimate: keep each doc section, trace sample, quality-gate step,
demo case, or portfolio claim to 15-45 minutes before checking evidence.

## Learner Logic Map

Fill this in each morning or in the daily log:

| Question | Week 4 answer |
| --- | --- |
| What can I do now? | Run and explain the bounded workflow from Week 3. |
| What new capability am I adding? | Add one operability, reproducibility, failure-handling, demo, or portfolio capability. |
| What failure does this help me catch? | Undocumented setup, stale versions, missing logs, failed quality gates, weak demo evidence, or overclaimed reliability. |
| How does this improve FinAgent or a practical AI system? | It turns the project into an inspectable local artifact another engineer can review. |
| What should I be able to explain afterward? | How to run it, how to verify it, what failed, what is limited, and what should happen next. |

## Daily Learning Loop

Use the same loop every day:

1. Before you run: predict the command result, trace field, quality-gate output,
   or demo behavior.
2. Evidence first: inspect command output, logs, evals, traces, failed setup,
   or demo evidence before editing docs.
3. Smallest change: close the most important reproducibility or reliability gap
   before polishing.
4. Explain like a teammate: write 2-4 sentences about what the evidence proves
   and what it does not prove.
5. One step stronger: add one failure case, trace sample, setup check, or demo
   edge case.
6. Reference after effort: use examples, AI help, deployment docs, or portfolio
   references only after you can name the missing evidence.

Keep the minimum path separate from stretch work. A polished README is not a
substitute for a runnable command, eval output, trace sample, and known failure.

## Source Material To Trace

Read only the parts needed for the current day:

- `curriculum/main-track/05-module-5-production/week-01-golden-datasets/`
- `curriculum/main-track/05-module-5-production/week-02-cicd/`
- `curriculum/main-track/05-module-5-production/week-03-fastapi/`
- `curriculum/main-track/05-module-5-production/week-04-monitoring/`
- `curriculum/main-track/06-capstone-projects/week-01-build/`
- `curriculum/main-track/06-capstone-projects/week-02-polish/`
- `curriculum/main-track/06-capstone-projects/week-03-integration-build/`
- `curriculum/templates/evidence-portfolio-template.md`

Use module references selectively:

| Day | Required trace | Optional if blocked or ahead |
| --- | --- | --- |
| Day 22 | service boundary and smoke-test examples | FastAPI, Streamlit, or Gradio only if already justified |
| Day 23 | versioning and cache invalidation examples | richer artifact registry notes |
| Day 24 | monitoring, trace, cost, and latency examples | simple trace viewer |
| Day 25 | CI-style local gate examples | hosted CI after local gate is stable |
| Day 26 | failure-analysis template and known failure logs | extra failure taxonomy |
| Day 27 | capstone demo guidance | screenshots or recording outline |
| Day 28 | Day 28 section of `milestone-rubric.md` | architecture diagram polish |
| Day 29 | portfolio evidence template | interview talking-points expansion |
| Day 30 | `continuation-roadmap.md` and Day 30 rubric | next specialization decision memo |

## Project Shape

Week 4 packages the Week 3 system:

```text
documented setup
  -> runnable interface
  -> quality gate
  -> eval and trace evidence
  -> failure analysis
  -> repeatable demo
  -> portfolio defense
  -> next backlog
```

Recommended additions inside the learner project:

```text
docs/
  VERSIONING.md
  OBSERVABILITY.md
  FAILURE_ANALYSIS.md
  DEMO_SCRIPT.md
  PORTFOLIO_NOTE.md
  NEXT_30_DAYS.md
scripts/
  check_project.py
logs/
  sample-trace.json
evals/
  latest_run.json
```

## Week 4 Guardrails

- One local runnable boundary is enough.
- The quality gate must run from a clean shell with documented commands.
- Logs and traces must not include secrets or private credentials.
- Version notes should cover prompts, model/provider, data snapshot, index, and
  cache assumptions.
- Failure analysis must include expected behavior, current behavior, coverage,
  mitigation, and remaining risk.
- Demo evidence must include happy path, edge case, and refusal or abstention.
- Portfolio claims must match local evidence.

## Evidence Portfolio

For each day, capture:

- technical evidence: service command, version note, trace, log, quality gate,
  failure doc, demo script, or portfolio artifact
- failure evidence: failed setup, stale cache, missing trace field, quality-gate
  failure, demo risk, or known limitation
- explanation evidence: 2-4 sentences explaining what the evidence proves
- transfer evidence: how the practice prepares the project for later production
  RAG, LLMOps, deployment, or advanced agents

## Week 4 Evidence Checklist

- [ ] One runnable interface is documented and smoke-tested.
- [ ] Versioning notes cover prompts, model/provider, data, index, and cache.
- [ ] Logs or traces include request, retrieval, tool use, model call,
      verification, and final status where relevant.
- [ ] Local quality gate runs tests, evals, and lightweight lint or import
      checks if available.
- [ ] Failure analysis names triggers, expected behavior, actual behavior,
      coverage, mitigation, and remaining risk.
- [ ] Demo script covers happy path, edge case, and refusal or abstention.
- [ ] Portfolio note includes technical, failure, explanation, and transfer
      evidence.
- [ ] Day 28 and Day 30 are scored against `milestone-rubric.md`.

## Common Scope Traps

- Building a full frontend/backend platform instead of one local interface.
- Adding hosted CI before the local gate is stable.
- Polishing screenshots while tests, evals, or traces are stale.
- Hiding failure cases from the portfolio.
- Claiming production readiness beyond local evidence.
- Choosing the next specialization based on novelty instead of measured project
  weakness.

## Final Defense

On Day 30, the learner should be able to answer:

- What are the system boundaries?
- What is deterministic and what is model-driven?
- How are outputs validated?
- How are citations and abstentions enforced?
- How are tool calls bounded?
- How would a regression be detected?
- What failed during the project?
- What is deliberately out of scope?
- What should the next 30 days improve, based on evidence?
