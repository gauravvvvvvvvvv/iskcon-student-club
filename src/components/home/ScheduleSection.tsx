'use client';

import { Section } from '../layout/Section';

const dailySchedule = [
    { time: '5:30 AM', activity: 'Morning Meditation', description: 'Start your day with peaceful mantra meditation' },
    { time: '6:30 AM', activity: 'Mangala Aarti', description: 'Traditional morning worship ceremony' },
    { time: '7:00 AM', activity: 'Spiritual Discourse', description: 'Learn from ancient wisdom texts' },
];

const weeklyPrograms = [
    { day: 'Saturday', time: '6:00 - 8:00 PM', program: 'Weekend Kirtan & Discourse' },
    { day: 'Sunday', time: '6:00 - 8:00 PM', program: 'Sunday Love Feast' },
];

export function ScheduleSection() {
    return (
        <Section id="schedule" className="bg-white dark:bg-gray-950 overflow-hidden">
            <div className="section-container py-24">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-4">
                        Daily & Weekly
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Join Our Programs
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Integrate spiritual practices into your daily routine with our structured programs.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Daily Schedule */}
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                            Daily Schedule
                        </h3>
                        <div className="space-y-6 pl-8">
                            {dailySchedule.map((item, idx) => (
                                <div key={idx} className="relative flex gap-6">
                                    {/* Timeline dot */}
                                    <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-white dark:bg-gray-950 border-4 border-indigo-500" />

                                    {/* Time */}
                                    <div className="shrink-0 w-20">
                                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{item.time}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pb-6">
                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.activity}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weekly Special */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </span>
                            Weekend Programs
                        </h3>
                        <div className="space-y-4">
                            {weeklyPrograms.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-2xl font-bold gradient-text">{item.day}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">
                                            {item.time}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">{item.program}</p>
                                </div>
                            ))}
                        </div>

                        {/* Note */}
                        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500 italic text-center">
                            * Schedule subject to change on festival days
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
