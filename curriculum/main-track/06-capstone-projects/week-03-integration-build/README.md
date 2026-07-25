# Milestone 1 Cumulative FinAgent Application

The folder name `week-03-integration-build` is a legacy location. This scaffold
is the single learner-owned application used throughout Milestone 1; it is not
an extra project added at the end.

## Working Agreement

For each checkpoint:

1. **Inspect** the named function and focused test.
2. **Predict** the first result and write down why.
3. **Run** only the focused command.
4. **Implement** the smallest coherent behavior.
5. **Verify** the normal and failure paths.
6. **Reflect** using `../../../templates/evidence-portfolio-template.md`.

Do not open the completed instructor reference before making a serious attempt.
Follow `../../../../REFERENCE_AFTER_EFFORT.md`.

## Time Accounting

The work below is distributed across the canonical 30-40 instructional hours
in `../../milestone-1-45-hour-map.md`. It does not add another 6-8 hours.
Block 0 happens before the clock; Block 9 reserves four fast-path or five
full-path hours for final integration, transfer, and defense.

## Cumulative Checkpoints

Run commands from the repository root.

| Route block | Change to this application | Focused command |
| ---: | --- | --- |
| 0 | Complete the environment check and five-test placement sample before editing this scaffold. | Follow the two commands in `../../00-python-foundations/week-00-diagnostic/README.md` |
| 1 | Load typed fixtures, validate requests, compute movement, and produce one deterministic non-advice summary. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests/test_integration_build.py -k "load_market_snapshot or validate_request or deterministic_summary" -v` |
| 2 | Put fixture model behavior behind a validated structured-output boundary with a two-attempt retry ceiling. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests/test_milestone_checkpoints.py -k checkpoint_2 -v` |
| 3 | Load the ten-case evaluation seed as soon as the model boundary exists. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests/test_milestone_checkpoints.py -k checkpoint_3 -v` |
| 4 | Reject evidence without provenance, rank approved chunks before applying the explicit budget, and explain why keyword overlap is only a local stand-in for semantic similarity. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests/test_integration_build.py -k "load_evidence_chunks or retrieve_evidence" -v` |
| 5 | Preserve provenance, cite supported answers, abstain without evidence, and compose the full deterministic workflow. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests/test_integration_build.py -k "compose_finagent_brief or run_finagent_workflow" -v` |
| 6 | Add one allowlisted read-only tool, approval/denial paths, and a bounded observable workflow. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests/test_milestone_checkpoints.py -k checkpoint_6 -v` |
| 7 | Serialize the same application behind `GET /health` and `POST /brief`, then prove it over real loopback HTTP. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests/test_milestone_checkpoints.py -k checkpoint_7 -v` |
| 8 | Label fixture/live evidence separately and record measured latency, estimated tokens/live cost, actual fixture cost, and the local version/config gate. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests/test_milestone_checkpoints.py -k checkpoint_8 -v` |
| 9 | Prove the eval reports both passes and diagnostic failures, run the full regression, complete one unfamiliar change, and defend limitations. | `python -m pytest curriculum/main-track/06-capstone-projects/week-03-integration-build/tests -v` |

The first run is expected to fail on TODO behavior. Collection errors, broken
imports, missing fixtures, and server hangs are curriculum defects rather than
learner exercises.

The Block 9 command proves regression and evaluation behavior only. It does not
certify the learner-authored transfer change, evidence entries, or defense.

## Supporting Labs, Not Additional Projects

Start with the cumulative checkpoint and its hints. Open a supporting lab only
when you cannot explain or implement that checkpoint. Run only the selector
below, stop at the return condition, and come back here. Full supporting labs
are post-Milestone 1 depth.

