
import React from 'react';
import { NavLink, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, GalleryHorizontal, Newspaper, Clapperboard, Menu, MessageSquare, Info } from 'lucide-react';

// Import individual page components
import Dashboard from './pages/Dashboard';
import ManageProjects from './pages/ManageProjects';
import ManageCollections from './pages/ManageCollections';
import ManageNews from './pages/ManageNews';
import ManageVideos from './pages/ManageVideos';
import ManageMenu from './pages/ManageMenu';
import ManageAbout from './pages/ManageAbout';
import ManageContact from './pages/ManageContact';

const navItems = [
    { path: '/admin/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { path: '/admin/projects', label: 'Dự án', icon: FolderKanban },
    { path: '/admin/collections', label: 'Bộ sưu tập', icon: GalleryHorizontal },
    { path: '/admin/news', label: 'Tin tức', icon: Newspaper },
    { path: '/admin/videos', label: 'Video', icon: Clapperboard },
    { path: '/admin/menu', label: 'Menu', icon: Menu },
    { path: '/admin/about', label: 'Về chúng tôi', icon: Info },
    { path: '/admin/contact', label: 'Liên hệ', icon: MessageSquare },
];

const Sidebar: React.FC = () => (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-serif font-bold text-center border-b border-gray-700">
            <NavLink to="/" className="hover:text-accent transition-colors">Passion Admin</NavLink>
        </div>
        <nav className="flex-grow p-4">
            <ul>
                {navItems.map(({ path, label, icon: Icon }) => (
                    <li key={path}>
                        <NavLink 
                            to={path} 
                            className={({ isActive }) => 
                                `flex items-center px-4 py-3 my-1 rounded-lg transition-all text-sm font-medium ${isActive ? 'bg-accent text-white' : 'hover:bg-gray-700'}`
                            }
                        >
                            <Icon size={18} className="mr-3" />
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
);

export const AdminLayout: React.FC = () => {
    const location = useLocation();

    // Find the current page title based on the path
    const currentPage = navItems.find(item => item.path === location.pathname);
    const pageTitle = currentPage ? `Admin / ${currentPage.label}` : 'Admin';

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<ManageProjects />} />
                    <Route path="collections" element={<ManageCollections />} />
                    <Route path="news" element={<ManageNews />} />
                    <Route path="videos" element={<ManageVideos />} />
                    <Route path="menu" element={<ManageMenu />} />
                    <Route path="about" element={<ManageAbout />} />
                    <Route path="contact" element={<ManageContact />} />
                </Routes>
            </main>
        </div>
    );
};
