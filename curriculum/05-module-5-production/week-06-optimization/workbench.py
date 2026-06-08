"""Optimization tradeoff workbench for Module 5 Week 6."""

from __future__ import annotations


def estimate_call_cost(input_tokens: int, output_tokens: int, price_per_1k: float) -> float:
    """Estimate model call cost."""
    # TODO: Use total tokens / 1000 * price and round to 6 decimals.
    return 0.0


def estimate_batch_latency(item_count: int, batch_size: int, per_batch_ms: int) -> int:
    """Estimate batch latency in milliseconds."""
    # TODO: Compute number of batches, reject invalid batch size.
    return 0


def should_cache(prompt: str, estimated_cost: float, is_deterministic: bool) -> bool:
    """Return whether a result should be cached."""
    # TODO: Cache deterministic, non-empty prompts when cost is meaningful.
    return False


def choose_retry_policy(error_type: str, attempt: int) -> dict[str, object]:
    """Return retry policy for an error."""
    # TODO: Retry rate_limit/timeout with backoff, do not retry validation errors.
    return {}


def build_optimization_report(metrics: dict[str, float]) -> dict[str, object]:
    """Return optimization recommendations."""
    # TODO: Recommend cost, latency, or reliability actions based on budgets.
    return {}
