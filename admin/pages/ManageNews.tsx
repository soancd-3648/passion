
import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useData, NewsItem } from '../../context/DataContext';
import { Table, Th, Td, ActionButton, Header } from '../components/AdminShared';
import { EditorForm, FormField } from '../components/EditorForm';

const ManageNews: React.FC = () => {
    const { news, addNews, updateNews, deleteNews } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<NewsItem>>({});

    const fields: FormField<NewsItem>[] = [
        { name: 'title', placeholder: 'Tiêu đề tin tức' },
        { name: 'date', placeholder: 'Ngày đăng', type: 'date' },
        { name: 'img', placeholder: 'Ảnh thumbnail', type: 'image', colSpan: 2 },
        { name: 'summary', placeholder: 'Tóm tắt nội dung tin tức', type: 'textarea', colSpan: 2 },
    ];

    const handleOpenForm = (item: NewsItem | null = null) => {
        if (item) {
            setEditingId(item.id);
            // Format date for the input[type=date]
            const formattedData = { ...item, date: item.date ? new Date(item.date).toISOString().split('T')[0] : '' };
            setFormData(formattedData);
        } else {
            setEditingId(null);
            // Initialize with an empty img field for the uploader
            setFormData({ title: '', date: new Date().toISOString().split('T')[0], summary: '', img: '' });
        }
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({});
    };

    const handleSave = async () => {
        if (!formData.title || !formData.date) {
            return alert("Vui lòng nhập Tiêu đề và Ngày đăng.");
        }
        try {
            if (editingId) {
                await updateNews(editingId, formData);
            } else {
                await addNews(formData as Omit<NewsItem, 'id'>);
            }
            handleCancel();
        } catch (error) {
             console.error("Failed to save news item:", error);
             alert("Đã có lỗi xảy ra! Không thể lưu tin tức.");
        }
    };

    return (
        <div>
            <Header title="Quản lý Tin tức" btnText="Thêm Tin mới" onBtnClick={() => handleOpenForm()} />
            
            <EditorForm<NewsItem>
                isOpen={isFormOpen}
                isEditing={!!editingId}
                formData={formData}
                onFormChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
                fields={fields}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            <Table>
                <thead>
                    <tr>
                        <Th>Tiêu đề</Th>
                        <Th>Ngày đăng</Th>
                        <Th className="text-right">Hành động</Th>
                    </tr>
                </thead>
                <tbody>
                    {news.map(item => (
                        <tr key={item.id}>
                            <Td className="font-semibold">{item.title}</Td>
                            <Td>{item.date ? new Date(item.date).toLocaleDateString('vi-VN') : 'N/A'}</Td>
                            <Td>
                                <div className="flex space-x-2 justify-end">
                                    <ActionButton icon={Edit2} color="text-blue-600" onClick={() => handleOpenForm(item)} />
                                    <ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Bạn có chắc chắn muốn xóa tin này?') && deleteNews(item.id)} />
                                </div>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageNews;
