"""
Day 07: Student Grade Analyzer — Main Entry Point
orchestrates the full grade analysis pipeline

Concepts: multi-module projects, data pipelines, string formatting
Builds On: All Week 1 concepts
"""
from core import process_student, calculate_class_statistics, rank_students
from utils import format_percentage, format_student_row


# Sample data for testing — do not modify
SAMPLE_STUDENTS = {
    "Alice": [92, 88, 95, 90],
    "Bob": [78, 82, 75, 80],
    "Charlie": [95, 97, 93, 98],
    "Diana": [65, 70, 68, 72],
    "Eve": [88, 85, 90, 87],
}


def analyze_class(student_data: dict[str, list[float]]) -> dict:
    """
    Run the full analysis pipeline on a class of students.

    Args:
        student_data: dict mapping student names to their score lists

    Returns:
        Dictionary with keys: "students" (list of processed student dicts),
        "ranked" (ranked student list), "statistics" (class statistics dict)

    Pseudocode:
        1. Process each student using process_student
        2. Rank all students using rank_students
        3. Calculate class statistics using calculate_class_statistics
        4. Return all results in a dictionary
    """
    pass  # YOUR CODE HERE


def generate_report(analysis: dict) -> str:
    """
    Generate a formatted text report from analysis results.

    Args:
        analysis: the dictionary returned by analyze_class

    Returns:
        A multi-line string report containing:
        - Header: "=== Student Grade Report ==="
        - Ranked student table (using format_student_row)
        - Class statistics section
        - Grade distribution

    Pseudocode:
        1. Build header line
        2. Build column headers: "Name" | "Grade" | "Average"
        3. Add separator line of dashes
        4. For each ranked student, add a formatted row
        5. Add blank line, then statistics section
        6. Add class average using format_percentage
        7. Add highest and lowest averages
        8. Add grade distribution counts
        9. Join all lines and return
    """
    pass  # YOUR CODE HERE
