# Model Mechanism Evidence Checklist

Use this checklist before revising Module 2 lessons that teach tokenization, embeddings, attention, transformer flow, decoding, or training-versus-inference decisions.

This file is an authoring aid. It keeps Module 2 first-principles work small, inspectable, and connected to later engineering decisions without turning Course 1 into a framework or model-training course.

## Source Evidence Baseline

| Source | Evidence locator | Planning takeaway | Use in Module 2 |
|---|---|---|---|
| B09 `Hands-On Large Language Models` | Indexed source metadata and corpus retrieval available | Visual LLM intuition, embeddings, and RAG concepts support Course 1 mental models. | Keep explanations concrete and diagrammable before using production libraries. |
| B13 `Build a Large Language Model (From Scratch)` | Indexed source metadata and corpus retrieval available | From-scratch LLM internals are useful as Course 2 depth, but Course 1 should keep toy mechanisms bounded. | Use only the smallest runnable primitives in Course 1; defer full pretraining depth. |
| Local PDF `Natural Language Processing with Transformers` | p.41 and p.53-57 | Transformer systems require tokenization before numerical model input; character, word, and subword tokenization have different tradeoffs. | Require tokenization lessons to show token IDs, vocabulary behavior, and what gets lost or preserved. |
| Local PDF `Natural Language Processing with Transformers` | p.81 and p.84-86 | Transformer encoders update token embeddings into contextual representations with self-attention, feed-forward layers, skip connections, and normalization. | Require transformer lessons to expose shapes, attention weights, residuals, normalized vectors, and final outputs. |
| Local PDF `Natural Language Processing with Transformers` | p.99-100 and p.122 | Transformer models separate a task-independent body from task-specific heads; decoder masking changes generation behavior. | Require model-decision notes to distinguish representation learning, classification, question answering, and generation. |
| Local PDF `Natural Language Processing with Transformers` | p.151 | Decoding turns logits into token choices through approximate search methods. | Keep decoding lessons toy-scale and inspectable, with no live model dependency. |
| Local PDF `Natural Language Processing with Transformers` | p.233-234 and p.254-255 | Production transformer efficiency involves latency, memory, distillation, quantization, pruning, and graph optimization tradeoffs. | Name these as advanced doorway topics; do not make them required Course 1 implementation. |

Do not copy book text into learner-facing files. Use these locators to justify small mechanisms, trace fields, and scope boundaries.

## Authoring Gate

A Module 2 lesson is ready to revise only when its `AUTHORING_PLAN.md` answers all of these:

| Question | Required answer |
|---|---|
| What mechanism is being inspected? | Name tokens, vectors, attention weights, shapes, logits, decoding choices, or training/inference state. |
| What intermediate value must the learner see? | Require a trace table, dictionary, fixture, printout, or assertion for the relevant mechanism. |
| What does the toy prove? | Name the concrete behavior the toy implementation demonstrates. |
| What does the toy not prove? | Name the production behavior handled by real frameworks, larger data, optimization, or training systems. |
| What decision does this prepare? | Connect the mechanism to provider choice, prompt design, retrieval, context limits, model adaptation, or production tradeoffs. |
| What stays advanced? | Label full model training, Hugging Face implementation, GPU workflows, distillation, quantization, pruning, and ONNX as Course 2/3 depth. |

## Minimum Evidence Set

Every mechanism lesson should include at least five of these checks.

| Check type | Required learner evidence |
|---|---|
| Token trace | Input text maps to tokens, token IDs, or vocabulary entries. |
| Shape trace | Intermediate vectors, matrices, or sequence outputs have visible dimensions. |
| Weight trace | Attention or decoding choices expose weights, scores, probabilities, or selected tokens. |
| Edge case | Empty input, unknown token, mismatched dimensions, truncation, or out-of-scope choice is handled deliberately. |
| Toy limitation | Reflection explains what the small implementation leaves out. |
| Production callback | Reflection explains when a library, API, or pretrained model is the practical choice. |
| Model-task note | Learner distinguishes classification, retrieval, summarization, question answering, or generation behavior. |
| Advanced doorway | Later-depth topics are named without becoming required implementation. |

## Scope Boundaries

- Do not require Hugging Face, PyTorch, TensorFlow, GPU access, or live model downloads in Module 2 learner labs.
- Do not add full transformer training, pretraining, fine-tuning, distillation, quantization, pruning, or ONNX implementation to Course 1.
- Do not teach model internals as a replacement for provider boundaries, evals, RAG, or safety checks.
- Keep toy mechanisms connected to FinAgent decisions: token counts, retrieval similarity, attention/context, decoding, and when not to train a model.
