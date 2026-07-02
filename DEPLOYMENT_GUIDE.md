# Deployment Guide - Netlify & Supabase

This guide will help you deploy your portfolio website to Netlify and connect it to Supabase for dynamic content management.

## Prerequisites

- A Netlify account (free tier works)
- A Supabase account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in the project details:
   - **Name**: eric-uzoukwu-portfolio (or your preferred name)
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose the region closest to your target audience
5. Click "Create new project"
6. Wait for the project to be provisioned (2-3 minutes)

### 1.2 Run the Database Setup Script

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the contents of `supabase-setup-safe.sql` from your project
4. Paste it into the SQL Editor
5. Click "Run" to execute the script
6. Verify that all tables were created successfully

### 1.3 Get Your Supabase Credentials

1. In Supabase dashboard, go to **Project Settings** → **API**
2. Copy the following values:
   - **Project URL**: Looks like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: A long JWT token starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Save these credentials securely** - you'll need them for Netlify configuration.

### 1.4 Set Up Storage (Optional - for blog images)

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. Click "New bucket"
3. Name it: `blog-images`
4. Make it **Public**
5. Click "Create bucket"

## Step 2: Configure Netlify

### 2.1 Connect Your Repository to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in
3. Click "Add new site" → "Import an existing project"
4. Select your Git provider (GitHub, GitLab, or Bitbucket)
5. Choose your repository
6. Configure build settings:
   - **Build command**: `node build.js`
   - **Publish directory**: `.` (root directory)
   - **Node version**: `18`
7. Click "Deploy site"

### 2.2 Add Environment Variables

1. In your Netlify site dashboard, go to **Site settings** → **Environment variables**
2. Click "Add variable"
3. Add the following variables:

   | Variable Name | Value |
   |--------------|-------|
   | `SUPABASE_URL` | Your Supabase Project URL |
   | `SUPABASE_ANON_KEY` | Your Supabase anon public key |

4. Click "Save"

### 2.3 Trigger a New Deployment

1. Go to **Deploys** in Netlify
2. Click "Trigger deploy" → "Deploy site"
3. Wait for the deployment to complete
4. Your site should now be live!

## Step 3: Access Your Admin Dashboard

1. Visit your Netlify site URL
2. Navigate to `/dashboard` (e.g., `https://your-site.netlify.app/dashboard`)
3. Log in with the default credentials:
   - **Username**: `ericadmin`
   - **Password**: `EWF@2026#Blog`

**⚠️ IMPORTANT**: Change these credentials in the dashboard after your first login for security.

## Step 4: Configure Your Custom Domain (Optional)

1. In Netlify, go to **Domain settings**
2. Click "Add custom domain"
3. Enter your domain (e.g., `uzoukwuericikenna.com`)
4. Follow the DNS instructions provided by Netlify
5. Update your domain's DNS records

## Local Development

To test changes locally before deploying:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Run the build script to inject credentials:
   ```bash
   node build.js
   ```

4. Open `eric-uzoukwu-FINAL.html` in your browser to test

## Troubleshooting

### Supabase Connection Issues

If you see "Supabase not configured" banner:

1. Verify your environment variables are set in Netlify
2. Check that the build script ran successfully
3. Ensure your Supabase project is active (not paused)
4. Verify the anon key has the correct permissions

### Build Errors

If the build fails:

1. Ensure Node.js 18+ is available
2. Check that `build.js` exists in the root directory
3. Verify the HTML files exist and have the correct placeholders

### Dashboard Login Issues

If you can't log in to the dashboard:

1. Check that Supabase is properly configured
2. Verify the admin_users table was created
3. Try the hardcoded credentials: `ericadmin` / `EWF@2026#Blog`

## Maintenance

### Updating Content

Use the admin dashboard at `/dashboard` to:
- Create and edit blog posts
- Manage events
- Update testimonials
- Add speaking cards
- Manage case studies
- Update certifications

### Database Backups

Supabase automatically creates daily backups. You can also:
1. Go to **Database** → **Backups** in Supabase
2. Create manual backups before major changes
3. Restore from backups if needed

## Security Best Practices

1. **Never commit** your `.env` file to Git
2. **Rotate your Supabase keys** periodically
3. **Use strong passwords** for admin accounts
4. **Enable RLS policies** (already configured in the SQL script)
5. **Monitor your Supabase logs** for suspicious activity
6. **Keep your dependencies updated**

## Support

- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Supabase Dashboard**: [app.supabase.com](https://app.supabase.com)

## Next Steps

After deployment:

1. ✅ Test all functionality on your live site
2. ✅ Set up your custom domain
3. ✅ Configure SSL (automatic on Netlify)
4. ✅ Set up analytics (Netlify provides built-in analytics)
5. ✅ Add your initial content via the admin dashboard
6. ✅ Test the contact form to ensure submissions work
