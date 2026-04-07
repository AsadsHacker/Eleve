import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: String, required: true },
  specialRequests: { type: String, default: '' },
  status: { type: String, default: 'confirmed' },
  reservationReference: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);
