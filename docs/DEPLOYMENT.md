# Deployment Guide

This guide covers deployment preparation and configuration for the Belton IT Nexus website.

## Environment Variables

### Setup

1. Copy `.env.example` to `.env.local` for local development
2. Set environment variables in your deployment platform

### Required Variables

```bash
VITE_APP_ENV=production
VITE_GA_MEASUREMENT_ID=G-WLYH298P2J
VITE_WEB3FORMS_ACCESS_KEY=your-access-key
VITE_WEB3FORMS_API_URL=https://api.web3forms.com/submit
VITE_SITE_URL_NZ=https://www.belton.co.nz
VITE_SITE_URL_AU=https://belton.com.au
```

### Environment-Specific Values

**Development:**
- `VITE_APP_ENV=development`
- `VITE_SITE_URL_NZ=http://localhost:3000`
- `VITE_SITE_URL_AU=http://localhost:3000`

**Production:**
- `VITE_APP_ENV=production`
- `VITE_SITE_URL_NZ=https://www.belton.co.nz`
- `VITE_SITE_URL_AU=https://belton.com.au`

## Build Configuration

### Production Build

```bash
pnpm build
```

This will:
- Generate sitemap
- Type check
- Build optimized production bundle
- Generate source maps (hidden, for debugging)
- Minify and compress code
- Remove console logs

### Build Output

- `dist/` - Production build output
- `dist/index.html` - Entry HTML file
- `dist/assets/` - Optimized JS, CSS, and assets
- `dist/images/` - Optimized images
- `dist/sw.js` - Service worker
- `dist/manifest.webmanifest` - PWA manifest

## URL Redirects

### Generate Redirects

```bash
# For Cloudflare Pages (default)
pnpm generate-redirects

# For Netlify
REDIRECT_PLATFORM=netlify pnpm generate-redirects

# For Vercel
REDIRECT_PLATFORM=vercel pnpm generate-redirects
```

This generates:
- `public/_redirects` - Cloudflare/Netlify redirects
- `vercel.json` - Vercel configuration (if using Vercel)
- `docs/REDIRECT_MAPPING.json` - Complete redirect mapping

### Redirect Strategy

All old HTML files redirect to new React routes:
- `index.html` → `/`
- `services.html` → `/services`
- `contact.html` → `/contact`
- `au/index.html` → `/au`
- etc.

## Security Headers

Security headers are configured in:
- `_headers` - Cloudflare Pages
- `netlify.toml` - Netlify
- `vercel.json` - Vercel

### Headers Included

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
- Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
- Content-Security-Policy: (configured for required domains)

## Deployment Platforms

### Cloudflare Pages

1. **Connect Repository**
   - Go to Cloudflare Dashboard → Pages
   - Connect your Git repository

2. **Build Settings**
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Root directory: `/`

3. **Environment Variables**
   - Add all `VITE_*` variables in Cloudflare dashboard

4. **Custom Domains**
   - Add `www.belton.co.nz` and `belton.com.au`
   - Configure DNS records

5. **Headers**
   - `_headers` file is automatically used
   - Or configure in Cloudflare dashboard

### Vercel

1. **Connect Repository**
   - Import project in Vercel dashboard
   - Connect Git repository

2. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

3. **Environment Variables**
   - Add all `VITE_*` variables in Vercel dashboard

4. **Custom Domains**
   - Add domains in project settings
   - Configure DNS

5. **Configuration**
   - `vercel.json` is automatically used

### Netlify

1. **Connect Repository**
   - Import project in Netlify dashboard
   - Connect Git repository

2. **Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Base directory: `/`

3. **Environment Variables**
   - Add all `VITE_*` variables in Netlify dashboard

4. **Custom Domains**
   - Add domains in domain settings
   - Configure DNS

5. **Configuration**
   - `netlify.toml` is automatically used

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Build succeeds locally (`pnpm build`)
- [ ] All tests pass (`pnpm test:all`)
- [ ] Redirects generated (`pnpm generate-redirects`)
- [ ] Sitemap generated (`pnpm generate-sitemap`)
- [ ] Security headers configured
- [ ] Custom domains configured
- [ ] DNS records updated
- [ ] SSL certificates active
- [ ] Analytics configured
- [ ] Form submissions tested

## Post-Deployment Verification

- [ ] Home page loads (NZ and AU)
- [ ] All routes work
- [ ] Redirects work (old URLs → new routes)
- [ ] Forms submit successfully
- [ ] Analytics tracking works
- [ ] Images load correctly
- [ ] Service worker registers
- [ ] Security headers present
- [ ] HTTPS enforced
- [ ] Performance scores acceptable

## Troubleshooting

### Build Fails

1. Check environment variables are set
2. Verify Node version (20+)
3. Clear cache: `rm -rf node_modules dist`
4. Reinstall: `pnpm install`

### Redirects Not Working

1. Regenerate redirects: `pnpm generate-redirects`
2. Verify redirect file is in `public/` or root
3. Check platform-specific configuration

### Environment Variables Not Loading

1. Ensure variables start with `VITE_`
2. Restart dev server after adding variables
3. Check deployment platform environment settings

### Security Headers Missing

1. Verify `_headers` file is in `public/`
2. Check platform-specific configuration file
3. Verify headers in browser DevTools

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
