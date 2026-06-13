# 30-Day Project Launch Timetable

Timing: read this once before Day 1 in 15-20 minutes, then review the current
week every morning in 3-5 minutes.

Calendar: Day 1 is Sunday, 2026-06-14. Day 30 is Monday, 2026-07-13. The plan
assumes 30 consecutive full-time learning days. Keep the milestone dates fixed
and cut stretch scope first when reality pushes back.

Use this timetable to keep the route realistic. The default day is 5-7 focused
hours, with one longer block for implementation and two smaller blocks for
trace/debug/write work.

## Default Daily Blocks

| Block | Time budget | Work | Productivity method |
| --- | ---: | --- | --- |
| Setup and review | 15 min | open the day plan, pick the smallest deliverable, update the board | one-card WIP limit |
| Read or trace | 45-60 min | inspect curriculum docs, tests, examples, traces, or prior code | active recall: predict first failure |
| Build block 1 | 90-120 min | implement the first learner-written slice | 90/20 deep-work block |
| Break and reset | 15-30 min | step away, then write the next smallest action | shutdown note before context switch |
| Build block 2 | 90-120 min | finish implementation or tighten boundaries | function/task slices of 20-45 min |
| Test and debug | 60-120 min | run tests, inspect failures, add edge cases, fix regressions | first-failure rule |
| Log and commit | 30-45 min | update daily log, note limitation, commit with evidence | evidence-based closure |

## Weekly Focus

| Dates | Days | Focus | Milestone check |
| --- | --- | --- | --- |
| Jun 14-20 | 1-7 | deterministic baseline, data, validation, tests | Day 7 deterministic assistant |
| Jun 21-27 | 8-14 | LLM wrapper, prompts, embeddings, RAG, evals | Day 14 cited Q&A system |
| Jun 28-Jul 4 | 15-21 | typed tools, workflow state, verifier, safety | Day 21 bounded AI workflow |
| Jul 5-11 | 22-28 | service boundary, versioning, logs, quality gate, demo | Day 28 production-shaped local app |
| Jul 12-13 | 29-30 | portfolio package, defense, next backlog | Day 30 portfolio defense |

## 30-Day Calendar View

| Day | Date | Primary output | Time emphasis |
| ---: | --- | --- | --- |
| 1 | Sun 2026-06-14 | `PROJECT_SCOPE.md` | scope, diagnostic, setup |
| 2 | Mon 2026-06-15 | first utility, tests, commit | test loop |
| 3 | Tue 2026-06-16 | config/models/tests | validation |
| 4 | Wed 2026-06-17 | deterministic pipeline v0 | local workflow |
| 5 | Thu 2026-06-18 | raw/clean ingestion boundary | data acquisition |
| 6 | Fri 2026-06-19 | RAG-ready records | provenance |
| 7 | Sat 2026-06-20 | Milestone 1 note | evidence cleanup |
| 8 | Sun 2026-06-21 | LLM wrapper | API boundary |
| 9 | Mon 2026-06-22 | prompt contracts | structured output |
| 10 | Tue 2026-06-23 | similarity retrieval | retrieval mechanics |
| 11 | Wed 2026-06-24 | chunking and metadata | citation readiness |
| 12 | Thu 2026-06-25 | cited RAG | grounded answer |
| 13 | Fri 2026-06-26 | eval runner | quality evidence |
| 14 | Sat 2026-06-27 | Milestone 2 note | RAG defense |
| 15 | Sun 2026-06-28 | typed tools | deterministic capability |
| 16 | Mon 2026-06-29 | tool router | validation boundary |
| 17 | Tue 2026-06-30 | explicit workflow | observable state |
| 18 | Wed 2026-07-01 | verifier/retry/review | safe correction |
| 19 | Thu 2026-07-02 | data integration | freshness warning |
| 20 | Fri 2026-07-03 | `SAFETY_BOUNDARIES.md` | refusal and injection tests |
| 21 | Sat 2026-07-04 | Milestone 3 note | workflow defense |
| 22 | Sun 2026-07-05 | service boundary | runnable interface |
| 23 | Mon 2026-07-06 | `VERSIONING.md` | reproducibility |
| 24 | Tue 2026-07-07 | `OBSERVABILITY.md` | logs and traces |
| 25 | Wed 2026-07-08 | local quality gate | repeatable checks |
| 26 | Thu 2026-07-09 | `FAILURE_ANALYSIS.md` | failure handling |
| 27 | Fri 2026-07-10 | `DEMO_SCRIPT.md` | repeatable demo |
| 28 | Sat 2026-07-11 | Milestone 4 note | local readiness |
| 29 | Sun 2026-07-12 | portfolio package | presentation |
| 30 | Mon 2026-07-13 | `NEXT_30_DAYS.md` | defense and continuation |

## Task And Function Estimates

Use these estimates inside the build blocks:

| Slice | Target time | Evidence before moving on |
| --- | ---: | --- |
| One utility function | 20-45 min | unit test or example input/output |
| One schema/model change | 20-45 min | valid and invalid case |
| One prompt/template contract | 30-45 min | rendered prompt plus parser/schema check |
| One workflow step | 30-60 min | trace field or state-transition test |
| One failure case | 20-40 min | failing case, refusal, or error shape |
| One documentation artifact section | 15-30 min | concrete command, result, or limitation |

## Recovery Rules

- If a day slips, preserve the milestone output and cut stretch work first.
- If tests are failing at the end of a day, commit only if the failure is
  documented and the next action is clear.
- If two days slip in a row, reduce scope before adding hours.
- If a tool, framework, or provider setup takes more than 60 minutes, switch to
  a fixture or mock path and write the blocker down.
