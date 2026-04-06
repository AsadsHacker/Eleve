import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number required').regex(/^[+\d\s()-]+$/, 'Invalid phone format'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(5, 'Delivery address is required'),
  city: z.string().min(2, 'City is required'),
  instructions: z.string().optional(),
});

export default function OrderModal() {
  const { items, subtotal, isOrderModalOpen, closeOrderModal, goBackToCart, clearCart } = useCart();
  const [orderState, setOrderState] = useState('form'); // 'form' | 'processing' | 'success'
  const [customerName, setCustomerName] = useState('');
  const [orderRef, setOrderRef] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setOrderState('processing');
    setErrorMsg('');

    const ref = String(Math.floor(100000 + Math.random() * 900000));

    const orderPayload = {
      customerName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      specialInstructions: data.instructions || '',
      items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      totalAmount: subtotal,
      orderReference: ref,
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Failed to place order');
      }

      setCustomerName(data.fullName);
      setOrderRef(ref);
      clearCart();
      setOrderState('success');
    } catch (err) {
      console.error('Order error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setOrderState('form');
    }
  };

  const handleClose = () => {
    closeOrderModal();
    // Reset after animation
    setTimeout(() => {
      setOrderState('form');
      setCustomerName('');
      setOrderRef('');
      reset();
    }, 400);
  };

  const handleGoBack = () => {
    goBackToCart();
    setTimeout(() => {
      setOrderState('form');
      reset();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOrderModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={orderState === 'success' ? handleClose : undefined}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              {orderState !== 'success' ? (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 pt-6 pb-4">
                    <div>
                      <div className="w-16 h-1 bg-gold mb-4"></div>
                      <h2 className="text-2xl font-heading text-white tracking-wider">Complete Your Order</h2>
                    </div>
                    <button
                      onClick={handleGoBack}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Order Summary */}
                  <div className="px-6 pb-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Order Summary</h3>
                      <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-300 truncate pr-4">{item.name} <span className="text-gold">×{item.quantity}</span></span>
                            <span className="text-gray-400 flex-shrink-0">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="w-full h-px bg-gold/30 my-3"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400 uppercase tracking-wider">Total</span>
                        <span className="text-gold text-xl font-heading">${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Details Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-4">
                    {errorMsg && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                        {errorMsg}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gold text-xs uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input
                          {...register('fullName')}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-lg text-white text-sm border border-white/10 focus:border-gold outline-none transition-colors"
                          style={{ backgroundColor: '#2a2a2a' }}
                        />
                        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gold text-xs uppercase tracking-wider mb-1.5">Phone Number *</label>
                        <input
                          {...register('phone')}
                          placeholder="+92 300 1234567"
                          className="w-full px-4 py-3 rounded-lg text-white text-sm border border-white/10 focus:border-gold outline-none transition-colors"
                          style={{ backgroundColor: '#2a2a2a' }}
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gold text-xs uppercase tracking-wider mb-1.5">Email Address *</label>
                      <input
                        {...register('email')}
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-lg text-white text-sm border border-white/10 focus:border-gold outline-none transition-colors"
                        style={{ backgroundColor: '#2a2a2a' }}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-gold text-xs uppercase tracking-wider mb-1.5">Delivery Address *</label>
                      <textarea
                        {...register('address')}
                        rows="2"
                        placeholder="Street address, building, floor..."
                        className="w-full px-4 py-3 rounded-lg text-white text-sm border border-white/10 focus:border-gold outline-none transition-colors resize-none"
                        style={{ backgroundColor: '#2a2a2a' }}
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                    </div>

                    <div>
                      <label className="block text-gold text-xs uppercase tracking-wider mb-1.5">City *</label>
                      <input
                        {...register('city')}
                        placeholder="Karachi"
                        className="w-full px-4 py-3 rounded-lg text-white text-sm border border-white/10 focus:border-gold outline-none transition-colors"
                        style={{ backgroundColor: '#2a2a2a' }}
                      />
                      {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                    </div>

                    <div>
                      <label className="block text-gold text-xs uppercase tracking-wider mb-1.5">Special Instructions</label>
                      <textarea
                        {...register('instructions')}
                        rows="2"
                        placeholder="Any allergies or special requests?"
                        className="w-full px-4 py-3 rounded-lg text-white text-sm border border-white/10 focus:border-gold outline-none transition-colors resize-none"
                        style={{ backgroundColor: '#2a2a2a' }}
                      />
                    </div>

                    {/* Confirm Button */}
                    <button
                      type="submit"
                      disabled={orderState === 'processing'}
                      className="w-full py-4 bg-gold text-dark-900 font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                      {orderState === 'processing' ? (
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>Processing...</span>
                        </span>
                      ) : (
                        'Confirm Order'
                      )}
                    </button>

                    {/* Go Back Button */}
                    <button
                      type="button"
                      onClick={handleGoBack}
                      className="w-full py-2 text-gray-500 text-xs uppercase tracking-wider hover:text-gold transition-colors"
                    >
                      Go Back to Cart
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="px-6 py-12 text-center">
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
                    Order Placed Successfully!
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      Thank you <span className="text-gold font-semibold">{customerName}</span>, your order has been received. We will contact you shortly.
                    </p>

                    <div className="inline-block bg-white/5 border border-gold/20 rounded-lg px-6 py-3 mb-8">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Order Reference</p>
                      <p className="text-gold text-2xl font-heading tracking-widest">#{orderRef}</p>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    onClick={handleClose}
                    className="w-full py-4 bg-gold text-dark-900 font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-lg text-sm"
                  >
                    Done
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
