# Curriculum Review and Implementation Start

## Review Scope

Reviewed the current curriculum tree and planning archive after moving planning documents into `.kiro/specs/curriculum-planning/`.

## Planning Documents Moved

Moved these planning groups into `.kiro/specs/curriculum-planning/`:

- root curriculum planning: `ROADMAP.md`, `SPEC.md`
- curriculum docs: pedagogical framework, overview, learning path, migration, reorganization, progress, research, quick-start, and technology comparison documents
- future platform notes

Pointer files remain in `curriculum/` so authors and learners can find the canonical planning files without duplicating roadmaps.

## Curriculum File and Chapter Review

| Area | Current state | Implementation implication |
| --- | --- | --- |
| `00-python-foundations` | Strongest implemented module. Has diagnostic, Chapter 01, Chapter 02, Chapter 03 mini-projects, tests, and FinAgent stock-pipeline connection. | Preserve as the entry foundation. Use it as the standard for tests-first learning. |
| `01-ai-engineering` | Legacy/Layer 1 material remains in curriculum with guides and docs. It overlaps the newer module structure. | Treat as source material for migration, not the primary learner path. |
| `01-module-1-whole-game` | Reviewed and now has module README plus Week 1, Week 2, and Week 3 learner-facing scaffolds with README, workbench, tests, hints, and rubric. Workbenches intentionally fail until learners complete TODOs. | Next pass should standardize headings across all weeks and add instructor-only reference behavior for Weeks 2-3. |
| `02-module-2-first-principles` | Module README has been cleaned. Week 1 tokenization, Week 2 embeddings, and Week 3 attention now have learner-facing README, workbench, tests, hints, and rubric. Workbenches intentionally fail until learners complete TODOs. | Next content work: create Week 4 transformer vertical slice. |
| `03-module-3-mcp-integration` | Has learner-facing README, workbench, tests, hints, and rubric files for all four phases. Workbenches intentionally fail until learners complete TODOs. | Keep the first provider-boundary slice scoped to token/cost tracing; teach retry, timeout, rate-limit, and streaming as later reliability work unless tests are added. |
| `04-module-4-agentic-workflows` | Has a module README but week folders lack lesson files. | Needs RAG/agent workflow lessons that consume prior FinAgent data/tool slices. |
| `05-module-5-production` | Has a concise module README but week folders lack lesson files. | Needs golden dataset/regression testing lesson before capstone. |
| `06-capstone-projects` | Has high-level README only; week folders lack lesson files. | Needs FinAgent-specific capstone milestones, rubrics, fixtures, and tests. |
| `specializations/web-scraping` | Has a clear specialization README. | Needs first fixture-based static extraction project with tests. |
| `templates` | Has reusable lesson, exercise, hints, project, rubric, and testing templates. | Keep templates and use them for all new lesson work. |

## Implementation Started

Started implementation in:

- `curriculum/01-module-1-whole-game/week-02-modify/`

Added the next learner-facing curriculum slice:

- `README.md` using the standard Read/Trace/Modify/Create/Verify/Reflect flow
- `workbench.py` with TODOs for risk labeling, percent formatting, and safe summary generation
- `tests/test_finagent_risk_signal.py` with intentional initial failures
- `hints.md` with progressive hints
- `rubric.md` with correctness, testing, safety, maintainability, and reflection criteria

Verification:

- `python -m pytest curriculum/01-module-1-whole-game/week-01-execute/tests -v`
- Result: expected learner-workbench failures remain because Week 1 `workbench.py` keeps TODOs
- `python -m pytest curriculum/01-module-1-whole-game/week-02-modify/tests -v`
- Result: expected learner-workbench failures because Week 2 `workbench.py` starts incomplete by design

Reference behavior for Module 1 Week 1 is recorded in `implementation-notes/module-1-week-1-reference.md` so the intended solution is preserved outside the learner-facing workbench.

## Party Mode Review: Module 0 and Module 1

BMAD review focused on `00-python-foundations` and `01-module-1-whole-game`.

### John - Product/Curriculum Review

Strengths:

- Module 0 is the strongest shipped slice: diagnostic, essentials, production habits, and mini-projects reinforce the same tests-first learning loop.
- Module 1 Week 1 and Week 2 create the right arc: execute the whole game, then modify it.
- FinAgent continuity gives learners a reason to care across modules instead of treating chapters as isolated drills.

Gaps identified:

- Module 1 needed Week 3 completed to avoid a broken learner expectation.
- The bridge from Module 0 mini-projects into Module 1 whole-game work needed to be explicit.
- Deployment is the missing "ship" moment in the execute -> modify -> deploy progression.

Actions taken:

- Added `week-03-deploy` with README, TODO workbench, tests, hints, and rubric.
- Rewrote Module 1 README to include a current FinAgent learning path, Module 0 carry-forward skills, and checkpoint gate.

### Paige - Documentation Review

Strengths:

- Module 0 is structurally complete and has a clear chapter progression.
- Module 1 now aligns better with the Read -> Trace -> Explain -> Modify -> Create -> Verify -> Reflect contract.
- Pointer files are useful as long as they consistently point to `.kiro/specs/curriculum-planning/`.

Gaps identified:

- Lesson navigation should consistently state learner outcome, FinAgent callback, and verification path.
- Rubrics should remain learner-facing, not just evaluator-facing.
- Terminology should be tightened over time: chapter vs week, workbench vs reference note, tests vs verification.

Actions taken:

