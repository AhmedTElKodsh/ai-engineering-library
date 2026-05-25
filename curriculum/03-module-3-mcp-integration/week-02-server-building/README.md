# Phase 2: Local Tool Server Contract Lab

Folder: `week-02-server-building`  
Expected time to finish: 4-6 hours  
File to edit: `workbench.py`  
Test folder: `tests/`  
Core test file: `tests/test_tool_server_contract.py`

## Learning Goal

Wrap a small FinAgent capability behind a local tool contract so a model or MCP client can request work without bypassing validation.

## What You Will Build

- a typed tool input schema
- a deterministic local tool implementation
- a server-style dispatcher that selects the right tool
- structured success and error responses
- trace metadata for tool name, input validation, output validation, and refusal reasons

## Success Looks Like

- The tool accepts valid requests and refuses malformed ones.
- Tool output is structured, predictable, and testable.
- The server boundary does not expose unrelated code or secrets.
- The learner can distinguish the tool contract from the model that may call it later.

## Learner Loop

1. Read the tool contract.
2. Inspect the expected success and refusal examples.
3. Predict which invalid input should be blocked.
4. Implement one validation or dispatch behavior.
5. Run the smallest relevant test.
6. Record what the trace proves.
7. Reflect on what the model should never be allowed to decide alone.

## Evidence Artifact

```text
Tool name:
Valid input accepted:
Invalid input refused:
Output fields:
Trace fields:
Permission or safety boundary:
```

## Connection To Phase 1

Phase 1 wrapped model access. Phase 2 wraps deterministic capabilities so later MCP integration has a clear, testable tool boundary.
