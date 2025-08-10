"use client";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
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
          position: relative;
          overflow: hidden;
        }
        
        .button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
        }
        
        .button-primary:active {
          transform: translateY(0);
        }
        
        .material-icon {
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #ff6b35;
          font-weight: bold;
          font-size: 14px;
          margin-right: 12px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        
        .material-icon.prayer { background: linear-gradient(135deg, #ff9a9e, #fecfef); }
        .material-icon.book { background: linear-gradient(135deg, #a8edea, #fed6e3); }
        .material-icon.music { background: linear-gradient(135deg, #d299c2, #fef9d7); }
        .material-icon.community { background: linear-gradient(135deg, #89f7fe, #66a6ff); }
        .material-icon.event { background: linear-gradient(135deg, #fdbb2d, #22c1c3); }
        .material-icon.food { background: linear-gradient(135deg, #ff9a9e, #fad0c4); }
        
        .material-icon.gym { background: linear-gradient(135deg, #667eea, #764ba2); }
        .material-icon.library { background: linear-gradient(135deg, #f093fb, #f5576c); }
        .material-icon.cafe { background: linear-gradient(135deg, #4facfe, #00f2fe); }
        .material-icon.hall { background: linear-gradient(135deg, #43e97b, #38f9d7); }
        .material-icon.garden { background: linear-gradient(135deg, #fa709a, #fee140); }
        .material-icon.parking { background: linear-gradient(135deg, #a8edea, #fed6e3); }
        
        .material-icon.phone { background: linear-gradient(135deg, #667eea, #764ba2); }
        .material-icon.instagram { background: linear-gradient(135deg, #f093fb, #f5576c); }
        .material-icon.youtube { background: linear-gradient(135deg, #ff4b1f, #ff9068); }
        
        .hero-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b35 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 768px) {
          .grid-2-col {
            grid-template-columns: 1fr !important;
          }
          .hero-text {
            font-size: 1.5rem !important;
          }
          .nav-desktop {
            display: none !important;
          }
        }
      `}</style>
      
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
        padding: '1rem 0',
        transition: 'all 0.3s ease'
      }} className="animate-slideInLeft">
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center',
          padding: '0 2rem'
        }}>
          {/* Left Image - Prabhupada */}
          <div style={{ marginRight: '1rem' }} className="floating">
            <img 
              src="/prabhupada.svg" 
              alt="Srila Prabhupada" 
              style={{ height: '40px', width: 'auto', transition: 'transform 0.3s ease' }}
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
            backgroundClip: 'text',
            margin: 0,
            textAlign: 'center'
          }} className="animate-fadeInUp">
            INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS
          </h1>
          
          {/* Right Image - ISKCON Logo */}
          <div style={{ marginRight: '2rem' }} className="floating">
            <img 
              src="/iskcon-logo.svg" 
              alt="ISKCON Logo" 
              style={{ height: '40px', width: 'auto', transition: 'transform 0.3s ease' }}
            />
          </div>
          
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} className="nav-desktop">
            <a href="#programs" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600' }}>Programs</a>
            <a href="#schedule" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600' }}>Schedule</a>
            <a href="#facilities" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600' }}>Facilities</a>
            <a href="#location" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600' }}>Location</a>
            <a href="#contact" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: '600' }}>Contact</a>
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
                marginLeft: '1rem'
              }}
            >
              Join Now
            </a>
          </nav>
        </div>
      </header>

      {/* Add top margin for fixed header */}
      <div style={{ marginTop: '80px' }}>
        {/* Hero Section */}
        <section style={{
          padding: '6rem 2rem',
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fff3cd 100%)',
          position: 'relative',
          overflow: 'hidden'
        }} className="hero-gradient">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Image placeholders row */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '3rem' 
            }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '16px 0 0 0', 
                backgroundColor: '#fed7aa', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }} className="animate-slideInLeft card-hover floating">
                <img 
                  src="/prabhupada.svg" 
                  alt="Prabhupada" 
                  style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                />
              </div>
              
              <div style={{ textAlign: 'center', flexGrow: 1, padding: '0 2rem' }} className="animate-fadeInUp">
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '900', 
                  marginBottom: '1rem',
                  background: 'linear-gradient(45deg, #ea580c, #f97316, #fb923c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(234, 88, 12, 0.3)',
                  margin: 0
                }} className="hero-text">
                  INTERNATIONAL SOCIETY FOR KRISHNA CONSCIOUSNESS
                </h2>
              </div>
              
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '0 16px 0 0', 
                backgroundColor: '#fed7aa', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }} className="animate-slideInRight card-hover floating">
                <img 
                  src="/iskcon-logo.svg" 
                  alt="ISKCON Logo" 
                  style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                />
              </div>
            </div>

            <p style={{
              fontSize: '1.25rem',
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem auto',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              A nurturing hub for students to explore devotion, character, wisdom and joyful service through authentic Bhakti Yoga practices.
            </p>

            {/* CTA Buttons */}
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
                  backgroundColor: '#ea580c',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  marginRight: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                className="button-primary animate-fadeInUp"
              >
                ✨ Join Now
              </a>
              <a 
                href="#programs"
                style={{
                  border: '2px solid #ea580c',
                  color: '#ea580c',
                  backgroundColor: 'transparent',
                  padding: '1rem 2rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                className="card-hover animate-fadeInUp"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ea580c';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ea580c';
                }}
              >
                📚 Explore Programs
              </a>
            </div>

            {/* Stats */}
            <div style={{ 
              display: 'flex', 
              gap: '3rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ea580c' }}>250+</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600' }}>Active Students</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ea580c' }}>365</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600' }}>Days / Year</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ea580c' }}>100%</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600' }}>Authentic</div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" style={{ 
          padding: '4rem 2rem', 
          backgroundColor: '#f9fafb',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              textAlign: 'center', 
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #111827, #374151)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { icon: 'book', title: 'Gita Study', desc: 'Vedic wisdom & philosophy' },
                { icon: 'prayer', title: 'Meditation', desc: 'Daily japa & mindfulness' },
                { icon: 'community', title: 'Leadership', desc: 'Character development' },
                { icon: 'community', title: 'Community', desc: 'Spiritual friendship' },
                { icon: 'music', title: 'Kirtans', desc: 'Music & festivals' },
                { icon: 'book', title: 'Mentorship', desc: 'Personal guidance' },
                { icon: 'event', title: 'Pilgrimage', desc: 'Sacred journeys' },
                { icon: 'food', title: 'Lifestyle', desc: 'Balanced living' },
                { icon: 'community', title: 'Outreach', desc: 'Share wisdom' },
                { icon: 'prayer', title: 'Counseling', desc: 'Life guidance' },
                { icon: 'food', title: 'Housing', desc: 'Student residence' },
                { icon: 'food', title: 'Prasadam', desc: 'Sacred meals' }
              ].map((program, i) => (
                <div 
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 107, 53, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  className="card-hover animate-fadeInUp"
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #ff6b35, #f7931e)'
                  }}></div>
                  
                  <div className={`material-icon ${program.icon}`} style={{ 
                    margin: '0 auto 1rem auto',
                    width: '60px',
                    height: '60px',
                    fontSize: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    ✦
                  </div>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '700', 
                    marginBottom: '0.5rem',
                    color: '#111827'
                  }}>
                    {program.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {program.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" style={{ 
          padding: '4rem 2rem', 
          background: 'linear-gradient(135deg, #fff7ed, #fff)' 
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              textAlign: 'center', 
              marginBottom: '0.5rem',
              color: '#111827'
            }}>
              Daily Schedule
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              Structured spiritual practice throughout the day
            </p>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              {[
                { time: '5:00 AM', activity: 'Morning Prayer & Meditation' },
                { time: '6:00 AM', activity: 'Yoga & Exercise' },
                { time: '7:30 AM', activity: 'Breakfast Prasadam' },
                { time: '9:00 AM', activity: 'Bhagavad Gita Class' },
                { time: '12:00 PM', activity: 'Lunch & Rest' },
                { time: '4:00 PM', activity: 'Cultural Activities' },
                { time: '6:00 PM', activity: 'Evening Kirtan' },
                { time: '7:30 PM', activity: 'Dinner Prasadam' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem 1.5rem',
                    borderBottom: idx < 7 ? '1px solid #e5e7eb' : 'none'
                  }}
                >
                  <div style={{ 
                    width: '80px', 
                    flexShrink: 0,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#ea580c'
                  }}>
                    {item.time}
                  </div>
                  <div style={{ 
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {item.activity}
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
              marginBottom: '0.5rem',
              color: '#111827'
            }}>
              Our Facilities
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }}>
              Modern amenities designed to support your spiritual and academic journey
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: 'ACC', title: 'Accommodation', desc: 'Comfortable student housing with spiritual atmosphere' },
                { icon: 'LIB', title: 'Library', desc: 'Extensive collection of spiritual and academic texts' },
                { icon: 'FOOD', title: 'Dining Hall', desc: 'Fresh prasadam meals prepared with devotion' },
                { icon: 'MED', title: 'Meditation Hall', desc: 'Peaceful space for prayer and contemplation' },
                { icon: 'MUS', title: 'Kirtan Hall', desc: 'Sacred space for devotional music and dance' },
                { icon: 'FIT', title: 'Fitness Center', desc: 'Holistic wellness and yoga facilities' }
              ].map((facility, i) => (
                <div 
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    background: 'linear-gradient(145deg, #ffffff 0%, #fef7ed 100%)',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(234,88,12,0.15)';
                    e.currentTarget.style.borderColor = '#ea580c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#fed7aa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#ea580c'
                  }}>
                    {facility.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    marginBottom: '1rem',
                    color: '#111827'
                  }}>
                    {facility.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {facility.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Map Section */}
        <section id="location" style={{ 
          padding: '5rem 2rem', 
          background: 'linear-gradient(135deg, #fff7ed, #ffffff)' 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              textAlign: 'center', 
              marginBottom: '0.5rem',
              color: '#111827'
            }}>
              Visit Our Center
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: '4rem',
              maxWidth: '600px',
              margin: '0 auto 4rem auto'
            }}>
              Located in the heart of North Delhi, easily accessible from all DU colleges
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '3rem',
              alignItems: 'stretch'
            }} className="grid-2-col">
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{
                  backgroundColor: '#ea580c',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  alignSelf: 'flex-start',
                  marginBottom: '1.5rem'
                }}>
                  FIND US
                </div>
                
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#111827'
                }}>
                  Easy to Reach
                </h3>
                
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#6b7280', 
                  lineHeight: '1.7',
                  marginBottom: '2rem'
                }}>
                  We are located in the heart of North Delhi, easily reachable from Delhi University colleges. 
                  Drop in for a class, kirtan, meditation or just a peaceful study break with prasadam.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#ea580c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: '700',
                      marginTop: '2px',
                      flexShrink: 0
                    }}>
                      LOC
                    </div>
                    <div>
                      <h4 style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '700', 
                        color: '#ea580c', 
                        marginBottom: '0.25rem',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Address
                      </h4>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        lineHeight: '1.5',
                        color: '#374151',
                        margin: 0
                      }}>
                        ISKCON STUDENT CENTER, 1ST FLOOR, OPPOSITE HANSRAJ COLLEGE, 
                        ABOVE NATURAL'S ICE CREAM, NEAR STARBUCKS, KAMLA NAGAR, DELHI 110007
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#ea580c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: '700',
                      flexShrink: 0
                    }}>
                      TEL
                    </div>
                    <div>
                      <h4 style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '700', 
                        color: '#ea580c', 
                        marginBottom: '0.25rem',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Phone
                      </h4>
                      <a 
                        href="tel:+918318342494" 
                        style={{
                          color: '#ea580c',
                          fontWeight: '600',
                          textDecoration: 'none',
                          fontSize: '0.875rem'
                        }}
                      >
                        +91 83183 42494
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '400px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <iframe
                  title="ISKCON Student Center Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.5466743621614!2d77.20813749999999!3d28.678913099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdf53b2058b5%3A0x90ba420109930cec!2sISKCON%20student%20centre%20(%20DU%20BACE)!5e1!3m2!1sen!2sin!4v1754795768086!5m2!1sen!2sin"
                  style={{ 
                    border: 0, 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%' 
                  }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section id="contact" style={{ 
          padding: '5rem 2rem', 
          background: 'linear-gradient(135deg, #ea580c 0%, #ff7f3f 50%, #ffa41b 100%)',
          color: 'white'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }} className="grid-2-col">
              <div>
                <h2 style={{ 
                  fontSize: '3rem', 
                  fontWeight: '900', 
                  marginBottom: '1rem',
                  color: 'white',
                  margin: '0 0 1rem 0'
                }}>
                  Ready to Begin Your Journey?
                </h2>
                <p style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '2rem', 
                  opacity: 0.95, 
                  lineHeight: '1.6',
                  margin: '0 0 2rem 0'
                }}>
                  Join hundreds of students discovering their spiritual potential through ancient wisdom and modern learning.
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  marginBottom: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <a 
                    href="https://forms.google.com/your-form-id"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: 'white',
                      color: '#ea580c',
                      padding: '1rem 2rem',
                      borderRadius: '999px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '1.1rem'
                    }}
                  >
                    Join Now
                  </a>
                  <a 
                    href="#programs"
                    style={{
                      border: '2px solid white',
                      color: 'white',
                      backgroundColor: 'transparent',
                      padding: '1rem 2rem',
                      borderRadius: '999px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '1.1rem'
                    }}
                  >
                    Explore Programs
                  </a>
                </div>
              </div>
              
              <div>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  padding: '2rem',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  color: '#111827'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: '1.5rem', 
                    textAlign: 'center',
                    color: '#111827',
                    margin: '0 0 1.5rem 0'
                  }}>
                    Connect With Us
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <a
                      href="tel:+918318342494"
                      style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        textAlign: 'center',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#111827',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#dcfce7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#059669'
                      }}>
                        CALL
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '700', 
                        color: '#6b7280',
                        marginBottom: '0.25rem'
                      }}>
                        Call Us
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '600', 
                        color: '#059669'
                      }}>
                        +91 83183 42494
                      </div>
                    </a>
                    
                    <a
                      href="https://instagram.com/iskcondelhiuniversity"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        textAlign: 'center',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#111827',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#fecaca',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#dc2626'
                      }}>
                        INSTA
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '700', 
                        color: '#6b7280',
                        marginBottom: '0.25rem'
                      }}>
                        Follow
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '600', 
                        color: '#dc2626'
                      }}>
                        @iskcondelhiuniversity
                      </div>
                    </a>
                  </div>
                  
                  <a
                    href="https://youtube.com/@ISKCONDelhiUniversity"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      textAlign: 'center',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: '#111827',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      display: 'block',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#2563eb'
                    }}>
                      YT
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '700', 
                      color: '#6b7280',
                      marginBottom: '0.25rem'
                    }}>
                      Subscribe
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#2563eb'
                    }}>
                      @ISKCONDelhiUniversity
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ 
          padding: '2rem', 
          borderTop: '1px solid #e5e7eb', 
          backgroundColor: 'white' 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              textAlign: 'center',
              margin: 0
            }}>
              © {new Date().getFullYear()} ISKCON Student Center. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
