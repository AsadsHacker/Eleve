const connectDB = require('./lib/db');
const Order = require('./lib/models/Order');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();
  } catch (err) {
    console.error('DB Connection Error:', err);
    return res.status(500).json({ success: false, message: 'Database connection failed', error: err.message });
  }

  if (req.method === 'POST') {
    try {
      const order = new Order(req.body);
      const saved = await order.save();
      return res.status(201).json({ success: true, order: saved });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to place order', error: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
