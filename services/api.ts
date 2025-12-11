import { Project, Collection, NewsItem, MenuItem } from '../context/DataContext';

const USE_REAL_API = false; // Đổi thành true khi bạn chạy backend nodejs
const API_URL = 'http://localhost:5000/api';

// Types mở rộng
export interface AboutInfo {
    title: string;
    description: string;
    img: string;
}

export interface ContactInfo {
    address: string;
    hotline: string;
    email: string;
    map_img: string;
}

export interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
    video_url: string;
}

// --- MOCK DATA ---
let MOCK_ABOUT: AboutInfo = {
    title: "VỀ CHÚNG TÔI",
    description: "PASSION Interiors là đơn vị tiên phong kiến tạo không gian sống đẳng cấp thượng lưu. Chúng tôi không chỉ thiết kế nội thất, chúng tôi dệt nên những câu chuyện về phong cách sống.",
    img: "https://picsum.photos/id/403/1920/1080"
};

let MOCK_CONTACT: ContactInfo = {
    address: "Số nhà 91, Lý Thường Kiệt, P. Cửa Nam, Hoàn Kiếm, Hà Nội",
    hotline: "0986 038 689",
    email: "info@passion.vn",
    map_img: "https://picsum.photos/id/406/400/200"
};

// --- API SERVICE ---
export const api = {
    // ABOUT
    getAbout: async (): Promise<AboutInfo> => {
        if (USE_REAL_API) {
            const res = await fetch(`${API_URL}/about`);
            return res.json();
        }
        const saved = localStorage.getItem('passion_about');
        return saved ? JSON.parse(saved) : MOCK_ABOUT;
    },
    updateAbout: async (data: AboutInfo): Promise<AboutInfo> => {
        if (USE_REAL_API) {
             const res = await fetch(`${API_URL}/about`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return res.json();
        }
        MOCK_ABOUT = data;
        localStorage.setItem('passion_about', JSON.stringify(data));
        return data;
    },

    // CONTACT
    getContact: async (): Promise<ContactInfo> => {
        if (USE_REAL_API) {
            const res = await fetch(`${API_URL}/contact`);
            return res.json();
        }
        const saved = localStorage.getItem('passion_contact');
        return saved ? JSON.parse(saved) : MOCK_CONTACT;
    },
    updateContact: async (data: ContactInfo): Promise<ContactInfo> => {
        if (USE_REAL_API) {
             const res = await fetch(`${API_URL}/contact`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return res.json();
        }
        MOCK_CONTACT = data;
        localStorage.setItem('passion_contact', JSON.stringify(data));
        return data;
    }
};
