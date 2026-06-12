# No-Vibe-Coding Protocol

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

## Commit Note Rule

If AI helped, say so plainly in the engineering log:

```text
AI assistance used: I asked for debugging questions about the failing citation
test, then wrote and tested the fix myself.
```

## Review Rule

Before a milestone, pick one file or workflow and explain it without opening an
AI chat. If you cannot explain it, revise the code or docs until you can.
