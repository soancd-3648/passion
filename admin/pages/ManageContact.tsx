
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useData, ContactInfo } from '../../context/DataContext';
import { Header } from '../components/AdminShared';

const ManageContact: React.FC = () => {
    const { contactInfo, updateContact, isLoaded } = useData();
    const [data, setData] = useState<ContactInfo>(contactInfo);

    // Sync local state when data is loaded from context
    useEffect(() => {
        if (isLoaded) {
            setData(contactInfo);
        }
    }, [contactInfo, isLoaded]);

    const handleSave = async () => {
        try {
            await updateContact(data);
            alert("Đã cập nhật thông tin liên hệ!");
        } catch (error) {
            console.error("Failed to update Contact page:", error);
            alert("Đã có lỗi xảy ra! Không thể cập nhật.");
        }
    };

    if (!isLoaded) {
        return <div className="p-8">Đang tải...</div>;
    }

    return (
        <div className="max-w-4xl">
             <Header title="Quản lý trang: Thông tin liên hệ" />
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Address */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ Showroom</label>
                    <input 
                        type="text" 
                        className="w-full border p-3 rounded focus:border-accent outline-none" 
                        value={data.address}
                        onChange={e => setData({...data, address: e.target.value})} 
                    />
                </div>

                {/* Hotline */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hotline</label>
                    <input 
                        type="text" 
                        className="w-full border p-3 rounded focus:border-accent outline-none" 
                        value={data.hotline}
                        onChange={e => setData({...data, hotline: e.target.value})} 
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input 
                        type="email" 
                        className="w-full border p-3 rounded focus:border-accent outline-none" 
                        value={data.email}
                        onChange={e => setData({...data, email: e.target.value})} 
                    />
                </div>

                {/* Map Image URL */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh bản đồ (URL)</label>
                    <input 
                        type="text" 
                        className="w-full border p-3 rounded focus:border-accent outline-none mb-2" 
                        value={data.map_img}
                        onChange={e => setData({...data, map_img: e.target.value})} 
                    />
                    <div className="w-full h-32 bg-gray-100 rounded overflow-hidden">
                        {data.map_img && <img src={data.map_img} className="w-full h-full object-cover" alt="Map Preview"/>}
                    </div>
                </div>

                {/* Save Button */}
                <div className="md:col-span-2 flex justify-end pt-4">
                    <button 
                        onClick={handleSave} 
                        className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent transition-colors flex items-center shadow-sm hover:shadow-md"
                    >
                        <Save size={18} className="mr-2"/> 
                        Lưu thay đổi
                    </button>
                </div>
             </div>
        </div>
    );
};

export default ManageContact;
