import React from 'react';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 25%, #fed7aa 75%, #fdba74 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 25%, #f59e0b 50%, #d97706 75%, #ea580c 100%)',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        overflow: 'hidden'
      }}>
        
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(251, 146, 60, 0.2) 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite'
        }}></div>

        {/* Logo Spaces */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          width: '4rem',
          height: '4rem',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          LOGO
        </div>

        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          width: '4rem',
          height: '4rem',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          IMG
        </div>

        {/* Main Hero Content */}
        <div style={{
          textAlign: 'center',
          maxWidth: '1200px',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 10
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            lineHeight: '1.1'
          }}>
            Welcome to the<br />
            <span style={{
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ISKCON Student Center
            </span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            marginBottom: '3rem',
            opacity: '0.95',
            maxWidth: '800px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.5'
          }}>
            Transform your life through ancient wisdom, spiritual practices, and a supportive community
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <button style={{
              background: 'white',
              color: '#ea580c',
              padding: '1.25rem 3rem',
              borderRadius: '2rem',
              border: 'none',
              fontSize: '1.25rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.05)';
              e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}>
              🙏 Join Our Community
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.125rem',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.75rem 1.5rem',
              borderRadius: '1rem',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{fontSize: '1.25rem'}}>📞</span>
              <span>+91 83183 42494</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '2rem',
            height: '3rem',
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '1rem',
            position: 'relative'
          }}>
            <div style={{
              width: '0.25rem',
              height: '0.5rem',
              background: 'white',
              borderRadius: '0.125rem',
              position: 'absolute',
              top: '0.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scroll 2s infinite'
            }}></div>
          </div>
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
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ea580c, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Our Programs
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem auto'
          }}>
            Discover transformative spiritual programs designed for modern students
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}>
            {[
              {
                icon: '🎓',
                title: 'Bhagavad Gita Classes',
                description: 'Deep dive into ancient wisdom with modern applications for student life and career guidance.',
                features: ['Weekly discussions', 'Practical applications', 'Study materials']
              },
              {
                icon: '🧘',
                title: 'Meditation & Yoga',
                description: 'Learn authentic meditation techniques and yoga practices to reduce stress and increase focus.',
                features: ['Daily sessions', 'Breathing techniques', 'Mindfulness training']
              },
              {
                icon: '🎵',
                title: 'Kirtan & Music',
                description: 'Experience the joy of devotional music and learn traditional instruments and chanting.',
                features: ['Group kirtans', 'Instrument training', 'Voice development']
              },
              {
                icon: '🍽️',
                title: 'Prasadam Service',
                description: 'Participate in preparing and serving sanctified food while learning about conscious eating.',
                features: ['Cooking workshops', 'Nutrition guidance', 'Service opportunities']
              },
              {
                icon: '📚',
                title: 'Spiritual Literature',
                description: 'Study sacred texts and literature that provide guidance for holistic personal development.',
                features: ['Book clubs', 'Discussion groups', 'Reading materials']
              },
              {
                icon: '🎭',
                title: 'Cultural Programs',
                description: 'Engage in traditional festivals, drama, and cultural celebrations throughout the year.',
                features: ['Festival celebrations', 'Drama workshops', 'Cultural events']
              }
            ].map((program, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #fef7ff 0%, #fdf4ff 50%, #faf5ff 100%)',
                  borderRadius: '2rem',
                  padding: '2.5rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(234, 88, 12, 0.1)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(234, 88, 12, 0.15)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fef7ff 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #fef7ff 0%, #fdf4ff 50%, #faf5ff 100%)';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1.5rem',
                  display: 'block'
                }}>
                  {program.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#ea580c',
                  marginBottom: '1rem'
                }}>
                  {program.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {program.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {program.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        color: '#374151'
                      }}
                    >
                      <span style={{color: '#f59e0b'}}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
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
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            marginBottom: '2rem'
          }}>
            Get in Touch
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>📞 Contact</h3>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>+91 83183 42494</p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>📍 Address</h3>
              <p style={{ fontSize: '1rem', opacity: '0.9' }}>Near Delhi University<br />North Campus</p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>📱 Social</h3>
              <p style={{ fontSize: '1rem', opacity: '0.9' }}>@iskcondelhiuniversity<br />Instagram</p>
            </div>
          </div>

          <button style={{
            background: 'white',
            color: '#ea580c',
            padding: '1.25rem 3rem',
            borderRadius: '2rem',
            border: 'none',
            fontSize: '1.25rem',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          }}>
            🙏 Join Our Community Today
          </button>
        </div>
      </section>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40%, 43% { transform: translateX(-50%) translateY(-30px); }
          70% { transform: translateX(-50%) translateY(-15px); }
          90% { transform: translateX(-50%) translateY(-4px); }
        }
        
        @keyframes scroll {
          0% { opacity: 0; transform: translateX(-50%) translateY(0); }
          10%, 90% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(15px); }
        }
      `}</style>
    </div>
  );
}
