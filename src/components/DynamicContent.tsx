"use client";
import { useState, useEffect } from 'react';
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
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: `url('${image.url}')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white'
            }}
          />
        ))}
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          zIndex: 2
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

// Dynamic Announcements Component
export function DynamicAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const announcementsData = await fetchAnnouncements();
      
      // Default ISKCON announcement (always present)
      const defaultAnnouncement = {
        id: 'iskcon-default',
        text: 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students',
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      };
      
      if (announcementsData.length > 0) {
        // If there are uploaded announcements, put them first and default at the end
        setAnnouncements([...announcementsData, defaultAnnouncement]);
      } else {
        // If no uploaded announcements, show only default
        setAnnouncements([defaultAnnouncement]);
      }
    } catch (error) {
      console.error('Error loading announcements:', error);
      // On error, show only default
      setAnnouncements([{
        id: 'iskcon-default',
        text: 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students',
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#ea580c',
        color: 'white',
        padding: '0.75rem 0',
        overflow: 'hidden',
        position: 'relative',
        whiteSpace: 'nowrap',
        marginTop: '70px'
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'scroll-announcement 20s linear infinite',
          fontSize: '1rem',
          fontWeight: '500'
        }}>
          Loading announcements...
        </div>
      </div>
    );
  }

  const activeAnnouncements = announcements.filter(ann => ann.isActive);
  
  // Create announcement text with clickable links
  const createAnnouncementContent = () => {
    if (activeAnnouncements.length === 0) {
      return 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students';
    }

    return activeAnnouncements.map((ann, index) => {
      const baseText = ann.text;
      if (ann.link) {
        return (
          <span key={ann.id}>
            {baseText} • <a 
              href={ann.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'white',
                textDecoration: 'underline',
                fontWeight: 'bold'
              }}
            >
              Click here
            </a>
            {index < activeAnnouncements.length - 1 ? ' • ' : ''}
          </span>
        );
      }
      return (
        <span key={ann.id}>
          {baseText}
          {index < activeAnnouncements.length - 1 ? ' • ' : ''}
        </span>
      );
    });
  };

  return (
    <div style={{
      backgroundColor: '#ea580c',
      color: 'white',
      padding: '0.75rem 0',
      overflow: 'hidden',
      position: 'relative',
      whiteSpace: 'nowrap',
      marginTop: '70px'
    }}>
      <div style={{
        display: 'inline-block',
        animation: 'scroll-announcement 20s linear infinite',
        fontSize: '1rem',
        fontWeight: '500'
      }}>
        {createAnnouncementContent()}
      </div>
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
