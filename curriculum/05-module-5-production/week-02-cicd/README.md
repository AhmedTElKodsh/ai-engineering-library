# Week 2: CI-Style Regression Gate

## Learning Goal

Turn the golden eval scaffold into a repeatable release gate a teammate could run from a clean checkout.

**Expected time to finish:** 4-6 hours

## Real-World Context

Week 1 gave you examples and eval results. Week 2 asks the production question: should this change ship? A CI-style gate does not need a cloud provider yet. It needs version notes, a pass-rate threshold, visible failure categories, and commands that can be rerun.

## Visual Map

```mermaid
flowchart LR
    A["Golden eval run"] --> B["Pass-rate check"]
    C["Version note"] --> D["Release gate"]
    B --> D
    D --> E{"Ship?"}
    E -->|"pass"| F["Record release evidence"]
    E -->|"fail"| G["Fix regression before release"]
    H["Command checklist"] --> F
    H --> G
```

## Evidence First

Run:

```powershell
python -m pytest curriculum/05-module-5-production/week-02-cicd/tests -v
```

The first run should collect cleanly and fail on TODO behavior in `workbench.py`.

## Learner Outputs

| Artifact | Purpose |
| --- | --- |
| Eval run loader | Read a deterministic eval result without hidden service state. |
| Version note | Record prompt, model, index, and dataset versions. |
| Gate decision | Pass only when thresholds and failure counts allow release. |
| Command checklist | Show exact commands for unit tests, evals, and the gate. |
| Gate report | Give reviewers run ID, pass rate, status, reasons, versions, failures, and commands. |

## FinAgent Connection

FinAgent cannot rely on "it answered well when I tried it." A release gate catches missing citations, wrong abstentions, and safety mismatches before a capstone demo or portfolio recording.

## Cafe Visual Break

- Reference: [OpenAI evals guide](https://platform.openai.com/docs/guides/evals) - use it to connect small golden evals to repeatable quality checks.
- Reference: [GitHub Actions for Python](https://docs.github.com/en/actions/how-tos/writing-workflows/building-and-testing/building-and-testing-python) - use it later when turning this local checklist into an actual CI workflow.
