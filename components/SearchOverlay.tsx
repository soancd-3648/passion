
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const popularSearches = ["Grandique", "Biệt thự Ecopark", "Phòng khách", "Sofa da", "Tủ bếp cổ điển"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-xl flex flex-col justify-center items-center px-6 md:px-24"
        >
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform duration-300 text-gray-800"
          >
            <X size={40} strokeWidth={1} />
          </button>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <div className="relative group">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full bg-transparent border-b-2 border-gray-200 py-6 text-3xl md:text-5xl font-serif text-gray-800 placeholder-gray-300 focus:outline-none focus:border-accent transition-colors duration-300"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-accent transition-colors duration-300" size={32} />
            </div>

            <div className="mt-12">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Xu hướng tìm kiếm</p>
              <div className="flex flex-wrap gap-4">
                {popularSearches.map((term, idx) => (
                  <button 
                    key={idx}
                    className="px-6 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {query && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100"
              >
                 <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-4">
                       <img src="https://picsum.photos/id/1080/100/100" className="w-16 h-16 object-cover rounded" alt="Result" />
                       <div>
                          <h4 className="font-serif text-lg text-gray-800 group-hover:text-accent transition-colors">Tủ bếp Grandique I</h4>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Bộ sưu tập</p>
                       </div>
                    </div>
                    <ArrowRight className="text-gray-400 group-hover:text-accent group-hover:translate-x-2 transition-all" size={20}/>
                 </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
