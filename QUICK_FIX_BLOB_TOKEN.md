# ⚡ Quick Fix: Add BLOB Token

## The Error
```
Upload failed: BLOB_READ_WRITE_TOKEN not configured. Please add it to your .env.local file.
```

## The Solution (2 Minutes)

### Step 1: Get Your Token
1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Click on your project (or create one)
3. Go to **Settings** → **Storage**
4. Click **Create Database** or **Create Store**
5. Select **Blob** as the type
6. Name it (e.g., "dj-vish-media")
7. Click **Create**
8. **Copy the token** (it starts with `vercel_blob_`)

### Step 2: Add to .env.local

**Open `.env.local` in your project root** and add this line:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxx
```

**Replace `vercel_blob_xxxxxxxxxxxxx` with your actual token!**

Your complete `.env.local` should look like:
```env
RESEND_API_KEY=re_SZsT4d6m_J6r3kqgJNCQScSvDuwP7xVw4
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxx
```

### Step 3: Restart Server

**Stop your dev server** (Ctrl+C) and restart:
```bash
npm run dev
```

### Step 4: Test

1. Go to `http://localhost:3000/admin/media`
2. Select a file
3. It should upload automatically! ✅

---

## ✅ Checklist

- [ ] Got token from Vercel Dashboard
- [ ] Added `BLOB_READ_WRITE_TOKEN=...` to `.env.local`
- [ ] No spaces around the `=` sign
- [ ] Token is on a single line
- [ ] Restarted dev server
- [ ] Tested file upload

---

## 🆘 Still Not Working?

1. **Check the token format**: Should start with `vercel_blob_`
2. **No quotes**: Don't put quotes around the token
3. **File location**: `.env.local` must be in project root (same folder as `package.json`)
4. **Server restart**: You MUST restart after adding the token
5. **Check for typos**: Copy-paste the token to avoid errors

---

## 📞 Need Help?

- See `BLOB_TOKEN_SETUP.md` for detailed instructions
- Check Vercel docs: https://vercel.com/docs/storage/vercel-blob

