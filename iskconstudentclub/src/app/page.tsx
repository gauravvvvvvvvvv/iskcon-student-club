import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-orange-800 text-center">
            Welcome to the ISKCON Student Club
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            This is a platform for students to connect and share their experiences.
          </p>
          
          {/* Additional content to make it more beautiful */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🙏</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Spiritual Growth
              </h3>
              <p className="text-gray-600">
                Discover ancient wisdom and practices that nurture spiritual development
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Connect with like-minded students and build lasting friendships
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Learning
              </h3>
              <p className="text-gray-600">
                Explore Vedic knowledge and philosophy through study groups
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-12">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Join Our Community
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 ISKCON Student Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
