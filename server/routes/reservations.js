const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST /api/reservations — save reservation
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

// GET /api/reservations — get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reservations', error: error.message });
  }
});

module.exports = router;
