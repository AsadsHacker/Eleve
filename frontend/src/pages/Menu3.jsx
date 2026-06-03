import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Menu3() {
  const { addItem } = useCart();

  const desserts = Array(10).fill(null).map((_, i) => ({
    id: i + 500,
    name: ['24k Chocolate Dome', 'Matcha Brûlée', 'White Truffle Soufflé', 'Saffron Panna Cotta', 'Berries Pavilion', 'Dark Espresso Tiramisu', 'Vanilla Bean Caviar', 'Gold Leaf Macarons', 'Artisan Sorbet', 'Velvet Lava Cake'][i],
    desc: 'The perfect sweet finish to your ÉLEVÉ experience.',
    price: '$' + (18 + (i * 2)),
    image: `https://loremflickr.com/800/600/food,dessert?lock=${i + 40}`
  }));

  return (
    <div className="w-full pt-24 bg-dark-900 min-h-screen">
      
      <div className="text-center py-16 bg-dark-800 border-b border-white/5">
        <p className="text-accent-green tracking-[0.2em] uppercase text-sm font-bold">The Sweet Ending</p>
        <h1 className="text-5xl md:text-6xl font-heading text-white mt-4 mb-6">Desserts & Drinks</h1>
        <div className="w-24 h-1 bg-gold mx-auto"></div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {desserts.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative overflow-hidden group rounded-xl border border-transparent hover:border-gold/50 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
              onClick={() => addItem(item)}
            >
              <div className="h-80 overflow-hidden relative rounded-xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 w-full p-6 text-center z-10 text-white">
                <h3 className="text-2xl font-heading mb-1">{item.name}</h3>
                <p className="text-gold font-bold mb-3">{item.price}</p>
                <p className="text-gray-400 text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
                <p className="text-gold/70 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to add to order</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
