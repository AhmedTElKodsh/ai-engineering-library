# 30-Day Project Launch Timetable

Timing: read this once before Day 1 in 15-20 minutes, then review the current
week every morning in 3-5 minutes.

Use this timetable to keep the route realistic. The default day is 5-7 focused
hours, with one longer block for implementation and two smaller blocks for
trace/debug/write work.

## Default Daily Blocks

| Block | Time budget | Work |
| --- | ---: | --- |
| Setup and review | 15 min | open the day plan, pick the smallest deliverable, update the board |
| Read or trace | 45-60 min | inspect curriculum docs, tests, examples, traces, or prior code |
| Build block 1 | 90-120 min | implement the first learner-written slice |
| Break and reset | 15-30 min | step away, then write the next smallest action |
| Build block 2 | 90-120 min | finish implementation or tighten boundaries |
| Test and debug | 60-120 min | run tests, inspect failures, add edge cases, fix regressions |
| Log and commit | 30-45 min | update daily log, note limitation, commit with evidence |

## Weekly Focus

| Days | Focus | Milestone check |
| --- | --- | --- |
| 1-7 | deterministic baseline, data, validation, tests | Day 7 deterministic assistant |
| 8-14 | LLM wrapper, prompts, embeddings, RAG, evals | Day 14 cited Q&A system |
| 15-21 | typed tools, workflow state, verifier, safety | Day 21 bounded AI workflow |
| 22-28 | service boundary, versioning, logs, quality gate, demo | Day 28 production-shaped local app |
| 29-30 | portfolio package, defense, next backlog | Day 30 portfolio defense |

## 30-Day Calendar View

| Day | Primary output | Time emphasis |
| ---: | --- | --- |
| 1 | `PROJECT_SCOPE.md` | scope, diagnostic, setup |
| 2 | first utility, tests, commit | test loop |
| 3 | config/models/tests | validation |
| 4 | deterministic pipeline v0 | local workflow |
| 5 | raw/clean ingestion boundary | data acquisition |
| 6 | RAG-ready records | provenance |
| 7 | Milestone 1 note | evidence cleanup |
| 8 | LLM wrapper | API boundary |
| 9 | prompt contracts | structured output |
| 10 | similarity retrieval | retrieval mechanics |
| 11 | chunking and metadata | citation readiness |
| 12 | cited RAG | grounded answer |
| 13 | eval runner | quality evidence |
| 14 | Milestone 2 note | RAG defense |
| 15 | typed tools | deterministic capability |
| 16 | tool router | validation boundary |
| 17 | explicit workflow | observable state |
| 18 | verifier/retry/review | safe correction |
| 19 | data integration | freshness warning |
| 20 | `SAFETY_BOUNDARIES.md` | refusal and injection tests |
| 21 | Milestone 3 note | workflow defense |
| 22 | service boundary | runnable interface |
| 23 | `VERSIONING.md` | reproducibility |
| 24 | `OBSERVABILITY.md` | logs and traces |
| 25 | local quality gate | repeatable checks |
| 26 | `FAILURE_ANALYSIS.md` | failure handling |
| 27 | `DEMO_SCRIPT.md` | repeatable demo |
| 28 | Milestone 4 note | local readiness |
| 29 | portfolio package | presentation |
| 30 | `NEXT_30_DAYS.md` | defense and continuation |

## Recovery Rules

- If a day slips, preserve the milestone output and cut stretch work first.
- If tests are failing at the end of a day, commit only if the failure is
  documented and the next action is clear.
- If two days slip in a row, reduce scope before adding hours.
- If a tool, framework, or provider setup takes more than 60 minutes, switch to
  a fixture or mock path and write the blocker down.
