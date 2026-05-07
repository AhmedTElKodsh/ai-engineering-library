"""Logging configuration for the Teaching Methodology Evaluator."""

import logging
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path
from typing import Optional


def setup_logging(
    level: str = "INFO",
    log_file: Optional[str] = None,
    log_format: Optional[str] = None,
    max_file_size_mb: int = 10,
    backup_count: int = 5,
    console_output: bool = True,
) -> logging.Logger:
    """Set up logging configuration for the application.

    Args:
        level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        log_file: Path to log file (optional)
        log_format: Log message format (optional)
        max_file_size_mb: Maximum log file size in MB before rotation
        backup_count: Number of backup log files to keep
        console_output: Whether to output logs to console

    Returns:
        Configured logger instance
    """
    # Convert level string to logging constant
    numeric_level = getattr(logging, level.upper(), logging.INFO)

    # Default format if not provided
    if log_format is None:
        log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

    # Create formatter
    formatter = logging.Formatter(log_format)

    # Get root logger
    logger = logging.getLogger("teaching_methodology_evaluator")
    logger.setLevel(numeric_level)

    # Remove existing handlers to avoid duplicates
    logger.handlers.clear()

    # Console handler
    if console_output:
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(numeric_level)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

    # File handler with rotation
    if log_file:
        log_path = Path(log_file)
        log_path.parent.mkdir(parents=True, exist_ok=True)

        file_handler = RotatingFileHandler(
            log_file,
            maxBytes=max_file_size_mb * 1024 * 1024,
            backupCount=backup_count,
            encoding="utf-8",
        )
        file_handler.setLevel(numeric_level)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

    return logger


def get_logger(name: str) -> logging.Logger:
    """Get a logger instance for a specific module.

    Args:
        name: Logger name (typically __name__ of the module)

    Returns:
        Logger instance
    """
    return logging.getLogger(f"teaching_methodology_evaluator.{name}")


def setup_logging_from_config(config: dict) -> logging.Logger:
    """Set up logging from configuration dictionary.

    Args:
        config: Configuration dictionary with logging settings

    Returns:
        Configured logger instance
    """
    return setup_logging(
        level=config.get("level", "INFO"),
        log_file=config.get("file"),
        log_format=config.get("format"),
        max_file_size_mb=config.get("max_file_size_mb", 10),
        backup_count=config.get("backup_count", 5),
        console_output=config.get("console_output", True),
    )
