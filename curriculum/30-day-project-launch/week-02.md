# Week 2: LLM Boundaries, Prompt Contracts, And Cited RAG

Timing: use this guide during Days 8-14, Sunday 2026-06-21 through Saturday
2026-06-27. Read the current day in 5-10 minutes before starting work, then use
the checklist at the end of the day.

Expected effort: 5-7 focused hours per day, 35-49 focused hours total. Day 14
is the milestone check; protect that date by cutting provider/setup stretch
work first.

Week 2 adds model-facing behavior without losing the engineering discipline from
Week 1. The goal is not to make the assistant sound impressive. The goal is to
put LLM calls, prompts, retrieval, citations, abstention, and evals behind
boundaries that can be mocked, tested, traced, and explained.

Pedagogy: Week 2 keeps the main curriculum's lesson shape even though the work
happens inside the learner project instead of a fixed `workbench.py`. Start from
evidence, predict behavior, modify one contract, verify it, explain the
boundary, and add one stronger negative case only after the minimum path works.
Use `teaching-method.md` as the route contract.

## Week Goal

Add LLM behavior behind testable boundaries.

By the end of Day 14, another engineer should be able to run tests and a small
eval command, inspect retrieved chunks and citations, and see unsupported
questions abstain instead of producing confident guesses.

## Day Guides

Read one day file at a time:

- [Day 8 - LLM API Wrapper](week-02/day-08.md)
- [Day 9 - Prompt Templates And Structured Output](week-02/day-09.md)
- [Day 10 - Embeddings And Similarity](week-02/day-10.md)
- [Day 11 - Chunking And Metadata](week-02/day-11.md)
- [Day 12 - Simple RAG With Citations](week-02/day-12.md)
- [Day 13 - RAG Evaluation](week-02/day-13.md)
- [Day 14 - Milestone 2: Cited Q&A System](week-02/day-14.md)

## Command Context

Run curriculum trace commands from the repository root. Run learner-project
commands from the project folder created in Week 1. The first successful path
must work without a paid API key by using mocks, fixtures, or deterministic
provider responses.

## Daily Learning Loop

Use the same loop as Week 1:

1. Before you run: predict the failure, output, or trace field.
2. Evidence first: inspect a test failure, mock response, retrieved chunk, or
   eval row before changing code.
3. Smallest change: implement one contract behavior at a time.
4. Explain like a teammate: write 2-4 sentences about the boundary and its
   limitation.
5. One step stronger: add one negative case, trace field, or refusal example.
6. Reference after effort: use provider docs, AI help, examples, or hints only
   after you can name the failure, schema question, or eval gap.

Keep the minimum path separate from stretch work. If provider setup, embeddings,
or eval design takes more than 60 minutes, switch to the fixture/mock path and
write the blocker down.

## Learner Logic Map

Fill this in each morning or in the daily log:

| Question | Week 2 answer |
| --- | --- |
| What can I do now? | Run and explain the deterministic Week 1 baseline. |
| What new capability am I adding? | Add one model-facing or retrieval-facing contract behind tests. |
| What failure does this help me catch? | Provider failure, malformed output, weak retrieval, fake citations, or unsupported answers. |
| How does this improve FinAgent or a practical AI system? | It lets the assistant use model behavior without trusting fluent text blindly. |
| What should I be able to explain afterward? | The wrapper, prompt, schema, retrieval, citation, abstention, or eval boundary. |

## Evidence Portfolio

For each day, capture:

- technical evidence: prompt, schema, mock response, retrieval result, eval, or
  test artifact
- failure evidence: timeout, malformed model output, citation mismatch,
  unsupported question, or injection case
- explanation evidence: 2-4 sentences explaining the boundary and limitation
- transfer evidence: how the contract protects later tool/workflow behavior

## Source Material To Trace

Read only the parts needed for the current day:

