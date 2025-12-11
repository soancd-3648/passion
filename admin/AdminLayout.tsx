import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Menu, Folder, Layers, Newspaper, LogOut, Lock, User, Phone, Video } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth === 'true') {
        setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('isAdminAuthenticated', 'true');
          setIsAuthenticated(true);
          setError('');
      } else {
          setError('Tài khoản hoặc mật khẩu không đúng!');
      }
  };

  const handleLogout = () => {
      localStorage.removeItem('isAdminAuthenticated');
      setIsAuthenticated(false);
      navigate('/');
  };

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Bộ sưu tập", path: "/admin/collections", icon: Layers },
    { label: "Dự án", path: "/admin/projects", icon: Folder },
    { label: "Tin tức", path: "/admin/news", icon: Newspaper },
    { label: "Video", path: "/admin/videos", icon: Video },
    { label: "Chúng tôi là ai", path: "/admin/about", icon: User },
    { label: "Thông tin liên hệ", path: "/admin/contact", icon: Phone },
    { label: "Quản lý Menu", path: "/admin/menu", icon: Menu },
  ];

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
              <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
                  <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full text-white mb-4">
                          <Lock size={32} />
                      </div>
                      <h1 className="text-2xl font-serif font-bold text-gray-800">Đăng nhập Admin</h1>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-6">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tài khoản</label>
                          <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                          <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                      <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-black transition-colors">Đăng nhập</button>
                  </form>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-800">
      <aside className="w-64 bg-white shadow-xl flex flex-col fixed h-full z-20">
        <div className="p-8 border-b border-gray-100 flex items-center justify-center">
            <h1 className="font-serif text-2xl font-bold tracking-widest text-primary">ADMIN</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
        </nav>
        <div className="p-4 border-t border-gray-100">
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg">
                <LogOut size={20} /> <span className="font-medium text-sm">Đăng xuất</span>
            </button>
        </div>
      </aside>
      <main className="flex-grow p-8 overflow-y-auto h-screen ml-64"><Outlet /></main>
    </div>
  );
};
export default AdminLayout;
