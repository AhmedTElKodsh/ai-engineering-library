"""Research domain data models.

This module defines data models for representing research sources, findings,
and contradictions in pedagogical literature.
"""

from dataclasses import dataclass, field
from typing import List, Optional
import json


@dataclass
class ResearchSource:
    """Represents a research publication.
    
    Attributes:
        title: The title of the research publication
        authors: List of author names
        publication_date: Publication date in ISO format (YYYY-MM-DD)
        source_type: Type of source (e.g., "peer-reviewed", "conference", "book", "blog")
        url: URL to access the source
        citation: Formatted citation string
        abstract: Abstract or summary of the publication
    """
    title: str
    authors: List[str]
    publication_date: str
    source_type: str
    url: str
    citation: str
    abstract: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.title:
            raise ValueError("title is required")
        if not self.authors:
            raise ValueError("authors list cannot be empty")
        if not self.publication_date:
            raise ValueError("publication_date is required")
        if self.source_type not in ["peer-reviewed", "conference", "book", "blog", "report", "thesis"]:
            raise ValueError(f"Invalid source_type: {self.source_type}")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "title": self.title,
            "authors": self.authors,
            "publication_date": self.publication_date,
            "source_type": self.source_type,
            "url": self.url,
            "citation": self.citation,
            "abstract": self.abstract,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "ResearchSource":
        """Create instance from dictionary."""
        return cls(**data)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class ResearchFindings:
    """Key findings extracted from a research source.
    
    Attributes:
        source: The research source these findings come from
        pedagogical_domain: The pedagogical domain (e.g., "retrieval practice", "spaced repetition")
        key_findings: List of key findings from the research
        methodology: Description of the research methodology
        sample_size: Sample size of the study (if applicable)
        conclusions: List of conclusions drawn from the research
        limitations: List of study limitations
    """
    source: ResearchSource
    pedagogical_domain: str
    key_findings: List[str]
    methodology: str
    sample_size: Optional[int]
    conclusions: List[str]
    limitations: List[str] = field(default_factory=list)

    def __post_init__(self):
        """Validate required fields."""
        if not self.pedagogical_domain:
            raise ValueError("pedagogical_domain is required")
        if not self.key_findings:
            raise ValueError("key_findings list cannot be empty")
        if not self.methodology:
            raise ValueError("methodology is required")
        if not self.conclusions:
            raise ValueError("conclusions list cannot be empty")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "source": self.source.to_dict(),
            "pedagogical_domain": self.pedagogical_domain,
            "key_findings": self.key_findings,
            "methodology": self.methodology,
            "sample_size": self.sample_size,
            "conclusions": self.conclusions,
            "limitations": self.limitations,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "ResearchFindings":
        """Create instance from dictionary."""
        data_copy = data.copy()
        data_copy["source"] = ResearchSource.from_dict(data["source"])
        return cls(**data_copy)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class Contradiction:
    """Represents contradictory findings across sources.
    
    Attributes:
        domain: The pedagogical domain where the contradiction exists
        finding_a: First research finding
        finding_b: Second research finding that contradicts the first
        contradiction_description: Description of the contradiction
        requires_manual_review: Whether this contradiction requires expert review
    """
    domain: str
    finding_a: ResearchFindings
    finding_b: ResearchFindings
    contradiction_description: str
    requires_manual_review: bool = True

    def __post_init__(self):
        """Validate required fields."""
        if not self.domain:
            raise ValueError("domain is required")
        if not self.contradiction_description:
            raise ValueError("contradiction_description is required")
        if self.finding_a.pedagogical_domain != self.finding_b.pedagogical_domain:
            raise ValueError("Both findings must be from the same pedagogical domain")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "domain": self.domain,
            "finding_a": self.finding_a.to_dict(),
            "finding_b": self.finding_b.to_dict(),
            "contradiction_description": self.contradiction_description,
            "requires_manual_review": self.requires_manual_review,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Contradiction":
        """Create instance from dictionary."""
        data_copy = data.copy()
        data_copy["finding_a"] = ResearchFindings.from_dict(data["finding_a"])
        data_copy["finding_b"] = ResearchFindings.from_dict(data["finding_b"])
        return cls(**data_copy)

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)
