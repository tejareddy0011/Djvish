# Media Gallery Setup Guide

## Overview

Your DJ website now has a fully functional media gallery that supports both photos and videos! You can upload new content anytime through the admin interface without touching any code.

## Features

✅ **Photo & Video Support** - Upload images, video files, or video links (YouTube/Vimeo)  
✅ **Auto-Optimization** - Images are automatically optimized using Next.js Image  
✅ **Lightweight Video Player** - Uses react-player for smooth video playback  
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  
✅ **Category Filtering** - Filter by Wedding, Party, Corporate, Performance, etc.  
✅ **Grid & List Views** - Switch between grid and list layouts  
✅ **Newest First** - All media automatically sorted by upload date  
✅ **Featured Items** - Mark special items as featured  
✅ **Full-Screen Modal** - Click any item to view in full detail  

## Setup Instructions

### 1. Environment Variables

Add your Vercel Blob Storage token to `.env.local`:

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

To get your token:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project → Settings → Storage
3. Create a new Blob store or use an existing one
4. Copy the `BLOB_READ_WRITE_TOKEN`

### 2. Access the Admin Interface

Visit: `http://localhost:3000/admin/media`

This is your content management system where you can:
- Upload new photos and videos
- Add video links (YouTube/Vimeo)
- Edit media details
- Delete items
- Mark items as featured

### 3. Uploading Media

#### Option A: Upload Image/Video Files
1. Click "Add Media" button
2. Select "Image" or "Video File" as type
3. Choose your file (supports all common formats)
4. Fill in the required fields:
   - **Alt Text**: Description for accessibility
   - **Category**: Wedding, Party, Corporate, etc.
   - **Title** (optional): Event name
   - **Description** (optional): Additional details
5. Check "Featured" if you want it highlighted
6. Click "Add Media"

#### Option B: Add Video Link
1. Click "Add Media" button
2. Select "Video Link (YouTube/Vimeo)" as type
3. Paste your YouTube or Vimeo URL
4. Fill in the required fields
5. Click "Add Media"

### 4. Managing Media

- **View All**: See all your uploaded media in the admin panel
- **Delete**: Click the trash icon on any item to remove it
- **Featured**: Toggle featured status when adding/editing

## File Structure

```
data/
  └── media.json          # Stores all media metadata (auto-generated)

app/
  ├── api/
  │   ├── media/          # API routes for CRUD operations
  │   └── upload/         # File upload handler
  └── admin/
      └── media/          # Admin interface

components/
  └── media-gallery.tsx   # Main gallery component

lib/
  └── media-data.ts       # Type definitions and helpers
```

## How It Works

1. **Storage**: Files are stored in Vercel Blob Storage (CDN-optimized)
2. **Metadata**: Media information is stored in `data/media.json`
3. **Display**: The gallery component fetches from the API and displays everything
4. **Sorting**: Automatically sorted by newest first (based on `createdAt`)

## Tips

- **Image Optimization**: Next.js automatically optimizes images for web
- **Video Performance**: For best results, use YouTube/Vimeo links instead of large video files
- **Categories**: Use consistent category names for better filtering
- **Featured Items**: Use featured status for your best work
- **Alt Text**: Always add descriptive alt text for accessibility

## Troubleshooting

### Upload Fails
- Check that `BLOB_READ_WRITE_TOKEN` is set in `.env.local`
- Restart your dev server after adding the token
- Ensure you have write permissions to the `data/` directory

### Media Not Showing
- Check browser console for errors
- Verify the API route is working: `http://localhost:3000/api/media`
- Ensure `data/media.json` exists and is valid JSON

### Video Not Playing
- For video links, ensure the URL is a valid YouTube/Vimeo link
- For video files, ensure the format is supported (MP4, WebM, etc.)

## Next Steps

1. Set up your Vercel Blob Storage token
2. Visit `/admin/media` to start uploading
3. Your gallery will automatically update on the main page!

Enjoy your new media gallery! 🎉📸🎬

