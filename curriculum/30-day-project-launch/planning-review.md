# Planning Review For The 30-Day Project Launch

Timing: read this in 10-15 minutes when maintaining the route. Use it as a
change-control checklist before expanding the 30-day scope.

This review checks the 30-day route against the repository planning contract. It
is not a new roadmap. It records why this route is an accelerated overlay that
points back to Course 1.

## Planning Files Reviewed

- `README.md`
- `START_HERE.md`
- `START_HERE_2_HOURS_PER_DAY.md`
- `LEARNER_READY_MATRIX.md`
- `HOW_TO_USE_AI_ASSISTANTS.md`
- `curriculum/LEARNER_JOURNEY_MAP.md`
- `curriculum/ROADMAP.md`
- `curriculum/AI_AUTHORING_GUIDE.md`
- `.kiro/specs/curriculum-planning/README.md`
- `.kiro/specs/curriculum-planning/ROADMAP.md`
- `.kiro/specs/curriculum-planning/SPEC.md`
- `.kiro/specs/curriculum-planning/CURRICULUM_REVIEW.md`
- `30day-track.md`

## Alignment Decisions

| Planning rule | Route decision |
| --- | --- |
| Course 1 remains canonical | The route is described as an overlay and sends learners back to Course 1 after Day 30. |
| Stable module folders remain | The route points into existing modules and does not move or rename them. |
| Learners write meaningful code | The no-vibe-coding protocol and daily plan require learner-written artifacts, tests, and explanations. |
| Time budgets stay visible | Every route file starts with a timing note; `timetable.md` defines daily and weekly blocks. |
| FinAgent remains the spine | FinAgent is the recommended default project, with alternatives allowed only as project spines. |
| Web data is mandatory but bounded | The plan uses API-first, fixture-first, provenance-preserving data work and defers production scraping at scale. |
| LLM APIs and PromptOps come before agents | Week 2 teaches wrappers, prompts, structured output, embeddings, RAG, and evals before Week 3 workflows. |
| Data quality comes before RAG | Week 1 builds validation, cleaning, provenance, and RAG-ready records before retrieval. |
| Production is local and evidence-driven | Week 4 focuses on service boundary, logs, versioning, local quality gates, failure analysis, and demo evidence. |
| Advanced topics are doorways | From-scratch GPT, deep training loops, LoRA/QLoRA, GraphRAG, multimodal RAG, complex multi-agent systems, Kubernetes, hosted SaaS, enterprise MLOps, and full platform scope are deferred. |

## Maintenance Checklist

Before changing this route:

- Keep the first successful path mockable and free of paid API requirements.
- Do not add solution code, answer keys, or hidden implementation shortcuts.
- Do not turn the route into a video course or a platform build.
- Add new work only if it produces visible learner evidence.
- If adding a dedicated workbench or tests, update `LEARNER_READY_MATRIX.md`
  truthfully.
- If adding a tool recommendation, keep it optional and lightweight.
- If changing the timetable, preserve milestone evidence on Days 7, 14, 21, 28,
  and 30.

## Review Result

The route is aligned with the planning contract as a 30-day project-launch
overlay. It should remain documentation-only unless a future change deliberately
adds route-specific workbenches, tests, hints, and reviewer validation.
