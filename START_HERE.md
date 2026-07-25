# Start Here

Welcome to the AI Engineering Library. This is a text-first, test-guided
curriculum for learners with working Python fundamentals; the placement sample
decides whether targeted remediation is needed.

## The Roadmap

The curriculum grows through three sequential capability milestones:

1. **AI Application Implementer** — build and defend one bounded application in
   30-45 focused hours.
2. **Production AI Engineer** — independently rebuild and operate a second
   system with production depth.
3. **Advanced AI Systems Engineer** — make architecture decisions under scale,
   reliability, security, and organizational constraints, then specialize.

Milestone 1 is the active learner route. It is a launchpad, not a mastery
claim.

## First 15 Minutes

1. Prove the environment:

   ```powershell
   python -m pytest curriculum/main-track/00-python-foundations/week-00-diagnostic/test_setup.py -q
   ```

2. Run the five-test placement sample:

   ```powershell
   python -m pytest curriculum/main-track/00-python-foundations/week-00-diagnostic/test_assessment.py -k "swap_without_temp or flatten_list or make_multiplier or counter_initial_count or safe_divide_zero_division" -v
   ```

3. Record the first failure you understand and any Python gap it exposes. Do
   not complete the full 24-test inventory unless the sample is inconclusive.
4. Open `curriculum/main-track/milestone-1-45-hour-map.md`.
5. Start the deterministic baseline only after you know whether remediation is
   required.

If pytest plugin noise gets in the way:

```powershell
$env:PYTEST_DISABLE_PLUGIN_AUTOLOAD='1'
```

## Time Boundary

| Path | Budget | Boundary |
| --- | ---: | --- |
| Guided fast path | 30 hours | clean diagnostic, fixture-first execution, narrowest required evidence |
| Full path | 40 hours | normal implementation, debugging, evaluation, and explanation |
| Recovery allowance | 5 hours | remediation, environment repair, repetition, or transfer work |

Python remediation happens before the timed route. Do not hide a broad Python
course inside the 30-45-hour promise.

## What You Build

Use one cumulative FinAgent application or an approved source-grounded
alternative. It grows through:

```text
deterministic baseline
  -> model boundary + first evals
  -> grounded retrieval
  -> bounded tool and workflow
  -> tested service + operational evidence
  -> transfer task + engineering defense
```

Keep the learner implementation in
`curriculum/main-track/06-capstone-projects/week-03-integration-build` from the
first deterministic checkpoint onward. Its legacy folder name does not mean
you wait until the end to open it.

After placement, open only:

1. `curriculum/main-track/milestone-1-45-hour-map.md` for order and time.
2. `curriculum/main-track/06-capstone-projects/week-03-integration-build/README.md`
   for checkpoint and support commands.

Use `curriculum/main-track/README.md` as the index. Consult
`curriculum/main-track/milestones.md`, `curriculum/main-track/scope-guards.md`,
and `LEARNER_READY_MATRIX.md` at review points rather than reading them as
prerequisite lessons.

Use `START_HERE_2_HOURS_PER_DAY.md` when you want the same path spread across
short daily sessions.

## How Lessons Work

Inspect, predict, run the smallest relevant test, implement one coherent
behavior, verify, and reflect. Use progressive hints only after naming the
stuck point.

Starter behavior tests are expected to fail until TODOs are implemented.
Import errors, missing fixtures, broken paths, or undocumented setup are
curriculum defects.

## Ignore for Milestone 1

- broad Python review not triggered by the diagnostic
- BPE and attention implementation
- required live scraping
- advanced MCP, RAG, agent, memory, or framework work
- fine-tuning and model training
- hosted deployment and platform engineering
- separate projects that replace the cumulative application

These are later-milestone material, not missing Milestone 1 work.
