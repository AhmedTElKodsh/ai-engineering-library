# Learner-Ready Matrix

This file reports what the repository currently proves. It does not turn file
presence into executable or learner-completion evidence.

## Evidence States

| Evidence state | Proves | Does not prove |
| --- | --- | --- |
| Documentation truth | the intended route and capability are stated consistently | code execution |
| Structural health | files import, fixtures parse, and tests collect | completed behavior |
| Expected starter state | the incomplete scaffold is usable as a focused exercise | a solved lesson |
| Reviewer notes present | intended behavior and reviewer checks are documented | an executable reference solution |
| Executable reference proof | a completed implementation passes the required contracts | learner understanding |
| Learner completion | the learner passes contracts and an unfamiliar transfer task | production mastery |

## Status Meanings

- `assignable`: learner README, scaffold, tests, hints, and rubric exist.
- `scaffolded`: files exist but the slice is optional or outside Milestone 1.
- `planned`: the required implementation surface does not yet exist.
- `reference-only`: completed instructor evidence, not a solved learner scaffold.
- `instructor-only`: planning or reviewer material.

## Current Route Evidence

| Area | Milestone 1 role | Status | Structural surface | Reviewer notes | Executable reference |
| --- | --- | --- | --- | --- | --- |
| Module 0 diagnostic | readiness gate outside clock | assignable | setup check plus five-test placement sample; full inventory optional | present | not applicable |
| Module 0 Python repair | remediation outside clock | assignable | present | present | not available |
| Module 1 deterministic whole game | core | assignable | present | present | not available |
| Module 2 embeddings and context-budget trace | core slice | assignable | present | present | not available |
| Module 2 BPE and attention implementation | later milestone | scaffolded | present | present | not available |
| Module 3 provider and structured-output boundary | core slice | assignable | present | present | not available |
| Module 3 local tool contract | core slice | assignable | present | present | not available |
| Full MCP transport/auth integration | later milestone | scaffolded | partial | present where scaffolded | not available |
| Web-scraping specialization | later milestone | scaffolded | present | present | not available |
| Module 4 ingestion, cited RAG, and explicit workflow | core slice | assignable | present | present | not available |
| Module 4 advanced critique/agent patterns | later milestone | scaffolded | present | present | not available |
| Module 5 eval, service, trace, version, and cost/latency evidence | core slice | assignable | present | present | not available |
| Cumulative Milestone 1 reference | instructor proof | reference-only | present | not applicable | fixture-backed executable pass |
| Real HTTP adapter and integration test | required reference proof | reference-only | present | not applicable | loopback HTTP pass |
| Module 5 caching, batching, and optimization depth | later milestone | scaffolded | present | present | not available |
| Module 6 cumulative integration and defense | learner spine for Blocks 1-9 | assignable | checkpoint scaffold and tests present | present | separate fixture-backed reference pass |
| Extended concepts | Milestone 2/3 or specialization | scaffolded | present | present | not available |
| Planning material | instructor-only | instructor-only | documentation only | not applicable | not applicable |

## Current Readiness Verdict

- Milestone 1 route contract: documented.
- Structural health: must be rechecked on each change.
- Expected starter integrity: lesson-scoped; the full suite is intentionally
  incomplete.
- Executable Milestone 1 reference: **fixture-backed proof available**.
- Real HTTP proof required by the exit gate: **loopback integration passed**.
- Human cohort timing proof: **not checked**; 30-45 hours remains a design
  budget.
- Live-provider proof: **not checked**.
- Learner completion: evaluated per learner, never inferred from repository
  structure.

Therefore, the cumulative reference can be described as executable-reference
verified in fixture mode. The route must not be described as live-provider,
learner-completion, production-readiness, or mastery verified.

## Validation Commands

```powershell
python -m pytest --collect-only curriculum -q
python scripts/validate_curriculum_references.py --strict --executable
python scripts/validate_curriculum_quality.py --strict
```

Expected documentary output uses `Reviewer-notes-present`, not
`Reference-complete`. Only the explicit `--executable` gate runs the cumulative
reference; it labels fixture and live-provider evidence separately.
