import { Link } from 'react-router-dom';

interface DailyContentCardProps {
  day: {
    id: string;
    dayNumber: number;
    topic?: string;
    hours: number;
    type: string;
    completed?: boolean;
    chapterId?: string;
  };
  moduleId: string;
  isCurrentDay?: boolean;
}

function DailyContentCard({ day, moduleId, isCurrentDay }: DailyContentCardProps) {
  const isMiniProject = day.type === 'mini-project';
  const isFlagshipProject = day.type === 'flagship-project';
  const isCatchUp = day.type === 'catch-up';

  const getIcon = () => {
    if (isMiniProject) return '🔨';
    if (isFlagshipProject) return '🏆';
    return null;
  };

  const getBorderColor = () => {
    if (isCurrentDay) return 'border-blue-500 border-2';
    if (day.completed) return 'border-green-500';
    return 'border-gray-200';
  };

  return (
    <Link
      to={day.chapterId ? `/chapters/${day.chapterId}` : '#'}
      className={`block bg-white rounded-lg shadow p-4 border transition hover:shadow-lg ${
        getBorderColor()
      } ${!day.chapterId ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-gray-500">Day {day.dayNumber}</span>
          {getIcon() && <span>{getIcon()}</span>}
        </div>
        {day.completed && (
          <span className="text-green-600 text-sm">✓</span>
        )}
      </div>

      <h4 className="font-semibold mb-1">{day.topic || `Day ${day.dayNumber}`}</h4>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{day.hours} hours</span>
        {isMiniProject && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            Mini-Project
          </span>
        )}
        {isFlagshipProject && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
            Flagship Project
          </span>
        )}
        {isCatchUp && (
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
            Optional
          </span>
        )}
      </div>

      {isCurrentDay && (
        <div className="mt-2 text-center">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            Current Day
          </span>
        </div>
      )}
    </Link>
  );
}

export default DailyContentCard;