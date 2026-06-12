# FinAgent Portfolio README Template

Use this template for the final capstone README after Week 2 polish. Keep it
short, evidence-backed, and honest about limitations.

## Project

**Name:** FinAgent educational stock-market analysis assistant

**One-sentence purpose:** Explain public market context with cited evidence,
uncertainty labels, and educational-use boundaries.

## What It Does

- Validates ticker and user request inputs.
- Loads deterministic market and evidence fixtures.
- Retrieves or selects source-backed context.
- Produces an educational brief with citations.
- Refuses unsupported investment advice.
- Records trace or release evidence for reviewer inspection.

## What It Does Not Do

- It does not recommend trades.
- It does not predict prices as financial advice.
- It does not act as a licensed financial advisor.
- It does not guarantee real-time data freshness.
- It does not hide missing evidence behind confident language.

## Architecture

```text
request -> validation -> data/evidence load -> retrieval or source selection
        -> safety gate -> educational brief -> trace/release evidence
```

Replace this text block with a small diagram if your capstone includes one.

## Run It

```powershell
python -m pytest curriculum/06-capstone-projects/week-03-integration-build/tests -v
python -m pytest curriculum/06-capstone-projects/week-02-polish/tests -v
```

Add any local run command your capstone supports.

## Demo Script

1. Show the valid educational summary path.
2. Show the cited evidence or trace that supports the summary.
3. Show an unsupported or advice-seeking request being refused.
4. Show the release evidence summary.
5. Name one limitation and one future improvement.

## Evidence

| Claim | Artifact | Result |
|---|---|---|
| Input validation works | Test command or test file | Add pass/fail result |
| Advice refusal works | Test command or sample output | Add pass/fail result |
| Citations are traceable | Fixture, chunk, trace, or brief | Add source IDs |
| Release is reviewable | Release evidence summary | Add blocker status |

## Limitations

- Data freshness:
- Source coverage:
- Model or prompt variability:
- Safety boundary:
- Known missing feature:

## Tradeoffs

Explain why the capstone uses deterministic code, prompting, RAG, tools,
workflows, or avoids fine-tuning. Tie each choice to reliability, cost, latency,
safety, and maintainability.

## STAR Defense

**Situation:** What problem or unreliable behavior did this project address?

**Task:** What did you need the system to prove?

**Action:** What did you build, test, and revise?

**Result:** What evidence shows the result is inspectable and safer than a demo
that only works once?
