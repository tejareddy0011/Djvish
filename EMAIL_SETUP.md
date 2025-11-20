# Email Setup Instructions

## Why you're not receiving emails

The contact form is currently working, but email sending requires an API key. The form submissions are being logged to the console, but emails aren't being sent yet.

## Quick Setup (5 minutes)

### Option 1: Using Resend (Recommended - Free tier available)

1. **Sign up for Resend** (Free tier: 3,000 emails/month)
   - Go to: https://resend.com
   - Sign up with your email (teja93560@gmail.com)
   - Verify your email address

2. **Get your API Key**
   - Go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the API key (starts with `re_`)

3. **Add API Key to your project**
   - Create a file named `.env.local` in the root of your project
   - Add this line:
     ```
     RESEND_API_KEY=re_your_actual_api_key_here
     ```
   - Replace `re_your_actual_api_key_here` with your actual API key

4. **Restart your dev server**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

5. **Test the form**
   - Submit a test form submission
   - Check your email (teja93560@gmail.com) for the notification

### Important Notes:

- **Email From Address**: Currently using `onboarding@resend.dev` (Resend's test domain)
- **To Verify Your Own Domain**: 
  - Go to Resend Dashboard → Domains
  - Add your domain and verify it
  - Then update the `from` field in `app/actions.ts` to use your domain

### Alternative: Use Gmail SMTP (More complex)

If you prefer using Gmail directly, we can set up Nodemailer with Gmail SMTP. However, this requires:
- App password from Google
- Less reliable than Resend
- More setup complexity

## Current Status

✅ Form validation working
✅ Form submissions logging to console
❌ Email sending (requires API key setup)
❌ SMS notifications (can be added with Twilio)

## Next Steps

1. Set up Resend API key (see above)
2. Test form submission
3. (Optional) Set up SMS notifications with Twilio
4. (Optional) Verify your own domain with Resend for better deliverability

## Troubleshooting

- **Still not receiving emails?**
  - Check your spam folder
  - Verify RESEND_API_KEY is set correctly
  - Check the server console for error messages
  - Make sure you restarted the dev server after adding the API key

- **Want SMS notifications too?**
  - We can add Twilio integration for text message notifications
  - Requires Twilio account setup

