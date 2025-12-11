
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, AboutInfo, ContactInfo, VideoItem } from '../services/api';

// --- Model Definitions ---
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

// --- Context Type Definition ---
interface DataContextType {
  projects: Project[];
  menuItems: MenuItem[];
  collections: Collection[];
  news: NewsItem[];
  videos: VideoItem[];
  aboutData: AboutInfo;
  contactInfo: ContactInfo;
  isLoaded: boolean;

  // CRUD Operations
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: number, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  
  addCollection: (collection: Omit<Collection, 'id'>) => Promise<void>;
  updateCollection: (id: number, collection: Partial<Collection>) => Promise<void>;
  deleteCollection: (id: number) => Promise<void>;
  
  addNews: (newsItem: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (id: number, newsItem: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: number) => Promise<void>;

  addVideo: (video: Omit<VideoItem, 'id'>) => Promise<void>;
  updateVideo: (id: number, video: Partial<VideoItem>) => Promise<void>;
  deleteVideo: (id: number) => Promise<void>;
  
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: number, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: number) => Promise<void>;

  updateAbout: (data: AboutInfo) => Promise<void>;
  updateContact: (data: ContactInfo) => Promise<void>;

  // Utility
  getItemBySlug: (slug: string) => Project | Collection | undefined;
}

// --- Initial State ---
const InitialState = {
    projects: [],
    menuItems: [],
    collections: [],
    news: [],
    videos: [],
    aboutData: { title: '', description: '', img: '' },
    contactInfo: { address: '', hotline: '', email: '', map_img: '' },
    isLoaded: false,
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState(InitialState);

  // --- Data Loading Effect ---
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [
          projects,
          collections,
          news,
          videos,
          menuItems,
          aboutData,
          contactInfo
        ] = await Promise.all([
          api.getProjects(),
          api.getCollections(),
          api.getNews(),
          api.getVideos(),
          api.getMenuItems(),
          api.getAbout(),
          api.getContact()
        ]);

        setState({
          projects,
          collections,
          news,
          videos,
          menuItems,
          aboutData,
          contactInfo,
          isLoaded: true
        });

      } catch (error) {
        console.error("Failed to load data:", error);
        // Handle loading error appropriately
      }
    };

    loadAllData();
  }, []);

  // --- CRUD Implementations ---
  const createCrudOperations = <T extends {id: number}>(type: keyof typeof InitialState) => ({
    add: async (item: Omit<T, 'id'>) => {
        const newItem = await (api as any)[`add${type.charAt(0).toUpperCase() + type.slice(1, -1)}`](item);
        setState(s => ({...s, [type]: [newItem, ...s[type as keyof typeof s] as T[]]}));
    },
    update: async (id: number, item: Partial<T>) => {
        const updatedItem = await (api as any)[`update${type.charAt(0).toUpperCase() + type.slice(1, -1)}`](id, item);
        setState(s => ({...s, [type]: (s[type as keyof typeof s] as T[]).map(x => x.id === id ? {...x, ...updatedItem} : x) }));
    },
    delete: async (id: number) => {
        await (api as any)[`delete${type.charAt(0).toUpperCase() + type.slice(1, -1)}`](id);
        setState(s => ({...s, [type]: (s[type as keyof typeof s] as T[]).filter(x => x.id !== id)}));
    }
  });

  const projectOps = createCrudOperations<Project>('projects');
  const collectionOps = createCrudOperations<Collection>('collections');
  const newsOps = createCrudOperations<NewsItem>('news');
  const videoOps = createCrudOperations<VideoItem>('videos');
  const menuItemOps = createCrudOperations<MenuItem>('menuItems');

  // --- Single Page Updates ---
  const updateAbout = async (data: AboutInfo) => {
      await api.updateAbout(data);
      setState(s => ({ ...s, aboutData: data }));
  };
  const updateContact = async (data: ContactInfo) => {
      await api.updateContact(data);
      setState(s => ({ ...s, contactInfo: data }));
  };
  
  // --- Utility Functions ---
  const getItemBySlug = (slug: string) => {
    const term = slug.replace(/-/g, ' ').toLowerCase();
    return state.projects.find(p => p.title.toLowerCase().includes(term)) || 
           state.collections.find(c => c.name.toLowerCase().includes(term));
  };

  return (
    <DataContext.Provider value={{
      ...state,
      addProject: projectOps.add,
      updateProject: projectOps.update,
      deleteProject: projectOps.delete,
      addCollection: collectionOps.add,
      updateCollection: collectionOps.update,
      deleteCollection: collectionOps.delete,
      addNews: newsOps.add,
      updateNews: newsOps.update,
      deleteNews: newsOps.delete,
      addVideo: videoOps.add,
      updateVideo: videoOps.update,
      deleteVideo: videoOps.delete,
      addMenuItem: menuItemOps.add,
      updateMenuItem: menuItemOps.update,
      deleteMenuItem: menuItemOps.delete,
      updateAbout,
      updateContact,
      getItemBySlug,
    }}>
      {children}
    </DataContext.Provider>
  );
};

// --- Custom Hook ---
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
