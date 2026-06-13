# Module 1: FinAgent Whole-Game Slice

## Top-Down: Run, Trace, Modify, Package

**Duration:** 3 weeks  
**Expected time to finish:** 9-15 hours total, about 3-5 hours per phase  
**Prerequisites:** `../00-python-foundations/week-00-diagnostic`; complete `../00-python-foundations/week-01-python-essentials` first if the diagnostic exposes Python gaps  
**Pedagogy:** whole-part-whole learning, test-driven modification, product trace review, and PR-style explanation

## Module Overview

Module 1 gives learners a small complete AI engineering product slice before they study every internal mechanism. The current implemented path uses FinAgent, a deterministic stock-market analysis workflow, so learners can see the shape of the final capstone early without relying on full AI-generated code.

Use `../../FINANCE_SAFETY.md` whenever FinAgent output touches market context.

| Question | Answer |
| --- | --- |
| What will I build? | A deterministic FinAgent stock-summary workflow with validation, risk wording, and a local request/response boundary. |
| What skill will I practice? | Observe, reason, modify, verify: run the whole slice, trace it, change one behavior, and prove the change with tests. |
| How does this prepare me for the next module? | It gives you the product shape before Module 2 opens the model-facing mechanisms underneath AI systems. |

The goal is confidence plus context:

1. Run a complete workflow.
2. Trace the data and decisions.
3. Modify one behavior safely.
4. Package the workflow behind a local request/response boundary.
5. Explain why deterministic code is enough for this first slice and what is still missing before LLMs, RAG, MCP, and agents are added later.

The workbench tests are expected to fail at first. That is the exercise state, not a broken curriculum state.

## Minimum Path And Advanced Doorway

Use `../../LEARNER_JOURNEY_MAP.md` as the course-level map. Module 1's minimum
path is to run, trace, modify, and package one deterministic FinAgent slice.
The learner should leave with trace evidence, a PR-style change summary, and a
boundary note.

The advanced doorway is AI product architecture: LLM calls, RAG, tools, agents,
and production gates will arrive later. Here the learner earns the right to add
AI by first proving when deterministic software is enough.

## Evidence-Informed Teaching Mix

Module 1 uses the updated curriculum pedagogy map this way:

| Skill | Teaching method | Learner evidence |
| --- | --- | --- |
| Seeing the product shape | whole-part-whole | trace the full request, calculation, summary, and safety path |
| Changing behavior safely | test-driven learning | one focused failing test fixed at a time |
| Deciding whether AI is needed | case-based reasoning | deterministic-code vs LLM/RAG/agent decision note |
| Communicating engineering work | review-based learning | PR-style summary: change, reason, tests, risk |

## Style Rubric

A strong Module 1 learner:

- runs the whole FinAgent slice before trying to perfect any one part
- traces input, validation, calculation, summary text, and safety language
- changes one behavior at a time in each `workbench.py`
- reads pytest failures as product feedback, not just grading output
- uses AI to explain errors or ask for hints, not to generate complete replacements
- writes a short note after AI help naming what they decided themselves
- writes a short PR-style summary after each week: what changed, why it matters, tests run, and remaining risk

## From The Diagnostic To Module 1

The intended entry path is:

1. Run `../00-python-foundations/week-00-diagnostic`.
2. If needed, complete `../00-python-foundations/week-01-python-essentials`.
3. Complete this whole-game module.
4. Return to `../00-python-foundations/week-03-stock-pipeline` as the post-Module-1 integration bridge.

Module 1 reuses the skills from Python foundations:

- validation from Python essentials becomes ticker and price validation
- dictionaries become request and response payloads
- classes and dataclasses become typed domain objects
- string formatting becomes safe educational summary generation
- generators and structured functions prepare for later streaming and agents
- pytest remains the feedback loop for every change

The new difficulty is integration. Instead of solving isolated functions, learners connect small pieces into a visible product slice.

