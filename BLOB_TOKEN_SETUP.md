# 🔑 Vercel Blob Token Setup Guide

## Quick Setup Steps

### 1. Get Your Vercel Blob Token

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create one if you haven't)
3. Go to **Settings** → **Storage**
4. Click **Create Database** or **Create Store**
5. Select **Blob** as the storage type
6. Create a new Blob store (name it something like "dj-vish-media")
7. Once created, you'll see a **Token** section
8. Copy the `BLOB_READ_WRITE_TOKEN` (it starts with `vercel_blob_`)

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Create a Blob store
vercel blob create

# This will output the token
```

### 2. Add Token to .env.local

Open your `.env.local` file in the project root and add:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxxxxxxxxxx
```

**Your complete `.env.local` should look like:**
```env
RESEND_API_KEY=re_SZsT4d6m_J6r3kqgJNCQScSvDuwP7xVw4
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxxxxxxxxxx
```

### 3. Restart Your Dev Server

After adding the token, **restart your development server**:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### 4. Test the Upload

1. Go to `http://localhost:3000/admin/media`
2. Select a file (photo or video)
3. The file should upload automatically
4. You should see "✓ Uploaded!" message

---

## 🚨 Troubleshooting

### "BLOB_READ_WRITE_TOKEN not configured"
- ✅ Make sure the token is in `.env.local` (not `.env`)
- ✅ Make sure there are no spaces around the `=` sign
- ✅ Make sure you restarted the dev server after adding the token
- ✅ Check that the token starts with `vercel_blob_`

### "Upload failed" Error
- ✅ Check your internet connection
- ✅ Make sure the file size is under 100MB
- ✅ Try a smaller file first (under 5MB)
- ✅ Check the browser console for detailed error messages

### Token Not Working
- ✅ Make sure you copied the entire token (they're long!)
- ✅ Don't include quotes around the token value
- ✅ The token should be on a single line

---

## 📝 Notes

- The token is **sensitive** - don't commit it to Git
- The `.env.local` file is already in `.gitignore` so it won't be committed
- You need a Vercel account (free tier works fine)
- The Blob store has a free tier with generous limits

---

## 🔗 Helpful Links

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Pricing](https://vercel.com/pricing)

