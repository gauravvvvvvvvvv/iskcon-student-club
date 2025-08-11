"use client";
import { useState, useEffect, useRef } from 'react';
import { fetchCarouselImages, fetchAnnouncements, type CarouselImage, type Announcement } from '../lib/cms';

declare global {
  interface Window {
    __ISKCON_SHOW_FALLBACK_IMAGE__?: boolean;
    __ISKCON_SHOW_FALLBACK_ANNOUNCEMENT__?: boolean;
  }
}

// Dynamic Carousel Component
export function DynamicCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Helper to check fallback toggle
  const isFallbackImageEnabled = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('showFallbackImage');
      return stored !== 'false';
    }
    return true;
  };

  useEffect(() => {
    loadImages();
    
    // Listen for storage changes to update when admin changes settings
    const handleStorageChange = () => {
      loadImages();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (images.length > 1) {
      timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % images.length);
      }, 4000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [images.length]);

  const loadImages = async () => {
    try {
      setError(null);
      const jagannathImage: CarouselImage = {
        id: 'jagannath-default',
        url: '/jagannath.jpg',
        filename: 'jagannath.jpg',
        uploadedAt: '2024-01-01'
      };
      
      const imagesData = await fetchCarouselImages();
      
      if (imagesData && imagesData.length > 0) {
        if (isFallbackImageEnabled()) {
          setImages([...imagesData, jagannathImage]);
        } else {
          setImages(imagesData);
        }
      } else {
        // No uploaded images
        if (isFallbackImageEnabled()) {
          setImages([jagannathImage]);
        } else {
          setImages([]);
        }
      }
    } catch (error) {
      setError('Failed to load images');
      if (isFallbackImageEnabled()) {
        setImages([{
          id: 'jagannath-default',
          url: '/jagannath.jpg',
          filename: 'jagannath.jpg',
          uploadedAt: '2024-01-01'
        }]);
      } else {
        setImages([]);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentSlide(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  if (error) {
    return (
      <section style={{
        position: 'relative',
        height: 'clamp(600px, 80vh, 900px)',
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            {error}
          </h2>
          <p>Please upload images via the admin panel.</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      position: 'relative',
      height: 'clamp(600px, 80vh, 900px)',
      overflow: 'hidden',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} className="carousel-container">
      {/* Background Image Carousel */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        {images.map((image, index) => (
          <div
            key={`${image.id}-${index}`} // More unique key
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }}
          >
            {/* Blurred background version of the same image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url('${image.url}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(20px) brightness(0.3)',
              transform: 'scale(1.1)', // Slightly larger to avoid blur edges
              zIndex: 1
            }} />
            
            {/* Main image on top */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url('${image.url}')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 2
            }} />
          </div>
        ))}
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          zIndex: 3
        }} />
      </div>

      {/* Content Container - Floating at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '60px', // Moved higher to avoid navigation overlap
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 1rem'
      }} className="carousel-buttons">
        {/* Call to Action Buttons */}
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSfm0lqavoKu8r9AEwXYg9hw9FdOJtRpcKN-wm4jYyu843fNog/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#ea580c',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1.2rem, 3vw, 1.5rem)',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(0, 0, 0, 0.8)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
          className="card-hover animate-fadeInUp material-btn"
        >
          <span style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: '#ea580c', 
            borderRadius: '50%', 
            display: 'inline-block',
            position: 'relative'
          }}>
            <span style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '9px',
              fontWeight: 'bold'
            }}>★</span>
          </span>
          Join Now
        </a>
        <a 
          href="#programs"
          style={{
            border: '2px solid rgba(0, 0, 0, 0.8)',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1.2rem, 3vw, 1.5rem)',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
          className="card-hover animate-fadeInUp material-btn"
        >
          <span style={{ 
            width: '16px', 
            height: '16px', 
            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
            borderRadius: '50%', 
            display: 'inline-block',
            position: 'relative'
          }}>
            <span style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>+</span>
          </span>
          Explore Programs
        </a>
      </div>

      {/* Carousel Navigation */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'clamp(0.5rem, 2vw, 1rem)',
        width: '100%',
        maxWidth: '400px',
        padding: '0 1rem'
      }} className="carousel-nav">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={images.length <= 1}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            width: 'clamp(35px, 8vw, 45px)',
            height: 'clamp(35px, 8vw, 45px)',
            borderRadius: '50%',
            cursor: images.length <= 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(5px)',
            opacity: images.length <= 1 ? 0.3 : 1
          }}
          onMouseEnter={(e) => {
            if (images.length > 1) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
            }
          }}
          onMouseLeave={(e) => {
            if (images.length > 1) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
            }
          }}
        >
          ‹
        </button>

        {/* Indicators */}
        <div style={{ display: 'flex', gap: 'clamp(0.2rem, 1vw, 0.4rem)' }} className="indicators">
          {images.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => handleIndicatorClick(index)}
              style={{
                width: 'clamp(8px, 2vw, 10px)',
                height: 'clamp(8px, 2vw, 10px)',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: currentSlide === index ? '#ea580c' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: currentSlide === index ? 1 : 0.7
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={images.length <= 1}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            width: 'clamp(35px, 8vw, 45px)',
            height: 'clamp(35px, 8vw, 45px)',
            borderRadius: '50%',
            cursor: images.length <= 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(5px)',
            opacity: images.length <= 1 ? 0.3 : 1
          }}
          onMouseEnter={(e) => {
            if (images.length > 1) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
            }
          }}
          onMouseLeave={(e) => {
            if (images.length > 1) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
            }
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}

