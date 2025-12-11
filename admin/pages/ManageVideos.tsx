
import React, { useState } from 'react';
import { Edit2, Trash2, Play } from 'lucide-react';
import { useData, VideoItem } from '../../context/DataContext';
import { Table, Th, Td, ActionButton, Header } from '../components/AdminShared';
import { EditorForm, FormField } from '../components/EditorForm';

const ManageVideos: React.FC = () => {
    const { videos, addVideo, updateVideo, deleteVideo } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<VideoItem>>({});

    const fields: FormField<VideoItem>[] = [
        { name: 'title', placeholder: 'Tiêu đề Video' },
        { name: 'video_url', placeholder: 'Link Youtube/Vimeo' },
        { name: 'thumbnail', placeholder: 'Link ảnh Thumbnail', colSpan: 2 },
    ];

    const handleOpenForm = (item: VideoItem | null = null) => {
        if (item) {
            setEditingId(item.id);
            setFormData(item);
        } else {
            setEditingId(null);
            setFormData({ title: '', thumbnail: 'https://picsum.photos/seed/video/1920/1080', video_url: '' });
        }
        setIsFormOpen(true);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormData({});
    };

    const handleSave = async () => {
        if (!formData.title || !formData.video_url) {
            return alert("Vui lòng nhập Tiêu đề và Link Video.");
        }
        try {
            if (editingId) {
                await updateVideo(editingId, formData);
            } else {
                await addVideo(formData as Omit<VideoItem, 'id'>);
            }
            handleCancel();
        } catch (error) {
             console.error("Failed to save video:", error);
             alert("Đã có lỗi xảy ra! Không thể lưu video.");
        }
    };

    return (
        <div>
            <Header title="Quản lý Video" btnText="Thêm Video mới" onBtnClick={() => handleOpenForm()} />
            
            <EditorForm<VideoItem>
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
                        <Th>Thumbnail</Th>
                        <Th>Tiêu đề</Th>
                        <Th>Link</Th>
                        <Th className="text-right">Hành động</Th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map(item => (
                        <tr key={item.id}>
                            <Td>
                                <a href={item.video_url} target="_blank" rel="noreferrer" className="block w-24 h-14 bg-gray-200 rounded overflow-hidden relative group shadow-sm">
                                    <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.title} />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play size={20} className="text-white"/>
                                    </div>
                                </a>
                            </Td>
                            <Td className="font-semibold">{item.title}</Td>
                            <Td>
                                <a href={item.video_url} target="_blank" rel="noreferrer" className="text-blue-500 text-xs hover:underline truncate max-w-[150px] block">
                                    {item.video_url}
                                </a>
                            </Td>
                            <Td>
                                <div className="flex space-x-2 justify-end">
                                    <ActionButton icon={Edit2} color="text-blue-600" onClick={() => handleOpenForm(item)} />
                                    <ActionButton icon={Trash2} color="text-red-500" onClick={() => window.confirm('Bạn có chắc chắn muốn xóa video này?') && deleteVideo(item.id)} />
                                </div>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManageVideos;
