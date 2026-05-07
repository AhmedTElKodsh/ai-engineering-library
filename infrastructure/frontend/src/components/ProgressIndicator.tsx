interface ProgressIndicatorProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'purple';
}

function ProgressIndicator({ 
  percentage, 
  size = 'md', 
  showLabel = true,
  color = 'blue' 
}: ProgressIndicatorProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]}`}>
      <svg className="transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          stroke-width="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className={colorClasses[color]}
          stroke-width="8"
          stroke-dasharray={circumference}
          stroke-dashoffset={offset}
          stroke-linecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      {showLabel && (
        <span className={`absolute font-bold ${colorClasses[color]}`}>
          {percentage}%
        </span>
      )}
    </div>
  );
}

export default ProgressIndicator;