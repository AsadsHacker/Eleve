import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, clearCart, openOrderModal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[70] flex flex-col"
            style={{ backgroundColor: '#1a1a1a' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <ShoppingBag size={22} className="text-gold" />
                <h2 className="text-2xl font-heading text-gold tracking-wider">Your Order</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={64} className="text-white/10 mb-6" />
                  <p className="text-gray-400 text-lg font-heading">Your cart is empty</p>
                  <p className="text-gray-600 text-sm mt-2">Add items from our menu to get started</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex items-center space-x-4 bg-white/5 rounded-xl p-4 border border-white/5"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-bold truncate">{item.name}</h4>
                      <p className="text-gold text-sm font-semibold mt-1">{item.price}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md border border-white/20 text-gray-400 hover:text-white hover:border-gold transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white text-sm font-bold min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-md border border-white/20 text-gray-400 hover:text-white hover:border-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer with subtotal */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase tracking-wider">Subtotal</span>
                  <span className="text-gold text-2xl font-heading">${subtotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={openOrderModal}
                  className="w-full py-4 bg-gold text-dark-900 font-bold uppercase tracking-wider hover:bg-white transition-colors rounded-lg text-sm"
                >
                  Place Order
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-3 border border-white/20 text-gray-400 uppercase tracking-wider text-xs font-bold hover:text-white hover:border-white/40 transition-colors rounded-lg"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
