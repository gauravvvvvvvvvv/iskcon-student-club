"use client";
import { DynamicCarousel, DynamicAnnouncements } from '../components/DynamicContent';

export default function Home() {
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
        
        /* Additional responsive styles */counselling
        @media (max-width: 768px) {
          .announcement-banner {
            font-size: 0.9rem !important;
            padding: 8px 0 !important;
          }
          
          .carousel-container {
            height: clamp(500px, 70vh, 750px) !important;
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
            height: clamp(450px, 60vh, 650px) !important;
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
          
          .founder-text {
            font-size: 0.3rem !important;
            line-height: 1.1 !important;
            letter-spacing: 0.2px !important;
            max-width: 100px !important;
          }
          
          .main-title {
            font-size: 0.65rem !important;
            line-height: 1.0 !important;
            word-break: break-word !important;
            white-space: normal !important;
          }
        }
        
        @media (max-width: 768px) {
          .founder-text {
            font-size: 0.35rem !important;
            line-height: 1.1 !important;
            letter-spacing: 0.25px !important;
            max-width: 110px !important;
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
        padding: '0.5rem 0'
      }} className="animate-slideInLeft">
        <div style={{ 
          width: '100%',
          display: 'flex', 
          alignItems: 'center',
          padding: '0 clamp(0.5rem, 2vw, 1rem)',
          flexWrap: 'nowrap',
          height: 'clamp(50px, 10vw, 60px)',
          justifyContent: 'space-between'
        }}>
          {/* Left corner - ISKCON and Prabhupada images with text */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.1rem, 1vw, 0.3rem)',
            flexShrink: 0,
            minWidth: '0'
          }}>
            <div style={{ 
              width: 'clamp(40px, 8vw, 70px)',
              height: 'clamp(40px, 8vw, 70px)',
              backgroundImage: "url('/image.png')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '50%'
            }} />
            <div style={{ 
              width: 'clamp(40px, 8vw, 70px)',
              height: 'clamp(40px, 8vw, 70px)',
              backgroundImage: "url('/prabhupada.jpg')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '50%'
            }} />
            <div className="founder-text" style={{
              fontSize: 'clamp(0.35rem, 1.2vw, 0.6rem)',
              fontWeight: '600',
              color: 'black',
              lineHeight: '1.1',
              textTransform: 'uppercase',
              letterSpacing: '0.3px',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
              maxWidth: '120px',
              textAlign: 'left'
            }}>
              FOUNDER ACHARYA: HDG AC BHAKTIVEDANTA SWAMI SRILA PRABHUPADA
            </div>
          </div>
          
          <div style={{ 
            flex: 1,
            textAlign: 'center',
            padding: '0 clamp(0.5rem, 2vw, 2rem)',
            minWidth: '0'
          }}>
            <h1 style={{ 
              fontSize: 'clamp(0.75rem, 2.5vw, 1.25rem)', 
              fontWeight: '700',
              letterSpacing: 'clamp(0.3px, 0.5vw, 0.5px)', 
              background: 'linear-gradient(135deg, #ea580c, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              lineHeight: '1.1',
              hyphens: 'auto'
            }} className="animate-fadeInUp main-title">
              ISKCON STUDENT CENTER
            </h1>
            <div style={{
              fontSize: 'clamp(0.6rem, 1.8vw, 0.8rem)',
              fontWeight: '500',
              color: '#6b7280',
              marginTop: '0.2rem',
              letterSpacing: 'clamp(0.5px, 1vw, 1px)'
            }}>
              DELHI UNIVERSITY
            </div>
          </div>
          
          {/* Right Image - ISKCON Logo */}
          <div style={{ 
            width: 'clamp(30px, 6vw, 40px)',
            height: 'clamp(30px, 6vw, 40px)',
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
              href="https://docs.google.com/forms/d/e/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform" 
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

      {/* Dynamic Announcement Section */}
      <DynamicAnnouncements />

      {/* Main Content Container */}
      <div>
        {/* Dynamic Image Carousel Section */}
        <DynamicCarousel />

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
                  Learning & Practice
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'Learning Gitä & Vedic Wisdom', desc: 'Structured study of sacred texts' },
                    { name: 'Chanting / Mantra Meditation', desc: 'Daily meditation practice' },
                    { name: 'Sattvik Lifestyle', desc: 'Balanced spiritual living' },
                    { name: 'Spreading Vedic Wisdom', desc: 'Sharing spiritual knowledge' },
                    { name: 'Mental Physical Detox', desc: 'Holistic wellness programs' }
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

              {/* Community & Support Column */}
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
                  Community & Support
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'Leadership Development', desc: 'Character & leadership building' },
                    { name: 'Spiritual Friendship', desc: 'Meaningful spiritual connections' },
                    { name: 'Personal Mentorship', desc: 'One-on-one spiritual guidance' },
                    { name: 'Spiritual Counseling', desc: 'Life guidance & support' },
                    { name: 'Prasadam', desc: 'Sacred vegetarian meals' }
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

              {/* Events & Experiences Column */}
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
                  Events & Activities
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { name: 'Kirtans / Cultural Events', desc: 'Devotional music & celebrations' },
                    { name: 'Dham Yatra', desc: 'Sacred pilgrimage journeys' },
                    { name: 'Debate', desc: 'Philosophical discussions' },
                    { name: 'Drama', desc: 'Spiritual theater & performances' },
                    { name: 'Competition', desc: 'Spiritual & cultural contests' }
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
              Program Schedule
            </h2>
            
            {/* Daily Schedule */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ea580c',
                textAlign: 'center',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Daily Schedule
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                {[
                  { time: '5:30 - 6:30 AM', event: 'Meditation', desc: 'Morning meditation session' },
                  { time: '6:30 AM', event: 'Aarti', desc: 'Sacred prayer ceremony' },
                  { time: '7:00 - 7:30 AM', event: 'Spiritual Discourses', desc: 'Inspiring spiritual teachings' }
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
                      minWidth: '120px',
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

            {/* Weekly Schedule */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ea580c',
                textAlign: 'center',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Weekly Schedule
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                {[
                  { time: 'Saturday 6-8 PM*', event: 'Weekly Program', desc: 'Special weekend spiritual gathering' },
                  { time: 'Sunday 6-8 PM*', event: 'Weekly Program', desc: 'Sunday evening spiritual activities' }
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
                      minWidth: '140px',
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
              
              {/* Note */}
              <p style={{
                textAlign: 'center',
                fontSize: '0.875rem',
                color: '#6b7280',
                fontStyle: 'italic',
                marginTop: '1.5rem'
              }}>
                * Subject to change
              </p>
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
                { name: 'Accommodation', desc: 'Student housing facilities' }
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
                <p style={{ textAlign: 'center', lineHeight: '1.6', color: '#e5e7eb' }}>
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
                  <a href="tel:+91 83183 42494" style={{ 
                    color: '#ff6b35', 
                    textDecoration: 'none', 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    Phone: +91 83183 42494
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
                  href="https://docs.google.com/forms/d/e/1FVlLR7QJUP-8BedM3oRQYFact6stIYMFFo0OKGzmWvg/viewform"
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
