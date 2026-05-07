import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PortfolioExportModal from '../PortfolioExportModal';
import axios from 'axios';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('axios');
const mockedAxios = axios as any;

// Mock store setup
const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: () => ({
        token: 'mock-token',
        user: { id: 'user-1', name: 'Test User' },
      }),
    },
  });
};

describe('PortfolioExportModal', () => {
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createMockStore();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={false} onClose={() => {}} />
      </Provider>
    );
    expect(screen.queryByText(/Export Portfolio/i)).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={() => {}} />
      </Provider>
    );
    expect(screen.getByText(/Export Portfolio/i)).toBeInTheDocument();
  });

  it('displays format options', () => {
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={() => {}} />
      </Provider>
    );
    expect(screen.getByText(/pdf/i)).toBeInTheDocument();
    expect(screen.getByText(/html/i)).toBeInTheDocument();
    expect(screen.getByText(/json/i)).toBeInTheDocument();
  });

  it('selects PDF format by default', () => {
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={() => {}} />
      </Provider>
    );
    const pdfRadio = screen.getByLabelText(/pdf/i);
    expect(pdfRadio).toBeChecked();
  });

  it('allows selecting different format', () => {
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={() => {}} />
      </Provider>
    );
    const htmlRadio = screen.getByLabelText(/html/i);
    fireEvent.click(htmlRadio);
    expect(htmlRadio).toBeChecked();
  });

  it('shows file size estimates', () => {
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={() => {}} />
      </Provider>
    );
    expect(screen.getByText(/7-day expiry/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={mockOnClose} />
      </Provider>
    );
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', () => {
    const mockOnClose = vi.fn();
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={mockOnClose} />
      </Provider>
    );
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles export action', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { url: 'http://example.com/export.pdf' } });
    
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={() => {}} />
      </Provider>
    );
    
    const exportButton = screen.getByText('Export');
    fireEvent.click(exportButton);
    
    await vi.waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });

  it('disables export button while exporting', async () => {
    mockedAxios.post.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(
      <Provider store={store}>
        <PortfolioExportModal isOpen={true} onClose={() => {}} />
      </Provider>
    );
    
    const exportButton = screen.getByText('Export');
    fireEvent.click(exportButton);
    
    await vi.waitFor(() => {
      expect(screen.getByText('Exporting...')).toBeInTheDocument();
    });
  });
});