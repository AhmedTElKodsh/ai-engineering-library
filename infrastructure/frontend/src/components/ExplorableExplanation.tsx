import { useState, useCallback } from 'react';

interface ExplorableExplanationProps {
  title: string;
  description: string;
  parameters: {
    name: string;
    min: number;
    max: number;
    default: number;
    step?: number;
  }[];
  renderVisualization: (params: Record<string, number>) => React.ReactNode;
}

function ExplorableExplanation({ title, description, parameters, renderVisualization }: ExplorableExplanationProps) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    parameters.forEach(p) => {
      defaults[p.name] = p.default;
    });
    return defaults;
  });

  const handleParamChange = useCallback((name: string, value: number) => {
    setValues(prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = () => {
    const defaults: Record<string, number> = {};
    parameters.forEach(p) => {
      defaults[p.name] = p.default;
    });
    setValues(defaults);
  };

  return (
    <div className="my-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-4">
          {parameters.map((param) => (
            <div key={param.name}>
              <label className="block text-sm font-medium mb-1">
                {param.name}: <span className="text-blue-600 font-bold">{values[param.name]}</span>
              </label>
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step || 1}
                value={values[param.name]}
                onChange={(e) => handleParamChange(param.name, parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{param.min}</span>
                <span>{param.max}</span>
              </div>
            </div>
          ))}

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Reset to Defaults
          </button>
        </div>

        {/* Visualization */}
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center min-h-64">
          {renderVisualization(values)}
        </div>
      </div>
    </div>
  );
}

export default ExplorableExplanation;