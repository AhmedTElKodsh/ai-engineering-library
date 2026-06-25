# Phase 8: Production Multi-Agent Boundaries Lab

Expected time to finish: 4-6 hours

## Learning Logic

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | coordinate small role-based reviews. |
| What new capability am I adding? | add production tool policy, auth checks, max steps, and stop reasons. |
| What failure does this help me catch? | runaway agent loops, unauthorized calls, and missing run reports. |
| How does this improve FinAgent or a practical AI system? | keeps advanced FinAgent agent experiments auditable and stoppable. |
| What should I be able to explain afterward? | how production boundaries change multi-agent design. |

## Before You Run

Predict what should happen if an agent tries to use a tool that is not in policy. The action should be refused and recorded; it should not quietly execute.

## Worked Trace

Read the tests as a production boundary:

```text
authorize_action -> append_action -> should_stop -> build_agent_run_report
```

This is optional advanced doorway practice. The Course 1 core is explicit workflow reliability; this lab shows what extra controls become necessary when multiple agents and tools enter the picture.

## Micro-Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| First 20 minutes | `python -m pytest tests -k authorize -v` | explain why allowed tool plus reason are required |
| Stop boundary | `python -m pytest tests -k stop -v` | show how max steps prevents runaway work |
| Action append | `python -m pytest tests -k append -v` | explain refused versus recorded actions |
| Minimum complete | `python -m pytest tests -v` | walk through the final run report |

## Smallest Change

Do not add real agents, network calls, or tool execution. Keep this as a policy and trace lab.

Use `hints.md` after naming the first failed boundary. Check `rubric.md` before final evidence.

## Evidence Artifact

```text
Smallest test I ran:
Policy rule fixed:
Runaway or unauthorized path handled:
Run-report field I would inspect in production:
AI assistance used:
```

