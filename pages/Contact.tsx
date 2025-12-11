import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, CheckCircle } from 'lucide-react';
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

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { contactInfo } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => { setIsSubmitted(true); }, 1000);
  };

  return (
    <div className="bg-surface-dark text-white min-h-screen pt-20">
      <div className="relative h-[40vh] bg-black overflow-hidden">
        <img src="https://picsum.photos/id/26/1920/600" alt="Contact" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <SectionReveal><h1 className="font-serif text-5xl md:text-6xl text-white">LIÊN HỆ</h1></SectionReveal>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block h-full min-h-[800px]">
           <img src="https://picsum.photos/id/65/900/1200" alt="Consultant" className="absolute inset-0 w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="p-12 md:p-24 bg-surface-dark">
          <SectionReveal>
            <div className="mb-12 text-center lg:text-left">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Đặt lịch hẹn</h2>
              <p className="text-gray-400 font-light text-sm">tham quan phòng trưng bày</p>
              <p className="text-gray-500 text-xs mt-2">Lập kế hoạch chuyến thăm của bạn, chúng tôi sẽ liên lạc ngay khi có thể.</p>
            </div>
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-900/30 border border-green-800 p-8 rounded-xl text-center">
                <div className="flex justify-center mb-4"><CheckCircle size={48} className="text-green-500" /></div>
                <h3 className="text-xl font-bold text-white mb-2">Đăng ký thành công!</h3>
                <p className="text-gray-300 text-sm">Cảm ơn quý khách đã quan tâm. Đội ngũ tư vấn sẽ liên hệ lại trong vòng 24h.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-6 text-xs uppercase tracking-widest text-accent hover:text-white transition-colors">Gửi yêu cầu khác</button>
              </motion.div>
            ) : (
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="group">
                  <input required type="text" placeholder="Tên khách hàng" className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors" />
                </div>
                <div className="group">
                  <div className="flex items-center border-b border-gray-600 focus-within:border-accent transition-colors py-3">
                     <span className="flex items-center text-gray-400 mr-2 text-sm"><img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" className="w-5 h-3 mr-2" alt="VN"/> +84</span>
                     <input required type="tel" placeholder="Số điện thoại" className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"/>
                  </div>
                </div>
                <div className="group"><input type="date" className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:border-accent focus:outline-none transition-colors" /></div>
                <div className="group">
                   <select className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-400 focus:border-accent focus:outline-none focus:text-white transition-colors appearance-none">
                      <option value="" disabled selected>Tôi có nhu cầu</option>
                      <option value="tu-van">Tư vấn thiết kế</option>
                      <option value="thi-cong">Thi công nội thất</option>
                      <option value="tham-quan">Tham quan Showroom</option>
                   </select>
                </div>
                <div className="pt-6 text-right">
                  <button type="submit" className="bg-gray-500/20 hover:bg-accent hover:text-white text-gray-300 px-8 py-3 text-xs uppercase tracking-widest transition-all duration-300">Đặt lịch</button>
                </div>
              </form>
            )}
            <div className="mt-20 border-t border-gray-700 pt-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-serif text-xl mb-4 text-accent">ĐƯỜNG DÂY NÓNG</h4>
                    <div className="flex items-center space-x-2 text-2xl font-light">
                      <Phone size={24} className="text-accent" />
                      <span>{contactInfo.hotline}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-4 text-accent">SHOWROOM HÀ NỘI</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{contactInfo.address}</p>
                    <div className="w-full h-32 bg-gray-700 rounded overflow-hidden relative group cursor-pointer">
                      <img src={contactInfo.map_img} alt="Map" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center"><MapPin className="text-accent" /></div>
                    </div>
                  </div>
               </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
};
export default Contact;
