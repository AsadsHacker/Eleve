import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Menu2() {
  const { addItem } = useCart();

  const mains = Array(12).fill(null).map((_, i) => ({
    id: i + 300,
    name: ['Imperial Wagyu Ribeye', 'Dark Truffle Linguine', 'Golden Saffron Risotto', 'Supreme Salmon Steak'][i % 4] + ` ${i > 3 ? 'Reserve' : ''}`,
    desc: 'Prepared by our Master Chefs with authentic traditional techniques.',
    price: '$' + (45 + (i * 5)),
    image: `https://loremflickr.com/800/600/food,steak,fish?lock=${i + 20}`
  }));

  return (
    <div className="w-full pt-24 bg-dark-900 min-h-screen">
      
      <div className="text-center py-16 bg-dark-800 border-b border-white/5">
        <p className="text-accent-green tracking-[0.2em] uppercase text-sm font-bold">The Main Event</p>
        <h1 className="text-5xl md:text-6xl font-heading text-white mt-4 mb-6">Signature Mains</h1>
        <div className="w-24 h-1 bg-gold mx-auto"></div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {mains.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 2) * 0.2 }}
              className="group flex flex-col sm:flex-row bg-dark-800 rounded-xl overflow-hidden border border-white/5 hover:border-gold/50 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="sm:w-3/5 p-8 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-heading text-white group-hover:text-gold transition-colors">{item.name}</h3>
                  <span className="text-gold font-bold text-xl">{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <div className="mt-auto">
                    <button
                      onClick={() => addItem(item)}
                      className="px-6 py-2 border border-white/20 text-light uppercase tracking-wider text-xs font-bold hover:bg-gold hover:text-dark-900 transition-all cursor-pointer"
                    >
                    Add to Order
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
