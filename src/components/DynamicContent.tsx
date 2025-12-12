'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchCarouselImages, fetchAnnouncements, type CarouselImage, type Announcement } from '../lib/cms';

declare global {
  interface Window {
    __ISKCON_SHOW_FALLBACK_IMAGE__?: boolean;
    __ISKCON_SHOW_FALLBACK_ANNOUNCEMENT__?: boolean;
  }
}

const FALLBACK_IMAGE = '/jagannath.jpg';

// Statistics to display
const stats = [
  { value: '500+', label: 'Active Students' },
  { value: '15+', label: 'Weekly Programs' },
  { value: '10+', label: 'Years Legacy' },
];

export function DynamicCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isFallbackImageEnabled = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('iskcon-show-fallback-image');
    return stored === 'true' || window.__ISKCON_SHOW_FALLBACK_IMAGE__ === true;
  }, []);

  useEffect(() => {
    const handleStorageChange = () => setUseFallback(isFallbackImageEnabled());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isFallbackImageEnabled]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchCarouselImages();
        if (fetchedImages.length > 0) {
          setImages(fetchedImages);
        } else {
          setUseFallback(true);
        }
      } catch {
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
    setUseFallback(isFallbackImageEnabled());
  }, [isFallbackImageEnabled]);

  useEffect(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images.length]);

  const displayImages = useFallback || images.length === 0
    ? [{ id: 'fallback', url: FALLBACK_IMAGE, filename: 'fallback', uploadedAt: '' }]
    : images;

  if (loading) {
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax Effect */}
      {displayImages.map((image, index) => (
        <div
          key={image.id}
          className={`
            absolute inset-0 transition-all duration-1000 ease-out
            ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
          `}
        >
          <img
            src={image.url}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient Overlay - New dark gradient with mesh pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/90" />
      <div className="absolute inset-0 mesh-gradient opacity-60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/90">Now accepting new members</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 fade-in-up delay-100 text-balance">
            Discover Your
            <span className="block gradient-text">Spiritual Journey</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 fade-in-up delay-200">
            Join Delhi University&apos;s vibrant community of seekers. Experience ancient wisdom,
            build meaningful friendships, and transform your life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in-up delay-300">
            <a
              href="https://docs.google.com/forms/d/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform?"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              Start Your Journey
              <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#programs" className="btn-secondary">
              Explore Programs
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto fade-in-up delay-400">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in delay-500">
          <a href="#programs" className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Image indicators */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setCurrentIndex(index);
              }}
              className={`
                h-1 rounded-full transition-all duration-300
                ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// Announcements Bar
export function DynamicAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  const isFallbackEnabled = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('iskcon-show-fallback-announcement');
    return stored === 'true' || window.__ISKCON_SHOW_FALLBACK_ANNOUNCEMENT__ === true;
  }, []);

  useEffect(() => {
    const handle = () => setUseFallback(isFallbackEnabled());
    window.addEventListener('storage', handle);
    return () => window.removeEventListener('storage', handle);
  }, [isFallbackEnabled]);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchAnnouncements();
        if (fetched.length > 0) setAnnouncements(fetched);
        else setUseFallback(true);
      } catch {
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };
    load();
    setUseFallback(isFallbackEnabled());
  }, [isFallbackEnabled]);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (loading) return null;

  const fallback: Announcement = {
    id: 'fallback',
    text: '🙏 Welcome to ISKCON Student Center! Join us for transformative spiritual programs.',
    isActive: true,
    createdAt: '',
    updatedAt: '',
  };

  const display = useFallback || announcements.length === 0 ? [fallback] : announcements;
  const current = display[currentIndex];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1001,
      background: 'linear-gradient(90deg, #1a1a2e, #2d2d44)',
      padding: '10px 20px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <span style={{ color: '#d4a574' }}>📢</span>
        <p style={{ color: '#fff', fontSize: 13, fontWeight: 500, margin: 0 }}>
          {current.link ? (
            <a href={current.link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
              {current.text}
            </a>
          ) : (
            current.text
          )}
        </p>
        {display.length > 1 && (
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{currentIndex + 1}/{display.length}</span>
        )}
      </div>
    </div>
  );
}
