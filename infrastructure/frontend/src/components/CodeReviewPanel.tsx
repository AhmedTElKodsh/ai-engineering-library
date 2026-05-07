import { useState } from 'react';

interface CodeComment {
  id: string;
  lineNumber: number;
  content: string;
  severity: 'info' | 'suggestion' | 'issue' | 'critical';
  resolved: boolean;
  author?: string;
}

interface FileReview {
  filename: string;
  content: string;
  comments: CodeComment[];
}

interface CodeReviewPanelProps {
  files: FileReview[];
  onAddComment: (fileIndex: number, lineNumber: number, content: string, severity: string) => void;
  onResolveComment: (commentId: string) => void;
}

function CodeReviewPanel({ files, onAddComment, onResolveComment }: CodeReviewPanelProps) {
  const [selectedFile, setSelectedFile] = useState(0);
  const [newComment, setNewComment] = useState({ line: 0, content: '', severity: 'info' as const });
  const [showCommentForm, setShowCommentForm] = useState(false);

  const currentFile = files[selectedFile];

  const handleAddComment = () => {
    if (newComment.content.trim()) {
      onAddComment(selectedFile, newComment.line, newComment.content, newComment.severity);
      setNewComment({ line: 0, content: '', severity: 'info' });
      setShowCommentForm(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'suggestion': return 'bg-green-100 text-green-800';
      case 'issue': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* File Tree */}
      <div className="border-b border-gray-200 p-4">
        <h3 className="font-semibold mb-2">Files</h3>
        <div className="flex space-x-2 overflow-x-auto">
          {files.map((file, index) => (
            <button
              key={index}
              onClick={() => setSelectedFile(index)}
              className={`px-3 py-1 rounded text-sm ${
                selectedFile === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {file.filename}
            </button>
          ))}
        </div>
      </div>

      {/* Code View */}
      {currentFile && (
        <div className="p-4">
          <h4 className="font-medium mb-2">{currentFile.filename}</h4>
          <div className="bg-gray-50 rounded p-4 font-mono text-sm overflow-x-auto">
            {currentFile.content.split('\n').map((line, lineIndex) => {
              const lineNumber = lineIndex + 1;
              const comments = currentFile.comments.filter(c => c.lineNumber === lineNumber && !c.resolved);
              
              return (
                <div key={lineIndex} className="group relative">
                  <div className="flex">
                    <span className="inline-block w-8 text-gray-400 text-right mr-4 select-none">
                      {lineNumber}
                    </span>
                    <span className="flex-1">{line || ' '}</span>
                  </div>
                  
                  {/* Click to add comment */}
                  <button
                    onClick={() => {
                      setNewComment({ line: lineNumber, content: '', severity: 'info' });
                      setShowCommentForm(true);
                    }}
                    className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 text-xs text-blue-600 hover:text-blue-800"
                  >
                    + comment
                  </button>
                  
                  {/* Show comments for this line */}
                  {comments.map(comment => (
                    <div key={comment.id} className={`ml-12 p-2 rounded ${getSeverityColor(comment.severity)}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-medium">{comment.severity}</span>
                          {comment.author && (
                            <span className="text-xs text-gray-500 ml-2">by {comment.author}</span>
                          )}
                        </div>
                        <button
                          onClick={() => onResolveComment(comment.id)}
                          className="text-xs text-green-600 hover:text-green-800"
                        >
                          Resolve
                        </button>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Comment Form */}
      {showCommentForm && (
        <div className="border-t border-gray-200 p-4">
          <h4 className="font-semibold mb-2">Add Comment for Line {newComment.line}</h4>
          <select
            value={newComment.severity}
            onChange={(e) => setNewComment({ ...newComment, severity: e.target.value as any })}
            className="mb-2 p-2 border border-gray-300 rounded"
          >
            <option value="info">Info</option>
            <option value="suggestion">Suggestion</option>
            <option value="issue">Issue</option>
            <option value="critical">Critical</option>
          </select>
          <textarea
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            placeholder="Enter your comment..."
            rows={3}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Comment
            </button>
            <button
              onClick={() => setShowCommentForm(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeReviewPanel;