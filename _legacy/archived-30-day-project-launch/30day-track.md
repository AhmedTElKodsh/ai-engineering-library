You are working inside the GitHub repository:

AhmedTElKodsh/ai-engineering-library

Your task is to add a new 30-day compressed hands-on learning route for the existing AI Engineering curriculum.

Important: do NOT replace, restructure, or dilute the current full curriculum. The existing Course 1 remains the canonical complete path. This task creates a separate accelerated overlay for learners who have 30 full-time days to become productive on a real AI Engineering project by building by hand, not vibe coding.

Before editing anything, inspect these files:

- README.md
- START_HERE.md
- START_HERE_2_HOURS_PER_DAY.md
- LEARNER_READY_MATRIX.md
- HOW_TO_USE_AI_ASSISTANTS.md
- curriculum/LEARNER_JOURNEY_MAP.md
- curriculum/ROADMAP.md
- .kiro/specs/curriculum-planning/ROADMAP.md
- .kiro/specs/curriculum-planning/SPEC.md
- curriculum/AI_AUTHORING_GUIDE.md

Use the repository’s existing style:
- text-first
- test-guided
- learner-written, not solution-dump driven
- FinAgent/project-spine friendly
- practical, professional, and portfolio-oriented
- no unnecessary platform/SaaS scope
- no hidden advanced requirements

Create a new 30-day route with this purpose:

“In 30 full-time days, the learner builds by hand a production-shaped AI Engineering project with data ingestion, validation, LLM API wrappers, prompt contracts, structured outputs, RAG, tools, bounded workflows, evals, logs, safety boundaries, and portfolio-ready documentation.”

The route is NOT a complete replacement for Course 1. It is a project-launch track that gets the learner ready to contribute smoothly to a real AI Engineering project, then points them back to the full curriculum for deeper advancement.

Create these files and folders:

1. START_HERE_30_DAY_PROJECT_LAUNCH.md

2. curriculum/30-day-project-launch/README.md

3. curriculum/30-day-project-launch/daily-plan.md

4. curriculum/30-day-project-launch/project-backlog-template.md

5. curriculum/30-day-project-launch/no-vibe-coding-protocol.md

6. curriculum/30-day-project-launch/milestone-rubric.md

7. curriculum/30-day-project-launch/continuation-roadmap.md

8. curriculum/30-day-project-launch/templates/
   - PROJECT_SCOPE.md
   - DAILY_ENGINEERING_LOG.md
   - FAILURE_ANALYSIS.md
   - DEMO_SCRIPT.md
   - PORTFOLIO_NOTE.md
   - NEXT_30_DAYS.md

Also update these existing files carefully:

1. README.md
   - Add a short “30-Day Project Launch Route” entry under Start Here or active structure.
   - Make clear it is an accelerated overlay, not the canonical full curriculum.

2. START_HERE.md
   - Add a short note linking to START_HERE_30_DAY_PROJECT_LAUNCH.md for full-time learners who need to start project work in 30 days.

3. LEARNER_READY_MATRIX.md
   - Add a planning/route row for the 30-day launch track.
   - Since this is a route guide over existing assignable modules, mark it as assignable only if all required docs are created.
   - Do not claim it has workbench/tests unless you actually add dedicated workbench/tests.
   - Use truthful status language.

Content requirements:

A) START_HERE_30_DAY_PROJECT_LAUNCH.md

This should be the learner-facing front door.

Include:
- who this route is for
- who should not use it
- expected pace: full-time, 5–7 focused hours/day
- rule: this is not vibe coding
- outcome after 30 days
- what to prepare before Day 1
- how this route maps to the existing curriculum modules
- what to ignore for now
- what to do after Day 30

Tone:
- direct
- motivating
- practical
- no hype
- no “master AI in 30 days” claims

B) curriculum/30-day-project-launch/README.md

Include:
- purpose
- relationship to Course 1
- project spine options:
  1. FinAgent educational stock analysis assistant
  2. AI document support assistant
  3. AI research assistant
  4. AI knowledge-base chatbot
  5. AI web-data monitoring assistant
- recommended default: FinAgent, because it already aligns with the curriculum spine
- weekly milestone summary
- daily rhythm:
  1. Read/trace: 45–60 min
  2. Implement by hand: 3–4 hrs
  3. Test/debug: 1–2 hrs
  4. Write explanation + commit: 30–45 min