- Added Week 3 deploy scaffold.
- Rewrote Module 1 README in cleaner ASCII and updated it around the actual FinAgent implementation path.

### Test Architecture Review

Observed test state:

- `00-python-foundations/week-00-diagnostic`: diagnostic tests fail by design.
- `00-python-foundations/week-01-python-essentials`: essentials tests fail by design.
- `00-python-foundations/week-02-production-python`: production Python tests fail by design.
- `00-python-foundations/week-03-stock-pipeline`: stock pipeline tests fail by design until learner TODOs are completed.
- `01-module-1-whole-game/week-01-execute`: 7 failed by design.
- `01-module-1-whole-game/week-02-modify`: 3 failed by design.
- `01-module-1-whole-game/week-03-deploy`: 5 failed by design.

Interpretation:

- These are learner-workbench failures, not implementation defects, as long as imports succeed and failures point to TODO behavior.
- Future verification should distinguish "workbench expected failures" from "reference solution passes."
- A later instructor-only reference suite or solution archive would help reviewers validate test correctness without exposing answers in learner folders.

## Recommended Next Implementation Order

1. Add a Module 0 review appendix listing each chapter's learner outcome, FinAgent callback, and expected failure profile.
2. Standardize Module 0 chapter READMEs around learner outcome, verification path, and FinAgent callback.
3. Add Module 2 Week 4 transformer vertical slice.
4. Add web-scraping Project 1 with static HTML fixtures and extraction tests.
5. Continue Module 4 only after its data-before-RAG boundary and source-grounding gates are explicit.

## Implementation Update: Module 2 Week 1

Added the next learner-facing chapter:

- `curriculum/02-module-2-first-principles/week-01-tokenization/README.md`
- `curriculum/02-module-2-first-principles/week-01-tokenization/workbench.py`
- `curriculum/02-module-2-first-principles/week-01-tokenization/tests/test_tiny_tokenizer.py`
- `curriculum/02-module-2-first-principles/week-01-tokenization/hints.md`
- `curriculum/02-module-2-first-principles/week-01-tokenization/rubric.md`
- `implementation-notes/module-2-week-1-reference.md`

Also rewrote the Module 2 README in clean ASCII and connected it explicitly to the Module 1 FinAgent path.

Verification:

- `python -m pytest curriculum/02-module-2-first-principles/week-01-tokenization/tests -v`
- Result: 9 expected learner-workbench failures. Collection and imports succeed; failures point to TODO behavior in `workbench.py`.

## Implementation Update: Module 2 Week 2

Added the next learner-facing chapter:

- `curriculum/02-module-2-first-principles/week-02-embeddings/README.md`
- `curriculum/02-module-2-first-principles/week-02-embeddings/workbench.py`
- `curriculum/02-module-2-first-principles/week-02-embeddings/tests/test_tiny_embeddings.py`
- `curriculum/02-module-2-first-principles/week-02-embeddings/hints.md`
- `curriculum/02-module-2-first-principles/week-02-embeddings/rubric.md`
- `implementation-notes/module-2-week-2-reference.md`

Updated the Module 2 README so Week 2 is no longer listed as planned-only.

Verification:

- `python -m pytest curriculum/02-module-2-first-principles/week-02-embeddings/tests -v`
- Result: 10 expected learner-workbench failures and 1 passing edge-case test. Collection and imports succeed; failures point to TODO behavior in `workbench.py`.

## Implementation Update: Module 2 Week 3

Added the next learner-facing chapter:

- `curriculum/02-module-2-first-principles/week-03-attention/README.md`
- `curriculum/02-module-2-first-principles/week-03-attention/workbench.py`
- `curriculum/02-module-2-first-principles/week-03-attention/tests/test_tiny_attention.py`
- `curriculum/02-module-2-first-principles/week-03-attention/hints.md`
- `curriculum/02-module-2-first-principles/week-03-attention/rubric.md`
- `implementation-notes/module-2-week-3-reference.md`

Updated the Module 2 README so Week 3 is no longer listed as planned-only.

Verification:

- `python -m pytest curriculum/02-module-2-first-principles/week-03-attention/tests -v`
- Result: 9 expected learner-workbench failures and 2 passing edge-case tests. Collection and imports succeed; failures point to TODO behavior in `workbench.py`.

## Party Mode Enhancement Review: Modules 0-2

BMAD review focused on `00-python-foundations`, `01-module-1-whole-game`, and `02-module-2-first-principles` against the roadmap, authoring spec, pedagogy rules, and naming clarity.

### Pedagogy Findings

- Module 0 is correctly positioned as diagnostic/remediation plus optional reinforcement, but learner instructions now need to keep saying "start with the diagnostic, remediate only what you need, then move to Module 1."
- Module 1 should stay whole-game first: learners run and modify the complete deterministic FinAgent slice before deep internals.
- Module 2 should make the fixed conceptual sequence explicit: tokenization -> embeddings -> attention -> transformer.
- Each module needs visible learner behavior standards, not only correctness standards: run tests early, explain failures, implement personally, use AI for hints and review, and reflect on transfer.

### Naming Findings

- Stable folder paths are part of the learner contract and should not be renamed casually.
- Repeated `starter.py` files made browsing harder and encouraged a disposable-file mental model.
- Learner-editable code should be called `workbench.py`; the diagnostic learner file should be `diagnostic_workbench.py`.
- Reviewer-only reference behavior remains under `implementation-notes/`, not inside learner folders.

### Actions Taken

