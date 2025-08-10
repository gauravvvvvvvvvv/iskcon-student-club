"use client";
import { useState, useEffect } from 'react';

// Program data from your previous files
const programs = [
  { icon: '📖', title: 'Learning Gita & Vedic Wisdom', description: 'Structured deep dive into Bhagavad Gita & Vedic philosophy.' },
  { icon: '🧘', title: 'Chanting / Mantra Meditation', description: 'Daily japa & kirtan to sharpen focus and purify mind.' },
  { icon: '🎖️', title: 'Leadership Development', description: 'Cultivating responsibility, clarity & servant-leadership.' },
  { icon: '👥', title: 'Spiritual Friendship', description: 'Uplifting association & accountability circles.' },
  { icon: '🎵', title: 'Kirtans / Festivals', description: 'High-energy devotional music & cultural celebrations.' },
  { icon: '🤝', title: 'Personal Mentorship', description: 'One-on-one guidance for growth & sadhana alignment.' },
  { icon: '🥾', title: 'Dham Yatra', description: 'Transformative pilgrimages to sacred holy places.' },
  { icon: '💆', title: 'Sattvik Lifestyle', description: 'Balanced routine: purity, nutrition, discipline & seva.' },
  { icon: '📚', title: 'Spreading Vedic Wisdom', description: 'Outreach, seminars & distribution of sacred texts.' },
  { icon: '🎧', title: 'Spiritual Counseling', description: 'Support for life decisions & inner emotional balance.' },
  { icon: '🏠', title: 'Accommodation', description: 'Focused spiritual student residential environment.' },
  { icon: '🍽️', title: 'Prasadam', description: 'Wholesome sanctified vegetarian nourishment.' },
  { icon: '❤️', title: 'Mental / Physical Detox', description: 'Habit reset using mantra, regulated sleep & diet.' },
  { icon: '⚖️', title: 'Debate Circles', description: 'Structured philosophical dialogue & reasoning.' },
  { icon: '🎭', title: 'Drama', description: 'Devotional theater & expressive arts seva.' },
  { icon: '🏆', title: 'Competitions', description: 'Quizzes, recitation & character challenges.' },
];

const facilities = [
  { icon: '🏠', title: 'Accommodation', description: 'Comfortable, focused student living.' },
  { icon: '🏛️', title: 'Library', description: 'Spiritual & academic study space.' },
  { icon: '🍴', title: 'Dining Hall', description: 'Nutritious daily prasadam meals.' },
  { icon: '💆', title: 'Meditation Hall', description: 'Quiet space for reflection & prayer.' },
];

