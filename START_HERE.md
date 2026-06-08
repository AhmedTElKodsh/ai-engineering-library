# Start Here

Welcome to the AI Engineering Library. This repo is a text-first, test-guided
curriculum for junior AI engineers with intermediate Python experience.

## First 15 Minutes

1. Read this file.
2. Open `README.md` for the course contract.
3. Open `LEARNER_READY_MATRIX.md` to see what is assignable, optional, or planned.
4. Run the Module 0 diagnostic:

```powershell
python -m pytest curriculum/00-python-foundations/week-00-diagnostic -q
```

If pytest plugin noise gets in the way, run:

```powershell
$env:PYTEST_DISABLE_PLUGIN_AUTOLOAD='1'
```

## What To Open First

Start here:

```text
curriculum/00-python-foundations/week-00-diagnostic/
```

Then move through the Course 1 core path below. Use `LEARNER_READY_MATRIX.md`
when you need the detailed readiness status.

## Canonical Learner Route

| Step | Open | Go next when... | Remediate or skip |
| --- | --- | --- | --- |
| 1 | Module 0 diagnostic | you can read the first failure and name the Python gap | remediate only the gaps the diagnostic exposes |
| 2 | Module 1 Weeks 1-3 | you can run, modify, and locally package the deterministic FinAgent slice | do not add LLMs yet |
| 3 | Module 0 stock pipeline bridge | you can validate CSV rows, metrics, and source-aware summaries | skip broad Python review you already passed |
| 4 | Module 2 Phases 1-6 | you can explain tokens, vectors, attention, context, and training vs inference | keep deep training math as a doorway |
| 5 | Module 3 Phases 1-4 | you can test provider, prompt, tool, trace, and security boundaries | keep live API work optional unless instructed |
| 6 | Web data Core Labs 1-6 plus portfolio mini-project | you can package provenance-preserving records for RAG and explain source-quality limits | keep live scraping optional unless instructed |
| 7 | Module 4 Phases 1-4 | you can build AI-ready records, cited RAG, and explicit workflow gates | Phases 5-8 are optional advanced doorway |
| 8 | Module 5 Weeks 1-7 | you can show evals, CI-style gates, service boundaries, logs, and tradeoff notes | avoid hosted platform scope |
| 9 | Module 6 in capstone order: Week 1 build, Week 3 integration, then Week 2 polish | you can prepare capstone scope, run a deterministic FinAgent integration workflow, and present demo/limitation evidence | keep live providers and hosted deployment optional |

## What To Ignore For Now

- optional extensions
- advanced doorway notes
- parked planning material
- external videos or articles before you run the local tests
- any folder not listed as assignable in `LEARNER_READY_MATRIX.md`

## How Lessons Work

Each lesson is built around the same loop:

1. Read the local `README.md`.
2. Inspect the tests before editing.
3. Complete TODO behavior in `workbench.py` or the named learner file.
4. Run the smallest relevant pytest command.
5. Write a short explanation of what changed and what still fails.
6. Use `hints.md` only after you can name the failing test or failure category.
7. Check `rubric.md` before you call the lesson done.

Starter tests are expected to fail until the learner completes TODOs. Import
errors, missing fixtures, or unclear instructions are curriculum defects.
