
import React from 'react';
import { useData } from '../../context/DataContext';

const Dashboard: React.FC = () => {
    const { projects, collections, news, videos, isLoaded } = useData();

    if (!isLoaded) {
        return <div className="p-8">Đang tải dữ liệu...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-bold font-serif text-gray-800">Tổng quan</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Tổng Dự án', value: projects.length },
                    { label: 'Bộ sưu tập', value: collections.length },
                    { label: 'Tin tức', value: news.length },
                    { label: 'Video', value: videos.length },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
                        <p className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</p>
                        <p className="text-5xl font-bold text-primary">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