- Renamed learner-editable `starter.py` files in Modules 0-2 to `workbench.py`.
- Renamed Module 0 diagnostic `solution_template.py` to `diagnostic_workbench.py`.
- Updated test imports from `starter` to `workbench` and cleared `sys.modules["workbench"]` before imports so multi-week collection does not reuse the wrong module.
- Added style rubrics to the Module 0, Module 1, and Module 2 READMEs.
- Updated `SPEC.md` and `ROADMAP.md` to use `workbench.py` as the standard learner-editable file name.

### Verification Expectation

For this curriculum state, passing verification means collection and imports succeed. Assertion failures in workbench tests are expected until learners complete TODOs.

## Deep Curriculum Review: Layer 1 Roadmap Reset

Reviewed the current curriculum against the user's Layer 1 goal: a junior AI engineer path for learners with intermediate Python, using project-based teaching, AI-guided hints, tests, debugging loops, and a portfolio-ready capstone.

### External Benchmark Summary

The benchmark pass covered current public course and repository patterns:

- Full Stack LLM Bootcamp: app-first LLM engineering, augmented LMs, UX, LLMOps, testing, deployment, and monitoring.
- Hugging Face Agents Course: onboarding, agent fundamentals, frameworks, real use cases, and final benchmarked project.
- Made With ML: production ML discipline through design, data, model work, testing, reproducibility, CI/CD, and monitoring.
- OpenAI eval guidance: eval-driven development, task-specific tests, logging, automated checks, and human calibration.
- MCP docs: MCP as a practical tool/resource/workflow connection standard.
- Anthropic agent guidance: simple composable workflows before autonomous agents.
- GitHub references: LLM Zoomcamp, Microsoft GenAI/AI Agents for Beginners, LangChain/LangGraph course repos, and assistant-style project courses.

Detailed notes are in `docs/benchmark-research-2026-05-18.md`.

### Current Curriculum Critique

Strengths:

- Modules 0-2 are real learner artifacts with `workbench.py`, tests, hints, rubrics, and visible pedagogy.
- Stable folder paths are useful and should be preserved.
- FinAgent gives the curriculum a coherent product spine.
- The test-guided TODO style matches the user's desired "student writes code, AI guides" contract.

Gaps:

- Modules 3-6 still read like syllabus placeholders compared with Modules 0-2.
- Older later-module READMEs included stale bootcamp/platform scope and mojibake artifacts.
- The existing verification gate separated expected TODO failures from import failures, but did not yet require reference-behavior validation.
- FinAgent risked carrying too much weight as motivation, integration lab, production project, and final capstone all at once.

### Decisions

- Keep the existing module folders.
- Keep `workbench.py` as the learner-editable file contract.
- Keep FinAgent as the canonical capstone, scoped as an educational stock-market analysis assistant.
- Add smaller layer-proof projects before the capstone:
  - Tool-Using Research Assistant in Module 3
  - Document QA / RAG Support Desk in Module 4
  - Workflow Automation Agent in Module 4
  - Production Hardening Sprint in Module 5
- Treat finance as suitable for the capstone only with explicit non-advice, uncertainty, source-grounding, and safety boundaries.
- Park hosted learning-platform and full fintech SaaS scope outside Layer 1.

### Actions Taken

- Updated `ROADMAP.md` with the Layer 1 product contract, external benchmark findings, critical titles, hint ladder, layer-proof projects, and stronger capstone boundaries.
- Updated `SPEC.md` with Layer 1 non-negotiables, named lesson rituals, AI guidance ladder, reference validation, evaluation progression, and capstone grading split.
- Replaced stale Module 3-6 READMEs with clean Layer 1 module overviews aligned to the canonical plan.
- Replaced `curriculum-planning/README.md` with a current planning index.
- Added `docs/benchmark-research-2026-05-18.md`.

### Next Implementation Order

1. Add Module 2 Week 4 transformer vertical slice to complete the current first-principles sequence.
2. Add Module 3 Week 1 tool-contract scaffold for the Tool-Using Research Assistant.
3. Add Module 4 Week 1 basic RAG scaffold for the Document QA / RAG Support Desk.
4. Add Module 5 Week 1 golden-dataset scaffold and reference-validation pattern.
5. Add Module 6 capstone kickoff scaffold with eval harness and portfolio rubric.

## Book Synthesis Merge Review

Reviewed `source-material/AI_Engineering_Curriculum_All_Phases.md`, a broad book-derived curriculum proposal covering core AI engineering, production AI, LLM engineering, and agentic AI.

### Findings

- The all-phases document is useful as a deduplicated knowledge map, but too broad to copy directly into the Layer 1 repo structure.
- Its strongest corrections are LLM API/PromptOps visibility, data engineering before RAG, and production model-selection/fine-tuning decision discipline.
- Its 27-module track plan would over-expand the junior curriculum and weaken the current workbench/test-guided pattern.
- Advanced GraphRAG, multimodal, deep fine-tuning, from-scratch GPT, enterprise platforms, and large multi-agent systems should be future-layer material.

### Actions Taken

- Updated `ROADMAP.md` with book synthesis findings, expanded critical titles, Layer 2/specialization routing, and revised module scopes.
- Updated `SPEC.md` with scope triage rules and the new Layer 1 requirements for API wrappers, PromptOps, data engineering before RAG, and fine-tuning as optional.
- Updated Module 3 README to include LLM API Playground and Prompt Engineering Test Suite before tool/MCP work.
- Updated Module 4 README to start with AI-ready data pipelines before RAG and agents.
- Updated Module 5 README to add model-selection/adaptation decisions and keep fine-tuning optional.
- Updated Module 6 README with the minimum job-ready portfolio path and model-selection reasoning.
- Added `docs/book-synthesis-merge-2026-05-18.md`.

