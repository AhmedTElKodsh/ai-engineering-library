# Reference Behavior: Module 3 Phase 1 LLM Provider Boundary

Scaffold: `curriculum/03-module-3-mcp-integration/week-01-fundamentals/workbench.py`

## Intent

This lesson should treat model calls as explicit provider boundaries with message validation, prompt templates, token/cost estimates, fake provider calls, and trace metadata.

## Intended Behavior

- Accept only supported chat roles and reject empty content or unknown roles.
- Render prompt templates with variables and template identity.
- Estimate tokens and costs deterministically.
- Validate messages before calling the provider.
- Return provider content plus trace fields for model, input tokens, output tokens, and estimated cost.

## Reviewer Edge Cases

- Unknown roles should fail before provider execution.
- Blank prompts should estimate zero tokens.
- Prompt rendering should expose version identity for regression tracking.

## Do Not Accept

- Real provider calls in the required path.
- Missing trace metadata.
- Prompt templates that silently ignore missing variables.
