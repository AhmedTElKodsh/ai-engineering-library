# Milestone 1: 30-45 Hour Activation Map

This is the canonical time budget for becoming an **AI Application
Implementer**. It is one cumulative project, not a survey of every folder in
`main-track`.

Use `06-capstone-projects/week-03-integration-build` as the learner-owned
working application from Block 1 through Block 9. Supporting lessons explain
the next boundary; their required result must be integrated back into this
scaffold.

This is a design budget, not cohort timing evidence. Record actual learner time
per block and revise the route when repeated overruns appear; do not hide them
inside recovery or optional work.

## Route Choice

- Use the **30-hour fast path** only if the Module 0 diagnostic is clean and
  the provided fixtures and scaffolds are sufficient.
- Use the **40-hour full path** for normal implementation, debugging,
  evaluation, and explanation.
- Reserve **five additional hours** for environment repair, repetition, slower
  debugging, or the transfer task.

## Capability Budget

| Block | Capability and cumulative change | Fast | Full | Required evidence |
| ---: | --- | ---: | ---: | --- |
| 0 | Diagnostic and environment proof | outside clock | outside clock | setup result; five-test placement note; named repair need or clean pass |
| 1 | Deterministic whole game and contracts | 3h | 4h | validated input; deterministic output; normal and rejected-input tests |
| 2 | Model boundary and structured output | 4h | 5h | fixture provider; validated response shape; trace; optional live proof labelled separately |
| 3 | Evaluation seed | 2h | 3h | 10-15 representative cases; deterministic checks; initial failure taxonomy |
| 4 | Model and retrieval essentials | 3h | 4h | token/context-budget trace; embeddings/similarity explanation; ranking test |
| 5 | Grounded RAG | 5h | 6h | provenance-preserving chunks; citations; abstention; retrieval/generation failure evidence |
| 6 | One tool and one bounded workflow | 4h | 6h | typed least-privilege tool; denied call; visible state; retry limit; human gate |
| 7 | Service boundary | 2h | 3h | validated request/response contract and one real HTTP integration test |
| 8 | Production evidence | 3h | 4h | structured trace; version/config note; latency/cost evidence; local release command |
| 9 | Integration, transfer, and defense | 4h | 5h | full eval run; unfamiliar change; demo; limitations; next backlog |
|  | **Planned instruction** | **30h** | **40h** |  |
|  | Recovery/remediation allowance | **0h** | **5h** | record where the allowance was used |
|  | **Maximum Milestone 1 time** | **30h** | **45h** |  |

## Required Order

The order follows the failures introduced by each capability:

1. Prove deterministic behavior before model behavior.
2. Introduce evaluation with the first probabilistic boundary.
3. Clean and preserve source evidence before retrieval.
4. Prove citations and abstention before tool authority.
5. Prove one explicit workflow before agent autonomy.
6. Prove local behavior before deployment depth.
7. Finish with an unfamiliar modification, not a copied demo.

## Stop Conditions

Milestone 1 is complete only when the learner can:

- run the cumulative application from documented commands
- explain what is deterministic, model-dependent, fixture-only, and live
- show evaluation evidence, citations, and unsupported-answer abstention
- demonstrate one denied or approval-gated tool action
- show that the workflow terminates under failure
- run a real HTTP integration test
- modify one unfamiliar requirement and defend the trade-off

If any required capability is missing, use recovery time or continue Milestone
1. Do not compensate by adding an unrelated advanced topic.

## Optional After Completion

Choose at most one short branch after all required evidence exists:

- live-provider verification
- local MCP wrapper around the proven tool contract
- a second controlled dataset
- a small UI over the already tested API

These do not replace the transfer task or engineering defense.

## Maintainer Reference Proof

After following the repository's reference-after-effort rule, maintainers can
verify one completed fixture-backed implementation:

```powershell
python scripts/validate_curriculum_references.py --strict --executable
```

This proves the cumulative contracts and a real loopback HTTP request. It does
not prove live-provider behavior or a learner's independent transfer task.