### Revised Next Implementation Order

1. Add Module 2 Week 4 transformer vertical slice.
2. Add Module 3 Week 1 LLM API Playground scaffold with token/cost logging, retries, prompt template tests, and structured-output validation.
3. Add Module 3 Week 2 tool-contract scaffold for the Tool-Using Research Assistant.
4. Add Module 4 Week 1 AI-ready data pipeline scaffold.
5. Add Module 4 Week 2 RAG support desk scaffold with citation/abstention tests.
6. Add Module 5 Week 1 golden-dataset/eval scaffold and reference-validation pattern.
7. Add Module 6 capstone kickoff scaffold with eval harness, trace sample, and portfolio rubric.

## Specs Folder Consolidation

Merged the remaining top-level specs into `curriculum-planning/` so `.kiro/specs` has one active planning folder.

### Extraction Findings

- `ai-engineering-curriculum-implementation/` contributed module requirements, diagnostic entry points, daily rhythm, checkpoints, portfolio/review ideas, and future hosted-platform concepts.
- `ai-engineering-curriculum-implementation/capstone-financial/` contributed the FinAgent module-to-capstone mapping, financial data/tool/RAG/agent/production requirements, and portfolio-ready assessment shape.
- `_legacy/teaching-methodology-evaluation/` contributed whole-part-whole, cognitive apprenticeship, Socratic discovery, progress visibility, content/delivery separation, and interview-prep integration.
- `_legacy/capstone-pedagogical-enhancement/` contributed code-comprehension-first tasks, explain-your-solution milestones, professional workflow practice, scaffolding progression, and capstone rubric validation.
- `_legacy/web-scraping-curriculum/` contributed progressive scraping projects, ethical data-collection requirements, TODO boilerplate, architecture prompts, and success criteria.

### Actions Taken

- Added `docs/source-extraction-2026-05-18.md` as the explicit extraction ledger.
- Added `source-material/` as the traceability home for old source inputs.
- Updated `ROADMAP.md`, `SPEC.md`, `README.md`, `docs/README.md`, and `future/platform-notes.md` so old root folders are no longer active references.
- Removed the old root-level planning folders from `.kiro/specs`; source material now lives under `curriculum-planning/source-material/`.

### Standing Rule

Future planning changes should update the canonical roadmap/spec instead of creating new root-level spec folders.

## Authoring-System Pass

Implemented the small authoring-system pass requested after the BMAD review.

### Added

- `curriculum/AI_AUTHORING_GUIDE.md` as the global AI workflow for curriculum changes.
- `curriculum/templates/lesson-quality-checklist.md` as the required checklist for new lesson `AUTHORING_PLAN.md` files.
- `curriculum/templates/module-ai-guide-template.md` for future module-level guides.
- Module-level `AI_AUTHORING_GUIDE.md` files for:
  - `00-python-foundations`
  - `01-module-1-whole-game`
  - `02-module-2-first-principles`
  - `03-module-3-mcp-integration`
  - `04-module-4-agentic-workflows`
  - `05-module-5-production`
  - `06-capstone-projects`
  - `specializations/web-scraping`

### Updated

- `SPEC.md` now defines the authoring system and requires a filled lesson authoring plan before implementation begins.
- `ROADMAP.md` now lists AI authoring guides and the lesson-quality checklist as part of Release 1/Release 2 readiness.
- Planning indexes now point implementation agents to the new guide and checklist.
- Curriculum templates now use `workbench.py` and `python -m pytest`.

### Applied To Next Concrete Slice

Created `curriculum/02-module-2-first-principles/week-04-transformer/AUTHORING_PLAN.md` from the checklist.

Created reviewer-only intended behavior notes at `implementation-notes/module-2-week-4-reference.md`.

The Week 4 plan keeps the transformer lesson as a small plain-Python forward-pass slice: embeddings, projections, self-attention, residual addition, layer normalization, feed-forward output, and trace metadata. It explicitly excludes GPUs, PyTorch, transformer libraries, LLM API calls, and full GPT training.

### Next Implementation Step

Build Module 2 Week 4 learner files from the authoring plan:

1. `README.md`
2. `workbench.py`
3. `tests/test_tiny_transformer.py`
4. `hints.md`
5. `rubric.md`

Verification should first prove clean collection/imports, then confirm expected learner TODO failures, then validate reference behavior outside the learner-facing folder.

## Pedagogy Enforcement Update

Strengthened the planning files so engaging teaching methodology is enforced across every module, not just recommended.

### Updated

- `SPEC.md` now has a Pedagogy Enforcement Standard that blocks lesson completion unless learner-facing files show the teaching method.
- `ROADMAP.md` authoring gates now require the README and module guides to prove the visible pedagogy loop.
- `curriculum/AI_AUTHORING_GUIDE.md` now requires teaching-delivery decisions in the lesson `AUTHORING_PLAN.md`.
- `curriculum/templates/lesson-quality-checklist.md` now checks engaging problem frame, action before lecture, concept after context, feedback literacy, and learner-facing tone.
- `curriculum/templates/lesson-template.md` now includes Story or Failure, Before You Run, Evidence First, expected failure interpretation, and transfer reflection sections.
- Every module-level `AI_AUTHORING_GUIDE.md` now has module-specific Pedagogy Enforcement rules.

### Enforcement Rule

Future lessons are incomplete until they visibly include:

