# Curriculum Authoring Spec

## Scope

This spec governs the text-based AI engineering curriculum in `curriculum/`. It converts the reviewed `.kiro/specs` into one practical authoring contract.

The curriculum is not a direct code-filling system. It is a guided learning environment where students read, reason, write code, run tests, and improve their implementation.

Use `ROADMAP.md` as the canonical learner journey. Historical planning files are preserved under `source-material/legacy-specs/` and are not competing specs unless a future change is merged into the roadmap.

Layer 1 targets junior AI engineers with intermediate Python. It must finish the stable path from Python foundations through one evaluated portfolio capstone before adding a hosted platform or senior-level expansion.

Layer 1's exit standard is practical and bounded: learners can design, build, test, evaluate, and explain a small production-shaped AI assistant using LLM APIs, structured prompts, tools, retrieval, basic agent workflows, safety boundaries, and reliability practices.

The broader source library supports three courses, not one overloaded course:

- **Course 1:** Junior AI Engineering With Python. This is the active Layer 1 curriculum.
- **Course 2:** Machine Learning, Deep Learning, and Neural Network Foundations. This is the recommended bridge for tensors, training loops, neural networks, optimization, and deeper model intuition.
- **Course 3:** Advanced Production AI Engineering. This is for fine-tuning, GraphRAG, multimodal systems, advanced agents, LLMOps at scale, production ML systems, and governance depth.

When source material from the books or private RAG corpus belongs to Course 2 or Course 3, preserve it as a preview, later-course note, or instructor reference. Do not quietly expand a Layer 1 lesson to teach the later-course implementation.

## Non-Goals

- Do not build the web learning platform as part of the curriculum MVP.
- Do not replace student work with complete AI-generated answers.
- Do not require paid APIs for the first successful learning path.
- Do not delete or mass-move existing curriculum content in the first pass.
- Do not leave Modules 3-6 as README-only syllabus placeholders when calling Layer 1 complete.
- Do not turn FinAgent into a trading bot, investment advisor, or full fintech SaaS.

## Layer 1 Non-Negotiables

- Stable module folder paths remain unchanged unless a migration is explicitly planned.
- Every learner-facing lesson uses `workbench.py` as the primary editable file.
- Modules 3-6 must reach parity with Modules 0-2: README, workbench, tests, hints, rubric, and checkpoint gate.
- Learners write meaningful code themselves.
- AI assistance guides, debugs, reviews, and explains; it does not fill complete learner solutions by default.
- FinAgent is the canonical capstone spine.
- Smaller layer-proof projects must demonstrate transfer before the final capstone.
- Production lessons must include evals, testing, monitoring/logging, deployment boundaries, secrets hygiene, safety, cost, and latency.
- LLM API use, PromptOps, structured outputs, token/cost logs, and injection tests must be taught before agents.
- Data loading, cleaning, metadata, quality checks, and failed-record handling must be taught before production RAG.
- Web data acquisition is mandatory as a bounded mini-course before learners use web-collected data for RAG, tools, agents, or the FinAgent capstone.
- Fine-tuning is a decision framework and optional lab in Layer 1, not a required path.
- Mojibake, stale platform copy, and unsupported marketing claims must be removed before a module is considered polished.

## Scope Triage Rules

Use the all-phases book synthesis, `AI_Engineering_Books.md`, `books_encyclopedia_outline_source_map.md`, and `master_ai_engineering_rag_corpus/` as concept sources, not as direct folder plans.

Classify each candidate topic as one of:

- **Layer 1 required:** a junior AI engineer needs it to build, test, debug, and explain practical LLM/RAG/tool/agent systems.
- **Layer 1 preview:** the learner should know what it is, when it matters, and why it is not required yet.
- **Course 2 bridge:** needed for the later ML, deep learning, and neural-network foundations course.
- **Course 3 advanced:** useful for intermediate production AI engineering after the core path and bridge course.
- **Specialization:** valuable for focused tracks such as deep fine-tuning, GraphRAG, multimodal, or enterprise platforms.
- **Parked:** too vendor-specific, too advanced, or not needed for the current curriculum promise.

