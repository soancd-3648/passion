
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

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

const Projects: React.FC = () => {
  // Use Data from "Backend"
  const { projects } = useData();

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 mb-16 text-center">
        <SectionReveal>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Dự Án Tiêu Biểu</h2>
          <div className="flex justify-center space-x-6 text-sm text-gray-500 uppercase tracking-widest mt-8">
            <span className="text-primary border-b border-primary cursor-pointer">Tất cả</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Biệt thự</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Chung cư</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Khách sạn</span>
          </div>
        </SectionReveal>
      </div>

      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {projects.map((prj, idx) => (
            <SectionReveal key={prj.id} delay={idx * 0.05}>
              <Link to={`/detail/${prj.title.toLowerCase().replace(/\s/g, '-')}`} className="block group relative aspect-[3/4] overflow-hidden cursor-pointer">
                <img src={prj.img} alt={prj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <p className="text-accent text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {prj.category}
                  </p>
                  <h3 className="text-white font-serif text-xl md:text-2xl uppercase tracking-wide">
                    {prj.title}
                  </h3>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