1. engaging problem frame
2. action before lecture
3. Socratic prediction
4. worked trace
5. Evidence First debugging
6. Smallest Change guidance
7. progressive hints
8. expected failure interpretation
9. transfer reflection

## Cafe, Visual, and Resource Update

The authoring system now requires cafe-style storytelling, useful diagrams or mind maps, and optional visual/video support across the global guide, templates, planning specs, and every module-local AI guide.

The new `curriculum/resources/curated-learning-resources.md` file provides seed books, courses, docs, and high-trust visual resources. Lesson authors must still perform a fresh web search for one current, topic-specific video or visual explainer before publishing, then include it only as optional support after the core hands-on path.

## Pedagogy Methodology Research Merge

Merged the cleaned pedagogy research into the active planning contract so future lesson work uses evidence-informed method selection instead of one generic teaching shape.

### Source Files

- `docs/pedagogy-methodologies-research.md`: cleaned, repo-focused synthesis.
- `docs/pedagogy-research-research-report.md`: broader comparative report retained for reference.

### Updated

- `SPEC.md` now requires backward design, project-based learning, test-driven learning, review-based learning, UDL, and topic-aware method selection.
- `SPEC.md` now maps requirements, architecture, testing, maintenance, DevOps, teamwork, ethics, and AI reliability topics to preferred pedagogy mixes and learner evidence.
- `SPEC.md` now requires project evidence portfolios and expanded FinAgent capstone rubric dimensions.
- `ROADMAP.md` now records the pedagogy research files in the source map and adds an evidence-informed teaching stack.
- `ROADMAP.md` now requires authoring plans to name the chosen pedagogy mix and modules to use topic-to-method routing.
- `.kiro/specs/README.md`, `curriculum-planning/README.md`, and `docs/README.md` now point future agents to the pedagogy research files.

### Practical Rule

For new lessons, choose the teaching method by the target skill:

- requirements, architecture, and ethics use case discussion, critique, and tradeoff writing
- testing, DevOps, and AI reliability use tests, CI, evals, and evidence-first debugging
- maintenance and teamwork use code review, PR-style summaries, retrospectives, and mentorship patterns
- capstone work uses portfolio evidence: technical artifacts, process evidence, explanation, and reflection

## First Three Modules Pedagogy Pass

Started applying the updated pedagogy contract to the learner-facing first three modules.

### Updated Module 0

- Added `curriculum/00-python-foundations/concept-review-map.md` so Python refresher work points learners to concept review and best-practice references instead of final answers.
- Reframed Week 01 as a FinAgent intake mini-project rather than a generic Python essentials worksheet.
- Updated Module 0 README, Week 01, Week 02, Week 03, `CONNECTIONS.md`, and `AI_AUTHORING_GUIDE.md` to route stuck learners through concept review, review notes, focused tests, and personal implementation.

### Updated Module 1

- Updated `curriculum/01-module-1-whole-game/README.md` and `AI_AUTHORING_GUIDE.md` with whole-part-whole, test-driven, product-trace, and PR-style evidence expectations.
- Added learner evidence artifacts for each week: trace note, PR-style summary, and boundary note.

### Updated Module 2

- Updated `curriculum/02-module-2-first-principles/README.md` and `AI_AUTHORING_GUIDE.md` with first-principles worked traces, tiny visual mechanisms, intermediate-value inspection, and model-decision reflection.
- Added expectation that each week distinguishes what the toy implementation proves from what real production models still require.

### Verification

Ran:

```powershell
python -m pytest --collect-only curriculum/00-python-foundations curriculum/01-module-1-whole-game curriculum/02-module-2-first-principles -q
```

Result: `179 tests collected` with no import or collection failures. Behavior tests are still expected to fail until learners complete TODOs.

## Module 1-3 Naming and Clarity Pass

Reviewed the created and modified curriculum modules with the BMAD party-mode lens for product clarity, technical-writing consistency, and test-path clarity.

### Updated Module 1

- Added a top-level "what will I build / what skill will I practice / how does this prepare me" table to `curriculum/01-module-1-whole-game/README.md`.
- Aligned Phase 2 and Phase 3 learner wording so docs refer to phases consistently instead of mixing week labels into the learning story.
- Renamed Phase 2 hints and rubric headings to match the learner-facing title: `FinAgent Risk Signal Extension`.

### Updated Module 2

- Renamed the module title to `Module 2: First-Principles AI Mechanisms` with the subtitle `Understand, Test, And Improve Model Behavior`.
- Added previous/current/next bridge text and a module-level outcome table.
- Replaced the module learning-path table with a stable folder map that includes learner-facing phase titles and repo-root verification commands.
- Updated Phase 1-3 READMEs with folder/file/test metadata, success states, and evidence artifacts.
- Aligned hints, rubrics, workbench docstrings, and the Phase 4 authoring plan with the descriptive phase naming convention.

### Updated Module 3

- Renamed the module title to `Module 3: Connect AI To Tools With MCP` with a clearer boundary-focused subtitle.
- Added previous/current/next bridge text and a module-level outcome table.
- Replaced generic learning-path wording with a folder map and learner-facing phase titles:
  - Phase 1 - LLM Provider Boundary Lab
  - Phase 2 - Local Tool Server Contract Lab
  - Phase 3 - Structured Context And Trace Lab
  - Phase 4 - Secure MCP And Agent Handoff Lab
- Created starter `README.md`, `hints.md`, and `rubric.md` files in all four Module 3 phase folders so empty scaffold folders now have clear learner intent, success states, evidence artifacts, and terminology.
- Updated the Module 3 AI authoring guide with phase titles and a consistent MCP terminology contract.

