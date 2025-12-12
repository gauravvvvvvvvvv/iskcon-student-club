// Utility functions for fetching dynamic content
"use client";

export interface CarouselImage {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

export interface Announcement {
  id: string;
  text: string;
  link?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Fetch carousel images
export async function fetchCarouselImages(): Promise<CarouselImage[]> {
  try {
    const response = await fetch('/api/images');
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
}

// Fetch announcements
export async function fetchAnnouncements(): Promise<Announcement[]> {
  try {
    const response = await fetch('/api/announcements');
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }
    const data = await response.json();
    return data.announcements?.filter((ann: Announcement) => ann.isActive) || [];
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
}

// Upload new image
export async function uploadImage(file: File): Promise<CarouselImage> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/images', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.image;
}

// Delete image
export async function deleteImage(imageId: string, blobUrl: string): Promise<void> {
  const response = await fetch('/api/images', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageId, blobUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
}

// Reorder images
export async function reorderImages(images: CarouselImage[]): Promise<void> {
  const response = await fetch('/api/images', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ images }),
  });

  if (!response.ok) {
    throw new Error('Failed to reorder images');
  }
}

// Create announcement
export async function createAnnouncement(text: string, link?: string): Promise<Announcement> {
  const response = await fetch('/api/announcements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, link }),
  });

  if (!response.ok) {
    throw new Error('Failed to create announcement');
  }

  const data = await response.json();
  return data.announcement;
}

// Update announcement
export async function updateAnnouncement(id: string, text: string, link?: string, isActive?: boolean): Promise<void> {
  const response = await fetch('/api/announcements', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, text, link, isActive }),
  });

  if (!response.ok) {
    throw new Error('Failed to update announcement');
  }
}

// Delete announcement
export async function deleteAnnouncement(id: string): Promise<void> {
  const response = await fetch('/api/announcements', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete announcement');
  }
}

// Reorder announcements
export async function reorderAnnouncements(announcements: Announcement[]): Promise<void> {
  const response = await fetch('/api/announcements', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ announcements }),
  });

  if (!response.ok) {
    throw new Error('Failed to reorder announcements');
  }
}

// Authenticate admin
export async function authenticateAdmin(password: string, deviceFingerprint?: string): Promise<boolean> {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, deviceFingerprint }),
    });

    return response.ok;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

// Logout admin
export async function logoutAdmin(): Promise<void> {
  await fetch('/api/auth', {
    method: 'DELETE',
  });
}

// Global Settings
export interface SiteSettings {
  enableCarousel: boolean;
  enableAnnouncements: boolean;
}

export async function fetchSettings(): Promise<SiteSettings> {
  try {
    const response = await fetch('/api/settings');
    if (!response.ok) return { enableCarousel: true, enableAnnouncements: true };
    return await response.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    return { enableCarousel: true, enableAnnouncements: true };
  }
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error('Failed to update settings');
  return await response.json();
}
