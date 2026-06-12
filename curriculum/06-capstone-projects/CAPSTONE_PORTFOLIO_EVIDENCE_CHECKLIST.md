# Capstone Portfolio Evidence Checklist

Use this checklist before revising Module 6 capstone lessons that ask learners to present, defend, or publish their project.

This file is an authoring aid. It keeps portfolio polish practical: the learner should show artifacts, evidence, results, limitations, and a concise story a reviewer can verify.

## Source Evidence Baseline

| Source | Evidence locator | Planning takeaway | Use in Module 6 |
|---|---|---|---|
| B01 `Generative AI in Action` | Chapter 12, p.403, `B01_B01_P0403_C001` | LLM behavior can be evaluated with task-specific checks before release claims. | Require capstone release evidence to include eval results, not only a demo transcript. |
| B10 `LLM Engineer's Handbook` | Chapter 7, p.291 and p.300-303, `B10_B10_P0291_C001`, `B10_B10_P0300_C001`, `B10_B10_P0302_C001`, `B10_B10_P0303_C001` | LLM/RAG evaluation should match the task and treat judge-based signals carefully. | Require the capstone to name what each eval proves and what remains uncertain. |
| Local PDF `Principles of Building AI Agents` | p.80-83 and p.118-124 | Agent traces and evals turn nondeterministic behavior into inspectable evidence. | Require trace and eval artifacts in the portfolio evidence ledger. |
| Local PDF `Hands-On RAG for Production` | p.61, p.63, and p.68-70 | Production readiness needs requirements, KPIs, monitoring/review notes, and upgrade or release decisions. | Require release readiness to include blocker status, thresholds, and review notes. |
| Local PDF `LLMOps` | p.52, p.54, p.56-58, p.183, and p.205-206 | Production claims need KPIs, risk notes, knowledge-limit behavior, traceability, and prompt/model/version context. | Require release evidence and interview defense to include versions, risks, and pipeline-stage explanations. |
| Local PDF `Your AI Roadmap` | p.123-130 | Portfolio work should translate projects into social proof, STAR stories, tangible evidence, measured results, and small prototypes. | Require capstone artifacts to support a concise Situation/Task/Action/Result story with measurable or reviewable evidence. |
| Local PDF `Your AI Roadmap` | p.131-135 | Career prototyping should be cheap, quick, feedback-oriented, and connected to a broader professional story. | Keep Module 6 polish focused on a small reviewer-ready capstone rather than a new product or credential detour. |

Do not copy book text into learner-facing files. Use these locators to justify portfolio, release, and interview-defense behavior.

## Authoring Gate

A Module 6 capstone lesson is ready to revise only when its `AUTHORING_PLAN.md` answers all of these:

| Question | Required answer |
|---|---|
| What portfolio claim is being supported? | Name the skill, behavior, architecture choice, safety decision, or tradeoff the learner claims. |
| What artifact proves it? | Point to code, tests, evals, traces, data fixtures, diagrams, demo steps, release notes, or limitation notes. |
| What result can be measured or inspected? | Name pass/fail counts, failure categories, citations, refusal behavior, latency/cost notes, or reviewer checks. |
| What limitation must be disclosed? | Name stale data, unsupported advice, missing evidence, privacy, model variability, or future work. |
| What is the STAR story? | Require a brief Situation, Task, Action, and Result that connects artifacts to an interview-ready explanation. |
| What stayed out of scope? | Label product expansion, hosted deployment, richer finance integrations, or advanced agent depth as optional. |

## Minimum Portfolio Evidence Set

Every capstone-polish exercise should include at least six of these checks.

| Check type | Required learner evidence |
|---|---|
| Scope statement | The project names included behavior and non-goals. |
| Demo sequence | The demo shows setup, safe cited answer, abstention/refusal, and evidence review. |
| Eval evidence | The project includes repeatable tests/evals with edge and failure cases. |
| Trace evidence | The project records where data, retrieval, generation, and refusal decisions happened. |
| Release evidence | Checks are summarized with pass/fail/blocker status. |
| Limitation note | Known safety, freshness, data, model, and non-advice boundaries are explicit. |
| STAR story | The learner can explain Situation, Task, Action, and Result using the project artifacts. |
| Reviewer command | A teammate can rerun the relevant command from a clean checkout. |
| Small-prototype boundary | The project avoids turning capstone polish into a new product build. |

## Scope Boundaries

- Do not require a public portfolio website for Course 1.
- Do not require social posting, networking, income planning, or career coaching deliverables.
- Do not let polish hide missing evals, citations, refusals, or limitations.
- Do not turn interview defense into generic resume advice.
- Keep advanced deployment, GraphRAG, fine-tuning, multimodal input, and enterprise LLMOps as later-course or specialization work.
