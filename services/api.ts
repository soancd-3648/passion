
import { Project, Collection, NewsItem, MenuItem, AboutInfo, ContactInfo, VideoItem } from '../types';

const USE_REAL_API = true; // Use real backend
const API_URL = 'http://localhost:5000/api';

// Helper for making API requests
const apiRequest = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${API_URL}/${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    if (!res.ok) {
        // Log error or handle it as needed
        const errorText = await res.text();
        console.error(`API Error on ${path}: ${res.statusText}`, errorText);
        throw new Error(errorText);
    }
    return res.json();
};


export const api = {
    // --- PROJECTS ---
    getProjects: (): Promise<Project[]> => apiRequest('projects'),
    addProject: (data: Omit<Project, 'id'>): Promise<Project> => apiRequest('projects', { method: 'POST', body: JSON.stringify(data) }),
    updateProject: (id: number, data: Partial<Project>): Promise<Project> => apiRequest(`projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteProject: (id: number): Promise<{ success: boolean }> => apiRequest(`projects/${id}`, { method: 'DELETE' }),

    // --- COLLECTIONS ---
    getCollections: (): Promise<Collection[]> => apiRequest('collections'),
    addCollection: (data: Omit<Collection, 'id'>): Promise<Collection> => apiRequest('collections', { method: 'POST', body: JSON.stringify(data) }),
    updateCollection: (id: number, data: Partial<Collection>): Promise<Collection> => apiRequest(`collections/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteCollection: (id: number): Promise<{ success: boolean }> => apiRequest(`collections/${id}`, { method: 'DELETE' }),

    // --- NEWS ---
    getNews: (): Promise<NewsItem[]> => apiRequest('news'),
    addNews: (data: Omit<NewsItem, 'id'>): Promise<NewsItem> => apiRequest('news', { method: 'POST', body: JSON.stringify(data) }),
    updateNews: (id: number, data: Partial<NewsItem>): Promise<NewsItem> => apiRequest(`news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteNews: (id: number): Promise<{ success: boolean }> => apiRequest(`news/${id}`, { method: 'DELETE' }),

    // --- VIDEOS ---
    getVideos: (): Promise<VideoItem[]> => apiRequest('videos'),
    addVideo: (data: Omit<VideoItem, 'id'>): Promise<VideoItem> => apiRequest('videos', { method: 'POST', body: JSON.stringify(data) }),
    updateVideo: (id: number, data: Partial<VideoItem>): Promise<VideoItem> => apiRequest(`videos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteVideo: (id: number): Promise<{ success: boolean }> => apiRequest(`videos/${id}`, { method: 'DELETE' }),
    
    // --- MENU ITEMS ---
    getMenuItems: (): Promise<MenuItem[]> => apiRequest('menu'),
    addMenuItem: (data: Omit<MenuItem, 'id'>): Promise<MenuItem> => apiRequest('menu', { method: 'POST', body: JSON.stringify(data) }),
    updateMenuItem: (id: number, data: Partial<MenuItem>): Promise<MenuItem> => apiRequest(`menu/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteMenuItem: (id: number): Promise<{ success: boolean }> => apiRequest(`menu/${id}`, { method: 'DELETE' }),

    // --- SINGLE PAGES (ABOUT, CONTACT) ---
    getAbout: (): Promise<AboutInfo> => apiRequest('about'),
    updateAbout: (data: AboutInfo): Promise<AboutInfo> => apiRequest('about', { method: 'PUT', body: JSON.stringify(data) }),
    
    getContact: (): Promise<ContactInfo> => apiRequest('contact'),
    updateContact: (data: ContactInfo): Promise<ContactInfo> => apiRequest('contact', { method: 'PUT', body: JSON.stringify(data) }),
};
