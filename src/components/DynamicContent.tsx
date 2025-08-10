"use client";
import { useState, useEffect, useRef } from 'react';
import { fetchCarouselImages, fetchAnnouncements, type CarouselImage, type Announcement } from '../lib/cms';

// Dynamic Carousel Component
export function DynamicCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [images.length]);

  const loadImages = async () => {
    try {
      const imagesData = await fetchCarouselImages();
      
      // Default Jagannath image (always present)
      const jagannathImage = {
        id: 'jagannath-default',
        url: '/jagannath.jpg',
        filename: 'jagannath.jpg',
        uploadedAt: '2024-01-01'
      };
      
      if (imagesData.length > 0) {
        // If there are uploaded images, put them first and Jagannath at the end
        setImages([...imagesData, jagannathImage]);
      } else {
        // If no uploaded images, show only Jagannath
        setImages([jagannathImage]);
      }
    } catch (error) {
      console.error('Error loading carousel images:', error);
      // On error, show only Jagannath
      setImages([{
        id: 'jagannath-default',
        url: '/jagannath.jpg',
        filename: 'jagannath.jpg',
        uploadedAt: '2024-01-01'
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        <div style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          Loading carousel...
        </div>
      </section>
    );
  }

  if (images.length === 0) {
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
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No images found</h2>
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
            key={image.id}
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

      {/* Content Container - Repositioned */}
      <div style={{
        position: 'absolute',
        bottom: '80px', // Above navigation
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0 1rem'
      }}>
        {/* Call to Action Buttons */}

        <a 
          href="https://docs.google.com/forms/d/e/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#ea580c',
            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}
          className="card-hover animate-fadeInUp material-btn"
        >
          <span style={{ 
            width: '18px', 
            height: '18px', 
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
              fontSize: '10px',
              fontWeight: 'bold'
            }}>★</span>
          </span>
          Join Now
        </a>
        <a 
          href="#programs"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.9)',
            color: 'white',
            backgroundColor: 'transparent',
            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          className="card-hover animate-fadeInUp material-btn"
        >
          <span style={{ 
            width: '18px', 
            height: '18px', 
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
          onClick={(e) => {
            e.preventDefault();
            setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
          }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            color: 'white',
            width: 'clamp(35px, 8vw, 45px)',
            height: 'clamp(35px, 8vw, 45px)',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
          }}
        >
          ‹
        </button>

        {/* Indicators */}
        <div style={{ display: 'flex', gap: 'clamp(0.2rem, 1vw, 0.4rem)' }} className="indicators">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(index);
              }}
              style={{
                width: 'clamp(8px, 2vw, 10px)',
                height: 'clamp(8px, 2vw, 10px)',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                backgroundColor: currentSlide === index ? '#ea580c' : 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
          }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            color: 'white',
            width: 'clamp(35px, 8vw, 45px)',
            height: 'clamp(35px, 8vw, 45px)',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}

// Dynamic Announcements Component - Ultra Fast Loading
export function DynamicAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Default fallback announcement
  const fallbackAnnouncement = {
    id: 'iskcon-fallback',
    text: 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students',
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  };

  useEffect(() => {
    // Start loading immediately with no delay
    loadAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 0) {
      // Rotate through announcements every 8 seconds
      const rotationTimer = setInterval(() => {
        setCurrentAnnouncementIndex(prev => {
          const nextIndex = (prev + 1) % announcements.length;
          // Safety check to ensure valid index
          return nextIndex < announcements.length ? nextIndex : 0;
        });
      }, 8000);

      return () => clearInterval(rotationTimer);
    }
  }, [announcements.length]);

  const loadAnnouncements = async () => {
    try {
      // Load with Promise.race to timeout after 1 second
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 1000)
      );
      
      const announcementsData = await Promise.race([
        fetchAnnouncements(),
        timeoutPromise
      ]) as Announcement[];
      
      const activeAnnouncements = announcementsData.filter(ann => ann.isActive);
      
      if (activeAnnouncements.length > 0) {
        setAnnouncements(activeAnnouncements);
      } else {
        // No active announcements, use fallback
        setAnnouncements([fallbackAnnouncement]);
      }
    } catch (error) {
      console.error('Error loading announcements (using fallback):', error);
      // Use fallback on error or timeout
      setAnnouncements([fallbackAnnouncement]);
    } finally {
      setLoading(false);
    }
  };

  // Get current announcement to display with safety check
  const currentAnnouncement = announcements[currentAnnouncementIndex] || fallbackAnnouncement;
  
  // Create announcement content with clickable links
  const createAnnouncementContent = (announcement: Announcement) => {
    if (!announcement || !announcement.text) {
      return 'Welcome to ISKCON Student Center • Join us for daily programs';
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

  return (
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
      <div style={{
        display: 'inline-block',
        animation: 'scroll-announcement 25s linear infinite',
        fontSize: '1rem',
        fontWeight: '500'
      }}>
        {createAnnouncementContent(currentAnnouncement)}
      </div>
      
      {/* Optional: Show loading indicator for dynamic content */}
      {!hasLoadedDynamic && (
        <div style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '0.8rem',
          color: '#6b7280',
          opacity: 0.7
        }}>
          ↻
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-announcement {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `
      }} />
    </div>
  );
}