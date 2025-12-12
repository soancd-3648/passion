
import React from 'react';
import { X, Save, Upload } from 'lucide-react';

// Generic type for form field definitions
export type FormField<T> = {
    name: keyof T;
    placeholder: string;
    type?: 'text' | 'textarea' | 'date' | 'image'; // Add 'image' type
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

    const handleFileChange = (field: keyof T, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onFormChange(field, reader.result as string); // result is a base64 string
            };
            reader.readAsDataURL(file);
        }
    };

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
                    const gridSpanClass = field.colSpan ? `md:col-span-${field.colSpan}` : '';
                    const fieldValue = formData[field.name as keyof T] as string || '';

                    if (field.type === 'textarea') {
                        return (
                            <textarea
                                key={field.name as string}
                                placeholder={field.placeholder}
                                className={`border p-3 rounded w-full focus:border-accent outline-none transition-colors ${gridSpanClass}`}
                                value={fieldValue}
                                onChange={(e) => onFormChange(field.name, e.target.value)}
                                rows={4}
                            />
                        );
                    }

                    if (field.type === 'image') {
                        return (
                            <div key={field.name as string} className={gridSpanClass}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{field.placeholder}</label>
                                <div className="mt-1 flex items-center">
                                    {fieldValue && <img src={fieldValue} alt="Preview" className="h-20 w-20 object-cover rounded-md mr-4 border" />}
                                    <label htmlFor={`file-upload-${field.name as string}`} className="relative cursor-pointer bg-white rounded-md font-medium text-accent hover:text-accent-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent-light border border-dashed border-gray-300 p-4 w-full flex justify-center items-center">
                                        <div className="text-center">
                                             <Upload className="mx-auto h-8 w-8 text-gray-400"/>
                                             <span className="mt-2 block text-sm text-gray-600">Chọn hoặc kéo thả ảnh</span>
                                        </div>
                                        <input id={`file-upload-${field.name as string}`} name={field.name as string} type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(field.name, e)} />
                                    </label>
                                </div>
                            </div>
                        )
                    }

                    return (
                        <input
                            key={field.name as string}
                            placeholder={field.placeholder}
                            className={`border p-3 rounded w-full focus:border-accent outline-none transition-colors ${gridSpanClass}`}
                            value={fieldValue}
                            onChange={(e) => onFormChange(field.name, e.target.value)}
                            type={field.type || 'text'}
                        />
                    );
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
