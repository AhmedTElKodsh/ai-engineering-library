# 30-Day Project Launch Milestone Rubric

Timing: reserve 30-60 minutes on Days 7, 14, 21, 28, and 30 to score the
milestone before moving on.

Use this rubric on Days 7, 14, 21, 28, and 30. A milestone passes when the
project has inspectable evidence, not when it merely feels complete.

## Standards

| Standard | Meaning |
| --- | --- |
| Pass | Evidence is present, runnable or inspectable, and explained honestly. |
| Revise | Core evidence is missing, unclear, untested, or overclaimed. |
| Stretch | The pass standard is met and the learner adds a useful, bounded improvement. |

## Day 7 - Deterministic Assistant

| Dimension | Pass | Revise | Stretch |
| --- | --- | --- | --- |
| Technical evidence | Local input -> validate -> process -> output workflow runs without LLM calls. | Workflow needs manual steps, accepts raw unvalidated input, or has unclear output. | Adds clean raw/clean/processed data boundaries and reusable command. |
| Testing/eval evidence | Unit tests cover validation and the main deterministic path. | Tests are missing or only cover happy paths. | Adds edge-case tests and a small end-to-end smoke command. |
| Explanation evidence | Engineering log explains workflow, limits, and first failure. | Notes are vague or only list files changed. | Adds a short architecture sketch or trace table. |
| Safety/reliability evidence | Known limits and bad-input behavior are documented. | System can produce confident output from bad input. | Adds structured logs for each deterministic step. |
| Portfolio evidence | Scope and Day 7 milestone note are readable. | Project purpose or user problem is unclear. | Adds a small sample output with limitations. |

## Day 14 - Cited RAG System

| Dimension | Pass | Revise | Stretch |
| --- | --- | --- | --- |
| Technical evidence | RAG pipeline retrieves chunks, answers with citations, and abstains when unsupported. | Answers can cite missing sources or invent unsupported claims. | Adds configurable retrieval settings with version notes. |
| Testing/eval evidence | Golden questions cover supported, unsupported, and citation mismatch cases. | Eval is subjective or lacks expected outcomes. | Adds failure taxonomy and baseline score. |
| Explanation evidence | Notes explain chunking, retrieval, prompt contract, and structured output. | Prompt and retrieval choices are not defensible. | Adds example traces for one good and one bad answer. |
| Safety/reliability evidence | Abstention and source-grounding rules are visible. | Model output is trusted without validation. | Adds prompt-injection or source-conflict case. |
| Portfolio evidence | README or note shows cited Q&A behavior and limitation. | Demo only shows a best-case answer. | Adds a short cited answer sample with source metadata. |

## Day 21 - Bounded Workflow/Agent

| Dimension | Pass | Revise | Stretch |
| --- | --- | --- | --- |
| Technical evidence | Workflow has typed tools, observable state, stop conditions, and verifier step. | Tool use is open-ended or hidden in unstructured model text. | Adds a state diagram or trace viewer output. |
| Testing/eval evidence | Tests cover tool validation, routing failure, retry limit, and escalation. | Workflow lacks negative-path tests. | Adds workflow eval cases for grounded success and safe stop. |
| Explanation evidence | Notes explain why a bounded workflow is enough. | Project uses "agent" language without a concrete boundary. | Adds a decision note comparing workflow vs autonomous agent. |
| Safety/reliability evidence | Safety boundaries, refusal cases, and prompt-injection tests exist. | Unsafe or unsupported requests are not handled. | Adds tool-permission denial tests. |
| Portfolio evidence | Milestone note shows trace logs and stop behavior. | Portfolio hides failures or retry behavior. | Adds a demo case where the workflow refuses or escalates. |

## Day 28 - Production-Shaped Local App

| Dimension | Pass | Revise | Stretch |
| --- | --- | --- | --- |
| Technical evidence | Project has one runnable boundary: CLI, script, endpoint, or demo app. | Core behavior requires undocumented manual steps. | Adds clean config examples and fixture-backed demo data. |
| Testing/eval evidence | Local quality gate runs tests and relevant evals. | Validation commands are missing or stale. | Adds a lightweight check script with clear output. |
| Explanation evidence | Docs explain architecture, commands, versioning, and known limits. | Reviewer cannot reproduce the project from docs. | Adds architecture diagram guidance or trace samples. |
| Safety/reliability evidence | Logs, failure analysis, and safety boundaries are present. | Failures are undocumented or hidden. | Adds cost/latency notes and fallback behavior. |
| Portfolio evidence | Demo script covers happy path, edge case, and refusal/abstention. | Demo only proves the easiest path. | Adds screenshot, trace, or sample output evidence. |

## Day 30 - Portfolio Defense

| Dimension | Pass | Revise | Stretch |
| --- | --- | --- | --- |
| Technical evidence | Final project shows data, LLM/RAG/tool/workflow, eval, logs, and docs in one coherent system. | Work exists but is fragmented or hard to run. | Adds a concise project walkthrough video outline or interview script. |
| Testing/eval evidence | Final gate, eval command, and demo command are recorded. | Results are claimed without commands or examples. | Adds before/after improvement notes from the month. |
| Explanation evidence | Learner can explain design choices, tradeoffs, and what was deferred. | Learner cannot explain code or AI-assisted sections. | Adds an interview talking-points section with hard questions. |
| Safety/reliability evidence | Limits, refusal behavior, source grounding, and failure modes are explicit. | Portfolio overclaims reliability or production readiness. | Adds a risk register for the next 30 days. |
| Portfolio evidence | Portfolio note and `NEXT_30_DAYS.md` are complete. | Next steps are vague or novelty-driven. | Links next work to measured weaknesses in the project. |
