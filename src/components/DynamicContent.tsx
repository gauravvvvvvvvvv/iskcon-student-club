'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchCarouselImages, fetchAnnouncements, type CarouselImage, type Announcement } from '../lib/cms';

// Default fallback - can be overridden via localStorage
const DEFAULT_FALLBACK = '/jagannath.jpg';

const getFallbackImage = () => {
  if (typeof window === 'undefined') return DEFAULT_FALLBACK;
  return localStorage.getItem('customFallbackImage') || DEFAULT_FALLBACK;
};

// Hero Carousel with dynamic images from CMS
export function HeroCarousel({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [carouselEnabled, setCarouselEnabled] = useState(true);
  const [fallbackImage, setFallbackImage] = useState(DEFAULT_FALLBACK);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if carousel is enabled from localStorage
    const enabled = localStorage.getItem('showFallbackImage');
    setCarouselEnabled(enabled !== 'true');
    setFallbackImage(getFallbackImage());

    const loadImages = async () => {
      try {
        const fetchedImages = await fetchCarouselImages();
        // Filter only active images
        const activeImages = fetchedImages.filter((img: CarouselImage & { isActive?: boolean }) => img.isActive !== false);
        if (activeImages.length > 0) {
          setImages(activeImages);
        }
      } catch (error) {
        console.error('Failed to load carousel images:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();

    // Listen for storage changes (from admin panel)
    const handleStorage = () => {
      const enabled = localStorage.getItem('showFallbackImage');
      setCarouselEnabled(enabled !== 'true');
      setFallbackImage(getFallbackImage());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const displayImages = (!carouselEnabled || images.length === 0)
      ? [{ id: 'fallback', url: fallbackImage, filename: 'fallback', uploadedAt: '' }]
      : images;

    if (displayImages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images.length, carouselEnabled, fallbackImage]);

  const displayImages = (!carouselEnabled || images.length === 0)
    ? [{ id: 'fallback', url: fallbackImage, filename: 'fallback', uploadedAt: '' }]
    : images;

  return (
    <section style={{
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#1a1a2e', // Dark background for letterboxing
    }}>
      {/* Background Images - Full image display (no cropping) */}
      {displayImages.map((image, index) => (
        <div
          key={image.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={image.url}
            alt={`Slide ${index + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(26,26,46,0.6) 0%, rgba(26,26,46,0.8) 100%)',
      }} />

      {/* Content passed as children */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        {children}
      </div>

      {/* Image indicators - Always visible at bottom */}
      {displayImages.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          zIndex: 20
        }}>
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setCurrentIndex(index);
              }}
              style={{
                width: index === currentIndex ? 32 : 10,
                height: 10,
                borderRadius: 5,
                background: index === currentIndex ? '#d4a574' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// Keep DynamicCarousel for backward compatibility
export function DynamicCarousel() {
  return <HeroCarousel><div /></HeroCarousel>;
}

// Announcements Bar
export function DynamicAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchAnnouncements();
        const active = fetched.filter(a => a.isActive !== false);
        if (active.length > 0) setAnnouncements(active);
      } catch (error) {
        console.error('Failed to load announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (loading || announcements.length === 0) {
    // Show default announcement
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
            Welcome to ISKCON Student Center! Join us for transformative spiritual programs.
          </p>
        </div>
      </div>
    );
  }

  const current = announcements[currentIndex];

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
        {announcements.length > 1 && (
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{currentIndex + 1}/{announcements.length}</span>
        )}
      </div>
    </div>
  );
}
