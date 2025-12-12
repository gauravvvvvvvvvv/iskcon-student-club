'use client';

import { DynamicCarousel, DynamicAnnouncements } from '../DynamicContent';

export function HeroSection() {
    return (
        <section className="relative">
            {/* Announcement Banner */}
            <DynamicAnnouncements />

            {/* Hero Carousel */}
            <div className="pt-16 sm:pt-20">
                <DynamicCarousel />
            </div>
        </section>
    );
}
