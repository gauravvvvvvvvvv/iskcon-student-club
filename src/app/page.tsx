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
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes scrollText {
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
        
        .hero-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b35 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        
        .material-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          margin: 0 auto 1rem auto;
          transition: all 0.3s ease;
          color: white;
        }
        
        .icon-prayer { background: linear-gradient(135deg, #ff9a9e, #fecfef); }
        .icon-book { background: linear-gradient(135deg, #a8edea, #fed6e3); }
        .icon-music { background: linear-gradient(135deg, #d299c2, #fef9d7); }
        .icon-community { background: linear-gradient(135deg, #89f7fe, #66a6ff); }
        .icon-event { background: linear-gradient(135deg, #fdbb2d, #22c1c3); }
        .icon-food { background: linear-gradient(135deg, #ff9a9e, #fad0c4); }
        
        .material-btn {
          position: relative;
          overflow: hidden;
        }
        
        .material-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transition: width 0.4s, height 0.4s, top 0.4s, left 0.4s;
          transform: translate(-50%, -50%);
        }
        
        .material-btn:hover::before {
          width: 300px;
          height: 300px;
        }
        
        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .text-responsive { font-size: 1.5rem !important; }
          .nav-desktop { display: none !important; }
        }
        
        /* Additional responsive styles */
        @media (max-width: 768px) {
          .announcement-banner {
            font-size: 0.9rem !important;
            padding: 8px 0 !important;
          }
          
          .carousel-container {
            height: clamp(300px, 40vh, 450px) !important;
          }
          
          .carousel-content {
            padding: 1rem !important;
          }
          
          .carousel-nav {
            bottom: 10px !important;
            gap: 0.5rem !important;
          }
          
          .carousel-nav button {
            width: 35px !important;
            height: 35px !important;
            font-size: 1rem !important;
          }
          
          .carousel-nav .indicators button {
            width: 8px !important;
            height: 8px !important;
          }
          
          .carousel-container img {
            border-radius: 4px !important;
          }
        }
        
        @media (max-width: 480px) {
          .announcement-banner {
            font-size: 0.8rem !important;
          }
          
          .carousel-container {
            height: clamp(250px, 35vh, 350px) !important;
          }
          
          .carousel-nav {
            bottom: 5px !important;
            gap: 0.3rem !important;
            padding: 0 1rem !important;
          }
          
          .carousel-nav button {
            width: 30px !important;
            height: 30px !important;
            font-size: 0.9rem !important;
          }
          
          .carousel-content h1 {
            font-size: clamp(1.5rem, 5vw, 2.5rem) !important;
          }
          
          .carousel-content p {
            font-size: clamp(0.9rem, 2.5vw, 1.2rem) !important;
          }
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
          <div style={{ marginRight: '1rem' }} className="floating">
            <img 
              src="/prabhupada.jpg" 
              alt="Srila Prabhupada" 
              style={{ height: '40px', width: 'auto' }}
            />
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
          <div style={{ marginLeft: '1rem' }} className="floating">
            <img 
              src="/iskcon-logo.jpg" 
              alt="ISKCON Logo" 
              style={{ height: '40px', width: 'auto' }}
            />
          </div>
          
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
        backgroundColor: '#ea580c',
        color: 'white',
        padding: '0.75rem 0',
        overflow: 'hidden',
        position: 'relative',
        whiteSpace: 'nowrap'
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'scroll-announcement 20s linear infinite',
          fontSize: '1rem',
          fontWeight: '500'
        }}>
          Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students • Register for upcoming spiritual retreats • Follow us on social media for updates •
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

      {/* Add top margin for fixed header */}
      <div style={{ marginTop: '80px' }}>
        {/* Announcement Banner */}
        <div style={{
          backgroundColor: '#1e40af',
          color: 'white',
          padding: '12px 0',
          overflow: 'hidden',
          position: 'relative',
          borderBottom: '2px solid rgba(255, 255, 255, 0.2)'
        }} className="announcement-banner">
          <div style={{
            whiteSpace: 'nowrap',
            animation: 'scrollText 20s linear infinite',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            🎉 Welcome to ISKCON Student Center! Join our community for spiritual growth and learning 📚 Weekly programs available 🙏 Register now for upcoming events ✨
          </div>
        </div>

        {/* Image Carousel Section */}
        <section style={{
          position: 'relative',
          height: 'clamp(350px, 50vh, 600px)',
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
            {[
              // Your custom images from public folder
              '/krishna.jpg',
              '/mahaprabhu.jpg', 
              '/radhakrishna.jpg',
              '/siyaram.jpg',
              '/haran.jpeg',
              '/hogwarts.jpg',
              '/krishna.jpg' // Using krishna.jpg again for the 7th image
            ].map((imageUrl, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: currentSlide === index ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src={imageUrl}
                  alt={`ISKCON Image ${index + 1}: ${imageUrl.split('/')[1]}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.style.backgroundColor = `hsl(${index * 50}, 70%, 60%)`;
                    const imageName = imageUrl.split('/')[1] || `Image ${index + 1}`;
                    e.target.parentElement.innerHTML = `<div style="color: white; font-size: 2rem; font-weight: bold; text-align: center;">ISKCON<br/>${imageName}</div>`;
                  }}
                />
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
                  }}>�</span>
                </span>
                Explore Programs
              </a>
            </div>
          </div>

          {/* Carousel Navigation - Positioned outside content container */}
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
                setCurrentSlide(currentSlide === 0 ? 6 : currentSlide - 1);
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
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
              }}
            >
              ‹
            </button>

            {/* Indicators */}
            <div style={{ display: 'flex', gap: 'clamp(0.2rem, 1vw, 0.4rem)' }} className="indicators">
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
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
                setCurrentSlide(currentSlide === 6 ? 0 : currentSlide + 1);
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
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
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
              What We Offer
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }} className="animate-fadeInUp">
              Comprehensive spiritual development through study, practice, and community
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              alignItems: 'start'
            }} className="grid-responsive">
              
              {/* Spiritual Practices Column */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }} className="card-hover animate-fadeInUp">
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#ea580c',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  borderBottom: '2px solid #fed7aa',
                  paddingBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Spiritual Practices
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'Bhagavad Gita Study', desc: 'Weekly scripture discussions' },
                    { name: 'Japa Meditation', desc: 'Daily chanting practice' },
                    { name: 'Kirtan Sessions', desc: 'Devotional music & singing' },
                    { name: 'Temple Worship', desc: 'Deity darshan & prayers' }
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#fef7ed',
                      borderRadius: '8px',
                      borderLeft: '3px solid #ea580c'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#ea580c',
                        borderRadius: '50%',
                        marginRight: '1rem'
                      }}></div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0, color: '#111827' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community & Learning Column */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }} className="card-hover animate-fadeInUp">
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#ea580c',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  borderBottom: '2px solid #fed7aa',
                  paddingBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Community
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'Leadership Training', desc: 'Character development programs' },
                    { name: 'Spiritual Mentorship', desc: 'Personal guidance & counseling' },
                    { name: 'Youth Programs', desc: 'Age-appropriate activities' },
                    { name: 'Community Service', desc: 'Social outreach projects' }
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#fef7ed',
                      borderRadius: '8px',
                      borderLeft: '3px solid #ea580c'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#ea580c',
                        borderRadius: '50%',
                        marginRight: '1rem'
                      }}></div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0, color: '#111827' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Events & Lifestyle Column */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }} className="card-hover animate-fadeInUp">
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#ea580c',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  borderBottom: '2px solid #fed7aa',
                  paddingBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#ea580c',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px'
                  }}>🎉</span>
                  Events & Lifestyle
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'Festival Celebrations', desc: 'Traditional spiritual festivals' },
                    { name: 'Pilgrimage Tours', desc: 'Sacred place visits' },
                    { name: 'Healthy Lifestyle', desc: 'Yoga, meditation & wellness' },
                    { name: 'Prasadam Cooking', desc: 'Sacred food preparation' }
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#fef7ed',
                      borderRadius: '8px',
                      borderLeft: '3px solid #ea580c'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#ea580c',
                        borderRadius: '50%',
                        marginRight: '1rem'
                      }}></div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0, color: '#111827' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
              Daily Schedule
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {[
                { time: '4:30 AM', event: 'Mangala Arati & Tulasi Puja', desc: 'Morning prayer and worship' },
                { time: '5:00 AM', event: 'Japa Meditation', desc: 'Chanting of the Holy Name' },
                { time: '7:00 AM', event: 'Guru Puja & Kirtan', desc: 'Devotional songs and prayers' },
                { time: '8:00 AM', event: 'Srimad Bhagavatam Class', desc: 'Scripture study and discussion' },
                { time: '12:30 PM', event: 'Raj Bhoga Arati', desc: 'Midday offering to the deities' },
                { time: '1:00 PM', event: 'Prasadam', desc: 'Sacred vegetarian meal' },
                { time: '6:30 PM', event: 'Sandhya Arati', desc: 'Evening prayer ceremony' },
                { time: '7:00 PM', event: 'Evening Programs', desc: 'Special classes and discussions' }
              ].map((schedule, i) => (
                <div 
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: i % 2 === 0 ? '#f8fafc' : 'white',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    borderLeft: '4px solid #ea580c',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}
                  className="card-hover animate-fadeInUp"
                >
                  <div style={{
                    minWidth: '80px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#ea580c',
                    marginRight: '2rem'
                  }}>
                    {schedule.time}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.25rem'
                    }}>
                      {schedule.event}
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {schedule.desc}
                    </p>
                  </div>
                </div>
              ))}
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
              Our Facilities
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }} className="grid-responsive">
              {[
                { name: 'Prayer Hall', desc: 'Peaceful meditation space' },
                { name: 'Library', desc: 'Spiritual books & resources' },
                { name: 'Kitchen', desc: 'Prasadam preparation' },
                { name: 'Study Rooms', desc: 'Group discussions' }
              ].map((facility, i) => (
                <div 
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  className="card-hover animate-fadeInUp"
                >
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '700', 
                    marginBottom: '0.5rem',
                    color: '#ea580c'
                  }}>
                    {facility.name}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {facility.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
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
              width: '100%',
              height: '400px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }} className="animate-fadeInUp">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5466743621614!2d77.20813749999999!3d28.678913099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf53b2058b5%3A0x90ba420109930cec!2sISKCON%20student%20centre%20(%20DU%20BACE)!5e1!3m2!1sen!2sin!4v1754807751377!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
              Ready to Begin Your Journey?
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '3rem'
            }}>
              <div className="animate-fadeInUp">
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem', 
                  color: '#ff6b35',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Visit Us
                </h3>
                <p style={{ textAlign: 'center', lineHeight: '1.6', color: '#374151' }}>
                  26 Prem Niwas First Floor, Above Natural's Ice Cream,<br />
                  Malka Ganj, New Delhi, Delhi 110007
                </p>
              </div>
              
              <div className="animate-fadeInUp">
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem', 
                  color: '#ff6b35',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Connect
                </h3>
                <div style={{ textAlign: 'center' }}>
                  <a href="tel:+919876543210" style={{ 
                    color: '#ff6b35', 
                    textDecoration: 'none', 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    Phone: +91 98765 43210
                  </a>
                  <a href="https://instagram.com/iskcondelhiuniversity" style={{ 
                    color: '#ff6b35', 
                    textDecoration: 'none', 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    Instagram
                  </a>
                  <a href="https://youtube.com/@iskcondelhiuniversity" style={{ 
                    color: '#ff6b35', 
                    textDecoration: 'none', 
                    display: 'block',
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    YouTube
                  </a>
                </div>
              </div>
              
              <div className="animate-fadeInUp">
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem', 
                  color: '#ff6b35',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Join Now
                </h3>
                <a 
                  href="https://forms.google.com/your-form-id"
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
                  Start Your Journey
                </a>
              </div>
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
    </div>
  );
}
