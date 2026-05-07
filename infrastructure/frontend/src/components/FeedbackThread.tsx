import { useState } from 'react';

interface FeedbackMessage {
  id: string;
  author: string;
  authorRole: 'learner' | 'reviewer';
  content: string;
  timestamp: string;
  isRead?: boolean;
}

interface FeedbackThreadProps {
  messages: FeedbackMessage[];
  onSendResponse: (content: string) => void;
  onMarkAsRead?: (messageId: string) => void;
}

function FeedbackThread({ messages, onSendResponse, onMarkAsRead }: FeedbackThreadProps) {
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    try {
      await onSendResponse(newMessage);
      setNewMessage('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Feedback Thread</h3>
      </div>

      {/* Messages */}
      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isLearner = message.authorRole === 'learner';
          
          return (
            <div
              key={message.id}
              className={`flex ${isLearner ? 'justify-end' : 'justify-start'}`}
              onClick={() => !message.isRead && onMarkAsRead && onMarkAsRead(message.id)}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  isLearner
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                } ${!message.isRead ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium opacity-75">
                    {message.author} ({message.authorRole})
                  </span>
                  {!message.isRead && (
                    <span className="w-2 h-2 bg-red-500 rounded-full inline-block ml-2" />
                  )}
                </div>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your response... (Enter to send)"
            rows={2}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={sending || !newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 self-end"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackThread;