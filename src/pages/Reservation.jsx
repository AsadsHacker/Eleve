import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2, { message: 'Name required' }),
  phone: z.string().min(10, { message: 'Valid phone required' }),
  date: z.string().min(1, { message: 'Date required' }),
  time: z.string().min(1, { message: 'Time required' }),
  guests: z.string().min(1, { message: 'Number of guests required' }),
  specialRequests: z.string().optional()
});

export default function Reservation() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmData, setConfirmData] = useState(null);
  const [resRef, setResRef] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setErrorMsg('');
    const ref = String(Math.floor(100000 + Math.random() * 900000));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.name,
          phone: data.phone,
          date: data.date,
          time: data.time,
          guests: data.guests,
          specialRequests: data.specialRequests || '',
          reservationReference: ref,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Failed to book reservation');
      }

      setConfirmData(data);
      setResRef(ref);
      setShowSuccess(true);
      reset();
    } catch (err) {
      console.error('Reservation error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const closeModal = () => {
    setShowSuccess(false);
    setConfirmData(null);
    setResRef('');
  };

  return (
    <div className="w-full pt-32 pb-24 bg-dark-900 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        
        <div className="text-center mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-2"
          >
            Secure Your Table
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-5xl font-heading text-white mb-4"
          >
            Make a Reservation
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-16 h-1 bg-accent-green mx-auto"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="bg-dark-800 p-8 md:p-12 shadow-2xl border border-white/5"
        >
          {errorMsg && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-center rounded">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                <input {...register('name')} className="w-full bg-dark-900 border border-white/10 p-3 text-white focus:border-gold outline-none" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                <input {...register('phone')} className="w-full bg-dark-900 border border-white/10 p-3 text-white focus:border-gold outline-none" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Date</label>
                <input type="date" {...register('date')} className="w-full bg-dark-900 border border-white/10 p-3 text-white focus:border-gold outline-none [color-scheme:dark]" />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Time</label>
                <input type="time" {...register('time')} className="w-full bg-dark-900 border border-white/10 p-3 text-white focus:border-gold outline-none [color-scheme:dark]" />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Guests</label>
                <select {...register('guests')} className="w-full bg-dark-900 border border-white/10 p-3 text-white focus:border-gold outline-none">
                  {[1,2,3,4,5,6,7,8,'8+'].map(num => <option key={num} value={num}>{num} {num===1?'Person':'People'}</option>)}
                </select>
                {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Special Requests (Optional)</label>
              <textarea {...register('specialRequests')} rows="3" className="w-full bg-dark-900 border border-white/10 p-3 text-white focus:border-gold outline-none"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-gold text-dark-900 font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center mt-4 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : <><Calendar size={18} className="mr-2" /> Book Table</>}
            </button>
          </form>
        </motion.div>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && confirmData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="fixed inset-0 z-[80] flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl border border-gold/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)] px-8 py-12 text-center"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                >
                  <CheckCircle size={72} className="text-gold mx-auto mb-6" strokeWidth={1.5} />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl font-heading text-white mb-4"
                >
                  Reservation Confirmed!
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Thank you <span className="text-gold font-semibold">{confirmData.name}</span>, your table has been reserved for{' '}
                    <span className="text-white font-semibold">{confirmData.date}</span> at{' '}
                    <span className="text-white font-semibold">{confirmData.time}</span> for{' '}
                    <span className="text-white font-semibold">{confirmData.guests} {confirmData.guests === '1' ? 'guest' : 'guests'}</span>.
                  </p>

                  <div className="inline-block bg-white/5 border border-gold/20 rounded-lg px-6 py-3 mb-8">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reservation Reference</p>
                    <p className="text-gold text-2xl font-heading tracking-widest">#{resRef}</p>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  onClick={closeModal}
                  className="w-full py-4 bg-gold text-dark-900 font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-lg text-sm cursor-pointer"
                >
                  Done
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
