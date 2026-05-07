import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PublicPortfolio from '../PublicPortfolio';
import axios from 'axios';
import { useParams } from 'react-router-dom';

vi.mock('axios');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

const mockedAxios = axios as any;

describe('PublicPortfolio', () => {
  const mockPortfolio = {
    userName: 'John Doe',
    userBio: 'AI Engineering Student',
    projects: [
      {
        title: 'ML Model',
        type: 'mini-project',
        screenshots: ['screenshot1.jpg'],
        technologies: ['Python', 'TensorFlow'],
        completionDate: '2024-01-15',
        githubUrl: 'https://github.com/john/ml-model',
        demoUrl: 'https://ml-model.demo.com',
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as any).mockReturnValue({ slug: 'john-doe-portfolio' });
  });

  it('renders loading state initially', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    render(<PublicPortfolio />);
    expect(screen.getByText(/Loading portfolio.../i)).toBeInTheDocument();
  });

  it('renders portfolio with user name', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPortfolio });
    render(<PublicPortfolio />);
    await vi.waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('displays user bio', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPortfolio });
    render(<PublicPortfolio />);
    await vi.waitFor(() => {
      expect(screen.getByText('AI Engineering Student')).toBeInTheDocument();
    });
  });

  it('renders projects', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPortfolio });
    render(<PublicPortfolio />);
    await vi.waitFor(() => {
      expect(screen.getByText('ML Model')).toBeInTheDocument();
    });
  });

  it('displays project technologies', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPortfolio });
    render(<PublicPortfolio />);
    await vi.waitFor(() => {
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('TensorFlow')).toBeInTheDocument();
    });
  });

  it('renders GitHub links for projects', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPortfolio });
    render(<PublicPortfolio />);
    await vi.waitFor(() => {
      expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    });
  });

  it('renders demo links for projects', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPortfolio });
    render(<PublicPortfolio />);
    await vi.waitFor(() => {
      expect(screen.getByText(/Live Demo/i)).toBeInTheDocument();
    });
  });

  it('shows "Powered by" footer', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPortfolio });
    render(<PublicPortfolio />);
    await vi.waitFor(() => {
      expect(screen.getByText(/Powered by/i)).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    mockedAxios.get.mockRejectedValueOnce({ response: { data: { error: 'Portfolio not found' } } });
    render(<PublicPortfolio />);
    await vi.waitFor(() => {
      expect(screen.getByText(/Portfolio not found/i)).toBeInTheDocument();
    });
  });
});