Default routing:

- prompt engineering, structured outputs, LLM API wrappers, RAG fundamentals, tool schemas, evals, observability, and safety are Layer 1 required
- web data acquisition, API-first collection, ethical scraping, fixture-first parser tests, data provenance, and RAG-ready dataset packaging are Layer 1 required at mini-course depth
- ML foundations, data engineering, model selection, and governance basics are Layer 1 required at practical depth
- large-scale crawling, distributed scraping, browser automation at scale, scraping-monitoring platforms, tensors, backprop, training loops, optimization, and neural-network math are Course 2 bridge, Course 3 advanced, or specialization topics unless used as brief intuition
- fine-tuning implementation, GraphRAG, multimodal, deep model training, drift/retraining platforms, and large multi-agent systems are Course 3 advanced topics, specializations, or brief Layer 1 previews
- hosted learning-platform infrastructure remains parked

Layer 1 "understand" and "implement" are different promises. A lesson may ask learners to understand embeddings, transformers, fine-tuning, agents, LLMOps, or safety at a practical decision level without asking them to implement the advanced system.

Do not include advanced-topic drive-bys. If a topic is preview-only, give one clear sentence about why it matters, then point to the later course or optional deeper reference.

## Lesson Standard

Every lesson should use this structure:

1. Learning goal
2. Expected time to finish
3. Real-world AI engineering context
4. Story/problem hook in friendly cafe-style voice
5. Visual mental model, diagram, table, chart, or mind map when it clarifies the concept
6. Small working example or traceable scenario
7. Concept explanation
8. Learner task with TODOs
9. Hints in progressive layers
10. Tests and expected failure interpretation
11. Reflection prompts
12. Extension challenge
13. Optional video/course/book/docs links for learners who want another modality
14. FinAgent or practical AI engineering callback

Use clear text explanations. Visuals explain thinking; they are not decoration. Prefer architecture diagrams, data-flow diagrams, sequence diagrams, mental-model maps, decision trees, evaluation scorecards, and capstone maps when they clarify flow, state, architecture, or judgment.

## Recurring Lesson Ritual

Every learner-facing lesson should feel familiar even as the content gets harder:

1. Story hook: name the realistic problem or failure.
2. Concept brief: explain only what the learner needs next.
3. Intuition and visual model: draw or tabulate the smallest useful mental model.
4. Worked trace: read code, logs, tests, or data before writing.
5. Guided task: complete TODOs, one behavior at a time.
6. Test feedback: run tests early and interpret failures.
7. Debug lab: inspect one intentional failure mode.
8. Reflection: explain the design, limits, and transfer.
9. Capstone callback: connect the skill back to FinAgent or production AI engineering.

Use these named rituals repeatedly:

- **Before You Run:** the learner predicts output, failure, or behavior.
- **Evidence First:** debugging help starts from the error, failing test, log, or observed output.
- **Smallest Change:** the learner identifies the minimal useful edit before changing code.
- **Explain Like a Teammate:** the learner writes 2-4 sentences explaining the fix or design.
- **One Step Stronger:** after passing, the learner adds one small variation, edge case, or test.
- **Reference After Effort:** direct code appears only after trace, prediction, and an attempt, or when the learner explicitly asks for reference mode.

## Exercise Standard

Every exercise must include:

- a `README.md` with the task, context, and commands
- a learner-editable `workbench.py` with explicit `TODO` markers
- tests that import the workbench before the learner edits it
- failure messages that point to the concept being practiced
- optional `hints.md` with progressive hints
- no final solution in the learner-facing folder unless explicitly marked as reference-after-effort or instructor-only

Workbench code may return placeholders such as `None`, empty collections, or simple defaults when needed so the file imports cleanly. It should not contain hidden full answers.

## Authoring System

Use these files when creating or modifying learner-facing curriculum:

