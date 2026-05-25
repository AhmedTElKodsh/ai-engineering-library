# Curriculum Planning Index

This folder holds the canonical planning contract for the AI Engineering Library curriculum.

## Source Of Truth

- `ROADMAP.md`: learner journey, critical titles, module sequence, layer-proof projects, and capstone plan
- `SPEC.md`: authoring rules, pedagogy, file layout, testing expectations, and capstone quality criteria
- `CURRICULUM_REVIEW.md`: implementation ledger and review findings
- `implementation-notes/spec-consolidation-2026-05-20.md`: current source-disposition and cleanup map
- `future/platform-notes.md`: hosted platform ideas that are out of the Layer 1 curriculum MVP
- `docs/pedagogy-methodologies-research.md`: current evidence-informed teaching method map for software engineering lessons
- `docs/pedagogy-research-research-report.md`: broader comparative pedagogy report retained as supporting research
- `docs/source-extraction-2026-05-18.md`: extraction ledger for the old top-level spec folders
- `source-material/legacy-specs/`: preserved old root spec inputs; useful ideas are merged into the active roadmap/spec, not treated as competing plans
- `../../../curriculum/AI_AUTHORING_GUIDE.md`: global AI authoring workflow for curriculum changes
- `../../../curriculum/templates/lesson-quality-checklist.md`: checklist used to create lesson `AUTHORING_PLAN.md` files before implementation
- `../../../curriculum/resources/curated-learning-resources.md`: seed map for optional video, visual, book, course, and documentation references; lesson authors still refresh topic-specific videos with a fresh web search

## Folder Layout

- `docs/`: research notes, merge summaries, source-extraction ledgers, and historical planning context
- `future/`: parked platform and later-layer ideas
- `guides/`: older diagnostic/support guides retained for reference while learner-facing versions live under `curriculum/`
- `implementation-notes/`: reviewer-only intended behavior and reference notes
- `source-material/legacy-specs/`: archived inputs moved from old root-level `.kiro/specs` folders

## Layer 1 Direction

Layer 1 is for junior AI engineers with intermediate Python. The curriculum should teach them to build reliable AI features, agents, and apps with Python through tested mini-projects and one evaluated portfolio capstone.

Layer 1's exit standard is now explicit: learners should be able to design, build, test, evaluate, and explain a small production-shaped AI assistant using LLM APIs, structured prompts, tools, retrieval, basic agent workflows, safety boundaries, and reliability practices.

The broader book and RAG corpus supports three levels:

- **Course 1:** Junior AI Engineering With Python. Active now.
- **Mini-course:** Web Data Acquisition for AI Systems. Mandatory bounded bridge for Course 1; deeper scraping remains an extension.
- **Course 2:** Machine Learning, Deep Learning, and Neural Network Foundations. Recommended bridge for tensors, training loops, neural networks, optimization, and deeper model intuition.
- **Course 3:** Advanced Production AI Engineering. Later course for fine-tuning, GraphRAG, multimodal, advanced agents, LLMOps at scale, production ML systems, and governance depth.

When reviewing book-derived topics, classify them as Layer 1 core, Layer 1 preview, Course 2 bridge, Course 3 advanced, specialization, or parked before adding them to a lesson.

The stable module folders remain:

- `curriculum/00-python-foundations`
- `curriculum/01-module-1-whole-game`
- `curriculum/02-module-2-first-principles`
- `curriculum/03-module-3-mcp-integration`
- `curriculum/04-module-4-agentic-workflows`
- `curriculum/05-module-5-production`
- `curriculum/06-capstone-projects`
- `curriculum/specializations/web-scraping`

`curriculum/specializations/web-scraping` is the stable folder for the mandatory web data acquisition mini-course plus optional extension work. The required slice is bounded to fixture-first extraction, API-first collection, ethical review, provenance, validation, and RAG-ready packaging.

## Planning Rules

- Do not create another competing roadmap.
- Keep learner content in `curriculum/`.
- Keep planning and reviewer-only reference notes in `.kiro/specs/curriculum-planning/`.
- Keep old source specs under `source-material/`; do not recreate root-level spec folders.
- Do not recreate old root spec folders such as `ai-engineering-curriculum-implementation`, `capstone-pedagogical-enhancement`, `teaching-methodology-evaluation`, or `web-scraping-curriculum`.
- Preserve stable folder names unless a migration is explicitly approved.
- Use `workbench.py` for learner-editable code.
- Treat README-only later modules as unfinished until they have workbenches, tests, hints, and rubrics.
- Before building a new lesson, fill a lesson-level `AUTHORING_PLAN.md` from `curriculum/templates/lesson-quality-checklist.md`.
- Use each module's `AI_AUTHORING_GUIDE.md` for local constraints before editing lesson files.
- Choose the pedagogy mix by topic: use cases and critique for requirements/design/ethics, tests and CI for quality/DevOps, review and mentorship for maintenance/teamwork, and eval evidence for AI reliability.
- Larger projects must produce a portfolio of technical evidence, process evidence, explanation evidence, and reflection evidence.
- Enforce cafe-style storytelling, useful visuals or mind maps, optional fresh video/resource search, and optional high-trust book/course references in every module.
- Keep time budgets visible: each module or local authoring guide needs estimated core hours, optional enrichment cap, new concepts, deferred concepts, maximum new tools/APIs, required visuals, and checkpoint evidence.
- Keep FinAgent as a staged product arc across Modules 0-6 rather than an extra final project.
- Keep web data acquisition mandatory but bounded: 5-6 core labs and one portfolio mini-project, with browser automation and larger crawling parked in the extension path unless explicitly promoted later.

## Capstone Decision

FinAgent remains the canonical capstone, scoped as an educational stock-market analysis assistant. It should explain public market information with source grounding, uncertainty, evals, and safety boundaries. It must not become an investment-advice product or full fintech SaaS in Layer 1.

## Book Synthesis Decision

The all-phases book synthesis improves the current roadmap by adding:

- LLM API wrappers, PromptOps, structured outputs, and injection tests before agents
- data engineering and metadata quality before RAG
- model-selection and fine-tuning decision logic before capstone work
- future-layer parking for advanced GraphRAG, multimodal, deep fine-tuning, from-scratch GPT, and enterprise platform topics

The private RAG corpus is a coverage and retrieval aid, not a license to expand Layer 1 into the whole encyclopedia. Use it to strengthen lesson accuracy, source mapping, visual ideas, and optional references while preserving the Layer 1 exit standard.
