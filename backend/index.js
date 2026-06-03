import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import orderRoutes from './routes/orders.js';
import messageRoutes from './routes/messages.js';
import reservationRoutes from './routes/reservations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'ÉLEVÉ API is running perfectly' });
});

app.get('/api/health', (req, res) => res.status(200).send('OK'));

// Vercel Serverless Connection Cache
let isConnected = false;

// Connect Database before routes if needed, or connect globally
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection error:', error);
  }
};

// Auto-connect when script runs (for Serverless cold starts)
connectDB();

// Only listen locally, Vercel exports the app
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Local server running on http://localhost:${PORT}`);
  });
}

// Export the Express API for Vercel Serverless
export default app;
