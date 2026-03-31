// --- Size tiers (based on longest edge in inches) ---

export const PRINT_SIZE_TIERS = [
  { id: 'small', name: 'Small', longestEdge: 12, price: 139 },
  { id: 'medium', name: 'Medium', longestEdge: 18, price: 299 },
  { id: 'large', name: 'Large', longestEdge: 24, price: 465 },
] as const;

export type PrintSizeId = (typeof PRINT_SIZE_TIERS)[number]['id'];

// --- Fraction display helper ---

function toFractionDisplay(value: number): string {
  const whole = Math.floor(value);
  const frac = value - whole;

  const fractionMap: Record<number, string> = {
    0: '',
    0.125: '⅛',
    0.25: '¼',
    0.375: '⅜',
    0.5: '½',
    0.625: '⅝',
    0.75: '¾',
    0.875: '⅞',
  };

  // Round to nearest 1/8
  let eighth = Math.round(frac * 8) / 8;
  let w = whole;
  if (eighth >= 1) {
    w += 1;
    eighth = 0;
  }

  const fracStr = fractionMap[eighth] ?? '';
  if (w === 0 && fracStr) return fracStr;
  return `${w}${fracStr}`;
}

/**
 * Calculate print dimensions for a given aspect ratio and size tier.
 * Maps are portrait (height > width), so longestEdge = height.
 */
export function getPrintDimensions(
  aspectRatio: number,
  longestEdge: number
): string {
  const width = longestEdge * aspectRatio;
  return `${toFractionDisplay(width)} × ${toFractionDisplay(longestEdge)}"`;
}

/**
 * Get size options with dimensions calculated for a specific map's aspect ratio.
 */
export function getPrintSizes(aspectRatio: number) {
  return PRINT_SIZE_TIERS.map((tier) => ({
    id: tier.id,
    name: tier.name,
    description: getPrintDimensions(aspectRatio, tier.longestEdge),
    price: tier.price,
  }));
}

// --- Shopify product/variant mapping ---

export const SHOPIFY_PRODUCT_MAP: Record<
  string,
  {
    productId: string;
    variants: Record<PrintSizeId, string>;
  }
