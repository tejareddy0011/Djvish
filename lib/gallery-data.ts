// Gallery data for DJ Vish's portfolio
// This file contains sample images organized by categories
// You can easily add more images by following the same structure

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
  date?: string;
  featured?: boolean;
}

// Sample gallery images organized by categories
export const galleryImages: GalleryImage[] = [
  // Wedding Events
  {
    id: 'wedding-1',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
    alt: 'DJ Vish at elegant wedding reception',
    category: 'weddings',
    title: 'Elegant Wedding Reception',
    description: 'Creating magical moments at a beautiful Bay Area wedding with a perfect blend of Bollywood and Western hits.',
    date: '2024-01-15',
    featured: true
  },
  {
    id: 'wedding-2',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop',
    alt: 'Multicultural wedding celebration',
    category: 'weddings',
    title: 'Multicultural Wedding Celebration',
    description: 'Bridging cultures through music at a beautiful Indian-American wedding ceremony.',
    date: '2024-02-20',
    featured: false
  },
  {
    id: 'wedding-3',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    alt: 'Outdoor wedding reception setup',
    category: 'weddings',
    title: 'Outdoor Wedding Reception',
    description: 'Professional sound system setup for an intimate outdoor wedding celebration.',
    date: '2024-03-10',
    featured: false
  },

  // Party Events
  {
    id: 'party-1',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    alt: 'Birthday party celebration',
    category: 'parties',
    title: 'Sweet 16 Birthday Bash',
    description: 'High-energy birthday celebration with the latest hits and classic party anthems.',
    date: '2024-01-28',
    featured: true
  },
  {
    id: 'party-2',
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
    alt: 'Graduation party celebration',
    category: 'parties',
    title: 'Graduation Celebration',
    description: 'Celebrating academic achievements with family and friends in style.',
    date: '2024-05-15',
    featured: false
  },
  {
    id: 'party-3',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    alt: 'Anniversary party setup',
    category: 'parties',
    title: '25th Anniversary Party',
    description: 'Romantic anniversary celebration with love songs and golden oldies.',
    date: '2024-04-12',
    featured: false
  },

  // Corporate Events
  {
    id: 'corporate-1',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    alt: 'Corporate holiday party',
    category: 'corporate',
    title: 'Tech Company Holiday Party',
    description: 'Professional corporate event with sophisticated music selection and elegant atmosphere.',
    date: '2023-12-15',
    featured: true
  },
  {
    id: 'corporate-2',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    alt: 'Product launch event',
    category: 'corporate',
    title: 'Product Launch Event',
    description: 'Creating excitement and energy for a major product launch with dynamic music.',
    date: '2024-01-30',
    featured: false
  },
  {
    id: 'corporate-3',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    alt: 'Team building event',
    category: 'corporate',
    title: 'Team Building Celebration',
    description: 'Fostering team spirit through music and entertainment at company events.',
    date: '2024-02-18',
    featured: false
  },

  // Cultural Events
  {
    id: 'cultural-1',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    alt: 'Diwali celebration',
    category: 'cultural',
    title: 'Diwali Festival Celebration',
    description: 'Traditional Indian festival celebration with Bollywood hits and cultural music.',
    date: '2023-11-12',
    featured: true
  },
  {
    id: 'cultural-2',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    alt: 'Holi festival celebration',
    category: 'cultural',
    title: 'Holi Festival of Colors',
    description: 'Vibrant Holi celebration with traditional and modern Indian music.',
    date: '2024-03-25',
    featured: false
  },
  {
    id: 'cultural-3',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    alt: 'Telugu cultural event',
    category: 'cultural',
    title: 'Telugu Cultural Association Event',
    description: 'Celebrating Telugu culture with traditional music and modern fusion.',
    date: '2024-01-08',
    featured: false
  },

  // Behind the Scenes
  {
    id: 'behind-1',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    alt: 'DJ Vish setting up equipment',
    category: 'behind-scenes',
    title: 'Setting Up Professional Equipment',
    description: 'Behind the scenes: Professional setup process ensuring perfect sound quality.',
    date: '2024-02-10',
    featured: false
  },
  {
    id: 'behind-2',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    alt: 'Sound check and testing',
    category: 'behind-scenes',
    title: 'Sound Check and Testing',
    description: 'Ensuring perfect audio quality before every event with thorough testing.',
    date: '2024-03-05',
    featured: false
  },
  {
    id: 'behind-3',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    alt: 'Lighting setup process',
    category: 'behind-scenes',
    title: 'Dynamic Lighting Setup',
    description: 'Creating the perfect atmosphere with professional lighting systems.',
    date: '2024-01-20',
    featured: false
  },

  // Equipment Showcase
  {
    id: 'equipment-1',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    alt: 'Professional DJ equipment setup',
    category: 'equipment',
    title: 'Professional DJ Setup',
    description: 'State-of-the-art DJ equipment including Pioneer CDJs and professional sound system.',
    date: '2024-02-15',
    featured: true
  },
  {
    id: 'equipment-2',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    alt: 'Wireless microphone system',
    category: 'equipment',
    title: 'Wireless Microphone System',
    description: 'Professional wireless microphones for MC services and announcements.',
    date: '2024-03-01',
    featured: false
  },
  {
    id: 'equipment-3',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    alt: 'Dynamic lighting system',
    category: 'equipment',
    title: 'Dynamic Lighting System',
    description: 'Professional lighting setup creating the perfect atmosphere for any event.',
    date: '2024-01-25',
    featured: false
  }
];

// Helper functions for gallery management
export const getImagesByCategory = (category: string): GalleryImage[] => {
  if (category === 'all') return galleryImages;
  return galleryImages.filter(img => img.category === category);
};

export const getFeaturedImages = (): GalleryImage[] => {
  return galleryImages.filter(img => img.featured);
};

export const getRecentImages = (count: number = 6): GalleryImage[] => {
  return galleryImages
    .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
    .slice(0, count);
};

export const getCategories = (): string[] => {
  return [...new Set(galleryImages.map(img => img.category))];
};

// Sample image URLs for easy addition
export const sampleImageUrls = {
  weddings: [
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
  ],
  parties: [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
  ],
  corporate: [
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop'
  ],
  cultural: [
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
  ],
  'behind-scenes': [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop'
  ],
  equipment: [
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop'
  ]
};

// Quick add functions for common scenarios
export const addWeddingImage = (src: string, title?: string, description?: string): GalleryImage => ({
  id: `wedding-${Date.now()}`,
  src,
  alt: title || 'Wedding event',
  category: 'weddings',
  title,
  description,
  date: new Date().toISOString().split('T')[0],
  featured: false
});

export const addPartyImage = (src: string, title?: string, description?: string): GalleryImage => ({
  id: `party-${Date.now()}`,
  src,
  alt: title || 'Party event',
  category: 'parties',
  title,
  description,
  date: new Date().toISOString().split('T')[0],
  featured: false
});

export const addCorporateImage = (src: string, title?: string, description?: string): GalleryImage => ({
  id: `corporate-${Date.now()}`,
  src,
  alt: title || 'Corporate event',
  category: 'corporate',
  title,
  description,
  date: new Date().toISOString().split('T')[0],
  featured: false
});
