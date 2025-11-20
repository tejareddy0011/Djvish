// Media gallery data structure for DJ Vish website
// Supports both photos and videos
// Newest items appear first (sorted by createdAt)

export type MediaType = 'image' | 'video' | 'video-link';

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string; // URL for image, video file, or video link (YouTube/Vimeo)
  thumbnail?: string; // Optional thumbnail for videos
  alt: string;
  title?: string;
  description?: string;
  category: string;
  createdAt: string; // ISO date string
  featured?: boolean;
  eventDate?: string; // When the event occurred
  tags?: string[];
}

// Initial media items (will be loaded from JSON file)
export const initialMediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9083-ZOLxXh9mqS5DSFYCjWqZdlxxcsHmDV.jpeg',
    alt: 'DJ Vish at wedding reception',
    category: 'Wedding',
    createdAt: new Date().toISOString(),
    featured: true,
    title: 'Wedding Reception',
    description: 'Creating magical moments at a beautiful Bay Area wedding'
  },
  {
    id: '2',
    type: 'image',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9085-C6yR8sgxxTypoyWWaWQr2CrVWq8Bgc.jpeg',
    alt: 'DJ Vish performing live',
    category: 'Performance',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    featured: true,
    title: 'Live Performance',
    description: 'High-energy performance keeping the dance floor packed'
  },
  {
    id: '3',
    type: 'image',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9082-c8XZXBnbiXwi7gXteRmMfrubi07ezA.jpeg',
    alt: 'DJ Vish at corporate event',
    category: 'Corporate',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    featured: false,
    title: 'Corporate Event',
    description: 'Professional setup for corporate entertainment'
  },
  {
    id: '4',
    type: 'image',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9084-1Rkk25tcsmbZreg8TPNmWHDsZvmceY.jpeg',
    alt: 'DJ Vish at birthday party',
    category: 'Party',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    featured: false,
    title: 'Birthday Celebration',
    description: 'Fun-filled birthday party with great music'
  }
];

// Helper functions
export const getMediaByCategory = (category: string, media: MediaItem[]): MediaItem[] => {
  if (category === 'all') return media;
  return media.filter(item => item.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedMedia = (media: MediaItem[]): MediaItem[] => {
  return media.filter(item => item.featured);
};

export const getRecentMedia = (count: number, media: MediaItem[]): MediaItem[] => {
  return [...media]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
};

export const getCategories = (media: MediaItem[]): string[] => {
  return [...new Set(media.map(item => item.category))].sort();
};

export const isVideoLink = (url: string): boolean => {
  return /(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com)/i.test(url);
};

export const extractVideoId = (url: string): { platform: string; id: string } | null => {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (youtubeMatch) {
    return { platform: 'youtube', id: youtubeMatch[1] };
  }
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return { platform: 'vimeo', id: vimeoMatch[1] };
  }
  
  return null;
};

