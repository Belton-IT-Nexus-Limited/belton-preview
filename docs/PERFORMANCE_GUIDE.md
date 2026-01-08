# Performance Testing Guide

## Core Web Vitals Targets

### Largest Contentful Paint (LCP)
- **Target**: < 2.5 seconds
- **Measurement**: Time until largest content element is rendered

### First Input Delay (FID)
- **Target**: < 100 milliseconds
- **Measurement**: Time from first user interaction to browser response

### Cumulative Layout Shift (CLS)
- **Target**: < 0.1
- **Measurement**: Visual stability of page during load

## Performance Testing Tools

### Lighthouse
Run Lighthouse audits in Chrome DevTools:

1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Click "Generate report"

**Target Scores:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 100

### WebPageTest
Test on real network conditions:
- Visit: https://www.webpagetest.org/
- Enter your URL
- Select test location and connection speed
- Review results

### Chrome DevTools Performance Tab
1. Open DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Interact with page
5. Stop recording
6. Analyze performance timeline

## Load Time Targets

- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Total Load Time**: < 3s (on 3G)

## Testing on Slow Connections

### Chrome DevTools Network Throttling
1. Open DevTools (F12)
2. Go to Network tab
3. Select throttling preset:
   - Slow 3G: 400 Kbps down, 400 Kbps up
   - Fast 3G: 1.6 Mbps down, 750 Kbps up
4. Reload page and test

### Testing Checklist
- [ ] Page loads within 3s on Slow 3G
- [ ] Images lazy load correctly
- [ ] Code splitting works
- [ ] Loading states are visible
- [ ] No layout shift during load
- [ ] Service worker caches correctly

## Bundle Size Targets

- **Initial Bundle**: < 200 KB (gzipped)
- **Total JavaScript**: < 500 KB (gzipped)
- **Total CSS**: < 50 KB (gzipped)
- **Individual Chunks**: < 300 KB (gzipped)

## Performance Optimization Checklist

- [ ] Code splitting implemented
- [ ] Images optimized (WebP format)
- [ ] Lazy loading for images
- [ ] Font preloading
- [ ] Service worker caching
- [ ] Minification enabled
- [ ] Tree shaking working
- [ ] Unused code removed
- [ ] Bundle analysis reviewed

## Monitoring

### Real User Monitoring (RUM)
Consider implementing:
- Google Analytics Core Web Vitals
- Custom performance metrics
- Error tracking

### Continuous Monitoring
- Run Lighthouse CI in CI/CD pipeline
- Monitor Core Web Vitals in production
- Set up alerts for performance regressions

## Performance Budget

| Resource Type | Budget |
|--------------|--------|
| HTML | < 50 KB |
| CSS | < 50 KB |
| JavaScript | < 200 KB (initial) |
| Images | < 500 KB per image |
| Total Page Weight | < 2 MB |

## Quick Performance Test

Run the automated performance test:

```bash
pnpm test:performance
```

This will check:
- Bundle sizes
- Image optimization
- Service worker presence
- Code splitting
