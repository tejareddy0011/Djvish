'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, Upload, Image as ImageIcon, Video, Link as LinkIcon } from 'lucide-react';
import { MediaItem, MediaType } from '@/lib/media-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MediaAdminPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [featured, setFeatured] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = ['Wedding', 'Party', 'Corporate', 'Performance', 'Cultural', 'Behind Scenes', 'Equipment'];

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/media');
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadedUrl(''); // Reset uploaded URL when new file is selected
      setUploadProgress(0);
      
      // Automatically upload the file
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const data = await response.json();
        setUploadedUrl(data.url);
        setUploadProgress(100);
      } catch (error) {
        console.error('Upload error:', error);
        alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setFile(null);
        // Reset file input
        const fileInput = e.target;
        if (fileInput) fileInput.value = '';
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadProgress(0), 1000); // Reset progress after a second
      }
    }
  };

  // uploadFile function is no longer needed as upload happens automatically
  // Keeping it for backward compatibility in handleSubmit
  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      setUploadedUrl(data.url);
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!category) {
      alert('Please select a Category');
      return;
    }

    let finalUrl = '';

    // Handle different media types
    if (mediaType === 'video-link') {
      // Validate URL
      if (!videoUrl.trim()) {
        alert('Please enter a video URL');
        return;
      }
      const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com)/i;
      if (!urlPattern.test(videoUrl)) {
        alert('Please enter a valid YouTube or Vimeo URL');
        return;
      }
      finalUrl = videoUrl.trim();
    } else {
      // For image or video file, we need to upload
      if (!file && !uploadedUrl) {
        alert('Please select and upload a file first');
        return;
      }

      // If file is selected but not uploaded yet, upload it
      if (file && !uploadedUrl) {
        try {
          finalUrl = await uploadFile();
        } catch (error) {
          return; // Error already shown in uploadFile
        }
      } else {
        finalUrl = uploadedUrl;
      }
    }

    // Create media item
    const newMedia: MediaItem = {
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: mediaType,
      src: finalUrl,
      alt: altText.trim() || 'Media item',
      category: category,
      createdAt: new Date().toISOString(),
      featured: featured,
      ...(title.trim() && { title: title.trim() }),
      ...(description.trim() && { description: description.trim() }),
    };

    // Save to API
    setIsUploading(true);
    try {
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedia),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save media');
      }

      // Reset form
      resetForm();
      await fetchMedia();
      alert('Media added successfully!');
    } catch (error) {
      console.error('Error saving media:', error);
      alert(`Failed to save media: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setMediaType('image');
    setFile(null);
    setVideoUrl('');
    setAltText('');
    setTitle('');
    setDescription('');
    setCategory('Wedding');
    setFeatured(false);
    setUploadedUrl('');
    setUploadProgress(0);
    setShowAddForm(false);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) {
      return;
    }

    try {
      const response = await fetch(`/api/media?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMedia();
        alert('Media deleted successfully!');
      } else {
        alert('Failed to delete media');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Media Gallery Admin
            </h1>
            <p className="text-gray-400">Upload and manage your photos and videos</p>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showAddForm ? 'Cancel' : 'Add Media'}
          </Button>
        </div>

        {/* Add Media Form */}
        {showAddForm && (
          <Card className="mb-8 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Add New Media</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Media Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Media Type *
                  </label>
                  <Select value={mediaType} onValueChange={(value: MediaType) => {
                    setMediaType(value);
                    setFile(null);
                    setVideoUrl('');
                    setUploadedUrl('');
                    // Reset file input
                    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="image" className="cursor-pointer hover:bg-slate-700 text-white">
                        📸 Image
                      </SelectItem>
                      <SelectItem value="video" className="cursor-pointer hover:bg-slate-700 text-white">
                        🎬 Video File
                      </SelectItem>
                      <SelectItem value="video-link" className="cursor-pointer hover:bg-slate-700 text-white">
                        🔗 Video Link (YouTube/Vimeo)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400 mt-1">
                    {mediaType === 'image' && 'Upload image files (JPG, PNG, GIF, WebP)'}
                    {mediaType === 'video' && 'Upload video files (MP4, WebM, MOV)'}
                    {mediaType === 'video-link' && 'Paste YouTube or Vimeo video URL'}
                  </p>
                </div>

                {/* File Upload or URL Input */}
                {mediaType === 'video-link' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Video URL (YouTube/Vimeo) *
                    </label>
                    <Input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Paste a YouTube or Vimeo video URL
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {mediaType === 'image' ? '📸 Image File' : '🎬 Video File'} *
                    </label>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 bg-slate-700/50">
                        <Input
                          type="file"
                          accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                          onChange={handleFileSelect}
                          className="bg-slate-700 border-slate-600 text-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                          disabled={isUploading}
                          required
                        />
                        {!file && !isUploading && (
                          <p className="text-xs text-gray-400 mt-2 text-center">
                            Click above to select a file (will upload automatically)
                          </p>
                        )}
                      </div>
                      
                      {file && (
                        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-sm text-white font-medium">{file.name}</p>
                              <p className="text-xs text-gray-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            {isUploading && (
                              <div className="flex items-center gap-2 text-orange-400">
                                <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm">Uploading...</span>
                              </div>
                            )}
                            {uploadedUrl && !isUploading && (
                              <div className="flex items-center gap-2 text-green-400">
                                <span className="text-lg">✓</span>
                                <span className="text-sm font-semibold">Uploaded!</span>
                              </div>
                            )}
                          </div>
                          {isUploading && (
                            <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                              <div 
                                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          )}
                          {uploadedUrl && !isUploading && (
                            <p className="text-xs text-green-400 mt-2">
                              ✓ File uploaded successfully! Now fill in the form below and click "Add Media"
                            </p>
                          )}
                        </div>
                      )}
                      
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2">
                        <p className="text-xs text-blue-300">
                          {mediaType === 'image'
                            ? '📸 Supported: JPG, PNG, GIF, WebP (max 10MB)'
                            : '🎬 Supported: MP4, WebM, MOV (max 100MB)'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Alt Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Alt Text / Description (optional)
                  </label>
                  <Input
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Describe this media (optional)..."
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title (optional)
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Event title..."
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description (optional)
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Additional details..."
                    className="bg-slate-700 border-slate-600 text-white"
                    rows={3}
                  />
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
                    Mark as Featured
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4 border-t border-slate-700">
                  <Button
                    type="submit"
                    disabled={isUploading || (mediaType !== 'video-link' && !uploadedUrl && !file)}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (uploadedUrl ? 'Saving...' : 'Uploading...') : 'Add Media'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="border-slate-600 text-gray-300"
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                </div>
                {mediaType !== 'video-link' && !uploadedUrl && file && !isUploading && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mt-2">
                    <p className="text-xs text-yellow-300">
                      ⚠️ Please wait for the file to finish uploading before submitting the form
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}

        {/* Media List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((item) => (
              <Card key={item.id} className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="relative aspect-video bg-slate-900">
                  {item.type === 'video' || item.type === 'video-link' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                      <Video className="w-12 h-12 text-orange-400" />
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-semibold">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  {item.title && (
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  )}
                  <p className="text-gray-400 text-sm line-clamp-2">{item.alt}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {media.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-400 text-lg">No media items yet. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
