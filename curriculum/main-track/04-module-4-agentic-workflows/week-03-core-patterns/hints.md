# Hints: Agentic Workflow Core Patterns

Use these only after you have read the failing test and identified the workflow stage it targets.

The hints are layered. Start with Layer 1. Move to Layer 2 only when you are stuck. Use Layer 3 when the workflow runs but route, gate, or trace assertions fail.

## Layer 1

Think in workflow stages: load case, choose route, build step plan, run gate, produce trace.

Before editing, answer:

- Is this test about fixture loading, routing, step planning, gate decision, or trace?
- Which route should this case take, and why?
- What evidence or safety condition controls the final response?

## Layer 2

### Loader And Routing

The fixture has a top-level cases list. Convert each case into the local case object before routing.

Unsafe financial advice should route to refusal. Requests that need evidence should route to retrieve-then-answer.

### Step Plan And Gate

For evidence-backed answering, the plan should inspect the request, look up evidence, and draft a grounded response.

For refusal, the plan can be shorter because no evidence lookup is needed.

Tool success is not enough by itself. The gate decides whether the final response may answer, must abstain, or must refuse.

### Trace

The trace should be boring and complete: case ID, route, step IDs, tool names, gate decision, and final response.

## Layer 3

### Reading The Tests

If route tests fail, inspect the case attributes before the step planner.

If the gate fails, separate tool execution from final answer permission.

If trace tests fail, add missing workflow facts without changing route logic.

### Final Check

Run loader and route tests first, then gate and trace tests. Workflow bugs are much easier to see when each stage has a stable record.
## Failure Lab

Before asking for the next hint, identify the first concrete failure signal: the failing test name, assertion message, malformed fixture, missing field, unsafe output, weak citation, or unclear trace. Write one sentence about what the failure is teaching.

## Evidence Check

After the smallest behavior works, leave four notes:

- technical evidence: what code, test, fixture, eval, trace, or log changed
- failure evidence: what broken case is now handled or intentionally refused
- explanation evidence: why the fix works in 2-4 sentences
- transfer evidence: how this pattern strengthens FinAgent or a later AI system
