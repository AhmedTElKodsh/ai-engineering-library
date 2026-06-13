# Module 2: First-Principles AI Mechanisms

## Understand, Test, And Improve Model Behavior

**Duration:** 4 required phases plus 2 extended model-internals labs  
**Expected time to finish:** 16-24 hours for the required path, plus 8-12 optional hours for extended internals  
**Prerequisites:** Module 1 or equivalent Python and AI engineering fluency  
**Pedagogy:** first-principles implementation, worked traces, tests-first practice, tiny visual mechanisms, and model-decision reflection

## Module Overview

Module 1 let learners run and modify a complete FinAgent product slice. Module 2 slows down and opens the pieces that were previously treated as future model internals.

Use `MODEL_MECHANISM_EVIDENCE_CHECKLIST.md` before revising Module 2 lessons
that touch tokenization, embeddings, attention, transformer flow, decoding, or
training-versus-inference decisions.

| Question | Answer |
| --- | --- |
| What will I build? | Tiny, inspectable versions of tokenization, embeddings, attention, context budgeting, and decoding for market text. |
| What skill will I practice? | Observe, reason, modify, verify: predict intermediate values, implement one primitive, inspect traces, and prove the behavior with tests. |
| How does this prepare me for the next module? | It teaches what model-facing mechanisms do before Module 3 connects real APIs, PromptOps, tools, and MCP boundaries. |

**Previous:** you built the whole FinAgent workflow.  
**Current:** you learn how model-facing mechanisms transform text, vectors, and context.  
**Next:** you connect that behavior to tools and provider boundaries.

Learners build small versions of the mechanisms that most directly improve
early AI engineering decisions:

1. tokenization
2. embeddings and similarity search
3. attention
4. context-window and decoding decisions

Tiny transformer assembly and training-versus-inference math are available as
extended concepts after the learner can already explain the required path.

The goal is not to recreate a production framework. The goal is mechanical understanding. Learners should finish this module able to explain what happens between a stock-market sentence and a model output.

The book synthesis includes deeper from-scratch LLM training. Layer 1 only takes the parts that are runnable now and help a junior AI engineer make better system decisions: tokens, vectors, attention traces, context budgets, decoding choices, and why a bigger model is not automatically the right fix.

## Minimum Path And Advanced Doorway

Use `../../LEARNER_JOURNEY_MAP.md` as the course-level map. Module 2's minimum
path is mechanical intuition: tokenization, embeddings, attention, context
windows, decoding, and model-choice decisions at toy scale.

The advanced doorway is Course 2 depth: tensors, losses, optimization,
transformer blocks, backpropagation, and neural-network training. Module 2 keeps
those ideas available without making them a required timeline cost.

## Story

FinAgent can now produce deterministic stock summaries, but it still does not understand the model-facing side of the system. Before adding LLM calls, retrieval, or agent workflows, learners need to answer practical questions:

- How does text become model input?
- Why do punctuation and spacing affect token counts?
- How does similarity search retrieve related market notes?
- What does attention actually compute?
- How do context limits and decoding choices affect reliability?

Each week answers one of those questions with plain Python.

Module 2 rebuilds the ideas underneath FinAgent in a fixed sequence:
tokenization -> embeddings -> attention -> context and decoding. Each lesson
should produce a tiny working artifact and a written explanation in the
learner's own words.

## Evidence-Informed Teaching Mix

Module 2 uses the updated pedagogy map this way:

| Skill | Teaching method | Learner evidence |
| --- | --- | --- |
| Understanding model mechanisms | worked examples and first-principles implementation | trace table for tokens, vectors, scores, weights, or shapes |
| Building confidence with math | tiny numbers, visual tables, and test-driven learning | focused tests plus intermediate value inspection |
| Avoiding toy-model overtrust | reflection and model-decision framing | note separating what the toy proves from what production requires |
| Preparing for Module 3 | whole-part-whole callback | explanation of how the primitive supports FinAgent integration |

## Folder Map

The folder names stay stable for tests and links. The learner-facing titles below are the names to use in docs, plans, and conversations.

