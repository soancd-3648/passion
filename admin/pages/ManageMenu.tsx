
import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useData, MenuItem } from '../../context/DataContext';
import { Table, Th, Td, ActionButton, Header } from '../components/AdminShared';

const ManageMenu: React.FC = () => {
    const { menuItems, addMenuItem, deleteMenuItem, updateMenuItem } = useData();
    
    // Sort items by order for consistent display
    const sortedItems = [...menuItems].sort((a, b) => a.order - b.order);
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<MenuItem>>({ label: '', subLabel: '', path: '', order: 0 });

    const handleEdit = (item: MenuItem) => {
        setEditingId(item.id);
        setFormData(item);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({ label: '', subLabel: '', path: '', order: menuItems.length + 1 });
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({ label: '', subLabel: '', path: '', order: 0 });
    }

    const handleSubmit = async () => {
        if (!formData.label || !formData.path) {
            return alert("Vui lòng nhập Tên Menu và Đường dẫn.");
        }
        try {
            if (editingId) {
                await updateMenuItem(editingId, formData);
            } else {
                await addMenuItem(formData as Omit<MenuItem, 'id'>);
            }
            handleCancel();
        } catch(error) {
            console.error("Failed to save menu item:", error);
            alert("Đã có lỗi xảy ra! Không thể lưu menu.");
        }
    };

    return (
        <div>
            <Header title="Quản lý Menu" btnText="Thêm Menu Item" onBtnClick={handleAddNew} />

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 mb-8">
                    <h3 className="font-bold text-lg mb-4">{editingId ? "Sửa Menu Item" : "Thêm Menu Item"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <input type="text" placeholder="Tên (VD: Trang chủ)" className="border p-2 rounded" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} />
                        <input type="text" placeholder="Phụ đề (VD: - Về chúng tôi)" className="border p-2 rounded" value={formData.subLabel} onChange={e => setFormData({...formData, subLabel: e.target.value})} />
                        <input type="text" placeholder="Link (VD: /projects)" className="border p-2 rounded" value={formData.path} onChange={e => setFormData({...formData, path: e.target.value})} />
                        <input type="number" placeholder="Thứ tự" className="border p-2 rounded" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} />
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={handleSubmit} className="bg-accent text-white px-4 py-2 rounded">Lưu</button>
                        <button onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded">Hủy</button>
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
                        <Th className="text-right">Hành động</Th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map(item => (
                        <tr key={item.id}>
                            <Td>{item.order}</Td>
                            <Td><span className="font-semibold">{item.label}</span></Td>
                            <Td>{item.subLabel || '-'}</Td>
                            <Td><code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{item.path}</code></Td>
                            <Td>
                                <div className="flex space-x-2 justify-end">
                                    <ActionButton icon={Edit2} color="text-blue-600" onClick={() => handleEdit(item)} />
                                    <ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Bạn có chắc chắn muốn xóa menu item này?') && deleteMenuItem(item.id)} />
                                </div>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageMenu;
