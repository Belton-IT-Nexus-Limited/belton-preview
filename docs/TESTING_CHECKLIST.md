# Testing Checklist

## Manual Testing Checklist

### Cross-Region Testing
- [ ] Home page (NZ) - `/`
- [ ] Home page (AU) - `/au`
- [ ] Services page (NZ) - `/services`
- [ ] Services page (AU) - `/au/services`
- [ ] Contact page (NZ) - `/contact`
- [ ] Contact page (AU) - `/au/contact`

### Responsive Design Testing
- [ ] Mobile (320px - 640px)
  - [ ] Navigation menu works
  - [ ] All content is readable
  - [ ] Forms are usable
  - [ ] Images load correctly
  - [ ] Touch targets are adequate (min 44x44px)
- [ ] Tablet (641px - 1024px)
  - [ ] Layout adapts correctly
  - [ ] Navigation works
  - [ ] Forms are usable
- [ ] Desktop (1025px+)
  - [ ] Mega menu works
  - [ ] Hover states work
  - [ ] All interactions work

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Form Testing
- [ ] Contact form validation
- [ ] Required fields show errors
- [ ] Email format validation
- [ ] Phone format validation
- [ ] Form submission success state
- [ ] Form submission error handling
- [ ] Form accessibility (keyboard navigation)

### Navigation Testing
- [ ] Desktop navigation
  - [ ] Mega menu opens/closes
  - [ ] Dropdown menus work
  - [ ] All links navigate correctly
- [ ] Mobile navigation
  - [ ] Menu opens/closes
  - [ ] Submenus expand/collapse
  - [ ] Focus trap works
  - [ ] Escape key closes menu
- [ ] Skip to main content link
- [ ] Breadcrumbs (where applicable)

### Link Testing
- [ ] All internal links work
- [ ] All external links open in new tab
- [ ] Phone links work (`tel:`)
- [ ] Email links work (`mailto:`)
- [ ] No broken links (404s)

### Animation & Interaction Testing
- [ ] Hero orb animations
- [ ] Hover states on buttons
- [ ] Hover states on links
- [ ] Focus states visible
- [ ] Transitions are smooth
- [ ] Loading states work
- [ ] No layout shift during animations

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatibility
- [ ] ARIA labels present
- [ ] Alt text on images
- [ ] Form labels associated
- [ ] Color contrast meets WCAG AA
- [ ] Skip link works

### Performance Testing
- [ ] Page load time < 3s
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images lazy load
- [ ] Code splitting works
- [ ] Service worker works

### SEO Testing
- [ ] Meta tags present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URLs correct
- [ ] Hreflang tags present
- [ ] Structured data valid
- [ ] Sitemap accessible
- [ ] Robots.txt accessible

### Analytics Testing
- [ ] Google Analytics loads (with consent)
- [ ] Page views tracked
- [ ] Form submissions tracked
- [ ] Cookie consent works
- [ ] Consent persists

### Error Handling
- [ ] 404 page (if implemented)
- [ ] Network error handling
- [ ] Form error messages
- [ ] Graceful degradation

## Automated Testing

Run the following commands:

```bash
# Lint check
pnpm lint

# Type check
pnpm build

# SEO validation
pnpm test:seo

# Performance check
pnpm test:performance
```
