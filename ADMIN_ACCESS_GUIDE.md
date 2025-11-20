# 🔐 How to Access Admin Panel on Vercel

## ✅ Correct URL Format

The admin panel is accessible at:
```
https://your-site.vercel.app/admin/media
```

**NOT:**
- ❌ `https://your-site.vercel.app/admin` (this will 404)
- ❌ `https://your-site.vercel.app/admin/` (this will 404)
- ✅ `https://your-site.vercel.app/admin/media` (correct!)

---

## 🔍 Troubleshooting Steps

### Step 1: Verify Latest Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Check **Deployments** tab
4. Make sure the latest commit is deployed (look for commit `72b8770` or newer)
5. If not, click **"Redeploy"** on the latest deployment

### Step 2: Check Build Logs
1. In Vercel Dashboard → **Deployments**
2. Click on the latest deployment
3. Check **Build Logs** for any errors
4. Look for: `Route (app) /admin/media` - it should show `○ (Static)`

### Step 3: Verify Route in Build Output
The build should show:
```
Route (app)                                 Size  First Load JS
├ ○ /admin/media                         29.3 kB         138 kB
```

If you don't see this, the route isn't being built.

### Step 4: Clear Cache
1. **Hard refresh** your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Or try **incognito/private window**
3. Or clear browser cache completely

### Step 5: Check Exact URL
Make sure you're using the **exact** URL:
- ✅ `https://your-site.vercel.app/admin/media`
- Make sure there's no trailing slash
- Make sure it's `/admin/media` not `/admin/`

---

## 🐛 Common Issues

### Issue: "404 - This page could not be found"

**Possible Causes:**
1. **Not deployed yet** - Latest code hasn't been deployed
2. **Build error** - Check Vercel build logs
3. **Caching** - Browser or CDN cache showing old version
4. **Wrong URL** - Using `/admin` instead of `/admin/media`

**Solutions:**
1. Wait for deployment to complete (check Vercel dashboard)
2. Redeploy manually in Vercel
3. Clear browser cache
4. Use exact URL: `/admin/media`

### Issue: "Page loads but shows blank/error"

**Possible Causes:**
1. **Environment variables missing** - `BLOB_READ_WRITE_TOKEN` not set
2. **API route error** - Check browser console for errors
3. **Client-side error** - Check browser console

**Solutions:**
1. Add environment variables in Vercel Dashboard
2. Check browser console (F12) for errors
3. Check Vercel function logs

---

## ✅ Verification Checklist

- [ ] Latest code is deployed on Vercel
- [ ] Build logs show `/admin/media` route
- [ ] Using correct URL: `/admin/media`
- [ ] Browser cache cleared
- [ ] Environment variables set in Vercel
- [ ] No errors in Vercel build logs
- [ ] No errors in browser console

---

## 📞 Still Not Working?

If you've tried everything above:

1. **Check Vercel Build Logs:**
   - Go to Vercel Dashboard → Deployments → Latest → Build Logs
   - Look for any errors related to `/admin/media`
   - Share the error message

2. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Try accessing `/admin/media`
   - Share any error messages

3. **Verify File Structure:**
   - Make sure `app/admin/media/page.tsx` exists
   - Make sure `app/admin/layout.tsx` exists
   - Both should be in your GitHub repository

---

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Repository**: https://github.com/tejareddy0011/Djvish
- **Next.js App Router Docs**: https://nextjs.org/docs/app

