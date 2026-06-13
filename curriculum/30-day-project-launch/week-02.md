# Week 2: LLM Boundaries, Prompt Contracts, And Cited RAG

Timing: use this guide during Days 8-14. Read the current day in 5-10 minutes
before starting work, then use the checklist at the end of the day.

Week 2 adds model-facing behavior without losing the engineering discipline from
Week 1. The goal is not to make the assistant sound impressive. The goal is to
put LLM calls, prompts, retrieval, citations, abstention, and evals behind
boundaries that can be mocked, tested, traced, and explained.

## Week Goal

Add LLM behavior behind testable boundaries.

By the end of Day 14, another engineer should be able to run tests and a small
eval command, inspect retrieved chunks and citations, and see unsupported
questions abstain instead of producing confident guesses.

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

Keep the minimum path separate from stretch work. If provider setup, embeddings,
or eval design takes more than 60 minutes, switch to the fixture/mock path and
write the blocker down.

## Source Material To Trace

Read only the parts needed for the current day:

- `HOW_TO_USE_AI_ASSISTANTS.md`
- `FINANCE_SAFETY.md` if using FinAgent
- `curriculum/03-module-3-mcp-integration/PROMPTOPS_EVIDENCE_CHECKLIST.md`
  Minimum Test Set section for Day 9
- `curriculum/04-module-4-agentic-workflows/RAG_CITATION_ABSTENTION_CHECKLIST.md`
  Authoring Gate and Minimum Test Set sections for Days 12-13

Use module references selectively:

| Day | Required trace | Optional if blocked or ahead |
| --- | --- | --- |
| Day 8 | `curriculum/03-module-3-mcp-integration/week-01-fundamentals/` | Module 3 README provider-boundary notes |
| Day 9 | `PROMPTOPS_EVIDENCE_CHECKLIST.md` Minimum Test Set, Module 3 context/structured-output notes | Module 3 security/injection notes |
| Day 10 | `curriculum/02-module-2-first-principles/week-02-embeddings/` | Module 2 tokenization notes |
| Day 11 | `curriculum/04-module-4-agentic-workflows/week-01-basic-rag/` | Week 1 processed-record evidence |
| Day 12 | `RAG_CITATION_ABSTENTION_CHECKLIST.md` Authoring Gate and Minimum Test Set, `week-02-advanced-rag/` | Module 4 README RAG notes |
| Day 13 | `curriculum/05-module-5-production/week-01-golden-datasets/` | Module 5 eval observability notes |
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

## Day 8 - LLM API Wrapper

Deliverable: provider wrapper with timeout handling, mock mode, normalized
errors, token-cost logging, and optional retries

Build a replaceable provider boundary. The minimum path can be entirely mock
backed.

Build:

- provider interface or adapter function
- mock provider response
- no-key behavior
- normalized provider error shape
- token/cost/log fields, even if estimated or zero in mock mode

Required tests:

- mock success
- timeout or simulated timeout
- provider error
- no-key or mock-mode fallback

Minimum path:

- one wrapper module
- one mock provider
- no direct provider calls outside the wrapper
- tests pass without network or paid API access

Stretch:

- real provider smoke test behind an environment flag
- retry policy with capped attempts

Before you run:

- What should happen when no API key is configured?

Explain like a teammate:

- Where can model calls happen, and what trace fields make provider behavior
  debuggable?

Done when the project can run without a paid API key and direct provider calls
are isolated.

## Day 9 - Prompt Templates And Structured Output

Deliverable: prompt templates, schema validation, and prompt regression tests

Treat prompts as software contracts.

Build:

- prompt template file with name and version
- renderer with named variables
- structured answer schema
- parser or validator for model output
- normalized validation errors or refusal result

Required tests:

- template render with expected variables
- missing variable fails clearly
- valid structured output passes
- invalid JSON or missing field fails safely
- one injection or unsafe-instruction negative case

Minimum path:

- one prompt template
- one output schema
- four focused tests
- one negative case for unsafe user instruction, unsafe retrieved text, or
  instruction-in-source isolation

Stretch:

- prompt version trace field
- secret-safety test for logs or traces

Before you run:

- Which field must be present before downstream code may trust the answer?

Explain like a teammate:

- Why is a prompt change a software change that needs regression evidence?

Done when model output is accepted only after schema validation.

## Day 10 - Embeddings And Similarity

Deliverable: cosine similarity or simple retrieval implementation

Understand retrieval mechanics before adding a vector database.

Build:

- deterministic embedding fixture or simple bag-of-terms vectorizer
- cosine similarity
- ranking function over a tiny local corpus
- empty-corpus and no-match behavior
- retrieval result shape with `chunk_id` or `record_id`, score, and source
  metadata

Required tests:

- relevant result ranks ahead of weaker result
- empty corpus returns no result or a clear error
- tie behavior is deterministic
- irrelevant query produces low score or no usable evidence
- result includes the ID and metadata Day 11/12 will use for citations

Minimum path:

- local corpus of 3-5 records
- deterministic vector or embedding fixture
- ranking tests
- reusable retrieval result contract

Stretch:

- provider-backed embedding adapter behind the same interface
- configurable top-k

Before you run:

- Which record should rank first for the sample query, and why?

Explain like a teammate:

- What does similarity find well, and what can it miss?

Done when retrieval can rank a tiny local corpus reproducibly.

## Day 11 - Chunking And Metadata

Deliverable: chunked documents with source metadata and bad-record tests

Split records without losing citation context.

Build:

- chunker for processed Week 1 records
- stable chunk IDs
- source ID, URL or file, title/heading, and timestamp propagation
- bad-record handling

Required tests:

- normal document chunks preserve metadata
- empty document is rejected or reported
- missing source metadata fails safely
- duplicate chunk IDs are handled or rejected

Minimum path:

- one chunking strategy
- one metadata propagation rule
- tests for empty text and missing source

Stretch:

- overlap policy
- chunk-size version note
- chunk quality report

Before you run:

- Which metadata field would make citations impossible if it were lost?

Explain like a teammate:

- How does chunking change the data without breaking provenance?

Done when every retrievable chunk points back to its source record.

## Day 12 - Simple RAG With Citations

Deliverable: query -> retrieve -> answer with citations and abstention

Answer only from retrieved evidence.

Build:

- query pipeline
- retrieval trace with selected chunks and scores
- retrieved-context prompt
- cited answer schema
- abstention path for unsupported or weak-evidence questions
- citation validation against retrieved chunk IDs

Required tests:

- supported question returns cited answer
- unsupported question abstains
- answer with citation mismatch fails validation
- unsafe user instruction or unsafe retrieved text is refused, sanitized, or
  isolated

Minimum path:

- one supported golden question
- one unsupported question
- one citation validation rule
- mock provider answer
- one injection or unsafe-instruction negative case

Stretch:

- invented citation rejection
- weak-evidence threshold
- stale-source warning in answer or abstention
- source-conflict case

Before you run:

- Which retrieved chunk should support the answer claim?

Explain like a teammate:

- What makes abstention safer than a fluent unsupported answer?

Done when unsupported answers are refused or marked insufficient.

## Day 13 - RAG Evaluation

Deliverable: golden questions, eval runner, and failure taxonomy

Make answer quality inspectable.

Build:

- small golden eval set
- eval runner over mock or fixture-backed answers
- result rows with expected behavior, observed behavior, pass/fail, and failure
  category
- summary report

Required eval cases:

- supported cited answer
- unsupported abstention
- citation mismatch
- malformed structured output or formatting failure

Minimum path:

- 4-6 golden cases
- deterministic eval command
- failure categories for retrieval, citation, refusal, and formatting

Stretch:

- baseline score saved to `evals/latest_run.json`
- one manually reviewed ambiguous case

Before you run:

- Which case is most likely to fail, and what category should it report?

Explain like a teammate:

- How do these evals separate retrieval failure from generation or formatting
  failure?

Done when eval output distinguishes retrieval, citation, refusal, and formatting
failures.

## Day 14 - Milestone 2: Cited Q&A System

Deliverable: RAG assistant with citations, abstention, evals, and failure notes

Do cleanup only. Tighten docs, eval notes, and failure examples instead of
adding tools or agents.

Run:

```powershell
python -m pytest
```

Also run the project eval command and save the output summary in the daily log.

Milestone evidence:

- provider wrapper with mock mode
- prompt template and structured output schema
- chunked records with metadata
- retrieval ranking tests
- cited answer and abstention tests
- eval set and latest eval output
- failure taxonomy
- known retrieval limitation
- Day 14 note scored against `milestone-rubric.md`

Pass standard:

The project retrieves chunks, answers supported questions with citations,
abstains on unsupported questions, and has eval evidence that exposes failure
categories.

Minimum path:

- rerun tests
- rerun eval command
- fill Day 14 milestone note
- score against the Day 14 rubric

Stretch:

- add one good-answer trace and one abstention trace
- add retrieval settings or prompt version notes

Before you run:

- Which evidence proves that citations are real and unsupported answers stop?

Explain like a teammate:

- What improved since Day 7, what remains mock-only, and what Week 3 must not
  automate prematurely?

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
