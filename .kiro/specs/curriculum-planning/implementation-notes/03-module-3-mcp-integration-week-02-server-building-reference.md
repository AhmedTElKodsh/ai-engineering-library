# Reference Behavior: Module 3 Phase 2 Local Tool Server Contract

Scaffold: `curriculum/03-module-3-mcp-integration/week-02-server-building/workbench.py`

## Intent

This lesson should wrap deterministic local tools behind typed request/response contracts before any MCP or agent framework is introduced.

## Intended Behavior

- List only named tool specs with required argument metadata.
- Validate quote lookup ticker input and return structured quote data.
- Compute moving averages from the latest window.
- Dispatch known tools with structured success responses and trace.
- Refuse unknown tools and missing required arguments without executing.

## Reviewer Edge Cases

- Missing arguments should produce a failure response before tool logic runs.
- Unknown tool names should not fall through to a default tool.
- Trace data should identify the tool and arguments used.

## Do Not Accept

- Network services or hosted servers.
- Unstructured dicts that omit success/error shape.
- Tool execution before validation.
