# Contributing to Teaching Methodology Evaluator

Thank you for your interest in contributing to the Teaching Methodology Evaluator! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/teaching-methodology-evaluator.git`
3. Create a virtual environment: `python -m venv .venv`
4. Activate the virtual environment:
   - Linux/Mac: `source .venv/bin/activate`
   - Windows: `.venv\Scripts\activate`
5. Install development dependencies: `pip install -e ".[dev]"`
6. Install pre-commit hooks: `pre-commit install`

## Development Workflow

1. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Write or update tests as needed
4. Run tests: `pytest`
5. Run code quality checks:
   - Format: `black teaching_methodology_evaluator tests`
   - Lint: `ruff check teaching_methodology_evaluator tests`
   - Type check: `mypy teaching_methodology_evaluator`
6. Commit your changes with a descriptive message
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a pull request

## Code Style

- Follow PEP 8 style guidelines
- Use Black for code formatting (line length: 100)
- Use type hints for all function parameters and return values
- Write docstrings for all public functions, classes, and modules
- Use Google-style docstrings

### Example

```python
def search_research(
    self,
    query: str,
    domains: List[str],
    date_range: Tuple[str, str] = ("2024-01-01", "2026-12-31"),
) -> List[ResearchSource]:
    """Search for research publications matching query and domains.

    Args:
        query: Search query string
        domains: List of pedagogical domains
        date_range: Tuple of (start_date, end_date) in YYYY-MM-DD format

    Returns:
        List of ResearchSource objects matching the query

    Raises:
        ValueError: If date_range is invalid
    """
    pass
```

## Testing

- Write unit tests for all new functionality
- Write integration tests for workflows
- Aim for >80% code coverage
- Use pytest fixtures for test data
- Mark slow tests with `@pytest.mark.slow`

### Test Structure

```
tests/
├── unit/              # Unit tests for individual components
├── integration/       # Integration tests for workflows
├── validation/        # Validation tests for data models
└── fixtures/          # Test data and fixtures
```

## Documentation

- Update README.md if adding new features
- Update docstrings for all changes
- Add examples for new functionality
- Update CHANGELOG.md with your changes

## Commit Messages

Use clear, descriptive commit messages:

- `feat: Add research engine search functionality`
- `fix: Correct evidence threshold calculation`
- `docs: Update README with new examples`
- `test: Add unit tests for analysis engine`
- `refactor: Simplify gap prioritization logic`

## Pull Request Process

1. Ensure all tests pass
2. Update documentation as needed
3. Add a clear description of your changes
4. Reference any related issues
5. Wait for review and address feedback

## Code Review

All contributions require code review. Reviewers will check:

- Code quality and style
- Test coverage
- Documentation completeness
- Adherence to project architecture
- Performance considerations

## Questions?

If you have questions, please:
- Open an issue for discussion
- Contact the maintainers
- Check existing documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
