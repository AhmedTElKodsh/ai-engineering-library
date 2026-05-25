"""Tiny byte-pair tokenizer workbench for Module 2 Phase 1.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class TinyTokenizer:
    """A minimal tokenizer state produced by training."""

    merges: list[tuple[int, int]]
    vocabulary: dict[int, tuple[int, ...]]


def text_to_bytes(text: str) -> list[int]:
    """Convert text to UTF-8 byte values."""
    # TODO: Return a list of integer byte values for the input text.
    return []


def bytes_to_text(byte_values: list[int]) -> str:
    """Convert UTF-8 byte values back into text."""
    # TODO: Reconstruct the original string from integer byte values.
    return ""


def count_adjacent_pairs(tokens: list[int]) -> dict[tuple[int, int], int]:
    """Count how often each adjacent token pair appears."""
    # TODO: Count pairs such as [65, 65, 66] -> {(65, 65): 1, (65, 66): 1}.
    return {}


def merge_pair(tokens: list[int], pair: tuple[int, int], new_token_id: int) -> list[int]:
    """Replace every non-overlapping occurrence of pair with new_token_id."""
    # TODO: Walk left to right and merge non-overlapping pair occurrences.
    return tokens


def train_bpe(corpus: str, target_vocab_size: int) -> TinyTokenizer:
    """Train a tiny BPE tokenizer on the provided corpus."""
    # TODO: Start with byte vocabulary, learn the most frequent pair merges,
    # and return TinyTokenizer with merge history and token byte sequences.
    return TinyTokenizer(merges=[], vocabulary={})


def encode(text: str, tokenizer: TinyTokenizer) -> list[int]:
    """Encode text by applying learned merges in training order."""
    # TODO: Convert text to bytes, then apply each learned merge.
    return []


def decode(token_ids: list[int], tokenizer: TinyTokenizer) -> str:
    """Decode token IDs back into text."""
    # TODO: Expand token IDs into byte values using the vocabulary, then decode.
    return ""


def estimate_token_budget(texts: list[str], tokenizer: TinyTokenizer) -> dict[str, int]:
    """Return token counts for each text snippet.

    FinAgent will later use this kind of boundary check before sending market
    notes or summaries into an LLM context window.
    """
    # TODO: Map each original text snippet to the length of its encoded tokens.
    return {}


if __name__ == "__main__":
    sample = "AAPL rises after earnings. AAPL guidance improves."
    trained = train_bpe(sample, target_vocab_size=270)
    print(encode("AAPL rises.", trained))
