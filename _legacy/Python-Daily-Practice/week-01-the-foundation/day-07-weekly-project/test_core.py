"""Tests for Day 07: Student Grade Analyzer — Core Logic."""
import pytest

try:
    from core import (
        calculate_average,
        assign_letter_grade,
        process_student,
        calculate_class_statistics,
        rank_students,
    )
except ImportError as e:
    pytest.skip(
        f"Could not import from core: {e}. Did you rename a function?",
        allow_module_level=True,
    )


# ── Setup Verification ─────────────────────

@pytest.mark.weekly_project
def test_core_module_loaded():
    """Verify the core module is properly set up."""
    assert callable(calculate_average), "calculate_average should be callable"
    assert callable(assign_letter_grade), "assign_letter_grade should be callable"


# ── Tests for calculate_average ────────────

@pytest.mark.weekly_project
def test_calculate_average_basic():
    result = calculate_average([80, 90, 100])
    assert result == 90.0, (
        "Average of [80, 90, 100] should be 90.0. "
        f"Expected 90.0, got {result}. "
        "Hint: Sum the scores and divide by the count"
    )


@pytest.mark.weekly_project
def test_calculate_average_decimals():
    result = calculate_average([85, 92, 78])
    assert result == 85.0, (
        "Average of [85, 92, 78] should be 85.0. "
        f"Expected 85.0, got {result}. "
        "Hint: Round to 2 decimal places"
    )


@pytest.mark.weekly_project
def test_calculate_average_single():
    result = calculate_average([95])
    assert result == 95.0, (
        "Average of a single score [95] should be 95.0. "
        f"Expected 95.0, got {result}. "
        "Hint: The average of one number is itself"
    )


# ── Tests for assign_letter_grade ──────────

@pytest.mark.weekly_project
@pytest.mark.parametrize("average,expected", [
    (95, "A"), (90, "A"), (89, "B"), (80, "B"),
    (79, "C"), (70, "C"), (69, "D"), (60, "D"), (59, "F"), (0, "F"),
])
def test_assign_letter_grade(average, expected):
    result = assign_letter_grade(average)
    assert result == expected, (
        f"Average {average} should get grade '{expected}'. "
        f"Expected '{expected}', got '{result}'. "
        "Hint: Use if/elif to check ranges: 90+ = A, 80-89 = B, etc."
    )


# ── Tests for process_student ──────────────

@pytest.mark.weekly_project
def test_process_student_basic():
    result = process_student("Alice", [90, 80, 100])
    assert isinstance(result, dict), (
        "process_student should return a dictionary. "
        f"Got {type(result).__name__}. "
        "Hint: Build a dict with name, scores, average, grade keys"
    )
    assert result["name"] == "Alice", (
        "Student name should be 'Alice'. "
        f"Got '{result.get('name')}'. "
        "Hint: Set the 'name' key to the name parameter"
    )
    assert result["average"] == 90.0, (
        "Average of [90, 80, 100] should be 90.0. "
        f"Got {result.get('average')}. "
        "Hint: Use calculate_average for the computation"
    )
    assert result["grade"] == "A", (
        "Average 90.0 should give grade 'A'. "
        f"Got '{result.get('grade')}'. "
        "Hint: Use assign_letter_grade with the calculated average"
    )


# ── Tests for calculate_class_statistics ───

@pytest.mark.weekly_project
def test_class_statistics_basic():
    students = [
        {"name": "Alice", "average": 92.0, "grade": "A"},
        {"name": "Bob", "average": 78.0, "grade": "C"},
        {"name": "Charlie", "average": 85.0, "grade": "B"},
    ]
    result = calculate_class_statistics(students)
    assert result["highest_average"] == 92.0, (
        "Highest average should be 92.0. "
        f"Got {result.get('highest_average')}. "
        "Hint: Use max() on the list of averages"
    )
    assert result["lowest_average"] == 78.0, (
        "Lowest average should be 78.0. "
        f"Got {result.get('lowest_average')}. "
        "Hint: Use min() on the list of averages"
    )


@pytest.mark.weekly_project
def test_class_statistics_grade_distribution():
    students = [
        {"name": "A1", "average": 95.0, "grade": "A"},
        {"name": "A2", "average": 91.0, "grade": "A"},
        {"name": "B1", "average": 85.0, "grade": "B"},
    ]
    result = calculate_class_statistics(students)
    dist = result.get("grade_distribution", {})
    assert dist.get("A") == 2, (
        "Should count 2 students with grade A. "
        f"Got {dist.get('A')}. "
        "Hint: Loop through students and count each grade"
    )
    assert dist.get("B") == 1, (
        "Should count 1 student with grade B. "
        f"Got {dist.get('B')}. "
        "Hint: Use a dictionary to tally grades"
    )


# ── Tests for rank_students ────────────────

@pytest.mark.weekly_project
def test_rank_students_order():
    students = [
        {"name": "Bob", "average": 78.0, "grade": "C"},
        {"name": "Alice", "average": 92.0, "grade": "A"},
        {"name": "Charlie", "average": 85.0, "grade": "B"},
    ]
    result = rank_students(students)
    assert result[0]["name"] == "Alice", (
        "First ranked student should be Alice (highest average 92.0). "
        f"Got '{result[0].get('name')}'. "
        "Hint: Sort by average in descending order"
    )
    assert result[0]["rank"] == 1, (
        "First student should have rank 1. "
        f"Got {result[0].get('rank')}. "
        "Hint: Add rank after sorting, starting from 1"
    )
    assert result[2]["name"] == "Bob", (
        "Last ranked student should be Bob (lowest average 78.0). "
        f"Got '{result[2].get('name')}'. "
        "Hint: Use sorted() with key=lambda and reverse=True"
    )
