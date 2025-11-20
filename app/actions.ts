'use server'

import { Resend } from 'resend';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  message: string;
}

// Initialize Resend (will use RESEND_API_KEY from environment)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Log the submission
    console.log('Contact form submission:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventDate: formData.eventDate,
      eventType: formData.eventType,
      message: formData.message,
      timestamp: new Date().toISOString()
    });

    // Send email notification if API key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const emailResult = await resend.emails.send({
          from: 'DJ Vish Website <onboarding@resend.dev>', // You'll need to verify your domain with Resend
          to: ['teja93560@gmail.com'], // Your email address
          subject: `New Booking Request from ${formData.name}`,
          html: `
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Event Date:</strong> ${formData.eventDate || 'Not provided'}</p>
            <p><strong>Event Type:</strong> ${formData.eventType || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
            <hr>
            <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
          `,
        });

        console.log('Email sent successfully:', emailResult);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the form submission if email fails
        // Just log it and continue
      }
    } else {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'An error occurred while submitting the form.' };
  }
}
