
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Youtube, Facebook, Instagram } from 'lucide-react';
import { useData } from '../context/DataContext';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const { menuItems } = useData();

  // Sort menu items by order
  const sortedItems = [...menuItems].sort((a, b) => a.order - b.order);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex"
        >
          {/* Main White Area */}
          <div className="flex-grow bg-white relative flex flex-col pl-12 md:pl-24 justify-center overflow-y-auto">
            {/* Close Button */}
            <button onClick={onClose} className="absolute left-8 top-8 md:top-1/2 md:-translate-y-1/2 p-2 hover:rotate-90 transition-transform duration-300 z-10">
               <X size={40} strokeWidth={1} />
            </button>

            <div className="space-y-6 md:space-y-8 ml-8 md:ml-32 mt-20 md:mt-0 mb-12">
              {sortedItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    onClick={onClose}
                    className="block group"
                  >
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#333] group-hover:text-accent transition-colors">
                      {item.label}
                    </h2>
                    {item.subLabel && (
                      <p className="font-serif text-xl md:text-2xl text-[#C5A572] mt-2 ml-4 italic">
                        {item.subLabel}
                      </p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="md:absolute bottom-12 left-24 md:left-40 text-xs font-bold tracking-widest uppercase border-b border-black pb-1 cursor-pointer w-fit ml-8 md:ml-0">
              Tìm kiếm
            </div>
          </div>

          {/* Right Dark Strip */}
          <div className="hidden md:flex w-24 md:w-32 bg-[#262626] text-white flex-col justify-between items-center py-12 border-l border-gray-800">
             <div className="text-right w-full px-4">
                <div className="text-[10px] uppercase text-gray-400 mb-1">Thay đổi<br/>Ngôn ngữ</div>
                <div className="text-sm font-bold flex items-center justify-end cursor-pointer hover:text-accent">
                   VI <span className="ml-1 text-[10px]">▼</span>
                </div>
             </div>

             <div className="flex flex-col space-y-6">
                <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent transition-colors cursor-pointer">
                   <Youtube size={16} />
                </div>
                <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent transition-colors cursor-pointer">
                   <Facebook size={16} />
                </div>
                <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent transition-colors cursor-pointer">
                   <Instagram size={16} />
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;
