"""Analysis data models.

This module defines data models for representing analysis results including
evidence ratings, quality assessments, consistency reports, and comparisons.
"""

from dataclasses import dataclass, field
from typing import List, Optional, Union
import json


@dataclass
class EvidenceRating:
    """Rating of a pattern/mechanism against research evidence.
    
    Attributes:
        element: The teaching pattern or delivery mechanism being rated
        rating: Evidence rating ("evidence-supported", "evidence-weak", "evidence-contrary")
        supporting_research: List of research findings supporting the rating
        rationale: Explanation of the rating
        confidence: Confidence level ("high", "medium", "low")
    """
    element: Union["TeachingPattern", "DeliveryMechanism"]  # Forward reference
    rating: str
    supporting_research: List["ResearchFindings"]  # Forward reference
    rationale: str
    confidence: str

    def __post_init__(self):
        """Validate required fields."""
        if self.rating not in ["evidence-supported", "evidence-weak", "evidence-contrary"]:
            raise ValueError(f"Invalid rating: {self.rating}")
        if self.confidence not in ["high", "medium", "low"]:
            raise ValueError(f"Invalid confidence: {self.confidence}")
        if not self.rationale:
            raise ValueError("rationale is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "element": self.element.to_dict() if hasattr(self.element, "to_dict") else str(self.element),
            "rating": self.rating,
            "supporting_research": [r.to_dict() for r in self.supporting_research],
            "rationale": self.rationale,
            "confidence": self.confidence,
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class QualityAssessment:
    """Assessment of implementation quality.
    
    Attributes:
        pattern: The teaching pattern being assessed
        quality_score: Quality score from 0.0 to 1.0
        strengths: List of implementation strengths
        weaknesses: List of implementation weaknesses
        improvement_suggestions: List of suggestions for improvement
    """
    pattern: "TeachingPattern"  # Forward reference
    quality_score: float
    strengths: List[str]
    weaknesses: List[str]
    improvement_suggestions: List[str]

    def __post_init__(self):
        """Validate required fields."""
        if not 0.0 <= self.quality_score <= 1.0:
            raise ValueError("quality_score must be between 0.0 and 1.0")
        if not self.strengths and not self.weaknesses:
            raise ValueError("At least one strength or weakness must be provided")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "pattern": self.pattern.to_dict() if hasattr(self.pattern, "to_dict") else str(self.pattern),
            "quality_score": self.quality_score,
            "strengths": self.strengths,
            "weaknesses": self.weaknesses,
            "improvement_suggestions": self.improvement_suggestions,
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class Deviation:
    """Represents a deviation from standard pattern implementation.
    
    Attributes:
        module_id: ID of the module with the deviation
        deviation_description: Description of the deviation
        justified: Whether the deviation is justified
        justification: Justification for the deviation (if justified)
    """
    module_id: str
    deviation_description: str
    justified: bool
    justification: Optional[str] = None

    def __post_init__(self):
        """Validate required fields."""
        if not self.module_id:
            raise ValueError("module_id is required")
        if not self.deviation_description:
            raise ValueError("deviation_description is required")
        if self.justified and not self.justification:
            raise ValueError("justification is required when deviation is justified")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "module_id": self.module_id,
            "deviation_description": self.deviation_description,
            "justified": self.justified,
            "justification": self.justification,
        }


@dataclass
class ConsistencyReport:
    """Report on pattern consistency across modules.
    
    Attributes:
        pattern: The teaching pattern being evaluated
        modules_implementing: List of module IDs implementing the pattern
        modules_missing: List of module IDs missing the pattern
        consistency_score: Consistency score from 0.0 to 1.0
        deviations: List of deviations from standard implementation
    """
    pattern: "TeachingPattern"  # Forward reference
    modules_implementing: List[str]
    modules_missing: List[str]
    consistency_score: float
    deviations: List[Deviation] = field(default_factory=list)

    def __post_init__(self):
        """Validate required fields."""
        if not 0.0 <= self.consistency_score <= 1.0:
            raise ValueError("consistency_score must be between 0.0 and 1.0")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "pattern": self.pattern.to_dict() if hasattr(self.pattern, "to_dict") else str(self.pattern),
            "modules_implementing": self.modules_implementing,
            "modules_missing": self.modules_missing,
            "consistency_score": self.consistency_score,
            "deviations": [d.to_dict() for d in self.deviations],
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class MixedConcern:
    """Represents inappropriate mixing of content and delivery concerns.
    
    Attributes:
        location: Module or delivery mode where mixing occurs
        description: Description of the mixed concern
        content_element: The content element that's mixed
        delivery_element: The delivery element that's mixed
        recommendation: Recommendation for separating concerns
    """
    location: str
    description: str
    content_element: str
    delivery_element: str
    recommendation: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.location:
            raise ValueError("location is required")
        if not self.description:
            raise ValueError("description is required")
        if not self.recommendation:
            raise ValueError("recommendation is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "location": self.location,
            "description": self.description,
            "content_element": self.content_element,
            "delivery_element": self.delivery_element,
            "recommendation": self.recommendation,
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class Duplication:
    """Represents duplicated content between delivery modes.
    
    Attributes:
        content_description: Description of the duplicated content
        intensive_location: Location in Intensive Mode
        self_paced_location: Location in Self-Paced Mode
        duplication_type: Type of duplication ("exact", "partial", "unnecessary")
        consolidation_recommendation: Recommendation for consolidating the duplication
    """
    content_description: str
    intensive_location: str
    self_paced_location: str
    duplication_type: str
    consolidation_recommendation: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.content_description:
            raise ValueError("content_description is required")
        if self.duplication_type not in ["exact", "partial", "unnecessary"]:
            raise ValueError(f"Invalid duplication_type: {self.duplication_type}")
        if not self.consolidation_recommendation:
            raise ValueError("consolidation_recommendation is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "content_description": self.content_description,
            "intensive_location": self.intensive_location,
            "self_paced_location": self.self_paced_location,
            "duplication_type": self.duplication_type,
            "consolidation_recommendation": self.consolidation_recommendation,
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


# Import types for forward references
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from .content import TeachingPattern, DeliveryMechanism
    from .research import ResearchFindings
