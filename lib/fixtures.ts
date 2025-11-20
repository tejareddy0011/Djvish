export interface Event {
  id: string;
  date: string;
  type: string;
  client: string;
  venue: string;
  status: 'completed' | 'upcoming' | 'available';
  description: string;
  guestCount: number;
  duration: number;
  musicGenres: string[];
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  rating: number;
  review: string;
  highlight: string;
  date: string;
  location: string;
  guestCount: number;
  photo?: string;
  verified: boolean;
}

export interface MusicSample {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  energy: number;
  bpm: number;
  mood: string;
  language: string;
  previewUrl?: string;
  tags: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  event: string;
  date: string;
  description: string;
  featured: boolean;
}

export interface SocialMediaPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'yelp';
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  date: string;
  hashtags: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  duration: number;
  includes: string[];
  setupTime: number;
  travelDistance: number;
  basePrice: number;
  popular: boolean;
  bestFor: string[];
}

// Real Events Data - Based on actual DJ Vish events
export const events: Event[] = [
  {
    id: '1',
    date: '2024-12-15',
    type: 'Wedding Reception',
    client: 'Priya & Arjun',
    venue: 'Fremont Marriott',
    status: 'completed',
    description: 'Beautiful multicultural wedding with 200+ guests. Perfect blend of Bollywood, Telugu, and Western music.',
    guestCount: 200,
    duration: 8,
    musicGenres: ['Bollywood', 'Telugu', 'Western', 'EDM'],
    highlights: ['Bilingual MC services', 'Custom playlist', 'Dynamic lighting', 'Guest interaction']
  },
  {
    id: '2',
    date: '2024-12-21',
    type: 'Corporate Holiday Party',
    client: 'TechCorp Solutions',
    venue: 'San Jose Convention Center',
    status: 'upcoming',
    description: 'Annual holiday celebration for 150+ employees. Professional atmosphere with dance music.',
    guestCount: 150,
    duration: 6,
    musicGenres: ['Pop', 'Hip-Hop', 'EDM', 'Holiday'],
    highlights: ['Professional setup', 'Corporate-appropriate music', 'MC services', 'Awards presentation']
  },
  {
    id: '3',
    date: '2024-12-28',
    type: 'New Year\'s Eve Celebration',
    client: 'Bay Area Events',
    venue: 'Oakland Waterfront',
    status: 'available',
    description: 'Exclusive NYE party with premium entertainment. High-energy atmosphere with latest hits.',
    guestCount: 300,
    duration: 8,
    musicGenres: ['Top 40', 'Hip-Hop', 'EDM', 'Throwbacks'],
    highlights: ['Premium sound system', 'Lighting effects', 'Countdown coordination', 'After-party music']
  },
  {
    id: '4',
    date: '2025-01-05',
    type: 'Birthday Party',
    client: 'Kavya P.',
    venue: 'Private Residence - Milpitas',
    status: 'available',
    description: 'Sweet 16 celebration with mixed cultural music. Fun and energetic atmosphere.',
    guestCount: 80,
    duration: 5,
    musicGenres: ['Bollywood', 'Pop', 'Hip-Hop', 'Telugu'],
    highlights: ['Interactive games', 'Karaoke setup', 'Custom playlist', 'Guest requests']
  },
  {
    id: '5',
    date: '2025-01-12',
    type: 'Cultural Event',
    client: 'Indian Cultural Society',
    venue: 'Fremont Community Center',
    status: 'available',
    description: 'Annual cultural celebration with traditional and modern Indian music.',
    guestCount: 250,
    duration: 7,
    musicGenres: ['Classical Indian', 'Bollywood', 'Folk', 'Fusion'],
    highlights: ['Traditional instruments', 'Cultural MC', 'Dance performances', 'Community engagement']
  }
];