### Verification

Ran:

```powershell
python -m pytest --collect-only curriculum/01-module-1-whole-game curriculum/02-module-2-first-principles curriculum/03-module-3-mcp-integration -q
```

Result: `46 tests collected` with no import or collection failures. Module 3 currently has starter docs only; its learner workbench/tests are still to be authored.

## Time Estimate Metadata Pass

Added explicit expected completion time near the start of the learner-facing module and phase files.

### Updated

- Module 1, Module 2, and Module 3 READMEs now include total expected time near the top metadata block.
- Module 1 Phase 1-3 READMEs now include expected time to finish.
- Module 2 Phase 1-3 READMEs and workbench docstrings now include expected time to finish.
- Module 1 Phase 1-3 workbench docstrings now include expected time to finish.
- Module 2 Phase 4 authoring plan now includes expected time to finish.
- Module 3 Phase 1-4 starter READMEs now include expected time to finish.
- Module 1-3 AI authoring guides now require future lessons to include expected time near the top of the README and learner-editable workbench file.

### Verification

Ran:

```powershell
rg -n "Expected time to finish" curriculum/01-module-1-whole-game curriculum/02-module-2-first-principles curriculum/03-module-3-mcp-integration
python -m pytest --collect-only curriculum/01-module-1-whole-game curriculum/02-module-2-first-principles curriculum/03-module-3-mcp-integration -q
```

Result: expected-time markers were found across the targeted READMEs/workbenches, and `46 tests collected` with no import or collection failures.

## Final Book-Corpus Scope Review

Reviewed the active planning docs against:

- `AI_Engineering_Books.md`
- `books_encyclopedia_outline_source_map.md`
- `master_ai_engineering_rag_corpus/`
- BMAD-style product, pedagogy, and technical-architecture review perspectives

### Findings

- The current Layer 1 roadmap is directionally strong and can be conclusive for junior AI engineers if it stays focused on practical LLM/RAG/tool/agent system building.
- The book and RAG corpus are broader than Layer 1. They include material for at least three courses: junior AI engineering, a machine/deep-learning bridge, and advanced production AI engineering.
- The biggest risk is not missing coverage; it is advanced-topic sprawl from GPT-from-scratch, LoRA/QLoRA implementation, GraphRAG, multimodal/diffusion, production ML retraining, and large multi-agent systems.
- Module 3 and Module 4 need the sharpest guardrails: Module 3 should stay API, PromptOps, structured outputs, tool calling, and MCP boundaries; Module 4 should stay data-before-RAG, retrieval quality, web data, citations, and bounded workflows.
- Module 5 must be the proof that Layer 1 is not toy prompting: golden evals, prompt/RAG regression checks, citation checks, logs, cost/rate-limit awareness, safety boundaries, and basic release readiness.
- FinAgent should appear as a staged product arc in every module, not as a separate final assignment.
- The pedagogy contract is already strong, but planning now needs every module to state expected time, new concepts, deferred concepts, maximum new tools/APIs, required visuals, optional resource policy, and checkpoint evidence before implementation continues.

### Actions Taken

- Added a Layer 1 exit standard to `ROADMAP.md`, `SPEC.md`, and the planning index.
- Added a three-course ladder:
  - Course 1: Junior AI Engineering With Python
  - Course 2: Machine Learning, Deep Learning, and Neural Network Foundations
  - Course 3: Advanced Production AI Engineering
- Added a source-level routing matrix that maps book/corpus clusters to Layer 1 core, Layer 1 preview, and later-course depth.
- Added a FinAgent product-arc table showing the learner artifact from Modules 0-6.
- Added module pacing guardrails with core time budgets, optional enrichment caps, and scope-pressure warnings.
- Strengthened `SPEC.md` so authoring plans must record source-level routing, time budget, visual requirements, optional resource plans, maximum new tools/APIs, and FinAgent increment.
- Added a module implementation-readiness checklist requiring outcomes, artifact, lesson list, hours, assessment, visuals, source references, deferred concepts, and out-of-scope notes.

### Standing Rule

Before adding a book-derived concept to Layer 1, classify it:

`Layer 1 core` / `Layer 1 preview` / `Course 2 bridge` / `Course 3 advanced` / `Specialization` / `Parked`

If the concept does not fit the module time budget and exit standard, it becomes a preview, optional enrichment, later-course topic, specialization, or parked platform note.

### Next Implementation Order

1. Update each module README or module `AI_AUTHORING_GUIDE.md` with the new readiness metadata: expected hours, new concepts, deferred concepts, maximum tools/APIs, visuals, source routing, assessment checkpoint, and FinAgent increment.
2. Bring Module 3 from starter docs to learner-ready parity with Modules 0-2: workbench, tests, hints, rubric, and reviewer-only reference behavior.
3. Continue Module 4 only after its data-before-RAG boundary and source-grounding gates are explicit.

## Web Data Acquisition and Spec Cleanup Pass

Reviewed the modified curriculum against `AI_Engineering_Books.md`, the existing book/corpus routing rules, and a BMAD party-mode round focused on curriculum architecture, product scope, and quality gates.

### Decisions

