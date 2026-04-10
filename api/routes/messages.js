import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const msg = new Message(req.body);
    const saved = await msg.save();
    res.status(201).json({ success: true, message: saved });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages', error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { isRead } = req.body;
    const updated = await Message.findByIdAndUpdate(req.params.id, { isRead }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Message not found' });
    res.status(200).json({ success: true, message: updated });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ success: false, message: 'Failed to update message', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Message not found' });
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, message: 'Failed to delete message', error: error.message });
  }
});

export default router;
