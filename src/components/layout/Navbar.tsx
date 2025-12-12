'use client';

import { useState, useEffect, useContext } from 'react';
import { ColorModeContext } from '@/app/theme/AppThemeProvider';

const navLinks = [
    { href: '#programs', label: 'Programs' },
    { href: '#schedule', label: 'Schedule' },
    { href: '#facilities', label: 'Facilities' },
    { href: '#location', label: 'Location' },
    { href: '#contact', label: 'Contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { mode, toggle } = useContext(ColorModeContext);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const offset = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };

    return (
        <>
            <header
                className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-gray-900/5'
                        : 'bg-transparent'
                    }
        `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                                    <span className="text-white font-bold text-xl">ॐ</span>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className={`text-lg font-bold ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'} transition-colors`}>
                                    ISKCON
                                </h1>
                                <p className={`text-xs ${scrolled ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'} transition-colors`}>
                                    Student Center • DU
                                </p>
                            </div>
                        </a>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${scrolled
                                            ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }
                  `}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            {/* Theme toggle */}
                            <button
                                onClick={toggle}
                                className={`
                  p-2.5 rounded-full transition-all
                  ${scrolled
                                        ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                                        : 'hover:bg-white/10 text-white/80'
                                    }
                `}
                                aria-label="Toggle theme"
                            >
                                {mode === 'light' ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )}
                            </button>

                            {/* CTA Button */}
                            <a
                                href="https://docs.google.com/forms/d/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform?"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all"
                            >
                                Join Now
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`
                  lg:hidden p-2.5 rounded-full transition-all
                  ${scrolled
                                        ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
                                        : 'hover:bg-white/10 text-white'
                                    }
                `}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-300
          ${mobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
            >
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div
                    className={`
            absolute right-0 top-0 h-full w-80 max-w-[85vw]
            bg-white dark:bg-gray-900 shadow-2xl
            transition-transform duration-300
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
                >
                    <div className="p-6 pt-24">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="mt-8">
                            <a
                                href="https://docs.google.com/forms/d/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform?"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                            >
                                Join Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
