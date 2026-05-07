"""Unit tests for Analysis Engine."""

import pytest

from teaching_methodology_evaluator.engines import AnalysisEngine


class TestAnalysisEngine:
    """Test suite for Analysis Engine."""

    def test_initialization(self):
        """Test Analysis Engine initialization."""
        engine = AnalysisEngine(evidence_threshold=0.8, consistency_threshold=0.9)
        assert engine.evidence_threshold == 0.8
        assert engine.consistency_threshold == 0.9

    def test_default_thresholds(self):
        """Test default threshold values."""
        engine = AnalysisEngine()
        assert engine.evidence_threshold == 0.7
        assert engine.consistency_threshold == 0.8

    def test_extract_content_patterns_not_implemented(self):
        """Test that extract_content_patterns raises NotImplementedError."""
        engine = AnalysisEngine()
        with pytest.raises(NotImplementedError):
            engine.extract_content_patterns([])

    def test_extract_delivery_mechanisms_not_implemented(self):
        """Test that extract_delivery_mechanisms raises NotImplementedError."""
        engine = AnalysisEngine()
        with pytest.raises(NotImplementedError):
            engine.extract_delivery_mechanisms(None)

    def test_evaluate_against_evidence_not_implemented(self):
        """Test that evaluate_against_evidence raises NotImplementedError."""
        engine = AnalysisEngine()
        with pytest.raises(NotImplementedError):
            engine.evaluate_against_evidence(None, {})

    def test_assess_implementation_quality_not_implemented(self):
        """Test that assess_implementation_quality raises NotImplementedError."""
        engine = AnalysisEngine()
        with pytest.raises(NotImplementedError):
            engine.assess_implementation_quality(None, [])

    def test_check_consistency_not_implemented(self):
        """Test that check_consistency raises NotImplementedError."""
        engine = AnalysisEngine()
        with pytest.raises(NotImplementedError):
            engine.check_consistency(None, [])

    def test_evaluate_ai_era_alignment_not_implemented(self):
        """Test that evaluate_ai_era_alignment raises NotImplementedError."""
        engine = AnalysisEngine()
        with pytest.raises(NotImplementedError):
            engine.evaluate_ai_era_alignment([], {})
