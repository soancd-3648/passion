import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, AboutInfo, ContactInfo, VideoItem } from '../services/api';

// --- Định nghĩa Model ---
export type { AboutInfo, ContactInfo, VideoItem } from '../services/api';

export interface Project {
  id: number;
  title: string;
  category: string;
  img: string;
  description?: string;
}

export interface MenuItem {
  id: number;
  label: string;
  subLabel?: string;
  path: string;
  order: number;
}

export interface Collection {
    id: number;
    name: string;
    img: string;
    description?: string;
}

export interface NewsItem {
    id: number;
    title: string;
    date: string;
    summary: string;
    img: string;
}

interface DataContextType {
  projects: Project[];
  menuItems: MenuItem[];
  collections: Collection[];
  news: NewsItem[];
  aboutData: AboutInfo;
  contactInfo: ContactInfo;
  videos: VideoItem[];

  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: number) => void;
  
  addCollection: (collection: Omit<Collection, 'id'>) => void;
  deleteCollection: (id: number) => void;
  
  addNews: (newsItem: Omit<NewsItem, 'id'>) => void;
  deleteNews: (id: number) => void;
  
  // Menu CRUD
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: number, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: number) => void;

  updateAbout: (data: AboutInfo) => void;
  updateContact: (data: ContactInfo) => void;

  addVideo: (video: Omit<VideoItem, 'id'>) => void;
  deleteVideo: (id: number) => void;

  resetData: () => void;
  getItemBySlug: (slug: string) => Project | Collection | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Dữ liệu mặc định ---
const INITIAL_ABOUT: AboutInfo = {
    title: "VỀ CHÚNG TÔI",
    description: "PASSION Interiors là đơn vị tiên phong kiến tạo không gian sống đẳng cấp thượng lưu. Chúng tôi không chỉ thiết kế nội thất, chúng tôi dệt nên những câu chuyện về phong cách sống.",
    img: "https://picsum.photos/id/403/1920/1080"
};

const INITIAL_CONTACT: ContactInfo = {
    address: "Số nhà 91, Lý Thường Kiệt, P. Cửa Nam, Hoàn Kiếm, Hà Nội",
    hotline: "0986 038 689",
    email: "info@passion.vn",
    map_img: "https://picsum.photos/id/406/400/200"
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [aboutData, setAboutData] = useState<AboutInfo>(INITIAL_ABOUT);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(INITIAL_CONTACT);
  
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Data
  useEffect(() => {
     // Mock loading logic matching previous implementation structure
     // In real world, use api.getProjects(), api.getAbout() etc. here
     const loadData = async () => {
         const _about = await api.getAbout();
         const _contact = await api.getContact();
         setAboutData(_about);
         setContactInfo(_contact);

         // Restore List Data from LocalStorage (Mock)
         const savedProjects = localStorage.getItem('passion_projects');
         const savedMenu = localStorage.getItem('passion_menu');
         const savedCollections = localStorage.getItem('passion_collections');
         const savedNews = localStorage.getItem('passion_news');
         const savedVideos = localStorage.getItem('passion_videos');

         if (savedProjects) setProjects(JSON.parse(savedProjects));
         else {
             // Default Seed
             setProjects([
                { id: 1, title: "VINHOMES BẰNG LĂNG", category: "Villa", img: "https://picsum.photos/id/122/600/800", description: "Biệt thự ven sông đẳng cấp." },
                { id: 2, title: "BIỆT THỰ HOA PHƯỢNG", category: "Villa", img: "https://picsum.photos/id/188/600/800", description: "Không gian sống xanh mát." },
             ]);
         }

         if (savedMenu) setMenuItems(JSON.parse(savedMenu));
         else {
             setMenuItems([
                { id: 1, label: 'Trang chủ', subLabel: '– Về chúng tôi', path: '/', order: 1 },
                { id: 2, label: 'Bộ sưu tập', path: '/collections', order: 2 },
                { id: 3, label: 'Dự án', path: '/projects', order: 3 },
                { id: 4, label: 'Liên hệ', path: '/contact', order: 6 },
             ]);
         }

         if (savedVideos) setVideos(JSON.parse(savedVideos));
         else {
             setVideos([
                 { id: 1, title: "Showroom Tour 2024", thumbnail: "https://picsum.photos/id/326/1920/1080", video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
             ]);
         }

         if (savedCollections) setCollections(JSON.parse(savedCollections));
         if (savedNews) setNews(JSON.parse(savedNews));

         setIsLoaded(true);
     };
     loadData();
  }, []);

  // Save Data changes
  useEffect(() => {
      if(isLoaded) {
          localStorage.setItem('passion_projects', JSON.stringify(projects));
          localStorage.setItem('passion_menu', JSON.stringify(menuItems));
          localStorage.setItem('passion_collections', JSON.stringify(collections));
          localStorage.setItem('passion_news', JSON.stringify(news));
          localStorage.setItem('passion_videos', JSON.stringify(videos));
          // About and Contact are saved inside their update functions via api.ts usually, 
          // but for consistency in this mock context we sync state only.
      }
  }, [projects, menuItems, collections, news, videos, isLoaded]);

  // --- Actions ---

  const addProject = (project: Omit<Project, 'id'>) => {
    setProjects(prev => [{ ...project, id: Date.now() }, ...prev]);
  };
  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addCollection = (collection: Omit<Collection, 'id'>) => {
    setCollections(prev => [{ ...collection, id: Date.now() }, ...prev]);
  };
  const deleteCollection = (id: number) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  const addNews = (newsItem: Omit<NewsItem, 'id'>) => {
    setNews(prev => [{ ...newsItem, id: Date.now() }, ...prev]);
  };
  const deleteNews = (id: number) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // Menu Actions
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
      setMenuItems(prev => [...prev, { ...item, id: Date.now() }]);
  };
  const updateMenuItem = (id: number, updated: Partial<MenuItem>) => {
      setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };
  const deleteMenuItem = (id: number) => {
      setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  // Video Actions
  const addVideo = (video: Omit<VideoItem, 'id'>) => {
      setVideos(prev => [{ ...video, id: Date.now() }, ...prev]);
  };
  const deleteVideo = (id: number) => {
      setVideos(prev => prev.filter(v => v.id !== id));
  };

  // Single Page Actions
  const updateAbout = async (data: AboutInfo) => {
      await api.updateAbout(data);
      setAboutData(data);
  };
  const updateContact = async (data: ContactInfo) => {
      await api.updateContact(data);
      setContactInfo(data);
  };

  const resetData = () => {
      localStorage.clear();
      window.location.reload();
  };

  const getItemBySlug = (slug: string) => {
      const term = slug.replace(/-/g, ' ').toLowerCase();
      return projects.find(p => p.title.toLowerCase().includes(term)) || 
             collections.find(c => c.name.toLowerCase().includes(term));
  };

  return (
    <DataContext.Provider value={{ 
        projects, menuItems, collections, news, aboutData, contactInfo, videos,
        addProject, deleteProject, 
        addCollection, deleteCollection,
        addNews, deleteNews,
        addMenuItem, updateMenuItem, deleteMenuItem,
        updateAbout, updateContact,
        addVideo, deleteVideo,
        resetData, getItemBySlug 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};
