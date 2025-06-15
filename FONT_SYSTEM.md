# AEGIS MUN Font System

## Font Hierarchy

The AEGIS MUN website uses a consistent three-tier font system:

### 1. Primary Font - Inter (`font-sans`)
- **Usage**: Body text, paragraphs, general content, navigation
- **Fallbacks**: system-ui, -apple-system, sans-serif
- **Characteristics**: Clean, readable, modern sans-serif

### 2. Secondary Font - Playfair Display (`font-serif`)
- **Usage**: Headings (h1-h6), titles, important text
- **Fallbacks**: Georgia, serif
- **Characteristics**: Elegant, sophisticated serif with high contrast

### 3. Accent Font - Bebas Neue (`font-display`)
- **Usage**: Hero text, logos, special display elements
- **Fallbacks**: Impact, Arial Black, sans-serif
- **Characteristics**: Bold, condensed, attention-grabbing

## Utility Classes

### Pre-defined Combinations
- `.heading-primary` - font-serif + font-bold
- `.heading-secondary` - font-serif + font-semibold  
- `.text-body` - font-sans (default body text)
- `.text-accent` - font-display + font-normal

### Usage Guidelines

1. **All headings (h1-h6)** automatically use `font-serif` via global CSS
2. **Body text** uses `font-sans` by default
3. **Special display elements** should use `font-display`
4. **Consistent font weights**:
   - Light: 300
   - Regular: 400
   - Medium: 500
   - Semibold: 600
   - Bold: 700
   - Black: 900

## Implementation

The font system is configured in:
- `tailwind.config.js` - Font family definitions
- `src/index.css` - Global styles and utility classes
- `index.html` - Google Fonts imports

## Font Loading Optimization

- Fonts are preconnected to Google Fonts
- `display=swap` ensures text remains visible during font load
- Font smoothing is enabled for better rendering
- Font feature settings enable kerning and ligatures 