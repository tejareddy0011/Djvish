import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { MediaItem } from '@/lib/media-data';

const DATA_DIR = join(process.cwd(), 'data');
const MEDIA_FILE_PATH = join(DATA_DIR, 'media.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist, that's fine
  }
}

// GET - Fetch all media items (sorted by newest first)
export async function GET() {
  try {
    await ensureDataDir();
    const fileContents = await readFile(MEDIA_FILE_PATH, 'utf8');
    const media: MediaItem[] = JSON.parse(fileContents);
    
    // Sort by newest first
    const sortedMedia = media.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json(sortedMedia);
  } catch (error) {
    console.error('Error reading media file:', error);
    // Return empty array if file doesn't exist yet
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Add new media item
export async function POST(request: NextRequest) {
  try {
    const newMedia: MediaItem = await request.json();
    
    // Validate required fields
    if (!newMedia.src || !newMedia.alt || !newMedia.category) {
      return NextResponse.json(
        { error: 'Missing required fields: src, alt, category' },
        { status: 400 }
      );
    }
    
    await ensureDataDir();
    
    // Read existing media
    let media: MediaItem[] = [];
    try {
      const fileContents = await readFile(MEDIA_FILE_PATH, 'utf8');
      media = JSON.parse(fileContents);
    } catch {
      // File doesn't exist, start with empty array
      media = [];
    }
    
    // Generate ID if not provided
    if (!newMedia.id) {
      newMedia.id = `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Set createdAt if not provided
    if (!newMedia.createdAt) {
      newMedia.createdAt = new Date().toISOString();
    }
    
    // Add new media item
    media.push(newMedia);
    
    // Sort by newest first
    media.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Write back to file
    await writeFile(MEDIA_FILE_PATH, JSON.stringify(media, null, 2), 'utf8');
    
    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    console.error('Error adding media:', error);
    return NextResponse.json(
      { error: 'Failed to add media item' },
      { status: 500 }
    );
  }
}

// DELETE - Remove media item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Media ID is required' },
        { status: 400 }
      );
    }
    
    await ensureDataDir();
    
    // Read existing media
    const fileContents = await readFile(MEDIA_FILE_PATH, 'utf8');
    const media: MediaItem[] = JSON.parse(fileContents);
    
    // Remove item
    const filteredMedia = media.filter(item => item.id !== id);
    
    // Write back to file
    await writeFile(MEDIA_FILE_PATH, JSON.stringify(filteredMedia, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media item' },
      { status: 500 }
    );
  }
}

