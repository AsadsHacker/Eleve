import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const saved = await reservation.save();
    res.status(201).json({ success: true, reservation: saved });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ success: false, message: 'Failed to save reservation', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reservations', error: error.message });
  }
});

export default router;
