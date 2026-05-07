import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WeeklySchedule from '../WeeklySchedule';

describe('WeeklySchedule', () => {
  const mockDays = [
    {
      dayNumber: 1,
      topic: 'Python Basics',
      hours: 2,
      type: 'content' as const,
      chapters: [
        { id: '1', title: 'Introduction', duration: 30, completed: true },
      ],
      description: 'Day 1 description',
      learningObjectives: ['Objective 1'],
    },
    {
      dayNumber: 2,
      topic: 'Control Flow',
      hours: 2.5,
      type: 'content' as const,
      chapters: [
        { id: '2', title: 'If Statements', duration: 45, completed: false },
      ],
      description: 'Day 2 description',
      learningObjectives: ['Objective 2'],
    },
    {
      dayNumber: 3,
      topic: 'Functions',
      hours: 3,
      type: 'content' as const,
      chapters: [
        { id: '3', title: 'Defining Functions', duration: 60, completed: false },
      ],
      description: 'Day 3 description',
      learningObjectives: ['Objective 3'],
    },
    {
      dayNumber: 4,
      topic: 'Data Structures',
      hours: 2,
      type: 'content' as const,
      chapters: [
        { id: '4', title: 'Lists and Dicts', duration: 40, completed: false },
      ],
      description: 'Day 4 description',
      learningObjectives: ['Objective 4'],
    },
    {
      dayNumber: 5,
      topic: 'Mini Project',
      hours: 4,
      type: 'mini-project' as const,
      chapters: [
        { id: '5', title: 'Build CLI Tool', duration: 240, completed: false },
      ],
      description: 'Day 5 mini-project',
      learningObjectives: ['Build project'],
    },
    {
      dayNumber: 6,
      topic: 'Catch-up Day',
      hours: 2,
      type: 'content' as const,
      chapters: [],
      description: 'Optional catch-up',
      learningObjectives: [],
    },
    {
      dayNumber: 7,
      topic: 'Review Day',
      hours: 2,
      type: 'content' as const,
      chapters: [],
      description: 'Optional review',
      learningObjectives: [],
    },
  ];

  const defaultProps = {
    weekNumber: 1,
    days: mockDays,
    currentDay: 2,
    onSelectDay: vi.fn(),
  };

  it('renders week number correctly', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    expect(screen.getByText(/Week 1/i)).toBeInTheDocument();
  });

  it('displays all 7 days', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    expect(screen.getByText('Python Basics')).toBeInTheDocument();
    expect(screen.getByText('Control Flow')).toBeInTheDocument();
    expect(screen.getByText('Functions')).toBeInTheDocument();
    expect(screen.getByText('Data Structures')).toBeInTheDocument();
    expect(screen.getByText('Mini Project')).toBeInTheDocument();
    expect(screen.getByText('Catch-up Day')).toBeInTheDocument();
    expect(screen.getByText('Review Day')).toBeInTheDocument();
  });

  it('highlights current day', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    const day2 = screen.getByText('Control Flow').closest('.day-card');
    expect(day2).toHaveClass('current-day');
  });

  it('shows completion status for each day', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    const day1 = screen.getByText('Python Basics').closest('.day-card');
    expect(day1).toHaveClass('completed');
    
    const day2 = screen.getByText('Control Flow').closest('.day-card');
    expect(day2).not.toHaveClass('completed');
  });

  it('marks Days 6-7 as optional catch-up days', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    const day6 = screen.getByText('Catch-up Day').closest('.day-card');
    const day7 = screen.getByText('Review Day').closest('.day-card');
    
    expect(day6).toHaveClass('optional-day');
    expect(day7).toHaveClass('optional-day');
    expect(screen.getAllByText(/optional/i)).toHaveLength(2);
  });

  it('displays mini-project icon for Day 5', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    const day5 = screen.getByText('Mini Project').closest('.day-card');
    expect(day5?.querySelector('.mini-project-icon')).toBeInTheDocument();
  });

  it('calls onSelectDay when a day is clicked', () => {
    const onSelectDay = vi.fn();
    render(<WeeklySchedule {...defaultProps} onSelectDay={onSelectDay} />);
    
    const day3 = screen.getByText('Functions').closest('.day-card');
    fireEvent.click(day3!);
    
    expect(onSelectDay).toHaveBeenCalledWith(3);
  });

  it('displays hours for each day', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    expect(screen.getByText(/2 hours/i)).toBeInTheDocument();
    expect(screen.getByText(/2.5 hours/i)).toBeInTheDocument();
    expect(screen.getByText(/3 hours/i)).toBeInTheDocument();
    expect(screen.getByText(/4 hours/i)).toBeInTheDocument();
  });

  it('shows total week hours', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    // Total: 2 + 2.5 + 3 + 2 + 4 + 2 + 2 = 17.5 hours
    expect(screen.getByText(/17.5 hours total/i)).toBeInTheDocument();
  });

  it('displays progress bar for the week', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    
    // 1 out of 7 days completed = ~14%
    expect(progressBar).toHaveAttribute('aria-valuenow', '14');
  });

  it('handles week with no days gracefully', () => {
    const emptyProps = { ...defaultProps, days: [] };
    
    render(<WeeklySchedule {...emptyProps} />);
    
    expect(screen.getByText(/Week 1/i)).toBeInTheDocument();
    expect(screen.getByText(/0 hours total/i)).toBeInTheDocument();
  });

  it('disables navigation for future days', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    // Days 3-7 should be disabled (current day is 2)
    const day3 = screen.getByText('Functions').closest('.day-card');
    expect(day3).toHaveClass('disabled');
  });

  it('allows navigation to completed and current days', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    const day1 = screen.getByText('Python Basics').closest('.day-card');
    const day2 = screen.getByText('Control Flow').closest('.day-card');
    
    expect(day1).not.toHaveClass('disabled');
    expect(day2).not.toHaveClass('disabled');
  });

  it('displays day numbers correctly', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('Day 2')).toBeInTheDocument();
    expect(screen.getByText('Day 3')).toBeInTheDocument();
    expect(screen.getByText('Day 4')).toBeInTheDocument();
    expect(screen.getByText('Day 5')).toBeInTheDocument();
    expect(screen.getByText('Day 6')).toBeInTheDocument();
    expect(screen.getByText('Day 7')).toBeInTheDocument();
  });

  it('shows chapter count for each day', () => {
    render(<WeeklySchedule {...defaultProps} />);
    
    expect(screen.getAllByText(/1 chapter/i)).toHaveLength(5);
    expect(screen.getAllByText(/0 chapters/i)).toHaveLength(2);
  });

  it('applies correct styling for different week numbers', () => {
    const { rerender } = render(<WeeklySchedule {...defaultProps} />);
    
    let schedule = screen.getByTestId('weekly-schedule');
    expect(schedule).toHaveClass('week-1');
    
    rerender(<WeeklySchedule {...defaultProps} weekNumber={2} />);
    schedule = screen.getByTestId('weekly-schedule');
    expect(schedule).toHaveClass('week-2');
  });
});
