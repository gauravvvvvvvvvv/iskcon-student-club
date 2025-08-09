import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header with Image Spaces */}
      <header className="relative bg-white shadow-md overflow-hidden">
        {/* Top Left Image Space */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-orange-100 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center">
          <span className="text-xs text-orange-600">Logo</span>
        </div>
        
        {/* Top Right Image Space */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-orange-100 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center">
          <span className="text-xs text-orange-600">Image</span>
        </div>

        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-orange-800 text-center mb-4">
            Welcome to the ISKCON Student Center
          </h1>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
            A comprehensive platform for spiritual growth, learning, and community building
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-orange-600 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center space-x-6 py-4">
            <a href="#programs" className="text-white hover:text-orange-200 transition-colors">Programs</a>
            <a href="#events" className="text-white hover:text-orange-200 transition-colors">Events</a>
            <a href="#accommodation" className="text-white hover:text-orange-200 transition-colors">Accommodation</a>
            <a href="#schedule" className="text-white hover:text-orange-200 transition-colors">Schedule</a>
            <a href="#contact" className="text-white hover:text-orange-200 transition-colors">Contact</a>
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
      <section className="bg-orange-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Spiritual Community</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Begin your journey of spiritual growth, make lifelong friendships, and discover your true potential
          </p>
          <div className="space-x-4">
            <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-lg hover:bg-orange-50 transition duration-300">
              Join Now
            </button>
            <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
              <p className="text-gray-300 mb-2">📍 Address: [Your Center Address]</p>
              <p className="text-gray-300 mb-2">📞 Phone: [Your Phone Number]</p>
              <p className="text-gray-300">✉️ Email: [Your Email]</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#programs" className="hover:text-orange-400">Programs</a></li>
                <li><a href="#events" className="hover:text-orange-400">Events</a></li>
                <li><a href="#accommodation" className="hover:text-orange-400">Accommodation</a></li>
                <li><a href="#schedule" className="hover:text-orange-400">Schedule</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-orange-400">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-orange-400">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-orange-400">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2025 ISKCON Student Center. All rights reserved.</p>
            <p className="text-orange-400 mt-2">Hare Kṛṣṇa Hare Kṛṣṇa Kṛṣṇa Kṛṣṇa Hare Hare Hare Rāma Hare Rāma Rāma Rāma Hare Hare</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
