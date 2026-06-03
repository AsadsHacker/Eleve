import { motion } from 'framer-motion';

export default function Gallery() {
  const images = [
    '/images/hero_bg_1_1775325452663.png',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&h=600&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=600&fit=crop',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&h=600&fit=crop'
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
          Visual Journey
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-6xl font-heading text-white mt-4 mb-6"
        >
          Our Gallery
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
          A visual journey through the art, ambiance, and culinary mastery of ÉLEVÉ
        </motion.p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: (i % 3) * 0.2 }}
               className="break-inside-avoid relative group overflow-hidden"
             >
               <img src={src} alt="Gallery" className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
