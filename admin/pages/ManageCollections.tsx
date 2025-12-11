
import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useData, Collection } from '../../context/DataContext';
import { Table, Th, Td, ActionButton, Header } from '../components/AdminShared';
import { EditorForm, FormField } from '../components/EditorForm';

const ManageCollections: React.FC = () => {
    const { collections, addCollection, updateCollection, deleteCollection } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Collection>>({});

    const fields: FormField<Collection>[] = [
        { name: 'name', placeholder: 'Tên Bộ sưu tập', colSpan: 2 },
        { name: 'img', placeholder: 'Link hình ảnh đại diện', colSpan: 2 },
        { name: 'description', placeholder: 'Mô tả về bộ sưu tập', type: 'textarea', colSpan: 2 },
    ];

    const handleOpenForm = (item: Collection | null = null) => {
        if (item) {
            setEditingId(item.id);
            setFormData(item);
        } else {
            setEditingId(null);
            setFormData({ name: '', img: 'https://picsum.photos/seed/collection/600/600', description: '' });
        }
        setIsFormOpen(true);
    };
    
    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({});
    };

    const handleSave = async () => {
        if (!formData.name || !formData.img) {
            return alert("Vui lòng nhập Tên và Link hình ảnh cho bộ sưu tập.");
        }
        try {
            if (editingId) {
                await updateCollection(editingId, formData);
            } else {
                await addCollection(formData as Omit<Collection, 'id'>);
            }
            handleCancel();
        } catch (error) {
             console.error("Failed to save collection:", error);
             alert("Đã có lỗi xảy ra! Không thể lưu bộ sưu tập.");
        }
    };

    return (
        <div>
            <Header title="Quản lý Bộ sưu tập" btnText="Thêm BST mới" onBtnClick={() => handleOpenForm()} />
            
            <EditorForm<Collection>
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
                        <Th>Ảnh</Th>
                        <Th>Tên Bộ sưu tập</Th>
                        <Th className="text-right">Hành động</Th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map(item => (
                        <tr key={item.id}>
                            <Td><img src={item.img} className="w-16 h-16 object-cover rounded shadow-sm" alt={item.name}/></Td>
                            <Td className="font-semibold">{item.name}</Td>
                            <Td>
                                <div className="flex space-x-2 justify-end">
                                    <ActionButton icon={Edit2} color="text-blue-600" onClick={() => handleOpenForm(item)} />
                                    <ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Bạn có chắc chắn muốn xóa bộ sưu tập này?') && deleteCollection(item.id)}/>
                                </div>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageCollections;
