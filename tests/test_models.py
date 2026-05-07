"""Unit tests for data models.

This module contains basic tests to verify that all data models can be
instantiated, validated, and serialized correctly.
"""

import pytest
import json
from teaching_methodology_evaluator.models import (
    ResearchSource,
    ResearchFindings,
    Contradiction,
    ContentModule,
    TeachingPattern,
    DeliveryMode,
    DeliveryMechanism,
    AdaptationPoint,
    Exercise,
    Assessment,
    EvidenceRating,
    QualityAssessment,
    ConsistencyReport,
    Deviation,
    MixedConcern,
    Duplication,
    Gap,
    ImpactAssessment,
    DifficultyAssessment,
    Recommendation,
    Platform,
    PlatformEvaluation,
    GitIntegrationAssessment,
    AICompatibilityAssessment,
    WorkflowSupportAssessment,
    ReproducibilityAssessment,
    DeploymentAssessment,
    ExplanationExerciseAssessment,
    ThinkAloudAssessment,
    MockInterviewAssessment,
    CollaborativeCodingAssessment,
    ObserverPracticeAssessment,
)


class TestResearchModels:
    """Tests for research domain models."""

    def test_research_source_creation(self):
        """Test creating a ResearchSource instance."""
        source = ResearchSource(
            title="Test Paper",
            authors=["Author A", "Author B"],
            publication_date="2024-01-15",
            source_type="peer-reviewed",
            url="https://example.com/paper",
            citation="Author A, et al. (2024). Test Paper.",
            abstract="This is a test abstract.",
        )
        assert source.title == "Test Paper"
        assert len(source.authors) == 2
        assert source.source_type == "peer-reviewed"

    def test_research_source_validation(self):
        """Test ResearchSource validation."""
        with pytest.raises(ValueError, match="title is required"):
            ResearchSource(
                title="",
                authors=["Author A"],
                publication_date="2024-01-15",
                source_type="peer-reviewed",
                url="https://example.com",
                citation="Citation",
                abstract="Abstract",
            )

        with pytest.raises(ValueError, match="Invalid source_type"):
            ResearchSource(
                title="Test",
                authors=["Author A"],
                publication_date="2024-01-15",
                source_type="invalid-type",
                url="https://example.com",
                citation="Citation",
                abstract="Abstract",
            )

    def test_research_source_serialization(self):
        """Test ResearchSource JSON serialization."""
        source = ResearchSource(
            title="Test Paper",
            authors=["Author A"],
            publication_date="2024-01-15",
            source_type="peer-reviewed",
            url="https://example.com/paper",
            citation="Citation",
            abstract="Abstract",
        )
        
        # Test to_dict
        source_dict = source.to_dict()
        assert source_dict["title"] == "Test Paper"
        assert isinstance(source_dict["authors"], list)
        
        # Test to_json
        json_str = source.to_json()
        assert isinstance(json_str, str)
        parsed = json.loads(json_str)
        assert parsed["title"] == "Test Paper"
        
        # Test from_dict
        source_copy = ResearchSource.from_dict(source_dict)
        assert source_copy.title == source.title
        assert source_copy.authors == source.authors

    def test_research_findings_creation(self):
        """Test creating a ResearchFindings instance."""
        source = ResearchSource(
            title="Test Paper",
            authors=["Author A"],
            publication_date="2024-01-15",
            source_type="peer-reviewed",
            url="https://example.com",
            citation="Citation",
            abstract="Abstract",
        )
        
        findings = ResearchFindings(
            source=source,
            pedagogical_domain="retrieval practice",
            key_findings=["Finding 1", "Finding 2"],
            methodology="Experimental study",
            sample_size=100,
            conclusions=["Conclusion 1"],
            limitations=["Limitation 1"],
        )
        
        assert findings.pedagogical_domain == "retrieval practice"
        assert len(findings.key_findings) == 2
        assert findings.sample_size == 100


