'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MessageCircle, X, Send, Phone, Calendar, Clock, MapPin, Users, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'date-picker' | 'time-picker' | 'confirmation' | 'availability';
  calendarData?: {
    currentMonth: Date;
    availableDates: string[];
    blockedDates: string[];
  };
}

interface ChatState {
  step: 'greeting' | 'event-type' | 'date-selection' | 'time-selection' | 'guest-count' | 'location' | 'budget' | 'contact-info' | 'confirmation';
  eventType?: string;
  selectedDate?: string;
  selectedTime?: string;
  selectedTimeEnd?: string;
  guestCount?: number;
  location?: string;
  budget?: string;
  contactInfo?: {
    name: string;
    phone: string;
    email: string;
  };
}

export function LiveChat() {
  // Multi-language support
  const translations = {
    en: {
      greeting: "Hi! I'm DJ Vish's booking assistant. I'm here to help you plan your perfect event! 🎧✨",
      eventType: "What type of event are you planning?",
      available: "Available",
      unavailable: "Holiday/Unavailable",
      booked: "Booked",
      today: "Today",
      weekend: "Weekend",
      uploadFiles: "Upload files",
      voiceMessage: "Voice message",
      pricing: "Pricing",
      portfolio: "Portfolio"
    },
    es: {
      greeting: "¡Hola! Soy el asistente de reservas de DJ Vish. ¡Estoy aquí para ayudarte a planificar tu evento perfecto! 🎧✨",
      eventType: "¿Qué tipo de evento estás planeando?",
      available: "Disponible",
      unavailable: "Vacaciones/No disponible",
      booked: "Reservado",
      today: "Hoy",
      weekend: "Fin de semana",
      uploadFiles: "Subir archivos",
      voiceMessage: "Mensaje de voz",
      pricing: "Precios",
      portfolio: "Portafolio"
    },
    hi: {
      greeting: "नमस्ते! मैं DJ Vish का बुकिंग असिस्टेंट हूं। मैं आपकी परफेक्ट इवेंट प्लान करने में मदद करने के लिए यहां हूं! 🎧✨",
      eventType: "आप किस तरह का इवेंट प्लान कर रहे हैं?",
      available: "उपलब्ध",
      unavailable: "छुट्टी/अनुपलब्ध",
      booked: "बुक",
      today: "आज",
      weekend: "सप्ताहांत",
      uploadFiles: "फाइलें अपलोड करें",
      voiceMessage: "वॉइस मैसेज",
      pricing: "कीमत",
      portfolio: "पोर्टफोलियो"
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: translations.en.greeting,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({ step: 'greeting' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [typingSpeed, setTypingSpeed] = useState(50); // ms per character
  const [messageReactions, setMessageReactions] = useState<{[key: string]: string[]}>({});
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'card' | 'confirmation'>('card');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'hi'>('en');
  const [showContract, setShowContract] = useState(false);
  const [guestList, setGuestList] = useState<string[]>([]);
  const [showGuestManager, setShowGuestManager] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update messages when language changes
  useEffect(() => {
    if (messages.length > 0 && messages[0].sender === 'bot') {
      setMessages(prev => [
        {
          ...prev[0],
          text: translations[selectedLanguage].greeting
        },
        ...prev.slice(1)
      ]);
    }
  }, [selectedLanguage]);

  // Generate smart suggestions based on current state
  useEffect(() => {
    const suggestions = generateSmartSuggestions('', chatState.step);
    setSmartSuggestions(suggestions);
  }, [chatState.step]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate blocked dates (only actually booked dates)
  // For now, no dates are blocked - all future dates are available
  const blockedDates = useMemo(() => {
    const blocked: string[] = [];
    // Add any actually booked dates here in the future
    // For now, all dates are available
    return blocked;
  }, []);

  // All dates are available by default unless they're in blockedDates
  const availableDates: string[] = [];

  // Calendar component
  const CalendarComponent = ({ onDateSelect, onTimeSelect }: { onDateSelect: (date: string) => void; onTimeSelect?: (startTime: string, endTime: string) => void }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);
    const [showCustomTime, setShowCustomTime] = useState(false);
    const [customStartTime, setCustomStartTime] = useState('');
    const [customEndTime, setCustomEndTime] = useState('');

    const getDaysInMonth = useCallback((date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = firstDay.getDay();
      
      return { daysInMonth, startingDay };
    }, []);

    const formatDate = useCallback((date: Date) => {
      return date.toISOString().split('T')[0];
    }, []);

    const isDateAvailable = useCallback((date: Date) => {
      const dateString = formatDate(date);
      // Date is available if it's NOT in the blockedDates list and is in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today && !blockedDates.includes(dateString);
    }, [blockedDates]);

    const isDateBlocked = useCallback((date: Date) => {
      const dateString = formatDate(date);
      // Date is blocked if it's in the blockedDates list
      return blockedDates.includes(dateString);
    }, [blockedDates, formatDate]);

    const isDatePast = useCallback((date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }, []);

    const isToday = useCallback((date: Date) => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    }, []);

    const isWeekend = useCallback((date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    }, []);

    const handleDateClick = useCallback((date: Date) => {
      if (isDatePast(date) || isDateBlocked(date)) return;
      
      const dateString = formatDate(date);
      setSelectedDate(dateString);
      setShowTimeSlots(true);
    }, [isDatePast, isDateBlocked, formatDate]);

    const handleDateHover = useCallback((date: Date) => {
      const dateString = formatDate(date);
      setHoveredDate(dateString);
    }, [formatDate]);

    const handleDateLeave = useCallback(() => {
      setHoveredDate(null);
    }, []);

    const handleTimeSlotSelect = useCallback((startTime: string, endTime: string) => {
      if (selectedDate) {
        // First, select the date
        onDateSelect(selectedDate);
        // Then select the time range if callback is provided
        if (onTimeSelect) {
          setTimeout(() => {
            onTimeSelect(startTime, endTime);
          }, 200);
        }
        setShowTimeSlots(false);
        setSelectedDate(null);
      }
    }, [selectedDate, onDateSelect, onTimeSelect]);

    const timeSlots = [
      { start: '12:00 PM', end: '4:00 PM', label: 'Afternoon (4 hours)', icon: '☀️' },
      { start: '2:00 PM', end: '6:00 PM', label: 'Afternoon (4 hours)', icon: '☀️' },
      { start: '6:00 PM', end: '10:00 PM', label: 'Evening (4 hours)', icon: '🌆' },
      { start: '6:00 PM', end: '12:00 AM', label: 'Evening (6 hours)', icon: '🌆' },
      { start: '8:00 PM', end: '12:00 AM', label: 'Evening (4 hours)', icon: '🌆' },
      { start: '10:00 PM', end: '2:00 AM', label: 'Night (4 hours)', icon: '🌙' }
    ];

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-6 h-6"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      date.setHours(0, 0, 0, 0);
      const dateString = formatDate(date);
      const isPast = isDatePast(date);
      const isBlocked = isDateBlocked(date);
      const isAvailable = !isPast && !isBlocked && isDateAvailable(date);
      const isTodayDate = isToday(date);
      const isWeekendDate = isWeekend(date);
      const isSelected = selectedDate === dateString;
      const isHovered = hoveredDate === dateString;
      
      let className = "w-6 h-6 md:w-7 md:h-7 rounded flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-200 relative border border-slate-600";
      
      if (isPast) {
        className += " text-gray-500 cursor-not-allowed bg-slate-800 border-slate-700 opacity-50";
      } else if (isBlocked) {
        className += " bg-red-600 text-white cursor-not-allowed border-red-500";
      } else if (isAvailable) {
        if (isSelected) {
          className += " bg-orange-500 text-white cursor-pointer shadow-lg scale-110 ring-2 ring-orange-300 border-orange-400 z-10";
        } else if (isHovered) {
          className += " bg-green-600 text-white cursor-pointer shadow-md scale-105 border-green-400 z-10";
        } else {
          className += " bg-green-500 text-white hover:bg-green-600 hover:scale-105 cursor-pointer border-green-400";
        }
      } else {
        // If not available and not blocked, it's booked
        className += " bg-slate-600 text-white cursor-not-allowed border-slate-500 opacity-60";
      }

      // Add weekend indicator
      if (isWeekendDate && !isPast && !isBlocked && isAvailable) {
        className += " border-yellow-400";
      }

      // Add today indicator
      if (isTodayDate) {
        className += " ring-2 ring-blue-400";
      }
      
      days.push(
        <div
          key={day}
          className={className}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => handleDateHover(date)}
          onMouseLeave={handleDateLeave}
          title={
            isPast 
              ? 'Past date' 
              : isBlocked 
                ? 'Booked/Unavailable' 
                : isAvailable 
                  ? `${isWeekendDate ? 'Weekend - ' : ''}Available - Click to select` 
                  : 'Available - Click to select'
          }
        >
          {day}
          {isTodayDate && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          )}
        </div>
      );
    }

    return (
      <div className="bg-slate-700 rounded-lg p-2 md:p-3 border border-orange-500/50 w-full max-w-[280px] mx-auto">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => {
              const prevMonth = new Date(currentMonth);
              prevMonth.setMonth(prevMonth.getMonth() - 1);
              setCurrentMonth(prevMonth);
            }}
            className="p-1 hover:bg-slate-600 rounded transition-colors group"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-orange-400 group-hover:text-orange-300" />
          </button>
          
          <div className="text-center">
            <h3 className="text-white font-semibold text-sm md:text-base">
              {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </h3>
          </div>
          
          <button
            onClick={() => {
              const nextMonth = new Date(currentMonth);
              nextMonth.setMonth(nextMonth.getMonth() + 1);
              setCurrentMonth(nextMonth);
            }}
            className="p-1 hover:bg-slate-600 rounded transition-colors group"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-orange-400 group-hover:text-orange-300" />
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="flex justify-center mb-2">
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="text-xs bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors font-semibold"
          >
            Today
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={`day-header-${index}`} className={`w-6 h-5 md:w-7 md:h-5 flex items-center justify-center text-xs font-semibold ${
              index === 0 || index === 6 ? 'text-yellow-400' : 'text-gray-300'
            }`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0.5">
          {days}
        </div>

        {/* Time Slots Modal */}
        {showTimeSlots && selectedDate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-sm w-full mx-4 border border-orange-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">
                  Select Time for {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <button
                  onClick={() => {
                    setShowTimeSlots(false);
                    setSelectedDate(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={`${slot.start}-${slot.end}-${index}`}
                    onClick={() => handleTimeSlotSelect(slot.start, slot.end)}
                    className="w-full p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">{slot.start} - {slot.end}</div>
                        <div className="text-gray-400 text-sm">{slot.label}</div>
                      </div>
                      <div className="text-2xl group-hover:scale-110 transition-transform">
                        {slot.icon}
                      </div>
                    </div>
                  </button>
                ))}
                
                {/* Custom Time Slot Option */}
                {!showCustomTime ? (
                  <button
                    onClick={() => setShowCustomTime(true)}
                    className="w-full p-3 bg-gradient-to-r from-orange-600/80 to-red-600/80 hover:from-orange-600 hover:to-red-600 rounded-lg transition-colors text-left border-2 border-orange-500/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">⏰ Custom Time Range</div>
                        <div className="text-gray-200 text-sm">Enter your preferred start and end time</div>
                      </div>
                      <div className="text-2xl">➕</div>
                    </div>
                  </button>
                ) : (
                  <div className="w-full p-3 bg-slate-700 rounded-lg border-2 border-orange-500/50">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">Custom Time Range</span>
                        <button
                          onClick={() => {
                            setShowCustomTime(false);
                            setCustomStartTime('');
                            setCustomEndTime('');
                          }}
                          className="text-gray-400 hover:text-white text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-300 mb-1">Start Time</label>
                          <input
                            type="time"
                            value={customStartTime}
                            onChange={(e) => setCustomStartTime(e.target.value)}
                            className="w-full bg-slate-600 text-white px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-300 mb-1">End Time</label>
                          <input
                            type="time"
                            value={customEndTime}
                            onChange={(e) => setCustomEndTime(e.target.value)}
                            className="w-full bg-slate-600 text-white px-2 py-1.5 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (customStartTime && customEndTime) {
                            // Convert 24h format to 12h format
                            const formatTime = (time24: string) => {
                              const [hours, minutes] = time24.split(':');
                              const hour = parseInt(hours);
                              const period = hour >= 12 ? 'PM' : 'AM';
                              const hour12 = hour % 12 || 12;
                              return `${hour12}:${minutes} ${period}`;
                            };
                            handleTimeSlotSelect(formatTime(customStartTime), formatTime(customEndTime));
                            setShowCustomTime(false);
                            setCustomStartTime('');
                            setCustomEndTime('');
                          }
                        }}
                        disabled={!customStartTime || !customEndTime}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                      >
                        Use Custom Time
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center text-xs text-gray-400">
                <p>🎧 All time slots include setup and teardown</p>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 text-[10px] md:text-xs">
          <div className="flex items-center space-x-1 bg-green-500/20 px-1.5 py-0.5 rounded border border-green-500/50">
            <div className="w-2.5 h-2.5 bg-green-500 rounded border border-green-400"></div>
            <span className="text-green-300 font-medium">Available</span>
          </div>
          <div className="flex items-center space-x-1 bg-red-500/20 px-1.5 py-0.5 rounded border border-red-500/50">
            <div className="w-2.5 h-2.5 bg-red-600 rounded border border-red-500"></div>
            <span className="text-red-300 font-medium">Unavailable</span>
          </div>
        </div>
      </div>
    );
  };

  // Check availability for date and time
  const checkAvailability = (date: string, time: string): boolean => {
    // Check if date is in blocked dates
    if (blockedDates.includes(date)) return false;
    
    // Check if date is in the past
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return false;
    
    // All future dates that aren't blocked are available
    // All time slots are available
    return true;
  };

  const getEventPricing = (eventType: string, guestCount: number): { base: number; total: number; includes: string[] } => {
    const basePrices = {
      'wedding': 1200,
      'birthday': 400,
      'corporate': 800,
      'cultural': 600,
      'anniversary': 500,
      'graduation': 450
    };

    const base = basePrices[eventType as keyof typeof basePrices] || 500;
    const guestMultiplier = Math.max(1, guestCount / 50);
    const total = Math.round(base * guestMultiplier);

    const includes = [
      'Professional DJ setup',
      'Dynamic lighting system',
      'Wireless microphones',
      'MC services',
      'Music selection consultation',
      'Setup and teardown'
    ];

    return { base, total, includes };
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate realistic typing speed based on message length
    const typingDelay = Math.min(message.length * typingSpeed, 3000);
    
    // Process the message based on current step
    setTimeout(() => {
      processUserInput(message);
    }, typingDelay);
  };

  const addReaction = (messageId: string, reaction: string) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), reaction]
    }));
  };

  const simulateFileUpload = () => {
    setShowFileUpload(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowFileUpload(false);
          
          // Add uploaded file message
          const fileMessage: Message = {
            id: Date.now().toString(),
            text: "📎 Event details uploaded successfully!",
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
          };
          
          setMessages(prev => [...prev, fileMessage]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const processUserInput = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    switch (chatState.step) {
      case 'greeting':
        handleEventTypeSelection(lowerMessage);
        break;
      case 'event-type':
        handleEventTypeSelection(lowerMessage);
        break;
      case 'date-selection':
        handleDateSelection(message);
        break;
      case 'time-selection':
        handleTimeSelection(message);
        break;
      case 'guest-count':
        handleGuestCountSelection(message);
        break;
      case 'location':
        handleLocationSelection(message);
        break;
      case 'budget':
        handleBudgetSelection(message);
        break;
      case 'contact-info':
        handleContactInfo(message);
        break;
      default:
        handleGeneralResponse(message);
    }
  };

  const handleEventTypeSelection = (message: string) => {
    const eventTypes = {
      'wedding': 'wedding',
      'birthday': 'birthday',
      'corporate': 'corporate',
      'cultural': 'cultural',
      'anniversary': 'anniversary',
      'graduation': 'graduation',
      'party': 'birthday'
    };

    let selectedEventType = '';
    for (const [key, value] of Object.entries(eventTypes)) {
      if (message.includes(key)) {
        selectedEventType = value;
        break;
      }
    }

    if (selectedEventType) {
      setChatState(prev => ({ ...prev, eventType: selectedEventType, step: 'date-selection' }));
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `Perfect! ${selectedEventType.charAt(0).toUpperCase() + selectedEventType.slice(1)} events are our specialty! 🎉\n\nWhen is your event? You can either:\n• Type a date (e.g., "December 15, 2024")\n• Click "Show Calendar" to see available dates`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Add calendar button message
      const calendarMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "📅 **Interactive Calendar**\n\nClick below to see our availability calendar with real-time updates!",
        sender: 'bot',
        timestamp: new Date(),
        type: 'date-picker',
        calendarData: {
          currentMonth: new Date(),
          availableDates,
          blockedDates
        }
      };
      
      setMessages(prev => [...prev, calendarMessage]);
    } else {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: "I'd love to help you plan your event! What type of event are you planning?\n\n• Wedding\n• Birthday Party\n• Corporate Event\n• Cultural Celebration\n• Anniversary\n• Graduation\n\nJust let me know what you have in mind!",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
    }
    setIsTyping(false);
  };

  const handleDateSelection = (message: string) => {
    // Simple date parsing (in production, use a proper date library)
    const dateMatch = message.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    let selectedDate = '';
    
    if (dateMatch) {
      const [, month, day, year] = dateMatch;
      selectedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else {
      // Try to parse natural language dates
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      if (message.includes('tomorrow')) {
        selectedDate = tomorrow.toISOString().split('T')[0];
      } else if (message.includes('next week')) {
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        selectedDate = nextWeek.toISOString().split('T')[0];
      } else {
        // Default to a future date for demo
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 30);
        selectedDate = futureDate.toISOString().split('T')[0];
      }
    }

    // Check if date is available (same logic as calendar)
    const dateObj = new Date(selectedDate);
    dateObj.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if date is in the past
    if (dateObj < today) {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `I'm sorry, but ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} is in the past. 😔\n\nPlease select a future date from the calendar.`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      return;
    }
    
    // Check if date is blocked
    if (blockedDates.includes(selectedDate)) {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `I'm sorry, but ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} is not available. 😔\n\nPlease select an available date from the calendar or try a different date.`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      return;
    }

    setChatState(prev => ({ ...prev, selectedDate, step: 'time-selection' }));

    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const botMessage: Message = {
      id: Date.now().toString(),
      text: `Great! ${formattedDate} sounds perfect! 🗓️\n\nWhat time would you like your event to start?\n\nAvailable time slots:\n• 12:00 PM (Afternoon)\n• 2:00 PM (Afternoon)\n• 6:00 PM (Evening)\n• 8:00 PM (Evening)\n• 10:00 PM (Night)\n\nJust let me know your preference!`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleTimeSelection = (message: string, endTime?: string) => {
    // Try to parse time range (e.g., "6:00 PM - 10:00 PM" or "6 PM to 10 PM")
    const rangeMatch = message.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)\s*[-to]+\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
    let selectedTime = '';
    let selectedTimeEnd = '';
    
    if (rangeMatch) {
      // Parse start time
      const [, startHour, startMin = '00', startPeriod, endHour, endMin = '00', endPeriod] = rangeMatch;
      const startHourNum = parseInt(startHour);
      const endHourNum = parseInt(endHour);
      const adjustedStartHour = startPeriod.toUpperCase() === 'PM' && startHourNum !== 12 ? startHourNum + 12 : (startPeriod.toUpperCase() === 'AM' && startHourNum === 12 ? 0 : startHourNum);
      const adjustedEndHour = endPeriod.toUpperCase() === 'PM' && endHourNum !== 12 ? endHourNum + 12 : (endPeriod.toUpperCase() === 'AM' && endHourNum === 12 ? 0 : endHourNum);
      selectedTime = `${adjustedStartHour}:${startMin} ${startPeriod.toUpperCase()}`;
      selectedTimeEnd = `${adjustedEndHour}:${endMin} ${endPeriod.toUpperCase()}`;
    } else if (endTime) {
      // If endTime is provided directly (from calendar modal)
      selectedTime = message;
      selectedTimeEnd = endTime;
    } else {
      // Try to parse single time
      const timeMatch = message.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
      if (timeMatch) {
        const [, hour, minute = '00', period] = timeMatch;
        const hourNum = parseInt(hour);
        const adjustedHour = period.toUpperCase() === 'PM' && hourNum !== 12 ? hourNum + 12 : hourNum;
        selectedTime = `${adjustedHour}:${minute} ${period.toUpperCase()}`;
        // Default to 4 hours duration
        const endHourNum = (adjustedHour + 4) % 24;
        const endPeriod = endHourNum >= 12 ? 'PM' : 'AM';
        const displayEndHour = endHourNum > 12 ? endHourNum - 12 : (endHourNum === 0 ? 12 : endHourNum);
        selectedTimeEnd = `${displayEndHour}:${minute} ${endPeriod}`;
      } else {
        // Default time range for demo
        selectedTime = '6:00 PM';
        selectedTimeEnd = '10:00 PM';
      }
    }

    // Check availability
    const isAvailable = checkAvailability(chatState.selectedDate!, selectedTime);
    
    if (isAvailable) {
      setChatState(prev => ({ ...prev, selectedTime, selectedTimeEnd, step: 'guest-count' }));

      const botMessage: Message = {
        id: Date.now().toString(),
        text: `Excellent! ${selectedTime} - ${selectedTimeEnd} is available! ✅\n\nHow many guests are you expecting? This helps me provide the perfect setup for your event.`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botMessage]);
    } else {
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `I'm sorry, but ${selectedTime} - ${selectedTimeEnd} is not available on ${new Date(chatState.selectedDate!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. 😔\n\nWould you like to try a different time range?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botMessage]);
    }
    setIsTyping(false);
  };

  const handleGuestCountSelection = (message: string) => {
    const numberMatch = message.match(/(\d+)/);
    const guestCount = numberMatch ? parseInt(numberMatch[1]) : 50;

    setChatState(prev => ({ ...prev, guestCount, step: 'location' }));

    const botMessage: Message = {
      id: Date.now().toString(),
      text: `Perfect! ${guestCount} guests will make for an amazing celebration! 🎉\n\nWhere will your event be held? (City/venue name)\n\nDJ Vish serves the entire Bay Area including:\n• Fremont\n• San Jose\n• Oakland\n• San Francisco\n• And surrounding areas`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleLocationSelection = (message: string) => {
    setChatState(prev => ({ ...prev, location: message, step: 'contact-info' }));

    const botMessage: Message = {
      id: Date.now().toString(),
      text: `Great location! ${message} is in our service area. 🌟\n\nPerfect! I'd love to help you plan your ${chatState.eventType} event for ${chatState.guestCount} guests.\n\nTo finalize your booking, I'll need your contact information. What's your name?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleBudgetSelection = (message: string) => {
    setChatState(prev => ({ ...prev, budget: message, step: 'contact-info' }));

    const botMessage: Message = {
      id: Date.now().toString(),
      text: `Perfect! I can work with your budget. 💰\n\nFor your ${chatState.eventType} event, I'll make sure we create the perfect experience for you and your ${chatState.guestCount} guests.\n\nTo finalize your booking, I'll need your contact information. What's your name?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleContactInfo = (message: string) => {
    // Simple name extraction
    const name = message.split(' ')[0] || 'Guest';
    
    setChatState(prev => ({ 
      ...prev, 
      contactInfo: { name, phone: '', email: '' },
      step: 'confirmation' 
    }));

    const botMessage: Message = {
      id: Date.now().toString(),
      text: `Thank you, ${name}! 🎉\n\nHere's your event summary:\n\n📅 **Event**: ${chatState.eventType}\n🗓️ **Date**: ${new Date(chatState.selectedDate!).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}\n⏰ **Time**: ${chatState.selectedTime}${chatState.selectedTimeEnd ? ` - ${chatState.selectedTimeEnd}` : ''}\n👥 **Guests**: ${chatState.guestCount}\n📍 **Location**: ${chatState.location}\n\nDJ Vish will call you within 2 hours to confirm all details and answer any questions!\n\nYour phone number: (408) 555-1234\nEmail: booking@djvish.com\n\nThank you for choosing DJ Vish! 🎧✨`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'confirmation'
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleGeneralResponse = (message: string) => {
    const responses = [
      "That's great to hear! Is there anything specific about your event you'd like to discuss?",
      "I'm here to help make your event perfect! What else would you like to know?",
      "DJ Vish is excited to work with you! Any other questions about our services?",
      "Perfect! I'll make sure DJ Vish gets all the details. Is there anything else you'd like to add?"
    ];
    
    const botMessage: Message = {
      id: Date.now().toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (inputMessage.trim()) {
        handleSendMessage(inputMessage);
      }
    }
  };

  const resetChat = () => {
    setMessages([{
      id: '1',
      text: "Hi! I'm DJ Vish's booking assistant. I'm here to help you plan your perfect event! 🎧✨\n\nWhat type of event are you planning?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }]);
    setChatState({ step: 'greeting' });
    setShowCalendar(false);
  };

  // Smart suggestions based on context
  const generateSmartSuggestions = (context: string, step: string) => {
    const suggestions: { [key: string]: string[] } = {
      greeting: [
        "Wedding",
        "Birthday",
        "Corporate",
        "Cultural"
      ],
      'event-type': [
        "Wedding",
        "Birthday",
        "Corporate",
        "Cultural"
      ],
      'date-selection': [
        "Show me available dates",
        "What dates work for you?",
        "I need help choosing a date"
      ],
      'time-selection': [
        "6:00 PM - 10:00 PM",
        "8:00 PM - 12:00 AM",
        "10:00 PM - 2:00 AM"
      ],
      'guest-count': [
        "50",
        "100",
        "200",
        "300+"
      ],
      'location': [
        "Fremont",
        "San Jose",
        "Oakland",
        "San Francisco"
      ],
      'contact-info': [
        "Yes, I'm ready to book",
        "I have questions first"
      ],
      'confirmation': []
    };
    
    return suggestions[step] || suggestions.greeting;
  };

  // AI-powered event recommendations
  const getEventRecommendations = (eventType: string, guestCount: number, budget: string) => {
    const recommendations = {
      wedding: {
        duration: "6-8 hours recommended",
        setup: "2 hours before event",
        lighting: "Essential for atmosphere",
        music: "Mix of romantic, dance, and cultural",
        extras: "MC services, photo booth coordination"
      },
      birthday: {
        duration: "4-6 hours perfect",
        setup: "1 hour before event",
        lighting: "Colorful and fun",
        music: "Latest hits + requested songs",
        extras: "Interactive games, karaoke"
      },
      corporate: {
        duration: "3-5 hours professional",
        setup: "1.5 hours before event",
        lighting: "Subtle and elegant",
        music: "Background + dance mix",
        extras: "Announcements, awards presentation"
      }
    };
    
    return recommendations[eventType as keyof typeof recommendations] || recommendations.birthday;
  };

  // Payment form component
  const PaymentForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-orange-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">💳 Payment Information</h3>
          <button
            onClick={() => setShowPaymentForm(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {paymentStep === 'card' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
              />
            </div>
            
            <button
              onClick={() => setPaymentStep('confirmation')}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Pay $500 Deposit
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h4 className="text-white font-semibold mb-2">Payment Successful!</h4>
            <p className="text-gray-300 mb-4">Your $500 deposit has been processed.</p>
            <button
              onClick={() => setShowPaymentForm(false)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Contract preview component
  const ContractPreview = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 border border-orange-500/30 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">📋 Service Agreement</h3>
          <button
            onClick={() => setShowContract(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-slate-700 rounded-lg p-4 text-sm text-gray-200 space-y-3">
          <h4 className="text-white font-semibold">DJ Vish Entertainment Services</h4>
          <p><strong>Event Date:</strong> {chatState.selectedDate}</p>
          <p><strong>Event Type:</strong> {chatState.eventType}</p>
          <p><strong>Duration:</strong> 6 hours (including setup/teardown)</p>
          <p><strong>Services Included:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Professional DJ equipment and sound system</li>
            <li>Dynamic lighting effects</li>
            <li>Wireless microphones</li>
            <li>MC services</li>
            <li>Music selection consultation</li>
            <li>Setup and teardown</li>
          </ul>
          <p><strong>Total Cost:</strong> $500 (deposit paid)</p>
          <p><strong>Cancellation Policy:</strong> 48 hours notice required</p>
        </div>
        
        <div className="mt-4 flex space-x-3">
          <button
            onClick={() => setShowContract(false)}
            className="flex-1 bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-500 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              setShowContract(false);
              setShowPaymentForm(true);
            }}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );

  // Guest list manager component
  const GuestListManager = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-orange-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">👥 Guest List Manager</h3>
          <button
            onClick={() => setShowGuestManager(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Add guest name"
              className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  setGuestList([...guestList, e.currentTarget.value.trim()]);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input[placeholder="Add guest name"]') as HTMLInputElement;
                if (input && input.value.trim()) {
                  setGuestList([...guestList, input.value.trim()]);
                  input.value = '';
                }
              }}
              className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Add
            </button>
          </div>
          
          <div className="max-h-40 overflow-y-auto">
            {guestList.map((guest, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                <span className="text-gray-200">{guest}</span>
                <button
                  onClick={() => setGuestList(guestList.filter((_, i) => i !== index))}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center text-sm text-gray-400">
            {guestList.length} guests added
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-20 h-20 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-[0_0_40px_rgba(249,115,22,0.8),0_0_80px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,1),0_0_100px_rgba(249,115,22,0.6)] transition-all duration-300 transform hover:scale-110 group focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center relative"
          aria-label="Open live chat"
        >
          <MessageCircle className="w-8 h-8 md:w-8 md:h-8 text-white group-hover:animate-bounce" />
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        </button>
        {/* Live Chat Label */}
        <div className="bg-gradient-to-r from-orange-600/95 to-red-600/95 backdrop-blur-md border-2 border-orange-400/60 rounded-lg px-4 py-2.5 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] transition-all duration-300">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            <span className="text-white text-sm md:text-base font-bold drop-shadow-lg">Live Chat</span>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 left-6 md:left-auto md:w-[500px] h-[800px] md:h-[850px] max-h-[92vh] bg-slate-800/95 backdrop-blur-md border-2 border-orange-500/50 rounded-lg shadow-[0_0_50px_rgba(249,115,22,0.3)] z-[100] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b-2 border-orange-500/30 bg-slate-900/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="text-white font-bold text-base md:text-lg">DJ Vish Booking Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'es' | 'hi')}
                className="text-xs md:text-sm bg-slate-700 text-gray-300 px-2 py-1.5 rounded border border-slate-600 focus:outline-none focus:border-orange-400"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
                <option value="hi">🇮🇳 HI</option>
              </select>
              
              <button
                onClick={() => setShowGuestManager(true)}
                className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                aria-label="Manage guest list"
              >
                👥
              </button>
              
              <button
                onClick={() => setShowContract(true)}
                className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                aria-label="View contract"
              >
                📋
              </button>
              
              <button
                onClick={resetChat}
                className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm px-2 py-1"
                aria-label="Reset chat"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 chat-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${message.type === 'date-picker' ? 'w-full' : ''}`}
              >
                <div
                  className={`${message.type === 'date-picker' ? 'w-full max-w-full' : 'max-w-[85%] md:max-w-sm'} px-4 py-3 rounded-lg relative group ${
                    message.sender === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-700 text-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-line text-sm md:text-base leading-relaxed">{message.text}</div>
                  
                  {/* Message Reactions */}
                  {messageReactions[message.id] && (
                    <div className="flex space-x-1 mt-1">
                      {messageReactions[message.id].map((reaction, index) => (
                        <span key={index} className="text-xs bg-white/20 rounded-full px-1">
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Reaction Buttons (for bot messages) */}
                  {message.sender === 'bot' && message.type !== 'date-picker' && (
                    <div className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        {['👍', '❤️', '🎉', '🤔'].map((reaction) => (
                          <button
                            key={reaction}
                            onClick={() => addReaction(message.id, reaction)}
                            className="text-xs bg-slate-600 hover:bg-slate-500 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                          >
                            {reaction}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Calendar Component */}
                  {message.type === 'date-picker' && (
                    <div className="mt-3 -mx-2 -mb-2 w-full flex justify-center">
                      <CalendarComponent 
                        onDateSelect={(date) => {
                          // Validate the date is not in the past
                          const dateObj = new Date(date);
                          dateObj.setHours(0, 0, 0, 0);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          
                          if (dateObj < today) {
                            const botMessage: Message = {
                              id: Date.now().toString(),
                              text: `I'm sorry, but that date is in the past. Please select a future date. 😔`,
                              sender: 'bot',
                              timestamp: new Date(),
                              type: 'text'
                            };
                            setMessages(prev => [...prev, botMessage]);
                            return;
                          }
                          
                          // Check if date is blocked
                          if (blockedDates.includes(date)) {
                            const botMessage: Message = {
                              id: Date.now().toString(),
                              text: `I'm sorry, but ${new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} is not available. Please select another date. 😔`,
                              sender: 'bot',
                              timestamp: new Date(),
                              type: 'text'
                            };
                            setMessages(prev => [...prev, botMessage]);
                            return;
                          }
                          
                          const formattedDate = new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });
                          
                          const botMessage: Message = {
                            id: Date.now().toString(),
                            text: `Great! ${formattedDate} sounds perfect! 🗓️\n\nWhat time range would you like for your event?\n\nAvailable time slots:\n• 12:00 PM - 4:00 PM (Afternoon, 4 hours)\n• 2:00 PM - 6:00 PM (Afternoon, 4 hours)\n• 6:00 PM - 10:00 PM (Evening, 4 hours)\n• 6:00 PM - 12:00 AM (Evening, 6 hours)\n• 8:00 PM - 12:00 AM (Evening, 4 hours)\n• 10:00 PM - 2:00 AM (Night, 4 hours)\n\nYou can select from the calendar or type your preferred time range!`,
                            sender: 'bot',
                            timestamp: new Date(),
                            type: 'text'
                          };
                          
                          setChatState(prev => ({ ...prev, selectedDate: date, step: 'time-selection' }));
                          setMessages(prev => [...prev, botMessage]);
                        }}
                        onTimeSelect={(startTime, endTime) => {
                          // Handle time selection from calendar modal
                          // Use the latest state to ensure date is set
                          setChatState(prev => {
                            if (prev.selectedDate && prev.step === 'time-selection') {
                              // Process time selection with the current date
                              setTimeout(() => {
                                handleTimeSelection(startTime, endTime);
                              }, 100);
                            }
                            return prev;
                          });
                        }}
                      />
                    </div>
                  )}
                  
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-gray-200 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-400">DJ Vish is typing...</span>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload Progress */}
            {showFileUpload && (
              <div className="flex justify-end">
                <div className="bg-slate-700 text-gray-200 px-3 py-2 rounded-lg max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="flex-1">
                      <div className="text-xs">Uploading event details...</div>
                      <div className="w-full bg-slate-600 rounded-full h-1 mt-1">
                        <div 
                          className="bg-orange-500 h-1 rounded-full transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {showPaymentForm && <PaymentForm />}
            {showContract && <ContractPreview />}
            {showGuestManager && <GuestListManager />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t-2 border-orange-500/30 bg-slate-900/30 flex flex-col max-h-[200px]">
            {/* Scrollable Actions Area */}
            <div className="overflow-y-auto chat-scrollbar flex-shrink-0" style={{ maxHeight: '120px' }}>
              {/* Enhanced Quick Actions */}
              <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setInputMessage("Wedding");
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="text-[10px] md:text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded hover:bg-slate-600 transition-colors font-medium"
                >
                  💒 Wedding
                </button>
                <button
                  onClick={() => {
                    setInputMessage("Birthday");
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="text-[10px] md:text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded hover:bg-slate-600 transition-colors font-medium"
                >
                  🎂 Birthday
                </button>
                <button
                  onClick={() => {
                    setInputMessage("Corporate");
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="text-[10px] md:text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded hover:bg-slate-600 transition-colors font-medium"
                >
                  🏢 Corporate
                </button>
                <button
                  onClick={() => {
                    setInputMessage("Cultural");
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="text-[10px] md:text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded hover:bg-slate-600 transition-colors font-medium"
                >
                  🎭 Cultural
                </button>
                <button
                  onClick={() => {
                    setInputMessage("Show me your portfolio");
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="text-[10px] md:text-xs bg-orange-600 text-white px-2 py-1 rounded hover:bg-orange-700 transition-colors font-semibold"
                >
                  📸 Portfolio
                </button>
              </div>

              {/* Smart Suggestions */}
              {smartSuggestions.length > 0 && (
                <div className="px-3 pb-1">
                  <div className="text-[10px] md:text-xs text-gray-300 mb-1 font-semibold">💡 Smart Suggestions:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {smartSuggestions.slice(0, 3).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(suggestion);
                          // Focus the input field after a short delay to ensure it's ready
                          setTimeout(() => {
                            inputRef.current?.focus();
                          }, 100);
                        }}
                        className="text-[10px] md:text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors font-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Recommendations */}
              {chatState.eventType && (
                <div className="px-3 pb-2">
                  <div className="p-1.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded border border-purple-500/30">
                    <div className="text-[10px] text-purple-300 mb-1 font-semibold">🤖 AI Recommendations for {chatState.eventType}:</div>
                    <div className="text-[10px] text-gray-300 space-y-0.5 max-h-[60px] overflow-y-auto chat-scrollbar">
                      {Object.entries(getEventRecommendations(chatState.eventType, chatState.guestCount || 50, chatState.budget || '')).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key}:</span>
                          <span className="text-purple-200 ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Field */}
            <div className="p-2 flex space-x-2 flex-shrink-0">
              <button
                onClick={simulateFileUpload}
                className="p-1.5 text-gray-400 hover:text-orange-400 transition-colors"
                title="Upload files"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              
              <button
                onClick={() => setInputMessage("🎤 Voice message simulation")}
                className="p-1.5 text-gray-400 hover:text-orange-400 transition-colors"
                title="Voice message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              />
              <button
                onClick={() => inputMessage.trim() && handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
                className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
