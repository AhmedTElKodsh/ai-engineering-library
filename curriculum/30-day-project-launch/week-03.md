# Week 3: Tools, Workflows, And Bounded Agents

Timing: use this guide during Days 15-21, Sunday 2026-06-28 through Saturday
2026-07-04. Read the current day in 5-10 minutes before starting work, then use
the checklist at the end of the day.

Expected effort: 5-7 focused hours per day, 35-49 focused hours total. Day 21
is the milestone check; protect that date by keeping workflows explicit and
deferring framework depth.

Week 3 adds tool use and workflow behavior without hiding control flow inside a
model. The goal is not to build an autonomous agent. The goal is to expose
deterministic capabilities through typed contracts, route them through visible
validation, track workflow state, verify outputs, and stop safely.

Pedagogy: this week follows the main curriculum's lesson method. Start from a
failure or trace, predict behavior, make the smallest bounded change, verify the
contract, explain the boundary, and add one stronger negative case only after
the minimum path works.

## Week Goal

Build controlled agentic behavior without over-autonomy.

By the end of Day 21, another engineer should be able to inspect a workflow
trace and see typed tools, validated routing, stop conditions, retry limits,
review or escalation behavior, and safety tests.

## Calendar And Daily Time Boxes

Each day is 5-7 focused hours. Use the standard split: 15 min planning,
45-60 min read/trace, 2.5-3.5 hrs build, 1-2 hrs test/debug, and 30-45 min
evidence log and commit.

| Day | Date | Minimum artifact | Build-slice target |
| ---: | --- | --- | --- |
| 15 | Sun 2026-06-28 | typed deterministic tools | one schema, one tool, one failure case |
| 16 | Mon 2026-06-29 | bounded tool router | allowlist, bad-args path, trace event |
| 17 | Tue 2026-06-30 | explicit workflow state | state object, step order, failed-step test |
| 18 | Wed 2026-07-01 | verifier, retry, review rule | objective verifier, retry cap, escalation |
| 19 | Thu 2026-07-02 | data integration with freshness | adapter, stale warning, source test |
| 20 | Fri 2026-07-03 | `SAFETY_BOUNDARIES.md` | injection case, refusal case, safety test |
| 21 | Sat 2026-07-04 | Milestone 3 evidence | cleanup, workflow trace, boundary defense |

Function/task estimate: keep each schema, tool, workflow step, verifier rule,
or safety case to 20-45 minutes before checking tests or traces.

## Learner Logic Map

Fill this in each morning or in the daily log:

| Question | Week 3 answer |
| --- | --- |
| What can I do now? | Run and explain the cited RAG system from Week 2. |
| What new capability am I adding? | Add one tool, router, workflow, verifier, or safety boundary behind tests. |
| What failure does this help me catch? | Unsafe tool input, hidden model control flow, retry loops, stale data, injection, or unsupported claims. |
| How does this improve FinAgent or a practical AI system? | It lets the assistant act through bounded software contracts instead of free-form autonomy. |
| What should I be able to explain afterward? | The tool contract, routing rule, workflow state, stop condition, retry rule, or safety refusal. |

## Daily Learning Loop

Use the same loop every day:

1. Before you run: predict the tool call, state transition, verifier result, or
   refusal behavior.
2. Evidence first: inspect a schema failure, workflow trace, bad tool argument,
   retry event, or safety case before changing code.
3. Smallest change: implement one contract behavior at a time.
4. Explain like a teammate: write 2-4 sentences about the boundary and stop
   condition.
5. One step stronger: add one negative case, denial case, trace field, or
   escalation example.
6. Reference after effort: use framework docs, examples, AI help, or hints only
   after you can name the failure or design question.

Keep the minimum path separate from stretch work. If an agent framework starts
to hide the control flow, return to an explicit local workflow and write the
framework idea into the backlog.

## Source Material To Trace

Read only the parts needed for the current day:

