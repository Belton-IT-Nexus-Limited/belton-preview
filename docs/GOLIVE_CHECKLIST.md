# Go-Live Checklist

This comprehensive checklist ensures the website is ready for production launch.

## Pre-Launch Checklist

### Code Quality
- [ ] All TypeScript errors resolved (`pnpm build`)
- [ ] All ESLint warnings resolved (`pnpm lint`)
- [ ] No console.log statements in production code
- [ ] No commented-out code
- [ ] All imports are used
- [ ] Code follows project conventions

### Pages & Routes
- [ ] Home page (NZ) - `/` - Migrated and tested
- [ ] Home page (AU) - `/au` - Migrated and tested
- [ ] Services page (NZ) - `/services` - Migrated and tested
- [ ] Services page (AU) - `/au/services` - Migrated and tested
- [ ] Contact page (NZ) - `/contact` - Migrated and tested
- [ ] Contact page (AU) - `/au/contact` - Migrated and tested
- [ ] All routes defined in `src/app/routes.tsx`
- [ ] No 404 errors on valid routes
- [ ] Region detection works correctly

### Forms
- [ ] Contact form validation works
- [ ] Required fields show errors
- [ ] Email format validation
- [ ] Phone format validation
- [ ] Form submission works (Web3Forms)
- [ ] Success state displays correctly
- [ ] Error handling works
- [ ] Form accessibility (keyboard navigation, labels)
- [ ] Analytics tracking on form submission

### Links
- [ ] All internal links work
- [ ] All external links open in new tab
- [ ] Phone links work (`tel:`)
- [ ] Email links work (`mailto:`)
- [ ] No broken links (404s)
- [ ] Navigation links work
- [ ] Footer links work
- [ ] CTA buttons work

### SEO & Metadata
- [ ] Meta tags present on all pages
- [ ] Title tags unique and descriptive
- [ ] Description tags unique and descriptive
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URLs correct
- [ ] Hreflang tags present (NZ/AU)
- [ ] Structured data (JSON-LD) valid
- [ ] Sitemap.xml generated and accessible
- [ ] Robots.txt configured correctly
- [ ] All pages have proper heading hierarchy

### Analytics & Tracking
- [ ] Google Analytics configured
- [ ] GA Measurement ID correct
- [ ] Page views tracked on route changes
- [ ] Form submissions tracked
- [ ] Outbound links tracked
- [ ] Cookie consent banner works
- [ ] Consent persists in localStorage
- [ ] Analytics only loads with consent

### Performance
- [ ] Production build succeeds
- [ ] Bundle sizes within limits (< 1MB per chunk)
- [ ] Images optimized (WebP format)
- [ ] Images lazy loaded
- [ ] Code splitting works
- [ ] Service worker registered
- [ ] Fonts load efficiently
- [ ] No render-blocking resources
- [ ] Core Web Vitals targets met:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

### Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels present where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Alt text on all images
- [ ] Form labels associated
- [ ] Color contrast meets WCAG AA
- [ ] Skip link works
- [ ] Focus trap in modals/menus

### Mobile Responsive
- [ ] Mobile navigation works
- [ ] All content readable on mobile
- [ ] Forms usable on mobile
- [ ] Touch targets adequate (min 44x44px)
- [ ] Images responsive
- [ ] Layout adapts correctly
- [ ] No horizontal scrolling
- [ ] Text size readable

### Cross-Browser Testing
- [ ] Chrome (latest) - All features work
- [ ] Firefox (latest) - All features work
- [ ] Safari (latest) - All features work
- [ ] Edge (latest) - All features work
- [ ] Mobile Safari (iOS) - All features work
- [ ] Chrome Mobile (Android) - All features work

### Redirects
- [ ] Redirects generated (`pnpm generate-redirects`)
- [ ] Old HTML files redirect to new routes
- [ ] 301 redirects configured
- [ ] Both NZ and AU redirects work
- [ ] Redirect file in `public/_redirects`
- [ ] Platform-specific redirects configured (Cloudflare/Vercel/Netlify)

