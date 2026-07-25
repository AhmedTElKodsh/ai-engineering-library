"""Optimization tradeoff workbench for Module 5 Week 5."""

from __future__ import annotations


def estimate_call_cost(input_tokens: int, output_tokens: int, price_per_1k: float) -> float:
    """Estimate model call cost."""
    # Hint reference: hints.md#estimate_call_cost
    # TODO: Use total tokens / 1000 * price and round to 6 decimals.
    # Hint: combine input and output tokens before applying the per-1k price.
    return 0.0


def estimate_batch_latency(item_count: int, batch_size: int, per_batch_ms: int) -> int:
    """Estimate batch latency in milliseconds."""
    # Hint reference: hints.md#estimate_batch_latency
    # TODO: Compute number of batches, reject invalid batch size.
    # Hint: partial final batches still cost one batch of latency.
    return 0


def should_cache(prompt: str, estimated_cost: float, is_deterministic: bool) -> bool:
    """Return whether a result should be cached."""
    # Hint reference: hints.md#should_cache
    # TODO: Cache deterministic, non-empty prompts when cost is meaningful.
    # Hint: caching random or blank work usually makes debugging worse.
    return False


def choose_retry_policy(error_type: str, attempt: int) -> dict[str, object]:
    """Return retry policy for an error."""
    # Hint reference: hints.md#choose_retry_policy
    # TODO: Retry rate_limit/timeout with backoff, do not retry validation errors.
    # Hint: retry only errors that might succeed later; attempts should affect delay.
    return {}


def build_optimization_report(metrics: dict[str, float]) -> dict[str, object]:
    """Return optimization recommendations."""
    # Hint reference: hints.md#build_optimization_report
    # TODO: Recommend cost, latency, or reliability actions based on budgets.
    # Hint: compare metrics to thresholds and name the tradeoff each action improves.
    return {}
