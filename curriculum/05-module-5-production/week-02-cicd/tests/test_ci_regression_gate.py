import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))
sys.modules.pop("workbench", None)

from workbench import (  # noqa: E402
    build_ci_command_checklist,
    build_gate_report,
    compute_pass_rate,
    evaluate_release_gate,
    load_eval_run,
    load_version_note,
)


FIXTURE_DIR = PROJECT_ROOT / "fixtures"
PASSING_RUN = FIXTURE_DIR / "eval-run-passing.json"
FAILING_RUN = FIXTURE_DIR / "eval-run-failing.json"
VERSION_NOTE = FIXTURE_DIR / "version-note.json"


def test_load_eval_run_reads_counts_and_failure_categories():
    eval_run = load_eval_run(FAILING_RUN)

    assert eval_run.run_id == "eval-2026-05-25-failing"
    assert eval_run.total == 5
    assert eval_run.failed == 2
    assert eval_run.failure_categories == {"missing_citation": 1, "wrong_abstention": 1}


def test_load_version_note_preserves_all_version_fields():
    note = load_version_note(VERSION_NOTE)

    assert note.prompt_version == "finagent-rag-prompt-v3"
    assert note.model_version == "mock-llm-2026-05"
    assert note.index_version == "webdata-index-v2"
    assert note.dataset_version == "golden-eval-v1"


def test_compute_pass_rate_rounds_to_one_decimal_place():
    assert compute_pass_rate(load_eval_run(PASSING_RUN)) == 100.0
    assert compute_pass_rate(load_eval_run(FAILING_RUN)) == 60.0


def test_evaluate_release_gate_passes_clean_eval_with_versions():
    decision = evaluate_release_gate(load_eval_run(PASSING_RUN), load_version_note(VERSION_NOTE), min_pass_rate=95.0)

    assert decision.status == "pass"
    assert decision.reasons == ["eval gate passed"]


def test_evaluate_release_gate_fails_low_score_and_failures():
    decision = evaluate_release_gate(load_eval_run(FAILING_RUN), load_version_note(VERSION_NOTE), min_pass_rate=95.0)

    assert decision.status == "fail"
    assert "pass rate 60.0 below required 95.0" in decision.reasons
    assert "2 eval failures remain" in decision.reasons


def test_build_ci_command_checklist_is_rerunnable_from_repo_root():
    checklist = build_ci_command_checklist(
        ["curriculum/05-module-5-production/week-01-golden-datasets/tests"],
        "python scripts/run_golden_eval.py --fixture week-02-cicd/fixtures/eval-run-passing.json",
    )

    assert checklist == [
        "python -m pytest curriculum/05-module-5-production/week-01-golden-datasets/tests -v",
        "python scripts/run_golden_eval.py --fixture week-02-cicd/fixtures/eval-run-passing.json",
        "python -m pytest curriculum/05-module-5-production/week-02-cicd/tests -v",
    ]


def test_build_gate_report_contains_versions_failures_and_commands():
    eval_run = load_eval_run(FAILING_RUN)
    note = load_version_note(VERSION_NOTE)
    decision = evaluate_release_gate(eval_run, note, min_pass_rate=95.0)
    checklist = build_ci_command_checklist(
        ["curriculum/05-module-5-production/week-01-golden-datasets/tests"],
        "python scripts/run_golden_eval.py --fixture week-02-cicd/fixtures/eval-run-failing.json",
    )

    report = build_gate_report(eval_run, decision, checklist)

    assert report["run_id"] == "eval-2026-05-25-failing"
    assert report["pass_rate"] == 60.0
    assert report["status"] == "fail"
    assert report["versions"]["prompt_version"] == "finagent-rag-prompt-v3"
    assert report["failure_categories"]["missing_citation"] == 1
    assert report["checklist"][-1] == "python -m pytest curriculum/05-module-5-production/week-02-cicd/tests -v"
