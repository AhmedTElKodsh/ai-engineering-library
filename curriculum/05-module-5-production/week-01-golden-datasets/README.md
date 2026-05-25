# Week 1: Golden Eval Scaffold

## Learning Goal

Create a small golden dataset and an eval runner that catches unsupported answers, missing citations, and unsafe finance claims.

**Expected time to finish:** 4-6 hours

## Real-World Context

Module 4 produced cited and abstaining RAG behavior. Module 5 starts by freezing a few examples that define what "good enough" means before prompt tweaks, workflow changes, or model swaps.

## Visual Map

```mermaid
flowchart LR
    A["Golden examples"] --> B["Observed answers"]
    B --> C["Eval checks"]
    C --> D["Failure categories"]
    D --> E["Release gate summary"]
```

## Evidence First

Run:

```powershell
python -m pytest curriculum/05-module-5-production/week-01-golden-datasets/tests -v
```

The first run should collect and fail on TODO behavior.

## Learner Outputs

| Artifact | Purpose |
| --- | --- |
| Golden examples | Define supported, abstained, and safety-boundary cases. |
| Eval result rows | Show pass/fail category, expected behavior, and observed behavior. |
| Summary report | Count total, passed, failed, and failure categories. |
| Failure note | Explain one false positive, false negative, or ambiguous case. |

## FinAgent Connection

FinAgent needs regression evidence for citation failures, unsupported investment advice, stale data, and malformed source records before it becomes a portfolio capstone.

## Cafe Visual Break

- Reference: [OpenAI evaluation best practices](https://platform.openai.com/docs/guides/evaluation-best-practices) - use it to compare deterministic checks, human review, and task-specific eval cases.
