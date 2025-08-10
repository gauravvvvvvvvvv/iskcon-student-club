"use client";

import { useState, useEffect } from 'react';

interface Image {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

interface Announcement {
  id: string;
  text: string;
  link?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SimpleAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [newAnnouncement, setNewAnnouncement] = useState({ text: '', link: '' });
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    // Skip auth for testing
    setIsAuthenticated(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Try the fallback API first
      const [imagesRes, announcementsRes] = await Promise.all([
        fetch('/api/images-fallback').catch(() => fetch('/api/images')),
        fetch('/api/announcements-fallback').catch(() => fetch('/api/announcements'))
      ]);

      if (imagesRes.ok) {
        const imagesData = await imagesRes.json();
        setImages(imagesData.images || []);
      }

      if (announcementsRes.ok) {
        const announcementsData = await announcementsRes.json();
        setAnnouncements(announcementsData.announcements || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data - this is normal if Vercel storage is not set up yet');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Try fallback API first
      let response;
      try {
        response = await fetch('/api/images-fallback', {
          method: 'POST',
          body: formData
        });
      } catch {
        response = await fetch('/api/images', {
          method: 'POST',
          body: formData
        });
      }

      if (response.ok) {
        setSuccess('Image uploaded successfully (test mode)!');
        setError('');
        fetchData();
      } else {
        const data = await response.json();
        setError(data.error || 'Upload failed - Vercel Blob storage may not be configured');
      }
    } catch (error) {
      setError('Upload failed - this is expected without Vercel Blob storage');
    }
  };

  const deleteImage = async (image: Image) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      // Try fallback API first
      let response;
      try {
        response = await fetch('/api/images-fallback', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageId: image.id })
        });
      } catch {
        response = await fetch('/api/images', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageId: image.id, blobUrl: image.url })
        });
      }

      if (response.ok) {
        setSuccess('Image deleted successfully!');
        setError('');
        fetchData();
      } else {
        setError('Failed to delete image');
      }
    } catch (error) {
      setError('Failed to delete image');
    }
  };

  const createAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.text.trim()) return;

    try {
      // Try fallback API first
      let response;
      try {
        response = await fetch('/api/announcements-fallback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAnnouncement)
        });
      } catch {
        response = await fetch('/api/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAnnouncement)
        });
      }

      if (response.ok) {
        setSuccess('Announcement created successfully!');
        setError('');
        setNewAnnouncement({ text: '', link: '' });
        fetchData();
      } else {
        setError('Failed to create announcement - Vercel KV may not be configured');
      }
    } catch (error) {
      setError('Failed to create announcement - this is expected without Vercel KV storage');
    }
  };

  const updateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement) return;

    try {
      // Try fallback API first
      let response;
      try {
        response = await fetch('/api/announcements-fallback', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingAnnouncement)
        });
      } catch {
        response = await fetch('/api/announcements', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingAnnouncement)
        });
      }

      if (response.ok) {
        setSuccess('Announcement updated successfully!');
        setError('');
        setEditingAnnouncement(null);
        fetchData();
      } else {
        setError('Failed to update announcement');
      }
    } catch (error) {
      setError('Failed to update announcement');
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      // Try fallback API first
      let response;
      try {
        response = await fetch('/api/announcements-fallback', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
      } catch {
        response = await fetch('/api/announcements', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
      }

      if (response.ok) {
        setSuccess('Announcement deleted successfully!');
        setError('');
        fetchData();
      } else {
        setError('Failed to delete announcement');
      }
    } catch (error) {
      setError('Failed to delete announcement');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ fontSize: '1.2rem', color: '#6b7280' }}>Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: '#ea580c', margin: 0 }}>🧪 Simple ISKCON Admin (Test Mode)</h1>
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
            No auth required for testing
          </div>
        </div>

        {/* Info Banner */}
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#92400e', margin: '0 0 0.5rem 0' }}>
            📋 Testing Mode Active
          </h3>
          <p style={{ color: '#92400e', margin: 0, fontSize: '0.9rem' }}>
            This admin panel works without Vercel KV/Blob setup. Some features are simulated for testing. 
            To enable full functionality, set up Vercel KV and Blob storage in your deployment.
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div style={{ 
            marginBottom: '1rem', 
            padding: '1rem', 
            backgroundColor: '#fee2e2', 
            color: '#dc2626', 
            borderRadius: '8px',
            border: '1px solid #dc2626'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        {success && (
          <div style={{ 
            marginBottom: '1rem', 
            padding: '1rem', 
            backgroundColor: '#d1fae5', 
            color: '#059669', 
            borderRadius: '8px',
            border: '1px solid #059669'
          }}>
            ✅ {success}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Images Management */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: '#ea580c', marginBottom: '1rem' }}>📸 Carousel Images</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151'
              }}>
                Upload New Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#374151',
                  fontSize: '1rem'
                }}
              />
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#6b7280', 
                marginTop: '0.5rem' 
              }}>
                Note: File upload simulated in test mode
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
              gap: '1rem' 
            }}>
              {images.map((image) => (
                <div key={image.id} style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'white'
                }}>
                  <img
                    src={image.url}
                    alt={image.filename}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '0.5rem' }}>
                    <p style={{ 
                      fontSize: '0.8rem', 
                      margin: '0 0 0.5rem 0',
                      wordBreak: 'break-word',
                      color: '#374151'
                    }}>
                      {image.filename}
                    </p>
                    <button
                      onClick={() => deleteImage(image)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Management */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: '#ea580c', marginBottom: '1rem' }}>📢 Announcements</h2>
            
            {/* Create New Announcement */}
            <form onSubmit={createAnnouncement} style={{ marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Announcement Text
                </label>
                <textarea
                  value={newAnnouncement.text}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, text: e.target.value })}
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '0.75rem',
                    border: '2px solid #d1d5db',
                    borderRadius: '4px',
                    resize: 'vertical',
                    fontSize: '1rem',
                    color: '#374151',
                    backgroundColor: 'white'
                  }}
                  placeholder="Enter announcement text..."
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Link (Optional)
                </label>
                <input
                  type="url"
                  value={newAnnouncement.link}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, link: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    color: '#374151',
                    backgroundColor: 'white'
                  }}
                  placeholder="https://example.com"
                />
              </div>
              
              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#ea580c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                Add Announcement
              </button>
            </form>

            {/* Existing Announcements */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {announcements.map((announcement) => (
                <div key={announcement.id} style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: 'white'
                }}>
                  {editingAnnouncement?.id === announcement.id ? (
                    <form onSubmit={updateAnnouncement}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <textarea
                          value={editingAnnouncement.text}
                          onChange={(e) => setEditingAnnouncement({ 
                            ...editingAnnouncement, 
                            text: e.target.value 
                          })}
                          style={{
                            width: '100%',
                            minHeight: '60px',
                            padding: '0.5rem',
                            border: '2px solid #d1d5db',
                            borderRadius: '4px',
                            resize: 'vertical',
                            fontSize: '1rem',
                            color: '#374151'
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <input
                          type="url"
                          value={editingAnnouncement.link || ''}
                          onChange={(e) => setEditingAnnouncement({ 
                            ...editingAnnouncement, 
                            link: e.target.value 
                          })}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '2px solid #d1d5db',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            color: '#374151'
                          }}
                          placeholder="Link (optional)"
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="submit"
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#059669',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingAnnouncement(null)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <p style={{ 
                        margin: '0 0 0.5rem 0', 
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: '1.5'
                      }}>
                        {announcement.text}
                      </p>
                      {announcement.link && (
                        <p style={{ 
                          margin: '0 0 0.5rem 0', 
                          fontSize: '0.8rem', 
                          color: '#3b82f6'
                        }}>
                          Link: <a href={announcement.link} target="_blank" rel="noopener noreferrer">
                            {announcement.link}
                          </a>
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button
                          onClick={() => setEditingAnnouncement(announcement)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAnnouncement(announcement.id)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a 
            href="/test-dynamic"
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
            🧪 Test Dynamic Content
          </a>
          <a 
            href="/"
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
            🏠 Main Site
          </a>
        </div>
      </div>
    </div>
  );
}