- `curriculum/AI_AUTHORING_GUIDE.md`: global AI authoring workflow and non-negotiables
- `curriculum/templates/lesson-quality-checklist.md`: checklist to copy into new lesson folders as `AUTHORING_PLAN.md`
- `curriculum/templates/lesson-template.md`: learner-facing README shape
- `curriculum/templates/exercise-template.md`: exercise file and command pattern
- `curriculum/templates/testing-checklist.md`: verification checklist
- `curriculum/templates/module-ai-guide-template.md`: starter for future module-level authoring guides
- `curriculum/<module>/AI_AUTHORING_GUIDE.md`: local module guardrails

Before writing lesson code, create or update the lesson `AUTHORING_PLAN.md` with concrete choices for:

- learner-facing goal
- primary concept
- secondary operational concern
- expected learner files
- planned tests and expected starting failures
- reference-validation path
- scope exclusions
- source-level routing decisions: Layer 1 core, preview, Course 2 bridge, Course 3 advanced, specialization, or parked
- time budget, optional enrichment cap, and maximum new tools/APIs
- required visual or diagram type
- optional video/course/book/docs link plan
- FinAgent increment or practical artifact
- verification commands

The authoring plan is not a substitute for the lesson. It is the small planning pass that prevents hidden scope creep and keeps pedagogy visible before implementation begins.

## AI Guidance Ladder

When a learner asks for help, respond using the lowest useful level of support:

1. Hint level 1: restate the goal and ask one focusing question.
2. Hint level 2: point to the relevant line, variable, test expectation, or edge case.
3. Hint level 3: give pseudocode or a step-by-step plan.
4. Hint level 4: explain the likely bug and how to verify the fix.
5. Reference mode: provide direct code only after the learner has attempted a solution or explicitly asks for the reference solution.

Reference-mode code must be labeled:

```text
Reference Solution - Review After Your Attempt
```

Then explain why it works, how to test it, and what tradeoff it makes.

## Pedagogy Rules

### Pedagogical Spine

Every learner-facing unit should make the teaching style visible. Use these methods deliberately:

- **Backward design:** define the evidence of learning before choosing readings, TODOs, tests, or projects.
- **Whole-part-whole:** show the complete workflow, practice one part, then reconnect it to the complete workflow.
- **Socratic prompting:** ask the learner to predict behavior before running or editing code.
- **Worked trace before independent work:** let the learner inspect a small example or test before creating new behavior.
- **Cognitive apprenticeship:** model the process, scaffold the first attempts, then reduce support.
- **Project-based learning:** anchor abstract concepts in real artifacts, not only explanation.
- **Test-driven learning:** use tests as specification, feedback, and professional habit.
- **Peer/code-review learning:** use PR-style explanation, critique, and revision where the lesson scope supports it.
- **Universal Design for Learning:** offer multiple useful representations when a concept benefits from text, table, diagram, trace, or optional external media.
- **Desirable difficulty:** tests should be challenging enough to require thinking, but narrow enough that the next step is discoverable.
- **Metacognition:** include reflection prompts about why the approach works, where it fails, and how it transfers.

### Evidence-Informed Method Selection

Use `docs/pedagogy-methodologies-research.md` as the current evidence map for choosing teaching methods. Do not treat every method as equally useful for every topic.

Default method mapping:

| Topic area | Preferred teaching mix | Required learner evidence |
| --- | --- | --- |
| Requirements and problem framing | case-based learning, Socratic checkpoints, problem-based learning | user stories, acceptance criteria, assumption notes, stakeholder tradeoffs |
| Design and architecture | studio critique, worked examples, ADR-style explanation | diagram, interface sketch, architecture decision record, risk note |
| Testing and quality | test-driven learning, automated feedback, pair/debug lab | unit/integration tests, expected failure interpretation, CI-style command |
| Maintenance and refactoring | code review, apprenticeship, OSS-style workflow | small PR-style summary, regression test, refactor rationale |
| DevOps and operations | CI/CD lab, experiential incident, project-based deployment boundary | workflow file, release note, log/trace sample, failure postmortem |
| Teamwork and project management | pair programming, peer assessment, agile simulation | team charter or review note, issue breakdown, retrospective |
| Ethics, privacy, security, accessibility | case-based learning, reflection, threat/risk review | risk memo, mitigation, limitation statement |
| AI reliability and evals | evidence-first debugging, golden evals, model-selection reasoning | eval dataset, scored run, failure categories, model/tool decision note |

