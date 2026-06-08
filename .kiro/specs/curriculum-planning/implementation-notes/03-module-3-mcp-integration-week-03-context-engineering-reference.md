# Reference Behavior: Module 3 Phase 3 Structured Context And Trace

Scaffold: `curriculum/03-module-3-mcp-integration/week-03-context-engineering/workbench.py`

## Intent

This lesson should teach context preparation, sanitization, structured answer validation, citation grounding, and prompt-safe trace records.

## Intended Behavior

- Sanitize instruction-like text from retrieved context.
- Validate context items for source, text, ticker, and required metadata.
- Render sanitized source lines for model context.
- Validate structured answers and reject missing or wrong fields.
- Build trace records that check citation grounding without leaking prompt text.

## Reviewer Edge Cases

- Prompt-injection phrases should be removed or neutralized.
- Missing citation IDs should fail grounding checks.
- Trace records should include enough debug metadata without storing unsafe prompt content.

## Do Not Accept

- Passing unsanitized source text into prompt context.
- Trusting structured answers without validation.
- Trace logs that leak secrets or full prompts.
