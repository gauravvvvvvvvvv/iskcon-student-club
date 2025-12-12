'use client';

import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = true }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`
        bg-white dark:bg-[#211f1c] rounded-2xl p-6
        shadow-elevation-1
        ${hover ? 'hover:shadow-elevation-2 hover:-translate-y-1' : ''}
        transition-all duration-300 ease-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

export function CardElevated({ children, className = '', onClick, hover = true }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`
        bg-surface-container-low dark:bg-[#1d1b18] rounded-2xl p-6
        shadow-elevation-2
        ${hover ? 'hover:shadow-elevation-3 hover:-translate-y-1' : ''}
        transition-all duration-300 ease-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

export function CardOutlined({ children, className = '', onClick, hover = true }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`
        bg-white dark:bg-[#211f1c] rounded-2xl p-6
        border border-outline-variant dark:border-[#4a4640]
        ${hover ? 'hover:shadow-elevation-1 hover:-translate-y-1' : ''}
        transition-all duration-300 ease-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