The teaching stack should layer concise direct instruction, active processing, authentic practice, fast feedback, and reflection. Avoid lecture-only lessons, project-only lessons without scaffolding, or automated-test-only assessment that misses design, safety, and communication.

### Pedagogy Enforcement Standard

A lesson is not complete unless the learner-facing files prove the teaching method is present. Do not rely on hidden author notes or planning prose.

Every module and lesson must show:

- **Engaging problem frame:** a realistic failure, mission, or learner role that gives the technical work a reason to matter.
- **Cafe-style storytelling:** explain like a knowledgeable friend with a notebook at a cafe: warm, concrete, visual, and respectful.
- **Action before lecture:** the learner runs, traces, predicts, inspects, or compares something before long explanation.
- **Concept after context:** deeper explanation follows the observed problem and is tied to the next code decision.
- **Socratic checkpoints:** the README asks the learner to predict behavior, choose the smallest change, and explain the result before or during implementation.
- **Worked trace:** the learner inspects code, tests, logs, data, or a small worked example before writing independent code.
- **Guided struggle:** TODOs, hints, and tests make the next step discoverable without handing over the full implementation.
- **Feedback literacy:** verification sections explain how to interpret the first expected failure, not only which command to run.
- **Rich visual support:** include a diagram, mind map, sequence sketch, table, or visual explanation when it clarifies flow, state, architecture, or mental model.
- **Optional external visual support:** include one current video or visual resource found through a fresh web search when the learner may benefit from another modality.
- **Optional deeper references:** link high-quality books, courses, or official docs for learners who want more depth, without making them required for the exercise.
- **Transfer reflection:** the lesson ends by connecting the skill to FinAgent, production AI engineering, or a later module.

Every module-level `AI_AUTHORING_GUIDE.md` must translate these rules into module-specific wording. If a future lesson does not satisfy these items, revise the README, hints, tests, or rubric before adding more technical scope.

External references must be optional, trustworthy, and current. Prefer official documentation, university courses, publisher pages, recognized educators, and high-quality course providers. Do not link pirated books, unofficial PDF mirrors, or low-trust reposts. Use `curriculum/resources/curated-learning-resources.md` as the seed list and refresh video/resource choices at lesson authoring time.

Optional videos and course links support the lesson; they do not replace it. A good optional resource is mapped to one lesson outcome, friendly to the learner's level, clearly marked optional, and short enough that it does not become a hidden prerequisite. For advanced resources, label the target level plainly: preview, Course 2 bridge, Course 3 advanced, or specialization.

### Action First

Begin with a visible result quickly. Let students run, inspect, or trace something real before a long theoretical explanation.

### Deep After Context

After the quick win, provide complete explanations. Depth is welcome when it is ordered around a concrete problem the student has already seen.

### Learner-Written Code

Students should write the meaningful implementation. Provide:

- function signatures
- docstrings
- pseudocode comments
- failing tests
- layered hints
- small debugging checkpoints

Avoid:

- giving the full implementation first
- asking students to paste large generated code blocks
- hiding essential logic in unexplained helper files

AI assistants may be used for explanation, critique, hints, and review. They must not be the main path for filling complete learner solutions.

### Product Spine

FinAgent is the recurring product spine. It should appear in small slices throughout the curriculum, but each module must also stand alone as a useful learning unit.

### Testing as Teaching

Tests are part of the lesson, not only a grading tool. Students should learn to:

- run tests before editing
- read assertion messages
- make one change at a time
- add or modify at least one test in larger projects
- distinguish syntax errors, import errors, failing assertions, and design gaps

