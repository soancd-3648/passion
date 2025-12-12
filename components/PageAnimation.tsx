
import React from 'react';
import { motion } from 'framer-motion';

interface PageAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const PageAnimation: React.FC<PageAnimationProps> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageAnimation;
