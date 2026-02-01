/**
 * Generate Shopify Product CSV from maps data
 *
 * This creates a CSV file that can be imported into Shopify
 * Each map becomes one product with 3 size variants
 */

const fs = require('fs');
const path = require('path');

// Read and parse maps.ts
const mapsFile = fs.readFileSync(path.join(__dirname, '../src/data/maps.ts'), 'utf8');

// Extract the array content between the brackets
const arrayMatch = mapsFile.match(/export const maps: MapImage\[\] = \[([\s\S]*)\];/);
if (!arrayMatch) {
  console.error('Could not parse maps.ts');
  process.exit(1);
}

// Parse the objects (this is a simplified parser)
const maps = [];
const objectRegex = /\{\s*id:\s*'([^']+)',\s*city:\s*'([^']+)',\s*state:\s*'([^']+)',\s*year:\s*(\d+),\s*type:\s*'([^']+)',\s*thumbnail:\s*'([^']+)',\s*medium:\s*'([^']+)',\s*full:\s*'([^']+)',\s*width:\s*(\d+),\s*height:\s*(\d+),\s*aspectRatio:\s*([\d.]+),?\s*\}/g;

let match;
while ((match = objectRegex.exec(mapsFile)) !== null) {
  maps.push({
    id: match[1],
    city: match[2],
    state: match[3],
    year: parseInt(match[4]),
    type: match[5],
    thumbnail: match[6],
    medium: match[7],
    full: match[8],
    width: parseInt(match[9]),
    height: parseInt(match[10]),
    aspectRatio: parseFloat(match[11])
  });
}

console.log(`Found ${maps.length} maps`);

// Pricing configuration
const variants = [
  { name: 'Small (10⅛ × 12")', price: '139.00', sku_suffix: 'small' },
  { name: 'Medium (15³⁄₁₆ × 18")', price: '299.00', sku_suffix: 'medium' },
  { name: 'Large (20⅜ × 24")', price: '465.00', sku_suffix: 'large' }
];

// CSV headers (standard Shopify format)
const headers = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Product Category',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Variant SKU',
  'Variant Grams',
  'Variant Inventory Tracker',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Compare At Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Image Src',
  'Image Position',
  'Image Alt Text',
  'Status'
];

// Helper to escape CSV values
function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// Generate CSV rows
const rows = [headers.join(',')];

for (const map of maps) {
  const title = `${map.city}, ${map.state} (${map.year})`;
  const handle = map.id;
  const description = `<p>A beautifully preserved Sanborn Fire Insurance Map from ${map.year}, showcasing the architectural layout and Victorian-era typography of ${map.city}, ${map.state}.</p><p>Each print is produced on archival-quality paper and custom framed with a Gallery Natural frame and single mat.</p>`;
  const tags = [map.state, map.city, map.year, map.type, 'Sanborn Map', 'Fire Insurance Map', 'Vintage Map'].join(', ');
  const imageAlt = `${map.city}, ${map.state} - ${map.year} Sanborn Fire Insurance Map`;

  // First row: product info + first variant + image
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    const row = [];

    if (i === 0) {
      // First variant row includes all product info
      row.push(escapeCSV(handle));                    // Handle
      row.push(escapeCSV(title));                     // Title
      row.push(escapeCSV(description));               // Body (HTML)
      row.push('Sanborn Fire Maps');                  // Vendor
      row.push('Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork'); // Product Category
      row.push('Framed Print');                       // Type
      row.push(escapeCSV(tags));                      // Tags
      row.push('true');                               // Published
    } else {
      // Additional variant rows - empty product fields
      row.push(escapeCSV(handle));                    // Handle (required to link variants)
      row.push('');                                   // Title
      row.push('');                                   // Body (HTML)
      row.push('');                                   // Vendor
      row.push('');                                   // Product Category
      row.push('');                                   // Type
      row.push('');                                   // Tags
      row.push('');                                   // Published
    }

    // Variant fields
    row.push('Size');                                 // Option1 Name
    row.push(escapeCSV(variant.name));               // Option1 Value
    row.push(escapeCSV(`${handle}-${variant.sku_suffix}`)); // Variant SKU
    row.push('0');                                    // Variant Grams
    row.push('');                                     // Variant Inventory Tracker (blank = don't track)
    row.push('deny');                                 // Variant Inventory Policy
    row.push('manual');                               // Variant Fulfillment Service
    row.push(variant.price);                          // Variant Price
    row.push('');                                     // Variant Compare At Price
    row.push('true');                                 // Variant Requires Shipping
    row.push('true');                                 // Variant Taxable

    // Image (only on first variant row)
    if (i === 0) {
      row.push(escapeCSV(map.medium));               // Image Src
      row.push('1');                                  // Image Position
      row.push(escapeCSV(imageAlt));                 // Image Alt Text
    } else {
      row.push('');                                   // Image Src
      row.push('');                                   // Image Position
      row.push('');                                   // Image Alt Text
    }

    row.push('active');                               // Status

    rows.push(row.join(','));
  }
}

// Write CSV file
const csvContent = rows.join('\n');
const outputPath = path.join(__dirname, '../shopify-products.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`Generated ${outputPath}`);
console.log(`Total rows: ${rows.length} (${maps.length} products × 3 variants + 1 header)`);
