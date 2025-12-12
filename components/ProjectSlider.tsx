
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProjectSlider: React.FC = () => {
  const { projects } = useData();

  return (
    <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[320px] h-[420px]"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:-translate-y-4">
            <img src={project.img} alt={project.title} className="w-full h-2/3 object-cover" />
            <div className="p-4">
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
