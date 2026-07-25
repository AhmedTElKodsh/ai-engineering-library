# Curriculum Review

Last reviewed: 2026-07-26

## Verdict

The repository now has a coherent Milestone 1 activation route: one cumulative
application, a 30-hour fast path, a 40-hour normal path, five recovery hours,
capability gates, scope guards, and fixture-backed reviewer proof.

The route is structurally ready for a supervised learner pilot. It is not yet
empirically proven to fit 30-45 hours, and it does not prove live-provider,
independent learner, hosted, or production behavior.

## What The Repository Proves

- learner scaffolds collect and import without infrastructure errors
- expected starting failures are TODO behavior failures
- every assignable scaffold has instructor reference and validation notes
- the cumulative fixture-backed reference passes its checkpoint suite
- the service checkpoint performs a real loopback HTTP request
- curriculum quality and reference validators pass in strict mode
- Python compilation and Ruff checks pass on the active curriculum surface

Use `LEARNER_READY_MATRIX.md` for the exact evidence-state ledger and commands.

## Curriculum Decisions

- Keep three sequential capability milestones.
- Deepen software, models, data, evaluation, security, operations, and agency
  horizontally inside each milestone.
- Treat Milestone 1 as guided implementer activation, not mastery.
- Use one cumulative FinAgent application or approved source-grounded
  equivalent.
- Introduce evaluation with the first model boundary.
- Teach plain, explicit workflow state before framework-managed autonomy.
- Keep fixture proof mandatory and live-provider proof optional.
- Defer hosted platforms, fine-tuning, multi-agent depth, GraphRAG, and scale.
- Preserve stable lesson folders while treating `week-*` labels as library
  organization rather than calendar requirements.

## Cleanup Applied

- removed root mission, teaching-note, resource, migration, and master-prompt
  duplicates whose active decisions already exist in maintained contracts
- removed curriculum roadmap/spec pointer files
- removed the obsolete 30-session pacing duplicate
- removed the archived 30-day launch and dead evaluator tests/config/template
- removed stale source-inventory and completed consolidation ledgers
- reduced planning to current roadmap, spec, review, pedagogy research, and
  reviewer evidence
- retained local ignored books, research inputs, agent workspaces, and unrelated
  learner assets without promoting them into the committed contract

All tracked deletions remain recoverable through Git history.

## Open Evidence Gaps

| Gap | Why it matters | Next proof |
| --- | --- | --- |
| learner timing | 30-45 hours is still a design budget | record time and failure category per block across several learners |
| independent transfer | reference success can hide scaffold dependence | observe the unfamiliar modification without solution access |
| engineering defense | files do not prove explanation quality | use a short rubric-based review or recorded defense |
| live provider | fixtures do not expose provider drift, latency, or credentials | run one opt-in provider check and label it separately |
| hosted operation | loopback HTTP is not deployment | defer until Milestone 2 requires it |
| Milestone 2 route | production topics are described but not yet budgeted | design after Milestone 1 pilot evidence identifies the handoff |

## Next Work

1. Run a supervised Milestone 1 pilot without adding content.
2. Log actual time, support used, failure category, and recovery hours.
3. Collect the transfer task and defense evidence.
4. Revise or narrow blocks that repeatedly overrun.
5. Only then author the Milestone 2 route.

Do not reopen completed migration history as an active checklist. Use Git
history when a past rationale is needed.
