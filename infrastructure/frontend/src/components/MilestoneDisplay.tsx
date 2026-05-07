import { useState } from 'react';

interface Milestone {
  id: string;
  title: string;
  description?: string;
  achievedAt?: string;
  sharedAt?: string;
  order: number;
}

interface MilestoneDisplayProps {
  milestones: Milestone[];
  onShare?: (milestoneId: string, platform: string) => void;
}

function MilestoneDisplay({ milestones, onShare }: MilestoneDisplayProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<{ [key: string]: string }>({});

  const handleShare = (milestoneId: string) => {
    const platform = selectedPlatform[milestoneId];
    if (platform && onShare) {
      onShare(milestoneId, platform);
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Achievement Milestones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((milestone) => {
          const isUnlocked = !!milestone.achievedAt;
          const isShared = !!milestone.sharedAt;

          return (
            <div
              key={milestone.id}
              className={`bg-white rounded-lg shadow p-6 border-2 transition ${
                isUnlocked ? 'border-green-500' : 'border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{milestone.title}</h3>
                {isUnlocked && <span className="text-2xl">🏆</span>}
              </div>
              
              {milestone.description && (
                <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>
              )}

              {isUnlocked ? (
                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    Achieved: {new Date(milestone.achievedAt!).toLocaleDateString()}
                  </p>
                  
                  {!isShared && onShare && (
                    <div className="mt-2">
                      <select
                        value={selectedPlatform[milestone.id] || ''}
                        onChange={(e) =>
                          setSelectedPlatform((prev) => ({
                            ...prev,
                            [milestone.id]: e.target.value,
                          }))
                        }
                        className="text-sm border border-gray-300 rounded px-2 py-1 mr-2"
                      >
                        <option value="">Share on...</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="facebook">Facebook</option>
                      </select>
                      <button
                        onClick={() => handleShare(milestone.id)}
                        disabled={!selectedPlatform[milestone.id]}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:bg-gray-300"
                      >
                        Share
                      </button>
                    </div>
                  )}
                  {isShared && (
                    <p className="text-xs text-green-600 mt-2">✓ Shared</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400">🔒 Locked</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MilestoneDisplay;