Each project should include one intentional failure mode so debugging becomes a practiced skill rather than a punishment.

Separate three different test purposes:

- **Scaffold integrity:** learner files import and tests collect without unexpected infrastructure errors.
- **Learner evaluation:** learner-visible tests describe the intended behavior and may fail against TODO code.
- **Curriculum validation:** reviewer-only reference behavior proves the exercise is solvable and aligned.

For TODO workbenches, "all tests pass" is not the default repo health signal. The default scaffold gate is clean import and collection plus expected, named learner failures. Reference behavior must pass the exercise contract before a lesson is trusted.

### Reference Validation

Every substantial exercise should eventually have reviewer-only validation under `.kiro/specs/curriculum-planning/implementation-notes/` or another instructor-only path. The reference path should prove:

- the learner-visible tests pass against the intended behavior
- deeper hidden or reviewer tests cover edge cases
- the solution demonstrates the intended concept rather than hardcoding examples
- no secrets, network calls, or unstable APIs are required unless mocked
- error handling and observability match the lesson claim

Later modules should add malformed input, empty data, missing API key behavior, retry/fallback behavior, golden eval examples, logging assertions, and simple cost/latency checks.

### Evaluation Progression

Evaluation difficulty grows by module:

- Early modules: unit tests, expected vs actual output, tracebacks, and simple debugging.
- Middle modules: golden datasets, mocked LLM responses, prompt/version tracking, retrieval checks, and error categories.
- Later modules: RAG faithfulness, citation coverage, tool-call correctness, agent task success, structured logs, CI eval gates, cost, and latency.
- Capstone: repeatable eval harness, baseline comparison, failure analysis, monitoring plan, and threshold-based regression checks.

### Story and Tone

Use a warm, direct, second-person teaching voice. Each module should include a narrative problem, a concrete learner role, and callbacks to earlier work. The story carries the technical payload, but it should never obscure the actual code, tests, or tradeoffs.

Avoid research-report prose, citation clutter, motivational filler, or abstract manifesto language in learner-facing lessons. The writing should feel like a senior engineer coaching the learner through evidence, tradeoffs, and implementation.

### Platform Separation

Do not require hosted platform infrastructure for the curriculum MVP. Keep React apps, backend microservices, Kubernetes, object storage, search clusters, dashboards, and hosted code playgrounds in `future/platform-notes.md` unless a specific lesson teaches those ideas directly.

## Module Acceptance Criteria

A module is complete when the learner can:

- explain the key concept without copying lesson text
- modify an existing example
- build a new implementation from a scaffold
- verify behavior with tests
- describe a realistic failure mode and mitigation

Before module implementation begins, the planning docs or local module guide must include:

- final learning outcomes
- expected learner artifact
- lesson/project list
- estimated core hours and optional enrichment cap
- assessment checkpoint
- required visuals or diagrams
- source references and level-routing decisions
- new concepts introduced
- intentionally deferred concepts
- maximum number of new tools/APIs
- out-of-scope notes

Each module checkpoint must include one practical build task, one debugging task, one explanation or reflection task, and one rubric.

## Web Data Acquisition Mini-Course Criteria

The web data acquisition mini-course is mandatory but bounded. It satisfies the book-derived requirement that web scraping be a serious AI engineering data workflow without making Course 1 a production scraping course.

The core path must include:

- HTTP, URL, header, status-code, HTML, CSS selector, robots.txt, sitemap, and browser DevTools literacy
- API-first collection when a stable public endpoint exists
- local fixture extraction before live requests
- pagination, retries, timeouts, rate limiting, deduplication, and URL normalization
- source URL, timestamp, heading, license/usage assumption, and extraction-provenance metadata
- raw, clean, processed, and RAG-ready dataset boundaries
- schema validation and data-quality reporting
- tests for missing fields, malformed HTML, duplicate URLs, changed selectors, stale data, and failed requests
- privacy, PII minimization, copyright, terms-of-service, robots.txt, and attribution review
- conversion of cleaned pages or records into RAG-ready chunks with citation metadata

