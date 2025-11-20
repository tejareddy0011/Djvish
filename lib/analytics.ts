// Analytics utility for tracking user interactions and performance

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}

class Analytics {
  private isInitialized = false;

  init() {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      this.isInitialized = true;
      console.log('Analytics initialized');
    }
  }

  trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized) return;

    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });

    // Also log to console for development
    console.log('Analytics Event:', event);
  }

  trackPageView(page: string) {
    if (!this.isInitialized) return;

    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: page,
    });
  }

  trackPerformance(metric: PerformanceMetric) {
    if (!this.isInitialized) return;

    (window as any).gtag('event', 'timing_complete', {
      name: metric.name,
      value: metric.value,
      event_category: 'Performance',
    });
  }

  // Predefined events for DJ Vish website
  trackBookingInquiry() {
    this.trackEvent({
      action: 'booking_inquiry',
      category: 'Engagement',
      label: 'Contact Form Submission',
    });
  }

  trackMusicSamplePlay(trackId: number) {
    this.trackEvent({
      action: 'music_sample_play',
      category: 'Content',
      label: `Track ${trackId}`,
    });
  }

  trackSectionView(section: string) {
    this.trackEvent({
      action: 'section_view',
      category: 'Navigation',
      label: section,
    });
  }

  trackSocialClick(platform: string) {
    this.trackEvent({
      action: 'social_click',
      category: 'Social',
      label: platform,
    });
  }

  trackLiveChatOpen() {
    this.trackEvent({
      action: 'live_chat_open',
      category: 'Support',
      label: 'Chat Widget',
    });
  }

  trackCalendarBooking() {
    this.trackEvent({
      action: 'calendar_booking',
      category: 'Conversion',
      label: 'Calendar Widget',
    });
  }

  trackPhoneCall() {
    this.trackEvent({
      action: 'phone_call',
      category: 'Contact',
      label: 'Phone Number Click',
    });
  }

  trackEmailClick() {
    this.trackEvent({
      action: 'email_click',
      category: 'Contact',
      label: 'Email Link Click',
    });
  }
}

// Performance monitoring
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  trackPageLoad() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        this.metrics.push({
          name: 'Page Load Time',
          value: navigation.loadEventEnd - navigation.loadEventStart,
          unit: 'ms',
        });

        this.metrics.push({
          name: 'DOM Content Loaded',
          value: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          unit: 'ms',
        });

        this.metrics.push({
          name: 'First Contentful Paint',
          value: navigation.responseStart - navigation.requestStart,
          unit: 'ms',
        });
      }

      // Track Core Web Vitals
      this.trackCoreWebVitals();
    });
  }

  private trackCoreWebVitals() {
    // Track Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.metrics.push({
        name: 'Largest Contentful Paint',
        value: lastEntry.startTime,
        unit: 'ms',
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.push({
          name: 'First Input Delay',
          value: entry.processingStart - entry.startTime,
          unit: 'ms',
        });
      });
    });

    fidObserver.observe({ entryTypes: ['first-input'] });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Report CLS after page unload
    window.addEventListener('beforeunload', () => {
      this.metrics.push({
        name: 'Cumulative Layout Shift',
        value: clsValue,
        unit: 'score',
      });
    });
  }

  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  logMetrics() {
    console.log('Performance Metrics:', this.metrics);
  }
}

// Export instances
export const analytics = new Analytics();
export const performanceMonitor = new PerformanceMonitor();

// Initialize on client side
if (typeof window !== 'undefined') {
  analytics.init();
  performanceMonitor.trackPageLoad();
}
