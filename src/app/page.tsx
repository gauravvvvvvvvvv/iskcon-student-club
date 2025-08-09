
'use client';
import React from 'react';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#222',
    }}>
      {/* Minimal AppBar */}
      <nav style={{
        width: '100%',
        background: '#fff',
        borderBottom: '1px solid #eee',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '0.5rem 0',
      }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
        }}>
          <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#ea580c', letterSpacing: 1 }}>ISKCON Student Center</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Home', 'Programs', 'Schedule', 'Facilities', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: '#ea580c',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fff7ed'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: '#fff',
        padding: '3rem 0 2rem 0',
        borderBottom: '1px solid #f3f3f3',
      }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem',
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: '#fff7ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 24,
            color: '#ea580c',
            marginBottom: 8,
            boxShadow: '0 2px 8px rgba(234,88,12,0.07)'
          }}>🕉️</div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            margin: 0,
            color: '#ea580c',
            letterSpacing: 1,
          }}>
            Welcome to ISKCON Student Center
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#444',
            maxWidth: 540,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Transform your life through ancient wisdom, spiritual practices, and a supportive community.
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              background: '#ea580c',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.1rem',
              borderRadius: 24,
              padding: '0.75rem 2.5rem',
              marginTop: 16,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(234,88,12,0.10)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#c2410c'}
            onMouseLeave={e => e.currentTarget.style.background = '#ea580c'}
          >
            Join Now
          </a>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(234, 88, 12, 0.1)',
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: '3rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {['Home', 'Programs', 'Schedule', 'Facilities', 'Events', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#ea580c',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '1rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #ea580c, #f59e0b)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(234, 88, 12, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#ea580c';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Programs Section */}
      <section id="programs" style={{
        background: '#f8fafc',
        padding: '3rem 0',
      }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ea580c',
            marginBottom: 8,
            letterSpacing: 0.5,
          }}>
            Our Programs
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#555',
            marginBottom: 32,
            maxWidth: 540,
            margin: '0 auto',
          }}>
            Discover transformative spiritual programs designed for modern students.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginTop: 24,
          }}>
            {[
              { icon: '🎓', title: 'Bhagavad Gita Classes', description: 'Ancient wisdom for modern life.' },
              { icon: '🧘', title: 'Meditation & Yoga', description: 'Authentic meditation and yoga for focus.' },
              { icon: '🎵', title: 'Kirtan & Music', description: 'Devotional music and chanting.' },
              { icon: '🍽️', title: 'Prasadam Service', description: 'Sanctified food and conscious eating.' },
              { icon: '📚', title: 'Spiritual Literature', description: 'Sacred texts and book clubs.' },
              { icon: '🎭', title: 'Cultural Programs', description: 'Festivals, drama, and celebrations.' },
            ].map((program, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  padding: '2rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  minHeight: 180,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{program.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#ea580c', marginBottom: 4 }}>{program.title}</div>
                <div style={{ color: '#444', fontSize: '0.98rem', textAlign: 'center' }}>{program.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #fef7ff 0%, #fdf4ff 50%, #faf5ff 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            color: '#ea580c',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Facilities
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem auto'
          }}>
            Modern amenities for your spiritual and academic journey
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '🏠', title: 'Accommodation', description: 'Comfortable living spaces designed for students' },
              { icon: '📖', title: 'Library', description: 'Extensive collection of spiritual and academic books' },
              { icon: '🍴', title: 'Dining Hall', description: 'Nutritious prasadam meals served daily' },
              { icon: '🧘', title: 'Meditation Hall', description: 'Peaceful spaces for prayer and meditation' }
            ].map((facility, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(234, 88, 12, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{facility.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ea580c', marginBottom: '0.5rem' }}>
                  {facility.title}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.5' }}>{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" style={{
        padding: '6rem 2rem',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            color: '#ea580c',
            marginBottom: '4rem',
            background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Daily Schedule
          </h2>

          <div style={{
            background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)',
            borderRadius: '2rem',
            padding: '3rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            {[
              { time: '5:00 AM', activity: 'Morning Prayer & Meditation' },
              { time: '6:00 AM', activity: 'Yoga & Exercise' },
              { time: '7:30 AM', activity: 'Breakfast Prasadam' },
              { time: '9:00 AM', activity: 'Bhagavad Gita Class' },
              { time: '12:00 PM', activity: 'Lunch & Rest' },
              { time: '4:00 PM', activity: 'Cultural Activities' },
              { time: '6:00 PM', activity: 'Evening Kirtan' },
              { time: '7:30 PM', activity: 'Dinner Prasadam' },
              { time: '9:00 PM', activity: 'Personal Study & Rest' }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: index < 8 ? '1px solid rgba(234, 88, 12, 0.2)' : 'none',
                  fontSize: '1.125rem'
                }}
              >
                <span style={{ fontWeight: '700', color: '#ea580c' }}>{item.time}</span>
                <span style={{ color: '#374151' }}>{item.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        background: '#fff',
        padding: '3rem 0',
        borderTop: '1px solid #f3f3f3',
      }}>
        <div style={{
          maxWidth: 540,
          margin: '0 auto',
          textAlign: 'center',
          borderRadius: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          background: '#fff',
          padding: '2.5rem 1.5rem',
        }}>
          <h2 style={{
            fontSize: '1.7rem',
            fontWeight: 700,
            color: '#ea580c',
            marginBottom: 16,
            letterSpacing: 0.5,
          }}>
            Get in Touch
          </h2>
          <div style={{ color: '#444', fontSize: '1.08rem', marginBottom: 18 }}>
            <div style={{ marginBottom: 8 }}><b>📞 Phone:</b> +91 83183 42494</div>
            <div style={{ marginBottom: 8 }}><b>📍 Address:</b> Near Delhi University, North Campus</div>
            <div><b>📱 Instagram:</b> @iskcondelhiuniversity</div>
          </div>
          <a
            href="https://instagram.com/iskcondelhiuniversity"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#ea580c',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1.1rem',
              borderRadius: 24,
              padding: '0.75rem 2.5rem',
              marginTop: 16,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(234,88,12,0.10)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#c2410c'}
            onMouseLeave={e => e.currentTarget.style.background = '#ea580c'}
          >
            Join Our Community
          </a>
        </div>
      </section>
    </div>
  );
}
