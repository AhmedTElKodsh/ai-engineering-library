import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProgressDashboard from '../ProgressDashboard';
import axios from 'axios';
import { useAppSelector } from '../../store';

// Mock dependencies
vi.mock('axios');
vi.mock('../../store', () => ({
  useAppSelector: vi.fn(),
}));

describe('ProgressDashboard', () => {
  const mockUser = { id: 'user-123' };
  const mockProgress = [
    { chapterId: 'ch-1', completed: true },
    { chapterId: 'ch-2', completed: false },
  ];
  const mockModules = [
    { id: 'mod-1', title: 'Module 1', chapters: [{}, {}] }, // 2 chapters
  ];
  const mockMilestones = [
    { id: 'ms-1', title: 'Milestone 1', achievedAt: '2024-01-01' },
  ];
  const mockDuration = {
    totalWeeks: 30,
    completedWeeks: 5,
    remainingWeeks: 25,
    weeklyHours: 10,
    estimatedCompletionDate: '2024-12-31',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppSelector as any).mockReturnValue({ token: 'test-token', user: mockUser });
    (axios.get as any).mockImplementation((url: string) => {
      if (url.includes('/progress/users/')) {
        return Promise.resolve({ data: mockProgress });
      }
      if (url.includes('/content/modules')) {
        return Promise.resolve({ data: mockModules });
      }
      if (url.includes('/duration')) {
        return Promise.resolve({ data: mockDuration });
      }
      return Promise.resolve({ data: [] });
    });
  });

  it('renders loading state initially', () => {
    // Make axios.get never resolve
    (axios.get as any).mockImplementation(() => new Promise(() => {}));
    render(<ProgressDashboard />);
    expect(screen.getByText(/Loading dashboard.../i)).toBeInTheDocument();
  });

  it('renders stats overview', async () => {
    render(<ProgressDashboard />);
    await vi.waitFor(() => {
      expect(screen.getByText('Chapters Completed')).toBeInTheDocument();
      expect(screen.getByText('Total Chapters')).toBeInTheDocument();
      expect(screen.getByText('Progress')).toBeInTheDocument();
      expect(screen.getByText('Weeks Remaining')).toBeInTheDocument();
    });
  });

  it('displays completed chapters count', async () => {
    render(<ProgressDashboard />);
    await vi.waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument(); // completedCount = 1
    });
  });

  it('displays total chapters count', async () => {
    render(<ProgressDashboard />);
    await vi.waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // totalChapters = 2
    });
  });

  it('renders overall progress bar', async () => {
    render(<ProgressDashboard />);
    await vi.waitFor(() => {
      expect(screen.getByText(/Overall Progress/i)).toBeInTheDocument();
    });
  });

  it('renders module progress sections', async () => {
    render(<ProgressDashboard />);
    await vi.waitFor(() => {
      expect(screen.getByText('Module Progress')).toBeInTheDocument();
      expect(screen.getByText('Module 1')).toBeInTheDocument();
    });
  });

  it('renders milestones summary', async () => {
    // Mock milestones response
    (axios.get as any).mockImplementation((url) => {
      if (url.includes('/milestones')) {
        return Promise.resolve({ data: mockMilestones });
      }
      return Promise.resolve({ data: [] });
    });
    render(<ProgressDashboard />);
    await vi.waitFor(() => {
      expect(screen.getByText('Recent Milestones')).toBeInTheDocument();
    });
  });

  it('renders quick actions', async () => {
    render(<ProgressDashboard />);
    await vi.waitFor(() => {
      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
      expect(screen.getByText('Continue Learning')).toBeInTheDocument();
      expect(screen.getByText('View Portfolio')).toBeInTheDocument();
    });
  });

  it('handles missing user gracefully', () => {
    (useAppSelector as any).mockReturnValue({ token: 'test-token', user: null });
    render(<ProgressDashboard />);
    // Should not crash
    expect(screen.getByText(/Loading dashboard.../i)).toBeInTheDocument();
  });
});