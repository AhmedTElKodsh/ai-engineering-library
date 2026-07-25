"""LLM provider boundary workbench for Module 3 Phase 1.

Expected time to finish: 4-6 hours.

Learners should complete the TODOs using plain Python only.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Protocol


@dataclass(frozen=True)
class Message:
    """One chat-style message crossing the provider boundary."""

    role: str
    content: str


@dataclass(frozen=True)
class PromptTemplate:
    """A versioned prompt template with named variables."""

    name: str
    version: str
    body: str


@dataclass
class FakeProvider:
    """A deterministic stand-in for a paid model provider."""

    response_text: str
    calls: list[list[Message]] = field(default_factory=list)

    def complete(self, messages: list[Message]) -> str:
        # Hint reference: hints.md#complete
        self.calls.append(messages)
        return self.response_text


class Provider(Protocol):
    def complete(self, messages: list[Message]) -> str:
        """Return model text for a validated message list."""
        # Hint reference: hints.md#complete


@dataclass(frozen=True)
class ProviderResponse:
    """Structured provider output plus trace metadata."""

    content: str
    trace: dict[str, object]


def validate_messages(messages: list[Message]) -> list[Message]:
    """Validate chat messages before any provider call."""
    # Hint reference: hints.md#validate_messages
    # TODO: Require at least one message with role in system/user/assistant
    # and non-empty string content.
    # Hint: this is the trust boundary; reject bad shape before the provider sees it.
    # Return the original valid messages so later code can keep ordering intact.
    return []


def estimate_tokens(text: str) -> int:
    """Return a simple deterministic token estimate."""
    # Hint reference: hints.md#estimate_tokens
    # TODO: Count whitespace-separated terms, returning 0 for blank text.
    # Hint: this estimate is intentionally boring; no tokenizer dependency needed.
    return 0


def estimate_cost(tokens: int, price_per_1k_tokens: float) -> float:
    """Estimate cost for a token count."""
    # Hint reference: hints.md#estimate_cost
    # TODO: Use tokens / 1000 * price and round to six decimal places.
    # Hint: keep this numeric; formatting as currency belongs in presentation code.
    return 0.0


def render_prompt(template: PromptTemplate, variables: dict[str, str]) -> Message:
    """Render a versioned prompt template as a user message."""
    # Hint reference: hints.md#render_prompt
    # TODO: Replace {variable} placeholders and include template metadata.
    # Hint: the body is the prompt content; name/version make the prompt traceable.
    return Message(role="user", content="")


def call_provider(
    messages: list[Message],
    provider: Provider,
    *,
    model: str,
    price_per_1k_tokens: float = 0.0,
) -> ProviderResponse:
    """Validate messages, call a provider, and return trace metadata."""
    # Hint reference: hints.md#call_provider
    # TODO: Validate first, call the provider second, then include model,
    # input token estimate, output token estimate, and cost estimate.
    # Hint: trace should describe the call without hiding whether validation happened.
    # Count input from the validated messages and output from the provider text.
    return ProviderResponse(content="", trace={})
