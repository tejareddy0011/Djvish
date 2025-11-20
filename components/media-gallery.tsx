'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Play, Image as ImageIcon, Video, Filter, Grid, List } from 'lucide-react';
import { MediaItem, MediaType } from '@/lib/media-data';
import dynamic from 'next/dynamic';

// Dynamically import react-player to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-800 flex items-center justify-center">Loading video...</div>
}) as React.ComponentType<any>;

interface MediaGalleryProps {
  initialMedia?: MediaItem[];
}

export function MediaGallery({ initialMedia = [] }: MediaGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(initialMedia.length === 0);

  // Fetch media on mount - only if not provided as initialMedia
  useEffect(() => {
    if (initialMedia.length === 0) {
      fetchMedia();
    } else {
      setMedia(initialMedia);
      setIsLoading(false);
    }
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

  const filteredMedia = filterCategory === 'all' 
    ? media 
    : media.filter(item => item.category.toLowerCase() === filterCategory.toLowerCase());

  const categories = ['all', ...Array.from(new Set(media.map(item => item.category)))];

  const openMedia = (item: MediaItem) => {
    setSelectedMedia(item);
  };

  const closeMedia = () => {
    setSelectedMedia(null);
  };

  const renderMediaItem = (item: MediaItem) => {
    const isVideo = item.type === 'video' || item.type === 'video-link';
    
    return (
      <div
        key={item.id}
        onClick={() => openMedia(item)}
        className="group relative cursor-pointer overflow-hidden rounded-lg bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
      >
        {viewMode === 'grid' ? (
          <div className="aspect-square relative">
            {isVideo ? (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.alt}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="text-6xl">🎬</div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-orange-500/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  {isVideo ? (
                    <Video className="w-4 h-4 text-orange-400" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-orange-400" />
                  )}
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                {item.title && (
                  <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-gray-300 text-xs line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            {/* Featured Badge */}
            {item.featured && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                ⭐ Featured
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 p-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-700">
              {isVideo ? (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" fill="white" />
                </div>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {isVideo ? (
                  <Video className="w-4 h-4 text-orange-400" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-orange-400" />
                )}
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              {item.title && (
                <h3 className="text-white font-bold text-base mb-1">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-gray-300 text-sm line-clamp-2">
                  {item.description}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-2">
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Filters and Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-5 h-5 text-orange-400" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filterCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
            aria-label="Grid view"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Media Grid/List */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-800 rounded-lg animate-pulse border border-slate-700"></div>
          ))}
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📸</div>
          <p className="text-gray-400 text-lg">No media found in this category</p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'space-y-4'
          }
        >
          {filteredMedia.map(renderMediaItem)}
        </div>
      )}

      {/* Media Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeMedia}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] bg-slate-900 rounded-lg overflow-hidden border-2 border-orange-500/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeMedia}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              {selectedMedia.type === 'video' || selectedMedia.type === 'video-link' ? (
                <div className="absolute inset-0 bg-black">
                  <ReactPlayer
                    url={selectedMedia.src}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    light={selectedMedia.thumbnail}
                  />
                </div>
              ) : (
                <Image
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              )}
            </div>

            <div className="p-6 bg-slate-900 border-t border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold uppercase tracking-wider border border-orange-500/30">
                  {selectedMedia.category}
                </span>
                {selectedMedia.featured && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold border border-yellow-500/30">
                    ⭐ Featured
                  </span>
                )}
              </div>
              {selectedMedia.title && (
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedMedia.title}
                </h2>
              )}
              {selectedMedia.description && (
                <p className="text-gray-300 mb-4">{selectedMedia.description}</p>
              )}
              <p className="text-gray-500 text-sm">
                Added {new Date(selectedMedia.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

