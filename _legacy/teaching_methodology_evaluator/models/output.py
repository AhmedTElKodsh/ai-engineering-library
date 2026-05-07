"""Output data models.

This module defines data models for representing the final outputs including
unified frameworks, chapter templates, and evaluation reports.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional
import json


@dataclass
class DecisionTree:
    """Represents a decision tree for choosing between patterns.
    
    Attributes:
        tree_id: Unique identifier for the decision tree
        title: Decision tree title
        description: Description of what the tree helps decide
        nodes: Dictionary mapping node IDs to decision nodes
        root_node_id: ID of the root node
    """
    tree_id: str
    title: str
    description: str
    nodes: Dict[str, dict]
    root_node_id: str

    def __post_init__(self):
        """Validate required fields."""
        if not self.tree_id:
            raise ValueError("tree_id is required")
        if not self.title:
            raise ValueError("title is required")
        if not self.nodes:
            raise ValueError("nodes dictionary cannot be empty")
        if self.root_node_id not in self.nodes:
            raise ValueError("root_node_id must exist in nodes")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "tree_id": self.tree_id,
            "title": self.title,
            "description": self.description,
            "nodes": self.nodes,
            "root_node_id": self.root_node_id,
        }


@dataclass
class PlatformRequirements:
    """Platform and tooling requirements.
    
    Attributes:
        format: File format (e.g., "marimo .py files")
        git_native: Whether the format is Git-native (plain text)
        reproducible_execution: Whether execution is reproducible
        ai_compatible: Whether compatible with AI coding assistants
        deployment_capable: Whether content can be deployed
        testing_support: Whether testing is supported
    """
    format: str
    git_native: bool
    reproducible_execution: bool
    ai_compatible: bool
    deployment_capable: bool
    testing_support: bool

    def __post_init__(self):
        """Validate required fields."""
        if not self.format:
            raise ValueError("format is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "format": self.format,
            "git_native": self.git_native,
            "reproducible_execution": self.reproducible_execution,
            "ai_compatible": self.ai_compatible,
            "deployment_capable": self.deployment_capable,
            "testing_support": self.testing_support,
        }


@dataclass
class TemplateSection:
    """Section of chapter template.
    
    Attributes:
        section_id: Unique identifier for the section
        name: Section name
        description: Section description
        pedagogical_rationale: Pedagogical rationale for the section
        universal: Whether the section is the same across all modes
        implementation_guidance: Guidance for implementing the section
        examples: List of implementation examples
    """
    section_id: str
    name: str
    description: str
    pedagogical_rationale: str
    universal: bool
    implementation_guidance: str
    examples: List[str] = field(default_factory=list)

    def __post_init__(self):
        """Validate required fields."""
        if not self.section_id:
            raise ValueError("section_id is required")
        if not self.name:
            raise ValueError("name is required")
        if not self.description:
            raise ValueError("description is required")
        if not self.pedagogical_rationale:
            raise ValueError("pedagogical_rationale is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "section_id": self.section_id,
            "name": self.name,
            "description": self.description,
            "pedagogical_rationale": self.pedagogical_rationale,
            "universal": self.universal,
            "implementation_guidance": self.implementation_guidance,
            "examples": self.examples,
        }


@dataclass
class ChapterTemplate:
    """Unified chapter template with adaptation points.
    
    Attributes:
        template_id: Unique identifier for the template
        version: Template version
        sections: List of template sections
        required_patterns: List of required pattern names
        adaptation_points: List of adaptation points for delivery modes
        author_checklist: Checklist for authors
        common_mistakes: List of common mistakes to avoid
        platform_requirements: Platform and tooling requirements
    """
    template_id: str
    version: str
    sections: List[TemplateSection]
    required_patterns: List[str]
    adaptation_points: List["AdaptationPoint"]  # Forward reference
    author_checklist: List[str]
    common_mistakes: List[str]
    platform_requirements: PlatformRequirements

    def __post_init__(self):
        """Validate required fields."""
        if not self.template_id:
            raise ValueError("template_id is required")
        if not self.version:
            raise ValueError("version is required")
        if not self.sections:
            raise ValueError("sections list cannot be empty")
        if not self.required_patterns:
            raise ValueError("required_patterns list cannot be empty")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "template_id": self.template_id,
            "version": self.version,
            "sections": [s.to_dict() for s in self.sections],
            "required_patterns": self.required_patterns,
            "adaptation_points": [ap.to_dict() for ap in self.adaptation_points],
            "author_checklist": self.author_checklist,
            "common_mistakes": self.common_mistakes,
            "platform_requirements": self.platform_requirements.to_dict(),
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class UnifiedFramework:
    """Unified teaching methodology framework.
    
    Attributes:
        framework_id: Unique identifier for the framework
        version: Framework version
        pedagogical_domains: Dictionary mapping domain names to teaching patterns
        implementation_guidance: Dictionary mapping pattern names to guidance
        decision_trees: List of decision trees for choosing patterns
        effectiveness_criteria: Dictionary mapping pattern names to effectiveness criteria
    """
    framework_id: str
    version: str
    pedagogical_domains: Dict[str, List["TeachingPattern"]]  # Forward reference
    implementation_guidance: Dict[str, str]
    decision_trees: List[DecisionTree]
    effectiveness_criteria: Dict[str, List[str]]

    def __post_init__(self):
        """Validate required fields."""
        if not self.framework_id:
            raise ValueError("framework_id is required")
        if not self.version:
            raise ValueError("version is required")
        if not self.pedagogical_domains:
            raise ValueError("pedagogical_domains dictionary cannot be empty")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "framework_id": self.framework_id,
            "version": self.version,
            "pedagogical_domains": {
                domain: [p.to_dict() for p in patterns]
                for domain, patterns in self.pedagogical_domains.items()
            },
            "implementation_guidance": self.implementation_guidance,
            "decision_trees": [dt.to_dict() for dt in self.decision_trees],
            "effectiveness_criteria": self.effectiveness_criteria,
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


@dataclass
class ContentAnalysisSection:
    """Content layer analysis section of the report.
    
    Attributes:
        patterns_analyzed: Number of patterns analyzed
        evidence_supported: Number of evidence-supported patterns
        evidence_weak: Number of evidence-weak patterns
        evidence_contrary: Number of evidence-contrary patterns
        quality_assessments: List of quality assessments
        consistency_reports: List of consistency reports
        key_findings: List of key findings
        recommendations: List of recommendations
    """
    patterns_analyzed: int
    evidence_supported: int
    evidence_weak: int
    evidence_contrary: int
    quality_assessments: List["QualityAssessment"]  # Forward reference
    consistency_reports: List["ConsistencyReport"]  # Forward reference
    key_findings: List[str]
    recommendations: List[str]

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "patterns_analyzed": self.patterns_analyzed,
            "evidence_supported": self.evidence_supported,
            "evidence_weak": self.evidence_weak,
            "evidence_contrary": self.evidence_contrary,
            "quality_assessments": [qa.to_dict() for qa in self.quality_assessments],
            "consistency_reports": [cr.to_dict() for cr in self.consistency_reports],
            "key_findings": self.key_findings,
            "recommendations": self.recommendations,
        }


@dataclass
class DeliveryAnalysisSection:
    """Delivery mode analysis section of the report.
    
    Attributes:
        mode_name: Name of the delivery mode
        mechanisms_analyzed: Number of mechanisms analyzed
        evidence_supported: Number of evidence-supported mechanisms
        evidence_weak: Number of evidence-weak mechanisms
        evidence_contrary: Number of evidence-contrary mechanisms
        key_findings: List of key findings
        recommendations: List of recommendations
    """
    mode_name: str
    mechanisms_analyzed: int
    evidence_supported: int
    evidence_weak: int
    evidence_contrary: int
    key_findings: List[str]
    recommendations: List[str]

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "mode_name": self.mode_name,
            "mechanisms_analyzed": self.mechanisms_analyzed,
            "evidence_supported": self.evidence_supported,
            "evidence_weak": self.evidence_weak,
            "evidence_contrary": self.evidence_contrary,
            "key_findings": self.key_findings,
            "recommendations": self.recommendations,
        }


@dataclass
class SeparationAnalysisSection:
    """Content-delivery separation analysis section.
    
    Attributes:
        mixed_concerns: List of mixed concerns identified
        content_reuse_percentage: Percentage of content reused across modes
        duplication_count: Number of duplications identified
        key_findings: List of key findings
        recommendations: List of recommendations
    """
    mixed_concerns: List["MixedConcern"]  # Forward reference
    content_reuse_percentage: float
    duplication_count: int
    key_findings: List[str]
    recommendations: List[str]

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "mixed_concerns": [mc.to_dict() for mc in self.mixed_concerns],
            "content_reuse_percentage": self.content_reuse_percentage,
            "duplication_count": self.duplication_count,
            "key_findings": self.key_findings,
            "recommendations": self.recommendations,
        }


@dataclass
class GapAnalysisSection:
    """Gap analysis section of the report.
    
    Attributes:
        content_gaps: List of content layer gaps
        intensive_gaps: List of Intensive Mode gaps
        self_paced_gaps: List of Self-Paced Mode gaps
        prioritized_gaps: List of gaps sorted by priority
        quick_wins: List of quick win gaps
        key_findings: List of key findings
    """
    content_gaps: List["Gap"]  # Forward reference
    intensive_gaps: List["Gap"]  # Forward reference
    self_paced_gaps: List["Gap"]  # Forward reference
    prioritized_gaps: List["Gap"]  # Forward reference
    quick_wins: List["Gap"]  # Forward reference
    key_findings: List[str]

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "content_gaps": [g.to_dict() for g in self.content_gaps],
            "intensive_gaps": [g.to_dict() for g in self.intensive_gaps],
            "self_paced_gaps": [g.to_dict() for g in self.self_paced_gaps],
            "prioritized_gaps": [g.to_dict() for g in self.prioritized_gaps],
            "quick_wins": [g.to_dict() for g in self.quick_wins],
            "key_findings": self.key_findings,
        }


@dataclass
class RedundancyAnalysisSection:
    """Redundancy analysis section of the report.
    
    Attributes:
        redundant_patterns: List of redundant pattern pairs
        conflicting_patterns: List of conflicting pattern pairs
        consolidation_recommendations: List of consolidation recommendations
        key_findings: List of key findings
    """
    redundant_patterns: List[tuple]
    conflicting_patterns: List[tuple]
    consolidation_recommendations: List[str]
    key_findings: List[str]

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "redundant_patterns": self.redundant_patterns,
            "conflicting_patterns": self.conflicting_patterns,
            "consolidation_recommendations": self.consolidation_recommendations,
            "key_findings": self.key_findings,
        }


@dataclass
class ImplementationRoadmap:
    """Implementation roadmap organizing recommendations by phase.
    
    Attributes:
        phases: Dictionary mapping phase names to lists of recommendation IDs
        timeline: Estimated timeline for each phase
        dependencies: Dictionary mapping recommendation IDs to their dependencies
        milestones: List of key milestones
    """
    phases: Dict[str, List[str]]
    timeline: Dict[str, str]
    dependencies: Dict[str, List[str]]
    milestones: List[str]

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "phases": self.phases,
            "timeline": self.timeline,
            "dependencies": self.dependencies,
            "milestones": self.milestones,
        }


@dataclass
class EvaluationReport:
    """Comprehensive evaluation report.
    
    Attributes:
        report_id: Unique identifier for the report
        generation_date: Report generation date (ISO format)
        executive_summary: Executive summary of findings
        research_findings: Dictionary mapping domains to research findings
        content_analysis: Content layer analysis section
        intensive_analysis: Intensive Mode analysis section
        self_paced_analysis: Self-Paced Mode analysis section
        separation_analysis: Content-delivery separation analysis
        gap_analysis: Gap analysis section
        redundancy_analysis: Redundancy analysis section
        unified_framework: Unified teaching methodology framework
        recommendations: List of prioritized recommendations
        chapter_template: Unified chapter template
        bibliography: List of research sources cited
        implementation_roadmap: Implementation roadmap
        platform_evaluation: Platform evaluation section
        interview_prep_assessment: Interview preparation assessment section
    """
    report_id: str
    generation_date: str
    executive_summary: str
    research_findings: Dict[str, List["ResearchFindings"]]  # Forward reference
    content_analysis: ContentAnalysisSection
    intensive_analysis: DeliveryAnalysisSection
    self_paced_analysis: DeliveryAnalysisSection
    separation_analysis: SeparationAnalysisSection
    gap_analysis: GapAnalysisSection
    redundancy_analysis: RedundancyAnalysisSection
    unified_framework: UnifiedFramework
    recommendations: List["Recommendation"]  # Forward reference
    chapter_template: ChapterTemplate
    bibliography: List["ResearchSource"]  # Forward reference
    implementation_roadmap: ImplementationRoadmap
    platform_evaluation: "PlatformEvaluationSection"  # Forward reference
    interview_prep_assessment: "InterviewPrepSection"  # Forward reference

    def __post_init__(self):
        """Validate required fields."""
        if not self.report_id:
            raise ValueError("report_id is required")
        if not self.generation_date:
            raise ValueError("generation_date is required")
        if not self.executive_summary:
            raise ValueError("executive_summary is required")

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "report_id": self.report_id,
            "generation_date": self.generation_date,
            "executive_summary": self.executive_summary,
            "research_findings": {
                domain: [rf.to_dict() for rf in findings]
                for domain, findings in self.research_findings.items()
            },
            "content_analysis": self.content_analysis.to_dict(),
            "intensive_analysis": self.intensive_analysis.to_dict(),
            "self_paced_analysis": self.self_paced_analysis.to_dict(),
            "separation_analysis": self.separation_analysis.to_dict(),
            "gap_analysis": self.gap_analysis.to_dict(),
            "redundancy_analysis": self.redundancy_analysis.to_dict(),
            "unified_framework": self.unified_framework.to_dict(),
            "recommendations": [r.to_dict() for r in self.recommendations],
            "chapter_template": self.chapter_template.to_dict(),
            "bibliography": [b.to_dict() for b in self.bibliography],
            "implementation_roadmap": self.implementation_roadmap.to_dict(),
            "platform_evaluation": self.platform_evaluation.to_dict(),
            "interview_prep_assessment": self.interview_prep_assessment.to_dict(),
        }

    def to_json(self) -> str:
        """Convert to JSON string."""
        return json.dumps(self.to_dict(), indent=2)


# Import types for forward references
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from .content import TeachingPattern, AdaptationPoint
    from .research import ResearchSource, ResearchFindings
    from .analysis import QualityAssessment, ConsistencyReport, MixedConcern
    from .gaps import Gap, Recommendation
    from .platform import PlatformEvaluationSection
    from .interview_prep import InterviewPrepSection
