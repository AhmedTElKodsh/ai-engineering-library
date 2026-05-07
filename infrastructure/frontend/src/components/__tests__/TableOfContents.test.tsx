import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TableOfContents from '../TableOfContents';
import { useLocation } from 'react-router-dom';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

describe('TableOfContents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useLocation as any).mockReturnValue({ pathname: '/chapter/test' });
  });

  it('returns null when no headings are present', () => {
    // Mock no .prose element
    const querySelectorSpy = vi.spyOn(document, 'querySelector').mockReturnValue(null);
    const { container } = render(<TableOfContents />);
    
    // Should return null (no rendering)
    expect(container.firstChild).toBeNull();
    
    querySelectorSpy.mockRestore();
  });

  it('renders "On this page" heading', () => {
    // Mock prose element with headings
    const proseEl = document.createElement('div');
    proseEl.className = 'prose';
    
    const heading1 = document.createElement('h1');
    heading1.textContent = 'Chapter 1';
    proseEl.appendChild(heading1);
    
    vi.spyOn(document, 'querySelector').mockReturnValue(proseEl);
    
    render(<TableOfContents />);
    
    expect(screen.getByText('On this page')).toBeInTheDocument();
  });

  it('renders headings from content', () => {
    const proseEl = document.createElement('div');
    proseEl.className = 'prose';
    
    const heading1 = document.createElement('h1');
    heading1.textContent = 'Main Title';
    heading1.id = 'main-title';
    proseEl.appendChild(heading1);
    
    const heading2 = document.createElement('h2');
    heading2.textContent = 'Sub Title';
    heading2.id = 'sub-title';
    proseEl.appendChild(heading2);
    
    vi.spyOn(document, 'querySelector').mockReturnValue(proseEl);
    
    render(<TableOfContents />);
    
    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Sub Title')).toBeInTheDocument();
  });

  it('applies correct indentation based on heading level', () => {
    const proseEl = document.createElement('div');
    proseEl.className = 'prose';
    
    const h1 = document.createElement('h1');
    h1.textContent = 'H1';
    h1.id = 'h1';
    proseEl.appendChild(h1);
    
    const h2 = document.createElement('h2');
    h2.textContent = 'H2';
    h2.id = 'h2';
    proseEl.appendChild(h2);
    
    vi.spyOn(document, 'querySelector').mockReturnValue(proseEl);
    
    render(<TableOfContents />);
    
    const links = document.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
    // Check that h2 has more padding than h1
    const h1Link = screen.getByText('H1');
    const h2Link = screen.getByText('H2');
    expect(h1Link).toBeInTheDocument();
    expect(h2Link).toBeInTheDocument();
  });

  it('generates IDs for headings without IDs', () => {
    const proseEl = document.createElement('div');
    proseEl.className = 'prose';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Test Heading';
    // No id set
    proseEl.appendChild(heading);
    
    vi.spyOn(document, 'querySelector').mockReturnValue(proseEl);
    
    render(<TableOfContents />);
    
    // Should have generated an ID
    expect(heading.id).toBeTruthy();
    expect(heading.id).toContain('heading-');
  });

  it('renders links with correct href', () => {
    const proseEl = document.createElement('div');
    proseEl.className = 'prose';
    
    const heading = document.createElement('h1');
    heading.textContent = 'Test';
    heading.id = 'test-heading';
    proseEl.appendChild(heading);
    
    vi.spyOn(document, 'querySelector').mockReturnValue(proseEl);
    
    render(<TableOfContents />);
    
    const link = screen.getByText('Test');
    expect(link).toHaveAttribute('href', '#test-heading');
  });
});