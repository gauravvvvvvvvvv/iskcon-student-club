// API route for managing carousel images
import { NextRequest, NextResponse } from 'next/server';
import { put, del, list } from '@vercel/blob';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    // Get image list from KV store
    const images = await kv.get('carousel_images') || [];
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

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // Get current images from KV
    const currentImages = await kv.get('carousel_images') || [];
    
    // Add new image
    const newImage = {
      id: Date.now().toString(),
      url: blob.url,
      filename: file.name,
      uploadedAt: new Date().toISOString()
    };

    const updatedImages = [...currentImages, newImage];
    
    // Save to KV store
    await kv.set('carousel_images', updatedImages);

    return NextResponse.json({ 
      message: 'Image uploaded successfully', 
      image: newImage 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { imageId, blobUrl } = await request.json();

    // Delete from Vercel Blob
    if (blobUrl) {
      await del(blobUrl);
    }

    // Remove from KV store
    const currentImages = await kv.get('carousel_images') || [];
    const updatedImages = currentImages.filter((img: any) => img.id !== imageId);
    await kv.set('carousel_images', updatedImages);

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { images } = await request.json();
    
    // Reorder images in KV store
    await kv.set('carousel_images', images);

    return NextResponse.json({ message: 'Images reordered successfully' });
  } catch (error) {
    console.error('Error reordering images:', error);
    return NextResponse.json({ error: 'Failed to reorder images' }, { status: 500 });
  }
}
