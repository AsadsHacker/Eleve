import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Chef() {
  const chefs = [
    { 
      name: 'Alexander Volkov', title: 'Executive Head Chef', 
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=800&fit=crop&crop=face', 
      bio: 'With 20 years of Michelin-star experience in Paris and Tokyo.' 
    },
    { 
      name: 'Sarah Jenkins', title: 'Pastry Chef', 
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&h=800&fit=crop&crop=face', 
      bio: 'Master of delicate pastries and artistic dessert plating.' 
    },
    { 
      name: 'David Chen', title: 'Sous Chef', 
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&h=800&fit=crop&crop=face', 
      bio: 'Specialist in pan-Asian fusion and exotic flavor profiles.' 
    },
    { 
      name: 'Elena Rossi', title: 'Grill Master', 
      image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&h=800&fit=crop&crop=face', 
      bio: 'Renowned for perfect cuts and wood-fired mastery.' 
    }
  ];

  return (
    <div className="w-full pt-24 bg-dark-900 min-h-screen">
      
      <div className="text-center py-16">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-accent-green tracking-[0.2em] uppercase text-sm font-bold"
        >
          The Masters
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-6xl font-heading text-white mt-4 mb-6"
        >
          Meet Our Chefs
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-24 h-1 bg-gold mx-auto mb-6"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed px-4"
        >
          Our culinary team brings decades of international experience, passion, and artistry to every dish served at ÉLEVÉ.
        </motion.p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className="group relative overflow-hidden flex flex-col items-center rounded-xl"
            >
              <div className="w-full h-[400px] overflow-hidden relative">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover filter grayscale transform group-hover:scale-105 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/40 via-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="absolute bottom-0 w-full bg-dark-900/70 backdrop-blur-md p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-center rounded-t-2xl shadow-[0_-15px_30px_rgba(212,175,55,0.2)]">
                <h3 className="text-2xl font-heading text-white mb-1">{chef.name}</h3>
                <p className="text-gold text-sm uppercase tracking-wider mb-3">{chef.title}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{chef.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-white hover:text-gold transition-colors"><FaInstagram size={20} /></a>
                  <a href="#" className="text-white hover:text-gold transition-colors"><FaTwitter size={20} /></a>
                </div>
              </div>
              
              <div className="w-full bg-dark-900/80 backdrop-blur-sm p-6 text-center group-hover:opacity-0 transition-opacity duration-300">
                 <h3 className="text-xl font-heading text-white mb-1">{chef.name}</h3>
                 <p className="text-gold text-sm uppercase tracking-wider">{chef.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