| Phase | Folder | Learner-facing title | Learner deliverable | Verification from repo root |
| --- | --- | --- | --- | --- |
| Phase 1 | `week-01-tokenization` | Market Text Tokenization Lab | Build a tiny byte-pair tokenizer for market text | `python -m pytest curriculum/main-track/02-module-2-first-principles/week-01-tokenization/tests -v` |
| Phase 2 | `week-02-embeddings` | Market Note Similarity Search Lab | Build vector similarity and a tiny retrieval index | `python -m pytest curriculum/main-track/02-module-2-first-principles/week-02-embeddings/tests -v` |
| Phase 3 | `week-03-attention` | Market Context Attention Lab | Implement scaled dot-product attention | `python -m pytest curriculum/main-track/02-module-2-first-principles/week-03-attention/tests -v` |
| Phase 4 | `week-04-context-decoding` | Context Window And Decoding Lab | Explore context windows, decoding, and model selection through inspectable functions | `python -m pytest curriculum/main-track/02-module-2-first-principles/week-04-context-decoding/tests -v` |

The required phases are learner-ready now. Tests are expected to fail before
learners complete the TODOs in each `workbench.py`.

## Extended Concepts

Move to these only after the required Phase 4 artifact and model-decision note:

| Extended order | Folder | When to use it |
| ---: | --- | --- |
| 1 | `../../extended-concepts/01-model-internals/week-01-tiny-transformer` | When the learner wants to inspect transformer block assembly after attention and context windows. |
| 2 | `../../extended-concepts/01-model-internals/week-02-training-vs-inference` | When the learner needs deeper loss/training intuition before Course 2 or model-adaptation work. |

## Learner Readiness Boundary

Assign phases in order. Each phase has a README, learner-editable
`workbench.py`, tests that collect cleanly, hints, and a rubric.

## Teaching Contract

Every phase should follow the same learner loop:

1. Read the problem in a FinAgent story.
2. Predict what should happen before running the tests.
3. Trace the workbench file before editing.
4. Build one small primitive at a time.
5. Run tests and use failures as feedback.
6. Inspect an intermediate value when the result is surprising.
7. Reflect on what the tests prove and what production would still require.

Workbench tests are expected to fail before learners complete the TODOs.

Expected first run: each learner-ready phase should collect tests cleanly and
then fail on TODO behavior. Import errors, missing fixtures, or unclear planned
folders are curriculum issues, not learner performance issues.

## Style Rubric

A strong Module 2 learner:

- implements the primitive before reaching for a library
- explains the concept without copying the lesson text
- uses tests to reason about numeric and text edge cases
- inspects intermediate values such as token IDs, vectors, scores, and weights
- connects each mechanism back to FinAgent's market text and source grounding
- uses AI for conceptual clarification, not for complete solutions
- writes a short model-decision note after each week: when this primitive is enough, when a library/API is better, and what failure mode still remains

## Start Here

```powershell
cd curriculum\main-track\02-module-2-first-principles\week-01-tokenization
python -m pytest tests -v
```

Then open `README.md` in the phase folder and work through the TODOs in `workbench.py`.

After Phase 1, continue:

```powershell
cd ..\week-02-embeddings
python -m pytest tests -v
```

After Phase 2, continue:

```powershell
cd ..\week-03-attention
python -m pytest tests -v
```

After Phase 3, continue:

```powershell
cd ..\week-04-context-decoding
python -m pytest tests -v
```

## Checkpoint Gate

Learners are ready for Module 3 when they can:

- explain how bytes, tokens, and token IDs differ
- implement basic vector similarity without a library
- explain attention using queries, keys, values, softmax, and weighted sums
- explain why prompting, retrieval, tools, or deterministic code may be better than asking for a larger model
- connect these mechanisms back to FinAgent's stock analysis workflow
- produce trace notes for token IDs, vectors, attention weights, context budgets, decoding choices, and model-boundary decisions

## Connection To Module 3

Module 3 turns understanding into integration. After learners know what model-facing mechanisms do, they will connect model APIs, prompts, tools, data, and external capabilities through tested contracts and safer MCP-style boundaries.
