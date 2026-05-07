interface MilestoneBadgeProps {
  milestone: {
    id: string;
    title: string;
    achievedAt?: string;
    sharedPlatforms?: string[];
  };
  onShare?: (platform: string) => void;
}

function MilestoneBadge({ milestone, onShare }: MilestoneBadgeProps) {
  const isUnlocked = !!milestone.achievedAt;

  return (
    <div
      className={`relative p-4 rounded-lg border-2 text-center transition ${
        isUnlocked ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50 opacity-50'
      }`}
    >
      {/* Badge Icon */}
      <div className="text-4xl mb-2">
        {isUnlocked ? '🏆' : '🔒'}
      </div>

      {/* Title */}
      <h4 className={`text-sm font-semibold mb-1 ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
        {milestone.title}
      </h4>

      {/* Achievement Date */}
      {isUnlocked && milestone.achievedAt && (
        <p className="text-xs text-gray-500 mb-2">
          {new Date(milestone.achievedAt).toLocaleDateString()}
        </p>
      )}

      {/* Share Status */}
      {isUnlocked && milestone.sharedPlatforms && milestone.sharedPlatforms.length > 0 && (
        <div className="flex justify-center space-x-1 mb-2">
          {milestone.sharedPlatforms.includes('linkedin') && (
            <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">in</span>
          )}
          {milestone.sharedPlatforms.includes('twitter') && (
            <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">𝕏</span>
          )}
          {milestone.sharedPlatforms.includes('facebook') && (
            <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">f</span>
          )}
        </div>
      )}

      {/* Share Button */}
      {isUnlocked && onShare && (
        <div className="mt-2">
          <select
            onChange={(e) => {
              if (e.target.value && onShare) {
                onShare(e.target.value);
              }
            }}
            className="text-xs border border-gray-300 rounded px-1 py-0.5"
            defaultValue=""
          >
            <option value="" disabled>Share...</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="copy">Copy Text</option>
          </select>
        </div>
      )}

      {/* Copy to Clipboard */}
      {isUnlocked && (
        <button
          onClick={() => {
            const text = `I just earned the "${milestone.title}" milestone on the AI Engineering Curriculum! 🎓`;
            navigator.clipboard.writeText(text).then(() => {
              alert('Copied to clipboard!');
            });
          }}
          className="mt-1 text-xs text-blue-600 hover:underline block"
        >
          Copy Text
        </button>
      )}
    </div>
  );
}

export default MilestoneBadge;