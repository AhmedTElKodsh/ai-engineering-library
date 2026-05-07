import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import axios from 'axios';

function ChapterViewer() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { token } = useAppSelector((state) => state.auth);
  const [chapter, setChapter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/content/chapters/${chapterId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setChapter(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load chapter');
        setLoading(false);
      }
    };

    if (token) fetchChapter();
  }, [chapterId, token]);

  const handleComplete = async () => {
    try {
      await axios.post(
        `http://localhost:3001/api/v1/progress/chapters/${chapterId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Chapter marked as complete!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to mark complete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading chapter...</div>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error || 'Chapter not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to={`/modules/${chapter.moduleId}`}
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Module
        </Link>

        <h1 className="text-3xl font-bold mb-6">{chapter.title}</h1>

        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="prose max-w-none">
            {chapter.content || 'No content available yet.'}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleComplete}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChapterViewer;