# Phase 7: Multi-Role Review Workflow Lab

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | orchestrate bounded workflow recovery. |
| What new capability am I adding? | split review work across engineer, safety, and writer roles. |
| What failure does this help me catch? | over-shared context, missed safety review, and unclear approval outcomes. |
| How does this improve FinAgent or a practical AI system? | prepares FinAgent review flows for multi-role critique without chaos. |
| What should I be able to explain afterward? | how role ownership and handoff shape affect review quality. |

## Before You Run

Predict which roles should review a high-risk financial summary. Safety should be included; a generic one-role review is not enough.

## Worked Trace

Read the tests as a handoff story:

```text
assign_roles -> create_handoff -> collect_role_reviews -> decide_collaboration_outcome -> run_collaboration
```

The design rule is minimal context. A handoff should include only what the next role needs, not the whole hidden conversation.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k assign_roles -v` | explain why high risk adds safety review |
| Handoff shape | `python -m pytest tests -k handoff -v` | list exactly what context crosses the boundary |
| Review outcome | `python -m pytest tests -k outcome -v` | explain critical, revise, and approve decisions |
| Minimum complete | `python -m pytest tests -v` | show the full role-to-outcome trace |

## Smallest Change

Keep the workflow deterministic. Do not simulate personalities; implement ownership, severity, and outcome rules.

Use `hints.md` after naming the first failing review boundary. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Role or handoff rule fixed:
Risk that now triggers review:
Why the final outcome is reviewable:
AI assistance used:
```

