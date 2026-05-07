import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DurationCalculator from '../DurationCalculator';

describe('DurationCalculator', () => {
  const defaultProps = {
    totalWeeks: 30,
    weeksCompleted: 5,
    weeksRemaining: 25,
    weeklyHours: 20,
    estimatedCompletionDate: new Date('2024-08-15'),
    currentPace: {
      hoursThisWeek: 18,
      onTrack: true,
      adjustment: 'On track',
    },
    onUpdateWeeklyHours: vi.fn(),
  };

  it('displays total weeks correctly', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/30 weeks total/i)).toBeInTheDocument();
  });

  it('displays weeks completed', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/5 weeks completed/i)).toBeInTheDocument();
  });

  it('displays weeks remaining', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/25 weeks remaining/i)).toBeInTheDocument();
  });

  it('shows weekly hours commitment', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/20 hours\/week/i)).toBeInTheDocument();
  });

  it('displays estimated completion date', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/August 15, 2024/i)).toBeInTheDocument();
  });

  it('shows current pace hours', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/18 hours this week/i)).toBeInTheDocument();
  });

  it('displays on-track status when pace is good', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/on track/i)).toBeInTheDocument();
    const statusIndicator = screen.getByTestId('pace-status');
    expect(statusIndicator).toHaveClass('on-track');
  });

  it('displays behind status when pace is slow', () => {
    const behindProps = {
      ...defaultProps,
      currentPace: {
        hoursThisWeek: 12,
        onTrack: false,
        adjustment: '8 hours behind schedule',
      },
    };
    
    render(<DurationCalculator {...behindProps} />);
    
    expect(screen.getByText(/8 hours behind schedule/i)).toBeInTheDocument();
    const statusIndicator = screen.getByTestId('pace-status');
    expect(statusIndicator).toHaveClass('behind');
  });

  it('displays ahead status when pace is fast', () => {
    const aheadProps = {
      ...defaultProps,
      currentPace: {
        hoursThisWeek: 25,
        onTrack: true,
        adjustment: '5 hours ahead of schedule',
      },
    };
    
    render(<DurationCalculator {...aheadProps} />);
    
    expect(screen.getByText(/5 hours ahead of schedule/i)).toBeInTheDocument();
  });

  it('renders weekly hours adjustment slider', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    const slider = screen.getByRole('slider', { name: /weekly hours/i });
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('20');
  });

  it('calls onUpdateWeeklyHours when slider is adjusted', async () => {
    const onUpdateWeeklyHours = vi.fn();
    render(<DurationCalculator {...defaultProps} onUpdateWeeklyHours={onUpdateWeeklyHours} />);
    
    const slider = screen.getByRole('slider', { name: /weekly hours/i });
    fireEvent.change(slider, { target: { value: '25' } });
    
    await waitFor(() => {
      expect(onUpdateWeeklyHours).toHaveBeenCalledWith(25);
    });
  });

  it('shows recalculated completion date when hours change', async () => {
    const { rerender } = render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/August 15, 2024/i)).toBeInTheDocument();
    
    // Simulate increasing weekly hours (should move date earlier)
    const updatedProps = {
      ...defaultProps,
      weeklyHours: 25,
      estimatedCompletionDate: new Date('2024-07-20'),
    };
    
    rerender(<DurationCalculator {...updatedProps} />);
    
    await waitFor(() => {
      expect(screen.getByText(/July 20, 2024/i)).toBeInTheDocument();
    });
  });

  it('displays progress bar for weeks completed', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    
    // 5 out of 30 weeks = ~17%
    expect(progressBar).toHaveAttribute('aria-valuenow', '17');
  });

  it('shows motivational message when on track', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    expect(screen.getByText(/great progress/i)).toBeInTheDocument();
  });

  it('shows encouragement message when behind', () => {
    const behindProps = {
      ...defaultProps,
      currentPace: {
        hoursThisWeek: 12,
        onTrack: false,
        adjustment: '8 hours behind schedule',
      },
    };
    
    render(<DurationCalculator {...behindProps} />);
    
    expect(screen.getByText(/you can catch up/i)).toBeInTheDocument();
  });

  it('displays adjustment recommendations', () => {
    const behindProps = {
      ...defaultProps,
      currentPace: {
        hoursThisWeek: 12,
        onTrack: false,
        adjustment: '8 hours behind schedule',
      },
    };
    
    render(<DurationCalculator {...behindProps} />);
    
    expect(screen.getByText(/consider adding 2-3 hours/i)).toBeInTheDocument();
  });

  it('shows slider range limits (5-40 hours)', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    const slider = screen.getByRole('slider', { name: /weekly hours/i });
    expect(slider).toHaveAttribute('min', '5');
    expect(slider).toHaveAttribute('max', '40');
  });

  it('displays real-time recalculation indicator', async () => {
    const onUpdateWeeklyHours = vi.fn();
    render(<DurationCalculator {...defaultProps} onUpdateWeeklyHours={onUpdateWeeklyHours} />);
    
    const slider = screen.getByRole('slider', { name: /weekly hours/i });
    fireEvent.change(slider, { target: { value: '15' } });
    
    await waitFor(() => {
      expect(screen.getByText(/recalculating/i)).toBeInTheDocument();
    });
  });

  it('handles zero weeks completed gracefully', () => {
    const startProps = {
      ...defaultProps,
      weeksCompleted: 0,
      weeksRemaining: 30,
    };
    
    render(<DurationCalculator {...startProps} />);
    
    expect(screen.getByText(/0 weeks completed/i)).toBeInTheDocument();
    expect(screen.getByText(/just getting started/i)).toBeInTheDocument();
  });

  it('handles near completion gracefully', () => {
    const nearEndProps = {
      ...defaultProps,
      weeksCompleted: 28,
      weeksRemaining: 2,
    };
    
    render(<DurationCalculator {...nearEndProps} />);
    
    expect(screen.getByText(/2 weeks remaining/i)).toBeInTheDocument();
    expect(screen.getByText(/almost there/i)).toBeInTheDocument();
  });

  it('displays completion percentage', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    // 5 out of 30 = 16.67%
    expect(screen.getByText(/17% complete/i)).toBeInTheDocument();
  });

  it('shows time investment summary', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    // 5 weeks * 20 hours = 100 hours invested
    expect(screen.getByText(/100 hours invested/i)).toBeInTheDocument();
  });

  it('displays remaining time investment', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    // 25 weeks * 20 hours = 500 hours remaining
    expect(screen.getByText(/500 hours remaining/i)).toBeInTheDocument();
  });

  it('updates completion date when weekly hours decrease', async () => {
    const { rerender } = render(<DurationCalculator {...defaultProps} />);
    
    // Decrease weekly hours (should move date later)
    const updatedProps = {
      ...defaultProps,
      weeklyHours: 15,
      estimatedCompletionDate: new Date('2024-09-30'),
    };
    
    rerender(<DurationCalculator {...updatedProps} />);
    
    await waitFor(() => {
      expect(screen.getByText(/September 30, 2024/i)).toBeInTheDocument();
    });
  });

  it('shows pace indicator icon', () => {
    render(<DurationCalculator {...defaultProps} />);
    
    const paceIcon = screen.getByTestId('pace-icon');
    expect(paceIcon).toBeInTheDocument();
    expect(paceIcon).toHaveTextContent('✓'); // On track icon
  });

  it('changes pace icon when behind', () => {
    const behindProps = {
      ...defaultProps,
      currentPace: {
        hoursThisWeek: 12,
        onTrack: false,
        adjustment: '8 hours behind schedule',
      },
    };
    
    render(<DurationCalculator {...behindProps} />);
    
    const paceIcon = screen.getByTestId('pace-icon');
    expect(paceIcon).toHaveTextContent('⚠'); // Warning icon
  });
});