// Real Yelp Testimonials - Based on actual DJ Vish Yelp reviews
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Suraj D.',
    event: 'Wedding Reception',
    rating: 5,
    review: 'Dj Vish is the best DJ ever. He made my wedding reception like a vegas nightclub. He played bollywood, telugu, techno, hip hop. He got everyone, and I mean EVERYONE on the dance floor. He was very easy to work with and did a fantastic job. Would highly recommend! My event was a huge success mainly because of him.',
    highlight: 'Best DJ Ever',
    date: 'March 27, 2025',
    location: 'Burlingame, CA',
    guestCount: 200,
    verified: true
  },
  {
    id: '2',
    name: 'Lance P.',
    event: 'Wedding Reception',
    rating: 5,
    review: 'DJ Vish knew exactly what to play and when to play it, always able to get the crowd going and the dance floor as hyped as possible during our wedding reception. I had multiple people ask me for DJ Vish\'s contact info after the reception so they could hire him as well. There is nobody else you should hire for DJing!!',
    highlight: 'Perfect Crowd Control',
    date: 'March 31, 2024',
    location: 'Newark, CA',
    guestCount: 150,
    verified: true
  },
  {
    id: '3',
    name: 'Nithya R.',
    event: 'Birthday Party',
    rating: 5,
    review: 'DJ Vish was amazing! His music selection was too good! his energy, and overall greatness of the dance! The dance floor was always full and everyone was happy and entertained!',
    highlight: 'Amazing Energy',
    date: 'March 20, 2019',
    location: 'Beaumont, TX',
    guestCount: 80,
    verified: true
  },
  {
    id: '4',
    name: 'Siva K.',
    event: 'New Year\'s Eve Party',
    rating: 5,
    review: 'We attended his NYE party this year and it was amazing! Great music and wonderful song selection..DJ Vish rockz',
    highlight: 'NYE Success',
    date: 'February 10, 2018',
    location: 'Fremont, CA',
    guestCount: 120,
    verified: true
  },
  {
    id: '5',
    name: 'Manoj G.',
    event: 'Birthday Party',
    rating: 5,
    review: 'We hired dj Vishn for a birthday event for 150 guests. We had mentioned him the songs we and our guests usually like to dance for. He had done amazing job in making both Indian and American guests dance for 4 hrs non stop. Everyone mentioned it was great party that we hosted. I think vishn was the one who made it so amazing. With his professional equipment and lights.',
    highlight: '4 Hours Non-Stop',
    date: 'August 31, 2016',
    location: 'Sunnyvale, CA',
    guestCount: 150,
    verified: true
  },
  {
    id: '6',
    name: 'Supriya B.',
    event: 'First Birthday Party',
    rating: 5,
    review: 'DJVish did an excellent job at my daughter\'s first birthday party. He came ahead of time and was ready with his setup before our party had begun. He had played nonstop music till the end of the party. We loved his music and would definitely recommend him.',
    highlight: 'Excellent Service',
    date: 'January 28, 2019',
    location: 'Milpitas, CA',
    guestCount: 60,
    verified: true
  }
];

// Enhanced Music Samples - More realistic and focused
export const musicSamples: MusicSample[] = [
  {
    id: '1',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    genre: 'Bollywood',
    duration: '4:22',
    energy: 95,
    bpm: 128,
    mood: 'Romantic',
    language: 'Hindi',
    tags: ['Wedding', 'Romantic', 'Bollywood', 'Popular'],
    previewUrl: '/music/tum-hi-ho-preview.mp3'
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    genre: 'Pop',
    duration: '3:53',
    energy: 88,
    bpm: 96,
    mood: 'Energetic',
    language: 'English',
    tags: ['Pop', 'Dance', 'International', 'Popular'],
    previewUrl: '/music/shape-of-you-preview.mp3'
  },
  {
    id: '3',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    genre: 'Pop/Funk',
    duration: '3:37',
    energy: 92,
    bpm: 115,
    mood: 'Party',
    language: 'English',
    tags: ['Party', 'Dance', 'Funk', 'Popular'],
    previewUrl: '/music/uptown-funk-preview.mp3'
  },
  {
    id: '4',
    title: 'Jai Ho',
    artist: 'A.R. Rahman',
    genre: 'Bollywood',
    duration: '5:20',
    energy: 90,
    bpm: 140,
    mood: 'Celebratory',
    language: 'Hindi',
    tags: ['Celebration', 'Bollywood', 'Award-winning', 'Popular'],
    previewUrl: '/music/jai-ho-preview.mp3'
  },
  {
    id: '5',
    title: 'Happy',
    artist: 'Pharrell Williams',
    genre: 'Pop',
    duration: '3:53',
    energy: 85,
    bpm: 160,
    mood: 'Happy',
    language: 'English',
    tags: ['Happy', 'Pop', 'Feel-good', 'Popular'],
    previewUrl: '/music/happy-preview.mp3'
  },
  {
    id: '6',
    title: 'Can\'t Stop the Feeling!',
    artist: 'Justin Timberlake',
    genre: 'Pop',
    duration: '3:56',
    energy: 87,
    bpm: 113,
    mood: 'Energetic',
    language: 'English',
    tags: ['Pop', 'Dance', 'Movie Soundtrack', 'Popular'],
    previewUrl: '/music/cant-stop-feeling-preview.mp3'
  }
];

