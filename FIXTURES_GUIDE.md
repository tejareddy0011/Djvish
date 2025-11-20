# 🎧 DJ Vish Website - Fixtures & Customization Guide

## 📁 **What Are Fixtures?**

Fixtures are sample data files that make your website look professional and realistic. They include:
- **Events data** - Real event examples
- **Testimonials** - Client reviews and feedback
- **Music samples** - Song information and previews
- **Gallery images** - Event photos and equipment shots
- **Social media posts** - Instagram, Facebook, and Yelp content
- **Service packages** - Pricing and service details

## 🚀 **Quick Start - Customize Your Content**

### **1. Update Contact Information**
Edit `lib/fixtures.ts` and change:
```typescript
export const contactInfo = {
  phone: '+1-408-555-1234',        // ← Your real phone number
  email: 'booking@djvish.com',     // ← Your real email
  whatsapp: '+1-408-555-1234',    // ← Your real WhatsApp
  address: 'Fremont, CA 94538',    // ← Your real address
  // ... other details
};
```

### **2. Add Your Real Events**
Replace the sample events with your actual bookings:
```typescript
export const events: Event[] = [
  {
    id: '1',
    date: '2024-12-15',
    type: 'Wedding Reception',
    client: 'Your Real Client Name',
    venue: 'Actual Venue Name',
    // ... add real details
  }
];
```

### **3. Update Testimonials**
Replace with real client feedback:
```typescript
export const testimonials: Testimonial[] = [
  {
    name: 'Real Client Name',
    event: 'Actual Event Type',
    review: 'Real client review...',
    // ... other details
  }
];
```

## 📸 **Adding Real Images**

### **Gallery Images**
1. **Place your photos** in `public/images/gallery/`
2. **Update the fixtures** in `lib/fixtures.ts`:
```typescript
export const galleryImages: GalleryImage[] = [
  {
    src: '/images/gallery/your-wedding-photo.jpg',  // ← Your real photo
    alt: 'Description of your photo',
    category: 'Wedding',
    event: 'Real Event Name',
    // ... other details
  }
];
```

### **Social Media Images**
1. **Add social media screenshots** to `public/images/social/`
2. **Update social media posts** with real content

### **Equipment Photos**
1. **Add your DJ setup photos** to `public/images/equipment/`
2. **Showcase your professional gear**

## 🎵 **Adding Real Music**

### **Music Previews**
1. **Create 30-second preview clips** of your music
2. **Place them** in `public/music/`
3. **Update music samples** with real track info:
```typescript
export const musicSamples: MusicSample[] = [
  {
    title: 'Your Real Song Title',
    artist: 'Actual Artist Name',
    genre: 'Real Genre',
    previewUrl: '/music/your-song-preview.mp3',  // ← Your real preview
    // ... other details
  }
];
```

## 📅 **Update Availability Calendar**

### **Available Dates**
Edit the available dates array with your real availability:
```typescript
export const availableDates = [
  '2025-01-15',  // ← Your available dates
  '2025-01-22',
  '2025-01-29',
  // ... add more
];
```

### **Blocked Dates**
Add your holidays and personal time off:
```typescript
export const blockedDates = [
  '2025-01-01',  // ← New Year's Day
  '2025-02-14',  // ← Valentine's Day
  '2025-05-05',  // ← Cinco de Mayo
  // ... add more
];
```

## 💰 **Customize Service Packages**

### **Pricing & Services**
Update your actual service offerings:
```typescript
export const servicePackages: ServicePackage[] = [
  {
    name: 'Your Package Name',
    basePrice: 500,  // ← Your real price
    includes: [
      'Your real service 1',
      'Your real service 2',
      // ... add more
    ],
    // ... other details
  }
];
```

## 🌍 **Update Language Support**

### **Languages You Speak**
Edit the languages array:
```typescript
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', proficiency: 'Native' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', proficiency: 'Fluent' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', proficiency: 'Fluent' },
  // Add or remove languages you actually speak
];
```

## 📱 **Social Media Integration**

### **Real Social Media Data**
Update with your actual social media information:
```typescript
export const socialMediaPosts: SocialMediaPost[] = [
  {
    platform: 'instagram',
    content: 'Your real Instagram post content...',
    image: '/images/social/your-instagram-post.jpg',
    likes: 245,  // ← Your real engagement numbers
    // ... other details
  }
];
```

## 🔧 **How to Use Fixtures in Your Website**

### **Import Fixtures**
In your components, import the fixtures:
```typescript
import { testimonials, events, musicSamples } from '@/lib/fixtures';
```

### **Use in Components**
Replace hardcoded data with fixtures:
```typescript
// Before (hardcoded)
const testimonials = [
  { name: "John Doe", review: "Great service..." }
];

// After (using fixtures)
import { testimonials } from '@/lib/fixtures';
```

## 📋 **Checklist for Customization**

- [ ] **Contact Information** - Phone, email, address
- [ ] **Real Events** - Replace sample events with actual bookings
- [ ] **Client Testimonials** - Add real client feedback
- [ ] **Gallery Photos** - Add your event photos
- [ ] **Music Samples** - Add real song information
- [ ] **Service Packages** - Update with real pricing
- [ ] **Availability Calendar** - Set your real available dates
- [ ] **Social Media** - Add real posts and engagement data
- [ ] **Languages** - Update languages you actually speak

## 🎯 **Pro Tips**

1. **Start with contact info** - Most important for clients
2. **Add real photos** - Nothing builds trust like real event photos
3. **Update testimonials** - Real client feedback is gold
4. **Keep availability current** - Update blocked dates regularly
5. **Add new events** - Keep your calendar fresh and current

## 🆘 **Need Help?**

If you need help customizing any specific section:
1. **Check the fixtures file** - `lib/fixtures.ts`
2. **Look at the examples** - Each section has sample data
3. **Follow the patterns** - Use the same structure for your data
4. **Test your changes** - Make sure the website still works

## 🎉 **You're Ready!**

Once you've customized the fixtures with your real information, your DJ Vish website will look incredibly professional and authentic. The fixtures provide a solid foundation that you can build upon with your real content!

---

**Remember**: Fixtures are just starting points. Replace them with your real information to make your website truly yours! 🎧✨
