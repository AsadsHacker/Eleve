import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    { text: "The finest dining experience in Karachi. The Wagyu was cooked to perfection and the ambiance is unmatched.", author: "Ahmad R.", role: "Food Critic" },
    { text: "We hosted our corporate dinner here and the staff went above and beyond. Truly a 5-star service with luxurious aesthetics.", author: "Sarah M.", role: "CEO" },
    { text: "Every bite is a literal explosion of flavor. The gold leaf accents make you feel like royalty.", author: "Bilal K.", role: "Local Guide" }
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
          Client Feedback
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-6xl font-heading text-white mt-4 mb-6"
        >
          Testimonials
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-24 h-1 bg-gold mx-auto"
        />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: i * 0.25 }}
               className="bg-dark-800 p-10 border border-white/5 relative hover:border-gold/30 transition-colors"
             >
               <Quote size={40} className="text-gold/20 absolute top-6 right-6" />
               <div className="flex gap-1 mb-6">
                 {[1,2,3,4,5].map(s => <span key={s} className="text-gold text-lg">★</span>)}
               </div>
               <p className="text-gray-300 italic mb-8 leading-relaxed">"{rev.text}"</p>
               <div>
                 <h4 className="text-white font-bold">{rev.author}</h4>
                 <p className="text-gold text-sm">{rev.role}</p>
               </div>
             </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
