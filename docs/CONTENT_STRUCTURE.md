# Content Structure Documentation

This document outlines the content structure and organization for the Belton IT Nexus website.

## Translation Namespaces

### Common (`common.json`)
Shared content used across all pages:
- Company information (name, tagline)
- Contact details (phone, email, address)
- Common UI elements (buttons, links)
- Legal text (copyright, acknowledgement)
- Portal URLs

### Navigation (`navigation.json`)
Navigation menu items:
- Main menu items
- Mega menu categories
- Service items
- Client items
- Resource items

### Pages

#### Home (`pages/home.json`)
**New Zealand:**
- Hero section
- Who we help section
- What we do section
- How we work preview
- Trust section
- CTA section

**Australia:**
- Hero section
- Stats bar
- Services section
- Approach section
- Testimonial section
- Beyond section
- CTA section

#### Services (`pages/services.json`)
- Page title and subtitle
- Introduction text
- Option blocks (Complete IT, Projects)
- Service categories
- CTA section

#### Contact (`pages/contact.json`)
- Page title and subtitle
- Introduction text
- Contact methods (phone, email, address, hours)
- Form fields and labels
- Success/error messages

## Content Types

### Region-Specific Content

**New Zealand (en-NZ):**
- Phone: 09 974 2379
- Address: Auckland-based
- Company registration: NZ-specific
- Legal text: NZ-specific
- Content focus: NZ market

**Australia (en-AU):**
- Phone: 02 8006 9191
- Address: Sydney-based
- Company registration: AU-specific
- Legal text: AU-specific
- Content focus: AU market

### Shared Content

Some content is shared between regions:
- Service names
- Navigation items
- Common UI text
- Technical terminology

## Content Organization

### Hierarchical Structure

Translation keys follow a hierarchical structure:

```json
{
  "section": {
    "subsection": {
      "item": "value"
    }
  }
}
```

### Naming Conventions

- Use camelCase for keys
- Use descriptive names
- Group related content
- Maintain consistency

### Special Characters

- Preserve apostrophes and quotes
- Use proper typography
- Escape special characters in JSON
- Preserve line breaks where needed

## Content Migration Status

### Completed
- [x] Home page (NZ and AU)
- [x] Services page (NZ and AU)
- [x] Contact page (NZ and AU)
- [x] Common content
- [x] Navigation content

### Pending
- [ ] About page
- [ ] How We Work page
- [ ] Individual service pages
- [ ] Resource pages
- [ ] Legal pages
- [ ] FAQ page

## Content Validation

Run validation to check completeness:

```bash
pnpm content:validate
```

This checks:
- All keys present in both regions
- No missing translations
- Consistent structure
- Empty values (warnings for region-specific content)

## Content Review Checklist

- [ ] All content extracted from HTML
- [ ] Translation keys follow naming conventions
- [ ] Both regions have all keys (empty allowed for region-specific)
- [ ] Special characters render correctly
- [ ] Formatting preserved
- [ ] No typos
- [ ] Regional differences correct
- [ ] Content reviewed by stakeholders
