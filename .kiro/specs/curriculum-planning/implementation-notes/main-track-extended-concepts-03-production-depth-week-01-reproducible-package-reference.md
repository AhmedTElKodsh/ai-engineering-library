# Reference Behavior: Module 5 Week 4 Reproducible Package

Scaffold: `curriculum/main-track/extended-concepts/03-production-depth/week-01-reproducible-package/workbench.py`

## Intent

This lesson should teach reproducible local packaging and container planning without requiring learners to deploy infrastructure.

## Intended Behavior

- Build run manifests with command and environment metadata.
- Validate manifests and report missing fields.
- Build container plans that use a non-root user.
- Build reviewer runbooks with test and run commands.

## Reviewer Edge Cases

- Missing command or env fields should be reported explicitly.
- Container plan should avoid root execution.
- Runbook commands should be rerunnable from a clean checkout.

## Do Not Accept

- Kubernetes or cloud deployment requirements.
- Plans that require secrets in source.
- Runbooks that omit verification commands.
