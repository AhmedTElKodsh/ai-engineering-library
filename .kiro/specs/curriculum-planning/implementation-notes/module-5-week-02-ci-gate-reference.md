# Module 5 Week 2 Reference Behavior

Reviewer-only note. Do not copy this into learner-facing workbenches.

`load_eval_run()` should read UTF-8 JSON and return `EvalRun`.

`load_version_note()` should read UTF-8 JSON and return `VersionNote`.

`compute_pass_rate()` should return `passed / total * 100` rounded to one decimal. If total is zero, return `0.0`.

`evaluate_release_gate()` should fail when:

- pass rate is below `min_pass_rate`
- `failed` is greater than zero
- any version-note field is blank

For the failing fixture with `min_pass_rate=95.0`, expected reasons include:

- `pass rate 60.0 below required 95.0`
- `2 eval failures remain`

For the passing fixture with complete version notes, expected status is `pass` with reason `eval gate passed`.

`build_ci_command_checklist()` should return:

- one `python -m pytest {path} -v` command per test path
- the provided eval command
- `python -m pytest curriculum/05-module-5-production/week-02-cicd/tests -v`

`build_gate_report()` should return:

- `run_id`
- `pass_rate`
- `status`
- `reasons`
- `versions`
- `failure_categories`
- `checklist`
