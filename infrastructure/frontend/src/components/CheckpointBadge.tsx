interface CheckpointBadgeProps {
  status: 'locked' | 'available' | 'passed' | 'failed';
  score?: number;
  size?: 'sm' | 'md' | 'lg';
}

function CheckpointBadge({ status, score, size = 'md' }: CheckpointBadgeProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'locked':
        return {
          bg: 'bg-gray-200',
          text: 'text-gray-400',
          icon: '🔒',
          label: 'Locked'
        };
      case 'available':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          icon: '📋',
          label: 'Available'
        };
      case 'passed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          icon: '✓',
          label: 'Passed'
        };
      case 'failed':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          icon: '✗',
          label: 'Failed'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`${sizeClasses[size]} ${config.bg} ${config.text} rounded-full flex items-center justify-center`}
        title={config.label}
      >
        {config.icon}
      </div>
      {score !== undefined && (
        <span className={`text-sm ${config.text}`}>
          {score}%
        </span>
      )}
    </div>
  );
}

export default CheckpointBadge;