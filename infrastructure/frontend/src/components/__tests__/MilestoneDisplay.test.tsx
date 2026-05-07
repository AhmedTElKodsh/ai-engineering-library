import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MilestoneDisplay from '../MilestoneDisplay';

describe('MilestoneDisplay', () => {
  const mockMilestones = [
    {
      id: '1',
      milestoneText: 'Completed Python Foundations',
      badgeIcon: '🐍',
      unlocked: true,
      achievedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      milestoneText: 'Built First Agent',
      badgeIcon: '🤖',
      unlocked: true,
      achievedAt: new Date('2024-02-01'),
    },
    {
      id: '3',
      milestoneText: 'Mastered Tokenization',
      badgeIcon: '🔤',
      unlocked: false,
    },
    {
      id: '4',
      milestoneText: 'Deployed Production System',
      badgeIcon: '🚀',
      unlocked: false,
    },
  ];

  const defaultProps = {
    milestones: mockMilestones,
    onShareMilestone: vi.fn(),
  };

  it('renders all milestones', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    expect(screen.getByText('Completed Python Foundations')).toBeInTheDocument();
    expect(screen.getByText('Built First Agent')).toBeInTheDocument();
    expect(screen.getByText('Mastered Tokenization')).toBeInTheDocument();
    expect(screen.getByText('Deployed Production System')).toBeInTheDocument();
  });

  it('displays badge icons for all milestones', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    expect(screen.getByText('🐍')).toBeInTheDocument();
    expect(screen.getByText('🤖')).toBeInTheDocument();
    expect(screen.getByText('🔤')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('shows unlocked status correctly', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const milestone1 = screen.getByText('Completed Python Foundations').closest('.milestone-card');
    const milestone3 = screen.getByText('Mastered Tokenization').closest('.milestone-card');
    
    expect(milestone1).toHaveClass('unlocked');
    expect(milestone3).toHaveClass('locked');
  });

  it('displays achievement dates for unlocked milestones', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    expect(screen.getByText(/January 15, 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/February 1, 2024/i)).toBeInTheDocument();
  });

  it('does not show achievement dates for locked milestones', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const milestone3 = screen.getByText('Mastered Tokenization').closest('.milestone-card');
    expect(milestone3?.querySelector('.achievement-date')).not.toBeInTheDocument();
  });

  it('shows celebration animation for newly unlocked milestones', async () => {
    const { rerender } = render(<MilestoneDisplay {...defaultProps} />);
    
    // Update milestone 3 to unlocked
    const updatedMilestones = [...mockMilestones];
    updatedMilestones[2] = {
      ...updatedMilestones[2],
      unlocked: true,
      achievedAt: new Date(),
    };
    
    rerender(<MilestoneDisplay {...defaultProps} milestones={updatedMilestones} />);
    
    const milestone3 = screen.getByText('Mastered Tokenization').closest('.milestone-card');
    await waitFor(() => {
      expect(milestone3).toHaveClass('celebrating');
    });
  });

  it('displays share buttons for unlocked milestones', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const milestone1 = screen.getByText('Completed Python Foundations').closest('.milestone-card');
    const shareButtons = milestone1?.querySelectorAll('.share-button');
    
    expect(shareButtons).toHaveLength(3); // LinkedIn, Twitter, Facebook
  });

  it('does not show share buttons for locked milestones', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const milestone3 = screen.getByText('Mastered Tokenization').closest('.milestone-card');
    const shareButtons = milestone3?.querySelectorAll('.share-button');
    
    expect(shareButtons).toHaveLength(0);
  });

  it('calls onShareMilestone when LinkedIn button is clicked', () => {
    const onShareMilestone = vi.fn();
    render(<MilestoneDisplay {...defaultProps} onShareMilestone={onShareMilestone} />);
    
    const milestone1 = screen.getByText('Completed Python Foundations').closest('.milestone-card');
    const linkedInButton = milestone1?.querySelector('[data-platform="linkedin"]');
    
    fireEvent.click(linkedInButton!);
    
    expect(onShareMilestone).toHaveBeenCalledWith('1', 'linkedin');
  });

  it('calls onShareMilestone when Twitter button is clicked', () => {
    const onShareMilestone = vi.fn();
    render(<MilestoneDisplay {...defaultProps} onShareMilestone={onShareMilestone} />);
    
    const milestone1 = screen.getByText('Completed Python Foundations').closest('.milestone-card');
    const twitterButton = milestone1?.querySelector('[data-platform="twitter"]');
    
    fireEvent.click(twitterButton!);
    
    expect(onShareMilestone).toHaveBeenCalledWith('1', 'twitter');
  });

  it('calls onShareMilestone when Facebook button is clicked', () => {
    const onShareMilestone = vi.fn();
    render(<MilestoneDisplay {...defaultProps} onShareMilestone={onShareMilestone} />);
    
    const milestone1 = screen.getByText('Completed Python Foundations').closest('.milestone-card');
    const facebookButton = milestone1?.querySelector('[data-platform="facebook"]');
    
    fireEvent.click(facebookButton!);
    
    expect(onShareMilestone).toHaveBeenCalledWith('1', 'facebook');
  });

  it('displays progress summary', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    expect(screen.getByText(/2 of 4 milestones achieved/i)).toBeInTheDocument();
  });

  it('shows progress bar for milestone completion', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    
    // 2 out of 4 = 50%
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('handles empty milestones array gracefully', () => {
    const emptyProps = { ...defaultProps, milestones: [] };
    
    render(<MilestoneDisplay {...emptyProps} />);
    
    expect(screen.getByText(/no milestones yet/i)).toBeInTheDocument();
  });

  it('displays milestones in grid layout', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const grid = screen.getByTestId('milestone-grid');
    expect(grid).toHaveClass('milestone-grid');
  });

  it('applies grayscale filter to locked milestones', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const milestone3 = screen.getByText('Mastered Tokenization').closest('.milestone-card');
    const icon = milestone3?.querySelector('.badge-icon');
    
    expect(icon).toHaveStyle({ filter: 'grayscale(100%)' });
  });

  it('shows lock icon overlay on locked milestones', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const milestone3 = screen.getByText('Mastered Tokenization').closest('.milestone-card');
    const lockIcon = milestone3?.querySelector('.lock-icon');
    
    expect(lockIcon).toBeInTheDocument();
  });

  it('allows filtering by unlocked status', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const filterButton = screen.getByRole('button', { name: /show unlocked only/i });
    fireEvent.click(filterButton);
    
    expect(screen.getByText('Completed Python Foundations')).toBeInTheDocument();
    expect(screen.getByText('Built First Agent')).toBeInTheDocument();
    expect(screen.queryByText('Mastered Tokenization')).not.toBeInTheDocument();
    expect(screen.queryByText('Deployed Production System')).not.toBeInTheDocument();
  });

  it('displays milestone count badge', () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    expect(screen.getByText('4')).toBeInTheDocument(); // Total milestones
  });

  it('shows tooltip with milestone details on hover', async () => {
    render(<MilestoneDisplay {...defaultProps} />);
    
    const milestone1 = screen.getByText('Completed Python Foundations');
    fireEvent.mouseEnter(milestone1);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });
});
