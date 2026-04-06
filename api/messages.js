const connectDB = require('./lib/db');
const Message = require('./lib/models/Message');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  if (req.method === 'POST') {
    try {
      const msg = new Message(req.body);
      const saved = await msg.save();
      return res.status(201).json({ success: true, message: saved });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, messages });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch messages', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
