"""Configuration management utilities for the Teaching Methodology Evaluator."""

import os
from pathlib import Path
from typing import Any, Dict

import yaml
from dotenv import load_dotenv


class Config:
    """Configuration manager for the Teaching Methodology Evaluator."""

    def __init__(self, config_path: str = "config/config.yaml") -> None:
        """Initialize configuration manager.

        Args:
            config_path: Path to the YAML configuration file
        """
        self.config_path = Path(config_path)
        self._config: Dict[str, Any] = {}
        self._load_env()
        self._load_config()

    def _load_env(self) -> None:
        """Load environment variables from .env file."""
        env_path = Path(".env")
        if env_path.exists():
            load_dotenv(env_path)

    def _load_config(self) -> None:
        """Load configuration from YAML file with environment variable substitution."""
        if not self.config_path.exists():
            raise FileNotFoundError(f"Configuration file not found: {self.config_path}")

        with open(self.config_path, "r", encoding="utf-8") as f:
            config_text = f.read()

        # Substitute environment variables
        config_text = self._substitute_env_vars(config_text)

        # Parse YAML
        self._config = yaml.safe_load(config_text)

    def _substitute_env_vars(self, text: str) -> str:
        """Substitute environment variables in configuration text.

        Args:
            text: Configuration text with ${VAR_NAME} placeholders

        Returns:
            Text with environment variables substituted
        """
        import re

        def replace_env_var(match: re.Match[str]) -> str:
            var_name = match.group(1)
            return os.getenv(var_name, "")

        return re.sub(r"\$\{([^}]+)\}", replace_env_var, text)

    def get(self, key: str, default: Any = None) -> Any:
        """Get configuration value by dot-separated key.

        Args:
            key: Dot-separated configuration key (e.g., "research.cache_dir")
            default: Default value if key not found

        Returns:
            Configuration value or default
        """
        keys = key.split(".")
        value = self._config

        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default

        return value

    def get_section(self, section: str) -> Dict[str, Any]:
        """Get entire configuration section.

        Args:
            section: Section name (e.g., "research", "analysis")

        Returns:
            Configuration section as dictionary
        """
        return self._config.get(section, {})

    @property
    def research(self) -> Dict[str, Any]:
        """Get research configuration section."""
        return self.get_section("research")

    @property
    def analysis(self) -> Dict[str, Any]:
        """Get analysis configuration section."""
        return self.get_section("analysis")

    @property
    def comparison(self) -> Dict[str, Any]:
        """Get comparison configuration section."""
        return self.get_section("comparison")

    @property
    def gap_analysis(self) -> Dict[str, Any]:
        """Get gap analysis configuration section."""
        return self.get_section("gap_analysis")

    @property
    def synthesis(self) -> Dict[str, Any]:
        """Get synthesis configuration section."""
        return self.get_section("synthesis")

    @property
    def platform(self) -> Dict[str, Any]:
        """Get platform configuration section."""
        return self.get_section("platform")

    @property
    def interview_prep(self) -> Dict[str, Any]:
        """Get interview preparation configuration section."""
        return self.get_section("interview_prep")

    @property
    def output(self) -> Dict[str, Any]:
        """Get output configuration section."""
        return self.get_section("output")

    @property
    def logging(self) -> Dict[str, Any]:
        """Get logging configuration section."""
        return self.get_section("logging")

    @property
    def performance(self) -> Dict[str, Any]:
        """Get performance configuration section."""
        return self.get_section("performance")


def load_config(config_path: str = "config/config.yaml") -> Config:
    """Load configuration from file.

    Args:
        config_path: Path to configuration file

    Returns:
        Loaded configuration object
    """
    return Config(config_path)
