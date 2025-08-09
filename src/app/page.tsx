import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" style={{minHeight: '100vh', background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fefce8 100%)'}}>
      {/* Header with Image Spaces and CTA */}
      <header className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 shadow-2xl overflow-hidden gradient-header" style={{background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 50%, #d97706 100%)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)'
          }}></div>
        </div>
        
        {/* Top Left Image Space */}
        <div className="absolute top-6 left-6 w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/50 rounded-xl flex items-center justify-center shadow-lg" style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '2px dashed rgba(255,255,255,0.5)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}>
          <span className="text-xs text-white font-medium" style={{color: 'white', fontSize: '12px', fontWeight: '500'}}>Logo</span>
        </div>
        
        {/* Top Right Image Space */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/50 rounded-xl flex items-center justify-center shadow-lg" style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '2px dashed rgba(255,255,255,0.5)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}>
          <span className="text-xs text-white font-medium" style={{color: 'white', fontSize: '12px', fontWeight: '500'}}>Image</span>
        </div>

        <div className="relative container mx-auto px-4 py-16 fallback-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem', position: 'relative'}}>
          <div className="text-center" style={{textAlign: 'center'}}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg" style={{fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: '700', color: 'white', marginBottom: '2rem', textShadow: '0 10px 15px rgba(0,0,0,0.3)'}}>
              Welcome to the
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-8 drop-shadow-lg" style={{fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: '700', color: '#fef3c7', marginBottom: '2rem', textShadow: '0 10px 15px rgba(0,0,0,0.3)'}}>
              ISKCON Student Center
            </h2>
            <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-4xl mx-auto leading-relaxed" style={{fontSize: 'clamp(1.25rem, 3vw, 2rem)', color: '#fed7aa', marginBottom: '3rem', maxWidth: '64rem', margin: '0 auto 3rem auto', lineHeight: '1.6'}}>
              A comprehensive platform for spiritual growth, learning, and community building
            </p>
            
            {/* Prominent Join Now Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center'}}>
              <button className="group relative bg-white text-orange-600 font-bold py-4 px-10 rounded-2xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-2xl border-4 border-white/20 fallback-button" style={{background: 'white', color: '#ea580c', fontWeight: '700', padding: '1rem 2.5rem', borderRadius: '16px', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', transition: 'all 0.3s ease', cursor: 'pointer'}}>
                <span className="relative z-10 text-lg" style={{fontSize: '1.125rem', position: 'relative', zIndex: '10'}}>🙏 Join Our Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
              
              <div className="flex items-center space-x-2 text-orange-100" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fed7aa'}}>
                <span className="text-sm" style={{fontSize: '14px'}}>📞</span>
                <span className="font-medium" style={{fontWeight: '500'}}>+91 83183 42494</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-orange-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center space-x-8 py-6">
            <a href="#programs" className="text-orange-700 hover:text-orange-500 transition-colors font-semibold text-lg hover:scale-105 transform duration-200">Programs</a>
            <a href="#events" className="text-orange-700 hover:text-orange-500 transition-colors font-semibold text-lg hover:scale-105 transform duration-200">Events</a>
            <a href="#accommodation" className="text-orange-700 hover:text-orange-500 transition-colors font-semibold text-lg hover:scale-105 transform duration-200">Accommodation</a>
            <a href="#schedule" className="text-orange-700 hover:text-orange-500 transition-colors font-semibold text-lg hover:scale-105 transform duration-200">Schedule</a>
            <a href="#contact" className="text-orange-700 hover:text-orange-500 transition-colors font-semibold text-lg hover:scale-105 transform duration-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Programs Section */}
      <section id="programs" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Programs & Services</h2>
          
          {/* Core Spiritual Programs */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-orange-700 mb-8 text-center">Spiritual Development</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">📖</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Learning Gītā & Vedic Wisdom</h4>
                <p className="text-gray-600">Deep study of Bhagavad Gītā and ancient Vedic scriptures with experienced mentors</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🙏</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Chanting / Mantra Meditation</h4>
                <p className="text-gray-600">Learn the art of mantra meditation and experience inner peace through chanting</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🧘</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Spiritual Counseling</h4>
                <p className="text-gray-600">Professional guidance for life-related problems through spiritual wisdom</p>
              </div>
            </div>
          </div>

          {/* Personal Development */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-orange-700 mb-8 text-center">Personal Development</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">�</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Leadership Development</h4>
                <p className="text-gray-600">Develop leadership skills through Vedic principles and practical training</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🤝</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Personal Mentorship</h4>
                <p className="text-gray-600">One-on-one guidance from experienced devotees and spiritual mentors</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🌱</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Sattvik Lifestyle</h4>
                <p className="text-gray-600">Learn to live a pure, balanced lifestyle according to Vedic principles</p>
              </div>
            </div>
          </div>

          {/* Community & Cultural */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-orange-700 mb-8 text-center">Community & Culture</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">❤️</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Spiritual Friendship</h4>
                <p className="text-gray-600">Build meaningful relationships with like-minded spiritual practitioners</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🎵</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Kirtans & Cultural Events</h4>
                <p className="text-gray-600">Experience devotional music, festivals, and cultural celebrations</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🌍</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Spreading Vedic Wisdom</h4>
                <p className="text-gray-600">Participate in outreach programs to share spiritual knowledge</p>
              </div>
            </div>
          </div>

          {/* Special Programs */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-orange-700 mb-8 text-center">Special Programs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🏛️</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Dham Yatra</h4>
                <p className="text-gray-600">Pilgrimage tours to sacred places in India and around the world</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🍃</div>
                <h4 className="text-xl font-semibent text-gray-800 mb-3">Mental & Physical Detox</h4>
                <p className="text-gray-600">Holistic wellness programs for mind, body, and soul purification</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl mb-4">🏆</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Competitions & Activities</h4>
                <p className="text-gray-600">Debates, drama competitions, and spiritual skill development activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Facilities & Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Accommodation</h3>
              <p className="text-gray-600">Comfortable and affordable accommodation for students and visitors</p>
            </div>

            <div className="bg-orange-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Prasadam</h3>
              <p className="text-gray-600">Nutritious vegetarian meals prepared with love and offered to Krishna</p>
            </div>

            <div className="bg-orange-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">🌅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Morning Program</h3>
              <p className="text-gray-600">Daily spiritual practices including meditation, kirtan, and Gītā class</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Daily Schedule</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-orange-700 mb-6 text-center">Morning Program Schedule</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">5:00 AM</span>
                <span className="text-gray-600">Mangala Arati & Kirtan</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">5:30 AM</span>
                <span className="text-gray-600">Japa Meditation</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">7:00 AM</span>
                <span className="text-gray-600">Guru Puja & Darshan Arati</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">7:30 AM</span>
                <span className="text-gray-600">Bhagavad Gītā Class</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">8:30 AM</span>
                <span className="text-gray-600">Breakfast Prasadam</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Evening</span>
                <span className="text-gray-600">Cultural Programs & Special Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">Join Our Spiritual Community</h2>
          <p className="text-2xl text-orange-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Begin your journey of spiritual growth, make lifelong friendships, and discover your true potential
          </p>
          <div className="space-y-4">
            <button className="group relative bg-white text-orange-600 font-bold py-4 px-12 rounded-2xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <span className="relative z-10 text-xl">🙏 Join Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-amber-200 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-orange-400 mt-1">📍</span>
                  <p className="text-gray-300 leading-relaxed">26 Prem Niwas First Floor, Malka Ganj, New Delhi, Delhi 110007</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-orange-400">📞</span>
                  <p className="text-gray-300">+91 83183 42494</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Quick Links</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#programs" className="hover:text-orange-400 transition-colors">Programs</a></li>
                <li><a href="#events" className="hover:text-orange-400 transition-colors">Events</a></li>
                <li><a href="#accommodation" className="hover:text-orange-400 transition-colors">Accommodation</a></li>
                <li><a href="#schedule" className="hover:text-orange-400 transition-colors">Schedule</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="https://www.instagram.com/iskcondelhiuniversity" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition-colors text-lg">
                  📷 Instagram
                </a>
                <a href="https://www.youtube.com/@ISKCONDelhiUniversity" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition-colors text-lg">
                  📺 YouTube
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 mb-4">&copy; 2025 ISKCON Student Center. All rights reserved.</p>
            <p className="text-orange-400 text-lg font-medium">
              Hare Kṛṣṇa Hare Kṛṣṇa Kṛṣṇa Kṛṣṇa Hare Hare Hare Rāma Hare Rāma Rāma Rāma Hare Hare
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
