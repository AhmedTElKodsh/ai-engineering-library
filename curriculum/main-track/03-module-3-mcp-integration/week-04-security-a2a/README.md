# Phase 4: Secure MCP And Agent Handoff Lab

## Learning Logic

Use the course map in `curriculum/LEARNER_JOURNEY_MAP.md` and the local module README to keep this lesson bounded.

| Question | Learner-facing answer |
| --- | --- |
| What can I do now? | validate tool and context boundaries. |
| What new capability am I adding? | add role policy, injection checks, secret redaction, and handoff gates. |
| What failure does this help me catch? | unauthorized tools, leaked secrets, unsafe handoffs, and injection text. |
| How does this improve FinAgent or a practical AI system? | keeps FinAgent collaborations bounded and auditable. |
| What should I be able to explain afterward? | how security policy travels with tool and agent handoffs. |

## Minimum Path, Enrichment, And Doorway

- **Minimum path:** read the scenario, inspect the tests or fixtures, complete the TODOs in `workbench.py`, run the verification command, and write the reflection/evidence note.
- **Optional enrichment:** add one edge case, comparison, or small test after the required behavior works.
- **Advanced doorway:** notice the later advanced topic this prepares for, then return to the bounded Course 1 task.

## Evidence Portfolio

Leave this lesson with technical evidence, failure evidence, explanation evidence, and transfer evidence. A passing test alone is not the whole learning outcome.

Folder: `week-04-security-a2a`  
Expected time to finish: 4-6 hours  
File to edit: `workbench.py`  
Test folder: `tests/`  
Core test file: `tests/test_security_handoff.py`

## Learning Goal

Add permission checks, injection resistance, secret-safe configuration, and a small agent-to-agent handoff contract before exposing capabilities through MCP-style integration.

## What You Will Build

- permission checks for tool access
- prompt-injection refusal examples
- secret-safe configuration boundaries
- a small handoff object between two assistant roles
- tests or acceptance checks for allowed, refused, and malformed handoffs

## Success Looks Like

- Allowed actions are explicit and narrow.
- Unsafe instructions are refused even when they appear inside context.
- Secrets are referenced by configuration names, never copied into prompts or logs.
- Handoff messages include enough context to continue work without exposing unrelated state.

## Learner Loop

1. Read the permission and handoff contract.
2. Inspect the injection and secret-safety examples.
3. Predict which request should be refused.
4. Implement one permission or refusal behavior.
5. Run the smallest relevant test.
6. Record what the trace proves.
7. Reflect on what MCP integration should never make easier by accident.

## Expected First Run And Checkpoints

Run `python -m pytest tests -v`. The first run should collect cleanly and fail
on TODO behavior.

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Permissions | `python -m pytest tests -k is_tool_allowed -v` | explain why role policy and explicit tool allowlists both matter |
| Injection and secrets | `python -m pytest tests -k "detect_prompt_injection or redact_secret_values" -v` | explain how unsafe text and secret values are kept out of prompts/logs |
| Handoff boundary | `python -m pytest tests -k "build_handoff or authorize_handoff_tool_call" -v` | explain what context crosses roles and what stays blocked |

## Evidence Artifact

```text
Allowed action:
Refused action:
Injection signal:
Secret-safe configuration rule:
Handoff fields:
Remaining security risk:
```

## Connection To Module 4

This phase closes Module 3 by making integration safer. Module 4 can then build richer agent workflows on top of explicit permissions, traces, and refusal behavior.