- required daily deliverables:
  - code or documentation artifact
  - tests or validation command where relevant
  - short engineering note
  - one limitation/failure mode
  - commit

C) daily-plan.md

Create a 30-day plan with this structure:

Week 1 — Engineering loop, Python, data, and deterministic project spine
Goal: Build without LLM magic first.

Day 1 — Setup, diagnostic, and project scope
Deliverable: PROJECT_SCOPE.md

Day 2 — Pytest, workbench discipline, and Git habit
Deliverable: one small utility, tests, commit explanation

Day 3 — Data models, validation, and configuration
Deliverable: config/models/tests

Day 4 — Deterministic pipeline v0
Deliverable: local input → validate → process → output workflow

Day 5 — HTTP/API-first data acquisition
Deliverable: raw/clean data boundaries and ingestion tests

Day 6 — Cleaning, provenance, and RAG-ready records
Deliverable: processed JSONL-style records with metadata

Day 7 — Milestone 1: deterministic assistant
Deliverable: deterministic project slice with tests, logs, validated input, and documented limits

Week 2 — LLM APIs, prompts, embeddings, and RAG
Goal: Add LLM behavior behind testable boundaries.

Day 8 — LLM API wrapper
Deliverable: provider wrapper with retries/timeouts/mock mode/token-cost logging

Day 9 — Prompt templates and structured output
Deliverable: prompt templates, schema validation, prompt regression tests

Day 10 — Embeddings and similarity
Deliverable: cosine similarity/simple retrieval implementation

Day 11 — Chunking and metadata
Deliverable: chunked documents with source metadata and bad-record tests

Day 12 — Simple RAG with citations
Deliverable: query → retrieve → answer with citations and abstention

Day 13 — RAG evaluation
Deliverable: golden questions, eval runner, failure taxonomy

Day 14 — Milestone 2: cited Q&A system
Deliverable: RAG assistant with citations, abstention, evals, and failure notes

Week 3 — Tools, workflows, and bounded agents
Goal: Build controlled agentic behavior without over-autonomy.

Day 15 — Typed tools
Deliverable: one or two deterministic tools with input/output schemas

Day 16 — Tool calling boundary
Deliverable: bounded tool router with validation and failure handling

Day 17 — Explicit workflow
Deliverable: planner/retrieve/tool/draft/verify workflow with observable state

Day 18 — Critic/retry/human-review loop
Deliverable: verifier step, bounded retry, human escalation rule

Day 19 — Integrate web/API data into workflow
Deliverable: workflow uses real or fixture-backed collected data with stale-data warning

Day 20 — Safety, prompt injection, and refusal boundaries
Deliverable: safety tests and SAFETY_BOUNDARIES.md

Day 21 — Milestone 3: bounded AI workflow
Deliverable: tool-using workflow with state, trace logs, stop conditions, source grounding, and safety tests

Week 4 — Production hardening and project readiness
Goal: Make the project maintainable, observable, and presentable.

Day 22 — Service boundary
Deliverable: CLI, FastAPI endpoint, Streamlit/Gradio demo, or clean local script

Day 23 — Caching and versioning
Deliverable: VERSIONING.md with prompt/model/index/data version notes

Day 24 — Logs, traces, cost, and latency
Deliverable: OBSERVABILITY.md and sample trace

Day 25 — CI-style local quality gate
Deliverable: one check command such as make check or python scripts/check_project.py

Day 26 — Failure handling sprint
Deliverable: FAILURE_ANALYSIS.md covering missing data, malformed API responses, bad input, weak retrieval, citation mismatch, rate limits, and timeouts

Day 27 — Demo workflow
Deliverable: DEMO_SCRIPT.md with happy path, edge case, and refusal/abstention case

Day 28 — Milestone 4: production-shaped local app
Deliverable: local app with tests, evals, logs, service boundary, failure handling, and documentation

Day 29 — Portfolio packaging
Deliverable: README, architecture explanation, diagram guidance, screenshots/trace samples, portfolio note

Day 30 — Final defense and next backlog
Deliverable: NEXT_30_DAYS.md

For every day include:
- objective
- what to read or trace in the existing curriculum
- what to build
- what to test or verify
- what to write in the engineering log
- done criteria
- what NOT to do today

D) project-backlog-template.md

Create a reusable backlog template with:
- project goal
- user problem
- core workflow
- data sources
- risks and assumptions
- Week 1 backlog
- Week 2 backlog
- Week 3 backlog
- Week 4 backlog
- stretch ideas
- deferred ideas
- “do not build yet” section

