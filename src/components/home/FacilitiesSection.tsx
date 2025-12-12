'use client';

import { Section } from '../layout/Section';

const facilities = [
    {
        name: 'Meditation Hall',
        description: 'A serene space designed for quiet contemplation and group meditation sessions.',
        image: '🏛️',
        features: ['Air Conditioned', 'Capacity: 50+', 'Sound System'],
    },
    {
        name: 'Library',
        description: 'Extensive collection of spiritual literature, scriptures, and study materials.',
        image: '📚',
        features: ['1000+ Books', 'Study Area', 'Digital Access'],
    },
    {
        name: 'Prasadam Kitchen',
        description: 'Modern kitchen where sanctified vegetarian meals are lovingly prepared daily.',
        image: '🍲',
        features: ['Pure Vegetarian', 'Daily Meals', 'Festival Feasts'],
    },
    {
        name: 'Accommodation',
        description: 'Comfortable living spaces for students seeking immersive spiritual experience.',
        image: '🏠',
        features: ['Clean Rooms', 'Attached Bath', 'Wi-Fi'],
    },
];

export function FacilitiesSection() {
    return (
        <Section id="facilities" className="bg-gray-50 dark:bg-gray-900">
            <div className="section-container py-24">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-4">
                        Our Space
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        World-Class Facilities
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Everything you need for your spiritual journey, right in the heart of Delhi University.
                    </p>
                </div>

                {/* Facilities Grid - Bento Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilities.map((facility, idx) => (
                        <div
                            key={idx}
                            className={`
                group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700
                hover:shadow-2xl transition-all duration-500
                ${idx === 0 ? 'md:row-span-2' : ''}
              `}
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className={`relative p-8 ${idx === 0 ? 'h-full flex flex-col' : ''}`}>
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                    {facility.image}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    {facility.name}
                                </h3>
                                <p className={`text-gray-600 dark:text-gray-400 mb-6 ${idx === 0 ? 'flex-1' : ''}`}>
                                    {facility.description}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2">
                                    {facility.features.map((feature, fIdx) => (
                                        <span
                                            key={fIdx}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
