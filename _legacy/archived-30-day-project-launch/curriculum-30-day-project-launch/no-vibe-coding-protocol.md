# No-Vibe-Coding Protocol

Timing: read this in 10-15 minutes before Day 1. Use the daily self-check in
3-5 minutes before every commit.

Schedule rule: AI help should shorten diagnosis, not hide learning. Spend at
least 10 minutes inspecting the test, trace, or docs yourself before asking for
help. If AI assistance lasts more than 20 minutes, write the exact blocker and
the next learner-written action in the daily log.

This route allows AI assistants, but the learner remains the engineer. Every
important design, line of code, test, and claim must be understandable and
defensible by the learner.

## Allowed AI Assistance

- Ask for explanations of a concept, error, traceback, or failing test.
- Ask for hints after making a real attempt.
- Ask for test ideas and edge cases.
- Ask for debugging questions that help you inspect evidence.
- Ask for pseudocode after you have tried the implementation.
- Ask for review of learner-written code, tests, notes, or architecture.

## Not Allowed

- Pasting complete generated solutions before attempting the task.
- Accepting code you cannot explain.
- Using AI to bypass tests or hide failing behavior.
- Hiding generated code in commits.
- Using AI to fabricate sources, citations, eval results, logs, or screenshots.
- Letting an assistant choose scope expansion without writing it in the backlog.

## Daily Self-Check

Answer these before you commit:

1. What did I write by hand?
2. What did AI help me understand?
3. Which test failed first?
4. Which test passed after my change?
5. Can I explain the tradeoff?
6. What evidence did I inspect before changing code?
7. What optional help did I use only after naming the failure?

## Reference After Effort

Use AI help, hints, examples, documentation, or videos after you have made a
real attempt and can name the concrete blocker:

- failing test name
- assertion message
- malformed fixture
- missing trace field
- unclear schema rule
- unsafe output or refusal gap

Do not ask for a finished implementation when the next useful step is to inspect
the failure, narrow the input, or write the smallest test.

## Commit Note Rule

If AI helped, say so plainly in the engineering log:

```text
AI assistance used: I asked for debugging questions about the failing citation
test, then wrote and tested the fix myself.
```

## Review Rule

Before a milestone, pick one file or workflow and explain it without opening an
AI chat. If you cannot explain it, revise the code or docs until you can.

Use the evidence portfolio habit from `teaching-method.md`: technical evidence,
failure evidence, explanation evidence, and transfer evidence. A clean demo does
not replace those four evidence types.