> = {
  'seattle-washington-1893': {
    productId: 'gid://shopify/Product/9802247897377',
    variants: {
      small: 'gid://shopify/ProductVariant/52283485520161',
      medium: 'gid://shopify/ProductVariant/52283485552929',
      large: 'gid://shopify/ProductVariant/52283485585697',
    },
  },
  'san-francisco-california-1886': {
    productId: 'gid://shopify/Product/10241684013345',
    variants: {
      small: 'gid://shopify/ProductVariant/52283485225249',
      medium: 'gid://shopify/ProductVariant/52283485258017',
      large: 'gid://shopify/ProductVariant/52283485290785',
    },
  },
  'atlanta-georgia-1886': {
    productId: 'gid://shopify/Product/10241695711521',
    variants: {
      small: 'gid://shopify/ProductVariant/52283485421857',
      medium: 'gid://shopify/ProductVariant/52283485454625',
      large: 'gid://shopify/ProductVariant/52283485487393',
    },
  },
  'new-orleans-louisiana-1885': {
    productId: 'gid://shopify/Product/10241721958689',
    variants: {
      small: 'gid://shopify/ProductVariant/52283485618465',
      medium: 'gid://shopify/ProductVariant/52283485651233',
      large: 'gid://shopify/ProductVariant/52283485684001',
    },
  },
  'new-york-new-york-1911': {
    productId: 'gid://shopify/Product/10300758032673',
    variants: {
      small: 'gid://shopify/ProductVariant/52496472998177',
      medium: 'gid://shopify/ProductVariant/52496473030945',
      large: 'gid://shopify/ProductVariant/52496473063713',
    },
  },
  'chicago-illinois-1913': {
    productId: 'gid://shopify/Product/10300758065441',
    variants: {
      small: 'gid://shopify/ProductVariant/52496473096481',
      medium: 'gid://shopify/ProductVariant/52496473129249',
      large: 'gid://shopify/ProductVariant/52496473162017',
    },
  },
  'new-orleans-louisiana-1908': {
    productId: 'gid://shopify/Product/10300758098209',
    variants: {
      small: 'gid://shopify/ProductVariant/52496473227553',
      medium: 'gid://shopify/ProductVariant/52496473260321',
      large: 'gid://shopify/ProductVariant/52496473293089',
    },
  },
  'dallas-texas-1899': {
    productId: 'gid://shopify/Product/10300758130977',
    variants: {
      small: 'gid://shopify/ProductVariant/52496473325857',
      medium: 'gid://shopify/ProductVariant/52496473358625',
      large: 'gid://shopify/ProductVariant/52496473391393',
    },
  },
  'portland-oregon-1901': {
    productId: 'gid://shopify/Product/10300758163745',
    variants: {
      small: 'gid://shopify/ProductVariant/52496473424161',
      medium: 'gid://shopify/ProductVariant/52496473456929',
      large: 'gid://shopify/ProductVariant/52496473489697',
    },
  },
  'jacksonville-florida-1913': {
    productId: 'gid://shopify/Product/10303360958753',
    variants: {
      small: 'gid://shopify/ProductVariant/52521946448161',
      medium: 'gid://shopify/ProductVariant/52521946480929',
      large: 'gid://shopify/ProductVariant/52521946513697',
    },
  },
  'miami-florida-1921': {
    productId: 'gid://shopify/Product/10303360991521',
    variants: {
      small: 'gid://shopify/ProductVariant/52521946546465',
      medium: 'gid://shopify/ProductVariant/52521946579233',
      large: 'gid://shopify/ProductVariant/52521946612001',
    },
  },
  'tampa-florida-1915': {
    productId: 'gid://shopify/Product/10303361024289',
    variants: {
      small: 'gid://shopify/ProductVariant/52521946644769',
      medium: 'gid://shopify/ProductVariant/52521946677537',
      large: 'gid://shopify/ProductVariant/52521946710305',
    },
  },
  'atlanta-georgia-1899': {
    productId: 'gid://shopify/Product/10303361057057',
    variants: {
      small: 'gid://shopify/ProductVariant/52521946743073',
      medium: 'gid://shopify/ProductVariant/52521946775841',
      large: 'gid://shopify/ProductVariant/52521946808609',
    },
  },
  'hartford-connecticut-1922': {
    productId: 'gid://shopify/Product/10303361089825',
    variants: {
      small: 'gid://shopify/ProductVariant/52521946841377',
      medium: 'gid://shopify/ProductVariant/52521946874145',
      large: 'gid://shopify/ProductVariant/52521946906913',
    },
  },
  'indianapolis-indiana-1898': {
    productId: 'gid://shopify/Product/10303361122593',
    variants: {
      small: 'gid://shopify/ProductVariant/52521946939681',
      medium: 'gid://shopify/ProductVariant/52521946972449',
      large: 'gid://shopify/ProductVariant/52521947005217',
    },
  },
  'fort-wayne-indiana-1902': {
    productId: 'gid://shopify/Product/10303361155361',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947037985',
      medium: 'gid://shopify/ProductVariant/52521947070753',
      large: 'gid://shopify/ProductVariant/52521947103521',
    },
  },
  'des-moines-iowa-1901': {
    productId: 'gid://shopify/Product/10303361188129',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947136289',
      medium: 'gid://shopify/ProductVariant/52521947169057',
      large: 'gid://shopify/ProductVariant/52521947201825',
    },
  },
  'wichita-kansas-1914': {
    productId: 'gid://shopify/Product/10303361220897',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947234593',
      medium: 'gid://shopify/ProductVariant/52521947267361',
      large: 'gid://shopify/ProductVariant/52521947300129',
    },
  },
  'louisville-kentucky-1892': {
    productId: 'gid://shopify/Product/10303361253665',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947332897',
      medium: 'gid://shopify/ProductVariant/52521947365665',
      large: 'gid://shopify/ProductVariant/52521947398433',
    },
  },
  'new-orleans-louisiana-1896': {
    productId: 'gid://shopify/Product/10303361286433',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947431201',
      medium: 'gid://shopify/ProductVariant/52521947463969',
      large: 'gid://shopify/ProductVariant/52521947496737',
    },
  },
  'portland-maine-1896': {
    productId: 'gid://shopify/Product/10303361319201',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947529505',
      medium: 'gid://shopify/ProductVariant/52521947562273',
      large: 'gid://shopify/ProductVariant/52521947595041',
    },
  },
  'baltimore-maryland-1901': {
    productId: 'gid://shopify/Product/10303361351969',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947627809',
      medium: 'gid://shopify/ProductVariant/52521947660577',
      large: 'gid://shopify/ProductVariant/52521947693345',
    },
  },
  'grand-rapids-michigan-1895': {
    productId: 'gid://shopify/Product/10303361384737',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947726113',
      medium: 'gid://shopify/ProductVariant/52521947758881',
      large: 'gid://shopify/ProductVariant/52521947791649',
    },
  },
  'saint-paul-minnesota-1903': {
    productId: 'gid://shopify/Product/10303361417505',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947824417',
      medium: 'gid://shopify/ProductVariant/52521947857185',
      large: 'gid://shopify/ProductVariant/52521947889953',
    },
  },
  'butte-montana-1900': {
    productId: 'gid://shopify/Product/10303361450273',
    variants: {
      small: 'gid://shopify/ProductVariant/52521947922721',
      medium: 'gid://shopify/ProductVariant/52521947955489',
      large: 'gid://shopify/ProductVariant/52521947988257',
    },
  },
  'missoula-montana-1921': {
    productId: 'gid://shopify/Product/10303361515809',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948086561',
      medium: 'gid://shopify/ProductVariant/52521948119329',
      large: 'gid://shopify/ProductVariant/52521948152097',
    },
  },
  'omaha-nebraska-1901': {
    productId: 'gid://shopify/Product/10303361548577',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948184865',
      medium: 'gid://shopify/ProductVariant/52521948217633',
      large: 'gid://shopify/ProductVariant/52521948250401',
    },
  },
  'newark-new-jersey-1908': {
    productId: 'gid://shopify/Product/10303361581345',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948283169',
      medium: 'gid://shopify/ProductVariant/52521948315937',
      large: 'gid://shopify/ProductVariant/52521948348705',
    },
  },
  'camden-new-jersey-1906': {
    productId: 'gid://shopify/Product/10303361614113',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948381473',
      medium: 'gid://shopify/ProductVariant/52521948414241',
      large: 'gid://shopify/ProductVariant/52521948447009',
    },
  },
  'buffalo-new-york-1889': {
    productId: 'gid://shopify/Product/10303361941793',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948479777',
      medium: 'gid://shopify/ProductVariant/52521948512545',
      large: 'gid://shopify/ProductVariant/52521948545313',
    },
  },
  'brooklyn-new-york-1908': {
    productId: 'gid://shopify/Product/10303362269473',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948578081',
      medium: 'gid://shopify/ProductVariant/52521948610849',
      large: 'gid://shopify/ProductVariant/52521948643617',
    },
  },
  'raleigh-north-carolina-1914': {
    productId: 'gid://shopify/Product/10303362793761',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948676385',
      medium: 'gid://shopify/ProductVariant/52521948709153',
      large: 'gid://shopify/ProductVariant/52521948741921',
    },
  },
  'cincinnati-ohio-1904': {
    productId: 'gid://shopify/Product/10303363186977',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948774689',
      medium: 'gid://shopify/ProductVariant/52521948807457',
      large: 'gid://shopify/ProductVariant/52521948840225',
    },
  },
  'cleveland-ohio-1896': {
    productId: 'gid://shopify/Product/10303363678497',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948872993',
      medium: 'gid://shopify/ProductVariant/52521948905761',
      large: 'gid://shopify/ProductVariant/52521948938529',
    },
  },
  'toledo-ohio-1905': {
    productId: 'gid://shopify/Product/10303364071713',
    variants: {
      small: 'gid://shopify/ProductVariant/52521948971297',
      medium: 'gid://shopify/ProductVariant/52521949004065',
      large: 'gid://shopify/ProductVariant/52521949036833',
    },
  },
  'tulsa-oklahoma-1915': {
    productId: 'gid://shopify/Product/10303364399393',
    variants: {
      small: 'gid://shopify/ProductVariant/52521949069601',
      medium: 'gid://shopify/ProductVariant/52521949102369',
      large: 'gid://shopify/ProductVariant/52521949135137',
    },
  },
  'astoria-oregon-1908': {
    productId: 'gid://shopify/Product/10303364759841',
    variants: {
      small: 'gid://shopify/ProductVariant/52521949200673',
      medium: 'gid://shopify/ProductVariant/52521949233441',
      large: 'gid://shopify/ProductVariant/52521949266209',
    },
  },
  'pottsville-pennsylvania-1885': {
    productId: 'gid://shopify/Product/10303365284129',
    variants: {
      small: 'gid://shopify/ProductVariant/52521949298977',
      medium: 'gid://shopify/ProductVariant/52521949331745',
      large: 'gid://shopify/ProductVariant/52521949364513',
    },
  },
  'charleston-south-carolina-1902': {
    productId: 'gid://shopify/Product/10303365808417',
    variants: {
      small: 'gid://shopify/ProductVariant/52521949495585',
      medium: 'gid://shopify/ProductVariant/52521949528353',
      large: 'gid://shopify/ProductVariant/52521949561121',
    },
  },
  'houston-texas-1896': {
    productId: 'gid://shopify/Product/10303366201633',
    variants: {
      small: 'gid://shopify/ProductVariant/52521949593889',
      medium: 'gid://shopify/ProductVariant/52521949626657',
      large: 'gid://shopify/ProductVariant/52521949659425',
    },
  },
  'san-antonio-texas-1896': {
    productId: 'gid://shopify/Product/10303366725921',
    variants: {
      small: 'gid://shopify/ProductVariant/52521949757729',
      medium: 'gid://shopify/ProductVariant/52521949790497',
      large: 'gid://shopify/ProductVariant/52521949823265',
    },
  },
  'el-paso-texas-1908': {
    productId: 'gid://shopify/Product/10303366988065',
    variants: {
      small: 'gid://shopify/ProductVariant/52521949888801',
      medium: 'gid://shopify/ProductVariant/52521949921569',
      large: 'gid://shopify/ProductVariant/52521949954337',
    },
  },
  'galveston-texas-1899': {
    productId: 'gid://shopify/Product/10303367315745',
    variants: {
      small: 'gid://shopify/ProductVariant/52521950019873',
      medium: 'gid://shopify/ProductVariant/52521950052641',
      large: 'gid://shopify/ProductVariant/52521950085409',
    },
  },
  'dallas-texas-1892': {
    productId: 'gid://shopify/Product/10303367708961',
    variants: {
      small: 'gid://shopify/ProductVariant/52521950150945',
      medium: 'gid://shopify/ProductVariant/52521950183713',
      large: 'gid://shopify/ProductVariant/52521950216481',
    },
  },
  'norfolk-virginia-1898': {
    productId: 'gid://shopify/Product/10303367938337',
    variants: {
      small: 'gid://shopify/ProductVariant/52521950249249',
      medium: 'gid://shopify/ProductVariant/52521950282017',
      large: 'gid://shopify/ProductVariant/52521950314785',
    },
  },
  'roanoke-virginia-1907': {
    productId: 'gid://shopify/Product/10303368102177',
    variants: {
      small: 'gid://shopify/ProductVariant/52521950347553',
      medium: 'gid://shopify/ProductVariant/52521950380321',
      large: 'gid://shopify/ProductVariant/52521950413089',
    },
  },
  'boise-idaho-1912': {
    productId: 'gid://shopify/Product/10303368167713',
    variants: {
      small: 'gid://shopify/ProductVariant/52521950445857',
      medium: 'gid://shopify/ProductVariant/52521950478625',
      large: 'gid://shopify/ProductVariant/52521950511393',
    },
  },
  'decatur-illinois-1915': {
    productId: 'gid://shopify/Product/10303368331553',
    variants: {
      small: 'gid://shopify/ProductVariant/52521950544161',
      medium: 'gid://shopify/ProductVariant/52521950576929',
      large: 'gid://shopify/ProductVariant/52521950609697',
    },
  },
  'oshkosh-wisconsin-1903': {
    productId: 'gid://shopify/Product/10303368528161',
    variants: {
      small: 'gid://shopify/ProductVariant/52521950642465',
      medium: 'gid://shopify/ProductVariant/52521950675233',
      large: 'gid://shopify/ProductVariant/52521950708001',
    },
  },
};

