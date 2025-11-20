'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeSlot {
  time: string;
  available: boolean;
  booked: boolean;
}

interface DayAvailability {
  date: string;
  day: string;
  available: boolean;
  timeSlots: TimeSlot[];
}

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'date' | 'time' | 'details'>('date');

  // Generate next 30 days with availability
  const generateAvailability = (): DayAvailability[] => {
    const days: DayAvailability[] = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isAvailable = Math.random() > 0.3; // 70% availability
      
      const timeSlots: TimeSlot[] = [
        { time: '12:00 PM', available: isAvailable && isWeekend, booked: false },
        { time: '2:00 PM', available: isAvailable && isWeekend, booked: false },
        { time: '4:00 PM', available: isAvailable && isWeekend, booked: false },
        { time: '6:00 PM', available: isAvailable, booked: false },
        { time: '8:00 PM', available: isAvailable, booked: false },
        { time: '10:00 PM', available: isAvailable, booked: false },
      ];

      days.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        available: isAvailable,
        timeSlots
      });
    }
    
    return days;
  };

  const availability = generateAvailability();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  const handleBooking = () => {
    // Simulate booking process
    alert(`Booking confirmed for ${selectedDate} at ${selectedTime}! DJ Vish will contact you within 2 hours.`);
    setIsOpen(false);
    setStep('date');
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <>
      {/* Calendar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-24 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] transition-all duration-300 transform hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900 z-40"
        aria-label="Open booking calendar"
      >
        <div className="flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white group-hover:animate-bounce" />
        </div>
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400/50 animate-ping"></div>
      </button>

      {/* Calendar Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-24 w-96 bg-slate-800/95 backdrop-blur-md border border-green-500/30 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.3)] z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-500/30">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Book DJ Vish</h3>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setStep('date');
                setSelectedDate('');
                setSelectedTime('');
              }}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close calendar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {step === 'date' && (
              <div>
                <h4 className="text-white font-semibold mb-4">Select Date</h4>
                <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto">
                  {availability.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => handleDateSelect(day.date)}
                      disabled={!day.available}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        day.available
                          ? 'bg-slate-700 text-white hover:bg-green-600 hover:text-white'
                          : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-xs opacity-70">{day.day.split(' ')[0]}</div>
                      <div className="font-semibold">{day.day.split(' ')[1]}</div>
                      <div className="text-xs">{day.day.split(' ')[2]}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'time' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Select Time</h4>
                  <button
                    onClick={() => setStep('date')}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    ← Back
                  </button>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {availability.find(d => d.date === selectedDate)?.timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        slot.available
                          ? 'bg-slate-700 text-white hover:bg-green-600 hover:text-white'
                          : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'details' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Booking Details</h4>
                  <button
                    onClick={() => setStep('time')}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    ← Back
                  </button>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-white">
                      {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-white">{selectedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span className="text-white">Bay Area (Travel included)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Professional sound system included</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Dynamic lighting setup</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Wireless microphones</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>MC services included</span>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  Confirm Booking
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
