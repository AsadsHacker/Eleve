import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function AnimatedCounter({ from, to, duration, suffix }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString() + suffix);
  
  return (
    <motion.span
      onViewportEnter={() => {
        animate(count, to, { duration, ease: "easeOut" });
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {rounded}
    </motion.span>
  );
}

const reviews = [
  {
    text: "An unforgettable dining experience! Every dish was a masterpiece, and the ambiance was simply perfect. From the first bite to the last, every moment was pure culinary bliss. Highly recommended!",
    author: "Stephen Care",
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    ]
  },
  {
    text: "ÉLEVÉ has redefined fine dining for me. The service was impeccable, the food extraordinary, and the atmosphere pure luxury. A truly elevated experience.",
    author: "Sofia Laurent",
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    ]
  },
  {
    text: "Every visit feels like a special occasion. The chefs here are artists — each plate is a work of art that tastes even better than it looks.",
    author: "James Whitfield",
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    ]
  },
  {
    text: "The best restaurant in Karachi without a doubt. The wagyu was cooked to perfection and the desserts were divine. Will absolutely be returning.",
    author: "Aisha Malik",
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    ]
  },
  {
    text: "A magical evening from start to finish. The ambiance, the food, the service — everything was beyond our expectations. ÉLEVÉ truly lives up to its name.",
    author: "Marco Rossini",
    photos: [
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=face',
    ]
  },
];

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const dishes = [
    { name: 'Luxury Grilled Steak', price: '$45', image: '/images/food_steak_luxury_1775324465478.png' },
    { name: 'Squid Ink Pasta', price: '$35', image: '/images/food_pasta_luxury_1775325850281.png' },
    { name: 'Golden Sushi Platter', price: '$55', image: '/images/food_sushi_luxury_1775325269167.png' }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_bg_1_1775325452663.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-900/60 z-10"></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.h4 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-gold tracking-[0.3em] uppercase text-sm md:text-base font-semibold mb-4"
          >
            Welcome to
          </motion.h4>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-6xl md:text-8xl font-heading text-white mb-6 tracking-widest drop-shadow-xl"
          >
            ÉLEVÉ
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-lg md:text-xl text-gray-300 mb-10 font-light"
          >
            An Elevated Dining Experience in the Heart of Clifton<br className="hidden md:block" /> where luxury meets culinary perfection.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/menu-1" className="px-8 py-4 bg-gold text-dark-900 font-bold uppercase tracking-wider hover:bg-white transition-colors w-full sm:w-auto text-center">
              Discover Menu
            </Link>
            <Link to="/reservation" className="px-8 py-4 border border-gold text-gold font-bold uppercase tracking-wider hover:bg-gold hover:text-dark-900 transition-colors w-full sm:w-auto text-center">
              Book a Table
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-accent-green text-sm tracking-[0.2em] uppercase font-bold">Discover</span>
            <h2 className="text-4xl md:text-5xl font-heading text-white mt-4">Our Signature Dishes</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {dishes.map((dish, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.25 }}
                className="group relative"
              >
                <div className="overflow-hidden rounded-xl h-[400px]">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80"></div>
                </div>
                
                <div className="absolute bottom-0 w-full p-8 text-center">
                  <h3 className="text-2xl font-heading text-white mb-2">{dish.name}</h3>
                  <p className="text-gold font-semibold text-xl mb-4">{dish.price}</p>
                  <Link to="/menu-1" className="inline-block border-b border-accent-green text-light pb-1 hover:text-accent-green transition-colors text-sm uppercase tracking-wider">
                    View in Menu
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Link to="/menu-2" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider hover:border-gold hover:text-gold transition-colors inline-block">
              View Full Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats/Achievements */}
      <section className="py-20 bg-dark-800">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-y border-white/5 py-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { target: 50000, suffix: '+', label: 'Happy Customers' },
              { target: 15, suffix: '+', label: 'Years Experience' },
              { target: 12, suffix: '+', label: 'Master Chefs' },
              { target: 25, suffix: '+', label: 'Awards' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <h3 className="text-4xl md:text-5xl text-gold font-heading mb-2 flex justify-center">
                  <AnimatedCounter from={0} to={stat.target} duration={2.5} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-400 text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=800&fit=crop" 
            alt="Dining" 
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-semibold">✦ Reviews ✦</span>
            <h2 className="text-4xl md:text-5xl font-heading text-white mt-4">Happy Testimonials</h2>
          </motion.div>

          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-8 md:gap-4">
            
            {/* Left Stat */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h3 className="text-5xl md:text-6xl font-heading text-white mb-2">50K+</h3>
              <p className="text-gray-400 text-xs uppercase tracking-[0.25em]">Happy Customers</p>
            </motion.div>

            {/* Center - Review Card */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative w-full max-w-xl mx-auto">
                <div className="rounded-[50px] border border-gold/40 bg-black/50 backdrop-blur-md px-8 md:px-12 py-10 text-center min-h-[200px] flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReview}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col items-center"
                    >
                      <p className="text-white text-base md:text-lg italic leading-relaxed mb-6 font-light">
                        "{reviews[currentReview].text}"
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Reviewer photos & name below the card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`info-${currentReview}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center mt-6"
                  >
                    <div className="flex items-center -space-x-3 mb-3">
                      {reviews[currentReview].photos.map((photo, i) => (
                        <img 
                          key={i}
                          src={photo} 
                          alt="Reviewer" 
                          className="w-11 h-11 rounded-full border-2 border-gold/60 object-cover"
                        />
                      ))}
                    </div>
                    <p className="text-gold font-heading text-sm tracking-[0.15em] uppercase">
                      {reviews[currentReview].author}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots indicator */}
              <div className="flex space-x-2 mt-6">
                {reviews.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentReview ? 'bg-gold w-6' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Stat */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h3 className="text-5xl md:text-6xl font-heading text-white mb-2">4.9/5</h3>
              <p className="text-gray-400 text-xs uppercase tracking-[0.25em]">Rated on Google</p>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
