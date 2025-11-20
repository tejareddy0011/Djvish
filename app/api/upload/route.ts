import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check if BLOB_READ_WRITE_TOKEN is available
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'BLOB_READ_WRITE_TOKEN not configured. Please add it to your .env.local file.' },
        { status: 500 }
      );
    }

    // Generate unique filename to avoid conflicts
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    const fileExtension = file.name.split('.').pop();
    const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    const uniqueFileName = `${fileNameWithoutExt}_${timestamp}_${randomSuffix}.${fileExtension}`;

    const blob = await put(uniqueFileName, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true, // Additional safety to ensure unique filenames
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : String(error);
    
    // Log detailed error for debugging
    console.error('Upload error details:', {
      message: errorMessage,
      details: errorDetails,
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      tokenLength: process.env.BLOB_READ_WRITE_TOKEN?.length || 0,
    });
    
    return NextResponse.json(
      { 
        error: `Failed to upload file: ${errorMessage}`,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}

