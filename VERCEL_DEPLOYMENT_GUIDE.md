# 🚀 Vercel Deployment Guide for DJ Vish Website

## ⚠️ Important: Environment Variables

Your website needs environment variables to work on Vercel. **You MUST add these in Vercel Dashboard:**

### Required Environment Variables:

1. **BLOB_READ_WRITE_TOKEN**
   - Value: `vercel_blob_rw_93GeOroGldIzVXbJ_XDjTxQb3ZxncdlY4oWWF0r9Kf6lEiR`
   - Used for: File uploads (photos/videos)

2. **RESEND_API_KEY**
   - Value: `re_SZsT4d6m_J6r3kqgJNCQScSvDuwP7xVw4`
   - Used for: Email notifications from contact form

---

## 📋 Step-by-Step Deployment

### Step 1: Add Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or import from GitHub)
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

   **Variable 1:**
   - Name: `BLOB_READ_WRITE_TOKEN`
   - Value: `vercel_blob_rw_93GeOroGldIzVXbJ_XDjTxQb3ZxncdlY4oWWF0r9Kf6lEiR`
   - Environment: Select **Production**, **Preview**, and **Development**
   - Click **Save**

   **Variable 2:**
   - Name: `RESEND_API_KEY`
   - Value: `re_SZsT4d6m_J6r3kqgJNCQScSvDuwP7xVw4`
   - Environment: Select **Production**, **Preview**, and **Development**
   - Click **Save**

### Step 2: Redeploy After Adding Variables

After adding environment variables, you **MUST redeploy**:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

**OR** push a new commit to trigger automatic redeploy.

---

## 🔍 Why Gallery Images Don't Show

### Issue: File System Storage
The current setup uses `data/media.json` which is stored in the file system. **This doesn't persist on Vercel** because:
- Vercel uses serverless functions (stateless)
- File system writes are temporary
- Each deployment starts fresh

### Solutions:

#### Option 1: Use Vercel Blob for Metadata (Recommended)
Store media metadata in Vercel Blob instead of file system.

#### Option 2: Use a Database
- Vercel Postgres (recommended)
- Supabase
- MongoDB Atlas

#### Option 3: Keep Using File System (Quick Fix)
The current setup will work, but you'll need to:
- Re-upload media after each deployment
- Or use a persistent storage solution

---

## ✅ Quick Fix for Now

1. **Add environment variables** (see Step 1 above)
2. **Redeploy** your site
3. **Go to admin panel**: `https://your-site.vercel.app/admin/media`
4. **Re-upload your images** (they'll be stored in Vercel Blob, which persists)

---

## 🔧 Verify Deployment

After deployment, check:

1. **Main site loads**: `https://your-site.vercel.app`
2. **Admin panel works**: `https://your-site.vercel.app/admin/media`
3. **Can upload files**: Try uploading a test image
4. **Gallery shows images**: Check the gallery section

---

## 🐛 Troubleshooting

### "BLOB_READ_WRITE_TOKEN not configured"
- ✅ Check environment variables are set in Vercel
- ✅ Make sure you redeployed after adding variables
- ✅ Check variable names match exactly (case-sensitive)

### "Images not showing"
- ✅ Check browser console for errors
- ✅ Verify images uploaded successfully
- ✅ Check Vercel Blob storage has the files
- ✅ Verify `next.config.mjs` has the remote patterns

### "Admin page not accessible"
- ✅ Check the route: `/admin/media`
- ✅ Verify the file exists: `app/admin/media/page.tsx`
- ✅ Check Vercel build logs for errors

---

## 📝 Next Steps

1. **Add environment variables** in Vercel Dashboard
2. **Redeploy** your site
3. **Upload media** via admin panel
4. **Test all features** on production

---

## 🔗 Helpful Links

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)

