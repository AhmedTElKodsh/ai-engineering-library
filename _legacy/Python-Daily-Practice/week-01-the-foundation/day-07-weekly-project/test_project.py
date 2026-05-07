"""Tests for Day 07: Student Grade Analyzer — Integration Tests."""
import pytest

try:
    from utils import validate_score, format_percentage, format_student_row
    from main import analyze_class, generate_report, SAMPLE_STUDENTS
except ImportError as e:
    pytest.skip(
        f"Could not import project modules: {e}",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

@pytest.mark.weekly_project
def test_project_modules_loaded():
    """Verify all project modules load correctly."""
    assert callable(analyze_class), "analyze_class should be callable"
    assert callable(generate_report), "generate_report should be callable"


# ── Tests for utils ────────────────────────

@pytest.mark.weekly_project
def test_validate_score_valid():
    result = validate_score(85)
    assert result == 85.0, (
        "validate_score(85) should return 85.0. "
        f"Expected 85.0, got {result}. "
        "Hint: Convert valid scores to float before returning"
    )


@pytest.mark.weekly_project
def test_validate_score_invalid_type():
    with pytest.raises(TypeError):
        validate_score("ninety")


@pytest.mark.weekly_project
def test_validate_score_out_of_range():
    with pytest.raises(ValueError):
        validate_score(105)


@pytest.mark.weekly_project
def test_format_percentage_basic():
    result = format_percentage(85.678)
    assert result == "85.7%", (
        "format_percentage(85.678) should return '85.7%'. "
        f"Expected '85.7%', got '{result}'. "
        "Hint: Round first, then format with f-string and percent sign"
    )


@pytest.mark.weekly_project
def test_format_percentage_custom_decimals():
    result = format_percentage(85.678, decimals=2)
    assert result == "85.68%", (
        "format_percentage(85.678, decimals=2) should return '85.68%'. "
        f"Expected '85.68%', got '{result}'. "
        "Hint: Use the decimals parameter to control rounding"
    )


@pytest.mark.weekly_project
def test_format_student_row():
    result = format_student_row("Alice", "A", 92.5)
    assert "Alice" in result, (
        "Student row should contain the student name. "
        f"Got: '{result}'. "
        "Hint: Use f-string formatting with alignment specifiers"
    )
    assert "A" in result, (
        "Student row should contain the grade. "
        f"Got: '{result}'. "
        "Hint: Center the grade in the row"
    )


# ── Integration Tests ──────────────────────

@pytest.mark.weekly_project
def test_analyze_class_returns_dict():
    result = analyze_class(SAMPLE_STUDENTS)
    assert isinstance(result, dict), (
        "analyze_class should return a dictionary. "
        f"Got {type(result).__name__}. "
        "Hint: Return a dict with 'students', 'ranked', 'statistics' keys"
    )
    assert "students" in result, (
        "Result should have a 'students' key. "
        f"Got keys: {list(result.keys())}. "
        "Hint: Process each student and store in the 'students' list"
    )
    assert "ranked" in result, (
        "Result should have a 'ranked' key. "
        f"Got keys: {list(result.keys())}. "
        "Hint: Rank students after processing"
    )
    assert "statistics" in result, (
        "Result should have a 'statistics' key. "
        f"Got keys: {list(result.keys())}. "
        "Hint: Calculate class statistics from processed students"
    )


@pytest.mark.weekly_project
def test_analyze_class_student_count():
    result = analyze_class(SAMPLE_STUDENTS)
    assert len(result["students"]) == 5, (
        "Should process all 5 sample students. "
        f"Expected 5, got {len(result['students'])}. "
        "Hint: Loop through all entries in student_data dict"
    )


@pytest.mark.weekly_project
def test_generate_report_has_header():
    analysis = analyze_class(SAMPLE_STUDENTS)
    report = generate_report(analysis)
    assert isinstance(report, str), (
        "generate_report should return a string. "
        f"Got {type(report).__name__}. "
        "Hint: Build the report as a list of strings, then join with newlines"
    )
    assert "Student Grade Report" in report, (
        "Report should contain the header 'Student Grade Report'. "
        f"Header not found in report. "
        "Hint: Start with '=== Student Grade Report ===' as the first line"
    )


@pytest.mark.weekly_project
def test_generate_report_contains_students():
    analysis = analyze_class(SAMPLE_STUDENTS)
    report = generate_report(analysis)
    for name in SAMPLE_STUDENTS:
        assert name in report, (
            f"Report should contain student name '{name}'. "
            f"'{name}' not found in report. "
            "Hint: Use format_student_row for each ranked student"
        )
