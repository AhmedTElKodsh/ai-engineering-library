# Learner Journey Map

This course is not an encyclopedia of AI Engineering or Generative AI. It is the
foundation path for a learner who wants enough practical judgment to build,
test, evaluate, and explain small AI systems before deep-diving later.

## Course Promise

By the end of Course 1, the learner can design, build, test, evaluate, and
explain a small production-shaped AI assistant using Python, LLM APIs,
structured prompts, tools, retrieval, bounded workflows, safety boundaries, and
reliability practices.

The goal is solid ground, not total coverage.

## Capability Ladder

| Stage | Learner Can Now | Main Failure Practiced | Evidence |
| --- | --- | --- | --- |
| Module 0 | Use Python, pytest, config, and small data pipelines | unclear traceback, invalid input, weak function boundary | diagnostic result, passing workbench tests, edge-case note |
| Module 1 | Run, trace, modify, and package a deterministic FinAgent slice | unsafe summary, bad ticker, weak boundary | trace note, PR-style summary, request/response note |
| Module 2 | Explain tokens, embeddings, attention, context, and training vs inference at toy scale | overtrusting model internals or magic terms | mechanism trace, model-boundary decision note |
| Module 3 | Wrap model, prompt, tool, and MCP-style boundaries behind testable contracts | malformed prompt/output/tool input, secret or permission leak | prompt tests, typed tool schema, trace metadata |
| Web Data Bridge | Acquire and package small web/API datasets responsibly | broken selector, missing provenance, stale data, unsafe collection | source checklist, fixture tests, quality report, RAG-ready chunks |
| Module 4 | Build AI-ready data, cited RAG, and bounded workflow/agent patterns | unsupported answer, missing citation, runaway loop | retrieval log, abstention case, workflow trace |
| Module 5 | Add evals, CI-style gates, service boundaries, logs, cost, latency, and model-choice discipline | flaky output, regression, unobservable failure, premature fine-tune | golden eval, release gate, logs, model-selection note |
| Module 6 | Assemble and defend a portfolio-ready FinAgent capstone | overclaiming, unsupported advice, unreviewable system | capstone demo, eval harness, limitations note, interview defense |

## Repeated Lesson Logic

Every lesson should make these five questions visible:

1. What can I do now?
2. What new capability am I adding?
3. What failure does this help me catch?
4. How does this improve FinAgent or a practical AI system?
5. What should I be able to explain afterward?

## Exit Rubric

Course 1 is successful when the learner can show evidence for each capability:

| Capability | Minimum Evidence |
| --- | --- |
| Design a small AI assistant boundary | architecture or boundary note |
| Implement structured LLM or prompt behavior | tested prompt, schema, or provider artifact |
| Use tools safely | typed tool contract with malformed-input test |
| Retrieve grounded context | citation and abstention behavior |
| Test deterministic and AI behavior | unit tests plus eval or golden examples |
| Evaluate answer quality | scored run, failure categories, or review note |
| Operate locally and explain failures | logs, release command, limitation note |
| Defend tradeoffs | model/system decision note and interview-style explanation |

## Minimum Path

The minimum path is the required path to the Course 1 exit standard:

- complete the diagnostic-driven Python foundation
- build the deterministic FinAgent whole-game slice
- complete the first-principles mechanism labs
- complete LLM/prompt/tool/MCP-style boundary labs
- complete the required web-data bridge
- complete AI-ready data, RAG, and bounded workflow labs
- complete production reliability and model-decision labs
- complete the FinAgent capstone build and polish evidence

## Optional Enrichment

Optional enrichment may include deeper scraping, framework variants, additional
edge cases, alternate capstones, and advanced previews. It should never become a
hidden prerequisite for Course 1 completion.

## Advanced Doorways

Course 1 prepares learners for later deep dives without teaching them fully:

| Doorway | Course 1 Treatment | Later Depth |
| --- | --- | --- |
| ML and neural network foundations | intuition, toy mechanisms, train vs inference decisions | Course 2 |
| Fine-tuning | decision framework and optional adaptation lab | Course 3 or specialization |
| GraphRAG and advanced retrieval | cited RAG, abstention, metadata discipline | Course 3 |
| Multimodal systems | recognition and requirements awareness | Course 3 or specialization |
| Advanced agents | bounded workflows and small multi-role patterns | Course 3 |
| Full LLMOps and governance | evals, logs, release gates, safety basics | Course 3 |

Use this map to keep scope honest: advanced topics are named as doorways, not
turned into surprise requirements.
