import React from 'react';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fed7aa 0%, #fef3c7 100%)' }}>
      {/* Header with Image Spaces and CTA */}
      <header style={{ 
        position: 'relative', 
        background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{ 
          position: 'absolute', 
          inset: '0', 
          opacity: '0.1',
          background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>
        
        {/* Top Left Image Space */}
        <div style={{ 
          position: 'absolute', 
          top: '1.5rem', 
          left: '1.5rem', 
          width: '5rem', 
          height: '5rem', 
          background: 'rgba(255,255,255,0.2)', 
          backdropFilter: 'blur(10px)',
          border: '2px dashed rgba(255,255,255,0.5)', 
          borderRadius: '0.75rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: '500' }}>Logo</span>
        </div>
        
        {/* Top Right Image Space */}
        <div style={{ 
          position: 'absolute', 
          top: '1.5rem', 
          right: '1.5rem', 
          width: '5rem', 
          height: '5rem', 
          background: 'rgba(255,255,255,0.2)', 
          backdropFilter: 'blur(10px)',
          border: '2px dashed rgba(255,255,255,0.5)', 
          borderRadius: '0.75rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: '500' }}>Image</span>
        </div>

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
              fontWeight: '700', 
              color: 'white', 
              marginBottom: '1.5rem', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)' 
            }}>
              Welcome to the
            </h1>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 6vw, 3rem)', 
              fontWeight: '700', 
              color: '#fef3c7', 
              marginBottom: '2rem', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)' 
            }}>
              ISKCON Student Center
            </h2>
            <p style={{ 
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
              color: '#fed7aa', 
              marginBottom: '2.5rem', 
              maxWidth: '64rem', 
              margin: '0 auto 2.5rem auto', 
              lineHeight: '1.6' 
            }}>
              A comprehensive platform for spiritual growth, learning, and community building
            </p>
            
            {/* Prominent Join Now Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <button style={{ 
                position: 'relative',
                background: 'white', 
                color: '#ea580c', 
                fontWeight: '700', 
                padding: '1rem 2.5rem', 
                borderRadius: '1rem', 
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.125rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                transform: 'scale(1)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}>
                🙏 Join Our Community
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fed7aa' }}>
                <span>📞</span>
                <span style={{ fontWeight: '500' }}>+91 83183 42494</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Navigation */}
      <nav style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
        position: 'sticky', 
        top: '0', 
        zIndex: '50', 
        borderBottom: '1px solid #fed7aa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '1.5rem 0' }}>
            {['Programs', 'Events', 'Accommodation', 'Schedule', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                style={{ 
                  color: '#c2410c', 
                  fontWeight: '600', 
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#ea580c';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'rgba(234, 88, 12, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = '#c2410c';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'transparent';
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Programs Section */}
      <section id="programs" style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3rem)', 
              fontWeight: '700', 
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>
              Our Programs & Services
            </h2>
            <div style={{ 
              width: '6rem', 
              height: '0.25rem', 
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
              margin: '0 auto', 
              borderRadius: '0.125rem' 
            }}></div>
          </div>
          
          {/* Core Spiritual Programs */}
          <div style={{ marginBottom: '5rem' }}>
            <h3 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              color: '#374151', 
              marginBottom: '3rem', 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Spiritual Development
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                { icon: '📖', title: 'Learning Gītā & Vedic Wisdom', desc: 'Deep study of Bhagavad Gītā and ancient Vedic scriptures with experienced mentors' },
                { icon: '🙏', title: 'Chanting / Mantra Meditation', desc: 'Learn the art of mantra meditation and experience inner peace through chanting' },
                { icon: '🧘', title: 'Spiritual Counseling', desc: 'Professional guidance for life-related problems through spiritual wisdom' }
              ].map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '1.5rem', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                    border: '1px solid #fed7aa',
                    transition: 'all 0.5s ease',
                    transform: 'translateY(0)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(234, 88, 12, 0.15)';
                    e.currentTarget.style.borderColor = '#f59e0b';
                    const bar = e.currentTarget.querySelector('.progress-bar');
                    if (bar) bar.style.transform = 'scaleX(1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = '#fed7aa';
                    const bar = e.currentTarget.querySelector('.progress-bar');
                    if (bar) bar.style.transform = 'scaleX(0)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem', transition: 'transform 0.3s ease' }}>
                    {item.icon}
                  </div>
                  <h4 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#374151', 
                    marginBottom: '1rem',
                    transition: 'color 0.3s ease'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.desc}</p>
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: '100%', 
                      height: '0.25rem', 
                      background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
                      borderRadius: '0.125rem',
                      transform: 'scaleX(0)',
                      transition: 'transform 0.5s ease',
                      transformOrigin: 'left'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Development */}
          <div style={{ marginBottom: '5rem' }}>
            <h3 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              marginBottom: '3rem', 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Personal Development
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                { icon: '👑', title: 'Leadership Development', desc: 'Develop leadership skills through Vedic principles and practical training' },
                { icon: '🤝', title: 'Personal Mentorship', desc: 'One-on-one guidance from experienced devotees and spiritual mentors' },
                { icon: '🌱', title: 'Sattvik Lifestyle', desc: 'Learn to live a pure, balanced lifestyle according to Vedic principles' }
              ].map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '1.5rem', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                    border: '1px solid #fed7aa',
                    transition: 'all 0.5s ease',
                    transform: 'translateY(0)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(234, 88, 12, 0.15)';
                    e.currentTarget.style.borderColor = '#f59e0b';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = '#fed7aa';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#374151', marginBottom: '1rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Community & Cultural */}
          <div style={{ marginBottom: '5rem' }}>
            <h3 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              marginBottom: '3rem', 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Community & Culture
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                { icon: '❤️', title: 'Spiritual Friendship', desc: 'Build meaningful relationships with like-minded spiritual practitioners' },
                { icon: '🎵', title: 'Kirtans & Cultural Events', desc: 'Experience devotional music, festivals, and cultural celebrations' },
                { icon: '🌍', title: 'Spreading Vedic Wisdom', desc: 'Participate in outreach programs to share spiritual knowledge' }
              ].map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '1.5rem', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                    border: '1px solid #fed7aa',
                    transition: 'all 0.5s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(234, 88, 12, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#374151', marginBottom: '1rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Special Programs */}
          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              marginBottom: '3rem', 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Special Programs
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {[
                { icon: '🏛️', title: 'Dham Yatra', desc: 'Pilgrimage tours to sacred places in India and around the world' },
                { icon: '🍃', title: 'Mental & Physical Detox', desc: 'Holistic wellness programs for mind, body, and soul purification' },
                { icon: '🏆', title: 'Competitions & Activities', desc: 'Debates, drama competitions, and spiritual skill development activities' }
              ].map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '1.5rem', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                    border: '1px solid #fed7aa',
                    transition: 'all 0.5s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(234, 88, 12, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#374151', marginBottom: '1rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section style={{ background: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3rem)', 
            fontWeight: '700', 
            textAlign: 'center', 
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Facilities & Services
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🏠', title: 'Accommodation', desc: 'Comfortable and affordable accommodation for students and visitors' },
              { icon: '🍽️', title: 'Prasadam', desc: 'Nutritious vegetarian meals prepared with love and offered to Krishna' },
              { icon: '🌅', title: 'Morning Program', desc: 'Daily spiritual practices including meditation, kirtan, and Gītā class' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{ 
                  background: 'linear-gradient(135deg, #fed7aa 0%, #fef3c7 100%)', 
                  padding: '2rem', 
                  borderRadius: '1rem', 
                  textAlign: 'center',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#6b7280' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3rem)', 
            fontWeight: '700', 
            textAlign: 'center', 
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Daily Schedule
          </h2>
          <div style={{ maxWidth: '48rem', margin: '0 auto', background: 'white', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#c2410c', marginBottom: '1.5rem', textAlign: 'center' }}>
              Morning Program Schedule
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { time: '5:00 AM', activity: 'Mangala Arati & Kirtan' },
                { time: '5:30 AM', activity: 'Japa Meditation' },
                { time: '7:00 AM', activity: 'Guru Puja & Darshan Arati' },
                { time: '7:30 AM', activity: 'Bhagavad Gītā Class' },
                { time: '8:30 AM', activity: 'Breakfast Prasadam' },
                { time: 'Evening', activity: 'Cultural Programs & Special Events' }
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: index < 5 ? '1px solid #fed7aa' : 'none', paddingBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '500' }}>{item.time}</span>
                  <span style={{ color: '#6b7280' }}>{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)', 
        padding: '5rem 0', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: '0', 
          opacity: '0.1',
          background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>
        
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', fontWeight: '700', color: 'white', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Join Our Spiritual Community
          </h2>
          <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: '#fed7aa', marginBottom: '3rem', maxWidth: '48rem', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
            Begin your journey of spiritual growth, make lifelong friendships, and discover your true potential
          </p>
          <button style={{ 
            position: 'relative',
            background: 'white', 
            color: '#ea580c', 
            fontWeight: '700', 
            padding: '1rem 3rem', 
            borderRadius: '1rem', 
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.25rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
          }}>
            🙏 Join Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'linear-gradient(to bottom, #111827, #000000)', color: 'white', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            <div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Contact Info
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: '#f59e0b', marginTop: '0.25rem' }}>📍</span>
                  <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                    26 Prem Niwas First Floor, Malka Ganj, New Delhi, Delhi 110007
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: '#f59e0b' }}>📞</span>
                  <p style={{ color: '#d1d5db' }}>+91 83183 42494</p>
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Quick Links
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Programs', 'Events', 'Accommodation', 'Schedule'].map((link) => (
                  <a 
                    key={link}
                    href={`#${link.toLowerCase()}`} 
                    style={{ color: '#d1d5db', textDecoration: 'none', transition: 'color 0.3s ease' }}
                    onMouseOver={(e) => e.target.style.color = '#f59e0b'}
                    onMouseOut={(e) => e.target.style.color = '#d1d5db'}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Follow Us
              </h3>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a 
                  href="https://www.instagram.com/iskcondelhiuniversity" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '1.125rem', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.target.style.color = '#f59e0b'}
                  onMouseOut={(e) => e.target.style.color = '#d1d5db'}
                >
                  📷 Instagram
                </a>
                <a 
                  href="https://www.youtube.com/@ISKCONDelhiUniversity" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '1.125rem', transition: 'color 0.3s ease' }}
                  onMouseOver={(e) => e.target.style.color = '#f59e0b'}
                  onMouseOut={(e) => e.target.style.color = '#d1d5db'}
                >
                  📺 YouTube
                </a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #374151', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
              &copy; 2025 ISKCON Student Center. All rights reserved.
            </p>
            <p style={{ color: '#f59e0b', fontSize: '1.125rem', fontWeight: '500' }}>
              Hare Kṛṣṇa Hare Kṛṣṇa Kṛṣṇa Kṛṣṇa Hare Hare Hare Rāma Hare Rāma Rāma Rāma Hare Hare
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