class TestContentModels:
    """Tests for content and delivery models."""

    def test_exercise_creation(self):
        """Test creating an Exercise instance."""
        exercise = Exercise(
            exercise_id="ex-001",
            title="Test Exercise",
            description="A test exercise",
            exercise_type="coding",
            difficulty="beginner",
            estimated_time=30,
        )
        assert exercise.exercise_id == "ex-001"
        assert exercise.difficulty == "beginner"
        assert exercise.estimated_time == 30

    def test_exercise_validation(self):
        """Test Exercise validation."""
        with pytest.raises(ValueError, match="Invalid difficulty"):
            Exercise(
                exercise_id="ex-001",
                title="Test",
                description="Test",
                exercise_type="coding",
                difficulty="invalid",
                estimated_time=30,
            )

        with pytest.raises(ValueError, match="estimated_time must be positive"):
            Exercise(
                exercise_id="ex-001",
                title="Test",
                description="Test",
                exercise_type="coding",
                difficulty="beginner",
                estimated_time=-10,
            )

    def test_content_module_creation(self):
        """Test creating a ContentModule instance."""
        exercise = Exercise(
            exercise_id="ex-001",
            title="Test Exercise",
            description="Test",
            exercise_type="coding",
            difficulty="beginner",
            estimated_time=30,
        )
        
        assessment = Assessment(
            assessment_id="assess-001",
            title="Test Assessment",
            description="Test",
            assessment_type="quiz",
            passing_criteria="70% correct",
        )
        
        module = ContentModule(
            module_id="mod-001",
            title="Test Module",
            learning_objectives=["Objective 1", "Objective 2"],
            pedagogical_patterns=["action-first", "progressive-complexity"],
            exercises=[exercise],
            assessments=[assessment],
            estimated_time_intensive=120,
            estimated_time_self_paced=180,
            prerequisites=[],
            adaptation_points=[],
        )
        
        assert module.module_id == "mod-001"
        assert len(module.learning_objectives) == 2
        assert len(module.exercises) == 1
        assert module.estimated_time_intensive == 120

    def test_teaching_pattern_creation(self):
        """Test creating a TeachingPattern instance."""
        pattern = TeachingPattern(
            pattern_id="pat-001",
            name="Action-First Learning",
            description="Learn by doing",
            pedagogical_principle="Experiential learning",
            implementation_examples=["Example 1", "Example 2"],
            modules_using=["mod-001", "mod-002"],
            evidence_rating="supported",
        )
        
        assert pattern.pattern_id == "pat-001"
        assert pattern.evidence_rating == "supported"
        assert len(pattern.modules_using) == 2


class TestAnalysisModels:
    """Tests for analysis models."""

    def test_deviation_creation(self):
        """Test creating a Deviation instance."""
        deviation = Deviation(
            module_id="mod-001",
            deviation_description="Pattern not fully implemented",
            justified=True,
            justification="Module has unique constraints",
        )
        
        assert deviation.module_id == "mod-001"
        assert deviation.justified is True

    def test_deviation_validation(self):
        """Test Deviation validation."""
        with pytest.raises(ValueError, match="justification is required"):
            Deviation(
                module_id="mod-001",
                deviation_description="Test",
                justified=True,
                justification=None,
            )

    def test_mixed_concern_creation(self):
        """Test creating a MixedConcern instance."""
        concern = MixedConcern(
            location="mod-001",
            description="Content includes delivery-specific elements",
            content_element="Learning content",
            delivery_element="Pacing instructions",
            recommendation="Separate pacing into delivery layer",
        )
        
        assert concern.location == "mod-001"
        assert concern.recommendation is not None

    def test_duplication_creation(self):
        """Test creating a Duplication instance."""
        duplication = Duplication(
            content_description="Introduction to Python",
            intensive_location="Day 1, Module 1",
            self_paced_location="Week 1, Module 1",
            duplication_type="exact",
            consolidation_recommendation="Move to unified content layer",
        )
        
        assert duplication.duplication_type == "exact"
        assert duplication.consolidation_recommendation is not None


