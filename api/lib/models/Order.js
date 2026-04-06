const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  specialInstructions: { type: String, default: '' },
  items: [{ name: String, quantity: Number, price: String }],
  totalAmount: { type: Number, required: true },
  orderReference: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
