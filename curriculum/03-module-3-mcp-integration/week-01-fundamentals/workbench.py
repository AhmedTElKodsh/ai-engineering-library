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
        self.calls.append(messages)
        return self.response_text


class Provider(Protocol):
    def complete(self, messages: list[Message]) -> str:
        """Return model text for a validated message list."""


@dataclass(frozen=True)
class ProviderResponse:
    """Structured provider output plus trace metadata."""

    content: str
    trace: dict[str, object]


def validate_messages(messages: list[Message]) -> list[Message]:
    """Validate chat messages before any provider call."""
    # TODO: Require at least one message with role in system/user/assistant
    # and non-empty string content.
    return []


def estimate_tokens(text: str) -> int:
    """Return a simple deterministic token estimate."""
    # TODO: Count whitespace-separated terms, returning 0 for blank text.
    return 0


def estimate_cost(tokens: int, price_per_1k_tokens: float) -> float:
    """Estimate cost for a token count."""
    # TODO: Use tokens / 1000 * price and round to six decimal places.
    return 0.0


def render_prompt(template: PromptTemplate, variables: dict[str, str]) -> Message:
    """Render a versioned prompt template as a user message."""
    # TODO: Replace {variable} placeholders and include template metadata.
    return Message(role="user", content="")


def call_provider(
    messages: list[Message],
    provider: Provider,
    *,
    model: str,
    price_per_1k_tokens: float = 0.0,
) -> ProviderResponse:
    """Validate messages, call a provider, and return trace metadata."""
    # TODO: Validate first, call the provider second, then include model,
    # input token estimate, output token estimate, and cost estimate.
    return ProviderResponse(content="", trace={})
