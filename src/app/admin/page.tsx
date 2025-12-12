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
  reorderAnnouncements,
  authenticateAdmin,
  logoutAdmin,
  type CarouselImage,
  type Announcement
} from '../../lib/cms';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<'images' | 'announcements'>('images');

  // Images state
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [uploading, setUploading] = useState(false);

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ text: '', link: '' });
  const [editingAnnouncement, setEditingAnnouncement] = useState<string | null>(null);

  // Fallback toggles (persisted in localStorage)
  const [showFallbackImage, setShowFallbackImage] = useState(true);
  const [showFallbackAnnouncement, setShowFallbackAnnouncement] = useState(true);

  // Device fingerprinting function
  const generateDeviceFingerprint = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.textBaseline = 'top';
    ctx!.font = '14px Arial';
    ctx!.fillText('Device fingerprint', 2, 2);

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');

    return btoa(fingerprint).substring(0, 32);
  };

  // Check if device is already trusted on mount
  useEffect(() => {
    const checkTrustedDevice = async () => {
      try {
        const deviceFingerprint = generateDeviceFingerprint();
        const response = await fetch(`/api/auth?deviceFingerprint=${encodeURIComponent(deviceFingerprint)}`);
        const data = await response.json();

        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking device trust:', error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkTrustedDevice();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Load toggles from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem('showFallbackImage');
      const ann = localStorage.getItem('showFallbackAnnouncement');
      setShowFallbackImage(img !== 'false');
      setShowFallbackAnnouncement(ann !== 'false');
    }
  }, []);

  // Save toggles to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('showFallbackImage', showFallbackImage ? 'true' : 'false');
      localStorage.setItem('showFallbackAnnouncement', showFallbackAnnouncement ? 'true' : 'false');
    }
  }, [showFallbackImage, showFallbackAnnouncement]);

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
      const deviceFingerprint = generateDeviceFingerprint();
      const success = await authenticateAdmin(password, deviceFingerprint);
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
    // Prevent deletion of default Jagannath image
    if (image.id === 'jagannath-default') {
      alert('Cannot delete the default Jagannath image. This image is always present.');
      return;
    }

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

  const handleAnnouncementReorder = async (fromIndex: number, toIndex: number) => {
    const newAnnouncements = [...announcements];
    const [movedAnnouncement] = newAnnouncements.splice(fromIndex, 1);
    newAnnouncements.splice(toIndex, 0, movedAnnouncement);

    setAnnouncements(newAnnouncements);

    try {
      await reorderAnnouncements(newAnnouncements);
    } catch (error) {
      alert('Failed to reorder announcements');
      setAnnouncements(announcements); // Revert on error
    }
  };

  // Helper function to process hyperlinks automatically
  const processHyperlink = (link: string): string => {
    if (!link || !link.trim()) return '';

    let processedLink = link.trim();

    // Remove existing tel: or mailto: prefixes to avoid duplication
    processedLink = processedLink.replace(/^(tel:|mailto:)/i, '');

    // Check if it's a 10-digit number (with optional spaces, dashes, or parentheses)
    const phonePattern = /^[\s\-\(\)]*(\d[\s\-\(\)]*){10}[\s\-\(\)]*$/;
    if (phonePattern.test(processedLink)) {
      // Extract only digits
      const digits = processedLink.replace(/\D/g, '');
      if (digits.length === 10) {
        return `tel:+91${digits}`;
      }
    }

    // Check if it's an email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(processedLink)) {
      return `mailto:${processedLink}`;
    }

    // If it's already a full URL (http/https), return as is
    if (processedLink.startsWith('http://') || processedLink.startsWith('https://')) {
      return processedLink;
    }

    // If it looks like a URL without protocol, add https://
    if (processedLink.includes('.') && !processedLink.includes(' ')) {
      return `https://${processedLink}`;
    }

    // Return as is for other cases
    return processedLink;
  };

  const handleAnnouncementCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.text.trim()) return;

    try {
      const processedLink = processHyperlink(newAnnouncement.link);
      const announcement = await createAnnouncement(
        newAnnouncement.text,
        processedLink || undefined
      );
      setAnnouncements(prev => [...prev, announcement]);
      setNewAnnouncement({ text: '', link: '' });
    } catch (error) {
      alert('Failed to create announcement');
    }
  };

  const handleAnnouncementUpdate = async (id: string, text: string, link: string) => {
    try {
      const processedLink = processHyperlink(link);
      await updateAnnouncement(id, text, processedLink || undefined);
      setAnnouncements(prev =>
        prev.map(ann =>
          ann.id === id
            ? { ...ann, text, link: processedLink || undefined, updatedAt: new Date().toISOString() }
            : ann
        )
      );
      setEditingAnnouncement(null);
    } catch (error) {
      alert('Failed to update announcement');
    }
  };

  const handleAnnouncementDelete = async (id: string) => {
    // Prevent deletion of default ISKCON announcement
    if (id === 'iskcon-default') {
      alert('Cannot delete the default ISKCON announcement. This announcement is always present.');
      return;
    }

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

  // Show loading screen while checking authentication
  if (checkingAuth) {
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
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#ea580c'
          }}>
            ISKCON CMS Admin
          </div>
          <div style={{ color: '#6b7280' }}>
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

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
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    paddingRight: '3rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    color: '#111827',
                    backgroundColor: '#ffffff'
                  }}
                  placeholder=""
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    padding: '0.25rem'
                  }}
                >
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>
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
        {/* Tabs and Fallback Toggles */}
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
          {/* Fallback toggles */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '1rem',
            backgroundColor: '#fef3cd',
            borderRadius: '8px',
            border: '1px solid #ffc107',
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, color: '#856404' }}>
              <input
                type="checkbox"
                checked={!showFallbackImage}
                onChange={e => setShowFallbackImage(!e.target.checked)}
                style={{ accentColor: '#ea580c', width: '1.2em', height: '1.2em' }}
              />
              Enable Image Carousel on Homepage
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, color: '#856404' }}>
              <input
                type="checkbox"
                checked={!showFallbackAnnouncement}
                onChange={e => setShowFallbackAnnouncement(!e.target.checked)}
                style={{ accentColor: '#ea580c', width: '1.2em', height: '1.2em' }}
              />
              Enable CMS Announcements on Homepage
            </label>
            <span style={{ fontSize: '0.75rem', color: '#856404', marginLeft: 'auto' }}>
              (Unchecked = Show only fallback)
            </span>
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
                            disabled={image.id === 'jagannath-default'}
                            style={{
                              backgroundColor: image.id === 'jagannath-default' ? '#9ca3af' : '#ef4444',
                              color: 'white',
                              padding: '0.25rem 0.5rem',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              cursor: image.id === 'jagannath-default' ? 'not-allowed' : 'pointer',
                              opacity: image.id === 'jagannath-default' ? 0.6 : 1
                            }}
                            title={image.id === 'jagannath-default' ? 'Default image cannot be deleted' : 'Delete image'}
                          >
                            {image.id === 'jagannath-default' ? 'Default' : 'Delete'}
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
                    fontWeight: '500',
                    color: '#111827'
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
                      resize: 'vertical',
                      color: '#111827',
                      backgroundColor: '#ffffff'
                    }}
                    placeholder="Enter announcement text..."
                    required
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#111827'
                  }}>
                    Link (optional)
                  </label>
                  <input
                    type="text"
                    value={newAnnouncement.link}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, link: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      color: '#111827',
                      backgroundColor: '#ffffff'
                    }}
                    placeholder="Phone: 9876543210 | Email: example@domain.com | URL: https://example.com"
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
                  {announcements.map((announcement, index) => (
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
                              <span style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                backgroundColor: '#f3f4f6',
                                color: '#6b7280'
                              }}>
                                Position: {index + 1}
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
                            {index > 0 && (
                              <button
                                onClick={() => handleAnnouncementReorder(index, index - 1)}
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
                            {index < announcements.length - 1 && (
                              <button
                                onClick={() => handleAnnouncementReorder(index, index + 1)}
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
                            <button
                              onClick={() => handleAnnouncementDelete(announcement.id)}
                              disabled={announcement.id === 'iskcon-default'}
                              style={{
                                backgroundColor: announcement.id === 'iskcon-default' ? '#9ca3af' : '#ef4444',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                cursor: announcement.id === 'iskcon-default' ? 'not-allowed' : 'pointer',
                                opacity: announcement.id === 'iskcon-default' ? 0.6 : 1
                              }}
                              title={announcement.id === 'iskcon-default' ? 'Default announcement cannot be deleted' : 'Delete announcement'}
                            >
                              {announcement.id === 'iskcon-default' ? 'Default' : 'Delete'}
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
          fontWeight: '500',
          color: '#111827'
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
            resize: 'vertical',
            color: '#111827',
            backgroundColor: '#ffffff'
          }}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '500',
          color: '#111827'
        }}>
          Link (optional)
        </label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            color: '#111827',
            backgroundColor: '#ffffff'
          }}
          placeholder="Phone: 9876543210 | Email: example@domain.com | URL: https://example.com"
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
