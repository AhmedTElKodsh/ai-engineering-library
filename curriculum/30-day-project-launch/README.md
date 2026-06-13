# 30-Day Project Launch Route

Timing: read this overview in 15-20 minutes before Day 1. Revisit the file at
the start of each week in 5 minutes to keep scope honest.

Calendar: Day 1 is Sunday, 2026-06-14. Day 30 is Monday, 2026-07-13. The route
uses 5-7 focused hours per day, including weekends, with milestone checks on
Days 7, 14, 21, 28, and 30.

This folder contains a compressed, hands-on route for building a
production-shaped AI engineering project in 30 full-time days. It is an overlay
on Course 1. It does not replace the complete Course 1 path.

## Purpose

In 30 full-time days, you will build by hand a local AI engineering project with
data ingestion, validation, LLM API wrappers, prompt contracts, structured
outputs, RAG, tools, bounded workflows, evals, logs, safety boundaries, and
portfolio-ready documentation.

The route favors visible engineering evidence over broad coverage. Every day
should leave behind code, tests, validation output, notes, or documentation that
another engineer can inspect.

## Teaching Method

This route follows the same pedagogy as the main curriculum: action before
lecture, evidence before claims, minimum path before enrichment, and reflection
before moving on. Read `teaching-method.md` before Day 1 and use it as the
authoring contract for any route changes.

Every day should make the learner logic visible:

| Question | Daily answer should name |
| --- | --- |
| What can I do now? | the previous project capability |
| What new capability am I adding? | the day's narrow project increment |
| What failure does this help me catch? | the bad input, weak output, unsafe behavior, or unobservable failure |
| How does this improve FinAgent or a practical AI system? | the practical assistant behavior being strengthened |
| What should I be able to explain afterward? | the boundary, evidence, limitation, and transfer |

The daily ritual is: **Before You Run -> Evidence First -> Smallest Change ->
Explain Like a Teammate -> One Step Stronger -> Reference After Effort**.

## Relationship To Course 1

Course 1 remains the canonical full curriculum. This route borrows from its
module sequence and compresses the work around one project spine. Use this route
when you need a practical launch project quickly, then return to Course 1 for
deeper first-principles, scaffolded lessons, and capstone polish.

## Project Spine Options

Choose one project and keep it for all 30 days:

1. FinAgent educational stock analysis assistant
2. AI document support assistant
3. AI research assistant
4. AI knowledge-base chatbot
5. AI web-data monitoring assistant

Recommended default: **FinAgent educational stock analysis assistant**. It
already aligns with the curriculum spine, the safety boundary in
`FINANCE_SAFETY.md`, and the final capstone expectations.

## Weekly Milestones

| Calendar | Days | Milestone | Evidence |
| --- | --- | --- | --- |
| Jun 14-20 | Days 1-7 | Deterministic assistant | validated input, processed records, tests, logs, documented limits |
| Jun 21-27 | Days 8-14 | Cited Q&A system | prompt contracts, structured output, retrieval, citations, abstention, evals |
| Jun 28-Jul 4 | Days 15-21 | Bounded AI workflow | typed tools, workflow state, retry/review rules, safety tests |
| Jul 5-11 | Days 22-28 | Production-shaped local app | service boundary, local quality gate, observability, failure analysis, demo evidence |
| Jul 12-13 | Days 29-30 | Portfolio defense and next backlog | portfolio package, final demo, limitations, next 30 days |

## Daily Rhythm

| Task | Target time | Practical rule |
| --- | ---: | --- |
| Plan the day | 15 min | choose one minimum artifact and one cuttable stretch item |
| Read or trace | 45-60 min | stop when you can name the first expected failure |
| Implement by hand | 2.5-3.5 hrs | split into 20-45 minute function/task slices |
| Test and debug | 1-2 hrs | work from the first failure, not broad guesses |
| Write explanation and commit | 30-45 min | include command, result, limitation, and next action |
| Buffer | 30-45 min | use for blockers or recovery, not new scope |

Function/task estimate rule: if a single function, prompt contract, test case,
or documentation task exceeds 45 minutes without evidence, stop and write the
blocker in the log. Then reduce the slice until it can produce a test, trace,
or concrete note.

## Required Daily Deliverables

- code or documentation artifact
- tests or validation command where relevant
- short engineering note
- one limitation or failure mode
- commit

## Files In This Route

- `daily-plan.md`: the 30-day sequence
- `teaching-method.md`: route-level teaching contract aligned with the main
  curriculum pedagogy
- `week-01.md`: Week 1 overview and links to the daily Week 1 guides
- `week-01/`: Day 1-7 guides for the deterministic Week 1 project spine
- `week-02.md`: Week 2 overview and links to the daily Week 2 guides
- `week-02/`: Day 8-14 guides for LLM boundaries, prompt contracts, and cited RAG
- `week-03.md`: Week 3 guide for tools, workflow state, verifier, and safety
- `week-04.md`: Week 4 guide for local production evidence and portfolio defense
- `timetable.md`: daily and weekly time blocks
- `productivity-tools.md`: lightweight planning, focus, and tracking tools
- `project-backlog-template.md`: backlog template for your project
- `no-vibe-coding-protocol.md`: strict AI-assistant use rules
- `milestone-rubric.md`: Day 7, 14, 21, 28, and 30 quality gates
- `continuation-roadmap.md`: what to do after the launch
- `planning-review.md`: maintainer check against the curriculum planning contract
- `templates/`: project scope, daily log, failure analysis, demo, portfolio,
  and next-30-days templates

## Deferrals

This route explicitly defers from-scratch GPT training, deep PyTorch training
loops, LoRA/QLoRA implementation, GraphRAG, multimodal RAG, complex multi-agent
systems, Kubernetes, hosted SaaS platforms, enterprise MLOps, full frontend and
backend platforms, and production scraping at scale.