// Dynamic Announcements Component - Clean and Fast
export function DynamicAnnouncements() {
  // Default fallback announcement
  const fallbackAnnouncement: Announcement = {
    id: 'iskcon-fallback',
    text: 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  };

  // Helper to check fallback toggle
  const isFallbackAnnouncementEnabled = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('showFallbackAnnouncement');
      return stored !== 'false';
    }
    return true;
  };

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadAnnouncements();
    
    // Listen for storage changes to update when admin changes settings
    const handleStorageChange = () => {
      loadAnnouncements();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Only start rotation if there are multiple announcements
    if (announcements.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentAnnouncementIndex(prev => (prev + 1) % announcements.length);
      }, 20000); // 20 seconds per announcement for continuous flow
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [announcements.length]);

  const loadAnnouncements = async () => {
    try {
      const announcementsData = await fetchAnnouncements();
      
      if (announcementsData && Array.isArray(announcementsData)) {
        const activeAnnouncements = announcementsData.filter(ann => ann && ann.isActive && ann.text);
        
        if (activeAnnouncements.length > 0) {
          // We have user announcements
          if (isFallbackAnnouncementEnabled()) {
            // Include fallback + user announcements
            setAnnouncements([...activeAnnouncements, fallbackAnnouncement]);
          } else {
            // Only user announcements
            setAnnouncements(activeAnnouncements);
          }
        } else {
          // No user announcements
          if (isFallbackAnnouncementEnabled()) {
            setAnnouncements([fallbackAnnouncement]);
          } else {
            setAnnouncements([]);
          }
        }
      } else {
        // API failed
        if (isFallbackAnnouncementEnabled()) {
          setAnnouncements([fallbackAnnouncement]);
        } else {
          setAnnouncements([]);
        }
      }
      
      setCurrentAnnouncementIndex(0);
    } catch (error) {
      console.error('Error loading announcements:', error);
      if (isFallbackAnnouncementEnabled()) {
        setAnnouncements([fallbackAnnouncement]);
      } else {
        setAnnouncements([]);
      }
      setCurrentAnnouncementIndex(0);
    }
  };

  // Get current announcement with safety checks
  const currentAnnouncement = announcements.length > 0 ? announcements[currentAnnouncementIndex] : null;
  
  // Create announcement content with safety checks
  const createAnnouncementContent = (announcement: Announcement | null) => {
    if (!announcement || !announcement.text) {
      return null;
    }
    
    const baseText = announcement.text;
    if (announcement.link) {
      return (
        <span>
          {baseText} • <a 
            href={announcement.link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#ea580c',
              textDecoration: 'underline',
              fontWeight: 'bold'
            }}
          >
            Click here
          </a>
        </span>
      );
    }
    return baseText;
  };

  // Don't render anything if no announcements
  if (announcements.length === 0 || !currentAnnouncement) {
    return null;
  }

  return (
    <>
      <div style={{
        backgroundColor: '#f8f9fa',
        color: '#1f2937',
        padding: '0.75rem 0',
        overflow: 'hidden',
        position: 'relative',
        whiteSpace: 'nowrap',
        marginTop: '70px',
        borderTop: '3px solid #ea580c',
        borderBottom: '3px solid #ea580c'
      }}>
        <div 
          key={`announcement-${currentAnnouncementIndex}-${currentAnnouncement.id}`} // Force re-render for animation reset
          style={{
            display: 'inline-block',
            animation: 'scroll-announcement 20s linear infinite',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          {createAnnouncementContent(currentAnnouncement)}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-announcement {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `
      }} />
    </>
  );
}
