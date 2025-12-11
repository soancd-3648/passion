
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, GalleryHorizontal, Newspaper, Clapperboard, Menu, MessageSquare, Info } from 'lucide-react';

const navItems = [
    { path: '/admin', label: 'Tổng quan', icon: LayoutDashboard },
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
                            end // Important for the dashboard link to not stay active
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

const AdminLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
               <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
