import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import axios from 'axios';

interface ProjectSubmissionFormProps {
  chapterId?: string;
  onSubmitSuccess?: () => void;
}

function ProjectSubmissionForm({ chapterId, onSubmitSuccess }: ProjectSubmissionFormProps) {
  const { token, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    githubUrl: '',
    demoUrl: '',
    description: '',
    technologies: [] as string[],
  });
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [techInput, setTechInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setScreenshots((prev) => [...prev, ...newFiles].slice(0, 5)); // Max 5 screenshots
    }
  };

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('githubUrl', formData.githubUrl);
      if (formData.demoUrl) formDataToSend.append('demoUrl', formData.demoUrl);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
      if (chapterId) formDataToSend.append('chapterId', chapterId);
      
      screenshots.forEach((file) => {
        formDataToSend.append('screenshots', file);
      });

      await axios.post('http://localhost:3001/api/v1/projects/submit', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit project');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Project Submitted!</h2>
          <p className="text-green-700 mb-4">Your project has been submitted for review.</p>
          <button
            onClick={() => navigate('/portfolio')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Submit Project</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>
        )}

        {/* GitHub URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            GitHub Repository URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            required
            value={formData.githubUrl}
            onChange={(e) => handleInputChange('githubUrl', e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Demo URL */}
        <div>
          <label className="block text-sm font-medium mb-2">Demo URL (Optional)</label>
          <input
            type="url"
            value={formData.demoUrl}
            onChange={(e) => handleInputChange('demoUrl', e.target.value)}
            placeholder="https://your-demo.com"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description <span className="text-gray-400">(max 1000 characters)</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Describe your project..."
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length}/1000 characters
          </p>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium mb-2">Technologies</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              placeholder="Add technology..."
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Screenshots */}
        <div>
          <label className="block text-sm font-medium mb-2">Screenshots (Max 5)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleScreenshotUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {screenshots.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {screenshots.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeScreenshot(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !formData.githubUrl}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Project'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectSubmissionForm;