import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LearningPathTimeline from '../LearningPathTimeline';

describe('LearningPathTimeline', () => {
  const mockModules = [
    {
      id: 'module-0',
      title: 'Python Foundations',
      weeks: 2,
      status: 'completed' as const,
    },
    {
      id: 'module-1',
      title: 'Whole Game Top-Down',
      weeks: 3,
      status: 'completed' as const,
    },
    {
      id: 'module-2',
      title: 'First Principles Bottom-Up',
      weeks: 6,
      status: 'current' as const,
    },
    {
      id: 'module-3',
      title: 'MCP Integration',
      weeks: 4,
      status: 'locked' as const,
    },
    {
      id: 'module-4',
      title: 'Agentic Workflows',
      weeks: 8,
      status: 'locked' as const,
    },
    {
      id: 'module-5',
      title: 'Production & Verification',
      weeks: 7,
      status: 'locked' as const,
    },
    {
      id: 'module-6',
      title: 'Capstone Projects',
      weeks: 2,
      status: 'locked' as const,
    },
  ];

  const defaultProps = {
    modules: mockModules,
    currentModule: 'module-2',
    progressPercentage: 35,
  };

  it('renders all modules', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    expect(screen.getByText('Python Foundations')).toBeInTheDocument();
    expect(screen.getByText('Whole Game Top-Down')).toBeInTheDocument();
    expect(screen.getByText('First Principles Bottom-Up')).toBeInTheDocument();
    expect(screen.getByText('MCP Integration')).toBeInTheDocument();
    expect(screen.getByText('Agentic Workflows')).toBeInTheDocument();
    expect(screen.getByText('Production & Verification')).toBeInTheDocument();
    expect(screen.getByText('Capstone Projects')).toBeInTheDocument();
  });

  it('displays week count for each module', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    expect(screen.getByText(/2 weeks/i)).toBeInTheDocument();
    expect(screen.getByText(/3 weeks/i)).toBeInTheDocument();
    expect(screen.getByText(/6 weeks/i)).toBeInTheDocument();
    expect(screen.getByText(/4 weeks/i)).toBeInTheDocument();
    expect(screen.getByText(/8 weeks/i)).toBeInTheDocument();
    expect(screen.getByText(/7 weeks/i)).toBeInTheDocument();
  });

  it('highlights current module', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const currentModule = screen.getByText('First Principles Bottom-Up').closest('.module-node');
    expect(currentModule).toHaveClass('current');
  });

  it('shows completed status for finished modules', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const module0 = screen.getByText('Python Foundations').closest('.module-node');
    const module1 = screen.getByText('Whole Game Top-Down').closest('.module-node');
    
    expect(module0).toHaveClass('completed');
    expect(module1).toHaveClass('completed');
  });

  it('shows locked status for future modules', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const module3 = screen.getByText('MCP Integration').closest('.module-node');
    const module4 = screen.getByText('Agentic Workflows').closest('.module-node');
    
    expect(module3).toHaveClass('locked');
    expect(module4).toHaveClass('locked');
  });

  it('displays checkmark icon for completed modules', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const module0 = screen.getByText('Python Foundations').closest('.module-node');
    const checkmark = module0?.querySelector('.completion-icon');
    
    expect(checkmark).toBeInTheDocument();
    expect(checkmark).toHaveTextContent('✓');
  });

  it('displays lock icon for locked modules', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const module3 = screen.getByText('MCP Integration').closest('.module-node');
    const lockIcon = module3?.querySelector('.lock-icon');
    
    expect(lockIcon).toBeInTheDocument();
    expect(lockIcon).toHaveTextContent('🔒');
  });

  it('displays current position indicator', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const currentIndicator = screen.getByTestId('current-position-indicator');
    expect(currentIndicator).toBeInTheDocument();
  });

  it('shows progress percentage', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    expect(screen.getByText(/35% complete/i)).toBeInTheDocument();
  });

  it('displays overall progress bar', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '35');
  });

  it('allows clicking on completed modules for navigation', () => {
    const onNavigate = vi.fn();
    render(<LearningPathTimeline {...defaultProps} onNavigate={onNavigate} />);
    
    const module0 = screen.getByText('Python Foundations').closest('.module-node');
    fireEvent.click(module0!);
    
    expect(onNavigate).toHaveBeenCalledWith('module-0');
  });

  it('allows clicking on current module for navigation', () => {
    const onNavigate = vi.fn();
    render(<LearningPathTimeline {...defaultProps} onNavigate={onNavigate} />);
    
    const module2 = screen.getByText('First Principles Bottom-Up').closest('.module-node');
    fireEvent.click(module2!);
    
    expect(onNavigate).toHaveBeenCalledWith('module-2');
  });

  it('prevents clicking on locked modules', () => {
    const onNavigate = vi.fn();
    render(<LearningPathTimeline {...defaultProps} onNavigate={onNavigate} />);
    
    const module3 = screen.getByText('MCP Integration').closest('.module-node');
    fireEvent.click(module3!);
    
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('displays connecting lines between modules', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const connectors = screen.getAllByTestId('module-connector');
    expect(connectors).toHaveLength(6); // 7 modules = 6 connectors
  });

  it('styles completed connectors differently', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const connectors = screen.getAllByTestId('module-connector');
    
    // First two connectors should be completed
    expect(connectors[0]).toHaveClass('completed');
    expect(connectors[1]).toHaveClass('completed');
    
    // Remaining connectors should be incomplete
    expect(connectors[2]).not.toHaveClass('completed');
  });

  it('shows module numbers', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    expect(screen.getByText('Module 0')).toBeInTheDocument();
    expect(screen.getByText('Module 1')).toBeInTheDocument();
    expect(screen.getByText('Module 2')).toBeInTheDocument();
    expect(screen.getByText('Module 3')).toBeInTheDocument();
    expect(screen.getByText('Module 4')).toBeInTheDocument();
    expect(screen.getByText('Module 5')).toBeInTheDocument();
    expect(screen.getByText('Module 6')).toBeInTheDocument();
  });

  it('displays total weeks in timeline', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    // Total: 2 + 3 + 6 + 4 + 8 + 7 + 2 = 32 weeks
    expect(screen.getByText(/32 weeks total/i)).toBeInTheDocument();
  });

  it('shows weeks completed', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    // Completed: 2 + 3 = 5 weeks
    expect(screen.getByText(/5 weeks completed/i)).toBeInTheDocument();
  });

  it('handles empty modules array gracefully', () => {
    const emptyProps = { ...defaultProps, modules: [] };
    
    render(<LearningPathTimeline {...emptyProps} />);
    
    expect(screen.getByText(/no modules available/i)).toBeInTheDocument();
  });

  it('displays timeline in horizontal layout on desktop', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const timeline = screen.getByTestId('learning-path-timeline');
    expect(timeline).toHaveClass('horizontal-layout');
  });

  it('displays timeline in vertical layout on mobile', () => {
    // Mock mobile viewport
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    
    render(<LearningPathTimeline {...defaultProps} />);
    
    const timeline = screen.getByTestId('learning-path-timeline');
    expect(timeline).toHaveClass('vertical-layout');
  });

  it('shows tooltip with module details on hover', async () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const module2 = screen.getByText('First Principles Bottom-Up');
    fireEvent.mouseEnter(module2);
    
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText(/6 weeks/i)).toBeInTheDocument();
  });

  it('displays estimated completion date for timeline', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    expect(screen.getByText(/estimated completion/i)).toBeInTheDocument();
  });

  it('shows current week within current module', () => {
    const propsWithWeek = {
      ...defaultProps,
      currentWeek: 3,
    };
    
    render(<LearningPathTimeline {...propsWithWeek} />);
    
    expect(screen.getByText(/week 3 of 6/i)).toBeInTheDocument();
  });

  it('applies correct styling for different module statuses', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const completed = screen.getByText('Python Foundations').closest('.module-node');
    const current = screen.getByText('First Principles Bottom-Up').closest('.module-node');
    const locked = screen.getByText('MCP Integration').closest('.module-node');
    
    expect(completed).toHaveStyle({ opacity: '0.7' });
    expect(current).toHaveStyle({ opacity: '1' });
    expect(locked).toHaveStyle({ opacity: '0.4' });
  });

  it('shows milestone indicators on timeline', () => {
    render(<LearningPathTimeline {...defaultProps} />);
    
    const milestoneIndicators = screen.getAllByTestId('milestone-indicator');
    expect(milestoneIndicators.length).toBeGreaterThan(0);
  });
});
