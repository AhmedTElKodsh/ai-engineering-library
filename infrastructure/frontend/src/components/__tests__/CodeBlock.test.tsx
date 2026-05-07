import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CodeBlock from '../CodeBlock';

describe('CodeBlock', () => {
  const sampleCode = `def hello_world():
    print("Hello, World!")
    return True`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders code content', () => {
    render(<CodeBlock code={sampleCode} />);
    expect(screen.getByText(/hello_world/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
  });

  it('displays language label', () => {
    render(<CodeBlock code={sampleCode} language="python" />);
    expect(screen.getByText('python')).toBeInTheDocument();
  });

  it('displays title when provided', () => {
    const title = 'Sample Python Function';
    render(<CodeBlock code={sampleCode} title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('shows line numbers when enabled', () => {
    render(<CodeBlock code={sampleCode} showLineNumbers />);
    // Should show line numbers 1, 2, 3
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('hides line numbers when disabled', () => {
    render(<CodeBlock code={sampleCode} showLineNumbers={false} />);
    // Line numbers should not be present
    const lineNumbers = document.querySelectorAll('.w-8');
    expect(lineNumbers.length).toBe(0);
  });

  it('highlights specified lines', () => {
    render(<CodeBlock code={sampleCode} highlightLines={[1, 3]} />);
    // Lines 1 and 3 should have highlight class
    const highlightedLines = document.querySelectorAll('.bg-yellow-100');
    expect(highlightedLines.length).toBeGreaterThan(0);
  });

  it('copies code to clipboard when copy button is clicked', async () => {
    const clipboardSpy = vi.fn();
    Object.assign(navigator, {
      clipboard: { writeText: clipboardSpy },
    });

    render(<CodeBlock code={sampleCode} />);
    
    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    expect(clipboardSpy).toHaveBeenCalledWith(sampleCode);
    expect(screen.getByText(/copied!/i)).toBeInTheDocument();
  });

  it('shows "Copy" text initially on copy button', () => {
    render(<CodeBlock code={sampleCode} />);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('renders empty code gracefully', () => {
    render(<CodeBlock code="" />);
    const preElement = document.querySelector('pre');
    expect(preElement).toBeInTheDocument();
  });
});
