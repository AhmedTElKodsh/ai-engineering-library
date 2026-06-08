import sys
from pathlib import Path

LESSON_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(LESSON_DIR))
sys.modules.pop("workbench", None)

from workbench import Requirement, build_decision_note, choose_adaptation, rank_options, score_option  # noqa: E402


def test_score_option_prefers_tools_for_calculation():
    req = Requirement("price movement", "calculation", False, False)

    assert score_option(req, "tool") > score_option(req, "fine_tune")


def test_rank_options_returns_best_first():
    req = Requirement("latest market context", "missing_knowledge", False, True)

    assert rank_options(req)[0] == "rag"


def test_choose_adaptation_explains_fine_tuning_boundary():
    req = Requirement("format answer as JSON", "format", False, False)
    decision = choose_adaptation(req)

    assert decision["first_choice"] == "structured_output"
    assert "fine" in decision["fine_tuning_note"].lower()


def test_fine_tuning_can_win_when_labeled_examples_exist_for_style():
    req = Requirement("match house style", "style", True, False)

    assert choose_adaptation(req)["first_choice"] == "fine_tune"


def test_build_decision_note_contains_task_failure_and_recommendation():
    note = build_decision_note(Requirement("cite sources", "missing_knowledge", False, True))

    assert "cite sources" in note
    assert "missing_knowledge" in note
    assert "rag" in note.lower()
