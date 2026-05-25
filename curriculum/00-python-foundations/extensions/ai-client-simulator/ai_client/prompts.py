"""
ai_client/prompts.py - Prompt Builder

Implement PromptBuilder: constructs structured prompts for LLM calls.

Concepts: f-strings, dicts, OOP, __str__, __repr__
AI use: mirrors the prompt templating pattern used in later provider and retrieval work.
"""


class PromptBuilder:
    """Builds structured prompts from components.

    The builder accumulates:
        system_prompt (str): the system message
        context_blocks (list[str]): retrieved context chunks (RAG pattern)
        user_message (str): the actual user question

    Methods:
        set_system(prompt: str) -> PromptBuilder: set system prompt (fluent interface)
        add_context(text: str) -> PromptBuilder: append a context block (fluent)
        set_user(message: str) -> PromptBuilder: set the user message (fluent)
        build() -> str: assemble the full prompt string
        to_messages() -> list[dict]: return OpenAI-style messages list
        clear() -> PromptBuilder: reset all state (fluent)
        __repr__() -> str: "PromptBuilder(system=..., contexts=N, user=...)"

    build() format:
        "System: {system_prompt}\\n\\nContext:\\n{context1}\\n{context2}\\n\\nUser: {user_message}"

        If no context blocks, omit the Context section:
        "System: {system_prompt}\\n\\nUser: {user_message}"

    to_messages() format (OpenAI messages API):
        [
            {"role": "system", "content": "{system_prompt}\\n\\nContext:\\n{joined_contexts}"},
            {"role": "user", "content": "{user_message}"},
        ]
        If no context, system content is just the system_prompt.

    Fluent interface means each method returns self:
        prompt = (
            PromptBuilder()
            .set_system("You are a RAG assistant.")
            .add_context("Paris is in France.")
            .add_context("France is in Europe.")
            .set_user("Where is Paris?")
            .build()
        )

    AI use: every RAG pipeline builds prompts this way.
    """

    def __init__(self, system_prompt: str = "You are a helpful assistant."):
        pass  # YOUR CODE HERE

    def set_system(self, prompt: str) -> "PromptBuilder":
        pass  # YOUR CODE HERE

    def add_context(self, text: str) -> "PromptBuilder":
        pass  # YOUR CODE HERE

    def set_user(self, message: str) -> "PromptBuilder":
        pass  # YOUR CODE HERE

    def build(self) -> str:
        pass  # YOUR CODE HERE

    def to_messages(self) -> list[dict]:
        pass  # YOUR CODE HERE

    def clear(self) -> "PromptBuilder":
        pass  # YOUR CODE HERE

    def __repr__(self) -> str:
        pass  # YOUR CODE HERE
