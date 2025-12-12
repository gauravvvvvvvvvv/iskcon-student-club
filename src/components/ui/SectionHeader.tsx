'use client';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    gradient?: boolean;
    className?: string;
}

export function SectionHeader({
    title,
    subtitle,
    align = 'center',
    gradient = true,
    className = '',
}: SectionHeaderProps) {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <div className={`mb-12 ${alignmentClasses[align]} ${className}`}>
            <h2
                className={`
          text-3xl sm:text-4xl lg:text-5xl font-bold mb-4
          ${gradient
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent'
                        : 'text-on-surface dark:text-white'
                    }
        `}
            >
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-on-surface-variant dark:text-[#ccc6be] max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