- `curriculum/main-track/03-module-3-mcp-integration/week-02-server-building/`
- `curriculum/main-track/03-module-3-mcp-integration/week-04-security-a2a/`
- `curriculum/main-track/04-module-4-agentic-workflows/week-03-core-patterns/`
- `curriculum/main-track/04-module-4-agentic-workflows/week-04-advanced-patterns/`
- Optional extended concept: `curriculum/extended-concepts/02-agentic-systems/week-01-framework-state-machine/`
- Optional extended concept: `curriculum/extended-concepts/02-agentic-systems/week-02-resumable-orchestration/`
- `FINANCE_SAFETY.md` if using FinAgent

Use module references selectively:

| Day | Required trace | Optional if blocked or ahead |
| --- | --- | --- |
| Day 15 | typed tool schema and malformed-input tests | second deterministic tool |
| Day 16 | tool routing and permission-boundary tests | structured model-assisted intent classification |
| Day 17 | explicit workflow state and step-order tests | state diagram |
| Day 18 | critique, retry, and human-review examples | richer review taxonomy |
| Day 19 | provenance and stale-source handling | live provider behind fixture fallback |
| Day 20 | injection, refusal, and domain safety tests | adversarial case expansion |
| Day 21 | Day 21 section of `milestone-rubric.md` | trace viewer or diagram |

## Project Shape

Week 3 extends the Week 2 system:

```text
validated request
  -> retrieval context
  -> typed tool call when allowed
  -> workflow state
  -> draft answer
  -> verifier
  -> final answer, abstention, refusal, or escalation
```

Recommended additions inside the learner project:

```text
src/
  tools.py
  tool_router.py
  workflow.py
  verifier.py
  safety.py
tests/
  test_tools.py
  test_tool_router.py
  test_workflow.py
  test_safety.py
```

## Week 3 Guardrails

- Tools must be callable and testable without model involvement.
- Tool inputs and outputs must be typed or schema-validated.
- No unvalidated model text reaches tool execution.
- Router decisions must be inspectable and logged.
- Workflow state must show step order, failures, retries, and terminal status.
- Retry behavior must be bounded.
- Safety boundaries must include concrete refusal or abstention examples.
- FinAgent must remain educational, cited, and non-advisory.

## Evidence Portfolio

For each day, capture:

- technical evidence: schema, tool, router, workflow trace, verifier, or safety
  test
- failure evidence: malformed tool input, denied route, retry limit, escalation,
  injection case, or stale-data warning
- explanation evidence: 2-4 sentences explaining why the workflow is bounded
- transfer evidence: how the pattern prepares the project for production
  reliability without over-autonomy

## Week 3 Evidence Checklist

- [ ] Tools have explicit input and output contracts.
- [ ] Tools can be tested without model involvement.
- [ ] Router rejects unknown tools and malformed arguments.
- [ ] Workflow state exposes step order and terminal status.
- [ ] Verifier catches unsupported, mismatched, or unsafe output.
- [ ] Retry behavior is capped and observable.
- [ ] Human-review or escalation state exists for unresolved cases.
- [ ] Data freshness or stale-source warnings are visible.
- [ ] Safety tests cover prompt injection, unsupported claims, and domain limits.
- [ ] Daily logs name first failures, final commands, limitations, and AI use.
- [ ] Day 21 is scored against `milestone-rubric.md`.

## Common Scope Traps

- Calling the system an agent when the boundary is just unstructured model text.
- Letting the model choose arbitrary tools or arguments.
- Hiding workflow state inside a framework before local behavior is understood.
- Retrying without a stop condition.
- Treating safety as a policy paragraph without tests.
- Adding memory, multi-agent behavior, or broad filesystem/network authority.

## Week 4 Handoff

Before starting Day 22, write down:

- the one runnable interface the project should expose
- which workflow traces prove bounded behavior
- which safety and failure cases must appear in the demo
- which quality gate should block portfolio packaging
