import { useNavigate, useLocation } from 'react-router-dom';

interface ChapterInfo {
  id: string;
  title: string;
  order: number;
  moduleId: string;
}

interface SequentialNavigationProps {
  currentChapter: ChapterInfo;
  prevChapter?: ChapterInfo;
  nextChapter?: ChapterInfo;
  onComplete?: () => void;
}

function SequentialNavigation({ currentChapter, prevChapter, nextChapter, onComplete }: SequentialNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePrev = () => {
    if (prevChapter) {
      navigate(`/chapters/${prevChapter.id}`);
    }
  };

  const handleNext = () => {
    if (nextChapter) {
      navigate(`/chapters/${nextChapter.id}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && prevChapter) {
      handlePrev();
    } else if (e.key === 'ArrowRight' && nextChapter) {
      handleNext();
    }
  };

  return (
    <div 
      className="flex items-center justify-between py-4 border-t border-gray-200"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={!prevChapter}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
          prevChapter
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Previous chapter"
      >
        <span>←</span>
        <div className="text-left">
          <p className="text-xs text-gray-500">Previous</p>
          <p className="text-sm font-medium truncate max-w-xs">
            {prevChapter ? prevChapter.title : 'No previous chapter'}
          </p>
        </div>
      </button>

      {/* Chapter Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Chapter {currentChapter.order}
        </p>
        {onComplete && (
          <button
            onClick={onComplete}
            className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
          >
            ✓ Mark Complete
          </button>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!nextChapter}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
          nextChapter
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-gray-300 cursor-not-allowed'
        }`}
        aria-label="Next chapter"
      >
        <div className="text-right">
          <p className="text-xs text-gray-500">Next</p>
          <p className="text-sm font-medium truncate max-w-xs">
            {nextChapter ? nextChapter.title : 'No next chapter'}
          </p>
        </div>
        <span>→</span>
      </button>

      {/* Mobile Swipe Hint */}
      <div className="lg:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
        Swipe or use arrow keys to navigate
      </div>
    </div>
  );
}

export default SequentialNavigation;