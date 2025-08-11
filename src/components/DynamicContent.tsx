"use client";
import { useState, useEffect, useRef } from 'react';
import { fetchCarouselImages, type CarouselImage } from '../lib/cms';

// Define CarouselImage type for clarity
interface CarouselImage {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
  alt?: string; // Optional alt text for accessibility
}

export function DynamicCarousel() {
  // Initialize with fallback image to avoid loading state
  const [images, setImages] = useState<CarouselImage[]>([{
    id: 'jagannath-default',
    url: process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL || '/jagannath.jpg',
    filename: 'jagannath.jpg',
    uploadedAt: '2024-01-01',
    alt: 'Default Jagannath Image',
  }]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    loadImages();
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const timer = setInterval(() => {
        if (isMounted.current) {
          setCurrentSlide(prev => (prev + 1) % images.length);
        }
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [images.length]);

  const loadImages = async () => {
    try {
      const imagesData = await fetchCarouselImages();
      
      const jagannathImage: CarouselImage = {
        id: 'jagannath-default',
        url: process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL || '/jagannath.jpg',
        filename: 'jagannath.jpg',
        uploadedAt: '2024-01-01',
        alt: 'Default Jagannath Image',
      };
      
      if (imagesData.length > 0 && isMounted.current) {
        setImages([...imagesData, jagannathImage]);
      }
    } catch (error) {
      console.error('Error loading carousel images:', error);
      // Keep the fallback image that's already set
    }
  };

  return (
    <section style={{
      position: 'relative',
      height: 'clamp(600px, 80vh, 900px)',
      overflow: 'hidden',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} className="carousel-container" aria-live="polite">
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
              transform: 'scale(1.1)',
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
            }} aria-label={image.alt || 'Carousel image'} />
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

      {/* Content Container */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0 1rem'
      }}>
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
        <button
          onClick={() => {
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
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div style={{ display: 'flex', gap: 'clamp(0.2rem, 1vw, 0.4rem)' }} className="indicators">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
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
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => {
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
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </section>
  );
}