- `HOW_TO_USE_AI_ASSISTANTS.md`
- `FINANCE_SAFETY.md` if using FinAgent
- `curriculum/main-track/03-module-3-mcp-integration/PROMPTOPS_EVIDENCE_CHECKLIST.md`
  Minimum Test Set section for Day 9
- `curriculum/main-track/04-module-4-agentic-workflows/RAG_CITATION_ABSTENTION_CHECKLIST.md`
  Authoring Gate and Minimum Test Set sections for Days 12-13

Use module references selectively:

| Day | Required trace | Optional if blocked or ahead |
| --- | --- | --- |
| Day 8 | `curriculum/main-track/03-module-3-mcp-integration/week-01-fundamentals/` | Module 3 README provider-boundary notes |
| Day 9 | `PROMPTOPS_EVIDENCE_CHECKLIST.md` Minimum Test Set, Module 3 context/structured-output notes | Module 3 security/injection notes |
| Day 10 | `curriculum/main-track/02-module-2-first-principles/week-02-embeddings/` | Module 2 tokenization notes |
| Day 11 | `curriculum/main-track/04-module-4-agentic-workflows/week-01-basic-rag/` | Week 1 processed-record evidence |
| Day 12 | `RAG_CITATION_ABSTENTION_CHECKLIST.md` Authoring Gate and Minimum Test Set, `week-02-advanced-rag/` | Module 4 README RAG notes |
| Day 13 | `curriculum/main-track/05-module-5-production/week-01-golden-datasets/` | Module 5 eval observability notes |
| Day 14 | `milestone-rubric.md` Day 14 section | Day 7 milestone notes |

## Project Shape

Week 2 extends the Week 1 pipeline:

```text
processed records
  -> chunks with metadata
  -> retrieval ranking
  -> retrieved context
  -> prompt template
  -> mock or real provider boundary
  -> structured answer validation
  -> citations or abstention
  -> eval result
```

Recommended additions inside the learner project:

```text
prompts/
  rag_answer_v1.txt
evals/
  golden_questions.jsonl
  latest_run.json
src/
  providers.py
  prompts.py
  retrieval.py
  rag.py
  evals.py
tests/
```

## Week 2 Guardrails

- The project must run without a paid API key.
- Direct provider SDK calls belong in one wrapper module only.
- Prompt templates are versioned artifacts, not inline chat strings.
- Model output is never trusted until schema validation passes.
- Retrieval is tested before answer generation.
- Citations must map to retrieved chunks that actually exist.
- Unsupported or weak-evidence questions abstain.
- Secrets, API keys, private prompts, and full credentials never appear in logs.

## Week 2 Evidence Checklist

- [ ] Provider calls are isolated behind one wrapper boundary.
- [ ] The first successful path works without a paid API key.
- [ ] Prompt template is named, versioned, and rendered through code.
- [ ] Structured output is validated before downstream use.
- [ ] Prompt or output tests include at least one negative case.
- [ ] Retrieval ranks a tiny local corpus reproducibly.
- [ ] Chunks preserve source metadata for citation.
- [ ] RAG answers cite retrieved chunks only.
- [ ] Unsupported or weak-evidence questions abstain.
- [ ] Eval cases cover supported, unsupported, citation mismatch, and formatting
  failure.
- [ ] Daily logs name first failures, final commands, limitations, and AI use.
- [ ] Day 14 is scored against `milestone-rubric.md`.

## Common Scope Traps

- Requiring a paid API key for the first green path.
- Sprinkling provider calls throughout the codebase.
- Treating prompts as informal text instead of versioned artifacts.
- Trusting fluent model output without schema validation.
- Adding a vector database before retrieval behavior is clear.
- Letting citations point to sources that were not retrieved.
- Reporting subjective answer quality without examples.
- Adding tools or agents before RAG behavior is measurable.

## Week 3 Handoff

Before starting Day 15, write down:

- which deterministic capabilities should become typed tools
- which RAG trace fields Week 3 workflows must preserve
- which refusal or abstention cases must remain hard stops
- one eval failure that should become a workflow verifier or escalation case
