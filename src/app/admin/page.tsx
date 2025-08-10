"use client";
import { useState, useEffect } from 'react';
import { 
  fetchCarouselImages, 
  fetchAnnouncements, 
  uploadImage, 
  deleteImage, 
  reorderImages,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  authenticateAdmin,
  logoutAdmin,
  type CarouselImage,
  type Announcement
} from '../../lib/cms';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'images' | 'announcements'>('images');
  
  // Images state
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [uploading, setUploading] = useState(false);
  
  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ text: '', link: '' });
  const [editingAnnouncement, setEditingAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const [imagesData, announcementsData] = await Promise.all([
        fetchCarouselImages(),
        fetchAnnouncements()
      ]);
      setImages(imagesData);
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await authenticateAdmin(password);
      if (success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        alert('Invalid password');
      }
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const newImage = await uploadImage(file);
        setImages(prev => [...prev, newImage]);
      }
    } catch (error) {
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (image: CarouselImage) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await deleteImage(image.id, image.url);
      setImages(prev => prev.filter(img => img.id !== image.id));
    } catch (error) {
      alert('Failed to delete image');
    }
  };

  const handleImageReorder = async (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    
    setImages(newImages);
    
    try {
      await reorderImages(newImages);
    } catch (error) {
      alert('Failed to reorder images');
      setImages(images); // Revert on error
    }
  };

  const handleAnnouncementCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.text.trim()) return;

    try {
      const announcement = await createAnnouncement(
        newAnnouncement.text,
        newAnnouncement.link || undefined
      );
      setAnnouncements(prev => [...prev, announcement]);
      setNewAnnouncement({ text: '', link: '' });
    } catch (error) {
      alert('Failed to create announcement');
    }
  };

  const handleAnnouncementUpdate = async (id: string, text: string, link: string) => {
    try {
      await updateAnnouncement(id, text, link || undefined);
      setAnnouncements(prev => 
        prev.map(ann => 
          ann.id === id 
            ? { ...ann, text, link: link || undefined, updatedAt: new Date().toISOString() }
            : ann
        )
      );
      setEditingAnnouncement(null);
    } catch (error) {
      alert('Failed to update announcement');
    }
  };

  const handleAnnouncementDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      await deleteAnnouncement(id);
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    } catch (error) {
      alert('Failed to delete announcement');
    }
  };

  const handleAnnouncementToggle = async (id: string, isActive: boolean) => {
    try {
      const announcement = announcements.find(ann => ann.id === id);
      if (!announcement) return;

      await updateAnnouncement(id, announcement.text, announcement.link, isActive);
      setAnnouncements(prev => 
        prev.map(ann => 
          ann.id === id 
            ? { ...ann, isActive, updatedAt: new Date().toISOString() }
            : ann
        )
      );
    } catch (error) {
      alert('Failed to toggle announcement');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          minWidth: '300px'
        }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#ea580c'
          }}>
            ISKCON CMS Admin
          </h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#ea580c',
                color: 'white',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{ 
            marginTop: '1rem', 
            fontSize: '0.875rem', 
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Default password: "password"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        padding: '1rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: '#ea580c'
          }}>
            ISKCON CMS Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid #d1d5db'
          }}>
            <button
              onClick={() => setActiveTab('images')}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: activeTab === 'images' ? '2px solid #ea580c' : 'none',
                color: activeTab === 'images' ? '#ea580c' : '#6b7280',
                fontWeight: activeTab === 'images' ? '600' : '400',
                cursor: 'pointer'
              }}
            >
              Carousel Images ({images.length})
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: activeTab === 'announcements' ? '2px solid #ea580c' : 'none',
                color: activeTab === 'announcements' ? '#ea580c' : '#6b7280',
                fontWeight: activeTab === 'announcements' ? '600' : '400',
                cursor: 'pointer'
              }}
            >
              Announcements ({announcements.length})
            </button>
          </div>
        </div>

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div>
            {/* Upload Section */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#111827'
              }}>
                Upload New Images
              </h2>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  width: '100%'
                }}
              />
              {uploading && (
                <p style={{ marginTop: '0.5rem', color: '#ea580c' }}>
                  Uploading images...
                </p>
              )}
            </div>

            {/* Images Grid */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#111827'
              }}>
                Current Carousel Images
              </h2>
              
              {images.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                  No images uploaded yet. Upload some images to get started!
                </p>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  {images.map((image, index) => (
                    <div key={image.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#f9fafb'
                    }}>
                      <img
                        src={image.url}
                        alt={image.filename}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ padding: '0.75rem' }}>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '500',
                          marginBottom: '0.5rem',
                          color: '#111827'
                        }}>
                          {image.filename}
                        </p>
                        <p style={{ 
                          fontSize: '0.75rem', 
                          color: '#6b7280',
                          marginBottom: '0.75rem'
                        }}>
                          Position: {index + 1}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleImageDelete(image)}
                            style={{
                              backgroundColor: '#ef4444',
                              color: 'white',
                              padding: '0.25rem 0.5rem',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                          {index > 0 && (
                            <button
                              onClick={() => handleImageReorder(index, index - 1)}
                              style={{
                                backgroundColor: '#6b7280',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                cursor: 'pointer'
                              }}
                            >
                              ↑
                            </button>
                          )}
                          {index < images.length - 1 && (
                            <button
                              onClick={() => handleImageReorder(index, index + 1)}
                              style={{
                                backgroundColor: '#6b7280',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                cursor: 'pointer'
                              }}
                            >
                              ↓
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div>
            {/* Create Announcement */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#111827'
              }}>
                Create New Announcement
              </h2>
              <form onSubmit={handleAnnouncementCreate}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Announcement Text *
                  </label>
                  <textarea
                    value={newAnnouncement.text}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, text: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      minHeight: '80px',
                      resize: 'vertical'
                    }}
                    placeholder="Enter announcement text..."
                    required
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Link (optional)
                  </label>
                  <input
                    type="url"
                    value={newAnnouncement.link}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, link: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px'
                    }}
                    placeholder="https://example.com"
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#ea580c',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Create Announcement
                </button>
              </form>
            </div>

            {/* Announcements List */}
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#111827'
              }}>
                Current Announcements
              </h2>

              {announcements.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                  No announcements created yet. Create your first announcement above!
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {announcements.map((announcement) => (
                    <div key={announcement.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '1rem',
                      backgroundColor: announcement.isActive ? '#f0fdf4' : '#f9fafb'
                    }}>
                      {editingAnnouncement === announcement.id ? (
                        <EditAnnouncementForm
                          announcement={announcement}
                          onSave={handleAnnouncementUpdate}
                          onCancel={() => setEditingAnnouncement(null)}
                        />
                      ) : (
                        <div>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start',
                            marginBottom: '0.5rem'
                          }}>
                            <div style={{ flex: 1 }}>
                              <p style={{ 
                                marginBottom: '0.5rem',
                                fontWeight: '500',
                                color: '#111827'
                              }}>
                                {announcement.text}
                              </p>
                              {announcement.link && (
                                <a
                                  href={announcement.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: '#ea580c',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem'
                                  }}
                                >
                                  🔗 {announcement.link}
                                </a>
                              )}
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              marginLeft: '1rem'
                            }}>
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                backgroundColor: announcement.isActive ? '#10b981' : '#6b7280',
                                color: 'white'
                              }}>
                                {announcement.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                          <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginTop: '0.75rem'
                          }}>
                            <button
                              onClick={() => setEditingAnnouncement(announcement.id)}
                              style={{
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                cursor: 'pointer'
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleAnnouncementToggle(announcement.id, !announcement.isActive)}
                              style={{
                                backgroundColor: announcement.isActive ? '#f59e0b' : '#10b981',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                cursor: 'pointer'
                              }}
                            >
                              {announcement.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleAnnouncementDelete(announcement.id)}
                              style={{
                                backgroundColor: '#ef4444',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                cursor: 'pointer'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                          <p style={{ 
                            fontSize: '0.75rem', 
                            color: '#6b7280',
                            marginTop: '0.5rem',
                            margin: 0
                          }}>
                            Created: {new Date(announcement.createdAt).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Edit Announcement Form Component
function EditAnnouncementForm({ 
  announcement, 
  onSave, 
  onCancel 
}: {
  announcement: Announcement;
  onSave: (id: string, text: string, link: string) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState(announcement.text);
  const [link, setLink] = useState(announcement.link || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(announcement.id, text, link);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          fontWeight: '500'
        }}>
          Announcement Text *
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            minHeight: '80px',
            resize: 'vertical'
          }}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          fontWeight: '500'
        }}>
          Link (optional)
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px'
          }}
          placeholder="https://example.com"
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          type="submit"
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