- Web scraping is no longer framed as optional-only. The active plan now requires a bounded mini-course named **Web Data Acquisition for AI Systems**.
- The stable learner folder remains `curriculum/specializations/web-scraping` to avoid churn, but its core slice is mandatory before learners use web-collected data for RAG, tools, agents, or FinAgent evidence.
- The deeper scraping path remains an extension: Playwright-heavy dynamic pages, sessions/forms, scheduled crawling, crawl queues, monitoring, and agentic web research.
- Course 1 remains **Junior AI Engineering With Python**. The book/corpus encyclopedia still feeds later courses and specializations, not unchecked Layer 1 expansion.

### Actions Taken

- Updated `ROADMAP.md` with the mandatory web data acquisition mini-course, required labs, mini-project deliverables, extension path, FinAgent contribution, and quality gate.
- Updated `SPEC.md` with web data acquisition non-negotiables, mini-course acceptance criteria, project evidence requirements, and the stable learner folder decision.
- Added `implementation-notes/spec-consolidation-2026-05-20.md` as the current source-disposition and cleanup map.
- Added an alignment note to `AI_Engineering_Books.md` explaining how the broad web scraping requirement maps to the active bounded mini-course plus extension.
- Moved old root-level spec folders into `source-material/legacy-specs/` so `.kiro/specs` keeps one active planning home.
- Updated `.kiro/specs/README.md`, `curriculum-planning/README.md`, and `docs/README.md` so future work points at the canonical roadmap/spec and does not recreate competing root specs.

### Current Web Data Acquisition Gate

The required mini-course must produce inspectable evidence:

- fixture tests before live requests
- robots.txt, terms, copyright, privacy, PII, attribution, and rate-limit review
- API-first collection where available
- retries, timeouts, pagination, deduplication, and URL normalization
- source URL, timestamp, heading, and provenance metadata
- raw, clean, processed, and RAG-ready layers
- broken-selector, missing-field, malformed-HTML, duplicate-page, stale-data, and failed-request tests
- data-quality report, cleaned dataset sample, RAG-ready chunk output, and short ethical reflection

### Cleanup Result

The root of `.kiro/specs` should contain only:

- `README.md`
- `curriculum-planning/`

Old source inputs now live under `curriculum-planning/source-material/legacy-specs/` for traceability.

## Implementation Update: Module 2 Week 4

Added the next learner-facing chapter:

- `curriculum/02-module-2-first-principles/week-04-transformer/README.md`
- `curriculum/02-module-2-first-principles/week-04-transformer/workbench.py`
- `curriculum/02-module-2-first-principles/week-04-transformer/tests/test_tiny_transformer.py`
- `curriculum/02-module-2-first-principles/week-04-transformer/hints.md`
- `curriculum/02-module-2-first-principles/week-04-transformer/rubric.md`

The chapter keeps the transformer lesson as a small plain-Python forward-pass slice: embedding lookup, projections, self-attention, residual addition, layer normalization, feed-forward output, and trace metadata. It explicitly avoids GPUs, PyTorch, transformer libraries, LLM API calls, and full GPT training.

Updated the Module 2 README so Phase 4 is listed as a runnable learner lab instead of a plan-only slice.

Verification:

- `python -m pytest --collect-only curriculum/02-module-2-first-principles/week-04-transformer/tests -q`
- Result: collection succeeds.
- `python -m pytest curriculum/02-module-2-first-principles/week-04-transformer/tests -v`
- Result: expected learner-workbench failures because Phase 4 `workbench.py` starts incomplete by design.

Revised next implementation order:

1. Update each module README or module `AI_AUTHORING_GUIDE.md` with the new readiness metadata: expected hours, new concepts, deferred concepts, maximum tools/APIs, visuals, source routing, assessment checkpoint, and FinAgent increment.
2. Bring Module 3 from starter docs to learner-ready parity with Modules 0-2: workbench, tests, hints, rubric, and reviewer-only reference behavior.
3. Continue Module 4 only after its data-before-RAG boundary and source-grounding gates are explicit.

## Documentation And Teaching-Contract Correction Pass

Applied the review findings from the first four curriculum folders.

### Updated Module 0

- Cleaned the Week 00 diagnostic language from old day-based wording to the current Week 00 refresher path.
- Replaced the misleading `unique_elements` partial answer with an explicit learner TODO so the diagnostic remains learner-authored.
- Removed the stale `solution_template` import-cache eviction from the diagnostic `conftest.py`.
- Replaced stale Week N cross-references in Week 01, Week 02, and the optional AI-client simulator with module-purpose language.

### Updated Module 2

- Clarified that only Phases 1-4 are learner-ready now.
- Removed planned Phase 5-6 concepts from the Module 3 checkpoint gate.
- Reframed the handoff around tokenization, embeddings, attention, transformer shapes, and model-boundary decisions.

### Updated Module 3

- Narrowed the LLM Provider Boundary Lab promise to the behavior currently scaffolded and tested: message validation, provider boundary, prompt template, token estimate, and cost estimate.
- Moved timeout, retry, rate-limit, and streaming language into follow-up reliability framing instead of presenting it as current Phase 1 scope.

### Verification

Ran per-module collection with `PYTEST_DISABLE_PLUGIN_AUTOLOAD=1`:

- `curriculum/00-python-foundations`: `133 tests collected`
- `curriculum/01-module-1-whole-game`: `15 tests collected`
- `curriculum/02-module-2-first-principles`: `44 tests collected`
- `curriculum/03-module-3-mcp-integration`: `21 tests collected`

All four collection checks completed without import or collection failures. Behavior tests remain learner TODO gates by design.

## Implementation Update: Module 4 Week 1

Added the first learner-facing Module 4 chapter:

