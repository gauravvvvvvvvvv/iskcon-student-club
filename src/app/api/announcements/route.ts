// API route for managing announcements
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    // Get announcements from KV store
    const announcements = await kv.get('announcements') || [];
    return NextResponse.json({ announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, link, isActive = true } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Announcement text is required' }, { status: 400 });
    }

    // Get current announcements from KV
    const currentAnnouncements = await kv.get('announcements') || [];
    
    // Add new announcement
    const newAnnouncement = {
      id: Date.now().toString(),
      text,
      link: link || null,
      isActive,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedAnnouncements = [...currentAnnouncements, newAnnouncement];
    
    // Save to KV store
    await kv.set('announcements', updatedAnnouncements);

    return NextResponse.json({ 
      message: 'Announcement created successfully', 
      announcement: newAnnouncement 
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, text, link, isActive } = await request.json();

    // Get current announcements from KV
    const currentAnnouncements = await kv.get('announcements') || [];
    
    // Update announcement
    const updatedAnnouncements = currentAnnouncements.map((announcement: any) => {
      if (announcement.id === id) {
        return {
          ...announcement,
          text: text || announcement.text,
          link: link !== undefined ? link : announcement.link,
          isActive: isActive !== undefined ? isActive : announcement.isActive,
          updatedAt: new Date().toISOString()
        };
      }
      return announcement;
    });

    // Save to KV store
    await kv.set('announcements', updatedAnnouncements);

    return NextResponse.json({ message: 'Announcement updated successfully' });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    // Get current announcements from KV
    const currentAnnouncements = await kv.get('announcements') || [];
    
    // Remove announcement
    const updatedAnnouncements = currentAnnouncements.filter((announcement: any) => announcement.id !== id);
    
    // Save to KV store
    await kv.set('announcements', updatedAnnouncements);

    return NextResponse.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { announcements } = await request.json();

    if (!Array.isArray(announcements)) {
      return NextResponse.json({ error: 'Announcements array is required' }, { status: 400 });
    }

    // Save reordered announcements to KV store
    await kv.set('announcements', announcements);

    return NextResponse.json({ message: 'Announcements reordered successfully' });
  } catch (error) {
    console.error('Error reordering announcements:', error);
    return NextResponse.json({ error: 'Failed to reorder announcements' }, { status: 500 });
  }
}
