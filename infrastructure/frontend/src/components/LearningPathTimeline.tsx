import { Link } from 'react-router-dom';

interface Module {
  id: string;
  title: string;
  order: number;
  status: 'completed' | 'current' | 'locked';
}

interface LearningPathTimelineProps {
  modules: Module[];
  currentModuleId?: string;
}

function LearningPathTimeline({ modules, currentModuleId }: LearningPathTimelineProps) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Learning Path</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        <div className="space-y-8">
          {modules.map((module, index) => {
            const isCompleted = module.status === 'completed';
            const isCurrent = module.status === 'current' || module.id === currentModuleId;
            const isLocked = module.status === 'locked';

            return (
              <div key={module.id} className="relative flex items-start">
                {/* Timeline node */}
                <div
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>

                {/* Content */}
                <div className="ml-4 flex-1">
                  <Link
                    to={`/modules/${module.id}`}
                    className={`block p-4 rounded-lg border-2 transition ${
                      isCompleted
                        ? 'border-green-200 bg-green-50'
                        : isCurrent
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    } ${isLocked ? 'cursor-not-allowed' : 'hover:shadow-md'}`}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                        {module.title}
                      </h3>
                      {isCurrent && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Current
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Module {module.order}
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LearningPathTimeline;