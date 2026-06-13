# Week 1: Deterministic Project Spine

Timing: use this guide during Days 1-7, Sunday 2026-06-14 through Saturday
2026-06-20. Read the current day in 5-10 minutes before starting work, then use
the checklist at the end of the day.

Expected effort: 5-7 focused hours per day, 35-49 focused hours total. Day 7 is
the milestone check; protect that date by cutting stretch work first.

Week 1 turns a project idea into a small, testable, non-LLM assistant. The
output is not an impressive model demo. The output is a deterministic project
slice that validates input, processes local or fixture-backed data, preserves
provenance, writes clear output, and can be defended with tests and notes.

Pedagogy: Week 1 uses the same teaching loop as the main curriculum. Treat each
day as a project lesson: trace first, predict before running, inspect evidence,
make the smallest useful change, explain the tradeoff, and leave portfolio
evidence. See `teaching-method.md` for the route contract.

## Week Goal

Build without LLM magic first.

By the end of Day 7, another engineer should be able to run one command, inspect
the output, and understand what the project does, what it refuses to do, and
what still needs Week 2 LLM/RAG work.

## Day Guides

Read one day file at a time:

- [Day 1 - Setup, Diagnostic, And Project Scope](week-01/day-01.md)
- [Day 2 - Pytest, Workbench Discipline, And Git Habit](week-01/day-02.md)
- [Day 3 - Data Models, Validation, And Configuration](week-01/day-03.md)
- [Day 4 - Deterministic Pipeline v0](week-01/day-04.md)
- [Day 5 - HTTP/API-First Data Acquisition](week-01/day-05.md)
- [Day 6 - Cleaning, Provenance, And RAG-Ready Records](week-01/day-06.md)
- [Day 7 - Milestone 1: Deterministic Assistant](week-01/day-07.md)

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
6. Reference after effort: use hints, AI help, examples, or external docs only
   after you can name the failure or question.

Keep the minimum path separate from stretch work. If the day starts slipping,
finish the minimum path and write the stretch item into the backlog.

## Learner Logic Map

Fill this in each morning or in the daily log:

| Question | Week 1 answer |
| --- | --- |
| What can I do now? | Work from the previous day's deterministic project evidence. |
| What new capability am I adding? | Add one validated, testable non-LLM behavior. |
| What failure does this help me catch? | Bad input, unclear data boundaries, missing provenance, or untestable output. |
| How does this improve FinAgent or a practical AI system? | It creates a reliable baseline before prompts, retrieval, tools, or agents. |
| What should I be able to explain afterward? | The input, validation, data path, output, limitation, and test evidence. |

## Evidence Portfolio

For each day, capture:

- technical evidence: command, fixture, test, output, or code artifact
- failure evidence: first failing test, rejected input, malformed data, or
  limitation
- explanation evidence: 2-4 sentences explaining the choice
- transfer evidence: how this baseline protects later LLM/RAG behavior

## Source Material To Trace

Read only the parts needed for the current day:

- `START_HERE.md`
- `START_HERE_30_DAY_PROJECT_LAUNCH.md`
- `LEARNER_READY_MATRIX.md`
- `HOW_TO_USE_AI_ASSISTANTS.md`
- `FINANCE_SAFETY.md` if using FinAgent
- `curriculum/main-track/00-python-foundations/week-00-diagnostic/`
- `curriculum/main-track/00-python-foundations/week-03-stock-pipeline/`
- `curriculum/main-track/01-module-1-whole-game/`

Use the web-data bridge selectively:

| Day | Required trace | Optional if blocked or ahead |
| --- | --- | --- |
| Day 5 | `curriculum/specializations/web-scraping/core-lab-01-http-inspection/`, `curriculum/specializations/web-scraping/core-lab-03-api-first-collection/` | `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/`, `curriculum/specializations/web-scraping/core-lab-04-pagination-retries-deduplication/` |
| Day 6 | `curriculum/specializations/web-scraping/core-lab-05-provenance-data-quality/`, `curriculum/specializations/web-scraping/core-lab-06-rag-ready-packaging/` | Module 4 AI-ready data notes |

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
