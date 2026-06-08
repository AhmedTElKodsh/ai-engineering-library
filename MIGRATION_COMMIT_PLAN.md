# Reviewable Migration Commit Plan

Use this split when turning the current workspace cleanup into commits or a PR.
Keep each commit reviewable on its own; do not mix archive de-indexing with
curriculum prose or CI logic.

## 1. De-index Local Archive And Tool Surfaces

Purpose: make the Git index match `.gitignore` and the README project contract.

Include:

- `git rm --cached` removals for ignored local agent folders, BMAD output,
  legacy archives, private books, and parked platform infrastructure
- `.gitignore` updates that keep local archives ignored while allowing promoted
  source-of-truth files

Reviewer focus:

- no learner-facing curriculum files are removed accidentally
- local files remain on disk for maintainers who still need them
- the committed tree no longer implies active JavaScript/platform ownership

## 2. Normalize Planning And Reference Conventions

Purpose: keep one active planning contract and one reviewer-note naming scheme.

Include:

- `.kiro/specs/curriculum-planning/README.md`
- `REFERENCE_AFTER_EFFORT.md`
- canonical slug-named files under
  `.kiro/specs/curriculum-planning/implementation-notes/`
- removal of older `module-*` and `web-data-*` duplicate reference notes
- updates to `AUTHORING_PLAN.md` files that pointed at older reference names

Reviewer focus:

- slug convention matches `scripts/validate_curriculum_references.py`
- local archive inputs are clearly marked as non-source-of-truth
- reference notes remain instructor-only

## 3. Strengthen CI And Validation Gates

Purpose: catch scaffold drift without requiring learner TODO tests to pass.

Include:

- `.github/workflows/ci-cd.yml`
- `scripts/validate_curriculum_quality.py`
- any small README or matrix updates that name the stricter gates

Reviewer focus:

- all 42 scaffolds import cleanly
- fixture JSON/YAML parses
- reference notes have required sections
- generic lesson logic and thin hints/rubrics are rejected
- `compileall` and `ruff` run in CI

## 4. Improve Learner-Facing Pedagogy

Purpose: make the teaching method concrete in each lesson.

Include:

- rewritten lesson Learning Logic tables
- upgraded thin hints and rubrics in Modules 4 and 5
- capstone-order clarification in root onboarding and learner-ready matrix
- template updates that prevent generic copy from returning

Reviewer focus:

- each lesson names the actual prior skill, new skill, failure mode, transfer,
  and explanation target
- hints preserve learner agency through progressive layers
- rubrics assess process, failure handling, traceability, transfer, and reflection

## Suggested Verification Before PR

```powershell
$env:PYTEST_DISABLE_PLUGIN_AUTOLOAD='1'
python scripts/validate_curriculum_references.py --strict
python scripts/validate_curriculum_quality.py --strict
python -m pytest --collect-only curriculum -q
python -m compileall -q curriculum scripts tests
python -m ruff check curriculum scripts tests
```
