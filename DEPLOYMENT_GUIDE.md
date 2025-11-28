# Render Deployment Guide

## 🚀 Deploy to Render

### Prerequisites
- GitHub repository with the code
- Render account (free tier available)
- Supabase database already set up

### Step 1: Deploy Backend API

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `dental-clinic-api`
   - **Environment**: `Node`
   - **Plan**: `Free`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Instance Type**: `Eco`

5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `SUPABASE_URL`: `https://ukywqczdqlguxaacrhcr.supabase.co`
   - `SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreXdxY3pkcWxndXhhYWNyaGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDUyNDYsImV4cCI6MjA3OTkyMTI0Nn0.Wbf80pfDp01sqmBycX3Y7wfCRk8ief1jgGDavaMZrvw`

6. Click **"Create Web Service"**

### Step 2: Deploy Frontend

1. Click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `dental-clinic-frontend`
   - **Plan**: `Free`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   - `VITE_SUPABASE_URL`: `https://ukywqczdqlguxaacrhcr.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreXdxY3pkcWxndXhhYWNyaGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDUyNDYsImV4cCI6MjA3OTkyMTI0Nn0.Wbf80pfDp01sqmBycX3Y7wfCRk8ief1jgGDavaMZrvw`
   - `VITE_API_URL`: `https://dental-clinic-api.onrender.com` (replace with your actual API URL after deployment)

5. Click **"Create Static Site"**

### Step 3: Update Frontend API URL

After the API is deployed, you'll get a URL like `https://dental-clinic-api.onrender.com`

1. Go to your frontend service on Render
2. Click **"Environment"** tab
3. Update `VITE_API_URL` with your actual API URL
4. Click **"Save Changes"** to trigger a new deployment

### Step 4: Verify Deployment

1. Test your API: `https://dental-clinic-api.onrender.com/api/settings`
2. Test your frontend: `https://dental-clinic-frontend.onrender.com`
3. Try creating an appointment to ensure full functionality

## 📋 Important Notes

### Free Tier Limitations
- **API**: Sleeps after 15 minutes of inactivity (takes ~30 seconds to wake up)
- **Frontend**: Always available
- **Database**: Supabase free tier has generous limits

### Custom Domain (Optional)
1. Go to each service settings
2. Click **"Custom Domain"**
3. Add your domain and follow DNS instructions

### Environment Security
- The Supabase keys are exposed in frontend (public keys - this is safe)
- For production, consider implementing Row Level Security properly
- Consider using Supabase Auth for user authentication

## 🔧 Troubleshooting

### Common Issues

1. **API Not Responding**
   - Check if API is waking up (free tier limitation)
   - Verify environment variables
   - Check build logs

2. **CORS Issues**
   - Ensure frontend URL is added to CORS origins
   - Check if API proxy is working

3. **Database Connection**
   - Verify Supabase credentials
   - Check if SQL queries were executed
   - Ensure RLS policies are correct

### Monitoring
- Check Render logs for any errors
- Monitor Supabase dashboard for database activity
- Test all API endpoints manually

## 🎯 Success Criteria

- [ ] API deployed and accessible
- [ ] Frontend deployed and loading
- [ ] Appointments can be created
- [ ] Admin dashboard works
- [ ] All settings and services load correctly

Your dental clinic application is now live on Render! 🎉
