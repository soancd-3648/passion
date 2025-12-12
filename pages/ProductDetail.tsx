
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageAnimation from '../components/PageAnimation';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getItemBySlug } = useData();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const foundItem = getItemBySlug(id);
            if (foundItem) {
                setItem(foundItem);
            } else {
                // Fallback for demo purposes if not found in context (e.g. static links in Home)
                // In a real app, this would be a 404 page or redirect
                setItem({
                    title: id.replace(/-/g, ' ').toUpperCase(),
                    description: "Dữ liệu chi tiết đang được cập nhật...",
                    img: "https://picsum.photos/1920/1080"
                });
            }
        }
    }, [id, getItemBySlug]);

    if (!item) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const title = item.title || item.name;
    const image = item.img;
    const description = item.description || "Một tuyệt tác kiến trúc mang đậm dấu ấn cá nhân, nơi sự sang trọng hòa quyện cùng công năng tối ưu.";

    return (
        <div className="bg-white pt-32 pb-20">
             {/* Title */}
             <div className="container mx-auto px-6 text-center mb-16">
                <PageAnimation>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest">{title}</h1>
                </PageAnimation>
             </div>

             {/* Intro Section */}
             <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                <PageAnimation>
                    <div className="aspect-[3/4] overflow-hidden">
                        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                    </div>
                </PageAnimation>
                <PageAnimation delay={0.2}>
                    <h2 className="font-serif text-3xl mb-8 leading-snug">Vẻ đẹp kiến trúc trong thiết kế</h2>
                    <div className="space-y-6 text-gray-500 text-sm leading-loose text-justify font-light">
                        <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-2">
                            {description}
                        </p>
                        <p>
                            Từ ngàn đời nay, kiến trúc không chỉ là nơi trú ẩn mà còn là tuyên ngôn về phong cách sống. Tại {title}, chúng tôi gửi gắm sự kết tinh hoàn hảo giữa vẻ đẹp cổ điển và công nghệ hiện đại. Mỗi đường nét, mỗi góc cạnh đều được chăm chút tỉ mỉ bởi những nghệ nhân hàng đầu, mang đến một không gian sống không chỉ tiện nghi mà còn tràn đầy cảm hứng nghệ thuật.
                        </p>
                        <p>
                             Sự phối hợp khéo léo giữa ánh sáng tự nhiên và chất liệu cao cấp tạo nên chiều sâu cho không gian. Đây không chỉ là một ngôi nhà, mà là một tác phẩm nghệ thuật sống động, nơi gia chủ tìm thấy sự bình yên và thăng hoa trong từng khoảnh khắc.
                        </p>
                    </div>
                </PageAnimation>
             </div>

             {/* Full Width Image 1 */}
             <div className="mb-8">
                <PageAnimation>
                     <img src={`https://picsum.photos/seed/${title}1/1920/1000`} className="w-full h-[60vh] md:h-[80vh] object-cover" alt="Wide View" />
                </PageAnimation>
             </div>

             {/* Split Images */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 px-4">
                 <PageAnimation>
                    <img src={`https://picsum.photos/seed/${title}2/800/1000`} className="w-full h-[400px] md:h-[600px] object-cover" alt="Detail 1" />
                 </PageAnimation>
                 <PageAnimation delay={0.2}>
                    <img src={`https://picsum.photos/seed/${title}3/800/1000`} className="w-full h-[400px] md:h-[600px] object-cover" alt="Detail 2" />
                 </PageAnimation>
             </div>

             {/* Feature Image (Decor) */}
             <div className="mb-4 px-4">
                 <PageAnimation>
                    <img src={`https://picsum.photos/seed/${title}4/1920/1200`} className="w-full h-[60vh] md:h-[80vh] object-cover" alt="Decor" />
                 </PageAnimation>
             </div>

             {/* Architectural Detail (Pillar/Carving) */}
             <div className="mb-32 px-4">
                 <PageAnimation>
                    <div className="flex justify-center bg-gray-50 py-20">
                        <img src={`https://picsum.photos/seed/${title}5/800/1000`} className="max-h-[600px] md:max-h-[800px] object-contain shadow-xl" alt="Architectural Detail" />
                    </div>
                 </PageAnimation>
             </div>

             {/* Functional Grid (Drawers etc) */}
             <div className="container mx-auto px-4 mb-32">
                 <div className="text-center mb-12">
                     <h3 className="font-serif text-2xl text-primary">Chi tiết tinh xảo</h3>
                     <div className="w-12 h-1 bg-accent mx-auto mt-4"></div>
                 </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <PageAnimation><img src={`https://picsum.photos/seed/${title}6/800/600`} className="w-full h-[300px] md:h-[400px] object-cover" alt="Detail 1"/></PageAnimation>
                     <PageAnimation delay={0.1}><img src={`https://picsum.photos/seed/${title}7/800/600`} className="w-full h-[300px] md:h-[400px] object-cover" alt="Detail 2"/></PageAnimation>
                </div>
             </div>

             {/* Other Collections */}
             <div className="bg-[#262626] py-20">
                <div className="container mx-auto px-6">
                    <h3 className="text-white font-serif text-2xl text-center mb-12 uppercase tracking-widest border-b border-gray-700 pb-8 inline-block w-full">Khám phá thêm</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "GRANDIQUE", img: "https://picsum.photos/id/1080/600/400" },
                            { name: "NEO FIT", img: "https://picsum.photos/id/1081/600/400" },
                            { name: "LOTUS", img: "https://picsum.photos/id/1082/600/400" }
                        ].map((other, idx) => (
                             <Link to={`/detail/${other.name.toLowerCase()}`} key={idx} className="group block text-center cursor-pointer">
                                <div className="aspect-[4/3] overflow-hidden mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                    <img src={other.img} alt={other.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <span className="text-white text-xs uppercase tracking-[0.2em] group-hover:text-accent transition-colors">{other.name}</span>
                             </Link>
                        ))}
                    </div>
                </div>
             </div>
        </div>
    );
};

export default ProductDetail;
