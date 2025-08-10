"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 7);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes scrollText {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes scroll-announcement {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .button-primary {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          transition: all 0.3s ease;
          border: none;
        }
        
        .button-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
        }
        
        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .text-responsive { font-size: 1.5rem !important; }
          .nav-desktop { display: none !important; }
        }
        `
      }} />
      
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 1000,
        padding: '1rem 0'
      }} className="animate-slideInLeft">
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center',
          padding: '0 2rem',
          flexWrap: 'nowrap',
          minHeight: '80px'
        }}>
          {/* Left Image - Prabhupada */}
          <div style={{ 
            marginRight: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ 
              width: '100px',
              height: '100px',
              backgroundImage: "url('/prabhupada.png')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
            <div style={{
              fontSize: '0.6rem',
              fontWeight: '600',
              color: '#ea580c',
              textAlign: 'center',
              lineHeight: '1.1',
              maxWidth: '120px',
              whiteSpace: 'nowrap'
            }}>
              FOUNDER ACHARYA: HDG AC BHAKTIVEDANTA SWAMI SRILA PRABHUPADA
            </div>
          </div>
          
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '700', 
            flexGrow: 1, 
            letterSpacing: '0.5px', 
            background: 'linear-gradient(135deg, #ea580c, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            textAlign: 'center'
          }} className="animate-fadeInUp">
            ISKCON STUDENT CENTER
          </h1>
          
          {/* Right Image - ISKCON Logo */}
          <div style={{ 
            marginLeft: '1rem',
            width: '60px',
            height: '60px',
            backgroundImage: "url('/iskcon.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} className="floating" />
          
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '2rem', flexShrink: 0 }} className="nav-desktop">
            <a href="#programs" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600', whiteSpace: 'nowrap' }}>Programs</a>
            <a href="#schedule" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600', whiteSpace: 'nowrap' }}>Schedule</a>
            <a href="#facilities" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600', whiteSpace: 'nowrap' }}>Facilities</a>
            <a href="#location" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600', whiteSpace: 'nowrap' }}>Location</a>
            <a href="#contact" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600', whiteSpace: 'nowrap' }}>Contact</a>
            <a 
              href="https://forms.google.com/your-form-id" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#ea580c',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: '700',
                marginLeft: '1rem',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              className="button-primary"
            >
              Join Now
            </a>
          </nav>
        </div>
      </header>

      {/* Announcement Section */}
      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '1.5rem 0',
        overflow: 'hidden',
        position: 'relative',
        whiteSpace: 'nowrap',
        marginTop: '80px',
        zIndex: 999,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderBottom: '3px solid #3b82f6'
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'scroll-announcement 25s linear infinite',
          fontSize: '1.2rem',
          fontWeight: '700',
          letterSpacing: '0.5px',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          🎉 Welcome to ISKCON Student Center! • 🌅 Join us for daily morning programs at 5:30 AM • 📖 Bhagavad Gita classes every Saturday & Sunday at 6 PM • 🍽️ Free prasadam for all students • 🏕️ Register for upcoming spiritual retreats • 📱 Follow us on social media for updates • ✨ Transform your life through spiritual wisdom •
        </div>
      </div>

      {/* Image Carousel Section */}
      <section style={{
        position: 'relative',
        height: 'clamp(500px, 70vh, 800px)',
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
          {/* Slide 1: Krishna */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === 0 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: "url('/krishna.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white'
            }}
          />

          {/* Slide 2: Mahaprabhu */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === 1 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: "url('/mahaprabhu.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white'
            }}
          />

          {/* Slide 3: Radha Krishna */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === 2 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: "url('/radhakrishna.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white'
            }}
          />

          {/* Slide 4: Siyaram */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === 3 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: "url('/siyaram.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white'
            }}
          />

          {/* Slide 5: Charan */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === 4 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: "url('/charan.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white'
            }}
          />

          {/* Slide 6: Hogwarts */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === 5 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: "url('/hogwarts.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white'
            }}
          />

          {/* Slide 7: Mahaprabhu 2 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === 6 ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              backgroundImage: "url('/mahaprabhu-2.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'white'
            }}
          />
          
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
              className="card-hover animate-fadeInUp"
            >
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
              className="card-hover animate-fadeInUp"
            >
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
            onClick={() => {
              setCurrentSlide(prev => prev === 0 ? 6 : prev - 1);
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
          >
            ‹
          </button>

          {/* Indicators */}
          <div style={{ display: 'flex', gap: 'clamp(0.2rem, 1vw, 0.4rem)' }} className="indicators">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
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
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => {
              setCurrentSlide(prev => prev === 6 ? 0 : prev + 1);
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
          >
            ›
          </button>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" style={{ 
        padding: '4rem 2rem', 
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            textAlign: 'center', 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #111827, #374151)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} className="animate-fadeInUp">
            Holistic Offerings
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }} className="animate-fadeInUp">
            Integrated spiritual ecosystem: learning, meditation, leadership, friendship, lifestyle transformation and joyful seva.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {/* Learning Gita & Vedic Wisdom */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                📖
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ea580c',
                marginBottom: '1rem'
              }}>
                Learning Gita & Vedic Wisdom
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6'
              }}>
                Structured deep dive into Bhagavad Gita & Vedic philosophy.
              </p>
            </div>

            {/* Chanting / Mantra Meditation */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                🧘
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ea580c',
                marginBottom: '1rem'
              }}>
                Chanting / Mantra Meditation
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6'
              }}>
                Daily japa & kirtan to sharpen focus and purify mind.
              </p>
            </div>

            {/* Leadership Development */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                🎖️
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ea580c',
                marginBottom: '1rem'
              }}>
                Leadership Development
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6'
              }}>
                Cultivating responsibility, clarity & servant-leadership.
              </p>
            </div>

            {/* Spiritual Friendship */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                👥
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ea580c',
                marginBottom: '1rem'
              }}>
                Spiritual Friendship
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6'
              }}>
                Uplifting association & accountability circles.
              </p>
            </div>

            {/* Kirtans / Festivals */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                🎵
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ea580c',
                marginBottom: '1rem'
              }}>
                Kirtans / Festivals
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6'
              }}>
                High-energy devotional music & cultural celebrations.
              </p>
            </div>

            {/* Personal Mentorship */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                🤝
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ea580c',
                marginBottom: '1rem'
              }}>
                Personal Mentorship
              </h3>
              <p style={{
                color: '#4b5563',
                lineHeight: '1.6'
              }}>
                One-on-one guidance for growth & sadhana alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" style={{
        padding: '4rem 2rem',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #ea580c, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} className="animate-fadeInUp">
            Schedule
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Daily Programs */}
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '2rem',
              borderRadius: '16px',
              border: '2px solid #e2e8f0'
            }} className="animate-fadeInUp">
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#1e40af', 
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                📅 Daily Programs
              </h3>
              <div style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1.1rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>5:30 - 6:30 AM</strong><br />
                  Meditation
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>6:30 AM</strong><br />
                  Aarti
                </p>
                <p>
                  <strong>7:00 - 7:30 AM</strong><br />
                  Spiritual Discourses
                </p>
              </div>
            </div>

            {/* Weekly Classes */}
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '2rem',
              borderRadius: '16px',
              border: '2px solid #e2e8f0'
            }} className="animate-fadeInUp">
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#ea580c', 
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                📖 Weekly Classes
              </h3>
              <div style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1.1rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Saturday</strong><br />
                  6:00 - 8:00 PM*
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Sunday</strong><br />
                  6:00 - 8:00 PM*
                </p>
                <p style={{ 
                  fontSize: '0.9rem', 
                  fontStyle: 'italic', 
                  color: '#9ca3af',
                  marginTop: '1rem'
                }}>
                  * Subject to change
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" style={{
        padding: '4rem 2rem',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #111827, #374151)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} className="animate-fadeInUp">
            Your Spiritual Campus
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }} className="animate-fadeInUp">
            Spaces designed to nurture reflection, community, health and growth.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Accommodation */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                margin: '0 auto 1rem auto'
              }}>
                �
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ea580c', marginBottom: '1rem' }}>
                Accommodation
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Comfortable, focused student living.
              </p>
            </div>

            {/* Library */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                margin: '0 auto 1rem auto'
              }}>
                🏛️
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ea580c', marginBottom: '1rem' }}>
                Library
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Spiritual & academic study space.
              </p>
            </div>

            {/* Dining Hall */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                margin: '0 auto 1rem auto'
              }}>
                🍴
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ea580c', marginBottom: '1rem' }}>
                Dining Hall
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Nutritious daily prasadam meals.
              </p>
            </div>

            {/* Meditation Hall */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }} className="card-hover animate-fadeInUp">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef3c7',
                color: '#ea580c',
                fontSize: '1.5rem',
                margin: '0 auto 1rem auto'
              }}>
                💆
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ea580c', marginBottom: '1rem' }}>
                Meditation Hall
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Quiet space for reflection & prayer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" style={{
        padding: '4rem 2rem',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #ea580c, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} className="animate-fadeInUp">
            Find Us
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div className="animate-slideInLeft">
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem'
              }}>
                📍 Address
              </h3>
              <div style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1.1rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Veer Savarkar Marg</strong><br />
                  Dhaka Colony, Sector 7<br />
                  Rohini, Delhi<br />
                  110085, India
                </p>
                
                <h4 style={{ color: '#ea580c', marginTop: '2rem', marginBottom: '1rem' }}>🚇 Nearest Metro Stations:</h4>
                <p>Vishwavidyalay • Pulbangash</p>
              </div>
            </div>
            
            <div className="animate-slideInRight">
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '2rem',
                borderRadius: '16px',
                border: '2px solid #e2e8f0'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#ea580c',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  🗺️ Location Map
                </h3>
                
                {/* Google Map Embed */}
                <div style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid #e2e8f0',
                  marginBottom: '1.5rem'
                }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.1503906493656!2d77.10746367539754!3d28.73024117562916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0b89c4bd8b87%3A0xfb2c31ad4ac1c1b9!2sISKCON%20Delhi%20%7C%20Sri%20Sri%20Radha%20Parthasarathi%20Mandir!5e0!3m2!1sen!2sin!4v1733998062397!5m2!1sen!2sin"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ISKCON Delhi Location"
                  />
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <a
                    href="https://www.google.com/maps/place/ISKCON+Delhi+%7C+Sri+Sri+Radha+Parthasarathi+Mandir/@28.7302412,77.1074637,17z/data=!3m1!4b1!4m6!3m5!1s0x390d0b89c4bd8b87:0xfb2c31ad4ac1c1b9!8m2!3d28.7302412!4d77.1100386!16s%2Fg%2F1tlkr13m?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#ea580c',
                      color: 'white',
                      padding: '1rem 2rem',
                      borderRadius: '999px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      display: 'inline-block'
                    }}
                    className="button-primary"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ 
        padding: '4rem 2rem', 
        backgroundColor: '#111827',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} className="animate-fadeInUp">
            Get In Touch
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <div className="animate-fadeInUp">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📱</span>
                <a href="tel:+918318342494" style={{ 
                  color: '#ff6b35', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}>
                  +91 83183 42494
                </a>
              </div>
            </div>
            
            <div className="animate-fadeInUp">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📸</span>
                <a href="https://instagram.com/iskcondelhiuniversity" target="_blank" rel="noopener noreferrer" style={{ 
                  color: '#ff6b35', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}>
                  @iskcondelhiuniversity
                </a>
              </div>
            </div>
            
            <div className="animate-fadeInUp">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📺</span>
                <a href="https://youtube.com/@ISKCONDelhiUniversity" target="_blank" rel="noopener noreferrer" style={{ 
                  color: '#ff6b35', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}>
                  @ISKCONDelhiUniversity
                </a>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📍</span>
            <p style={{ 
              textAlign: 'center', 
              lineHeight: '1.6', 
              color: '#e5e7eb',
              maxWidth: '600px',
              margin: 0
            }}>
              ADDRESS:- ISKCON STUDENT CENTER, 1ST FLOOR, OPPOSITE HANSRAJ COLLEGE, ABOVE NATURAL'S ICE CREAM, NEAR STARBUCKS, KAMLA NAGAR, DELHI 110007
            </p>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <a 
              href="https://instagram.com/iskcondelhiuniversity"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#ff6b35',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: '700',
                display: 'inline-block'
              }}
              className="button-primary"
            >
              Join Our Community
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '2rem', 
        backgroundColor: '#000000',
        color: 'white',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, opacity: 0.7 }}>
          © 2025 ISKCON Student Center. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
