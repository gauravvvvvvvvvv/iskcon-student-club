"use client";

import { DynamicCarousel, DynamicAnnouncements } from '../../components/DynamicContent';

export default function TestDynamic() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#ea580c',
          margin: 0,
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          🧪 Testing Dynamic Content
        </h1>
        <p style={{ 
          color: '#6b7280',
          margin: '0.5rem 0 0 0',
          fontSize: '1.1rem'
        }}>
          This page shows your dynamic carousel and announcements from the admin panel
        </p>
      </div>

      {/* Instructions */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#ea580c', marginBottom: '1rem' }}>
            📋 How to Test:
          </h2>
          <ol style={{ lineHeight: '1.8', color: '#374151' }}>
            <li><strong>Visit the admin panel:</strong> <a href="/admin" style={{ color: '#3b82f6' }}>/admin</a> (password: "password")</li>
            <li><strong>Upload some images</strong> to see them in the carousel below</li>
            <li><strong>Create announcements</strong> to see them in the scrolling banner</li>
            <li><strong>Return to this page</strong> to see your changes live!</li>
          </ol>
          
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '6px',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <strong style={{ color: '#92400e' }}>💡 Note:</strong>
            <span style={{ color: '#92400e' }}> If no dynamic content is found, fallback content (your current images) will be displayed.</span>
          </div>
        </div>
      </div>

      {/* Dynamic Announcements */}
      <DynamicAnnouncements />

      {/* Dynamic Carousel */}
      <DynamicCarousel />

      {/* Status Panel */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#ea580c', marginBottom: '1rem' }}>
            🔧 Integration Status:
          </h3>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#d1fae5',
              borderRadius: '6px',
              border: '1px solid #10b981'
            }}>
              <div style={{ color: '#065f46', fontWeight: 'bold' }}>✅ CMS System</div>
              <div style={{ color: '#047857', fontSize: '0.9rem' }}>Ready and functional</div>
            </div>
            
            <div style={{
              padding: '1rem',
              backgroundColor: '#dbeafe',
              borderRadius: '6px',
              border: '1px solid #3b82f6'
            }}>
              <div style={{ color: '#1e3a8a', fontWeight: 'bold' }}>🔄 Dynamic Content</div>
              <div style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>Active on this page</div>
            </div>
            
            <div style={{
              padding: '1rem',
              backgroundColor: '#fef3c7',
              borderRadius: '6px',
              border: '1px solid #f59e0b'
            }}>
              <div style={{ color: '#92400e', fontWeight: 'bold' }}>⏳ Main Page</div>
              <div style={{ color: '#b45309', fontSize: '0.9rem' }}>Still using static content</div>
            </div>
          </div>
          
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px'
          }}>
            <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
              🔗 Next Steps to Make Main Page Dynamic:
            </h4>
            <ol style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '0.9rem' }}>
              <li>Test the dynamic content here first</li>
              <li>When satisfied, I can help integrate it into your main page</li>
              <li>Or you can manually replace sections in page.tsx</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a 
            href="/admin"
            style={{
              backgroundColor: '#ea580c',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            🔧 Admin Panel
          </a>
          <a 
            href="/"
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            🏠 Main Site
          </a>
          <a 
            href="/cms-demo"
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            📖 Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
