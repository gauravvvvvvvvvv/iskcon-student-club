'use client';

import { ReactNode } from 'react';

interface FeatureItemProps {
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
}

export function FeatureItem({
    title,
    description,
    icon,
    className = '',
}: FeatureItemProps) {
    return (
        <div
            className={`
        flex items-start gap-4 p-4 rounded-xl
        bg-primary-50/50 dark:bg-primary-900/20
        border-l-4 border-primary-500
        transition-all duration-200
        hover:bg-primary-100/60 dark:hover:bg-primary-900/30
        ${className}
      `}
        >
            {icon && (
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    {icon}
                </div>
            )}
            <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-on-surface dark:text-white mb-1">
                    {title}
                </h4>
                <p className="text-sm text-on-surface-variant dark:text-[#ccc6be]">
                    {description}
                </p>
            </div>
        </div>
    );
}
