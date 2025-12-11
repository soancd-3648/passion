import React from 'react';
import { MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { contactInfo } = useData();

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Nội thất Passion</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>Office & Showroom: {contactInfo.address}</li>
            <li>Thời gian mở cửa: 8h30 - 18h00 kể cả Thứ 7 và Chủ nhật</li>
            <li>Hotline: {contactInfo.hotline}</li>
            <li><a href="#" className="hover:text-accent underline">Chính sách bảo mật thông tin</a></li>
          </ul>
          <button className="mt-6 bg-primary text-white text-xs px-4 py-3 flex items-center hover:bg-accent transition-colors">
            <MapPin size={14} className="mr-2" /> Chỉ đường Google Map
          </button>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Thông tin liên hệ</h3>
          <div className="flex space-x-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent cursor-pointer transition-colors"><Facebook size={14} /></div>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent cursor-pointer transition-colors"><Instagram size={14} /></div>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent cursor-pointer transition-colors"><Youtube size={14} /></div>
          </div>
          <p className="mt-4 text-sm text-gray-500">Email: {contactInfo.email}</p>
        </div>

        <div>
           <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Hỗ trợ khách hàng</h3>
           <div className="border border-gray-300 px-4 py-2 text-center text-xs mb-4">DMCA PROTECTED</div>
           <div className="text-blue-500 text-xs flex items-center"><span className="border border-blue-500 rounded-full p-0.5 mr-1">✓</span> ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Đặt lịch tư vấn</h3>
          <p className="text-sm text-gray-600 mb-4">Đặt lịch hẹn trực tiếp tại showroom để được các KTS PASSION tư vấn.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Tên của quý khách *" className="w-full border-b border-gray-300 py-2 text-sm focus:border-accent outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Số điện thoại *" className="w-full border-b border-gray-300 py-2 text-sm focus:border-accent outline-none" />
              <input type="text" placeholder="Thời gian" className="w-full border-b border-gray-300 py-2 text-sm focus:border-accent outline-none" />
            </div>
            <button className="w-full bg-transparent border border-primary text-primary text-xs uppercase tracking-widest py-3 hover:bg-primary hover:text-white transition-colors mt-2">
              Đặt Lịch
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
        © 2024 PASSION INTERIORS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};
export default Footer;
