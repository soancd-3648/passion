import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Save, X, RotateCcw, Play } from 'lucide-react';
import { useData, Project, Collection, NewsItem, MenuItem, AboutInfo, ContactInfo, VideoItem } from '../context/DataContext';
import { Table, Th, Td, ActionButton, Header } from './components/AdminShared';

// --- Pages ---

export const Dashboard: React.FC = () => {
    const { projects, collections, news, videos, resetData } = useData();
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-bold font-serif text-gray-800">Tổng quan</h2>
                 <button onClick={resetData} className="text-xs text-gray-500 hover:text-red-500 flex items-center border border-gray-200 px-3 py-2 rounded-full hover:bg-red-50 transition-colors">
                    <RotateCcw size={12} className="mr-1"/> Khôi phục dữ liệu gốc
                 </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Tổng Dự án', value: projects.length },
                    { label: 'Bộ sưu tập', value: collections.length },
                    { label: 'Tin tức', value: news.length },
                    { label: 'Video', value: videos.length },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                        <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                        <p className="text-4xl font-bold text-primary">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ManageMenu: React.FC = () => {
    const { menuItems, addMenuItem, deleteMenuItem, updateMenuItem } = useData();
    const sortedItems = [...menuItems].sort((a, b) => a.order - b.order);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<MenuItem>>({ label: '', subLabel: '', path: '', order: 0 });

    const handleSubmit = () => {
        if (!formData.label || !formData.path) return alert("Cần nhập Tên và Đường dẫn");
        if (editingId) {
            updateMenuItem(editingId, formData);
        } else {
            addMenuItem(formData as MenuItem);
        }
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({ label: '', subLabel: '', path: '', order: 0 });
    };

    const handleEdit = (item: MenuItem) => {
        setEditingId(item.id);
        setFormData(item);
        setIsFormOpen(true);
    };

    return (
        <div>
            <Header title="Quản lý Menu" btnText="Thêm Menu" onBtnClick={() => {
                setEditingId(null);
                setFormData({ label: '', subLabel: '', path: '', order: sortedItems.length + 1 });
                setIsFormOpen(true);
            }} />

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 mb-8">
                    <h3 className="font-bold text-lg mb-4">{editingId ? "Sửa Menu" : "Thêm Menu"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <input type="text" placeholder="Tên (VD: Trang chủ)" className="border p-2 rounded" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} />
                        <input type="text" placeholder="Phụ đề (VD: - Về chúng tôi)" className="border p-2 rounded" value={formData.subLabel} onChange={e => setFormData({...formData, subLabel: e.target.value})} />
                        <input type="text" placeholder="Link (VD: /projects)" className="border p-2 rounded" value={formData.path} onChange={e => setFormData({...formData, path: e.target.value})} />
                        <input type="number" placeholder="Thứ tự" className="border p-2 rounded" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} />
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={handleSubmit} className="bg-accent text-white px-4 py-2 rounded">Lưu</button>
                        <button onClick={() => setIsFormOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Hủy</button>
                    </div>
                </div>
            )}

            <Table>
                <thead>
                    <tr>
                        <Th>Thứ tự</Th>
                        <Th>Tên Menu</Th>
                        <Th>Phụ đề</Th>
                        <Th>Đường dẫn</Th>
                        <Th>Hành động</Th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map(item => (
                        <tr key={item.id}>
                            <Td>{item.order}</Td>
                            <Td><span className="font-semibold">{item.label}</span></Td>
                            <Td>{item.subLabel || '-'}</Td>
                            <Td><code className="bg-gray-100 px-2 py-1 rounded text-xs">{item.path}</code></Td>
                            <Td>
                                <div className="flex space-x-2">
                                    <ActionButton icon={Edit2} color="text-blue-600" onClick={() => handleEdit(item)} />
                                    <ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Xóa menu này?') && deleteMenuItem(item.id)} />
                                </div>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export const ManageAbout: React.FC = () => {
    const { aboutData, updateAbout } = useData();
    const [data, setData] = useState<AboutInfo>(aboutData);
    
    // Sync state when context loads
    useEffect(() => { setData(aboutData); }, [aboutData]);

    const handleSave = () => {
        updateAbout(data);
        alert("Đã cập nhật nội dung giới thiệu!");
    };

    return (
        <div className="max-w-4xl">
            <Header title="Quản lý: Chúng tôi là ai" />
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề chính</label>
                    <input type="text" className="w-full border p-3 rounded focus:border-accent outline-none" 
                        value={data.title} onChange={e => setData({...data, title: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hình ảnh đại diện (URL)</label>
                    <div className="flex gap-4">
                        <input type="text" className="flex-grow border p-3 rounded focus:border-accent outline-none" 
                            value={data.img} onChange={e => setData({...data, img: e.target.value})} />
                        <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden">
                            <img src={data.img} className="w-full h-full object-cover" alt="Preview"/>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung mô tả</label>
                    <textarea rows={6} className="w-full border p-3 rounded focus:border-accent outline-none" 
                        value={data.description} onChange={e => setData({...data, description: e.target.value})} />
                </div>
                <div className="flex justify-end pt-4">
                    <button onClick={handleSave} className="bg-primary text-white px-8 py-3 rounded hover:bg-accent transition-colors flex items-center">
                        <Save size={18} className="mr-2"/> Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ManageContact: React.FC = () => {
    const { contactInfo, updateContact } = useData();
    const [data, setData] = useState<ContactInfo>(contactInfo);

    useEffect(() => { setData(contactInfo); }, [contactInfo]);

    const handleSave = () => {
        updateContact(data);
        alert("Đã cập nhật thông tin liên hệ!");
    };

    return (
        <div className="max-w-4xl">
             <Header title="Quản lý: Thông tin liên hệ" />
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ Showroom</label>
                    <input type="text" className="w-full border p-3 rounded focus:border-accent outline-none" 
                        value={data.address} onChange={e => setData({...data, address: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hotline</label>
                    <input type="text" className="w-full border p-3 rounded focus:border-accent outline-none" 
                        value={data.hotline} onChange={e => setData({...data, hotline: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full border p-3 rounded focus:border-accent outline-none" 
                        value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ảnh bản đồ (URL)</label>
                    <input type="text" className="w-full border p-3 rounded focus:border-accent outline-none mb-2" 
                        value={data.map_img} onChange={e => setData({...data, map_img: e.target.value})} />
                    <img src={data.map_img} className="w-full h-32 object-cover rounded bg-gray-100" alt="Map"/>
                </div>
                <div className="col-span-2 flex justify-end pt-4">
                    <button onClick={handleSave} className="bg-primary text-white px-8 py-3 rounded hover:bg-accent transition-colors flex items-center">
                        <Save size={18} className="mr-2"/> Lưu thay đổi
                    </button>
                </div>
             </div>
        </div>
    );
};

export const ManageProjects: React.FC = () => {
    const { projects, addProject, deleteProject } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newItem, setNewItem] = useState<Partial<Project>>({ title: '', category: 'Villa', img: 'https://picsum.photos/600/800', description: '' });

    const handleSave = () => {
        if (newItem.title && newItem.category && newItem.img) {
            addProject(newItem as Project);
            setIsFormOpen(false);
            setNewItem({ title: '', category: 'Villa', img: 'https://picsum.photos/600/800', description: '' });
        } else alert("Vui lòng điền đủ thông tin");
    };

    return (
        <div>
            <Header title="Quản lý Dự án" btnText="Thêm Dự án" onBtnClick={() => setIsFormOpen(true)} />
            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 mb-8">
                    <div className="flex justify-between mb-4"><h3 className="font-bold">Thêm mới</h3><button onClick={() => setIsFormOpen(false)}><X size={20}/></button></div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Tên dự án" className="border p-2 rounded" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                        <input type="text" placeholder="Loại (Villa/Apt)" className="border p-2 rounded" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} />
                        <input type="text" placeholder="Ảnh URL" className="border p-2 rounded col-span-2" value={newItem.img} onChange={e => setNewItem({...newItem, img: e.target.value})} />
                        <textarea placeholder="Mô tả" className="border p-2 rounded col-span-2" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
                    </div>
                    <button onClick={handleSave} className="bg-accent text-white px-4 py-2 rounded">Lưu lại</button>
                </div>
            )}
            <Table>
                <thead><tr><Th>Ảnh</Th><Th>Tên</Th><Th>Loại</Th><Th>Hành động</Th></tr></thead>
                <tbody>
                    {projects.map(item => (
                        <tr key={item.id}>
                            <Td><img src={item.img} className="w-12 h-16 object-cover rounded" alt=""/></Td>
                            <Td>{item.title}</Td>
                            <Td>{item.category}</Td>
                            <Td><ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Xóa?') && deleteProject(item.id)}/></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export const ManageCollections: React.FC = () => {
    const { collections, addCollection, deleteCollection } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newItem, setNewItem] = useState<Partial<Collection>>({ name: '', img: 'https://picsum.photos/600/600', description: '' });

    const handleSave = () => {
        if (newItem.name && newItem.img) {
            addCollection(newItem as Collection);
            setIsFormOpen(false);
            setNewItem({ name: '', img: 'https://picsum.photos/600/600', description: '' });
        } else alert("Thiếu thông tin");
    };

    return (
        <div>
            <Header title="Quản lý Bộ sưu tập" btnText="Thêm BST" onBtnClick={() => setIsFormOpen(true)} />
            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 mb-8">
                     <div className="flex justify-between mb-4"><h3 className="font-bold">Thêm mới</h3><button onClick={() => setIsFormOpen(false)}><X size={20}/></button></div>
                    <div className="grid gap-4 mb-4">
                        <input type="text" placeholder="Tên BST" className="border p-2 rounded" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                        <input type="text" placeholder="Ảnh URL" className="border p-2 rounded" value={newItem.img} onChange={e => setNewItem({...newItem, img: e.target.value})} />
                    </div>
                    <button onClick={handleSave} className="bg-accent text-white px-4 py-2 rounded">Lưu lại</button>
                </div>
            )}
            <Table>
                <thead><tr><Th>Ảnh</Th><Th>Tên</Th><Th>Hành động</Th></tr></thead>
                <tbody>
                    {collections.map(item => (
                        <tr key={item.id}>
                            <Td><img src={item.img} className="w-16 h-16 object-cover rounded" alt=""/></Td>
                            <Td>{item.name}</Td>
                            <Td><ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Xóa?') && deleteCollection(item.id)}/></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export const ManageNews: React.FC = () => {
    const { news, addNews, deleteNews } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newItem, setNewItem] = useState<Partial<NewsItem>>({ title: '', date: new Date().toISOString().split('T')[0], summary: '', img: 'https://picsum.photos/400/300' });

    const handleSave = () => {
        if (newItem.title) {
            addNews(newItem as NewsItem);
            setIsFormOpen(false);
            setNewItem({ title: '', date: new Date().toISOString().split('T')[0], summary: '', img: 'https://picsum.photos/400/300' });
        }
    };

    return (
        <div>
            <Header title="Quản lý Tin tức" btnText="Thêm Tin" onBtnClick={() => setIsFormOpen(true)} />
            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 mb-8">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Tiêu đề" className="border p-2 rounded" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                        <input type="date" className="border p-2 rounded" value={newItem.date} onChange={e => setNewItem({...newItem, date: e.target.value})} />
                        <textarea placeholder="Tóm tắt" className="border p-2 rounded col-span-2" value={newItem.summary} onChange={e => setNewItem({...newItem, summary: e.target.value})} />
                    </div>
                    <button onClick={handleSave} className="bg-accent text-white px-4 py-2 rounded">Lưu lại</button>
                </div>
            )}
            <Table>
                <thead><tr><Th>Tiêu đề</Th><Th>Ngày</Th><Th>Hành động</Th></tr></thead>
                <tbody>
                    {news.map(item => (
                        <tr key={item.id}>
                            <Td>{item.title}</Td>
                            <Td>{item.date}</Td>
                            <Td><ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Xóa?') && deleteNews(item.id)}/></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export const ManageVideos: React.FC = () => {
    const { videos, addVideo, deleteVideo } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newItem, setNewItem] = useState<Partial<VideoItem>>({ title: '', thumbnail: 'https://picsum.photos/1920/1080', video_url: '' });

    const handleSave = () => {
        if (newItem.title && newItem.video_url) {
            addVideo(newItem as VideoItem);
            setIsFormOpen(false);
            setNewItem({ title: '', thumbnail: 'https://picsum.photos/1920/1080', video_url: '' });
        } else {
            alert("Vui lòng nhập Tiêu đề và Link Video");
        }
    };

    return (
        <div>
            <Header title="Quản lý Video" btnText="Thêm Video" onBtnClick={() => setIsFormOpen(true)} />
            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 mb-8">
                    <div className="flex justify-between mb-4"><h3 className="font-bold">Thêm mới Video</h3><button onClick={() => setIsFormOpen(false)}><X size={20}/></button></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Tiêu đề Video" className="border p-2 rounded" value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} />
                        <input type="text" placeholder="Link Youtube/Video" className="border p-2 rounded" value={newItem.video_url} onChange={e => setNewItem({...newItem, video_url: e.target.value})} />
                        <input type="text" placeholder="Ảnh Thumbnail URL" className="border p-2 rounded col-span-2" value={newItem.thumbnail} onChange={e => setNewItem({...newItem, thumbnail: e.target.value})} />
                    </div>
                    <button onClick={handleSave} className="bg-accent text-white px-4 py-2 rounded">Lưu lại</button>
                </div>
            )}
            <Table>
                <thead><tr><Th>Thumbnail</Th><Th>Tiêu đề</Th><Th>Link</Th><Th>Hành động</Th></tr></thead>
                <tbody>
                    {videos.map(item => (
                        <tr key={item.id}>
                            <Td>
                                <div className="w-24 h-14 bg-gray-200 rounded overflow-hidden relative group">
                                    <img src={item.thumbnail} className="w-full h-full object-cover" alt="" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Play size={16} className="text-white"/></div>
                                </div>
                            </Td>
                            <Td>{item.title}</Td>
                            <Td><a href={item.video_url} target="_blank" rel="noreferrer" className="text-blue-500 text-xs truncate max-w-[150px] block">{item.video_url}</a></Td>
                            <Td><ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Xóa?') && deleteVideo(item.id)}/></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
