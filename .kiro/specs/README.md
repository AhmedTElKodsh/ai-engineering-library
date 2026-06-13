# Kiro Specs Planning Index

This folder has one active planning home:

- `curriculum-planning/`

Legacy sibling spec folders have been merged into `curriculum-planning/` or
preserved as archived source material under `curriculum-planning/source-material/`.

Use `curriculum-planning/ROADMAP.md` as the source of truth for curriculum sequencing, module scope, FinAgent integration, web-scraping placement, pedagogy, quality gates, and implementation phases. Use `curriculum-planning/SPEC.md` for the authoring contract.

Use `curriculum-planning/docs/pedagogy-methodologies-research.md` when choosing teaching methods for new lessons. It maps software engineering topics to appropriate pedagogy mixes, GitHub teaching infrastructure, and project-spine assessment evidence.

Use the level-routing contract in `curriculum-planning/ROADMAP.md` and `curriculum-planning/SPEC.md` before adding book-derived topics. The active Layer 1 course is a junior AI engineering course, not the whole uploaded encyclopedia. Route each source concept as Layer 1 core, Layer 1 preview, Course 2 bridge, Course 3 advanced, specialization, or parked.

For implementation work, also use:

- `../../curriculum/AI_AUTHORING_GUIDE.md`
- `../../curriculum/templates/lesson-quality-checklist.md`
- `../../curriculum/<module>/AI_AUTHORING_GUIDE.md`

## Source Disposition

| Spec folder or document | Current role |
| --- | --- |
| `curriculum-planning/source-material/legacy-specs/ai-engineering-curriculum-implementation/` | Preserved source material for module requirements, diagnostic entry points, content standards, FinAgent continuity, and platform ideas parked for later. |
| `curriculum-planning/source-material/legacy-specs/ai-engineering-curriculum-implementation/capstone-financial/` | Preserved source material for the FinAgent stock-market capstone. Scope is normalized in the canonical roadmap to avoid oversized fintech-platform requirements. |
| `curriculum-planning/source-material/legacy-specs/teaching-methodology-evaluation/` | Preserved source material for the teaching contract, lesson loop, scaffolding, Socratic prompts, and module quality gates. |
| `curriculum-planning/source-material/legacy-specs/capstone-pedagogical-enhancement/` | Preserved source material for read/explain/modify/create progression, interview practice, professional workflow, and capstone rubrics. |
| `curriculum-planning/source-material/legacy-specs/web-scraping-curriculum/` | Preserved source material for the mandatory bounded web data acquisition mini-course and optional scraping extension. |
| `curriculum-planning/source-material/AI_Engineering_Curriculum_All_Phases.md` | Preserved broad book-derived concept map used for coverage checks, not as a direct folder plan. |
| `curriculum-planning/docs/` | Research notes, historical merge summaries, and supporting planning context. Keep for traceability, but do not treat as competing roadmaps. |
| `curriculum-planning/docs/pedagogy-methodologies-research.md` | Current pedagogy enhancement source for topic-to-method mapping and assessment evidence. |

## Planning Rule

Do not add another roadmap under `.kiro/specs`. Update `curriculum-planning/ROADMAP.md` when the learner journey changes.

Do not recreate `ai-engineering-curriculum-implementation/`, `capstone-pedagogical-enhancement/`, `teaching-methodology-evaluation/`, `web-scraping-curriculum/`, `_legacy/`, or root source documents under `.kiro/specs`; put trace-only source inputs in `curriculum-planning/source-material/`.

If a future hosted learning platform is needed, track it in:

- `curriculum-planning/future/platform-notes.md`

The immediate curriculum product is text-first, code-guided, test-backed, and centered on the FinAgent capstone.
