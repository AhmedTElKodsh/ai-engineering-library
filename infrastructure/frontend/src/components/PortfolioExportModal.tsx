import { useState } from 'react';
import { useAppSelector } from '../store';
import axios from 'axios';

interface PortfolioExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PortfolioExportModal({ isOpen, onClose }: PortfolioExportModalProps) {
  const { token, user } = useAppSelector((state) => state.auth);
  const [format, setFormat] = useState<'pdf' | 'html' | 'json'>('pdf');
  const [exporting, setExporting] = useState(false);
  const [exportUrl, setExportUrl] = useState('');
  const [error, setError] = useState('');

  const handleExport = async () => {
    setExporting(true);
    setError('');
    setExportUrl('');

    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/portfolio/users/${user?.id}/export`,
        { format },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExportUrl(response.data.url || 'Export started');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Export failed');
    } finally {
      setExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Export Portfolio</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Export Format</label>
          <div className="space-y-2">
            {(['pdf', 'html', 'json'] as const).map((fmt) => (
              <label key={fmt} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value={fmt}
                  checked={format === fmt}
                  onChange={() => setFormat(fmt)}
                  className="w-4 h-4"
                />
                <span className="capitalize">{fmt}</span>
                {fmt === 'pdf' && <span className="text-xs text-gray-500">(7-day expiry)</span>}
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {exportUrl && (
          <div className="bg-green-50 p-3 rounded mb-4">
            <p className="text-green-700 text-sm mb-2">Export ready!</p>
            <a
              href={exportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Download {format.toUpperCase()}
            </a>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {exporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioExportModal;