'use client';

import { useState } from 'react';
import { Plus, X, Filter, Grid, List, Download, Share2, Heart } from 'lucide-react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
  date?: string;
  featured?: boolean;
}

interface GalleryManagerProps {
  images: GalleryImage[];
  onImageAdd?: (image: GalleryImage) => void;
  onImageRemove?: (id: string) => void;
  onImageUpdate?: (id: string, updates: Partial<GalleryImage>) => void;
}

export function GalleryManager({ 
  images, 
  onImageAdd, 
  onImageRemove, 
  onImageUpdate 
}: GalleryManagerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const categories = ['all', 'weddings', 'parties', 'corporate', 'cultural', 'behind-scenes', 'equipment'];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleAddImage = (imageData: Partial<GalleryImage>) => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      src: imageData.src || '',
      alt: imageData.alt || '',
      category: imageData.category || 'parties',
      title: imageData.title || '',
      description: imageData.description || '',
      date: imageData.date || new Date().toISOString().split('T')[0],
      featured: imageData.featured || false,
    };
    
    onImageAdd?.(newImage);
    setIsAddModalOpen(false);
  };

  const handleUpdateImage = (id: string, updates: Partial<GalleryImage>) => {
    onImageUpdate?.(id, updates);
    setIsEditModalOpen(false);
    setSelectedImage(null);
  };

  const handleRemoveImage = (id: string) => {
    onImageRemove?.(id);
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Gallery Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-orange-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-700 text-white px-3 py-1 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add Image Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Image Count */}
      <div className="text-gray-400 text-sm">
        Showing {filteredImages.length} of {images.length} photos
      </div>

      {/* Gallery Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
        : 'space-y-4'
      }>
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={`group relative bg-slate-800 rounded-lg overflow-hidden border border-orange-500/30 hover:border-orange-400 transition-all duration-300 ${
              viewMode === 'list' ? 'flex items-center space-x-4 p-4' : ''
            }`}
          >
            {/* Image */}
            <div className={`relative ${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square'}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={viewMode === 'list' ? '96px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <button
                  onClick={() => handleImageClick(image)}
                  className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                  aria-label="View image"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedImage(image);
                    setIsEditModalOpen(true);
                  }}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="Edit image"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Featured Badge */}
              {image.featured && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}
            </div>

            {/* Image Info */}
            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <h3 className="text-white font-semibold mb-1">{image.title || image.alt}</h3>
              <p className="text-gray-400 text-sm mb-2">{image.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-orange-400 text-xs font-mono uppercase">{image.category}</span>
                {image.date && (
                  <span className="text-gray-500 text-xs">{image.date}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-white text-lg font-semibold mb-4">Add New Photo</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddImage({
                src: formData.get('src') as string,
                alt: formData.get('alt') as string,
                category: formData.get('category') as string,
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                featured: formData.get('featured') === 'on',
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Image URL</label>
                  <input
                    type="url"
                    name="src"
                    required
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Alt Text</label>
                  <input
                    type="text"
                    name="alt"
                    required
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Description of the image"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Title (Optional)</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Photo title"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Description (Optional)</label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Brief description of the photo"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    className="rounded border-orange-500/30 text-orange-500 focus:ring-orange-400"
                  />
                  <label htmlFor="featured" className="text-gray-300 text-sm">
                    Mark as featured
                  </label>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300"
                >
                  Add Photo
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {isEditModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-white text-lg font-semibold mb-4">Edit Photo</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUpdateImage(selectedImage.id, {
                alt: formData.get('alt') as string,
                category: formData.get('category') as string,
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                featured: formData.get('featured') === 'on',
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Alt Text</label>
                  <input
                    type="text"
                    name="alt"
                    defaultValue={selectedImage.alt}
                    required
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={selectedImage.category}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedImage.title}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedImage.description}
                    rows={3}
                    className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="featured"
                    id="edit-featured"
                    defaultChecked={selectedImage.featured}
                    className="rounded border-orange-500/30 text-orange-500 focus:ring-orange-400"
                  />
                  <label htmlFor="edit-featured" className="text-gray-300 text-sm">
                    Mark as featured
                  </label>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300"
                >
                  Update Photo
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && !isEditModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="rounded-lg"
                style={{ maxHeight: '80vh', width: 'auto' }}
              />
            </div>
            <div className="bg-slate-800 rounded-lg p-4 mt-4">
              <h3 className="text-white text-xl font-semibold mb-2">{selectedImage.title || selectedImage.alt}</h3>
              {selectedImage.description && (
                <p className="text-gray-300 mb-2">{selectedImage.description}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="text-orange-400 font-mono uppercase">{selectedImage.category}</span>
                {selectedImage.date && <span>{selectedImage.date}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
