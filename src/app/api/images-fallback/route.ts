import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for testing (will be lost on server restart)
let images: any[] = [
  {
    id: '1',
    url: '/krishna.jpg',
    filename: 'krishna.jpg',
    uploadedAt: new Date().toISOString()
  },
  {
    id: '2', 
    url: '/mahaprabhu.jpg',
    filename: 'mahaprabhu.jpg',
    uploadedAt: new Date().toISOString()
  },
  {
    id: '3',
    url: '/radhakrishna.jpg', 
    filename: 'radhakrishna.jpg',
    uploadedAt: new Date().toISOString()
  },
  {
    id: '4',
    url: '/siyaram.jpg',
    filename: 'siyaram.jpg', 
    uploadedAt: new Date().toISOString()
  },
  {
    id: '5',
    url: '/charan.jpeg',
    filename: 'charan.jpeg',
    uploadedAt: new Date().toISOString()
  },
  {
    id: '6',
    url: '/hogwarts.jpg',
    filename: 'hogwarts.jpg',
    uploadedAt: new Date().toISOString()
  },
  {
    id: '7',
    url: '/mahaprabhu 2.jpg',
    filename: 'mahaprabhu 2.jpg',
    uploadedAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // For testing: create a mock image entry
    const newImage = {
      id: Date.now().toString(),
      url: `/uploaded-${file.name}`, // This won't actually work without storage
      filename: file.name,
      uploadedAt: new Date().toISOString()
    };

    images.push(newImage);

    return NextResponse.json({ 
      message: 'Image uploaded successfully (test mode)', 
      image: newImage 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { imageId } = await request.json();

    images = images.filter(img => img.id !== imageId);

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { images: newImages } = await request.json();
    
    images = newImages;

    return NextResponse.json({ message: 'Images reordered successfully' });
  } catch (error) {
    console.error('Error reordering images:', error);
    return NextResponse.json({ error: 'Failed to reorder images' }, { status: 500 });
  }
}
