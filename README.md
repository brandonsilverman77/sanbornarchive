# Sanborn Fire Maps Archive

A digital archive of the beautiful typography from the Sanborn Fire Insurance Maps.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and design tokens
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Homepage
├── components/
│   ├── Navigation.tsx   # Top navigation bar
│   ├── Hero.tsx         # Hero section with featured image
│   ├── ImageCard.tsx    # Individual map card
│   ├── ImageGrid.tsx    # Grid view with filtering
│   ├── MapModal.tsx     # Detail view with print options
│   ├── About.tsx        # About section
│   └── Footer.tsx       # Footer
├── data/
│   └── maps.ts          # Sample map data and options
└── lib/
    └── types.ts         # TypeScript type definitions
```

## Design Tokens

The design system uses CSS custom properties defined in `globals.css`:

- **Colors**: Warm cream/parchment palette with ink-brown text
- **Fonts**: Playfair Display (display), Source Serif 4 (body)
- **Spacing**: Based on 4px grid

## Next Steps

### 1. Image Pipeline
Process your JP2 files from Google Drive:
- Generate thumbnails (400px), medium (1200px), and full-res versions
- Extract metadata from filenames
- Upload to CDN (Cloudflare R2 recommended)
- Generate data file

### 2. Print Fulfillment Integration
- Set up account with theprintspace or Vivia Print
- Implement API integration for order submission
- Add Stripe for payments

### 3. Additional Pages
- `/about` - Full about page
- `/prints` - How prints work, FAQ
- `/map/[id]` - Individual map pages for SEO

## Deployment

This project is ready to deploy on Vercel:

```bash
npm install -g vercel
vercel
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Google Fonts (Playfair Display, Source Serif 4)

## License

The map images are in the public domain (pre-1923).
Site code is MIT licensed.
