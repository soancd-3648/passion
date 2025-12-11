
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, Phone } from 'lucide-react';
import FullScreenMenu from './FullScreenMenu';
import SearchOverlay from './SearchOverlay';

const GridIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="3" width="4" height="4" fill="currentColor" />
    <rect x="10" y="3" width="4" height="4" fill="currentColor" />
    <rect x="17" y="3" width="4" height="4" fill="currentColor" />
    <rect x="3" y="10" width="4" height="4" fill="currentColor" />
    <rect x="10" y="10" width="4" height="4" fill="currentColor" />
    <rect x="17" y="10" width="4" height="4" fill="currentColor" />
    <rect x="3" y="17" width="4" height="4" fill="currentColor" />
    <rect x="10" y="17" width="4" height="4" fill="currentColor" />
    <rect x="17" y="17" width="4" height="4" fill="currentColor" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 px-6 md:px-12 flex justify-between items-center text-white mix-blend-difference`}>
        {/* Left: Menu Trigger */}
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="hover:opacity-80 transition-opacity"
        >
          <GridIcon size={28} />
        </button>

        {/* Center: Logo */}
        <Link to="/" className="text-center absolute left-1/2 -translate-x-1/2 group">
          <div className="bg-white/90 text-black px-5 py-2">
             <h1 className="font-serif text-xl tracking-[0.2em] font-bold">PASSION</h1>
          </div>
          <p className="text-[0.5rem] tracking-[0.3em] mt-1 uppercase text-white font-light group-hover:text-accent transition-colors text-center w-full">The way to success</p>
        </Link>

        {/* Right: Utilities */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Search size={20} className="cursor-pointer hover:text-accent transition-colors hidden md:block" onClick={() => setIsSearchOpen(true)} />
          <MapPin size={20} className="cursor-pointer hover:text-accent transition-colors hidden md:block" />
          <Phone size={20} className="cursor-pointer hover:text-accent transition-colors hidden md:block" />
          <div className="text-xs border border-white/40 px-2 py-1 cursor-pointer hover:bg-white hover:text-black transition-colors">VI ▼</div>
        </div>
      </nav>

      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
