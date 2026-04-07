import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import orderRoutes from './routes/orders.js';
import messageRoutes from './routes/messages.js';
import reservationRoutes from './routes/reservations.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Vercel Serverless DB connection cache
let isConnected = false;

app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is missing');
      }
      await mongoose.connect(process.env.MONGO_URI, { 
        serverSelectionTimeoutMS: 5000,
        bufferCommands: false 
      });
      isConnected = true;
      console.log('MongoDB Connected successfully');
    } catch (error) {
      console.error('MongoDB Connection error:', error);
      return res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
  }
  next();
});

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reservations', reservationRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'ÉLEVÉ API is running perfectly on Vercel' });
});

export default app;