class TestGapModels:
    """Tests for gap and recommendation models."""

    def test_impact_assessment_creation(self):
        """Test creating an ImpactAssessment instance."""
        impact = ImpactAssessment(
            impact_level="high",
            expected_outcomes=["Improved retention", "Better engagement"],
            affected_modules=["mod-001", "mod-002"],
            rationale="Research shows significant benefits",
        )
        
        assert impact.impact_level == "high"
        assert len(impact.expected_outcomes) == 2

    def test_impact_assessment_validation(self):
        """Test ImpactAssessment validation."""
        with pytest.raises(ValueError, match="Invalid impact_level"):
            ImpactAssessment(
                impact_level="invalid",
                expected_outcomes=["Outcome 1"],
                affected_modules=["mod-001"],
                rationale="Test",
            )

    def test_difficulty_assessment_creation(self):
        """Test creating a DifficultyAssessment instance."""
        difficulty = DifficultyAssessment(
            difficulty_level="medium",
            required_resources=["Time", "Expertise"],
            estimated_effort="2 weeks",
            dependencies=["dep-001"],
            risks=["Risk 1"],
        )
        
        assert difficulty.difficulty_level == "medium"
        assert len(difficulty.required_resources) == 2


class TestPlatformModels:
    """Tests for platform evaluation models."""

    def test_platform_creation(self):
        """Test creating a Platform instance."""
        platform = Platform(
            name="marimo",
            version="0.1.0",
            format=".py",
            is_git_native=True,
            is_open_source=True,
            cost_model="free",
            url="https://marimo.io",
        )
        
        assert platform.name == "marimo"
        assert platform.is_git_native is True
        assert platform.cost_model == "free"

    def test_platform_validation(self):
        """Test Platform validation."""
        with pytest.raises(ValueError, match="Invalid cost_model"):
            Platform(
                name="Test",
                version="1.0",
                format=".py",
                is_git_native=True,
                is_open_source=True,
                cost_model="invalid",
                url="https://example.com",
            )

    def test_git_integration_assessment_creation(self):
        """Test creating a GitIntegrationAssessment instance."""
        platform = Platform(
            name="marimo",
            version="0.1.0",
            format=".py",
            is_git_native=True,
            is_open_source=True,
            cost_model="free",
            url="https://marimo.io",
        )
        
        assessment = GitIntegrationAssessment(
            platform=platform,
            file_format="plain text",
            diff_readability="excellent",
            merge_conflict_handling="easy",
            supports_modular_imports=True,
            supports_clean_commits=True,
            assessment_details="Excellent Git integration",
        )
        
        assert assessment.file_format == "plain text"
        assert assessment.diff_readability == "excellent"


class TestInterviewPrepModels:
    """Tests for interview preparation models."""

    def test_explanation_exercise_assessment_creation(self):
        """Test creating an ExplanationExerciseAssessment instance."""
        assessment = ExplanationExerciseAssessment(
            total_modules=72,
            modules_with_explanation_exercises=50,
            coverage_percentage=69.4,
            exercise_quality="good",
            frequency_per_module=2.5,
            examples=["Example 1", "Example 2"],
            gaps=["Gap 1"],
        )
        
        assert assessment.total_modules == 72
        assert assessment.coverage_percentage == 69.4
        assert assessment.exercise_quality == "good"

    def test_explanation_exercise_assessment_validation(self):
        """Test ExplanationExerciseAssessment validation."""
        with pytest.raises(ValueError, match="coverage_percentage must be between"):
            ExplanationExerciseAssessment(
                total_modules=72,
                modules_with_explanation_exercises=50,
                coverage_percentage=150.0,
                exercise_quality="good",
                frequency_per_module=2.5,
                examples=[],
                gaps=[],
            )

    def test_mock_interview_assessment_creation(self):
        """Test creating a MockInterviewAssessment instance."""
        assessment = MockInterviewAssessment(
            intensive_mode_mock_count=3,
            self_paced_mode_mock_count=2,
            mock_interview_quality="authentic",
            includes_peer_observation=True,
            includes_feedback_mechanisms=True,
            alignment_with_research="strong",
            gaps=[],
        )
        
        assert assessment.intensive_mode_mock_count == 3
        assert assessment.mock_interview_quality == "authentic"
        assert assessment.alignment_with_research == "strong"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