### Security Headers
- [ ] Security headers configured
- [ ] `_headers` file present (Cloudflare)
- [ ] `netlify.toml` configured (Netlify)
- [ ] `vercel.json` configured (Vercel)
- [ ] CSP headers set
- [ ] HSTS headers set
- [ ] X-Frame-Options set
- [ ] X-Content-Type-Options set

### Content & Translations
- [ ] All content migrated
- [ ] Translation files complete
- [ ] Both NZ and AU translations present
- [ ] No missing translation keys
- [ ] Content validated (`pnpm content:validate`)
- [ ] Special characters render correctly
- [ ] Formatting preserved

### Environment Configuration
- [ ] Environment variables configured
- [ ] `.env.example` updated
- [ ] Production environment variables set
- [ ] GA Measurement ID set
- [ ] Web3Forms access key set
- [ ] Site URLs configured (NZ and AU)

## Launch Checklist

### Deployment
- [ ] Deploy to production platform
- [ ] Build succeeds in production
- [ ] All environment variables set
- [ ] Custom domains configured
- [ ] DNS records updated
- [ ] SSL certificates active
- [ ] HTTPS enforced

### Post-Deployment Verification
- [ ] Production site loads
- [ ] Home page (NZ) accessible
- [ ] Home page (AU) accessible
- [ ] All routes work
- [ ] Forms submit successfully
- [ ] Analytics tracking works
- [ ] Images load correctly
- [ ] Service worker registers
- [ ] Security headers present
- [ ] Redirects work (old URLs → new routes)
- [ ] Performance acceptable

### Monitoring
- [ ] Error logging configured
- [ ] Analytics dashboard accessible
- [ ] Monitor error logs
- [ ] Check analytics data
- [ ] Monitor performance metrics
- [ ] Set up alerts (if available)

## Post-Launch Checklist

### Immediate (First 24 Hours)
- [ ] Monitor error logs
- [ ] Check analytics data
- [ ] Verify all pages accessible
- [ ] Test forms in production
- [ ] Verify redirects work
- [ ] Check performance metrics
- [ ] Monitor for 404 errors
- [ ] Check for console errors

### Short-term (First Week)
- [ ] Gather user feedback
- [ ] Fix any critical issues
- [ ] Monitor analytics trends
- [ ] Check search engine indexing
- [ ] Verify SEO rankings
- [ ] Review performance data
- [ ] Update documentation

### Ongoing
- [ ] Regular performance monitoring
- [ ] Analytics review
- [ ] Security updates
- [ ] Content updates
- [ ] Feature enhancements
- [ ] Bug fixes

## Automated Validation

Run the automated pre-launch validation:

```bash
pnpm golive:check
```

This runs:
- Linting
- Type checking
- Build verification
- SEO validation
- Performance checks
- Link validation
- Translation validation
- Content validation

## Manual Testing

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for detailed manual testing procedures.

## Troubleshooting

### Build Fails
1. Check TypeScript errors
2. Check ESLint warnings
3. Verify environment variables
4. Clear cache and rebuild

### Forms Don't Work
1. Verify Web3Forms access key
2. Check network requests in DevTools
3. Verify form validation
4. Check error handling

### Analytics Not Tracking
1. Verify GA Measurement ID
2. Check cookie consent
3. Verify consent in localStorage
4. Check network requests

### Redirects Not Working
1. Regenerate redirects: `pnpm generate-redirects`
2. Verify redirect file location
3. Check platform-specific configuration
4. Verify redirect syntax

### Performance Issues
1. Run bundle analysis: `pnpm analyze`
2. Check image optimization
3. Verify code splitting
4. Review Core Web Vitals

## Sign-Off

Before going live, ensure:

- [ ] All automated checks pass
- [ ] All manual tests completed
- [ ] Stakeholder approval received
- [ ] Rollback plan documented
- [ ] Support team notified
- [ ] Monitoring configured

**Ready for Launch:** ☐ Yes ☐ No

**Signed off by:** _________________ Date: ___________