- `curriculum/04-module-4-agentic-workflows/week-01-basic-rag/README.md`
- `curriculum/04-module-4-agentic-workflows/week-01-basic-rag/workbench.py`
- `curriculum/04-module-4-agentic-workflows/week-01-basic-rag/tests/test_ai_ready_pipeline.py`
- `curriculum/04-module-4-agentic-workflows/week-01-basic-rag/hints.md`
- `curriculum/04-module-4-agentic-workflows/week-01-basic-rag/rubric.md`
- `implementation-notes/module-4-week-01-ai-ready-pipeline-reference.md`

The chapter keeps Week 1 as an AI-ready data pipeline slice before retrieval: fixture records, text cleanup, metadata normalization, failed-record reporting, chunk-ready output, and a run report. It explicitly avoids embeddings, vector databases, live web scraping, LLM calls, LangChain, LangGraph, and agent loops.

Updated the Module 4 README and AI authoring guide with expected-time metadata, phase titles, a repo-root verification command for Phase 1, and the narrower Phase 1 guardrail.

Verification:

- `python -m pytest curriculum/04-module-4-agentic-workflows/week-01-basic-rag/tests -q`
- Result: tests collect and run, then fail as expected because Phase 1 `workbench.py` starts incomplete by design.

Revised next implementation order:

1. Add Module 4 Phase 2 citation/abstention RAG scaffold over the Phase 1 clean chunks.
2. Add Module 5 Week 1 golden-dataset/eval scaffold before the capstone.
3. Add Module 6 capstone kickoff scaffold with eval harness, trace sample, and portfolio rubric.

## Implementation Update: Web Data Bridge, Module 4 Phase 2, Module 5 Week 1, Module 6 Kickoff

Added the required Web Data Acquisition bridge as a mandatory core slice, not a renamed core module:

- `curriculum/specializations/web-scraping/core-lab-01-http-inspection/README.md`
- `curriculum/specializations/web-scraping/core-lab-01-http-inspection/workbench.py`
- `curriculum/specializations/web-scraping/core-lab-01-http-inspection/tests/test_http_inspection.py`
- `curriculum/specializations/web-scraping/core-lab-01-http-inspection/hints.md`
- `curriculum/specializations/web-scraping/core-lab-01-http-inspection/rubric.md`
- `curriculum/specializations/web-scraping/core-lab-01-http-inspection/AUTHORING_PLAN.md`
- `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/README.md`
- `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/workbench.py`
- `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/tests/test_static_extraction.py`
- `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/fixtures/market_notes.html`
- `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/hints.md`
- `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/rubric.md`
- `curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/AUTHORING_PLAN.md`
- `implementation-notes/web-data-core-labs-1-2-reference.md`

Added Module 4 Phase 2 as the first RAG scaffold that consumes provenance-preserving bridge/Phase 1 outputs:

- `curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/README.md`
- `curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/workbench.py`
- `curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/tests/test_citation_abstention_rag.py`
- `curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/hints.md`
- `curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/rubric.md`
- `curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/AUTHORING_PLAN.md`
- `implementation-notes/module-4-week-02-citation-abstention-rag-reference.md`

Added Module 5 Week 1 as the production bridge from RAG behavior to golden eval evidence:

- `curriculum/05-module-5-production/week-01-golden-datasets/README.md`
- `curriculum/05-module-5-production/week-01-golden-datasets/workbench.py`
- `curriculum/05-module-5-production/week-01-golden-datasets/tests/test_golden_eval_scaffold.py`
- `curriculum/05-module-5-production/week-01-golden-datasets/hints.md`
- `curriculum/05-module-5-production/week-01-golden-datasets/rubric.md`
- `curriculum/05-module-5-production/week-01-golden-datasets/AUTHORING_PLAN.md`
- `implementation-notes/module-5-week-01-golden-eval-reference.md`

Added Module 6 Week 1 kickoff as the capstone scope, eval harness, and portfolio evidence ledger:

- `curriculum/06-capstone-projects/week-01-build/README.md`
- `curriculum/06-capstone-projects/week-01-build/workbench.py`
- `curriculum/06-capstone-projects/week-01-build/tests/test_capstone_kickoff.py`
- `curriculum/06-capstone-projects/week-01-build/hints.md`
- `curriculum/06-capstone-projects/week-01-build/rubric.md`
- `curriculum/06-capstone-projects/week-01-build/AUTHORING_PLAN.md`
- `implementation-notes/module-6-week-01-capstone-kickoff-reference.md`

Updated the root README and Module 4-6/web data README files with learner-ready status tables, repo-root verification commands, expected time, visual maps, and optional high-trust references.

Verification:

- `python -m pytest curriculum/specializations/web-scraping/core-lab-01-http-inspection/tests curriculum/specializations/web-scraping/core-lab-02-fixture-static-extraction/tests curriculum/04-module-4-agentic-workflows/week-02-advanced-rag/tests curriculum/05-module-5-production/week-01-golden-datasets/tests curriculum/06-capstone-projects/week-01-build/tests --collect-only -q`
- Result: 21 tests collected. Learner-start runs are expected to fail until TODOs are completed.

Revised next implementation order:

1. Add Web Data Core Lab 3 API-first collection so the bridge covers stable JSON endpoints before pagination.
2. Add Module 4 Phase 3 explicit workflow pattern lab after citation/abstention behavior is in place.
3. Add Module 5 Week 2 CI-style regression gate over the golden eval scaffold.
4. Add Module 6 Week 2 polish scaffold with demo, limitation note, release evidence, and interview defense.