// Maps fully connected in Simply Framed (print file + Favorite linked for all variants)
// Only these maps show the print ordering UI on the site
const FULFILLMENT_READY = new Set([
  'astoria-oregon-1908',
  'atlanta-georgia-1886',
  'atlanta-georgia-1899',
  'baltimore-maryland-1901',
  'boise-idaho-1912',
  'brooklyn-new-york-1908',
  'buffalo-new-york-1889',
  'butte-montana-1900',
  'camden-new-jersey-1906',
  'charleston-south-carolina-1902',
  'chicago-illinois-1913',
  'cincinnati-ohio-1904',
  'cleveland-ohio-1896',
  'dallas-texas-1899',
  'des-moines-iowa-1901',
  'el-paso-texas-1908',
  'fort-wayne-indiana-1902',
  'galveston-texas-1899',
  'grand-rapids-michigan-1895',
  'hartford-connecticut-1922',
  'houston-texas-1896',
  'indianapolis-indiana-1898',
  'jacksonville-florida-1913',
  'louisville-kentucky-1892',
  'miami-florida-1921',
  'missoula-montana-1921',
  'new-orleans-louisiana-1885',
  'new-orleans-louisiana-1896',
  'new-orleans-louisiana-1908',
  'new-york-new-york-1911',
  'newark-new-jersey-1908',
  'norfolk-virginia-1898',
  'omaha-nebraska-1901',
  'oshkosh-wisconsin-1903',
  'portland-maine-1896',
  'portland-oregon-1901',
  'raleigh-north-carolina-1914',
  'roanoke-virginia-1907',
  'saint-paul-minnesota-1903',
  'san-antonio-texas-1896',
  'san-francisco-california-1886',
  'seattle-washington-1893',
  'tampa-florida-1915',
  'toledo-ohio-1905',
  'tulsa-oklahoma-1915',
  'wichita-kansas-1914',
]);

export function isPrintEnabled(mapId: string): boolean {
  return FULFILLMENT_READY.has(mapId) && mapId in SHOPIFY_PRODUCT_MAP;
}

export function getVariantId(
  mapId: string,
  size: PrintSizeId
): string | null {
  const product = SHOPIFY_PRODUCT_MAP[mapId];
  if (!product) return null;
  return product.variants[size];
}
