
import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Plus } from 'lucide-react';

/**
 * Reusable Table component with consistent styling.
 */
export const Table: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left text-gray-600">{children}</table>
    </div>
);

/**
 * Reusable Table Header Cell (Th) component.
 */
export const Th: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className = '' }) => (
    <th scope="col" className={`px-6 py-4 font-bold text-gray-800 bg-gray-50 text-xs uppercase tracking-wider ${className}`}>{children}</th>
);

/**
 * Reusable Table Data Cell (Td) component.
 */
export const Td: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className = '' }) => (
    <td className={`px-6 py-4 border-t border-gray-100 align-top ${className}`}>{children}</td>
);

/**
 * Reusable Action Button for tables.
 */
interface ActionButtonProps {
    icon: LucideIcon;
    color?: string;
    onClick: () => void;
}
export const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, color = 'text-gray-500', onClick }) => (
    <button onClick={onClick} className={`${color} hover:opacity-80 p-1 transition-colors`}>
        <Icon size={16} />
    </button>
);

/**
 * Reusable page header component with a title and an optional button.
 */
interface HeaderProps {
    title: string;
    btnText?: string;
    onBtnClick?: () => void;
}
export const Header: React.FC<HeaderProps> = ({ title, btnText, onBtnClick }) => (
    <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold font-serif text-gray-800">{title}</h2>
        {btnText && onBtnClick && (
            <button onClick={onBtnClick} className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-accent transition-all flex items-center shadow-sm hover:shadow-md">
               <Plus size={18} className="mr-2"/> {btnText}
            </button>
        )}
    </div>
);