const schedule = [
  { time: '5:00 AM', activity: 'Morning Prayer & Meditation' },
  { time: '6:00 AM', activity: 'Yoga & Exercise' },
  { time: '7:30 AM', activity: 'Breakfast Prasadam' },
  { time: '9:00 AM', activity: 'Bhagavad Gita Class' },
  { time: '12:00 PM', activity: 'Lunch & Rest' },
  { time: '4:00 PM', activity: 'Cultural Activities' },
  { time: '6:00 PM', activity: 'Evening Kirtan' },
  { time: '7:30 PM', activity: 'Dinner Prasadam' },
  { time: '9:00 PM', activity: 'Personal Study & Rest' },
];

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
          <div style={{ 
            marginRight: '1rem',
            width: '40px',
            height: '40px',
            backgroundImage: "url('/prabhupada.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} className="floating" />
          
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
            width: '40px',
            height: '40px',
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
            Welcome to ISKCON Student Center! Join our community for spiritual growth and learning • Weekly programs available • Register now for upcoming events •
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
                backgroundSize: 'contain',
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
                backgroundSize: 'contain',
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
                backgroundSize: 'contain',
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
                backgroundSize: 'contain',
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
                backgroundSize: 'contain',
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
                backgroundSize: 'contain',
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
                backgroundImage: "url('/mahaprabhu 2.jpg')",
                backgroundSize: 'contain',
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
          background: 'linear-gradient(135deg, #ffffff 0%, #fff9f2 50%, #fef3e7 100%)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(245,158,11,0.05), transparent 50%)',
            pointerEvents: 'none'
          }} />
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ 
                fontSize: '0.875rem', 
                fontWeight: '700', 
                color: '#ea580c', 
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '0.5rem'
              }}>
                FEATURES
              </p>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                marginBottom: '1rem',
                letterSpacing: '-1px',
                color: '#111827'
              }}>
                Holistic Offerings
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                maxWidth: '780px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Integrated spiritual ecosystem: learning, meditation, leadership, friendship, lifestyle transformation and joyful seva.
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'start'
            }}>
              {programs.map((program, i) => (
                <div 
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '24px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
                    border: 'none',
                    background: 'linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="card-hover"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.08)';
                    const topBar = e.currentTarget.querySelector('.top-bar');
                    if (topBar) topBar.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)';
                    const topBar = e.currentTarget.querySelector('.top-bar');
                    if (topBar) topBar.style.opacity = '0';
                  }}
                >
                  <div 
                    className="top-bar"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #ea580c, #f59e0b)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }} 
                  />
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fed7aa',
                    color: '#ea580c',
                    boxShadow: '0 2px 6px rgba(234,88,12,0.35)',
                    marginBottom: '1rem',
                    fontSize: '1.2rem'
                  }}>
                    {program.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '700',
                    marginBottom: '0.75rem',
                    color: '#111827',
                    lineHeight: '1.4'
                  }}>
                    {program.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.45'
                  }}>
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" style={{ 
          padding: '4rem 2rem', 
          position: 'relative', 
          background: 'linear-gradient(135deg, #fef3c7, #fff)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 85% 15%, rgba(245,158,11,0.08), transparent 55%)'
          }} />
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ 
                fontSize: '0.875rem', 
                fontWeight: '700', 
                color: '#ea580c', 
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '0.5rem'
              }}>
                DAILY FLOW
              </p>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                marginBottom: '1rem',
                letterSpacing: '-1px',
                color: '#111827'
              }}>
                Daily Schedule
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                maxWidth: '640px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Balanced routine blending meditation, study, service, culture and personal development.
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(8px)'
            }}>
              <div>
                {schedule.map((item, idx) => (
                  <div key={idx}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 0'
                    }}>
                      <div style={{
                        minWidth: '48px',
                        marginRight: '1rem',
                        display: 'flex',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>⏰</span>
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <p style={{ 
                          fontWeight: '700', 
                          color: '#ea580c',
                          margin: 0,
                          marginBottom: '0.25rem'
                        }}>
                          {item.time}
                        </p>
                        <p style={{ 
                          color: '#111827', 
                          fontWeight: '500',
                          margin: 0
                        }}>
                          {item.activity}
                        </p>
                      </div>
                    </div>
                    {idx < schedule.length - 1 && (
                      <div style={{
                        height: '1px',
                        backgroundColor: '#e5e7eb',
                        margin: '0 3rem'
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" style={{ 
          padding: '4rem 2rem', 
          position: 'relative', 
          background: 'linear-gradient(135deg, #fff, #fef9e7)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 15% 20%, rgba(245,158,11,0.08), transparent 55%)'
          }} />
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ 
                fontSize: '0.875rem', 
                fontWeight: '700', 
                color: '#ea580c', 
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '0.5rem'
              }}>
                FACILITIES
              </p>
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                marginBottom: '1rem',
                letterSpacing: '-1px',
                color: '#111827'
              }}>
                Your Spiritual Campus
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Spaces designed to nurture reflection, community, health and growth.
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {facilities.map((facility, i) => (
                <div 
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px -4px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fed7aa',
                    color: '#ea580c',
                    boxShadow: '0 2px 5px rgba(234,88,12,0.3)',
                    margin: '0 auto 1rem auto',
                    fontSize: '1.2rem'
                  }}>
                    {facility.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '700',
                    marginBottom: '0.75rem',
                    color: '#111827'
                  }}>
                    {facility.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.45'
                  }}>
                    {facility.description}
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
          background: 'linear-gradient(135deg, #fff, #fffbf0)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08), transparent 60%)'
          }} />
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '3rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '700', 
                  color: '#ea580c', 
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '0.5rem'
                }}>
                  CONNECT
                </p>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800', 
                  marginBottom: '1rem',
                  letterSpacing: '-1px',
                  color: '#111827'
                }}>
                  Get In Touch
                </h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📱</span>
                  <a 
                    href="tel:+918318342494" 
                    style={{ 
                      color: '#ea580c', 
                      textDecoration: 'none', 
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    +91 83183 42494
                  </a>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📍</span>
                  <p style={{ 
                    maxWidth: '320px',
                    lineHeight: '1.6',
                    color: '#4b5563',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    26 Prem Niwas First Floor, Above Natural's Ice Cream, Malka Ganj, New Delhi, Delhi 110007
                  </p>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📸</span>
                  <a 
                    href="https://instagram.com/iskcondelhiuniversity" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#ea580c', 
                      textDecoration: 'none', 
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    @iskcondelhiuniversity
                  </a>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>📺</span>
                  <a 
                    href="https://youtube.com/@ISKCONDelhiUniversity" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#ea580c', 
                      textDecoration: 'none', 
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    @ISKCONDelhiUniversity
                  </a>
                </div>
              </div>
              
              <a 
                href="https://instagram.com/iskcondelhiuniversity"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#ea580c',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  display: 'inline-block',
                  marginTop: '2rem',
                  fontSize: '1.1rem'
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
    </div>
  );
}