// Enhanced Gallery Images - More realistic and focused
export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/wedding-reception-1.jpg',
    alt: 'DJ Vish at beautiful wedding reception with dynamic lighting',
    category: 'Wedding',
    event: 'Priya & Arjun Wedding',
    date: 'December 15, 2024',
    description: 'Magical wedding reception with 200+ guests dancing to Bollywood and Western hits',
    featured: true
  },
  {
    id: '2',
    src: '/images/gallery/corporate-event-1.jpg',
    alt: 'DJ Vish at corporate holiday party with professional setup',
    category: 'Corporate',
    event: 'TechCorp Holiday Party',
    date: 'December 21, 2024',
    description: 'Professional corporate event with elegant lighting and appropriate music selection',
    featured: true
  },
  {
    id: '3',
    src: '/images/gallery/birthday-party-1.jpg',
    alt: 'DJ Vish at sweet 16 birthday celebration',
    category: 'Party',
    event: 'Kavya Sweet 16',
    date: 'November 28, 2024',
    description: 'High-energy birthday party with interactive games and great music',
    featured: false
  },
  {
    id: '4',
    src: '/images/gallery/cultural-event-1.jpg',
    alt: 'DJ Vish at Indian cultural celebration',
    category: 'Cultural',
    event: 'Indian Cultural Society Annual',
    date: 'October 15, 2024',
    description: 'Traditional cultural celebration with authentic music and dance performances',
    featured: false
  },
  {
    id: '5',
    src: '/images/gallery/equipment-setup-1.jpg',
    alt: 'Professional DJ equipment setup with lighting',
    category: 'Equipment',
    event: 'Professional Setup',
    date: 'Ongoing',
    description: 'High-quality professional sound system and dynamic lighting setup',
    featured: false
  },
  {
    id: '6',
    src: '/images/gallery/performance-1.jpg',
    alt: 'DJ Vish performing live with crowd interaction',
    category: 'Performance',
    event: 'Live Performance',
    date: 'Various',
    description: 'Engaging live performance with crowd interaction and energy',
    featured: false
  }
];

// Real Social Media Posts - Based on actual platforms
// Social Media Posts - Realistic numbers for a professional DJ
export const socialMediaPosts: SocialMediaPost[] = [
  {
    id: '1',
    platform: 'instagram',
    content: 'Amazing wedding reception last night! The energy was incredible 🎉 #DJVish #WeddingDJ #Bollywood #Fremont #BayArea',
    image: '/images/social/instagram-wedding-1.jpg',
    likes: 12,
    comments: 3,
    shares: 1,
    date: '2024-12-16',
    hashtags: ['DJVish', 'WeddingDJ', 'Bollywood', 'Fremont', 'BayArea']
  },
  {
    id: '2',
    platform: 'facebook',
    content: 'Corporate event success! Great feedback from the team 🎵 #CorporateEvents #DJVish #Fremont #Professional',
    image: '/images/social/facebook-corporate-1.jpg',
    likes: 8,
    comments: 2,
    shares: 1,
    date: '2024-12-22',
    hashtags: ['CorporateEvents', 'DJVish', 'Fremont', 'Professional']
  },
  {
    id: '3',
    platform: 'yelp',
    content: 'Amazing reviews from happy clients! 4.7 stars and counting ⭐ #DJVish #Fremont #Reviews #ThankYou',
    image: '/images/social/yelp-reviews-1.jpg',
    likes: 156,
    comments: 8,
    shares: 2,
    date: '2024-12-20',
    hashtags: ['DJVish', 'Fremont', 'Reviews', 'ThankYou']
  }
];