E) no-vibe-coding-protocol.md

Create a strict protocol that explains acceptable and unacceptable AI assistant use.

Allowed:
- ask for explanations
- ask for hints
- ask for test ideas
- ask for debugging questions
- ask for pseudocode after attempting
- ask for review of learner-written code

Not allowed:
- pasting complete generated solutions before attempting
- accepting code the learner cannot explain
- using AI to bypass tests
- hiding generated code in commits
- using AI to fabricate sources, citations, eval results, or logs

Include a daily self-check:
- What did I write by hand?
- What did AI help me understand?
- Which test failed first?
- Which test passed after my change?
- Can I explain the tradeoff?

F) milestone-rubric.md

Create rubrics for:
- Day 7 deterministic assistant
- Day 14 cited RAG system
- Day 21 bounded workflow/agent
- Day 28 production-shaped local app
- Day 30 portfolio defense

Each rubric should include:
- technical evidence
- testing/eval evidence
- explanation evidence
- safety/reliability evidence
- portfolio evidence
- pass / revise / stretch standards

G) continuation-roadmap.md

Create the post-Day-30 continuation route:

Days 31–45:
Production RAG depth
- hybrid search
- reranking
- better evals
- retrieval dashboards
- feedback loop

Days 46–60:
LLMOps and deployment
- CI/CD
- deployment target
- monitoring
- prompt/index/model versioning
- cost and latency optimization

Days 61–75:
Advanced agents
- workflow state machines
- memory boundaries
- tool permissions
- human-in-the-loop
- framework comparison

Days 76–90:
Model adaptation decisions
- when not to fine-tune
- dataset formatting
- small classifier or LoRA experiment only if justified

After 90:
Specialize in one:
- GraphRAG
- multimodal
- fine-tuning
- production ML systems
- AI platform engineering

H) Templates

Create practical templates:

templates/PROJECT_SCOPE.md
Must include:
- project name
- user problem
- target user
- input/output
- deterministic v0
- LLM/RAG/tool/agent use later
- non-goals
- data assumptions
- safety boundaries
- Day 7/14/21/28/30 expected evidence

templates/DAILY_ENGINEERING_LOG.md
Must include:
- date/day
- goal
- files touched
- test command run
- first failure
- final result
- AI assistance used
- what I can explain
- limitation discovered
- next step

templates/FAILURE_ANALYSIS.md
Must include:
- failure case
- trigger
- expected behavior
- actual behavior
- test coverage
- mitigation
- remaining risk

templates/DEMO_SCRIPT.md
Must include:
- happy path demo
- edge case demo
- refusal/abstention demo
- what to say while presenting
- expected output
- known limitations

templates/PORTFOLIO_NOTE.md
Must include:
- project summary
- architecture
- key engineering choices
- tests/evals
- reliability/safety
- what I would improve next
- interview talking points

templates/NEXT_30_DAYS.md
Must include:
- top 5 improvements
- technical debt
- deeper curriculum modules to revisit
- next portfolio milestone
- specialization choice

Deferral rules:

The 30-day route must explicitly defer:
- from-scratch GPT training
- deep PyTorch training loops
- LoRA/QLoRA fine-tuning implementation
- GraphRAG
- multimodal RAG
- complex multi-agent systems
- Kubernetes
- hosted SaaS platform
- enterprise MLOps
- full frontend/backend platform
- production scraping at scale

Important writing rules:

- Do not claim learners will “master AI Engineering” in 30 days.
- Do not say this replaces the complete course.
- Do not turn this into a video course.
- Do not require paid APIs; live API work can be optional/mockable.
- Do not create full solution code for the learner.
- Do not add large dependencies.
- Do not add unrelated platform infrastructure.
- Keep the path practical and project-driven.
- Keep every task connected to visible learner evidence.

Validation:

After editing, run or at least document the appropriate validation commands used in this repo. Prefer:

python -m pytest --collect-only curriculum -q
python scripts/validate_curriculum_quality.py --strict
python scripts/validate_curriculum_references.py --strict

If any command fails because the existing repo has unrelated issues, document the failure honestly and do not pretend validation passed.

Final response from you, the coding agent, should include:
- files created
- files updated
- summary of the 30-day route
- validation commands run and results
- any honest limitations or follow-up work