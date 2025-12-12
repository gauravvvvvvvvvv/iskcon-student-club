'use client';

import { Section } from '../layout/Section';

const programs = [
    {
        category: 'Daily Practice',
        icon: '🧘',
        items: [
            { name: 'Morning Meditation', time: '5:30 AM' },
            { name: 'Mantra Chanting', time: '6:00 AM' },
            { name: 'Spiritual Discourse', time: '7:00 AM' },
        ]
    },
    {
        category: 'Weekly Events',
        icon: '🎵',
        items: [
            { name: 'Saturday Kirtan', time: '6:00 PM' },
            { name: 'Sunday Feast', time: '6:00 PM' },
            { name: 'Mid-week Study', time: 'Wed 7:00 PM' },
        ]
    },
    {
        category: 'Personal Growth',
        icon: '📚',
        items: [
            { name: 'Gītā Study Circle', time: 'Weekly' },
            { name: 'Personal Mentoring', time: 'By Appointment' },
            { name: 'Leadership Training', time: 'Monthly' },
        ]
    },
];

const offerings = [
    {
        title: 'Vedic Wisdom',
        description: 'Dive deep into timeless scriptures like Bhagavad Gītā and Śrīmad Bhāgavatam with expert guidance.',
        icon: '📖',
        gradient: 'from-indigo-500 to-purple-500',
    },
    {
        title: 'Meditation & Yoga',
        description: 'Experience transformative mantra meditation and yoga practices for inner peace and clarity.',
        icon: '🕉️',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Community',
        description: 'Build meaningful friendships with like-minded seekers on the path of self-discovery.',
        icon: '🤝',
        gradient: 'from-pink-500 to-rose-500',
    },
    {
        title: 'Prasadam',
        description: 'Enjoy delicious sanctified vegetarian meals that nourish body, mind, and soul.',
        icon: '🍲',
        gradient: 'from-amber-500 to-orange-500',
    },
    {
        title: 'Counseling',
        description: 'Receive personalized spiritual guidance to navigate life challenges with wisdom.',
        icon: '💭',
        gradient: 'from-teal-500 to-cyan-500',
    },
    {
        title: 'Cultural Events',
        description: 'Participate in festivals, dramas, debates, and pilgrimages for holistic spiritual growth.',
        icon: '🎭',
        gradient: 'from-blue-500 to-indigo-500',
    },
];

export function ProgramsSection() {
    return (
        <Section id="programs" className="bg-gray-50 dark:bg-gray-900">
            <div className="section-container py-24">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
                        What We Offer
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Transform Your Life
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Comprehensive programs designed to nurture your spiritual growth, build meaningful connections, and unlock your potential.
                    </p>
                </div>

                {/* Offerings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {offerings.map((offering, idx) => (
                        <div
                            key={idx}
                            className="feature-card group"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className={`icon-box bg-gradient-to-br ${offering.gradient} mb-4`}>
                                <span className="text-2xl">{offering.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {offering.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {offering.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Schedule Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                        <h3 className="text-2xl font-bold text-white text-center">Weekly Program Schedule</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                        {programs.map((program, idx) => (
                            <div key={idx} className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{program.icon}</span>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{program.category}</h4>
                                </div>
                                <ul className="space-y-3">
                                    {program.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                                            <span className="text-gray-500 dark:text-gray-500 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                                {item.time}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
