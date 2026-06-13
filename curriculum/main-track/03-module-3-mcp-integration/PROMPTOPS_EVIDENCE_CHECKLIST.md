# PromptOps Evidence Checklist

Use this checklist before creating or revising a Module 3 lesson that touches prompt templates, provider messages, structured outputs, prompt injection, or prompt regression tests.

This file is an authoring aid, not a learner solution. Lesson authors still need a lesson-level `AUTHORING_PLAN.md` with exact source evidence, planned tests, expected starting failures, and reference-validation notes.

## Source Evidence Baseline

| Source | Evidence locator | Planning takeaway | Use in Module 3 |
|---|---|---|---|
| B01 `Generative AI in Action` | Chapter 6, p.208, `B01_B01_P0208_C001` | Prompt engineering needs quality checks because prompts can overfit, behave inconsistently, and be hard to measure. | Require prompt regression examples instead of one-off prompt prose. |
| B01 `Generative AI in Action` | Chapter 6, p.203-204, `B01_B01_P0203_C001`, `B01_B01_P0204_C001` | Prompt injection can redirect behavior or misuse connected capabilities. | Require at least one injection or unsafe-instruction negative case when prompts consume user or retrieved text. |
| B01 `Generative AI in Action` | Chapter 13, p.415, `B01_B01_P0415_C001` | Prompt injection belongs in the safety and production risk model, not only in a prompt-writing lesson. | Link prompt tests to permission, refusal, and logging behavior. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 2, p.40, `B14_B14_P0040_C001` | Prompt templates should parameterize user input for programmatic execution. | Require named variables, expected inputs, and missing-variable behavior. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 1, p.22, `B14_B14_P0022_C001` | Prompt templates are part of the core LLM application object model. | Teach prompts as interface artifacts before framework convenience APIs. |
| Local PDF `Principles of Building AI Agents` | p.20 and p.33-34 | Provider choice, model routing, and structured output are early application design decisions. | Keep provider adapters, prompt templates, and structured outputs testable before tool or agent work. |

Do not copy book text into learner files. Use these locators to justify a checklist item, then turn the idea into learner-verifiable behavior.

## Authoring Gate

A Module 3 PromptOps lesson or revision is ready to implement only when its `AUTHORING_PLAN.md` answers all of these:

| Question | Required answer |
|---|---|
| What prompt artifact is versioned? | Name the prompt template, message builder, schema prompt, or context renderer. |
| What input shape is allowed? | List required variables, optional variables, and rejected values. |
| What output shape is expected? | Name the structured output, trace record, or normalized message format. |
| What is the first expected failure? | Identify the TODO failure learners should see before implementation. |
| What regression examples exist? | Include at least one normal case and one changed-input case. |
| What unsafe input is tested? | Include injection, secret leakage, unsupported instruction, or unsafe retrieved text when relevant. |
| What should the trace reveal? | Include prompt/template identity, version, variables used, refusal reason, or validation result. |
| What must the trace hide? | Explicitly exclude secrets, raw credentials, full private prompts, and unrelated memory. |
| What should the learner explain? | Require a short explanation of what the prompt allows, refuses, logs, and hides. |

## Minimum Test Set

Every PromptOps-facing learner exercise should include at least four of these tests. Pick the smallest useful set for the lesson.

| Test type | Required learner evidence |
|---|---|
| Template render test | Named variables are substituted intentionally and missing variables fail clearly. |
| Version trace test | The rendered message or trace includes prompt/template identity and version. |
| Structured-output test | Valid output passes shape checks before downstream code trusts it. |
| Malformed-output test | Missing or invalid fields produce a normalized error or refusal. |
| Prompt regression test | A known input keeps the expected behavior after prompt or schema changes. |
| Injection negative test | Unsafe instructions in user or retrieved text are refused, sanitized, or isolated. |
| Secret-safety test | Secrets and private configuration never appear in prompts, logs, traces, or summaries. |
| Cost/token note test | The learner records an estimate or limitation when the lesson touches provider calls. |

## Rubric Hooks

Add these rubric checks when the lesson touches PromptOps:

- Prompt artifacts are named, versioned, and testable.
- Prompt inputs are explicit; missing or unsafe inputs are handled before model use.
- Structured output is validated before tool, RAG, workflow, or report code consumes it.
- At least one negative case proves the prompt boundary fails safely.
- Trace metadata helps debug behavior without leaking secrets or private prompt content.
- The learner can explain why prompt changes are software changes, not casual wording tweaks.

## Scope Boundaries

Keep Module 3 focused on prompt contracts and local testability.

- Do not require a paid provider for the first green path.
- Do not add an enterprise prompt-management platform.
- Do not introduce autonomous agents to compensate for weak prompts.
- Do not teach a framework helper before the learner can explain the prompt contract it wraps.
- Defer large prompt catalogs, A/B testing platforms, and production prompt governance to Module 5 or Course 3.
