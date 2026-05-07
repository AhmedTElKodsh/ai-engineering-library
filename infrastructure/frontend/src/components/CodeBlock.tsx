import { useState, useRef, useEffect } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

function CodeBlock({ code, language = 'python', title, showLineNumbers = true, highlightLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Simplified syntax highlighting (in production, use Prism.js or Highlight.js)
  const renderCode = () => {
    return code.split('\n').map((line, index) => {
      const lineNumber = index + 1;
      const isHighlighted = highlightLines.includes(lineNumber);
      return (
        <div key={index} className={`${isHighlighted ? 'bg-yellow-100' : ''} px-4`}>
          {showLineNumbers && (
            <span className="inline-block w-8 text-gray-400 text-right mr-4 select-none">
              {lineNumber}
            </span>
          )}
          <span className="font-mono text-sm">{line || ' '}</span>
        </div>
      );
    });
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-300">
      {title && (
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <span className="text-xs text-gray-500">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre ref={codeRef} className="bg-gray-50 p-4 overflow-x-auto">
          {renderCode()}
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;