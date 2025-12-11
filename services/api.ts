
import { Project, Collection, NewsItem, MenuItem, AboutInfo, ContactInfo, VideoItem } from '../types';

const API_URL = 'http://localhost:5000/api';

// Helper for making API requests
const apiRequest = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/${path}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`API Error on ${path}: ${res.statusText}`, errorText);
        throw new Error(errorText || 'API request failed');
    }
    
    // Handle cases where the response might be empty
    const text = await res.text();
    try {
        return JSON.parse(text) as T;
    } catch (e) {
        return text as unknown as T; // Return text if not valid JSON (e.g., for simple string responses)
    }
};


export const api = {
    // --- AUTH ---
    login: (username: string, password: string): Promise<{ token: string }> => 
        apiRequest('login', { 
            method: 'POST', 
            body: JSON.stringify({ username, password })
        }),

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
