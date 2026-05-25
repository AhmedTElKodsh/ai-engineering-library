# Rubric: Local FinAgent Request Boundary

| Criterion | Strong | Developing | Needs Work |
| --- | --- | --- | --- |
| Boundary Design | Request validation, analysis, and response formatting are separate | Mostly separated with minor duplication | Validation and analysis are tangled |
| Correctness | Handles valid and invalid requests exactly as tests require | Happy path works but edge cases fail | Core functions return placeholders |
| Traceability | Response includes useful trace metadata | Trace exists but is vague | No debugging metadata |
| Safety | Disclaimer remains present and clear | Disclaimer present but easy to miss | Response reads like financial advice |
| Transfer | Learner can explain how this maps to CLI/API/MCP boundaries | Explains only this lesson | Cannot connect to later modules |
