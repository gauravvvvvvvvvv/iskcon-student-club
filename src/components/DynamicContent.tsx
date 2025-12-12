'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchCarouselImages, fetchAnnouncements, type CarouselImage, type Announcement } from '../lib/cms';

const FALLBACK_IMAGE = '/jagannath.jpg';

// Hero Carousel with dynamic images from CMS
export function HeroCarousel({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchCarouselImages();
        if (fetchedImages.length > 0) {
          setImages(fetchedImages);
        }
      } catch (error) {
        console.error('Failed to load carousel images:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images.length]);

  const displayImages = images.length === 0
    ? [{ id: 'fallback', url: FALLBACK_IMAGE, filename: 'fallback', uploadedAt: '' }]
    : images;

  return (
    <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Images */}
      {displayImages.map((image, index) => (
        <div
          key={image.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'scale(1)' : 'scale(1.1)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          <img
            src={image.url}
            alt={`Slide ${index + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(26,26,46,0.75) 0%, rgba(26,26,46,0.88) 100%)',
      }} />

      {/* Content passed as children */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>

      {/* Image indicators */}
      {displayImages.length > 1 && (
        <div style={{ position: 'absolute', bottom: 24, right: 24, display: 'flex', gap: 8, zIndex: 20 }}>
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setCurrentIndex(index);
              }}
              style={{
                width: index === currentIndex ? 32 : 8,
                height: 8,
                borderRadius: 4,
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
