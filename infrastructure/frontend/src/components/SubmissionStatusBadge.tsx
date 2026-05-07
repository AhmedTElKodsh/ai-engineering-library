interface SubmissionStatusBadgeProps {
  status: 'not-submitted' | 'pending-review' | 'reviewed' | 'revision-requested' | 'approved';
  revisionNumber?: number;
  showTooltip?: boolean;
}

function SubmissionStatusBadge({ status, revisionNumber, showTooltip = false }: SubmissionStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'not-submitted':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-300',
          label: 'Not Submitted',
          icon: '📄',
        };
      case 'pending-review':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-300',
          label: 'Pending Review',
          icon: '⏳',
        };
      case 'reviewed':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-300',
          label: 'Reviewed',
          icon: '✓',
        };
      case 'revision-requested':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          border: 'border-orange-300',
          label: 'Revision Requested',
          icon: '⚠',
        };
      case 'approved':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-300',
          label: 'Approved',
          icon: '✅',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="relative inline-block">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
        title={showTooltip ? config.label : undefined}
      >
        <span className="mr-1">{config.icon}</span>
        {config.label}
        {status === 'revision-requested' && revisionNumber !== undefined && (
          <span className="ml-1">({revisionNumber})</span>
        )}
      </span>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
          {config.label}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
}

export default SubmissionStatusBadge;