# Start Here: 30-Day Project Launch

This route is for learners who can work full time for 30 days and need to
become productive on a real AI engineering project quickly. It is an
accelerated overlay on Course 1, not a replacement for the complete curriculum.

Use it when you can spend 5-7 focused hours per day building, testing,
debugging, and writing evidence. The goal is a production-shaped local project
that you can explain in a portfolio conversation.

## Who This Is For

- You already have intermediate Python and can read pytest failures.
- You can commit daily and keep a short engineering log.
- You want a project spine, not a video-course checklist.
- You are willing to build deterministic behavior before adding LLM behavior.
- You can use mock or fixture-backed provider calls when paid APIs are not
  available.

## Who Should Not Use This Yet

- You need broad Python fundamentals first. Start with
  `curriculum/00-python-foundations/week-00-diagnostic/`.
- You have only 1-2 hours per day. Use `START_HERE_2_HOURS_PER_DAY.md`.
- You want the complete Course 1 sequence with every scaffolded lesson.
- You want from-scratch GPT training, GraphRAG, multimodal RAG, Kubernetes, or
  a hosted SaaS platform in the first month.

## The Rule: No Vibe Coding

AI assistants may explain, hint, review, ask debugging questions, and suggest
tests after you attempt the work. They may not write hidden final solutions for
you. You must be able to explain every important line you keep.

Before Day 1, read:

- `HOW_TO_USE_AI_ASSISTANTS.md`
- `curriculum/30-day-project-launch/no-vibe-coding-protocol.md`

## Outcome After 30 Days

You should have a local project that demonstrates:

- data ingestion, validation, cleaning, and provenance
- LLM API wrapper boundaries with mockable behavior
- prompt contracts and structured output validation
- embeddings, retrieval, citations, and abstention
- typed tools and bounded workflow steps
- evals, logs, safety boundaries, and failure analysis
- portfolio-ready documentation, demo script, and next backlog

This does not mean you have mastered AI engineering. It means you have a
credible project launch, evidence of professional habits, and a clear path back
into the full curriculum for depth.

## Prepare Before Day 1

1. Run the Module 0 diagnostic:

```powershell
python -m pytest curriculum/00-python-foundations/week-00-diagnostic -q
```

2. Create or choose a project folder outside the curriculum source tree.
3. Choose a project spine. The recommended default is FinAgent, the educational
   stock analysis assistant, because it matches the Course 1 capstone.
4. Create a daily log from
   `curriculum/30-day-project-launch/templates/DAILY_ENGINEERING_LOG.md`.
5. Confirm you can run pytest and commit locally.

## How This Maps To Course 1

| Route week | Course 1 source to trace | Project capability |
| --- | --- | --- |
| Week 1 | Module 0, Module 1, web-data bridge | Python loop, tests, data, deterministic workflow |
| Week 2 | Module 2, Module 3, Module 4 core | LLM wrappers, prompts, embeddings, RAG, evals |
| Week 3 | Module 3 tools, Module 4 workflows | typed tools, bounded workflow, safety checks |
| Week 4 | Module 5, Module 6 capstone | local service boundary, logs, gates, portfolio defense |

Read and trace only what the day needs. Return later for the complete scaffolded
lessons.

## What To Ignore For Now

- optional advanced doorway folders
- from-scratch GPT training
- deep PyTorch training loops
- LoRA or QLoRA implementation
- GraphRAG and multimodal RAG
- complex autonomous multi-agent systems
- Kubernetes, hosted SaaS, and enterprise MLOps
- full frontend/backend platform scope
- production scraping at scale

## What To Open Next

Start here:

```text
curriculum/30-day-project-launch/README.md
curriculum/30-day-project-launch/daily-plan.md
curriculum/30-day-project-launch/templates/PROJECT_SCOPE.md
```

## After Day 30

Use `curriculum/30-day-project-launch/continuation-roadmap.md` to choose the
next 30-60 days. Then return to the full Course 1 path for any modules you only
traced during the launch route.
