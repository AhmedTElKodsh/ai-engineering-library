import { useEffect, useRef, useState } from 'react';

interface DiagramRendererProps {
  diagramCode: string;
  caption?: string;
}

function DiagramRenderer({ diagramCode, caption }: DiagramRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;

    const renderDiagram = async () => {
      try {
        // Dynamically import mermaid
        const mermaid = await import('mermaid');
        mermaid.default.initialize({
          startOnLoad: false,
          theme: 'default',
        });

        const id = `diagram-${Date.now()}`;
        const container = containerRef.current!;
        container.innerHTML = `<div id="${id}"></div>`;

        await mermaid.default.render(id, diagramCode);
      } catch (err: any) {
        setError('Failed to render diagram: ' + err.message);
      }
    };

    renderDiagram();
  }, [diagramCode]);

  if (error) {
    return (
      <div className="my-4 p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <figure className="my-8">
      <div
        ref={containerRef}
        className="diagram-container flex justify-center p-4 bg-white rounded-lg shadow-sm"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default DiagramRenderer;