import { useState, useRef } from 'react';

interface CodePlaygroundProps {
  initialCode?: string;
  language?: string;
  templateCode?: string;
  solutionCode?: string;
  onExecute?: (code: string) => Promise<{ output: string; errors?: string }>;
}

function CodePlayground({
  initialCode = '',
  language = 'python',
  templateCode = '',
  solutionCode = '',
  onExecute,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode || templateCode);
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleExecute = async () => {
    setIsRunning(true);
    setOutput('');
    setErrors('');

    try {
      if (onExecute) {
        const result = await onExecute(code);
        setOutput(result.output);
        if (result.errors) setErrors(result.errors);
      } else {
        // Default: call API
        const response = await fetch('http://localhost:3001/api/v1/code/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, language }),
        });
        const result = await response.json();
        setOutput(result.output || '');
        setErrors(result.errors || '');
      }
    } catch (err: any) {
      setErrors(err.message || 'Execution failed');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(templateCode);
    setOutput('');
    setErrors('');
  };

  const handleShowSolution = () => {
    if (solutionCode) {
      setCode(solutionCode);
      setShowSolution(true);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('code-playground-' + language, code);
      alert('Code saved!');
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  return (
    <div className="my-8 border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">{language}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            Reset
          </button>
          {solutionCode && (
            <button
              onClick={handleShowSolution}
              className="px-3 py-1 text-sm bg-yellow-200 hover:bg-yellow-300 rounded transition"
            >
              {showSolution ? 'Solution Shown' : 'Show Solution'}
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-green-200 hover:bg-green-300 rounded transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-r border-gray-300">
          <textarea
            ref={editorRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 p-4 font-mono text-sm bg-gray-50 focus:outline-none resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="bg-gray-900 text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Output</span>
            <button
              onClick={handleExecute}
              disabled={isRunning}
              className={`px-4 py-2 rounded text-sm font-medium transition ${
                isRunning
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
          <pre className="h-80 overflow-auto text-sm font-mono whitespace-pre-wrap">
            {output && <div className="text-green-400">{output}</div>}
            {errors && <div className="text-red-400">{errors}</div>}
            {!output && !errors && (
              <div className="text-gray-500 italic">Click "Run Code" to see output</div>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default CodePlayground;