| Block | Maximum slice time | Exact supporting slice from the repository root | Return here when... |
| ---: | ---: | --- | --- |
| 1 | 45m | `python -m pytest curriculum/main-track/01-module-1-whole-game/week-01-execute/tests -k "percentage_change or validate_ticker" -v` | you can explain validation before transformation and the zero-denominator failure |
| 2 | 60m | `python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-01-fundamentals/tests -k call_provider -v`<br>`python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-03-context-engineering/tests -k validate_structured_answer -v` | you can reject invalid input/output at the provider boundary and label its trace |
| 3 | 45m | `python -m pytest curriculum/main-track/05-module-5-production/week-01-golden-datasets/tests -k "load_golden_examples or summarize_eval" -v` | you can name representative cases and diagnostic failure categories |
| 4 | 60m | `python -m pytest curriculum/main-track/02-module-2-first-principles/week-02-embeddings/tests -k cosine_similarity -v`<br>`python -m pytest curriculum/main-track/02-module-2-first-principles/week-04-context-decoding/tests -k "estimate_tokens or select_context" -v` | you can explain similarity, a zero-vector edge, and one context-budget decision |
| 5 | 60m | `python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-01-basic-rag/tests -k "prepare_records or chunk_records" -v`<br>`python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-02-advanced-rag/tests -k answer_with_citations -v` | a supported question cites preserved provenance and an unsupported question abstains |
| 6 | 60m | `python -m pytest curriculum/main-track/03-module-3-mcp-integration/week-02-server-building/tests -k "quote_lookup or dispatch_tool_refuses" -v`<br>`python -m pytest curriculum/main-track/04-module-4-agentic-workflows/week-03-core-patterns/tests -k "classify_request or evaluate_gate" -v` | an allowed tool succeeds, denied calls expose no data, and an unsupported answer is blocked |
| 7 | 30m | `python -m pytest curriculum/main-track/05-module-5-production/week-03-fastapi/tests -k "health or error" -v` | you can explain stable health metadata and a machine-readable error boundary |
| 8 | 60m | `python -m pytest curriculum/main-track/05-module-5-production/week-02-cicd/tests -k "load_version_note or build_ci_command_checklist" -v`<br>`python -m pytest curriculum/main-track/05-module-5-production/week-04-monitoring/tests -k "log_event or categorize" -v`<br>`python -m pytest curriculum/main-track/05-module-5-production/week-05-optimization/tests -k cost -v` | you can record versions, a rerunnable local gate, one structured failure event, and measured-versus-estimated cost evidence |
| 9 | 90m | `python -m pytest curriculum/main-track/06-capstone-projects/week-02-polish/tests -k "demo_script or limitation_note or interview_defense" -v` | a reviewer can rerun the demo, see honest limitations, and challenge your trade-offs |

If every slice is needed, the caps total 7h 30m inside the existing block
budgets. Exceeding a cap uses the explicit recovery allowance; it does not
silently extend the core route.

## Required Evidence

Keep one evidence entry per checkpoint using the shared template. Each entry
must name:

- the focused command and result
- one failure, refusal, abstention, denial, or retry
- what the evidence proves and does not prove
- whether the result is deterministic, fixture-backed, live, or merely planned
- one limitation or deferred improvement

Never paste secrets. Fixture-provider evidence is not live-provider evidence.
Loopback HTTP is not hosted deployment.

For Block 8, record the exact local gate command, Python and dependency/config
versions, fixture names, and which metrics are measured versus estimated. For
Block 9, record the learner-written failing test, the unfamiliar change, the
before/after eval result, and written or oral answers to the exit defense.

## Transfer Task

After all required tests pass, choose one unfamiliar change:

- refuse evidence older than a configurable freshness threshold
- add a second approved ticker with its own snapshot and citations
- add a new read-only tool argument while preserving approval and denial tests

Write the new failing test first, implement the smallest change, rerun the ten
eval cases, and record which trade-off changed. Do not copy the instructor
reference for this task.

## Exit Defense

A reviewer should be able to ask:

- Where does untrusted input become typed application data?
- Which behavior is deterministic and which simulates a model?
- How are invented citations rejected?
- Why can the tool not read arbitrary files or environment values?
- Where do retries stop and human approval begin?
- What does the real HTTP test prove?
- Which claims remain unverified without a live provider or hosted deployment?

Milestone 1 is complete only when the learner can answer with their own code,
test output, eval report, trace, and transfer evidence.
