
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useData, AboutInfo } from '../../context/DataContext';
import { Header } from '../components/AdminShared';

const ManageAbout: React.FC = () => {
    const { aboutData, updateAbout, isLoaded } = useData();
    const [data, setData] = useState<AboutInfo>(aboutData);
    
    // Sync local state when data is loaded from context
    useEffect(() => {
        if(isLoaded) {
            setData(aboutData);
        }
    }, [aboutData, isLoaded]);

    const handleSave = async () => {
        try {
            await updateAbout(data);
            alert("Đã cập nhật nội dung trang Giới thiệu!");
        } catch (error) {
            console.error("Failed to update About page:", error);
            alert("Đã có lỗi xảy ra! Không thể cập nhật.");
        }
    };
    
    if (!isLoaded) {
        return <div className="p-8">Đang tải...</div>;
    }

    return (
        <div className="max-w-4xl">
            <Header title="Quản lý trang: Giới thiệu" />
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                {/* Title Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề chính</label>
                    <input 
                        type="text" 
                        className="w-full border p-3 rounded focus:border-accent outline-none"
                        value={data.title}
                        onChange={e => setData({...data, title: e.target.value})} 
                    />
                </div>

                {/* Image URL Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hình ảnh đại diện (URL)</label>
                    <div className="flex items-center gap-4">
                        <input 
                            type="text" 
                            className="flex-grow border p-3 rounded focus:border-accent outline-none"
                            value={data.img}
                            onChange={e => setData({...data, img: e.target.value})} 
                        />
                        <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            {data.img && <img src={data.img} className="w-full h-full object-cover" alt="Preview"/>}
                        </div>
                    </div>
                </div>

                {/* Description Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung mô tả</label>
                    <textarea 
                        rows={8}
                        className="w-full border p-3 rounded focus:border-accent outline-none"
                        value={data.description}
                        onChange={e => setData({...data, description: e.target.value})} 
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
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

export default ManageAbout;
