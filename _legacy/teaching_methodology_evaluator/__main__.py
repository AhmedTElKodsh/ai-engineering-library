"""Command-line interface for the Teaching Methodology Evaluator."""

import argparse
import sys
from pathlib import Path
from typing import List, Optional

from .utils import load_config, setup_logging_from_config


def create_parser() -> argparse.ArgumentParser:
    """Create command-line argument parser.

    Returns:
        Configured argument parser
    """
    parser = argparse.ArgumentParser(
        prog="teaching-methodology-evaluator",
        description="A systematic tool to research, evaluate, and improve teaching methodologies",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    parser.add_argument(
        "--version",
        action="version",
        version="%(prog)s 0.1.0",
    )

    parser.add_argument(
        "--config",
        type=str,
        default="config/config.yaml",
        help="Path to configuration file (default: config/config.yaml)",
    )

    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Evaluate command
    evaluate_parser = subparsers.add_parser(
        "evaluate",
        help="Run complete evaluation of teaching methodologies",
    )
    evaluate_parser.add_argument(
        "--output-dir",
        type=str,
        help="Output directory for reports (overrides config)",
    )
    evaluate_parser.add_argument(
        "--formats",
        type=str,
        nargs="+",
        choices=["markdown", "html", "json", "pdf"],
        help="Output formats (overrides config)",
    )

    # Analyze command
    analyze_parser = subparsers.add_parser(
        "analyze",
        help="Run specific analysis component",
    )
    analyze_parser.add_argument(
        "--component",
        type=str,
        required=True,
        choices=["research", "analysis", "comparison", "gaps", "platform", "interview-prep"],
        help="Analysis component to run",
    )
    analyze_parser.add_argument(
        "--output",
        type=str,
        help="Output file for analysis results",
    )

    # Report command
    report_parser = subparsers.add_parser(
        "report",
        help="Generate report from existing analysis",
    )
    report_parser.add_argument(
        "--input",
        type=str,
        required=True,
        help="Input file with analysis results (JSON)",
    )
    report_parser.add_argument(
        "--output-dir",
        type=str,
        help="Output directory for reports",
    )
    report_parser.add_argument(
        "--formats",
        type=str,
        nargs="+",
        choices=["markdown", "html", "json", "pdf"],
        help="Output formats",
    )

    # Init command
    init_parser = subparsers.add_parser(
        "init",
        help="Initialize project directories and configuration",
    )
    init_parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing directories",
    )

    return parser


def cmd_evaluate(args: argparse.Namespace, config: dict) -> int:
    """Execute the evaluate command.

    Args:
        args: Parsed command-line arguments
        config: Configuration dictionary

    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    print("Running complete evaluation...")
    print(f"Configuration: {args.config}")

    # TODO: Implement evaluation logic when engines are ready
    print("\n⚠️  Evaluation engines not yet implemented.")
    print("This will be implemented in Phase 2-8 of the project.")
    print("\nPlanned workflow:")
    print("  1. Research Engine: Retrieve pedagogical research (2024-2026)")
    print("  2. Analysis Engine: Evaluate teaching patterns and delivery mechanisms")
    print("  3. Comparison Engine: Assess content-delivery separation")
    print("  4. Gap Analysis Engine: Identify missing patterns and mechanisms")
    print("  5. Platform Evaluator: Evaluate learning platforms and tools")
    print("  6. Interview Prep Assessor: Assess interview preparation integration")
    print("  7. Synthesis Engine: Create unified framework and recommendations")
    print("  8. Report Generation: Generate comprehensive evaluation report")

    return 0


def cmd_analyze(args: argparse.Namespace, config: dict) -> int:
    """Execute the analyze command.

    Args:
        args: Parsed command-line arguments
        config: Configuration dictionary

    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    print(f"Running {args.component} analysis...")

    # TODO: Implement analysis logic when engines are ready
    print(f"\n⚠️  {args.component.title()} engine not yet implemented.")
    print("This will be implemented in upcoming phases.")

    return 0


def cmd_report(args: argparse.Namespace, config: dict) -> int:
    """Execute the report command.

    Args:
        args: Parsed command-line arguments
        config: Configuration dictionary

    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    print(f"Generating report from {args.input}...")

    # TODO: Implement report generation when report module is ready
    print("\n⚠️  Report generation not yet implemented.")
    print("This will be implemented in Phase 9 of the project.")

    return 0


def cmd_init(args: argparse.Namespace, config: dict) -> int:
    """Execute the init command.

    Args:
        args: Parsed command-line arguments
        config: Configuration dictionary

    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    print("Initializing project directories...")

    # Create required directories
    directories = [
        "cache/research",
        "output/reports",
        "logs",
        "curriculum/content",
        "curriculum/delivery",
        "templates",
    ]

    for directory in directories:
        dir_path = Path(directory)
        if dir_path.exists() and not args.force:
            print(f"  ✓ {directory} (already exists)")
        else:
            dir_path.mkdir(parents=True, exist_ok=True)
            print(f"  ✓ {directory} (created)")

    # Create .env file if it doesn't exist
    env_path = Path(".env")
    if not env_path.exists():
        env_example = Path(".env.example")
        if env_example.exists():
            import shutil

            shutil.copy(env_example, env_path)
            print("\n  ✓ .env file created from .env.example")
            print("  ⚠️  Please edit .env and add your API keys")
        else:
            print("\n  ⚠️  .env.example not found, skipping .env creation")
    else:
        print("\n  ✓ .env file already exists")

    print("\n✅ Initialization complete!")
    return 0


def main(argv: Optional[List[str]] = None) -> int:
    """Main entry point for the CLI.

    Args:
        argv: Command-line arguments (defaults to sys.argv)

    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    parser = create_parser()
    args = parser.parse_args(argv)

    # If no command specified, show help
    if not args.command:
        parser.print_help()
        return 0

    try:
        # Load configuration
        config = load_config(args.config)

        # Set up logging
        logger = setup_logging_from_config(config.logging)
        logger.info(f"Starting Teaching Methodology Evaluator - Command: {args.command}")

        # Execute command
        if args.command == "evaluate":
            return cmd_evaluate(args, config)
        elif args.command == "analyze":
            return cmd_analyze(args, config)
        elif args.command == "report":
            return cmd_report(args, config)
        elif args.command == "init":
            return cmd_init(args, config)
        else:
            print(f"Unknown command: {args.command}")
            return 1

    except FileNotFoundError as e:
        print(f"Error: {e}", file=sys.stderr)
        print("\nTip: Run 'python -m teaching_methodology_evaluator init' to set up directories")
        return 1
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
