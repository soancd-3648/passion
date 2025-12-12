
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProjectSlider from '../components/ProjectSlider';

const StickyBooking: React.FC = () => (
  <div className="absolute bottom-8 right-8 z-30 hidden lg:block bg-white/90 backdrop-blur-sm p-5 shadow-2xl max-w-xs border-l-4 border-accent">
      <h4 className="font-serif text-lg font-medium mb-1 text-black">Đặt lịch</h4>
      <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">Chào đón bạn đến thăm quan showroom của chúng tôi.</p>
      <Link to="/contact" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 text-black hover:text-accent hover:border-accent transition-colors flex items-center w-fit">
        Đặt lịch ngay <ChevronRight size={10} className="ml-1" />
      </Link>
  </div>
);

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { aboutData, videos } = useData();
  
  const featuredVideo = videos.length > 0 ? videos[0] : { title: "VIDEO", thumbnail: "https://picsum.photos/id/326/1920/1080", video_url: "#" };

  const sections = [
    {
      id: "kitchen",
      label: "TỦ BẾP",
      image: "https://picsum.photos/id/1080/1920/1080", 
      link: "/detail/grandique"
    },
    {
      id: "living",
      label: "PHÒNG KHÁCH",
      image: "https://picsum.photos/id/1082/1920/1080", 
      link: "/detail/living-room"
    },
    {
      id: "closet",
      label: "PHÒNG THAY ĐỒ",
      image: "https://picsum.photos/id/1065/1920/1080",
      link: "/detail/closet"
    },
    {
      id: "project",
      label: "DỰ ÁN",
      isSlider: true,
      link: "/projects"
    },
    {
      id: "video",
      label: featuredVideo.title || "VIDEO",
      image: featuredVideo.thumbnail,
      link: featuredVideo.video_url,
    },
    {
      id: "about",
      label: aboutData.title, 
      image: aboutData.img, 
      link: "/about",
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop;
        const windowHeight = window.innerHeight;
        const index = Math.round(scrollPosition / windowHeight);
        setActiveSection(index);
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white">
      <div ref={containerRef} className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {sections.map((section, index) => (
          <section key={index} className="relative h-screen w-full snap-start flex items-end pb-32 overflow-hidden group">
            <div className="absolute inset-0 z-0">
              {section.isSlider ? (
                <div className="w-full h-full bg-gray-100"></div>
              ) : (
                <img src={section.image} alt={section.label} className={`w-full h-full object-cover transition-transform duration-[2s] ease-in-out ${activeSection === index ? 'scale-105' : 'scale-100'}`} />
              )}
              {!section.isSlider && <div className="absolute inset-0 bg-black/20"></div>}
            </div>

            {section.isSlider ? (
              <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center w-full h-full">
                <div className="w-1/2">
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 leading-tight uppercase text-gray-800">{section.label}</h2>
                    <Link to={section.link!} className="inline-flex items-center text-xs uppercase tracking-widest text-gray-800 border-b border-gray-800 pb-1 hover:text-accent hover:border-accent transition-colors">
                      Xem thêm <ArrowRight size={14} className="ml-2" />
                    </Link>
                  </motion.div>
                </div>
                <ProjectSlider />
              </div>
            ) : (
              <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-between items-end w-full">
                <div>
                  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 leading-tight uppercase opacity-90">{section.label}</h2>
                  </motion.div>
                  
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                    <Link to={section.link!} className="inline-flex items-center text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md border border-white/30 px-8 py-3 hover:bg-white hover:text-primary transition-all duration-300">
                      Xem thêm <ArrowRight size={14} className="ml-2" />
                    </Link>
                  </motion.div>
                </div>
                <div className="hidden lg:block relative z-20 mb-[-4rem] mr-24">
                   <StickyBooking />
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection(index)}>
             <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeSection === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} ${section.isSlider ? 'text-gray-800' : 'text-white'}`}>{section.label}</span>
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === index ? `scale-150 ${section.isSlider ? 'bg-gray-800' : 'bg-white'}` : `${section.isSlider ? 'bg-gray-800/50' : 'bg-white/50'} group-hover:${section.isSlider ? 'bg-gray-800' : 'bg-white'}`}`}>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
