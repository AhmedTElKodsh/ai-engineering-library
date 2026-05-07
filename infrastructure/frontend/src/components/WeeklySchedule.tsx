import { Link } from 'react-router-dom';

interface WeeklyScheduleProps {
  weeks: {
    id: string;
    weekNumber: number;
    days: {
      id: string;
      dayNumber: number;
      topic?: string;
      completed?: boolean;
      type: string;
    }[];
  };
  currentDay?: number;
  moduleId: string;
}

function WeeklySchedule({ weeks, currentDay, moduleId }: WeeklyScheduleProps) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Weekly Schedule</h2>
      <div className="space-y-6">
        {weeks.map((week) => (
          <div key={week.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Week {week.weekNumber}
              {week.weekNumber === 6 && (
                <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Flagship Project Week
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {week.days.map((day) => {
                const isCurrentDay = day.dayNumber === currentDay;
                const isOptional = day.dayNumber >= 6;
                
                return (
                  <Link
                    key={day.id}
                    to={day.id ? `/chapters/${day.id}` : '#'}
                    className={`block p-4 rounded-lg border-2 transition ${
                      day.completed
                        ? 'border-green-500 bg-green-50'
                        : isCurrentDay
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    } ${isOptional ? 'opacity-75' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Day {day.dayNumber}</span>
                      {day.completed && <span className="text-green-600">✓</span>}
                      {isCurrentDay && !day.completed && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{day.topic || 'No topic'}</p>
                    {isOptional && (
                      <span className="text-xs text-gray-500 mt-2 block">Optional Catch-up</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklySchedule;