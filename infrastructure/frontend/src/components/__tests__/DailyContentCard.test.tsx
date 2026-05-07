import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DailyContentCard from '../DailyContentCard';

describe('DailyContentCard', () => {
  const mockChapters = [
    { id: '1', title: 'Introduction to Python', duration: 30, completed: true },
    { id: '2', title: 'Variables and Data Types', duration: 45, completed: false },
  ];

  const defaultProps = {
    dayNumber: 1,
    topic: 'Python Basics',
    hours: 2,
    type: 'content' as const,
    chapters: mockChapters,
    description: 'Learn the fundamentals of Python programming',
    onStartDay: vi.fn(),
  };

  it('renders day number and topic correctly', () => {
    render(<DailyContentCard {...defaultProps} />);
    
    expect(screen.getByText(/Day 1/i)).toBeInTheDocument();
    expect(screen.getByText('Python Basics')).toBeInTheDocument();
  });

  it('displays hours and chapter count', () => {
    render(<DailyContentCard {...defaultProps} />);
    
    expect(screen.getByText(/2 hours/i)).toBeInTheDocument();
    expect(screen.getByText(/2 chapters/i)).toBeInTheDocument();
  });

  it('shows all chapters with completion status', () => {
    render(<DailyContentCard {...defaultProps} />);
    
    expect(screen.getByText('Introduction to Python')).toBeInTheDocument();
    expect(screen.getByText('Variables and Data Types')).toBeInTheDocument();
    
    // Check for completion indicators
    const completedChapter = screen.getByText('Introduction to Python').closest('li');
    expect(completedChapter).toHaveClass('completed');
  });

  it('displays mini-project icon for Day 5', () => {
    const miniProjectProps = {
      ...defaultProps,
      dayNumber: 5,
      type: 'mini-project' as const,
      topic: 'Build a CLI Tool',
    };
    
    render(<DailyContentCard {...miniProjectProps} />);
    
    expect(screen.getByText('🔨')).toBeInTheDocument();
    expect(screen.getByText(/mini-project/i)).toBeInTheDocument();
  });

  it('displays flagship project icon for final week', () => {
    const flagshipProps = {
      ...defaultProps,
      type: 'flagship-project' as const,
      topic: 'Capstone Project',
    };
    
    render(<DailyContentCard {...flagshipProps} />);
    
    expect(screen.getByText('🏆')).toBeInTheDocument();
    expect(screen.getByText(/flagship project/i)).toBeInTheDocument();
  });

  it('calls onStartDay when Start Day button is clicked', () => {
    const onStartDay = vi.fn();
    render(<DailyContentCard {...defaultProps} onStartDay={onStartDay} />);
    
    const startButton = screen.getByRole('button', { name: /start day/i });
    fireEvent.click(startButton);
    
    expect(onStartDay).toHaveBeenCalledTimes(1);
  });

  it('disables Start Day button when all chapters are completed', () => {
    const completedChapters = mockChapters.map(ch => ({ ...ch, completed: true }));
    const completedProps = { ...defaultProps, chapters: completedChapters };
    
    render(<DailyContentCard {...completedProps} />);
    
    const startButton = screen.getByRole('button', { name: /completed/i });
    expect(startButton).toBeDisabled();
  });

  it('shows description when provided', () => {
    render(<DailyContentCard {...defaultProps} />);
    
    expect(screen.getByText('Learn the fundamentals of Python programming')).toBeInTheDocument();
  });

  it('calculates and displays progress percentage', () => {
    render(<DailyContentCard {...defaultProps} />);
    
    // 1 out of 2 chapters completed = 50%
    expect(screen.getByText(/50%/i)).toBeInTheDocument();
  });

  it('displays chapter durations correctly', () => {
    render(<DailyContentCard {...defaultProps} />);
    
    expect(screen.getByText(/30 min/i)).toBeInTheDocument();
    expect(screen.getByText(/45 min/i)).toBeInTheDocument();
  });

  it('handles empty chapters array gracefully', () => {
    const emptyProps = { ...defaultProps, chapters: [] };
    
    render(<DailyContentCard {...emptyProps} />);
    
    expect(screen.getByText(/0 chapters/i)).toBeInTheDocument();
  });

  it('applies correct styling for different day types', () => {
    const { rerender } = render(<DailyContentCard {...defaultProps} />);
    
    let card = screen.getByTestId('daily-content-card');
    expect(card).toHaveClass('content-day');
    
    rerender(<DailyContentCard {...defaultProps} type="mini-project" />);
    card = screen.getByTestId('daily-content-card');
    expect(card).toHaveClass('mini-project-day');
    
    rerender(<DailyContentCard {...defaultProps} type="flagship-project" />);
    card = screen.getByTestId('daily-content-card');
    expect(card).toHaveClass('flagship-project-day');
  });
});