## Decision Habit

Before adding AI to a feature, learners should ask:

- Can deterministic code solve this reliably?
- Is the hard part language generation, retrieval, tool use, or workflow control?
- What would an LLM make better?
- What new failure modes would an LLM introduce?
- What test would prove the added complexity is worth it?

This habit comes from the book-derived curriculum synthesis and carries into model selection, RAG, agents, and production work.

## Folder Map

The folder names stay stable for tests and links. The learner-facing titles below are the names to use in docs, plans, and conversations.

| Phase | Folder | Learner-facing title | Deliverable | Verification from repo root |
| --- | --- | --- | --- |
| Phase 1 | `week-01-execute` | First FinAgent Stock Summary | Build the first stock summary from validated prices and a safe disclaimer | `python -m pytest curriculum/main-track/01-module-1-whole-game/week-01-execute/tests -v` |
| Phase 2 | `week-02-modify` | FinAgent Risk Signal Extension | Add risk labeling and a richer summary while keeping tests readable | `python -m pytest curriculum/main-track/01-module-1-whole-game/week-02-modify/tests -v` |
| Phase 3 | `week-03-deploy` | Local FinAgent Request Boundary | Package the analysis behind a local request/response boundary | `python -m pytest curriculum/main-track/01-module-1-whole-game/week-03-deploy/tests -v` |

## Narrative Framework

You are building the first reliable slice of FinAgent, an educational stock-market analysis assistant. The early version is intentionally deterministic:

- no LLM calls yet
- no hidden generated solution
- no external market API dependency
- no investment advice

Later modules will add model calls, retrieval, web data, MCP tools, agent workflows, observability, and production gates around this same spine.

## Phase Breakdown

### Phase 1: First FinAgent Stock Summary

Folder: `week-01-execute`

Learners complete a small stock summary workflow:

- parse and validate prices
- calculate percentage movement
- classify movement
- normalize ticker symbols
- generate a grounded educational summary

Teaching emphasis: trace before edit, tests as feedback, safe deterministic baseline.

Evidence artifact: a short trace note naming input, validation, calculation, output, and safety language.

### Phase 2: FinAgent Risk Signal Extension

Folder: `week-02-modify`

Learners add a risk signal:

- classify movement magnitude
- format percentages consistently
- build a richer summary
- preserve source grounding and disclaimer language

Teaching emphasis: make a constrained product change without breaking behavior.

Evidence artifact: a PR-style summary explaining the risk label, tests run, and limitations.

### Phase 3: Local FinAgent Request Boundary

Folder: `week-03-deploy`

Learners create a local deployment boundary:

- validate arbitrary request dictionaries
- convert request data into typed objects
- run deterministic analysis
- return structured response dictionaries
- include trace metadata for debugging

Teaching emphasis: separate core logic from the interface that will later become CLI, FastAPI, MCP, or an agent node.

Evidence artifact: a boundary note explaining request validation, trace metadata, and what would change in a real API.

## Checkpoint Gate

Learners are ready for Module 2 when they can:

- complete the Phase 1, Phase 2, and Phase 3 TODOs
- run each week test suite and explain the failures they fixed
- describe how Module 0 Python skills carried forward
- explain why the first FinAgent slice is deterministic before LLMs are added
- write a short deterministic-code vs LLM/RAG/agent decision note
- identify one realistic failure mode for each week
- produce the weekly evidence artifacts: trace note, PR-style summary, and boundary note

## Connection to Module 2

Before Module 2, complete `../00-python-foundations/week-03-stock-pipeline` so the student has one larger deterministic data pipeline connected to FinAgent.

Module 2 deconstructs the model internals that Module 1 intentionally leaves as future work:

- how text becomes tokens
- how embeddings support retrieval
- how attention processes context
- why evaluation and constraints matter before trusting generated output

Module 1 gives learners the map. Module 2 opens the machine.