The core path should require 5-6 labs and one portfolio mini-project. The remaining labs from `AI_Engineering_Books.md` belong in the optional extension path unless a later module explicitly needs them.

The mini-project deliverables are:

- approved-source checklist
- fixture set
- crawler or collector code
- tests
- raw dataset sample
- cleaned dataset sample
- data-quality report
- provenance table
- RAG-ready chunk output
- short reflection explaining API vs scraping choice, ethical assumptions, and production failure modes

The extension path may include Playwright, infinite scroll, sessions/forms on safe demo targets, crawl queues, scheduled refresh, monitoring, and agentic web research. These are optional unless a later course promotes them.

## Project Acceptance Criteria

A project is complete when it includes:

- expected behaviors
- edge cases
- failure modes
- test commands
- rubric
- reflection prompts
- extension path

Every project should also produce a small evidence portfolio:

- direct technical evidence: source code, tests, fixtures, evals, logs, or deployed/demo output
- process evidence: issue breakdown, PR-style summary, review response, or decision record
- explanation evidence: tradeoff defense, failure analysis, and transfer reflection

For web data projects, the evidence portfolio must also show approved-source review, provenance, raw/clean/processed separation, broken-selector behavior, and RAG-ready metadata.

## Capstone Quality Criteria

The FinAgent capstone must be graded across:

- correctness
- reliability
- explainability
- source grounding
- error handling
- security and privacy
- maintainability
- test coverage

Capstone outputs must clearly state that they are educational research summaries, not financial advice.

Recommended capstone assessment split:

| Area | Weight | Evidence |
| --- | ---: | --- |
| Working implementation | 25% | runnable app or workflow with core behavior complete |
| Eval harness and golden dataset | 25% | repeatable eval command, edge cases, failure categories |
| Testing and CI-style gates | 20% | unit tests, scaffold checks, regression command |
| Observability and operations | 15% | logs, traces, cost/latency notes, release checklist |
| Failure analysis and explanation | 15% | written tradeoff defense and known limitations |

Capstone rubric dimensions must include:

- problem framing and requirements
- architecture and design rationale
- implementation quality
- testing and automation
- data and AI reliability
- team/process or solo professional workflow evidence
- professionalism, ethics, privacy, security, accessibility, and domain limitations
- reflection and improvement

Required FinAgent capstone boundaries:

- educational analysis only
- no investment recommendations
- no unsupported price predictions
- source freshness and uncertainty must be visible
- unsupported claims must be refused or flagged

## Naming and File Layout

Prefer this pattern for new lessons:

```text
module-folder/
  week-XX-topic/
    README.md
    workbench.py
    hints.md
    tests/
      test_topic.py
    rubric.md
```

Use `workbench.py` for the file learners edit. Avoid learner-facing names such as `solution.py`, `answer_key.py`, or `solution_template.py`; reviewer-only intended behavior belongs under `.kiro/specs/curriculum-planning/implementation-notes/`.

Layer-proof projects should fit inside the existing module folders rather than creating a competing curriculum tree:

- Module 3: LLM API Playground, Prompt Engineering Test Suite, Tool-Using Research Assistant
- Module 4: AI-Ready Data Pipeline, Document QA / RAG Support Desk, Workflow Automation Agent
- Module 5: Production Hardening Sprint, Model Selection and Adaptation Decision
- Module 6: FinAgent capstone

The required web data acquisition mini-course uses `curriculum/specializations/web-scraping` as its stable learner folder even though it is mandatory. This preserves the existing path while making the core slice required in `ROADMAP.md`.

Use existing module folder names unless there is a strong reason to migrate:

- `00-python-foundations`
- `01-module-1-whole-game`
- `02-module-2-first-principles`
- `03-module-3-mcp-integration`
- `04-module-4-agentic-workflows`
- `05-module-5-production`
- `06-capstone-projects`
- `specializations/web-scraping`
