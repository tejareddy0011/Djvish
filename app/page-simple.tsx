'use client';

import { useState, useEffect } from 'react';
import { Headphones, Phone, Mail, MapPin, Play, Pause, Volume2, Calendar, Users, Star, Music, Camera, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from './actions';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  message: string;
}

export default function DJVishSite() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth) * 100;
      const yPos = (clientY / innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${xPos}%`);
      document.documentElement.style.setProperty('--mouse-y', `${yPos}%`);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(form);
      if (result.success) {
        setSubmitStatus('success');
        setForm({ name: '', email: '', phone: '', eventDate: '', eventType: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const playTrack = (trackId: number) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const galleryImages = [
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9083-ZOLxXh9mqS5DSFYCjWqZdlxxcsHmDV.jpeg", alt: "DJ Vish at wedding reception", category: "Wedding" },
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9085-C6yR8sgxxTypoyWWaWQr2CrVWq8Bgc.jpeg", alt: "DJ Vish performing live", category: "Performance" },
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9082-c8XZXBnbiXwi7gXteRmMfrubi07ezA.jpeg", alt: "DJ Vish at corporate event", category: "Corporate" },
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9084-1Rkk25tcsmbZreg8TPNmWHDsZvmceY.jpeg", alt: "DJ Vish at birthday party", category: "Party" }
  ];

  return (
    <div className="bg-slate-900 text-white font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Headphones className="w-8 h-8 text-orange-400" />
              <span className="text-xl font-bold text-white">DJ VISH</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-orange-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-orange-400 transition-colors">Services</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-300 hover:text-orange-400 transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300">Book Now</button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-orange-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-700">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-orange-400 transition-colors text-left">About</button>
                <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-orange-400 transition-colors text-left">Services</button>
                <button onClick={() => scrollToSection('gallery')} className="text-gray-300 hover:text-orange-400 transition-colors text-left">Gallery</button>
                <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300 text-left">Book Now</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden pt-16">
        {/* DJ Hands Background Image */}
        <div className="absolute inset-0 bg-slate-900 bg-cover bg-center bg-no-repeat bg-[url('/images/dj-hands-background.jpg')]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-orange-950/70 to-red-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950 via-transparent to-transparent"></div>
        </div>
                
        <div className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-6xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  🎧
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent font-mono tracking-wider">
              DJ VISH
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Professional DJ Services in the Bay Area
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Specializing in Bollywood, Tollywood, Hip-Hop, and EDM for weddings, parties, and corporate events. 
              Creating unforgettable musical experiences that keep everyone dancing all night long.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Event
            </Button>
            <Button 
              onClick={() => scrollToSection('gallery')}
              variant="outline"
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              <Camera className="w-5 h-5 mr-2" />
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="px-6 py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
              <div className="text-gray-400">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">5+</div>
              <div className="text-gray-400">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
              <div className="text-gray-400">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-16 max-w-4xl mx-auto relative">
        {/* Subtle DJ Background */}
        <div className="absolute inset-0 bg-slate-800 bg-cover bg-center bg-no-repeat opacity-10 bg-[url('/images/dj-hands-background.jpg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-red-500/5 rounded-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-orange-400 text-center font-mono tracking-wider">ABOUT DJ VISH</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                DJ Vish is a passionate and experienced DJ based in Fremont, CA, specializing in creating unforgettable musical experiences for all types of events.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                With expertise in Bollywood, Tollywood, Hip-Hop, and EDM, DJ Vish knows how to read the crowd and keep the dance floor packed all night long.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Professional DJ Equipment
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Bilingual MC Services (English, Hindi, Telugu)
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Dynamic Lighting & Sound Systems
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Custom Playlists & Song Requests
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-slate-800 border border-orange-600 rounded-lg p-6">
                <div className="text-6xl mb-4">🎧</div>
                <h3 className="text-xl font-semibold text-white mb-3">Professional DJ Services</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Serving the entire Bay Area with professional DJ equipment and personalized service for every event.
                </p>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  Get Your Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-orange-400 text-center font-mono tracking-wider">SERVICES</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-orange-600 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">💒</div>
              <h3 className="text-xl font-semibold text-white mb-3">Weddings & Special Events</h3>
              <p className="text-gray-300 mb-4">
                Complete wedding DJ services including ceremony music, cocktail hour, and reception entertainment with custom playlists and MC services.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Custom wedding playlists</li>
                <li>• Ceremony & reception music</li>
                <li>• Professional MC services</li>
                <li>• Bilingual announcements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-red-600 hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
            <CardContent className="p-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-white mb-3">Parties & Corporate Events</h3>
              <p className="text-gray-300 mb-4">
                Dynamic entertainment for birthday parties, corporate events, anniversaries, and celebrations of all kinds.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Corporate event entertainment</li>
                <li>• Birthday & anniversary parties</li>
                <li>• Cultural celebrations</li>
                <li>• Interactive crowd engagement</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="px-6 py-16 bg-gradient-to-r from-blue-900/10 to-cyan-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center font-mono tracking-wider">GALLERY</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">{image.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center font-mono tracking-wider">BOOK DJ VISH</h2>
        <Card className="bg-slate-800 border-cyan-600">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300 mb-2">Event Date</label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={form.eventDate}
                    onChange={handleChange}
                    className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 focus:border-cyan-400 focus:outline-none"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="cultural">Cultural Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400"
                  placeholder="Tell us about your event..."
                  rows={4}
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-full font-semibold transition-all duration-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              
              {submitStatus === 'success' && (
                <div className="text-center text-green-400 font-semibold">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-center text-red-400 font-semibold">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </CardContent>
        </Card>
        
        {/* Contact Info */}
        <div className="mt-8 text-center">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Phone className="w-5 h-5 text-orange-400" />
              <span>(301) 529-0456</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Mail className="w-5 h-5 text-orange-400" />
              <span>booking@djvish.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <MapPin className="w-5 h-5 text-orange-400" />
              <span>Fremont, CA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Headphones className="w-8 h-8 text-orange-400" />
            <span className="text-xl font-bold text-white">DJ VISH</span>
          </div>
          <p className="text-gray-400 mb-4">
            Professional DJ Services in the Bay Area
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://www.instagram.com/vish_dj?igsh=ZjN0eXoxOHNmbGY5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors">
              Instagram
            </a>
            <a href="https://www.facebook.com/vishnu.ch?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors">
              Facebook
            </a>
            <a href="https://www.yelp.com/biz/dj-vish-fremont-2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors">
              Yelp
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 DJ Vish. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Live Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-slate-800 border border-cyan-600 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-semibold text-sm group-hover:text-cyan-300 transition-colors">Live Chat Available</span>
            <div className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300">💬</div>
          </div>
        </div>
      </div>
    </div>
  );
}
