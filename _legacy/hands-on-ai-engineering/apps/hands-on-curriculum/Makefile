.PHONY: run test lint setup

# Start the FastAPI app locally
run:
	uv run uvicorn src.main:app --reload --port 8000

# Run the full test suite
test:
	uv run pytest tests/ -v

# Type-check
lint:
	uv run mypy src/

# First-time setup: create venv and install all dependencies
setup:
	uv sync
	cp -n .env.example .env || true
