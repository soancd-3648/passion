
import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useData, Project } from '../../context/DataContext';
import { Table, Th, Td, ActionButton, Header } from '../components/AdminShared';
import { EditorForm, FormField } from '../components/EditorForm';

const ManageProjects: React.FC = () => {
    const { projects, addProject, updateProject, deleteProject } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({});
    const [isLoading, setIsLoading] = useState(false);

    // Define form fields for the Project editor
    const fields: FormField<Project>[] = [
        { name: 'title', placeholder: 'Tên dự án' },
        { name: 'category', placeholder: 'Loại (VD: Villa, Apartment)' },
        { name: 'img', placeholder: 'Ảnh đại diện', type: 'image', colSpan: 2 },
        { name: 'description', placeholder: 'Mô tả chi tiết về dự án', type: 'textarea', colSpan: 2 },
    ];

    const handleOpenForm = (item: Project | null = null) => {
        if (item) {
            setEditingId(item.id);
            setFormData(item);
        } else {
            setEditingId(null);
            // Initialize with an empty img field for the uploader
            setFormData({ title: '', category: 'Villa', img: '', description: '' });
        }
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({});
    };

    const handleSave = async () => {
        if (!formData.title || !formData.category) {
            return alert("Vui lòng điền đầy đủ Tên dự án và Phân loại.");
        }
        
        setIsLoading(true);
        try {
            if (editingId) {
                await updateProject(editingId, formData);
            } else {
                await addProject(formData as Omit<Project, 'id'>);
            }
            handleCancel(); // Close form on success
        } catch (error) {
            console.error("Failed to save project:", error);
            alert("Đã có lỗi xảy ra! Không thể lưu dự án.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
            setIsLoading(true);
            try {
                await deleteProject(id);
            } catch (error) {
                console.error("Failed to delete project:", error);
                alert("Đã có lỗi xảy ra! Không thể xóa dự án.");
            } finally {
                setIsLoading(false);
            }
        }
    };
    
    return (
        <div>
            <Header title="Quản lý Dự án" btnText="Thêm Dự án mới" onBtnClick={() => handleOpenForm()} />
            
            <EditorForm<Project>
                isOpen={isFormOpen}
                isEditing={!!editingId}
                formData={formData}
                onFormChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
                fields={fields}
                onSave={handleSave}
                onCancel={handleCancel}
                isLoading={isLoading}
            />

            <Table>
                <thead>
                    <tr>
                        <Th>Ảnh</Th>
                        <Th>Tên Dự án</Th>
                        <Th>Phân loại</Th>
                        <Th className="text-right">Hành động</Th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(item => (
                        <tr key={item.id}>
                            <Td><img src={item.img} className="w-12 h-16 object-cover rounded shadow-sm" alt={item.title}/></Td>
                            <Td className="font-semibold">{item.title}</Td>
                            <Td>{item.category}</Td>
                            <Td>
                                <div className="flex space-x-2 justify-end">
                                    <ActionButton icon={Edit2} color="text-blue-600" onClick={() => handleOpenForm(item)} disabled={isLoading} />
                                    <ActionButton icon={Trash2} color="text-red-500" onClick={() => handleDelete(item.id)} disabled={isLoading} />
                                </div>
                            </Td>
                        </tr>
                    ))}\
                </tbody>
            </Table>
        </div>
    );
};

export default ManageProjects;
