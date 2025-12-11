
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SectionReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Collections: React.FC = () => {
  const collections = [
    { name: "REFUGE GLAMOUR", img: "https://picsum.photos/id/435/800/800" },
    { name: "HAUTE COUTURE", img: "https://picsum.photos/id/366/800/800" },
    { name: "POUR ELLEN", img: "https://picsum.photos/id/399/800/800" },
    { name: "D' PALACE", img: "https://picsum.photos/id/449/800/800" },
    { name: "CLASSIC", img: "https://picsum.photos/id/511/800/800" },
    { name: "POUR HOMME", img: "https://picsum.photos/id/250/800/800" },
  ];

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 mb-12 text-center">
        <SectionReveal>
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">Our Masterpieces</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Bộ Sưu Tập</h2>
        </SectionReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {collections.map((item, idx) => (
          <SectionReveal key={idx} delay={idx * 0.1}>
            <Link to={`/detail/${item.name.toLowerCase().replace(/\s/g, '-')}`} className="block group relative aspect-[4/3] overflow-hidden cursor-pointer">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 flex flex-col items-center justify-center">
                <div className="border border-white/30 p-8 md:p-12 transition-all duration-500 group-hover:border-white/80 group-hover:scale-105">
                  <h3 className="text-white font-serif text-2xl md:text-4xl uppercase tracking-wider text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.name}
                  </h3>
                  <p className="text-white/0 group-hover:text-white/80 text-center text-xs mt-4 uppercase tracking-widest transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    Khám phá ngay
                  </p>
                </div>
              </div>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
};

export default Collections;
