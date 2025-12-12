
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProjectSlider: React.FC = () => {
  const { projects } = useData();

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="w-[320px] h-[480px]"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="rounded-lg overflow-hidden shadow-lg bg-white group">
            <div className="h-[360px] overflow-hidden">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-medium text-gray-800">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{project.category}</p>
              <Link to={`/detail/${project.id}`} className="inline-flex items-center text-xs uppercase tracking-widest text-gray-800 border-b border-gray-800 pb-1 hover:text-accent hover:border-accent transition-colors">
                Xem chi tiết <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectSlider;
