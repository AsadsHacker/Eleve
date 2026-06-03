import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/messages`);
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.map(m => m._id === id ? { ...m, isRead: !currentStatus } : m));
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`${API_URL}/api/messages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter(m => m._id !== id));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) return <div className="text-gold">Loading messages...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading text-white tracking-widest">Customer Messages</h1>

      {messages.length === 0 ? (
        <div className="bg-[#1a1a1a] rounded-2xl p-8 text-center text-gray-500 border border-white/5">
          No messages received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`bg-[#1a1a1a] rounded-2xl p-6 border transition-all duration-300 ${
                msg.isRead ? 'border-white/5 opacity-60' : 'border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.05)]'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-white text-lg">{msg.name}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
                    <span>{msg.email}</span>
                    <span>•</span>
                    <span>{msg.phone}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <p className="text-sm font-medium text-gold mb-2">Subject: {msg.subject}</p>
                <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
              </div>

              <div className="flex justify-end items-center space-x-3">
                <button
                  onClick={() => markAsRead(msg._id, msg.isRead)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    msg.isRead 
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10' 
                      : 'bg-gold/10 text-gold hover:bg-gold/20'
                  }`}
                >
                  {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete Message"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
