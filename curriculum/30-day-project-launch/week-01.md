# Week 1: Deterministic Project Spine

Timing: use this guide during Days 1-7. Read the current day in 5-10 minutes
before starting work, then use the checklist at the end of the day.

Week 1 turns a project idea into a small, testable, non-LLM assistant. The
output is not an impressive model demo. The output is a deterministic project
slice that validates input, processes local or fixture-backed data, preserves
provenance, writes clear output, and can be defended with tests and notes.

## Week Goal

Build without LLM magic first.

By the end of Day 7, another engineer should be able to run one command, inspect
the output, and understand what the project does, what it refuses to do, and
what still needs Week 2 LLM/RAG work.

## Command Context

Run curriculum commands from the repository root. Run learner-project commands
from the project folder you create on Day 1. If a command assumes one of those
locations, write that location in the daily log before pasting the command.

## Daily Learning Loop

Use the same teaching loop every day:

1. Before you run: predict what should pass, fail, or be created.
2. Evidence first: start from a test failure, command output, trace, or data
   sample.
3. Smallest change: implement only the next behavior needed for the deliverable.
4. Explain like a teammate: write 2-4 sentences about the choice you made.
5. One step stronger: add one edge case, limitation note, or recovery rule.

Keep the minimum path separate from stretch work. If the day starts slipping,
finish the minimum path and write the stretch item into the backlog.

## Source Material To Trace

Read only the parts needed for the current day:

- `START_HERE.md`
- `START_HERE_30_DAY_PROJECT_LAUNCH.md`
- `LEARNER_READY_MATRIX.md`
- `HOW_TO_USE_AI_ASSISTANTS.md`
- `FINANCE_SAFETY.md` if using FinAgent
- `curriculum/00-python-foundations/week-00-diagnostic/`
- `curriculum/00-python-foundations/week-03-stock-pipeline/`
- `curriculum/01-module-1-whole-game/`

Use the web-data bridge selectively:

| Day | Required trace | Optional if blocked or ahead |
| --- | --- | --- |
| Day 5 | `core-lab-01-http-inspection/`, `core-lab-03-api-first-collection/` | `core-lab-02-fixture-static-extraction/`, `core-lab-04-pagination-retries-deduplication/` |
| Day 6 | `core-lab-05-provenance-data-quality/`, `core-lab-06-rag-ready-packaging/` | Module 4 AI-ready data notes |

## Project Shape

Use a project folder outside the curriculum source tree. Keep the first version
small enough to fit this shape:

```text
local fixture or API response
  -> raw storage
  -> validation
  -> cleaning
  -> deterministic analysis or formatting
  -> local output with known limits
```

Recommended folders inside the learner project:

```text
data/
  raw/
  clean/
  processed/
src/
tests/
docs/
logs/
```

If the project is FinAgent, the Week 1 deterministic assistant can normalize a
ticker request, validate fixture price or source records, compute simple summary
fields, and write an educational context report with a finance disclaimer. It
must not recommend trades, predict returns as advice, or hide stale data.

## Day 1 - Setup, Diagnostic, And Project Scope

Deliverable: `PROJECT_SCOPE.md`

1. Run the diagnostic:

```powershell
python -m pytest curriculum/00-python-foundations/week-00-diagnostic -q
```

2. Create the project folder, virtual environment, `README.md`, and test
   folder.
3. Copy `curriculum/30-day-project-launch/templates/PROJECT_SCOPE.md` into the
   project and fill it in.
4. Choose the Day 7 deterministic outcome in one sentence.

Minimum path:

- diagnostic command run from the curriculum repo root
- project folder created outside the curriculum source tree
- `PROJECT_SCOPE.md` filled with a narrow Day 7 outcome

Stretch:

- add a short architecture sketch or data-flow note to the project `README.md`

Before you run:

- What Python or setup failure do you expect the diagnostic might expose?

Explain like a teammate:

- Why is this project small enough to finish a deterministic Day 7 slice?

Evidence to capture:

- diagnostic result
- project spine
- deterministic v0 input and output
- non-goals
- first risk

Done when the scope names the input, output, deterministic v0, safety boundary,
and expected evidence for Days 7, 14, 21, 28, and 30.

## Day 2 - Pytest, Workbench Discipline, And Git Habit

Deliverable: one small utility, tests, and commit explanation

Build one narrow utility the rest of the project will use. Good options:

- ticker normalization
- document ID normalization
- date parsing
- source URL normalization
- safe filename generation

Required tests:

- normal input
- empty input
- malformed input
- boundary input

Minimum path:

- one utility
- four focused tests
- one passing test command

Stretch:

- add type hints and one property-style edge case if it remains simple

Before you run:

- Which test should fail first, and what behavior should make it pass?

Explain like a teammate:

- What input does this utility accept, reject, or normalize?

Evidence to capture:

- first failing assertion
- smallest change that made it pass
- final test command
- commit message or commit explanation

Done when the utility is tested, committed, and explainable in plain English.

## Day 3 - Data Models, Validation, And Configuration

Deliverable: config, models, and tests

Make project inputs explicit. Use dataclasses, Pydantic, or simple typed
functions, depending on what the learner project already uses.

Build:

- config loading for local paths and feature flags
- request or source-record model
- validation errors for missing, malformed, unsafe, or unsupported input

Required tests:

- valid config
- missing config field
- valid model
- bad input model
- unsafe request if the domain needs a refusal boundary

Minimum path:

- one config object or loader
- one request or source-record model
- tests for valid and invalid input

Stretch:

- add environment-specific config examples or stricter domain validation

Before you run:

- What bad input would be dangerous if it reached the pipeline?

Explain like a teammate:

- Why does this validation belong before any prompt, model call, or tool call?

Done when no core workflow accepts unvalidated raw input.

## Day 4 - Deterministic Pipeline v0

Deliverable: local input -> validate -> process -> output workflow

Create the first end-to-end command. It can be a CLI script, module command, or
small Python entry point.

Recommended default shape:

```powershell
python -m src.pipeline --input data/raw/sample.json --output data/processed/report.json
```

Use a different command only if it is documented in the project `README.md`.

Build:

- load one local fixture
- validate request and fixture data
- process the data deterministically
- write a local output file or print a structured report

Required verification:

```powershell
python -m pytest
```

Also run the project command and paste the command plus a short output summary
into the daily log.

Minimum path:

- one fixture input
- one deterministic output
- one documented command

Stretch:

- add a smoke test for the command or a trace table for the pipeline steps

Before you run:

- What output file or report should exist after the command finishes?

Explain like a teammate:

- What does the pipeline do deterministically, and what does it intentionally
  avoid doing?

Done when one command runs the deterministic slice with validated input and
clear output.

## Day 5 - HTTP/API-First Data Acquisition

Deliverable: raw/clean data boundaries and ingestion tests

Use a fixture-first path. Prefer stable APIs only when setup takes less than 60
minutes and the access terms are clear. If no live source is appropriate,
simulate the external response with a fixture and document the assumption.

Data access guardrails:

- source terms or usage assumptions are written down
- no API keys, cookies, or secrets are committed
- fixture fallback exists even if a live source works
- raw response is small enough to inspect
- no production scraping at scale

Build:

- raw response save path
- parser that converts raw input into clean records
- malformed response and missing-field handling

Stretch only:

- timeout behavior for live API access
- duplicate handling across pages or batches

Required tests:

- fixture-backed happy path
- malformed response
- missing field
- duplicate record where relevant, if dedupe is part of the minimum project

Minimum path:

- one raw fixture
- one parser
- one clean record shape
- two failure tests

Stretch:

- timeout, retry, pagination, or richer dedupe behavior

Before you run:

- Which fields must survive from raw input into the clean record?

Explain like a teammate:

- Why do raw and clean data need to stay separate?

Done when raw input is preserved and cleaned output is validated separately.

## Day 6 - Cleaning, Provenance, And RAG-Ready Records

Deliverable: processed JSONL-style records with metadata

Create records that Week 2 can chunk, embed, retrieve, and cite.

Each processed record should include:

- stable `id`
- `source_url` or `source_file`
- `retrieved_at` or fixture date
- title or heading
- cleaned text
- provenance metadata
- freshness or stale-source marker where relevant

Required tests:

- missing metadata is rejected
- empty text is rejected
- duplicate IDs are handled
- stale source markers are preserved

Minimum path:

- one JSONL-style processed record format
- required provenance fields
- tests for missing metadata and empty text

Stretch:

- duplicate ID resolution, stale-source policy, or quality report summary

Before you run:

- Which metadata field will Week 2 need for citations?

Explain like a teammate:

- What makes this record ready for retrieval but not yet an answer?

Done when the project can produce RAG-ready records without using a model.

## Day 7 - Milestone 1: Deterministic Assistant

Deliverable: deterministic project slice with tests, logs, validated input, and
documented limits

Do cleanup only. Tighten the evidence instead of adding new features.

Run:

```powershell
python -m pytest
```

If the project has a CLI or script, run that too and record the command.

Milestone evidence:

- `PROJECT_SCOPE.md`
- daily engineering logs for Days 1-7
- tests for validation and the deterministic path
- sample raw, clean, and processed records
- sample output or report
- known limits and bad-input behavior
- Day 7 note scored against `milestone-rubric.md`

Pass standard:

The project has a local input -> validate -> process -> output workflow that
runs without LLM calls, has tests for the core path and bad input, and explains
its limits honestly.

Minimum path:

- rerun tests
- rerun the documented project command
- fill the Day 7 milestone note
- score against the Day 7 rubric

Stretch:

- add a small sample output with limitations or a trace table

Before you run:

- Which evidence would convince another engineer that the slice is runnable?

Explain like a teammate:

- What is reliable now, what is still limited, and what Week 2 must not
  overclaim?

## Week 1 Evidence Checklist

- [ ] The diagnostic was run and the result is recorded.
- [ ] `PROJECT_SCOPE.md` is filled in.
- [ ] The project has a virtual environment or documented Python setup.
- [ ] The project has a repeatable test command.
- [ ] At least one utility has normal, malformed, empty, and boundary tests.
- [ ] Input models or validation boundaries reject bad input early.
- [ ] The deterministic pipeline runs from local input to local output.
- [ ] Raw and clean data are separate.
- [ ] Processed records preserve source metadata.
- [ ] RAG-ready records can be produced without embeddings or an LLM.
- [ ] Daily logs name first failures, final commands, limitations, and AI use.
- [ ] Day 7 is scored against `milestone-rubric.md`.

## Common Scope Traps

- Adding an LLM call before the deterministic workflow works.
- Building a broad app shell before data and validation are reliable.
- Treating scraped text as clean data without provenance.
- Writing prompts to hide missing validation.
- Using AI to generate a finished module the learner cannot explain.
- Claiming a portfolio milestone without tests or command output.

## Week 2 Handoff

Before starting Day 8, write down:

- the provider wrapper boundary the project will need
- which processed records should become retrieval documents
- which unsupported questions the assistant must refuse or abstain on
- one failure from Week 1 that should become an eval or safety case later
