# Content Migration Guide

This guide covers the process of migrating content from HTML files to React components with i18n translation files.

## Overview

The content migration process involves:
1. Auditing all content from HTML files
2. Extracting text content systematically
3. Organizing content by page and region
4. Populating translation JSON files
5. Validating completeness and consistency

## Content Structure

### Translation Namespaces

- `common` - Shared content (phone, email, addresses, etc.)
- `navigation` - Navigation items and menus
- `pages/home` - Home page content
- `pages/services` - Services page content
- `pages/contact` - Contact page content
- `pages/about` - About page content (to be created)
- `pages/how-we-work` - How we work page content (to be created)

### Region-Specific Content

**New Zealand (en-NZ):**
- Phone: 09 974 2379
- Address: Auckland-based
- Company registration details
- Legal text

**Australia (en-AU):**
- Phone: 02 8006 9191
- Address: Sydney-based
- Company registration details
- Legal text

## Migration Tools

### Content Audit

Audit all HTML files to identify content:

```bash
pnpm content:audit
```

This generates `docs/CONTENT_AUDIT.json` with:
- Total files analyzed
- Content items by type (text, heading, link, meta, button)
- Content by region (NZ, AU)
- Content by page

### Content Extraction

Extract content from specific pages:

```bash
pnpm content:extract
```

This generates `docs/CONTENT_MAPPING.json` with:
- Page-by-page content mapping
- Suggested translation keys
- Region identification
- Content structure

### Translation Validation

Validate translation files for completeness:

```bash
pnpm content:validate
```

This checks:
- All namespaces exist in both regions
- All keys are present in both regions
- No empty values
- Consistent structure

## Migration Process

### Step 1: Audit Content

Run the content audit to understand the scope:

```bash
pnpm content:audit
```

Review `docs/CONTENT_AUDIT.json` to see:
- Which pages have the most content
- What types of content exist
- Regional differences

### Step 2: Extract Content

Extract content from HTML files:

```bash
pnpm content:extract
```

Review `docs/CONTENT_MAPPING.json` to see:
- Suggested translation keys
- Content organization
- Missing content

### Step 3: Organize Content

1. Review extracted content
2. Identify reusable content (move to `common.json`)
3. Organize page-specific content
4. Create translation keys following naming conventions

### Step 4: Populate Translation Files

1. Add content to appropriate translation files
2. Ensure both NZ and AU versions are complete
3. Maintain consistent structure
4. Preserve formatting (line breaks, special characters)

### Step 5: Validate

Run validation to check completeness:

```bash
pnpm content:validate
```

Fix any errors or warnings.

### Step 6: Review

- Review for typos
- Check special characters render correctly
- Verify formatting is preserved
- Test in both regions

## Content Guidelines

### Translation Keys

Use descriptive, hierarchical keys:

```json
{
  "hero": {
    "title": "...",
    "subtitle": "..."
  },
  "sections": {
    "intro": {
      "title": "...",
      "description": "..."
    }
  }
}
```

### Special Characters

- Preserve apostrophes and quotes
- Use proper typography (em dashes, en dashes)
- Preserve line breaks where needed
- Escape special characters in JSON

### Formatting

- Preserve HTML formatting where needed
- Use markdown-style formatting in translations
- Keep paragraphs separate
- Maintain heading hierarchy

### Regional Differences

Document regional differences:
- Phone numbers
- Addresses
- Legal text
- Company information
- Cultural references

## Content Checklist

### Pages to Migrate

- [x] Home page (NZ and AU)
- [x] Services page (NZ and AU)
- [x] Contact page (NZ and AU)
- [ ] About page
- [ ] How We Work page
- [ ] Individual service pages
- [ ] Resource pages
- [ ] Legal pages

### Content Types

- [x] Headings (h1-h6)
- [x] Paragraphs
- [x] Links
- [x] Meta tags (title, description)
- [x] Buttons
- [ ] Form labels
- [ ] Error messages
- [ ] Success messages

## Validation Checklist

- [ ] All translation files exist for both regions
- [ ] All keys present in both regions
- [ ] No empty values
- [ ] Consistent structure
- [ ] Special characters render correctly
- [ ] Formatting preserved
- [ ] No typos
- [ ] Regional differences correct

## Troubleshooting

### Missing Translations

If validation shows missing keys:
1. Check if content exists in HTML
2. Add to appropriate translation file
3. Ensure both regions have the key

### Empty Values

If validation shows empty values:
1. Check if content was extracted
2. Verify content in HTML file
3. Add placeholder if content is intentionally empty

### Structure Mismatches

If validation shows structure mismatches:
1. Ensure both regions have same keys
2. Check for typos in key names
3. Verify JSON syntax

## Next Steps

After content migration:
1. Test all pages in both regions
2. Verify all content displays correctly
3. Check for missing translations
4. Review for consistency
5. Get content reviewed by stakeholders
