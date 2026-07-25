# Milestone 1 FinAgent Executable Reference

This is instructor/reviewer evidence, not the learner starting point. Follow
`../../REFERENCE_AFTER_EFFORT.md` before opening the implementation.

It proves one fixture-backed cumulative application can satisfy the Milestone 1
contracts:

- validated request and structured response boundaries
- deterministic retrieval with provenance, citations, and abstention
- one allowlisted read-only tool with approval and denial paths
- a visible workflow with a two-attempt retry ceiling
- the learner spine's shared ten-case evaluation dataset with failure categories
- request, retrieval, tool, model, latency, token, and cost evidence
- a real loopback HTTP integration test

Run the complete proof:

```powershell
python scripts/validate_curriculum_references.py --strict --executable
```

Run only this reference:

```powershell
python -m pytest reference/milestone-1-finagent/test_reference_app.py -q -p no:cacheprovider
python reference/milestone-1-finagent/app.py
```

Start the local HTTP service:

```powershell
python reference/milestone-1-finagent/app.py --serve --port 8000
```

The service exposes `GET /health` and `POST /brief`.

## Evidence Boundary

- Provider mode: deterministic fixture
- Actual fixture cost: zero
- Token and live-cost values: estimates for engineering discussion
- Live provider: not configured or verified
- Network retrieval: not used
- Deployment: local loopback only
- Learner completion and transfer: not inferred from this reference

This reference establishes executable integration proof. It does not make the
learner workbenches solved examples or prove production readiness.
