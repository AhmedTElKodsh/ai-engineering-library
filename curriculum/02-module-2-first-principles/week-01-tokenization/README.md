# Phase 1: Market Text Tokenization Lab

Folder: `week-01-tokenization`  
Expected time to finish: 4-6 hours  
File to edit: `workbench.py`  
Test folder: `tests/`  
Core test file: `tests/test_tiny_tokenizer.py`

## Learning Goal

Build a small byte-pair tokenizer from scratch and explain how raw market text becomes model-ready token IDs.

## Success Looks Like

- The tests pass because your tokenizer handles bytes, merges, encoding, decoding, and token-budget estimates.
- Your trace note explains how one market sentence changes from text into bytes, token IDs, and decoded text.
- Your reflection names what this toy tokenizer teaches and what a production tokenizer would still need.

## Real-World Context

FinAgent will eventually summarize stock news, filings, and analyst notes. Before learners trust an LLM summary, they need to understand the first transformation in the pipeline: text is not sent to a model as words. It is converted into bytes, merged into tokens, and represented as IDs.

This chapter keeps the scope small and deterministic. You will not use `tiktoken`, `transformers`, NumPy, or an LLM. You will build the mechanism with plain Python.

## Story

FinAgent has a strange bug report:

> The assistant treats `NVDA beats estimates` and `NVDA beats estimates!` differently, and it sometimes splits short ticker text in surprising ways.

Your job is not to patch the symptom. Your job is to open the machine and inspect how text becomes tokens.

## Read

Tokenization is the bridge between human text and model computation.

In this chapter, you will work with a tiny version of byte-pair encoding:

1. Convert text into byte values.
2. Start with one token per byte.
3. Count adjacent token pairs.
4. Merge the most frequent pair into a new token.
5. Repeat until the vocabulary reaches a target size.
6. Encode new text by applying learned merges.
7. Decode token IDs back to text.

The point is not to match a production tokenizer. The point is to see the moving parts clearly enough that production tokenizers stop feeling magical.

## Trace

Before editing code, inspect `workbench.py` and answer:

1. Which functions operate on raw strings?
2. Which functions operate on byte values?
3. Which functions operate on token IDs?
4. Where is the merge history stored?
5. Which tests describe the smallest correct behavior?

## Explain

Write short answers before coding:

1. Why does `AAPL` become bytes before it becomes tokens?
2. Why can punctuation change token boundaries?
3. What does a tokenizer lose if decode cannot reconstruct the original text?
4. Why should FinAgent log token counts before sending long market notes to a model?

## Modify

Start with the smallest behavior:

1. Make `text_to_bytes` return integer byte values.
2. Make `bytes_to_text` reconstruct the original text.
3. Run the tests and read the next failure.

Do not jump straight to the full BPE algorithm. Let each test teach the next missing piece.

## Create

Complete the TODOs in `workbench.py`:

- `text_to_bytes`
- `bytes_to_text`
- `count_adjacent_pairs`
- `merge_pair`
- `train_bpe`
- `encode`
- `decode`
- `estimate_token_budget`

Keep the implementation readable. This is a learning tokenizer, not a compressed production library.

## Verify

Run from this folder:

```powershell
python -m pytest tests -v
```

The tests intentionally fail at first. A good learner pass fixes one behavior at a time and reruns the suite after each change.

## Section Checkpoints

| Checkpoint | Focused command | Pause when you can... |
| --- | --- | --- |
| Byte round trip | `python -m pytest tests -k "text_to_bytes or bytes_to_text" -v` | explain why UTF-8 byte values are the tokenizer's first representation |
| Pair mechanics | `python -m pytest tests -k "count_adjacent_pairs or merge_pair" -v` | explain how pair counts become merge decisions |
| BPE training and use | `python -m pytest tests -k "train_bpe or encode or decode" -v` | explain how learned merges change token IDs while preserving text |
| Budget estimate | `python -m pytest tests -k estimate_token_budget -v` | explain why FinAgent should inspect token length before model calls |

## Reflect

- Which test failure gave you the clearest clue?
- Which part of tokenization was less word-like than you expected?
- What market text would be risky to tokenize without checking length first?
- What would a production tokenizer need that this tiny tokenizer does not include?

## Extension

Add one test using a short stock headline with punctuation, then explain how the punctuation affected the token count.

## Evidence Artifact

Write a short trace note:

```text
Input text:
First bytes:
First token IDs:
Merge that changed the sequence:
Decoded text:
What this proves:
What this toy tokenizer does not prove:
```

## Connection To Module 1

Module 1 packaged FinAgent behind a deterministic request/response boundary. Module 2 begins opening the model-facing side of that system. The stock summaries from Module 1 are still plain text, but this chapter shows how that text would enter a model pipeline.
