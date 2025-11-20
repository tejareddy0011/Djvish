# 📸🎬 How to Upload Photos & Videos - Step by Step Guide

## 📸 Uploading Photos

### 1. **Access Admin Panel**
   - Go to: `http://localhost:3000/admin/media`
   - Or on your live site: `https://yourdomain.com/admin/media`

### 2. **Click "Add Media" Button**
   - You'll see a large orange/red button at the top right
   - Click it to open the upload form

### 3. **Select Media Type**
   - Choose **"Image"** from the dropdown (it's selected by default)
   - This tells the system you're uploading a photo

### 4. **Choose Your Photo**
   - Click the file input field
   - Browse your computer and select your photo
   - Supported formats: JPG, PNG, GIF, WebP
   - The file will automatically upload to Vercel Blob Storage
   - You'll see "✓ Uploaded Successfully" when it's done

### 5. **Fill in Required Information**
   - **Alt Text** (Required): Describe the photo (e.g., "DJ Vish at wedding reception")
   - **Category** (Required): Choose from dropdown:
     - Wedding
     - Party
     - Corporate
     - Performance
     - Cultural
     - Behind Scenes
     - Equipment

### 6. **Add Optional Details**
   - **Title**: Event name (e.g., "Priya & Arjun Wedding")
   - **Description**: Additional details about the event
   - **Featured**: Check this box to highlight your best work

### 7. **Click "Add Media"**
   - Your photo is now saved!
   - It will automatically appear in the gallery
   - Newest photos appear first

---

## 🎬 Uploading Videos

You have **TWO options** for adding videos:

### Option A: Upload Video File (Recommended for small files)

1. **Click "Add Media"** button

2. **Select Media Type**
   - Choose **"Video File"** from the dropdown

3. **Choose Your Video File**
   - Click the file input field
   - Browse and select your video file
   - Supported formats: MP4, WebM, MOV
   - **Note**: Large video files may take time to upload
   - You'll see upload progress and "✓ Uploaded Successfully" when done

4. **Fill in Required Information**
   - **Alt Text** (Required): Describe the video (e.g., "DJ Vish live performance")
   - **Category** (Required): Choose from dropdown

5. **Add Optional Details**
   - **Title**: Event name
   - **Description**: Additional details
   - **Featured**: Check if this is your best work

6. **Click "Add Media"**
   - Your video is now saved and will appear in the gallery!

### Option B: Add Video Link (Recommended for large files or YouTube/Vimeo)

1. **Click "Add Media"** button

2. **Select Media Type**
   - Choose **"Video Link (YouTube/Vimeo)"** from the dropdown

3. **Paste Video URL**
   - Copy the URL from YouTube or Vimeo
   - Paste it into the "Video URL" field
   - Examples:
     - YouTube: `https://www.youtube.com/watch?v=xxxxx`
     - YouTube Short: `https://youtu.be/xxxxx`
     - Vimeo: `https://vimeo.com/xxxxx`

4. **Fill in Required Information**
   - **Alt Text** (Required): Describe the video
   - **Category** (Required): Choose from dropdown

5. **Add Optional Details**
   - **Title**: Event name
   - **Description**: Additional details
   - **Featured**: Check if this is your best work

6. **Click "Add Media"**
   - Your video link is now saved!
   - The video will play directly from YouTube/Vimeo in your gallery

---

## 🎯 Which Method Should I Use?

### Use Video File Upload When:
- ✅ Video is under 100MB
- ✅ You want full control over the video
- ✅ Video is not on YouTube/Vimeo
- ✅ You want it hosted on your own CDN

### Use Video Link When:
- ✅ Video is already on YouTube/Vimeo
- ✅ Video file is very large (over 100MB)
- ✅ You want better performance (YouTube/Vimeo CDN)
- ✅ You want to save storage space
- ✅ You want to leverage YouTube/Vimeo's optimization

**💡 Pro Tip**: For best performance, use YouTube/Vimeo links instead of uploading large video files!

---

## 📋 Complete Examples

### Example 1: Uploading a Photo

1. **Navigate to Admin Panel**
   ```
   http://localhost:3000/admin/media
   ```

2. **Click "Add Media"** (orange button, top right)

3. **Form appears with:**
   - Media Type: Select "Image" ✓
   - Category: Select "Wedding" ✓
   - Image File: Click "Choose File" → Select your photo
   - Wait for "✓ Uploaded Successfully" message
   - Alt Text: Type "DJ Vish performing at wedding reception"
   - Title: Type "Beautiful Bay Area Wedding"
   - Description: Type "Creating magical moments with Bollywood and Western hits"
   - Featured: ☑ Check if this is your best work

4. **Click "Add Media" button**

5. **Success!** Your photo is now in the gallery!

### Example 2: Uploading a Video File

1. **Navigate to Admin Panel**
   ```
   http://localhost:3000/admin/media
   ```

2. **Click "Add Media"** (orange button, top right)

3. **Form appears with:**
   - Media Type: Select "Video File" ✓
   - Category: Select "Performance" ✓
   - Video File: Click "Choose File" → Select your video (MP4, WebM, MOV)
   - Wait for upload progress and "✓ Uploaded Successfully" message
   - Alt Text: Type "DJ Vish live performance at wedding"
   - Title: Type "High-Energy Wedding Reception"
   - Description: Type "Full performance video with crowd interaction"
   - Featured: ☑ Check if this is your best work

4. **Click "Add Media" button**

5. **Success!** Your video is now in the gallery!

### Example 3: Adding a YouTube Video Link

1. **Navigate to Admin Panel**
   ```
   http://localhost:3000/admin/media
   ```

2. **Click "Add Media"** (orange button, top right)

3. **Form appears with:**
   - Media Type: Select "Video Link (YouTube/Vimeo)" ✓
   - Category: Select "Performance" ✓
   - Video URL: Paste `https://www.youtube.com/watch?v=xxxxx`
   - Alt Text: Type "DJ Vish live mix on YouTube"
   - Title: Type "Latest Mix - Bollywood Hits"
   - Description: Type "Check out my latest mix featuring the hottest Bollywood tracks"
   - Featured: ☑ Check if this is your best work

4. **Click "Add Media" button**

5. **Success!** Your YouTube video is now embedded in the gallery!

---

## 🎯 Tips for Best Results

### Photo Quality
- **Recommended size**: 1920x1080px or larger
- **File size**: Under 10MB for faster uploads
- **Format**: JPG for photos, PNG for graphics with transparency

### Video Quality
- **Video Files**: 
  - Recommended: MP4 format (H.264 codec)
  - Max file size: 100MB (larger files may take time)
  - Resolution: 1080p or 720p for best balance
- **Video Links**:
  - YouTube/Vimeo links work best
  - No file size limits
  - Automatic optimization by YouTube/Vimeo
  - Better performance and faster loading

### Organization
- Use **descriptive alt text** - helps with SEO and accessibility
- Choose **consistent categories** - makes filtering easier
- Add **titles** for important events - shows in the gallery hover

### Featured Items
- Mark your **best work** as featured
- Featured items stand out in the gallery
- Use sparingly (5-10 featured items max)

---

## 🔧 Troubleshooting

### "Upload Failed" Error
**Solution:**
1. Check that `BLOB_READ_WRITE_TOKEN` is in your `.env.local` file
2. Restart your dev server after adding the token
3. Make sure the file isn't too large (try under 5MB)

### Photo Not Showing
**Solution:**
1. Check browser console for errors
2. Verify the upload completed (you saw "✓ Uploaded")
3. Refresh the page
4. Check that all required fields are filled

### "BLOB_READ_WRITE_TOKEN not configured"
**Solution:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project → Settings → Storage
3. Create a Blob store or use existing one
4. Copy the `BLOB_READ_WRITE_TOKEN`
5. Add to `.env.local`:
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx
   ```
6. Restart your dev server

---

## 📱 Mobile Upload

You can also upload photos from your phone:
1. Open the admin panel on your mobile browser
2. Follow the same steps
3. When you click "Choose File", you can:
   - Take a photo with your camera
   - Select from your photo library

---

## 📦 Uploading Multiple Items

Currently, upload one item at a time:
1. Upload first photo/video → Click "Add Media"
2. Click "Add Media" button again
3. Upload second item → Click "Add Media"
4. Repeat for each item

**Tip:** Keep the form open and just change the file/type for faster bulk uploads!

**For Videos:** If you have many videos, consider uploading them to YouTube first, then adding the links - it's much faster!

---

## ✅ What Happens After Upload?

### For Photos:
1. **File is uploaded** to Vercel Blob Storage (CDN)
2. **Metadata is saved** to `data/media.json`
3. **Photo appears** in the gallery automatically
4. **Newest first** - your new photo appears at the top
5. **Auto-optimized** - Next.js optimizes the image for web

### For Video Files:
1. **File is uploaded** to Vercel Blob Storage (CDN)
2. **Metadata is saved** to `data/media.json`
3. **Video appears** in the gallery automatically
4. **Newest first** - your new video appears at the top
5. **Playable** - Visitors can play the video directly in the gallery

### For Video Links:
1. **Link is saved** to `data/media.json`
2. **Video appears** in the gallery automatically
3. **Embedded player** - Uses YouTube/Vimeo's player
4. **Newest first** - your new video appears at the top
5. **Optimized** - Leverages YouTube/Vimeo's CDN for best performance

---

## 🎨 Gallery Display

Your uploaded photos and videos will:
- ✅ Appear in the main Gallery section
- ✅ Be automatically optimized for fast loading
- ✅ Support hover effects and full-screen viewing
- ✅ Be filterable by category
- ✅ Show newest items first
- ✅ Videos play in a lightweight player (react-player)
- ✅ Video links embed YouTube/Vimeo players
- ✅ Grid and list view options

## 🎬 Video-Specific Features

- **Play Button**: Videos show a play button overlay in the gallery
- **Full-Screen Modal**: Click any video to play in full-screen
- **Auto-Play**: Videos start playing when opened in the modal
- **Controls**: Full video controls (play, pause, volume, fullscreen)
- **Thumbnails**: Video links use YouTube/Vimeo thumbnails automatically

---

## 📊 Quick Comparison

| Feature | Photo Upload | Video File Upload | Video Link |
|---------|-------------|-------------------|------------|
| File Size Limit | 10MB | 100MB | Unlimited |
| Upload Speed | Fast | Medium-Slow | Instant |
| Storage | Your CDN | Your CDN | YouTube/Vimeo |
| Optimization | Auto | Manual | Auto (by platform) |
| Best For | Photos | Small videos | Large videos, existing content |

---

**That's it! You're ready to start uploading your gig photos and videos! 📸🎬🎉**

