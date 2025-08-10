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
      if (imagesData.length > 0) {
        setImages(imagesData);
      } else {
        // Fallback to static images if no dynamic images
        setImages([
          { id: '1', url: '/krishna.jpg', filename: 'krishna.jpg', uploadedAt: '' },
          { id: '2', url: '/mahaprabhu.jpg', filename: 'mahaprabhu.jpg', uploadedAt: '' },
          { id: '3', url: '/radhakrishna.jpg', filename: 'radhakrishna.jpg', uploadedAt: '' },
          { id: '4', url: '/siyaram.jpg', filename: 'siyaram.jpg', uploadedAt: '' },
          { id: '5', url: '/charan.jpeg', filename: 'charan.jpeg', uploadedAt: '' },
          { id: '6', url: '/hogwarts.jpg', filename: 'hogwarts.jpg', uploadedAt: '' },
          { id: '7', url: '/mahaprabhu-2.jpg', filename: 'mahaprabhu-2.jpg', uploadedAt: '' }
        ]);
      }
    } catch (error) {
      console.error('Error loading carousel images:', error);
      // Use static images as fallback
      setImages([
        { id: '1', url: '/krishna.jpg', filename: 'krishna.jpg', uploadedAt: '' },
        { id: '2', url: '/mahaprabhu.jpg', filename: 'mahaprabhu.jpg', uploadedAt: '' },
        { id: '3', url: '/radhakrishna.jpg', filename: 'radhakrishna.jpg', uploadedAt: '' },
        { id: '4', url: '/siyaram.jpg', filename: 'siyaram.jpg', uploadedAt: '' },
        { id: '5', url: '/charan.jpeg', filename: 'charan.jpeg', uploadedAt: '' },
        { id: '6', url: '/hogwarts.jpg', filename: 'hogwarts.jpg', uploadedAt: '' },
        { id: '7', url: '/mahaprabhu-2.jpg', filename: 'mahaprabhu-2.jpg', uploadedAt: '' }
      ]);
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

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }} className="carousel-content">
        {/* Center Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="carousel-title">
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: '900',
            color: 'white',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            margin: 0,
            letterSpacing: '0.05em',
            lineHeight: '1.1'
          }}>
            ISKCON Student Center
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '1rem 0 0 0',
            fontWeight: '500'
          }}>
            International Society for Krishna Consciousness
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          <a 
            href="https://forms.google.com/your-form-id"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#ea580c',
              padding: '1rem 2rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}
            className="card-hover animate-fadeInUp material-btn"
          >
            <span style={{ 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#ea580c', 
              borderRadius: '50%', 
              display: 'inline-block', 
              marginRight: '0.5rem',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '12px',
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
              padding: '1rem 2rem',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backdropFilter: 'blur(10px)'
            }}
            className="card-hover animate-fadeInUp material-btn"
          >
            <span style={{ 
              width: '20px', 
              height: '20px', 
              backgroundColor: 'rgba(255, 255, 255, 0.3)', 
              borderRadius: '50%', 
              display: 'inline-block', 
              marginRight: '0.5rem',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>+</span>
            </span>
            Explore Programs
          </a>
        </div>
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
      if (announcementsData.length > 0) {
        setAnnouncements(announcementsData);
      } else {
        // Fallback announcement
        setAnnouncements([{
          id: '1',
          text: 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students • Register for upcoming spiritual retreats • Follow us on social media for updates •',
          isActive: true,
          createdAt: '',
          updatedAt: ''
        }]);
      }
    } catch (error) {
      console.error('Error loading announcements:', error);
      // Use fallback announcement
      setAnnouncements([{
        id: '1',
        text: 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students • Register for upcoming spiritual retreats • Follow us on social media for updates •',
        isActive: true,
        createdAt: '',
        updatedAt: ''
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
  const announcementText = activeAnnouncements.length > 0 
    ? activeAnnouncements.map(ann => {
        if (ann.link) {
          return `${ann.text} (${ann.link})`;
        }
        return ann.text;
      }).join(' • ')
    : 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students • Register for upcoming spiritual retreats • Follow us on social media for updates •';

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
        {announcementText}
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
