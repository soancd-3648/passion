
import React from 'react';
import { X, Save } from 'lucide-react';

// Generic type for form field definitions
export type FormField<T> = {
    name: keyof T;
    placeholder: string;
    type?: 'text' | 'textarea' | 'date';
    colSpan?: number;
};

// Props for the generic editor form component
interface EditorFormProps<T> {
    isOpen: boolean;
    isEditing: boolean;
    formData: Partial<T>;
    onFormChange: (field: keyof T, value: any) => void;
    fields: FormField<T>[];
    onSave: () => void;
    onCancel: () => void;
}

/**
 * A reusable form component for adding and editing items.
 */
export function EditorForm<T>({ isOpen, isEditing, formData, onFormChange, fields, onSave, onCancel }: EditorFormProps<T>) {
    if (!isOpen) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 mb-8 animate-fade-in-down">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">{isEditing ? "Chỉnh sửa" : "Thêm mới"}</h3>
                <button onClick={onCancel} className="text-gray-500 hover:text-gray-800 transition-colors">
                    <X size={20}/>
                </button>
            </div>

            {/* Dynamic form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {fields.map(field => {
                    const commonProps = {
                        key: field.name as string,
                        placeholder: field.placeholder,
                        className: `border p-3 rounded w-full focus:border-accent outline-none transition-colors ${field.colSpan ? `md:col-span-${field.colSpan}` : ''}`,
                        value: formData[field.name as keyof T] as string || '',
                        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onFormChange(field.name, e.target.value),
                    };

                    if (field.type === 'textarea') {
                        return <textarea {...commonProps} rows={4} />;
                    }
                    return <input {...commonProps} type={field.type || 'text'} />;
                })}
            </div>

            {/* Save Button */}
            <button 
                onClick={onSave} 
                className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center shadow-sm hover:shadow-md"
            >
                <Save size={16} className="mr-2"/> 
                Lưu lại
            </button>
        </div>
    );
}
