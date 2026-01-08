# Testing & Quality Assurance

This document provides an overview of the testing and quality assurance tools and processes for the Belton IT Nexus website.

## Quick Start

Run all tests:

```bash
pnpm test:all
```

This will run:
1. Linting (`pnpm lint`)
2. Type checking (`pnpm build`)
3. SEO validation (`pnpm test:seo`)
4. Performance checks (`pnpm test:performance`)
5. Link validation (`pnpm test:links`)

## Available Test Commands

### Individual Tests

```bash
# SEO validation
pnpm test:seo

# Performance checks (requires build)
pnpm test:performance

# Link validation
pnpm test:links

# Linting
pnpm lint

# Type checking
pnpm build
```

## Test Scripts

### SEO Validation (`scripts/test-seo.ts`)

Validates:
- ✅ Sitemap.xml exists and is valid
- ✅ Robots.txt exists and is configured
- ✅ Structured data components present
- ✅ SEO components present in pages

**Usage:**
```bash
pnpm test:seo
```

### Performance Testing (`scripts/test-performance.ts`)

Checks:
- ✅ Bundle sizes within limits
- ✅ Image optimization
- ✅ Service worker presence
- ✅ Code splitting

**Usage:**
```bash
pnpm test:performance
```

**Note:** This command builds the project first, so it may take a minute.

### Link Validation (`scripts/validate-links.ts`)

Validates:
- ✅ Internal links match defined routes
- ✅ No broken internal links
- ✅ External links properly formatted

**Usage:**
```bash
pnpm test:links
```

## Manual Testing

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for a comprehensive manual testing checklist.

### Key Areas to Test

1. **Cross-Region Testing**
   - Test all pages in both NZ and AU regions
   - Verify region-specific content displays correctly

2. **Responsive Design**
   - Test on mobile (320px - 640px)
   - Test on tablet (641px - 1024px)
   - Test on desktop (1025px+)

3. **Browser Compatibility**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)
   - Mobile browsers

4. **Forms**
   - Contact form validation
   - Error handling
   - Success states

5. **Navigation**
   - Desktop mega menu
   - Mobile navigation
   - Keyboard navigation
   - Focus management

## Performance Testing

See [PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md) for detailed performance testing instructions.

### Core Web Vitals Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Tools

- Lighthouse (Chrome DevTools)
- WebPageTest
- Chrome DevTools Performance Tab

## Browser Compatibility

See [BROWSER_COMPATIBILITY.md](./BROWSER_COMPATIBILITY.md) for browser support matrix.

### Supported Browsers

- Chrome: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Edge: Latest 2 versions
- Safari iOS: Latest 2 versions
- Chrome Android: Latest 2 versions

## Continuous Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: |
    pnpm install
    pnpm test:all
```

## Troubleshooting

### Tests Fail

1. **SEO Test Fails:**
   - Ensure `public/sitemap.xml` exists
   - Ensure `public/robots.txt` exists
   - Check that pages include SEO components

2. **Performance Test Fails:**
   - Run `pnpm build` first
   - Check bundle sizes in `dist/assets/`
   - Review image optimization

3. **Link Test Fails:**
   - Verify all routes are defined in `src/app/routes.tsx`
   - Check for typos in link paths
   - Ensure external links use `http://` or `https://`

### Build Issues

If tests fail during build:

```bash
# Clean and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

## Best Practices

1. **Run tests before committing:**
   ```bash
   pnpm test:all
   ```

2. **Test manually in browsers:**
   - Don't rely solely on automated tests
   - Test on real devices
   - Test with different network conditions

3. **Monitor performance:**
   - Run Lighthouse audits regularly
   - Monitor Core Web Vitals in production
   - Set up performance budgets

4. **Keep documentation updated:**
   - Update test checklists as features are added
   - Document known issues
   - Update browser compatibility matrix

## Additional Resources

- [Testing Checklist](./TESTING_CHECKLIST.md)
- [Performance Guide](./PERFORMANCE_GUIDE.md)
- [Browser Compatibility](./BROWSER_COMPATIBILITY.md)
