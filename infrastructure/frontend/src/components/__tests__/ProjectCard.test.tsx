import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProjectCard from '../ProjectCard';
import { BrowserRouter } from 'react-router-dom';

describe('ProjectCard', () => {
  const mockProject = {
    id: 'proj-1',
    title: 'My Project',
    type: 'mini-project',
    status: 'approved',
    githubUrl: 'https://github.com/user/project',
    demoUrl: 'https://demo.example.com',
    reviewScore: 85,
    technologies: ['React', 'TypeScript'],
    revisionNumber: 2,
    isPortfolioReady: true,
    chapterId: 'ch-1',
  };

  const mockOnMarkReady = vi.fn();
  const mockOnViewReview = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project title and type', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('My Project')).toBeInTheDocument();
    expect(screen.getByText('mini-project')).toBeInTheDocument();
  });

  it('displays type icon', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    // Should have the mini-project icon (🔨)
    expect(screen.getByText(/🔨/)).toBeInTheDocument();
  });

  it('shows review score when available', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('85/100')).toBeInTheDocument();
  });

  it('displays technologies as tags', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('shows revision number when > 0', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('Revision 2')).toBeInTheDocument();
  });

  it('renders GitHub link when provided', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders demo link when provided', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });

  it('shows "Portfolio Ready" button when approved and portfolio ready', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('✓ Portfolio Ready')).toBeInTheDocument();
  });

  it('calls onMarkReady when portfolio ready button is clicked', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    const button = screen.getByText('✓ Portfolio Ready');
    fireEvent.click(button);
    expect(mockOnMarkReady).toHaveBeenCalledWith('proj-1', false);
  });

  it('shows "Mark Ready" button when not portfolio ready', () => {
    const project = { ...mockProject, isPortfolioReady: false };
    render(
      <BrowserRouter>
        <ProjectCard project={project} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('Mark Ready')).toBeInTheDocument();
  });

  it('shows "View Review" button when status is not not-submitted', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('View Review')).toBeInTheDocument();
  });

  it('calls onViewReview when View Review is clicked', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    const button = screen.getByText('View Review');
    fireEvent.click(button);
    expect(mockOnViewReview).toHaveBeenCalledWith('proj-1');
  });

  it('shows "Submit Project" link when status is not-submitted', () => {
    const project = { ...mockProject, status: 'not-submitted', chapterId: 'ch-1' };
    render(
      <BrowserRouter>
        <ProjectCard project={project} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    expect(screen.getByText('Submit Project')).toBeInTheDocument();
  });

  it('applies correct border color based on status', () => {
    const project = { ...mockProject, status: 'pending-review' };
    const { container } = render(
      <BrowserRouter>
        <ProjectCard project={project} onMarkReady={mockOnMarkReady} onViewReview={mockOnViewReview} />
      </BrowserRouter>
    );
    const card = container.firstChild;
    expect(card).toHaveClass('border-yellow-500');
  });
});