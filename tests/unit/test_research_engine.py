"""Unit tests for Research Engine."""

import pytest

from teaching_methodology_evaluator.engines import ResearchEngine
from teaching_methodology_evaluator.models import ResearchSource


class TestResearchEngine:
    """Test suite for Research Engine."""

    def test_initialization(self):
        """Test Research Engine initialization."""
        engine = ResearchEngine(cache_dir="./test_cache", rate_limit=5)
        assert engine.cache_dir == "./test_cache"
        assert engine.rate_limit == 5

    def test_search_research_not_implemented(self):
        """Test that search_research raises NotImplementedError."""
        engine = ResearchEngine()
        with pytest.raises(NotImplementedError):
            engine.search_research(
                query="spaced repetition",
                domains=["educational pedagogy"],
            )

    def test_extract_findings_not_implemented(self):
        """Test that extract_findings raises NotImplementedError."""
        engine = ResearchEngine()
        source = ResearchSource(
            title="Test Paper",
            authors=["Smith, J."],
            publication_date="2024-01-01",
            source_type="peer-reviewed",
            url="https://example.com",
            citation="Smith, J. (2024). Test Paper.",
            abstract="Test abstract",
        )
        with pytest.raises(NotImplementedError):
            engine.extract_findings(source)

    def test_organize_by_domain_not_implemented(self):
        """Test that organize_by_domain raises NotImplementedError."""
        engine = ResearchEngine()
        with pytest.raises(NotImplementedError):
            engine.organize_by_domain([])

    def test_identify_contradictions_not_implemented(self):
        """Test that identify_contradictions raises NotImplementedError."""
        engine = ResearchEngine()
        with pytest.raises(NotImplementedError):
            engine.identify_contradictions([])
