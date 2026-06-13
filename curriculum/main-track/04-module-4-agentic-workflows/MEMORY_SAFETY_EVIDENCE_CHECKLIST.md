# Memory Safety Evidence Checklist

Use this checklist before creating or revising a Module 4 lesson that stores conversation history, summarizes prior turns, carries workflow state, recalls previous evidence, or introduces agent memory.

This file is an authoring aid. It keeps Course 1 memory work bounded: learners should understand what state is carried, what is forgotten, what is summarized, what must never be stored, and how a developer can inspect the result.

## Source Evidence Baseline

| Source | Evidence locator | Planning takeaway | Use in Module 4 |
|---|---|---|---|
| B16 `An Illustrated Guide to AI Agents` | Chapter 1, section 5, `B16_B16_S0005_C003` | LLMs do not inherently remember prior conversations; prior context must be supplied inside the prompt or state. | Require authors to distinguish model context from application memory. |
| B14 `AI Agents and Applications with LangChain, LangGraph, and MCP` | Chapter 11, p.354, `B14_B14_P0354_C001` | Agent state can be modeled as the messages and tool responses carried through a workflow. | Require explicit state objects or trace records before framework-managed state. |
| B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection` | p.246-247, `B05_B05_P0246_C001`, `B05_B05_P0247_C001` | Agent memory can be separated into short-term working context and longer-term storage, with short-term state being transient and limited. | Teach working memory before persistent memory. |
| B05 `Building LLM Agents with RAG, Knowledge Graphs, and Reflection` | p.251, `B05_B05_P0251_C001` | Summarization can compress repeated experiences into higher-level notes. | Require summarization or trimming tests when a lesson compresses memory. |
| B09 `Hands-On Large Language Models` | p.295, p.300, p.302-303, `B09_B09_P0295_C001`, `B09_B09_P0300_C001`, `B09_B09_P0302_C001`, `B09_B09_P0303_C001` | Conversation buffers and summaries can carry prior context, but they are constrained by context windows and summarization quality. | Require authors to test what is kept, dropped, or summarized. |
| B03 `Introducing MLOps` | p.49, p.124, `B03_B03_P0049_C001`, `B03_B03_P0124_C001` | Governance and privacy obligations affect how personal information is collected, processed, and retained. | Require privacy and retention boundaries when memory may contain user or domain-sensitive data. |
| Local PDF `Principles of Building AI Agents` | p.40-41 | Working and hierarchical memory combine recent messages with relevant long-term memories inside the model context. | Require authors to define which memories enter context, what is excluded, and how context-window pressure is handled. |

Do not copy book text into learner-facing files. Use these locators to justify a testable memory behavior, not a long theory section.

## Authoring Gate

A Module 4 memory or state lesson is ready to implement only when its `AUTHORING_PLAN.md` answers all of these:

| Question | Required answer |
|---|---|
| What state is carried? | Name the messages, retrieved evidence, tool outputs, workflow fields, or summary notes. |
| Why is the state needed? | Explain the next decision, citation, retry, refusal, or review gate it supports. |
| What is not remembered? | List secrets, credentials, private user data, unrelated chat history, unsupported claims, or high-risk domain advice. |
| Is the memory transient or persistent? | Mark it as working context, session state, retrieval-backed memory, summary, or durable storage. |
| What retention rule applies? | State when memory is dropped, trimmed, summarized, or explicitly saved. |
| What privacy boundary exists? | Identify sensitive fields and how they are redacted, refused, minimized, or excluded. |
| What failure is practiced first? | Name the expected learner TODO failure before implementation. |
| What trace is recorded? | Include state keys, evidence IDs, summary length, redaction/refusal reason, or retention action. |
| What must the trace hide? | Exclude secrets, private prompts, raw credentials, unnecessary personal data, and unrelated memory. |
| What does the learner explain? | Require a short note on what was kept, forgotten, summarized, refused, and why. |

## Minimum Test Set

Every memory-facing exercise should include at least four of these tests. Choose the smallest set that proves memory behavior without turning Course 1 into an advanced memory architecture course.

| Test type | Required learner evidence |
|---|---|
| State shape test | Workflow state contains only the fields needed for the next step. |
| No hidden mutation test | State transitions return a reviewable new state or trace rather than silently mutating prior evidence. |
| Retention test | Old, unrelated, or over-budget context is dropped or summarized according to the lesson rule. |
| Summary test | Summaries preserve decision-critical facts and omit irrelevant or sensitive details. |
| Privacy/refusal test | Sensitive or high-impact content is refused, redacted, or excluded from memory. |
| Retrieval-backed memory test | Recalled facts include source IDs instead of unsupported model memory claims. |
| Trace test | Developers can inspect what was kept, dropped, summarized, or refused. |
| Secret-safety test | Secrets and credentials never appear in memory, prompts, logs, traces, or summaries. |

## Rubric Hooks

Add these rubric checks when a lesson touches memory or workflow state:

- Memory is scoped to the current task and does not become a hidden general profile.
- State transitions are explicit, inspectable, and testable.
- Persistent memory is avoided unless the lesson defines a retention rule and safety boundary.
- Sensitive information is minimized, redacted, refused, or excluded before storage.
- Summaries preserve evidence and decision-critical facts without inventing unsupported claims.
- The learner can explain the difference between context supplied to a model and memory owned by the application.

## Scope Boundaries

Keep Module 4 memory work practical and bounded.

- Do not require long-term personal memory for Course 1.
- Do not add vector-memory infrastructure unless the lesson first proves retrieval and citation behavior.
- Do not let memory replace source grounding; recalled facts still need evidence when used in answers.
- Do not introduce advanced cognitive architectures as required implementation work.
- Defer long-running memory systems, memory processors, cross-session profiles, and enterprise retention policies to Course 3 or a specialization.
