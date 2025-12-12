'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchCarouselImages, fetchAnnouncements, fetchSettings, type CarouselImage, type Announcement, type SiteSettings } from '../lib/cms';

const FALLBACK_IMAGE = '/jagannath.jpg';

// Hero Carousel with dynamic images from CMS
export function HeroCarousel({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>({ enableCarousel: true, enableAnnouncements: true });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [imgs, sts] = await Promise.all([
          fetchCarouselImages(),
          fetchSettings()
        ]);

        const activeImages = imgs.filter((img: CarouselImage & { isActive?: boolean }) => img.isActive !== false);
        if (activeImages.length > 0) {
          setImages(activeImages);
        }
        setSettings(sts);
      } catch (error) {
        console.error('Failed to load carousel data:', error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const displayImages = (!settings.enableCarousel || images.length === 0)
      ? [{ id: 'fallback', url: FALLBACK_IMAGE, filename: 'fallback', uploadedAt: '' }]
      : images;

    if (displayImages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images.length, settings.enableCarousel]);

  const displayImages = (!settings.enableCarousel || images.length === 0)
    ? [{ id: 'fallback', url: FALLBACK_IMAGE, filename: 'fallback', uploadedAt: '' }]
    : images;

  return (
    <section style={{
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Images - Cover mode (cropped for best fit) */}
      {displayImages.map((image, index) => (
        <div
          key={image.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 1.2s ease, transform 1.2s ease',
          }}
        >
          <img
            src={image.url}
            alt={`Slide ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(26,26,46,0.7) 0%, rgba(26,26,46,0.85) 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        {children}
      </div>

      {/* Carousel indicators */}
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

// Backward compatibility
export function DynamicCarousel() {
  return <HeroCarousel><div /></HeroCarousel>;
}

// Announcements Bar
export function DynamicAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>({ enableCarousel: true, enableAnnouncements: true });

  useEffect(() => {
    const load = async () => {
      try {
        const [anns, sts] = await Promise.all([
          fetchAnnouncements(),
          fetchSettings()
        ]);

        const active = anns.filter(a => a.isActive !== false);
        if (active.length > 0) setAnnouncements(active);
        setSettings(sts);
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

  // Common styles for announcement bar - compact on mobile
  const barStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1001,
    background: 'linear-gradient(90deg, #1a1a2e, #2d2d44)',
    padding: '8px 12px',  // Reduced padding
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    overflow: 'hidden' // Ensure marquee containment
  };

  const textStyle: React.CSSProperties = {
    color: '#fff',
    fontSize: 12,  // Smaller font
    fontWeight: 500,
    margin: 0,
    lineHeight: 1.4,
    // textAlign handled by class
  };

  const renderContent = () => {
    if (!settings.enableAnnouncements || announcements.length === 0) {
      return "Welcome to ISKCON Student Center! Join us for spiritual programs.";
    }
    const current = announcements[currentIndex];
    return current.text;
  };

  const renderLink = () => {
    if (!settings.enableAnnouncements || announcements.length === 0) return null;
    return announcements[currentIndex].link;
  };

  const content = renderContent();
  const link = renderLink();
  const showCount = settings.enableAnnouncements && announcements.length > 1;

  if (loading) return null; // Or skeleton

  return (
    <div style={barStyle}>
      <div style={containerStyle}>
        <span style={{ color: '#d4a574', fontSize: 14, flexShrink: 0 }}>📢</span>

        <div className="mobile-marquee-container">
          <p className="mobile-marquee" style={textStyle}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                {content}
              </a>
            ) : (
              content
            )}
          </p>
        </div>

        {showCount && (
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, flexShrink: 0 }}>{currentIndex + 1}/{announcements.length}</span>
        )}
      </div>
    </div>
  );
}
