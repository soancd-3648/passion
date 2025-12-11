import React from 'react';
import { Plus } from 'lucide-react';

export const Table: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">{children}</table>
    </div>
);

export const Th: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <th className="px-6 py-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">{children}</th>
);

export const Td: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <td className="px-6 py-4 border-t border-gray-50 text-sm text-gray-700">{children}</td>
);

export const ActionButton: React.FC<{ icon: any; color: string; onClick?: () => void }> = ({ icon: Icon, color, onClick }) => (
    <button onClick={onClick} className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${color}`}>
        <Icon size={16} />
    </button>
);

export const Header: React.FC<{ title: string; btnText?: string; onBtnClick?: () => void }> = ({ title, btnText, onBtnClick }) => (
    <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold font-serif text-gray-800">{title}</h2>
        {btnText && (
            <button onClick={onBtnClick} className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors shadow-lg">
                <Plus size={16} /><span>{btnText}</span>
            </button>
        )}
    </div>
);
