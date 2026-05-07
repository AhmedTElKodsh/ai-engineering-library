import { useEffect, useRef, useState } from 'react';

interface ScrollytellingStep {
  id: string;
  content: string;
  visualization: React.ReactNode;
}

interface ScrollytellingSectionProps {
  title: string;
  steps: ScrollytellingStep[];
}

function ScrollytellingSection({ title, steps }: ScrollytellingSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      stepRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const relativePosition = elementCenter - containerTop;

        if (relativePosition > 0 && relativePosition < viewportHeight * 0.6) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="my-16">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Narrative / Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => { stepRefs.current[index] = el; }}
              className={`transition-all duration-500 ${
                index === activeStep ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className={`prose max-w-none ${
                index === activeStep ? 'text-gray-900' : 'text-gray-500'
              }`}>
                <div dangerouslySetInnerHTML={{ __html: step.content }} />
              </div>
              {index === activeStep && (
                <div className="mt-4 flex items-center">
                  <div className="w-8 h-1 bg-blue-600"></div>
                  <span className="ml-2 text-sm text-blue-600">
                    Step {index + 1} of {steps.length}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visualization */}
        <div className="sticky top-8">
          <div className="bg-white rounded-lg shadow-lg p-6 min-h-96 flex items-center justify-center">
            {steps[activeStep]?.visualization}
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeStep
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollytellingSection;