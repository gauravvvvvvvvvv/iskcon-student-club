'use client';

import { Section } from '../layout/Section';

export function LocationSection() {
    return (
        <Section id="location" className="bg-white dark:bg-gray-950">
            <div className="section-container py-24">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-4">
                        Visit Us
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Find Your Way
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Located in the heart of Delhi University, just opposite Hansraj College.
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Decorative gradient border */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />

                    <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5466743621614!2d77.20813749999999!3d28.678913099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf53b2058b5%3A0x90ba420109930cec!2sISKCON%20student%20centre%20(%20DU%20BACE)!5e1!3m2!1sen!2sin!4v1754807751377!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="ISKCON Student Center Location"
                            className="w-full grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>

                {/* Address Card */}
                <div className="mt-8 flex flex-wrap justify-center gap-6">
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 rounded-2xl px-6 py-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                                26 Prem Niwas, First Floor, Opp. Hansraj College
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 rounded-2xl px-6 py-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                            <a href="tel:+918318342494" className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                +91 83183 42494
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
