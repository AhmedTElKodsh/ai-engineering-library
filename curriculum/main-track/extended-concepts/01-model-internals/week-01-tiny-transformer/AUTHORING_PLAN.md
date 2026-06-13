# Authoring Plan: Phase 4 Tiny Transformer Block

This plan applies `curriculum/templates/lesson-quality-checklist.md` to the next concrete curriculum slice before lesson files are written.

## Lesson Identity

- Module: Module 2 - First Principles and Model Intuition
- Phase or project: Phase 4 - Tiny Transformer Block
- Expected time to finish: 5-7 hours
- Stable folder: `curriculum/extended-concepts/01-model-internals/week-01-tiny-transformer`
- Learner-facing goal: assemble a tiny transformer-style forward pass from embeddings, attention, residual addition, normalization, and a small feed-forward step.
- FinAgent or practical AI engineering callback: explain how a market sentence becomes contextual token representations before Module 3 wraps real LLM APIs.
- Primary concept: transformer block data flow.
- Secondary operational concern: deterministic inspection of intermediate values for debugging and model-selection reasoning.

## Learner Surface

- [x] `README.md` includes learning goal, realistic context, story, trace, task, verification, reflection, and extension.
- [x] `workbench.py` is the primary learner-editable file.
- [x] `workbench.py` imports cleanly before TODOs are completed.
- [x] `hints.md` uses progressive hints without revealing the full implementation early.
- [x] `rubric.md` covers correctness, learning process, FinAgent transfer, code quality, and verification.
- [x] No learner-facing file is named `solution.py`, `answer_key.py`, or `solution_template.py`.
- [x] No full solution appears in the learner-facing folder.

## Planned Learner Files

```text
week-01-tiny-transformer/
  README.md
  workbench.py
  hints.md
  rubric.md
  tests/
    test_tiny_transformer.py
```

## Pedagogy

- [x] Engaging problem frame: FinAgent can retrieve market notes, but before using a real LLM wrapper the learner must see how token representations become contextual representations.
- [x] Cafe-style storytelling: the README explains the transformer block like a knowledgeable friend at a cafe, using tiny vectors and a notebook sketch before formal transformer language.
- [x] Visual Map: include a Mermaid flowchart or mind map showing token embeddings -> attention -> residual -> normalization -> feed-forward -> contextual vectors.
- [x] Cafe Visual Break: before publishing, search the web for one current, high-quality visual/video explanation of attention or transformer blocks, then add the best optional link with a one-sentence reason.
- [x] Deeper references: add optional book/course links from `curriculum/resources/curated-learning-resources.md`, favoring 3Blue1Brown, Karpathy, DeepLearning.AI, or Hands-On Large Language Models where appropriate.
- [x] Action before lecture: learners inspect a tiny token sequence, embedding table, and expected trace before reading deeper transformer explanation.
- [x] Concept after context: residuals, normalization, and feed-forward layers are introduced only after learners see attention output shape.
- [x] Whole-part-whole is visible: learners see the full token-to-contextual-vector flow, implement one transformer block, then reconnect it to Module 3 API boundaries.
- [x] Before You Run prompt asks learners to predict which token should carry the strongest market-context signal after attention.
- [x] Evidence First prompt asks learners to inspect the first failing test and the intermediate trace fields before changing code.
- [x] Smallest Change guidance starts with vector shape validation before attention or feed-forward logic.
- [x] Explain Like a Teammate prompt asks for 2-4 sentences explaining residual connections and normalization.
- [x] One Step Stronger asks for an edge-case test around mismatched dimensions or empty token sequences.
- [x] Reflection asks why this tiny block teaches useful intuition without replacing real transformer libraries.
- [x] Learner-facing prose stays coaching-oriented and avoids research-report or manifesto style.

## Test Design

- [x] Tests import the learner workbench before learner edits.
- [x] Tests isolate generic `workbench` imports when collection spans multiple lesson folders.
- [x] Test names describe learner-visible behavior.
- [x] Assertion messages point to the intended concept.
- [x] Starting failures are expected TODO failures, not import errors or path errors.
- [x] Edge cases are included.
- [x] Failure modes are included for mismatched dimensions, empty input, and traceability gaps.
- [x] Verification command uses `python -m pytest`.

## Planned Test Behaviors

The learner-visible tests should check:

1. vector addition rejects mismatched dimensions
2. layer normalization produces stable centered values for a tiny vector
3. embedding lookup preserves token order
4. projection keeps deterministic vector shapes
5. self-attention returns one contextual vector per token
6. residual output keeps the original signal visible
7. feed-forward output is deterministic and inspectable
8. `transformer_block` returns output vectors plus a trace dictionary
9. trace includes attention weights, normalized vectors, and final output shapes

The starting learner state may produce expected TODO assertion failures, but it must not produce import errors.

## Reference Validation

- [x] Reviewer-only intended behavior is documented under `.kiro/specs/curriculum-planning/implementation-notes/extended-concepts-01-model-internals-week-01-tiny-transformer-reference.md`.
- [x] Reference behavior proves the learner-visible tests are solvable.
- [x] Hidden or reviewer-only notes cover edge cases not fully shown to learners.
- [x] No API, network, secret, GPU, NumPy, PyTorch, or transformer library dependency is required.

## Scope Control

- [x] The lesson teaches one primary concept: transformer block data flow.
- [x] The lesson adds one secondary operational concern: traceable intermediate values.
- [x] Extension work is clearly marked as optional.
- [x] Full GPT training, backpropagation, optimized matrix math, token sampling, and provider APIs stay out of Phase 4.

## Completion Evidence

Scaffold command:

```powershell
python -m pytest --collect-only tests -q
```

Learner-start command:

```powershell
python -m pytest tests -v
```

Expected starting result: collection succeeds; learner-visible tests fail only because `workbench.py` TODO behavior is incomplete.

Reference validation path: `.kiro/specs/curriculum-planning/implementation-notes/extended-concepts-01-model-internals-week-01-tiny-transformer-reference.md`

Follow-up files to update:

- `curriculum/main-track/02-module-2-first-principles/README.md`
- `.kiro/specs/curriculum-planning/CURRICULUM_REVIEW.md`
## Learner Logic Enhancement

- Current capability the learner brings into this lesson: token IDs, embeddings, vector similarity, and scaled attention from the earlier Module 2 phases.
- New capability added by this lesson: assemble embeddings, projections, self-attention, residual addition, normalization, and feed-forward output into one traceable transformer-style block.
- Failure mode the learner must reproduce, inspect, or prevent: shape mismatches, missing trace fields, and treating a toy block as if it proved production LLM behavior.
- FinAgent or practical AI-system improvement: FinAgent model/API work can later be debugged with clearer intuition about token representations, context, and model-task boundaries.
- Explanation artifact the learner should leave with: a transformer trace naming input token IDs, embedding shape, attention weights, residual/normalized shapes, final output shape, and what the toy does not prove.

## Scope Boundary Enhancement

- Minimum required path: implement plain-Python vector addition, normalization, embedding lookup, projection, self-attention, residual output, feed-forward output, and trace metadata.
- Optional enrichment only after the minimum path works: add one focused edge case for empty input, unknown token IDs, or mismatched projection dimensions.
- Advanced doorway, named briefly but not required: Hugging Face/PyTorch implementation, encoder-decoder depth, decoder masking, fine-tuning, distillation, quantization, pruning, and ONNX optimization belong to Course 2/3.

## Evidence Portfolio Enhancement

- Technical evidence: passing tests for vector math, layer normalization, embedding lookup, projection, attention, residuals, feed-forward output, and trace keys.
- Failure evidence: at least one mismatched-dimension or empty-sequence case produces a useful error or trace.
- Explanation evidence: learner note explains how raw token embeddings become contextual representations.
- Transfer evidence: FinAgent callback explaining how this mechanism informs later provider, prompt, context-window, retrieval, or model-selection decisions.

## Source Evidence Enhancement

Use `../MODEL_MECHANISM_EVIDENCE_CHECKLIST.md` before changing this lesson.

- Local PDF `Natural Language Processing with Transformers`, p.81 and p.84-86 for transformer encoders updating token embeddings with self-attention, feed-forward layers, skip connections, and normalization.
- Local PDF `Natural Language Processing with Transformers`, p.99-100 and p.122 for the body/head split, task-specific heads, and decoder masking as model-task distinctions.
- Local PDF `Natural Language Processing with Transformers`, p.233-234 and p.254-255 for production efficiency tradeoffs that should remain an advanced doorway.
- B09 `Hands-On Large Language Models` and B13 `Build a Large Language Model (From Scratch)` for indexed support of visual intuition and Course 2 from-scratch depth.
- Assessment conversion rule: each source insight must become a trace field, shape check, edge-case test, toy limitation note, model-task distinction, or advanced-doorway boundary.