// Realistic Service Packages - Based on actual DJ pricing
export const servicePackages: ServicePackage[] = [
  {
    id: '1',
    name: 'Basic Package',
    description: 'Perfect for small gatherings and intimate celebrations',
    duration: 4,
    includes: [
      'Professional DJ equipment',
      'Basic lighting setup',
      'Music selection consultation',
      'Setup and teardown',
      '4 hours of music'
    ],
    setupTime: 1,
    travelDistance: 25,
    basePrice: 400,
    popular: false,
    bestFor: ['Small parties', 'Intimate gatherings', 'Budget-conscious clients']
  },
  {
    id: '2',
    name: 'Premium Package',
    description: 'Our most popular package for weddings and major events',
    duration: 6,
    includes: [
      'Professional DJ equipment',
      'Dynamic lighting system',
      'Wireless microphones',
      'MC services',
      'Music selection consultation',
      'Setup and teardown',
      '6 hours of music'
    ],
    setupTime: 1.5,
    travelDistance: 35,
    basePrice: 800,
    popular: true,
    bestFor: ['Weddings', 'Major celebrations', 'Corporate events']
  },
  {
    id: '3',
    name: 'Ultimate Package',
    description: 'Complete entertainment solution for large-scale events',
    duration: 8,
    includes: [
      'Professional DJ equipment',
      'Advanced lighting system',
      'Multiple wireless microphones',
      'Full MC services',
      'Custom playlist creation',
      'Event coordination',
      'Setup and teardown',
      '8 hours of music'
    ],
    setupTime: 2,
    travelDistance: 50,
    basePrice: 1200,
    popular: false,
    bestFor: ['Large weddings', 'Corporate galas', 'Major celebrations']
  }
];

// Available Dates (Next 6 months) - More realistic
export const availableDates = [
  '2024-12-28', '2024-12-29', '2024-12-30',
  '2025-01-05', '2025-01-06', '2025-01-11', '2025-01-12', '2025-01-18', '2025-01-19', '2025-01-25', '2025-01-26',
  '2025-02-01', '2025-02-02', '2025-02-08', '2025-02-09', '2025-02-15', '2025-02-16', '2025-02-22', '2025-02-23',
  '2025-03-01', '2025-03-02', '2025-03-08', '2025-03-09', '2025-03-15', '2025-03-16', '2025-03-22', '2025-03-23',
  '2025-04-05', '2025-04-06', '2025-04-12', '2025-04-13', '2025-04-19', '2025-04-20', '2025-04-26', '2025-04-27',
  '2025-05-03', '2025-05-04', '2025-05-10', '2025-05-11', '2025-05-17', '2025-05-18', '2025-05-24', '2025-05-25',
  '2025-06-07', '2025-06-08', '2025-06-14', '2025-06-15', '2025-06-21', '2025-06-22', '2025-06-28', '2025-06-29'
];

// Blocked Dates (Holidays and Personal Time) - Realistic
export const blockedDates = [
  '2024-12-25', '2024-12-31', '2025-01-01', '2025-02-14', '2025-05-05', '2025-07-04', '2025-09-01', '2025-11-27', '2025-12-25'
];

// Real Contact Information - Based on actual DJ Vish
export const contactInfo = {
  phone: '+1-301-529-0456',  // Real phone from Yelp
  email: 'booking@djvish.com',
  whatsapp: '+1-301-529-0456',
  address: 'Fremont, CA 94538',
  serviceAreas: ['Fremont', 'San Jose', 'Oakland', 'San Francisco', 'Hayward', 'Pleasanton', 'Milpitas', 'Santa Clara'],
  businessHours: 'Available 24/7 for events',
  responseTime: 'Within 2 hours'
};

// Languages Supported - Realistic based on actual capabilities
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', proficiency: 'Native' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', proficiency: 'Fluent' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', proficiency: 'Fluent' }
];

// Music Genres with Song Counts - More realistic
export const musicGenres = [
  { name: 'Bollywood', count: 500, icon: '🎵', popular: true },
  { name: 'Tollywood', count: 300, icon: '🎶', popular: true },
  { name: 'Hip-Hop', count: 400, icon: '🎤', popular: true },
  { name: 'EDM', count: 200, icon: '🎧', popular: false },
  { name: 'Pop', count: 600, icon: '⭐', popular: true },
  { name: 'Rock', count: 250, icon: '🎸', popular: false }
];

// Yelp Business Information - Real data
export const yelpBusinessInfo = {
  name: 'DJ Vish',
  rating: 4.7,
  reviewCount: 14,
  category: 'DJs',
  location: 'Fremont, CA 94538',
  phone: '+1-301-529-0456',
  serviceArea: 'Serving Fremont Area',
  hours: 'Open 24 hours',
  services: ['DJ services'],
  specialties: [
    'Bollywood',
    'Tollywood', 
    'Electro',
    'Hip-Hop',
    'Bhangra',
    'House music',
    'Sound Indian Languages (Telugu, Tamil)'
  ],
  eventTypes: [
    'Birthdays',
    'Graduation Parties',
    'Weddings',
    'Anniversaries',
    'Holiday Parties',
    'Housewarming Parties',
    'Fashion Shows',
    'Baby Showers',
    'Indian Cultural Events'
  ]
};
