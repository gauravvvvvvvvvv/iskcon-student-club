import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for testing (will be lost on server restart)
let announcements: any[] = [
  {
    id: '1',
    text: 'Welcome to ISKCON Student Center • Join us for daily morning programs at 6:30 AM • Bhagavad Gita classes every Sunday at 5 PM • Free prasadam for all students • Register for upcoming spiritual retreats • Follow us on social media for updates',
    link: '',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
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

    const newAnnouncement = {
      id: Date.now().toString(),
      text,
      link: link || '',
      isActive,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    announcements.push(newAnnouncement);

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

    announcements = announcements.map(announcement => {
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

    return NextResponse.json({ message: 'Announcement updated successfully' });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    announcements = announcements.filter(announcement => announcement.id !== id);

    return NextResponse.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }
}
