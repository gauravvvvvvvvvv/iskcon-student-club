'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'filled' | 'tonal' | 'outlined' | 'text';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
};

const variantStyles = {
    filled: `
    bg-primary-600 text-white
    hover:bg-primary-700 hover:shadow-elevation-2
    active:bg-primary-800
    focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
  `,
    tonal: `
    bg-primary-100 text-primary-700
    dark:bg-primary-900/30 dark:text-primary-300
    hover:bg-primary-200 dark:hover:bg-primary-900/50
    active:bg-primary-300
    focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
  `,
    outlined: `
    bg-transparent border-2 border-primary-600 text-primary-600
    dark:border-primary-400 dark:text-primary-400
    hover:bg-primary-50 dark:hover:bg-primary-900/20
    active:bg-primary-100
    focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
  `,
    text: `
    bg-transparent text-primary-600 dark:text-primary-400
    hover:bg-primary-50 dark:hover:bg-primary-900/20
    active:bg-primary-100
    focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
  `,
};

export function Button({
    children,
    variant = 'filled',
    size = 'md',
    fullWidth = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`
        inline-flex items-center justify-center gap-2
        rounded-full font-semibold
        transition-all duration-200 ease-out
        focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            disabled={disabled}
            {...props}
        >
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </button>
    );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'filled' | 'tonal' | 'outlined' | 'text';
    size?: 'sm' | 'md' | 'lg';
    label: string;
}

const iconSizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
};

export function IconButton({
    children,
    variant = 'text',
    size = 'md',
    label,
    className = '',
    disabled,
    ...props
}: IconButtonProps) {
    return (
        <button
            aria-label={label}
            className={`
        inline-flex items-center justify-center
        rounded-full
        transition-all duration-200 ease-out
        focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${iconSizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
