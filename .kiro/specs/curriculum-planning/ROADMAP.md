# AI Engineering Curriculum Roadmap

## Philosophy

The roadmap optimizes for the earliest defensible engineering capability, not
topic coverage. Mastery is not a fixed-hour promise.

The three milestones are sequential because later work depends on earlier
evidence. Within each milestone, learning is horizontal: software, models,
data, evaluation, security, operations, and agency deepen together through one
vertical product slice.

| Milestone | Planning range | Exit |
| --- | ---: | --- |
| 1. AI Application Implementer | 30-45 focused hours | build and defend one bounded application with guidance |
| 2. Production AI Engineer | 80-120 additional focused hours, evidence-gated | independently rebuild and operate a second system |
| 3. Advanced AI Systems Engineer | no honest fixed mastery clock | make defensible architecture decisions under scale and organizational constraints |

`curriculum/LEARNER_JOURNEY_MAP.md` owns the cross-milestone layer model.

## Milestone 1 Product Contract

The learner owns one cumulative FinAgent application, or an approved
source-grounded equivalent. The product grows in this order:

```text
deterministic baseline
  -> fixture-backed model boundary and structured output
  -> early task evaluation
  -> source-grounded retrieval
  -> one least-privilege tool and bounded workflow
  -> tested local HTTP boundary
  -> trace, version, latency/cost, transfer, and defense evidence
```

The canonical budget and stop conditions are in
`curriculum/main-track/milestone-1-45-hour-map.md`.

### Required Evidence

- validated deterministic inputs and outputs
- fixture and live behavior labelled separately
- 10-15 representative evaluation cases and a failure taxonomy
- provenance, citations, and unsupported-answer abstention
- one typed least-privilege tool with a denied case
- visible workflow state, bounded retry, termination, and human escalation
- one real loopback HTTP integration test
- repeatable local quality command and operational evidence
- one unfamiliar modification and engineering defense

### Supporting Library

The existing `main-track` module folders are support shelves, not a mandatory
week-by-week sequence:

| Folder | Milestone 1 use |
| --- | --- |
| `00-python-foundations` | placement and targeted remediation before the clock |
| `01-module-1-whole-game` | deterministic whole-game repair |
| `02-module-2-first-principles` | only the model and retrieval intuition required by the application |
| `03-module-3-mcp-integration` | provider, structured output, prompt, and tool contracts |
| `04-module-4-agentic-workflows` | grounded retrieval and one explicit workflow |
| `05-module-5-production` | evaluation, service, trace, and local release evidence |
| `06-capstone-projects` | cumulative learner-owned implementation and defense |

The cumulative scaffold selects the smallest supporting lab needed at each
checkpoint. Finishing every folder or TODO is not a Milestone 1 requirement.

### Default Deferrals

- broad Python study not triggered by placement
- tokenizer, attention, or transformer implementation
- fine-tuning, LoRA, model training, and custom serving
- required live scraping, vector-database operations, reranking, and GraphRAG
- MCP transports, remote authorization, and large tool catalogs
- framework-managed or multi-agent workflows before plain state is understood
- hosted deployment, enterprise observability, and platform engineering
- separate projects that replace the cumulative product

## Milestone 2 Direction

Milestone 2 starts only after the Milestone 1 transfer and defense gates pass.
The learner builds a second application with less scaffolding and adds
production depth:

- async and provider failure handling
- persistent data lifecycle and stronger retrieval evaluation
- authentication, privacy, secrets, and threat modelling
- deployment, monitoring, caching, cost control, and CI/CD
- reproducible packaging
- one real MCP client/server integration when justified

Its detailed route must be validated against Milestone 1 timing and learner
failure data before authoring.

## Milestone 3 Direction

Milestone 3 uses operated-project evidence, architecture review, incident and
rollback analysis, evaluation governance, authorization and isolation,
performance economics, and ambiguous constraints. The learner specializes in
one or two areas instead of superficially completing every advanced topic.

## Current Priorities

1. Pilot Milestone 1 with learners and record actual time and failure category
   per block.
2. Verify one optional live-provider path without making it a core dependency.
3. Collect independent transfer-task and engineering-defense evidence.
4. Revise the 30-45 hour promise from repeated observations.
5. Design Milestone 2 only after those results expose the real handoff gaps.

## Change Control

Any proposed Milestone 1 addition must state:

1. what existing activity it replaces
2. hours removed and added
3. how the cumulative product changes
4. which capability gate improves
5. what later topic remains deferred

No replacement and no runnable evidence means no addition.
