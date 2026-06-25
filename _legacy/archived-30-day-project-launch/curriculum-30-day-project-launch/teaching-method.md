# 30-Day Route Teaching Method

Timing: read this once before Day 1 in 15-20 minutes. Revisit the ritual list
whenever a day starts to feel like a checklist instead of a learning loop.

This route follows the same teaching method as the main curriculum. It is an
accelerated project overlay, so the learner-editable surface is the learner's
project repository instead of a fixed `workbench.py`, but the pedagogy stays the
same: action before lecture, evidence before claims, minimum path before
enrichment, and reflection before moving on.

## Learner Logic Map

Use these five questions at the start and end of every day.

| Question | Route answer |
| --- | --- |
| What can I do now? | Use the previous day's project evidence as the current baseline. |
| What new capability am I adding? | Add one narrow, testable AI-engineering capability to the same project spine. |
| What failure does this help me catch? | Name the concrete bad input, weak output, unsafe behavior, or unobservable failure the day is designed to expose. |
| How does this improve FinAgent or a practical AI system? | Tie the change to a safer, more grounded, more inspectable assistant behavior. |
| What should I be able to explain afterward? | Explain the boundary, test evidence, limitation, and transfer to the next project layer. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** complete the day's required artifact, run the relevant
  verification command, document one failure or limitation, and commit.
- **Optional enrichment:** add one edge case, trace, diagram, or small test only
  after the minimum path passes.
- **Advanced doorway:** write down what the topic prepares for later, but do not
  turn advanced work into a hidden Day 1-30 requirement.

## Daily Teaching Loop

Every day should make this loop visible:

1. Read the realistic problem and today's project role.
2. Trace code, tests, data, logs, docs, or a worked example before editing.
3. Predict the first failure, output, or trace field before running.
4. Modify one constrained behavior.
5. Create the smallest implementation needed for the deliverable.
6. Verify with tests, evals, command output, or trace inspection.
7. Reflect on limits, failure modes, and transfer to the next layer.

## Named Rituals

Use the same rituals as the main curriculum:

- **Before You Run:** predict output, failure, or created files.
- **Evidence First:** inspect a test failure, malformed fixture, trace, log,
  eval row, or data sample before changing code.
- **Smallest Change:** fix one behavior before adding breadth.
- **Explain Like a Teammate:** write 2-4 sentences another engineer could
  review.
- **One Step Stronger:** add one edge case, refusal case, trace field, or
  limitation note.
- **Reference After Effort:** use hints, AI help, docs, or examples only after
  you can name the failure or question.

## Evidence Portfolio

A passing test is necessary but not enough. Each day should leave four evidence
types:

| Evidence type | What to capture |
| --- | --- |
| Technical evidence | Code, docs, fixture, test, eval, trace, command, or output artifact. |
| Failure evidence | First failure, rejected input, abstention, refusal, malformed source, or known limitation. |
| Explanation evidence | Short teammate-facing note explaining the boundary and tradeoff. |
| Transfer evidence | How the day's pattern strengthens FinAgent or another practical AI system. |

## Project-Based Adaptation

Normal lessons use `README.md`, `workbench.py`, `tests/`, `hints.md`, and
`rubric.md` in one folder. This route adapts that shape:

| Main curriculum lesson surface | 30-day route equivalent |
| --- | --- |
| Lesson `README.md` | Current day guide plus `daily-plan.md` |
| `workbench.py` | Learner project files created by the day's deliverable |
| `tests/` | Learner project tests, evals, fixture checks, or smoke commands |
| `hints.md` | Route guardrails, source material, and AI help after effort |
| `rubric.md` | `milestone-rubric.md` and daily done criteria |

## Daily Guide Checklist

When adding or revising a day, include:

- learning logic target
- minimum path and optional enrichment boundary
- advanced doorway or explicit deferral
- action-before-lecture step
- Before You Run prompt
- Evidence First prompt
- Smallest Change guidance
- Explain Like a Teammate prompt
- One Step Stronger option
- verification command or manual check
- portfolio evidence: technical, failure, explanation, and transfer

If a day cannot name the failure it teaches the learner to catch, revise the
day before adding more topics.
