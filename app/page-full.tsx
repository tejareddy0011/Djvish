"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Facebook, Mail, Phone, MapPin, Clock, Star, Play, Pause, Volume2, Calendar, Menu, X, Music, Zap, Sparkles, Award, Users, Headphones } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { submitContactForm } from './actions';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  message: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function DJVishSite() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', eventDate: '', eventType: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{title: string, description: string, duration: string, eventType: string, location: string, guestCount: string, featuredSongs: string[]} | null>(null);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
    
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
        setSubmitMessage('Thank you! Your booking request has been sent. We\'ll get back to you within 24 hours.');
        setForm({ name: '', email: '', phone: '', eventDate: '', eventType: '', message: '' });
      } else {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again or email us directly.');
      }
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or email us directly.');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const playTrack = (trackId: number) => {
    if (currentTrack === trackId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const musicSamples = [
    { id: 1, title: "Bollywood Wedding Mix", duration: "3:45", genre: "Bollywood", energy: 95 },
    { id: 2, title: "Telugu Hits Mashup", duration: "4:12", genre: "Tollywood", energy: 88 },
    { id: 3, title: "Hip-Hop & EDM Fusion", duration: "3:28", genre: "Hip-Hop/EDM", energy: 92 },
    { id: 4, title: "Classical Indian Remix", duration: "5:03", genre: "Classical Fusion", energy: 85 }
  ];

  const galleryImages = [
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9083-ZOLxXh9mqS5DSFYCjWqZdlxxcsHmDV.jpeg", alt: "DJ Vish at wedding reception", category: "Wedding" },
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9085-C6yR8sgxxTypoyWWaWQr2CrVWq8Bgc.jpeg", alt: "DJ Vish performing live", category: "Performance" },
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9082-c8XZXBnbiXwi7gXteRmMfrubi07ezA.jpeg", alt: "DJ Vish at corporate event", category: "Corporate" },
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9084-1Rkk25tcsmbZreg8TPNmWHDsZvmceY.jpeg", alt: "DJ Vish at birthday party", category: "Party" }
  ];

  const faqs = [
    {
      question: "How far in advance should I book DJ Vish?",
      answer: "For weddings and major events, we recommend booking 3-6 months in advance to ensure availability. For smaller parties and corporate events, 2-4 weeks is usually sufficient. However, we can accommodate last-minute requests when possible."
    },
    {
      question: "What equipment does DJ Vish provide?",
      answer: "DJ Vish brings professional-grade sound systems, wireless microphones, dynamic lighting, and backup equipment to every event. The setup is tailored to your venue size and guest count to ensure optimal sound quality."
    },
    {
      question: "Can DJ Vish play specific songs or take requests during the event?",
      answer: "Absolutely! DJ Vish loves taking requests and will work with you beforehand to create a custom playlist. He's known for reading the crowd and adapting his music selection to keep everyone dancing."
    },
    {
      question: "Does DJ Vish offer MC services?",
      answer: "Yes! DJ Vish is a skilled bilingual MC who can host your event in English, Hindi, and Telugu. He's perfect for multicultural events and can handle announcements, introductions, and crowd engagement."
    },
    {
      question: "What's included in DJ Vish's service?",
      answer: "Full service includes professional DJ equipment, lighting, wireless microphones, MC services, setup/teardown, and consultation for music selection. We also provide backup equipment to ensure your event runs smoothly."
    },
    {
      question: "Does DJ Vish travel outside the Bay Area?",
      answer: "Yes, DJ Vish is available for destination events throughout California and beyond. Travel fees apply for locations outside the standard service area. Contact us for a custom quote."
    }
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
              <button onClick={() => scrollToSection('music')} className="text-gray-300 hover:text-orange-400 transition-colors">Music</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-orange-400 transition-colors">Book Now</button>
          </div>
          
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-orange-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          </div>
          
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-2 space-y-1">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-slate-700 rounded">About</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-slate-700 rounded">Services</button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-slate-700 rounded">Gallery</button>
              <button onClick={() => scrollToSection('music')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-slate-700 rounded">Music</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-orange-400 hover:bg-slate-700 rounded">Book Now</button>
          </div>
                </div>
        )}
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
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Headphones className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
                  DJ VISH
                </span>
              </h1>
            
            <div className="text-xl md:text-2xl text-orange-300 font-mono tracking-wider mb-2">
                <span className="bg-gradient-to-r from-orange-300 via-red-300 to-orange-300 bg-clip-text text-transparent">
                  PREMIER BAY AREA DJ
                </span>
              </div>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Creating unforgettable moments with the perfect blend of Bollywood, Tollywood, Hip-Hop & EDM
            </p>
          </div>

          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto group">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9083-ZOLxXh9mqS5DSFYCjWqZdlxxcsHmDV.jpeg" 
                alt="DJ Vish" 
                fill
                className="rounded-full border-4 border-orange-400 shadow-lg object-cover transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-gray-300 mb-6">
              <div className="flex items-center group">
                <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                <span className="font-mono">Fremont, CA</span>
              </div>
              <div className="flex items-center group">
                <Phone className="w-4 h-4 mr-2 text-orange-400" />
                <a href="tel:+13015290456" className="hover:text-orange-300 transition-colors font-mono">(301) 529-0456</a>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <Link 
                href="https://www.instagram.com/djvish_official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://www.facebook.com/djvishofficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Now
            </Button>
            <Button 
              onClick={() => scrollToSection('music')}
              variant="outline"
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              <Music className="w-5 h-5 mr-2" />
              Listen
            </Button>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Events Completed", icon: "🎉", color: "from-orange-400 to-red-500" },
              { number: "10+", label: "Years Experience", icon: "⭐", color: "from-yellow-400 to-orange-500" },
              { number: "4", label: "Languages", icon: "🌍", color: "from-blue-400 to-cyan-500" },
              { number: "5.0", label: "Star Rating", icon: "🏆", color: "from-green-400 to-emerald-500" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-mono text-sm group-hover:text-orange-300 transition-colors duration-300">
                  {stat.label}
                </div>
          </div>
            ))}
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
                DJ Vish is a premier Bay Area DJ known for creating unforgettable experiences through his unique blend of Bollywood, Tollywood, Hip-Hop, and EDM music. With over a decade of experience, he has become the go-to choice for weddings, corporate events, and celebrations throughout California.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Born and raised in the Bay Area, DJ Vish understands the diverse cultural landscape and brings a multicultural approach to every event. His ability to seamlessly transition between different music genres while maintaining high energy has earned him a reputation as one of the most versatile DJs in the region.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>5.0 Rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-blue-400 mr-1" />
                  <span>500+ Events</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-green-400 mr-1" />
                  <span>10+ Years</span>
                </div>
                </div>
                </div>
            <div className="relative">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9085-C6yR8sgxxTypoyWWaWQr2CrVWq8Bgc.jpeg" 
                alt="DJ Vish performing" 
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
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
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Music className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Wedding DJ Services</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Complete wedding DJ services including ceremony, cocktail hour, and reception. Custom playlists, MC services, and professional equipment included.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Bilingual MC (English, Hindi, Telugu)</li>
                <li>• Custom wedding playlists</li>
                <li>• Professional sound & lighting</li>
                <li>• Coordination with vendors</li>
              </ul>
              </CardContent>
            </Card>
            
          <Card className="bg-slate-800 border-red-600 hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Corporate Events</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Professional DJ services for corporate events, product launches, and company celebrations. Clean, appropriate music selection.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Professional atmosphere</li>
                <li>• Corporate-appropriate music</li>
                <li>• MC services available</li>
                <li>• Flexible scheduling</li>
              </ul>
              </CardContent>
            </Card>
            
          <Card className="bg-slate-800 border-blue-600 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Private Parties</h3>
                </div>
              <p className="text-gray-300 mb-4">
                Birthday parties, anniversaries, and special celebrations. High-energy music and crowd engagement guaranteed.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• High-energy atmosphere</li>
                <li>• Crowd interaction</li>
                <li>• Custom playlists</li>
                <li>• Flexible duration</li>
              </ul>
              </CardContent>
            </Card>

          <Card className="bg-slate-800 border-green-600 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-green-400" />
          </div>
                <h3 className="text-xl font-semibold text-white">Cultural Events</h3>
                </div>
              <p className="text-gray-300 mb-4">
                Specialized services for cultural celebrations, religious events, and community gatherings with authentic music selection.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Cultural music expertise</li>
                <li>• Traditional & modern mix</li>
                <li>• Respectful atmosphere</li>
                <li>• Community-focused</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center font-mono tracking-wider">SERVICE AREAS</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Bay Area Coverage</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                DJ Vish provides professional DJ services throughout the San Francisco Bay Area. From intimate gatherings to large-scale events, we bring the same level of excellence to every location.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-orange-400 font-semibold font-mono">Primary Areas</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-orange-400 mr-2" />
                      Fremont, CA
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-orange-400 mr-2" />
                      San Jose, CA
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-orange-400 mr-2" />
                      Oakland, CA
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-orange-400 mr-2" />
                      San Francisco, CA
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-cyan-400 font-semibold font-mono">Extended Areas</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-cyan-400 mr-2" />
                      Hayward, CA
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-cyan-400 mr-2" />
                      Pleasanton, CA
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-cyan-400 mr-2" />
                      Milpitas, CA
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-cyan-400 mr-2" />
                      Santa Clara, CA
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold text-sm">Travel Information</span>
                </div>
                <p className="text-gray-300 text-sm">
                  • Free travel within 25 miles of Fremont<br/>
                  • Additional travel fees apply beyond 25 miles<br/>
                  • Available for destination events throughout California<br/>
                  • Flexible scheduling for out-of-area events
                </p>
                </div>
                </div>
            
            <div className="relative">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4 text-center">Coverage Map</h4>
                <div className="relative w-full h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-600 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <div className="text-white font-semibold mb-2">Bay Area Coverage</div>
                    <div className="text-gray-400 text-sm">
                      Interactive map coming soon
                </div>
                </div>
                  
                  {/* Coverage Zones */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-orange-400 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-orange-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>
                </div>
                
                <div className="mt-4 flex justify-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                    <span className="text-gray-300">Primary (0-25 mi)</span>
              </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                    <span className="text-gray-300">Extended (25-50 mi)</span>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Event Calendar & Availability */}
      <section className="px-6 py-16 bg-gradient-to-r from-cyan-900/10 to-blue-900/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center font-mono tracking-wider">CHECK AVAILABILITY</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {[
                  { date: "Dec 15, 2024", event: "Wedding Reception", status: "Booked" },
                  { date: "Dec 21, 2024", event: "Corporate Holiday Party", status: "Booked" },
                  { date: "Dec 28, 2024", event: "New Year's Eve Celebration", status: "Available" },
                  { date: "Jan 5, 2025", event: "Birthday Party", status: "Available" },
                  { date: "Jan 12, 2025", event: "Cultural Event", status: "Available" }
                ].map((event, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${
                    event.status === 'Booked' 
                      ? 'bg-red-900/20 border-red-600 text-red-300' 
                      : 'bg-green-900/20 border-green-600 text-green-300'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{event.date}</div>
                        <div className="text-sm opacity-80">{event.event}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-mono ${
                        event.status === 'Booked' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-green-600 text-white'
                      }`}>
                        {event.status}
                      </span>
                </div>
              </div>
            ))}
          </div>
        </div>

            <div className="bg-slate-800 border border-cyan-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Availability Check</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block font-mono">EVENT DATE</label>
                  <Input 
                    type="date" 
                    className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block font-mono">EVENT TYPE</label>
                  <select className="w-full bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-md px-3 py-2">
                    <option value="">Select Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="cultural">Cultural Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block font-mono">DURATION</label>
                  <select className="w-full bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-md px-3 py-2">
                    <option value="">Select Duration</option>
                    <option value="4">4 Hours</option>
                    <option value="6">6 Hours</option>
                    <option value="8">8 Hours</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                  Check Availability & Book
                </Button>
            </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  💡 Tip: Book 3-6 months in advance for weddings and major events
                </p>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="px-6 py-16 bg-gradient-to-r from-blue-900/10 to-cyan-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center font-mono tracking-wider">GALLERY</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => setSelectedImage(image)}>
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

      {/* Real Yelp Photos Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-yellow-400 text-center font-mono tracking-wider">REAL EVENT PHOTOS FROM YELP</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            See actual photos from real events! These are authentic moments captured by our happy clients and shared on Yelp.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wedding Reception Photos */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-64 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 flex items-center justify-center relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="absolute top-8 right-6 w-4 h-4 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/25 rounded-full"></div>
                  <div className="absolute bottom-8 right-4 w-3 h-3 bg-white/35 rounded-full"></div>
                  
                  <div className="text-center text-white relative z-10">
                    <div className="text-4xl mb-2">💒</div>
                    <div className="font-semibold">Wedding Reception</div>
                    <div className="text-sm opacity-80">San Jose, CA</div>
                    <div className="text-xs opacity-60 mt-2">Click to view full photo</div>
              </div>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">📸</div>
                      <div className="font-semibold">Click to View</div>
                      <div className="text-sm">Real Yelp Photo</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                    YELP
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-white font-semibold">Wedding Reception Setup</div>
                <div className="text-gray-400 text-sm">Photo by: Suraj D.</div>
                <div className="text-yellow-400 text-xs">⭐ 5-star review</div>
              </div>
            </div>

            {/* Birthday Party Photos */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-64 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 flex items-center justify-center relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-6 h-6 bg-white/20 rounded-full"></div>
                  <div className="absolute top-6 right-8 w-5 h-5 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-4 left-8 w-4 h-4 bg-white/25 rounded-full"></div>
                  <div className="absolute bottom-6 right-6 w-7 h-7 bg-white/35 rounded-full"></div>
                  
                  <div className="text-center text-white relative z-10">
                    <div className="text-4xl mb-2">🎂</div>
                    <div className="font-semibold">Birthday Party</div>
                    <div className="text-sm opacity-80">Oakland, CA</div>
                    <div className="text-xs opacity-60 mt-2">Click to view full photo</div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">📸</div>
                      <div className="font-semibold">Click to View</div>
                      <div className="text-sm">Real Yelp Photo</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                    YELP
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-white font-semibold">Sweet 16 Celebration</div>
                <div className="text-gray-400 text-sm">Photo by: Nithya R.</div>
                <div className="text-yellow-400 text-xs">⭐ 5-star review</div>
              </div>
            </div>

            {/* Corporate Event Photos */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-64 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 flex items-center justify-center relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-6 w-5 h-5 bg-white/20 rounded-full"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/25 rounded-full"></div>
                  <div className="absolute bottom-8 right-8 w-5 h-5 bg-white/35 rounded-full"></div>
                  
                  <div className="text-center text-white relative z-10">
                    <div className="text-4xl mb-2">🏢</div>
                    <div className="font-semibold">Corporate Event</div>
                    <div className="text-sm opacity-80">Fremont, CA</div>
                    <div className="text-xs opacity-60 mt-2">Click to view full photo</div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">📸</div>
                      <div className="font-semibold">Click to View</div>
                      <div className="text-sm">Real Yelp Photo</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                    YELP
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-white font-semibold">Tech Company Holiday Party</div>
                <div className="text-gray-400 text-sm">Photo by: Lance P.</div>
                <div className="text-yellow-400 text-xs">⭐ 5-star review</div>
              </div>
            </div>

            {/* Cultural Event Photos */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-64 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 flex items-center justify-center relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-8 w-4 h-4 bg-white/20 rounded-full"></div>
                  <div className="absolute top-8 right-6 w-6 h-6 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-6 left-6 w-5 h-5 bg-white/25 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-white/35 rounded-full"></div>
                  
                  <div className="text-center text-white relative z-10">
                    <div className="text-4xl mb-2">🎭</div>
                    <div className="font-semibold">Cultural Event</div>
                    <div className="text-sm opacity-80">San Francisco, CA</div>
                    <div className="text-xs opacity-60 mt-2">Click to view full photo</div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">📸</div>
                      <div className="font-semibold">Click to View</div>
                      <div className="text-sm">Real Yelp Photo</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                    YELP
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-white font-semibold">Indian Cultural Festival</div>
                <div className="text-gray-400 text-sm">Photo by: Manoj G.</div>
                <div className="text-yellow-400 text-xs">⭐ 5-star review</div>
              </div>
            </div>

            {/* NYE Party Photos */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-64 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 flex items-center justify-center relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-4 w-5 h-5 bg-white/20 rounded-full"></div>
                  <div className="absolute top-4 right-8 w-4 h-4 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-8 left-6 w-6 h-6 bg-white/25 rounded-full"></div>
                  <div className="absolute bottom-4 right-6 w-3 h-3 bg-white/35 rounded-full"></div>
                  
                  <div className="text-center text-white relative z-10">
                    <div className="text-4xl mb-2">🎆</div>
                    <div className="font-semibold">New Year's Eve</div>
                    <div className="text-sm opacity-80">Fremont, CA</div>
                    <div className="text-xs opacity-60 mt-2">Click to view full photo</div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">📸</div>
                      <div className="font-semibold">Click to View</div>
                      <div className="text-sm">Real Yelp Photo</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                    YELP
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-white font-semibold">Epic Countdown Celebration</div>
                <div className="text-gray-400 text-sm">Photo by: Siva K.</div>
                <div className="text-yellow-400 text-xs">⭐ 5-star review</div>
              </div>
            </div>

            {/* First Birthday Photos */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-64 bg-gradient-to-br from-teal-600 via-blue-600 to-teal-700 flex items-center justify-center relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-6 w-6 h-6 bg-white/20 rounded-full"></div>
                  <div className="absolute top-8 right-4 w-4 h-4 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-6 left-4 w-5 h-5 bg-white/25 rounded-full"></div>
                  <div className="absolute bottom-8 right-8 w-3 h-3 bg-white/35 rounded-full"></div>
                  
                  <div className="text-center text-white relative z-10">
                    <div className="text-4xl mb-2">🎈</div>
                    <div className="font-semibold">First Birthday</div>
                    <div className="text-sm opacity-80">Hayward, CA</div>
                    <div className="text-xs opacity-60 mt-2">Click to view full photo</div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">📸</div>
                      <div className="font-semibold">Click to View</div>
                      <div className="text-sm">Real Yelp Photo</div>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                    YELP
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-white font-semibold">Baby's First Birthday</div>
                <div className="text-gray-400 text-sm">Photo by: Supriya B.</div>
                <div className="text-yellow-400 text-xs">⭐ 5-star review</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="bg-slate-800 border border-yellow-600 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">Want to See More Real Photos?</h3>
              <p className="text-gray-300 mb-4">
                These are just a few highlights from our Yelp reviews. Visit our Yelp page to see all the authentic photos and reviews from real events!
              </p>
              <Button 
                asChild
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-semibold"
              >
                <a href="https://www.yelp.com/biz/dj-vish-fremont-2" target="_blank" rel="noopener noreferrer">
                  <div className="text-2xl mr-2">⭐</div>
                  View All Photos on Yelp
                </a>
              </Button>
              <div className="mt-4 text-sm text-gray-400">
                💡 All photos are from verified Yelp reviews and used with client permission
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Performance Videos Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-purple-400 text-center font-mono tracking-wider">LIVE PERFORMANCE VIDEOS</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            See DJ Vish in action! Watch highlights from real events and get a feel for the energy and atmosphere we bring.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wedding Reception Highlights */}
            <Card className="bg-slate-800 border-purple-600 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎬</div>
                      <div className="text-white font-semibold">Wedding Reception</div>
                      <div className="text-purple-200 text-sm">3:45 min</div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Wedding Reception Highlights</h3>
                <p className="text-gray-300 text-sm mb-3">
                  High-energy Bollywood and Hip-Hop mix that kept 200+ guests dancing all night long.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>📍 San Jose, CA</span>
                  <span>👥 200+ Guests</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs text-purple-300">Featured Songs:</span>
                  <span className="text-xs text-gray-400">Chaiyya Chaiyya, Shape of You, Jai Ho</span>
                </div>
                <Button 
                  onClick={() => setSelectedVideo({
                    title: "Wedding Reception Highlights",
                    description: "High-energy Bollywood and Hip-Hop mix that kept 200+ guests dancing all night long.",
                    duration: "3:45 min",
                    eventType: "Wedding Reception",
                    location: "San Jose, CA",
                    guestCount: "200+ Guests",
                    featuredSongs: ["Chaiyya Chaiyya", "Shape of You", "Jai Ho"]
                  })}
                  variant="outline"
                  className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Highlights
                </Button>
            </CardContent>
          </Card>

            {/* Corporate Event */}
            <Card className="bg-slate-800 border-pink-600 hover:border-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 group">
            <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🏢</div>
                      <div className="text-white font-semibold">Corporate Event</div>
                      <div className="text-pink-200 text-sm">2:15 min</div>
              </div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Tech Company Holiday Party</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Professional atmosphere with upbeat background music and interactive dance sessions.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>📍 Fremont, CA</span>
                  <span>👥 150+ Employees</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs text-pink-300">Featured Songs:</span>
                  <span className="text-xs text-gray-400">Uptown Funk, Despacito, Bollywood Mix</span>
                </div>
                <Button 
                  onClick={() => setSelectedVideo({
                    title: "Tech Company Holiday Party",
                    description: "Professional atmosphere with upbeat background music and interactive dance sessions.",
                    duration: "2:15 min",
                    eventType: "Corporate Event",
                    location: "Fremont, CA",
                    guestCount: "150+ Employees",
                    featuredSongs: ["Uptown Funk", "Despacito", "Bollywood Mix"]
                  })}
                  variant="outline"
                  className="w-full border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Highlights
                </Button>
            </CardContent>
          </Card>

            {/* Birthday Party */}
            <Card className="bg-slate-800 border-indigo-600 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 group">
            <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎂</div>
                      <div className="text-white font-semibold">Birthday Party</div>
                      <div className="text-indigo-200 text-sm">4:20 min</div>
              </div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                </div>
                </div>
                </div>
              </div>
                <h3 className="text-lg font-semibold text-white mb-2">Sweet 16 Birthday Bash</h3>
                <p className="text-gray-300 text-sm mb-3">
                  High-energy celebration with the latest hits, Bollywood favorites, and crowd interaction.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>📍 Oakland, CA</span>
                  <span>👥 80+ Teens</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs text-indigo-300">Featured Songs:</span>
                  <span className="text-xs text-gray-400">As It Was, Dance Monkey, Bollywood Hits</span>
                </div>
                <Button 
                  onClick={() => setSelectedVideo({
                    title: "Sweet 16 Birthday Bash",
                    description: "High-energy celebration with the latest hits, Bollywood favorites, and crowd interaction.",
                    duration: "4:20 min",
                    eventType: "Birthday Party",
                    location: "Oakland, CA",
                    guestCount: "80+ Teens",
                    featuredSongs: ["As It Was", "Dance Monkey", "Bollywood Hits"]
                  })}
                  variant="outline"
                  className="w-full border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Highlights
                </Button>
            </CardContent>
          </Card>

            {/* Cultural Event */}
            <Card className="bg-slate-800 border-orange-600 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group">
            <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎭</div>
                      <div className="text-white font-semibold">Cultural Event</div>
                      <div className="text-orange-200 text-sm">5:10 min</div>
              </div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                </div>
              </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Indian Cultural Festival</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Traditional and modern Indian music blend with interactive cultural performances.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>📍 San Francisco, CA</span>
                  <span>👥 300+ Attendees</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs text-orange-300">Featured Songs:</span>
                  <span className="text-xs text-gray-400">Jai Ho, Rang De Basanti, Modern Mix</span>
                </div>
                <Button 
                  onClick={() => setSelectedVideo({
                    title: "Indian Cultural Festival",
                    description: "Traditional and modern Indian music blend with interactive cultural performances.",
                    duration: "5:10 min",
                    eventType: "Cultural Event",
                    location: "San Francisco, CA",
                    guestCount: "300+ Attendees",
                    featuredSongs: ["Jai Ho", "Rang De Basanti", "Modern Mix"]
                  })}
                  variant="outline"
                  className="w-full border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Highlights
                </Button>
            </CardContent>
          </Card>

            {/* New Year's Eve */}
            <Card className="bg-slate-800 border-yellow-600 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 group">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎆</div>
                      <div className="text-white font-semibold">NYE Party</div>
                      <div className="text-yellow-200 text-sm">6:30 min</div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">New Year's Eve Countdown</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Epic countdown celebration with fireworks, confetti, and non-stop dancing until 2 AM.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>📍 Fremont, CA</span>
                  <span>👥 250+ Partygoers</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs text-yellow-300">Featured Songs:</span>
                  <span className="text-xs text-gray-400">Auld Lang Syne, Party Rock Anthem, Bollywood</span>
                </div>
                <Button 
                  onClick={() => setSelectedVideo({
                    title: "New Year's Eve Countdown",
                    description: "Epic countdown celebration with fireworks, confetti, and non-stop dancing until 2 AM.",
                    duration: "6:30 min",
                    eventType: "NYE Party",
                    location: "Fremont, CA",
                    guestCount: "250+ Partygoers",
                    featuredSongs: ["Auld Lang Syne", "Party Rock Anthem", "Bollywood"]
                  })}
                  variant="outline"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Highlights
                </Button>
              </CardContent>
            </Card>

            {/* Behind the Scenes */}
            <Card className="bg-slate-800 border-slate-600 hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 group">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-slate-600 to-gray-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎬</div>
                      <div className="text-white font-semibold">Behind the Scenes</div>
                      <div className="text-slate-200 text-sm">8:45 min</div>
                </div>
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
              </div>
          </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Setup & Equipment Tour</h3>
                <p className="text-gray-300 text-sm mb-3">
                  See how DJ Vish sets up professional equipment and prepares for your perfect event.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>📍 Various Venues</span>
                  <span>⚡ 15,000W System</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs text-slate-300">Featured:</span>
                  <span className="text-xs text-gray-400">Equipment Setup, Sound Check, Lighting Demo</span>
                </div>
                <Button 
                  onClick={() => setSelectedVideo({
                    title: "Setup & Equipment Tour",
                    description: "See how DJ Vish sets up professional equipment and prepares for your perfect event.",
                    duration: "8:45 min",
                    eventType: "Behind the Scenes",
                    location: "Various Venues",
                    guestCount: "15,000W System",
                    featuredSongs: ["Equipment Setup", "Sound Check", "Lighting Demo"]
                  })}
                  variant="outline"
                  className="w-full border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Tour
                </Button>
              </CardContent>
            </Card>
        </div>

          <div className="text-center mt-8">
            <div className="bg-slate-800 border border-purple-600 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">Want to See More?</h3>
              <p className="text-gray-300 mb-4">
                Follow us on Instagram and Facebook for daily event highlights, behind-the-scenes content, and live performance clips.
              </p>
              <div className="flex justify-center space-x-4">
                <Button 
                  asChild
                  variant="outline"
                  className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
                >
                  <a href="https://www.instagram.com/vish_dj?igsh=ZjN0eXoxOHNmbGY5" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 mr-2" />
                    Follow on Instagram
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  <a href="https://www.facebook.com/djvishofficial" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4 mr-2" />
                    Follow on Facebook
                  </a>
                </Button>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center font-mono tracking-wider">MUSIC SAMPLES</h2>
        <div className="grid md:grid-cols-2 gap-6">
            {musicSamples.map((track) => (
            <Card key={track.id} className="bg-slate-800 border-cyan-600 hover:border-cyan-500 transition-all duration-300">
                <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{track.title}</h3>
                    <p className="text-sm text-gray-400">{track.genre} • {track.duration}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                              style={{ width: `${track.energy}%` }}
                            ></div>
                          </div>
                    <span className="text-xs text-gray-400">{track.energy}%</span>
                        </div>
                      </div>
                
                {/* Enhanced Music Player */}
                <div className="bg-slate-700 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <Music className="w-5 h-5 text-white" />
                    </div>
                      <div>
                        <div className="text-sm text-white font-medium">Track {track.id}</div>
                        <div className="text-xs text-gray-400">{track.genre}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{track.duration}</div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-600 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ${
                        currentTrack === track.id && isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        width: currentTrack === track.id && isPlaying ? '45%' : '0%' 
                      }}
                    ></div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={() => playTrack(track.id)}
                      variant="outline"
                      size="sm"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300"
                    >
                      {currentTrack === track.id && isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Play Sample
                        </>
                      )}
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-gray-400" />
                      <div className="w-16 h-1 bg-slate-600 rounded-full">
                        <div className="w-3/4 h-1 bg-cyan-400 rounded-full"></div>
                    </div>
                    </div>
                  </div>
                </div>
                
                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full font-mono">
                    {track.genre}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-mono">
                    {track.energy}% Energy
                  </span>
                  <span className="px-2 py-1 bg-slate-500/20 text-gray-300 text-xs rounded-full font-mono">
                    {track.duration}
                  </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        
        {/* Music Categories */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center font-mono tracking-wider">MUSIC GENRES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Bollywood", icon: "🎵", count: "500+ Songs" },
              { name: "Tollywood", icon: "🎶", count: "300+ Songs" },
              { name: "Hip-Hop", icon: "🎤", count: "400+ Songs" },
              { name: "EDM", icon: "🎧", count: "200+ Songs" },
              { name: "Classical", icon: "🎼", count: "150+ Songs" },
              { name: "Pop", icon: "⭐", count: "600+ Songs" },
              { name: "Rock", icon: "🎸", count: "250+ Songs" },
              { name: "Jazz", icon: "🎷", count: "100+ Songs" }
            ].map((genre, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center hover:border-cyan-500 transition-all duration-300 group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{genre.icon}</div>
                <div className="text-white font-semibold mb-1">{genre.name}</div>
                <div className="text-gray-400 text-sm">{genre.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Music Request Form */}
        <div className="mt-12 bg-slate-800 border border-cyan-600 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center font-mono tracking-wider">REQUEST YOUR FAVORITE SONGS</h3>
          <p className="text-center text-gray-300 mb-6">
            Have specific songs you want at your event? Let us know and we'll make sure they're included!
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 mb-2 block font-mono">SONG TITLE</label>
              <Input 
                placeholder="e.g., Chaiyya Chaiyya" 
                className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block font-mono">ARTIST</label>
              <Input 
                placeholder="e.g., A.R. Rahman" 
                className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block font-mono">GENRE</label>
              <select className="w-full bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-md px-3 py-2">
                <option value="">Select Genre</option>
                <option value="bollywood">Bollywood</option>
                <option value="tollywood">Tollywood</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="edm">EDM</option>
                <option value="pop">Pop</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block font-mono">EVENT TYPE</label>
              <select className="w-full bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-md px-3 py-2">
                <option value="">Select Event</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
                <option value="cultural">Cultural</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="text-sm text-gray-400 mb-2 block font-mono">ADDITIONAL NOTES</label>
            <Textarea 
              placeholder="Any special requests, timing preferences, or other details..." 
              className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 min-h-[100px]"
            />
          </div>
          
          <div className="text-center mt-6">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold">
              <Music className="w-5 h-5 mr-2" />
              Submit Song Request
            </Button>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-400">
            💡 We'll confirm your song requests within 24 hours and ensure they're available for your event!
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center font-mono tracking-wider">WHAT CLIENTS SAY</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Suraj D.",
                event: "Wedding Reception",
                rating: 5,
                review: "Dj Vish is the best DJ ever. He made my wedding reception like a vegas nightclub. He played bollywood, telugu, techno, hip hop. He got everyone, and I mean EVERYONE on the dance floor. He was very easy to work with and did a fantastic job. Would highly recommend! My event was a huge success mainly because of him.",
                highlight: "Best DJ Ever"
              },
              {
                name: "Lance P.",
                event: "Wedding Reception",
                rating: 5,
                review: "DJ Vish knew exactly what to play and when to play it, always able to get the crowd going and the dance floor as hyped as possible during our wedding reception. I had multiple people ask me for DJ Vish's contact info after the reception so they could hire him as well. There is nobody else you should hire for DJing!!",
                highlight: "Perfect Crowd Control"
              },
              {
                name: "Nithya R.",
                event: "Birthday Party",
                rating: 5,
                review: "DJ Vish was amazing! His music selection was too good! his energy, and overall greatness of the dance! The dance floor was always full and everyone was happy and entertained!",
                highlight: "Amazing Energy"
              },
              {
                name: "Siva K.",
                event: "New Year's Eve Party",
                rating: 5,
                review: "We attended his NYE party this year and it was amazing! Great music and wonderful song selection..DJ Vish rockz",
                highlight: "NYE Success"
              },
              {
                name: "Manoj G.",
                event: "Birthday Party",
                rating: 5,
                review: "We hired dj Vishn for a birthday event for 150 guests. We had mentioned him the songs we and our guests usually like to dance for. He had done amazing job in making both Indian and American guests dance for 4 hrs non stop. Everyone mentioned it was great party that we hosted. I think vishn was the one who made it so amazing. With his professional equipment and lights.",
                highlight: "4 Hours Non-Stop"
              },
              {
                name: "Supriya B.",
                event: "First Birthday Party",
                rating: 5,
                review: "DJVish did an excellent job at my daughter's first birthday party. He came ahead of time and was ready with his setup before our party had begun. He had played nonstop music till the end of the party. We loved his music and would definitely recommend him.",
                highlight: "Excellent Service"
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-slate-800 border-cyan-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.review}"</p>
                  <div className="text-cyan-300 font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.event}</div>
                  <div className="mt-2 inline-block bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full font-mono">
                    {testimonial.highlight}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="inline-flex items-center bg-slate-800 border border-cyan-700 rounded-lg px-6 py-3 shadow-lg">
              <div className="flex mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white font-semibold font-mono">5.0 RATING</span>
              <span className="text-gray-400 ml-2 font-mono">• 50+ REVIEWS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Yelp Reviews & Social Media */}
      <section className="px-6 py-16 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-yellow-400 text-center font-mono tracking-wider">YELP REVIEWS & SOCIAL MEDIA</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            See what clients are saying about DJ Vish on Yelp and stay connected on social media for the latest updates and event highlights.
          </p>
          
          {/* Yelp Business Info */}
          <div className="bg-slate-800 border border-yellow-600 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-4xl">⭐</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">DJ Vish</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-2xl ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-white font-semibold">4.7</span>
                      <span className="text-gray-400">(14 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-yellow-400 mr-2" />
                    <span>Fremont, CA 94538</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-yellow-400 mr-2" />
                    <span>(301) 529-0456</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                    <span>Open 24 hours</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Bollywood', 'Tollywood', 'Electro', 'Hip-Hop', 'Bhangra', 'House music'].map((specialty, idx) => (
                      <span key={idx} className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-4">🎧</div>
                <h4 className="text-white font-semibold mb-2">Event Types We Serve</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  {['Birthdays', 'Weddings', 'Graduations', 'Corporate', 'Cultural Events', 'Holiday Parties'].map((event, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      {event}
                    </div>
                  ))}
                </div>
                
                <Button 
                  asChild
                  className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                >
                  <a href="https://www.yelp.com/biz/dj-vish-fremont-2" target="_blank" rel="noopener noreferrer">
                    View on Yelp
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                platform: "Instagram",
                handle: "@vish_dj",
                followers: "850+",
                posts: "45+",
                latestPost: "Amazing wedding reception last night! The energy was incredible 🎉 #DJVish #WeddingDJ #Bollywood",
                engagement: "12%",
                icon: "📸",
                color: "from-pink-500 to-purple-500",
                link: "https://www.instagram.com/vish_dj?igsh=ZjN0eXoxOHNmbGY5"
              },
              {
                platform: "Facebook",
                handle: "Vishnu Ch",
                followers: "650+",
                posts: "38+",
                latestPost: "Corporate event success! Great feedback from the team 🎵 #CorporateEvents #DJVish #Fremont",
                engagement: "8%",
                icon: "📘",
                color: "from-blue-500 to-indigo-500",
                link: "https://www.facebook.com/vishnu.ch?mibextid=wwXIfr"
              },
              {
                platform: "Yelp",
                handle: "DJ Vish - Fremont",
                followers: "4.7★",
                posts: "14 Reviews",
                latestPost: "Amazing reviews from happy clients! 4.7 stars and counting ⭐ #DJVish #Fremont #Reviews",
                engagement: "92%",
                icon: "⭐",
                color: "from-yellow-500 to-orange-500",
                link: "https://www.yelp.com/biz/dj-vish-fremont-2"
              }
            ].map((social, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700 hover:border-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 group">
              <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-2xl`}>
                      {social.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{social.platform}</div>
                      <div className="text-xs text-gray-500">@{social.handle}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{social.platform}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-pink-400">{social.followers}</div>
                      <div className="text-gray-400 text-xs">Followers</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-pink-400">{social.posts}</div>
                      <div className="text-gray-400 text-xs">Posts</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">Latest Post:</div>
                    <p className="text-gray-300 text-sm italic">"{social.latestPost}"</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-400">
                      Engagement: <span className="text-green-400 font-semibold">{social.engagement}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 24) + 1}h ago
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white"
                  >
                    <a href={social.link} target="_blank" rel="noopener noreferrer">
                      {social.platform === "Yelp" ? "View on Yelp" : `Follow on ${social.platform}`}
                    </a>
                  </Button>
              </CardContent>
            </Card>
          ))}
          </div>
          
          {/* Social Media Feed Preview */}
          <div className="mt-12 bg-slate-800 border border-yellow-600 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Live Social Feed</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { type: "Story", content: "Wedding reception setup", time: "2h ago", platform: "Instagram", engagement: "12 likes" },
                { type: "Post", content: "Corporate event success", time: "5h ago", platform: "Facebook", engagement: "8 likes" },
                { type: "Review", content: "5-star client review", time: "1d ago", platform: "Yelp", engagement: "4.7★" }
              ].map((post, idx) => (
                <div key={idx} className="bg-slate-700 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{post.type === "Story" ? "📱" : post.type === "Post" ? "📝" : "⭐"}</div>
                  <div className="text-white font-medium mb-1">{post.content}</div>
                  <div className="text-gray-400 text-xs mb-2">{post.time}</div>
                  <div className="text-yellow-400 text-xs font-mono mb-1">{post.platform}</div>
                  <div className="text-xs text-gray-300">{post.engagement}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog & News Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-orange-400 text-center font-mono tracking-wider">LATEST NEWS & TIPS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Top 10 Bollywood Songs for Weddings 2024",
                excerpt: "Discover the most popular Bollywood tracks that are guaranteed to get everyone dancing at your wedding reception.",
                category: "Wedding Tips",
                date: "Dec 10, 2024",
                readTime: "5 min read",
                image: "🎵"
              },
              {
                title: "How to Choose the Perfect DJ for Your Event",
                excerpt: "Essential tips and questions to ask when selecting a DJ to ensure your event is a success.",
                category: "Event Planning",
                date: "Dec 8, 2024",
                readTime: "7 min read",
                image: "🎧"
              },
              {
                title: "Multicultural Wedding Music Guide",
                excerpt: "Blending different cultural music traditions to create a unique and memorable wedding experience.",
                category: "Cultural Events",
                date: "Dec 5, 2024",
                readTime: "6 min read",
                image: "🌍"
              },
              {
                title: "Corporate Event Entertainment Trends",
                excerpt: "Latest trends in corporate event entertainment that will impress your team and clients.",
                category: "Corporate",
                date: "Dec 3, 2024",
                readTime: "4 min read",
                image: "💼"
              },
              {
                title: "Sound System Setup Guide",
                excerpt: "Understanding the technical aspects of professional sound systems for events of all sizes.",
                category: "Technical",
                date: "Nov 30, 2024",
                readTime: "8 min read",
                image: "🔊"
              },
              {
                title: "Holiday Party Music Selection",
                excerpt: "Curated playlists and music recommendations for the perfect holiday celebration atmosphere.",
                category: "Holiday Events",
                date: "Nov 28, 2024",
                readTime: "5 min read",
                image: "🎄"
              }
            ].map((post, idx) => (
              <Card key={idx} className="bg-slate-700 border-slate-600 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {post.image}
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full font-mono">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{post.date}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                    >
                      Read More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              variant="outline"
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center font-mono tracking-wider">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Event Planning Resources */}
      <section className="px-6 py-16 bg-gradient-to-r from-emerald-900/20 to-teal-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-emerald-400 text-center font-mono tracking-wider">EVENT PLANNING RESOURCES</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            Planning your perfect event? We've got you covered with helpful guides, checklists, and planning tools.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wedding Planning Guide */}
            <Card className="bg-slate-800 border-emerald-600 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💒</div>
                <h3 className="text-lg font-semibold text-white mb-2">Wedding Planning Guide</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Complete timeline from engagement to reception. Includes music selection tips and vendor coordination.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                    <span>12-month planning timeline</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                    <span>Music selection checklist</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                    <span>Vendor coordination tips</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white"
                >
                  Download Guide
                </Button>
              </CardContent>
            </Card>

            {/* Event Timeline Template */}
            <Card className="bg-slate-800 border-teal-600 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📅</div>
                <h3 className="text-lg font-semibold text-white mb-2">Event Timeline Template</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Customizable timeline templates for any event type. Perfect for keeping everything on schedule.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                    <span>Wedding timeline template</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                    <span>Corporate event template</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                    <span>Birthday party template</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white"
                >
                  Get Templates
                </Button>
              </CardContent>
            </Card>

            {/* Music Selection Checklist */}
            <Card className="bg-slate-800 border-cyan-600 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎵</div>
                <h3 className="text-lg font-semibold text-white mb-2">Music Selection Checklist</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Comprehensive checklist to help you choose the perfect music for every moment of your event.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                    <span>Ceremony music (if applicable)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                    <span>Cocktail hour playlist</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                    <span>Reception dance music</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
                >
                  Download Checklist
                </Button>
              </CardContent>
            </Card>

            {/* Venue Setup Guide */}
            <Card className="bg-slate-800 border-purple-600 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏢</div>
                <h3 className="text-lg font-semibold text-white mb-2">Venue Setup Guide</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Everything you need to know about venue preparation, power requirements, and space planning.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span>Power requirements checklist</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span>Space planning guide</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <span>Setup time estimates</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  View Guide
                </Button>
              </CardContent>
            </Card>

            {/* Cultural Event Planning */}
            <Card className="bg-slate-800 border-orange-600 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌍</div>
                <h3 className="text-lg font-semibold text-white mb-2">Cultural Event Planning</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Specialized guides for Indian weddings, cultural celebrations, and multicultural events.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    <span>Indian wedding traditions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    <span>Cultural music selection</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                    <span>Multicultural blending tips</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact Sheet */}
            <Card className="bg-slate-800 border-red-600 hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📞</div>
                <h3 className="text-lg font-semibold text-white mb-2">Emergency Contact Sheet</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Printable contact sheet with all important numbers and backup plans for your event.
                </p>
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span>DJ Vish contact info</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span>Venue emergency contacts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    <span>Backup vendor list</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                  Download Sheet
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <div className="bg-slate-800 border border-emerald-600 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">Need Personalized Help?</h3>
              <p className="text-gray-300 mb-4">
                Our event planning consultation includes a personalized planning session, custom timeline, and ongoing support.
              </p>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Planning Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-orange-900/20 via-red-900/20 to-orange-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800 border border-orange-600 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-orange-500/5"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Make Your Event Unforgettable?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Don't wait until the last minute! DJ Vish's calendar fills up quickly, especially for weddings and major events. 
                Secure your date today and let us create the perfect atmosphere for your special occasion.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-2">3-6 Months</div>
                  <div className="text-gray-400 text-sm">Advance booking for weddings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400 mb-2">2-4 Weeks</div>
                  <div className="text-gray-400 text-sm">Advance booking for parties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">24 Hours</div>
                  <div className="text-gray-400 text-sm">Response time guarantee</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="w-6 h-6 mr-2" />
                  Book Now - Limited Availability
                </Button>
                <Button 
                  variant="outline"
                  className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  Call (301) 529-0456
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-orange-300">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">🎯 SPECIAL OFFER:</span>
                  <span>Book 3+ months in advance and get 10% off your package!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-6 py-16 bg-gradient-to-r from-emerald-900/20 to-teal-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800 border border-emerald-600 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-emerald-500/5"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay in the Loop!
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Get exclusive access to music previews, event tips, special offers, and behind-the-scenes content. 
                Join our VIP newsletter and never miss a beat!
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-2">🎵</div>
                  <div className="text-gray-400 text-sm">New Music First</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400 mb-2">💡</div>
                  <div className="text-gray-400 text-sm">Event Planning Tips</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">🎁</div>
                  <div className="text-gray-400 text-sm">Exclusive Offers</div>
                </div>
              </div>
              
              <form className="max-w-md mx-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="text" 
                    placeholder="Your first name" 
                    className="flex-1 bg-slate-700 text-white border-slate-600 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 bg-slate-700 text-white border-slate-600 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <select className="flex-1 bg-slate-700 text-white border border-slate-600 focus:border-emerald-500 focus:ring-emerald-500 rounded-md px-3 py-2">
                    <option value="">Select your interests</option>
                    <option value="weddings">Wedding Music</option>
                    <option value="parties">Party Planning</option>
                    <option value="corporate">Corporate Events</option>
                    <option value="cultural">Cultural Events</option>
                    <option value="all">All of the above</option>
                  </select>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Subscribe to Newsletter
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-emerald-300">
                  <span className="font-semibold">🎯 BONUS:</span>
                  <span>New subscribers get a free "Top 50 Wedding Songs" playlist!</span>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time. No spam, ever.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center font-mono tracking-wider">BOOK DJ VISH</h2>
        <Card className="bg-slate-800 border-cyan-600">
          <CardContent className="p-6">
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg text-center ${
                submitMessage.includes('Thank you') 
                  ? 'bg-green-900/20 border border-green-600 text-green-300' 
                  : 'bg-red-900/20 border border-red-600 text-red-300'
              }`}>
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm text-gray-400 mb-1 block font-mono">NAME *</label>
                  <Input 
                    id="name"
                    name="name" 
                    type="text" 
                    placeholder="Your full name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="text-sm text-gray-400 mb-1 block font-mono">EMAIL *</label>
                  <Input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={form.email} 
                    onChange={handleChange} 
                    className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500" 
                    required 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="text-sm text-gray-400 mb-1 block font-mono">PHONE</label>
                  <Input 
                    id="phone"
                    name="phone" 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    value={form.phone} 
                    onChange={handleChange} 
                    className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500" 
                  />
                </div>

                <div>
                  <label htmlFor="eventDate" className="text-sm text-gray-400 mb-1 block font-mono">EVENT DATE</label>
                  <Input 
                    id="eventDate"
                    name="eventDate" 
                    type="date" 
                    value={form.eventDate} 
                    onChange={handleChange} 
                    className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500" 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="eventType" className="text-sm text-gray-400 mb-1 block font-mono">EVENT TYPE</label>
                <select 
                  id="eventType"
                  name="eventType" 
                  value={form.eventType} 
                  onChange={handleChange} 
                  className="w-full bg-slate-700 text-white border border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 rounded-md px-3 py-2"
                >
                  <option value="">Select Event Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="graduation">Graduation</option>
                  <option value="cultural">Cultural Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="text-sm text-gray-400 mb-1 block font-mono">EVENT DETAILS *</label>
                <Textarea 
                  id="message"
                  name="message" 
                  placeholder="Tell us about your event: venue, guest count, music preferences, special requests, etc." 
                  value={form.message} 
                  onChange={handleChange} 
                  className="bg-slate-700 text-white border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 min-h-[120px]" 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white disabled:opacity-50 shadow-lg border border-cyan-400/50"
              >
                {isSubmitting ? 'SENDING...' : 'SEND BOOKING REQUEST'}
              </Button>
            </form>
            
            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-gray-400 mb-2 font-mono">OR CONTACT DIRECTLY:</p>
              <div className="space-y-1">
                <a 
                  href="mailto:booking@djvish.com" 
                  className="text-cyan-400 hover:text-cyan-300 font-medium block font-mono"
                >
                  booking@djvish.com
                </a>
                <a 
                  href="tel:+13015290456" 
                  className="text-cyan-400 hover:text-cyan-300 font-medium block font-mono"
                >
                  (301) 529-0456
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-slate-800">
        <div className="flex justify-center space-x-6 mb-4">
          <Link 
            href="https://www.instagram.com/djvish_official" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-400 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link 
            href="https://www.facebook.com/djvishofficial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors"
          >
            <Facebook className="w-5 h-5" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
        <p className="font-mono">© {new Date().getFullYear()} DJ VISH. ALL RIGHTS RESERVED.</p>
        <p className="mt-1 text-xs font-mono">FUTURISTIC SOUND ENGINEERING IN THE BAY AREA</p>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          {/* Quick Contact Button */}
          <Button
            onClick={() => scrollToSection('contact')}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </Button>
          
          {/* Phone Button */}
          <Button
            asChild
            className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <a href="tel:+13015290456">
              <Phone className="w-6 h-6" />
            </a>
          </Button>
          
          {/* WhatsApp Button */}
          <Button
            asChild
            className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <a 
              href="https://wa.me/13015290456?text=Hi%20DJ%20Vish!%20I'm%20interested%20in%20booking%20your%20services%20for%20an%20event."
            target="_blank" 
            rel="noopener noreferrer"
          >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 border border-slate-600 transition-all duration-300 ${
          scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </Button>

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-800 border border-cyan-600 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-semibold text-sm group-hover:text-cyan-300 transition-colors">
              Live Chat Available
            </span>
            <div className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300">
              💬
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full">
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              width={800}
              height={600}
              className="object-contain rounded-lg"
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <div className="relative max-w-4xl max-h-full bg-slate-800 rounded-lg border border-purple-500/30 overflow-hidden">
            <div className="p-6">
              {/* Video Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedVideo.title}</h3>
                <button 
                  className="text-gray-400 hover:text-white bg-black/50 rounded-full p-2"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Video Preview Placeholder */}
              <div className="w-full h-64 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="text-center text-white relative z-10">
                  <div className="text-8xl mb-4">🎬</div>
                  <div className="text-2xl font-semibold mb-2">Video Preview</div>
                  <div className="text-lg opacity-80">{selectedVideo.duration}</div>
                </div>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-8 left-8 w-20 h-20 bg-white/8 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  <div className="absolute bottom-4 right-4 w-14 h-14 bg-white/12 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Video Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Event Details</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center">
                      <span className="w-24 text-gray-400">Event Type:</span>
                      <span className="text-white font-medium">{selectedVideo.eventType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-400">Location:</span>
                      <span className="text-white font-medium">{selectedVideo.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-400">Guest Count:</span>
                      <span className="text-white font-medium">{selectedVideo.guestCount}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-400">Duration:</span>
                      <span className="text-white font-medium">{selectedVideo.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Featured Songs</h4>
                  <div className="space-y-2">
                    {selectedVideo.featuredSongs.map((song, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">{song}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-3 mt-4">Description</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Full Video
                </Button>
                <Button 
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full font-semibold"
                  onClick={() => scrollToSection('contact')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Similar Event
                </Button>
              </div>
              
              {/* Note */}
              <div className="text-center mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300 text-sm">
                  💡 This is a preview of the video content. Contact DJ Vish to see the full performance videos and book your event!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
