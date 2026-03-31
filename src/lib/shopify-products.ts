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
  // --- Batch 3 ---
  'akron-ohio-1888': {
    productId: 'gid://shopify/Product/10303522210081',
    variants: {
      small: 'gid://shopify/ProductVariant/52522255843617',
      medium: 'gid://shopify/ProductVariant/52522255876385',
      large: 'gid://shopify/ProductVariant/52522255909153',
    },
  },
  'augusta-georgia-1884': {
    productId: 'gid://shopify/Product/10303521259809',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252796193',
      medium: 'gid://shopify/ProductVariant/52522252828961',
      large: 'gid://shopify/ProductVariant/52522252861729',
    },
  },
  'baton-rouge-louisiana-1885': {
    productId: 'gid://shopify/Product/10303521784097',
    variants: {
      small: 'gid://shopify/ProductVariant/52522254237985',
      medium: 'gid://shopify/ProductVariant/52522254270753',
      large: 'gid://shopify/ProductVariant/52522254303521',
    },
  },
  'birmingham-alabama-1885': {
    productId: 'gid://shopify/Product/10303520997665',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252140833',
      medium: 'gid://shopify/ProductVariant/52522252173601',
      large: 'gid://shopify/ProductVariant/52522252206369',
    },
  },
  'boston-massachusetts-1867': {
    productId: 'gid://shopify/Product/10303521882401',
    variants: {
      small: 'gid://shopify/ProductVariant/52522254729505',
      medium: 'gid://shopify/ProductVariant/52522254762273',
      large: 'gid://shopify/ProductVariant/52522254795041',
    },
  },
  'canton-ohio-1887': {
    productId: 'gid://shopify/Product/10303522242849',
    variants: {
      small: 'gid://shopify/ProductVariant/52522255941921',
      medium: 'gid://shopify/ProductVariant/52522255974689',
      large: 'gid://shopify/ProductVariant/52522256007457',
    },
  },
  'cedar-rapids-iowa-1884': {
    productId: 'gid://shopify/Product/10303521489185',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253418785',
      medium: 'gid://shopify/ProductVariant/52522253451553',
      large: 'gid://shopify/ProductVariant/52522253484321',
    },
  },
  'charleston-south-carolina-1884': {
    productId: 'gid://shopify/Product/10303522570529',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256924961',
      medium: 'gid://shopify/ProductVariant/52522256957729',
      large: 'gid://shopify/ProductVariant/52522256990497',
    },
  },
  'colorado-springs-colorado-1890': {
    productId: 'gid://shopify/Product/10303521128737',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252468513',
      medium: 'gid://shopify/ProductVariant/52522252501281',
      large: 'gid://shopify/ProductVariant/52522252534049',
    },
  },
  'covington-kentucky-1886': {
    productId: 'gid://shopify/Product/10303521653025',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253910305',
      medium: 'gid://shopify/ProductVariant/52522253943073',
      large: 'gid://shopify/ProductVariant/52522253975841',
    },
  },
  'davenport-iowa-1886': {
    productId: 'gid://shopify/Product/10303521521953',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253517089',
      medium: 'gid://shopify/ProductVariant/52522253549857',
      large: 'gid://shopify/ProductVariant/52522253582625',
    },
  },
  'dayton-ohio-1887': {
    productId: 'gid://shopify/Product/10303522275617',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256040225',
      medium: 'gid://shopify/ProductVariant/52522256072993',
      large: 'gid://shopify/ProductVariant/52522256105761',
    },
  },
  'detroit-michigan-1889': {
    productId: 'gid://shopify/Product/10303521915169',
    variants: {
      small: 'gid://shopify/ProductVariant/52522254827809',
      medium: 'gid://shopify/ProductVariant/52522254860577',
      large: 'gid://shopify/ProductVariant/52522254893345',
    },
  },
  'duluth-minnesota-1884': {
    productId: 'gid://shopify/Product/10303521947937',
    variants: {
      small: 'gid://shopify/ProductVariant/52522254926113',
      medium: 'gid://shopify/ProductVariant/52522254958881',
      large: 'gid://shopify/ProductVariant/52522254991649',
    },
  },
  'evansville-indiana-1884': {
    productId: 'gid://shopify/Product/10303521390881',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253123873',
      medium: 'gid://shopify/ProductVariant/52522253156641',
      large: 'gid://shopify/ProductVariant/52522253189409',
    },
  },
  'jackson-mississippi-1885': {
    productId: 'gid://shopify/Product/10303522079009',
    variants: {
      small: 'gid://shopify/ProductVariant/52522255352097',
      medium: 'gid://shopify/ProductVariant/52522255384865',
      large: 'gid://shopify/ProductVariant/52522255417633',
    },
  },
  'kansas-city-kansas-1889': {
    productId: 'gid://shopify/Product/10303521587489',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253713697',
      medium: 'gid://shopify/ProductVariant/52522253746465',
      large: 'gid://shopify/ProductVariant/52522253779233',
    },
  },
  'knoxville-tennessee-1884': {
    productId: 'gid://shopify/Product/10303522636065',
    variants: {
      small: 'gid://shopify/ProductVariant/52522257056033',
      medium: 'gid://shopify/ProductVariant/52522257088801',
      large: 'gid://shopify/ProductVariant/52522257121569',
    },
  },
  'lexington-kentucky-1886': {
    productId: 'gid://shopify/Product/10303521718561',
    variants: {
      small: 'gid://shopify/ProductVariant/52522254041377',
      medium: 'gid://shopify/ProductVariant/52522254074145',
      large: 'gid://shopify/ProductVariant/52522254106913',
    },
  },
  'lincoln-nebraska-1884': {
    productId: 'gid://shopify/Product/10303522144545',
    variants: {
      small: 'gid://shopify/ProductVariant/52522255647009',
      medium: 'gid://shopify/ProductVariant/52522255679777',
      large: 'gid://shopify/ProductVariant/52522255712545',
    },
  },
  'macon-georgia-1884': {
    productId: 'gid://shopify/Product/10303521292577',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252894497',
      medium: 'gid://shopify/ProductVariant/52522252927265',
      large: 'gid://shopify/ProductVariant/52522252960033',
    },
  },
  'memphis-tennessee-1888': {
    productId: 'gid://shopify/Product/10303522668833',
    variants: {
      small: 'gid://shopify/ProductVariant/52522257154337',
      medium: 'gid://shopify/ProductVariant/52522257187105',
      large: 'gid://shopify/ProductVariant/52522257219873',
    },
  },
  'minneapolis-minnesota-1885': {
    productId: 'gid://shopify/Product/10303522013473',
    variants: {
      small: 'gid://shopify/ProductVariant/52522255155489',
      medium: 'gid://shopify/ProductVariant/52522255188257',
      large: 'gid://shopify/ProductVariant/52522255221025',
    },
  },
  'montgomery-alabama-1884': {
    productId: 'gid://shopify/Product/10303521063201',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252271905',
      medium: 'gid://shopify/ProductVariant/52522252304673',
      large: 'gid://shopify/ProductVariant/52522252337441',
    },
  },
  'nashville-tennessee-1888': {
    productId: 'gid://shopify/Product/10303522734369',
    variants: {
      small: 'gid://shopify/ProductVariant/52522257285409',
      medium: 'gid://shopify/ProductVariant/52522257318177',
      large: 'gid://shopify/ProductVariant/52522257350945',
    },
  },
  'new-haven-connecticut-1886': {
    productId: 'gid://shopify/Product/10303521194273',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252665121',
      medium: 'gid://shopify/ProductVariant/52522252697889',
      large: 'gid://shopify/ProductVariant/52522252730657',
    },
  },
  'newport-kentucky-1886': {
    productId: 'gid://shopify/Product/10303521751329',
    variants: {
      small: 'gid://shopify/ProductVariant/52522254139681',
      medium: 'gid://shopify/ProductVariant/52522254172449',
      large: 'gid://shopify/ProductVariant/52522254205217',
    },
  },
  'portland-oregon-1889': {
    productId: 'gid://shopify/Product/10303522341153',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256236833',
      medium: 'gid://shopify/ProductVariant/52522256269601',
      large: 'gid://shopify/ProductVariant/52522256302369',
    },
  },
  'pueblo-colorado-1883': {
    productId: 'gid://shopify/Product/10303521161505',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252566817',
      medium: 'gid://shopify/ProductVariant/52522252599585',
      large: 'gid://shopify/ProductVariant/52522252632353',
    },
  },
  'richmond-virginia-1886': {
    productId: 'gid://shopify/Product/10303522799905',
    variants: {
      small: 'gid://shopify/ProductVariant/52522257482017',
      medium: 'gid://shopify/ProductVariant/52522257514785',
      large: 'gid://shopify/ProductVariant/52522257547553',
    },
  },
  'richmond-virginia-1905': {
    productId: 'gid://shopify/Product/10303522865441',
    variants: {
      small: 'gid://shopify/ProductVariant/52522257613089',
      medium: 'gid://shopify/ProductVariant/52522257645857',
      large: 'gid://shopify/ProductVariant/52522257678625',
    },
  },
  'rochester-minnesota-1884': {
    productId: 'gid://shopify/Product/10303522046241',
    variants: {
      small: 'gid://shopify/ProductVariant/52522255253793',
      medium: 'gid://shopify/ProductVariant/52522255286561',
      large: 'gid://shopify/ProductVariant/52522255319329',
    },
  },
  'salt-lake-city-utah-1884': {
    productId: 'gid://shopify/Product/10303522767137',
    variants: {
      small: 'gid://shopify/ProductVariant/52522257383713',
      medium: 'gid://shopify/ProductVariant/52522257416481',
      large: 'gid://shopify/ProductVariant/52522257449249',
    },
  },
  'san-diego-california-1887': {
    productId: 'gid://shopify/Product/10303521095969',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252370209',
      medium: 'gid://shopify/ProductVariant/52522252402977',
      large: 'gid://shopify/ProductVariant/52522252435745',
    },
  },
  'savannah-georgia-1884': {
    productId: 'gid://shopify/Product/10303521325345',
    variants: {
      small: 'gid://shopify/ProductVariant/52522252992801',
      medium: 'gid://shopify/ProductVariant/52522253025569',
      large: 'gid://shopify/ProductVariant/52522253058337',
    },
  },
  'shreveport-louisiana-1885': {
    productId: 'gid://shopify/Product/10303521849633',
    variants: {
      small: 'gid://shopify/ProductVariant/52522254369057',
      medium: 'gid://shopify/ProductVariant/52522254401825',
      large: 'gid://shopify/ProductVariant/52522254434593',
    },
  },
  'sioux-city-iowa-1884': {
    productId: 'gid://shopify/Product/10303521554721',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253615393',
      medium: 'gid://shopify/ProductVariant/52522253648161',
      large: 'gid://shopify/ProductVariant/52522253680929',
    },
  },
  'south-bend-indiana-1885': {
    productId: 'gid://shopify/Product/10303521423649',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253222177',
      medium: 'gid://shopify/ProductVariant/52522253254945',
      large: 'gid://shopify/ProductVariant/52522253287713',
    },
  },
  'spokane-washington-1888': {
    productId: 'gid://shopify/Product/10303522898209',
    variants: {
      small: 'gid://shopify/ProductVariant/52522257711393',
      medium: 'gid://shopify/ProductVariant/52522257744161',
      large: 'gid://shopify/ProductVariant/52522257776929',
    },
  },
  'springfield-missouri-1884': {
    productId: 'gid://shopify/Product/10303522111777',
    variants: {
      small: 'gid://shopify/ProductVariant/52522255548705',
      medium: 'gid://shopify/ProductVariant/52522255581473',
      large: 'gid://shopify/ProductVariant/52522255614241',
    },
  },
  'tacoma-washington-1885': {
    productId: 'gid://shopify/Product/10303522930977',
    variants: {
      small: 'gid://shopify/ProductVariant/52522257809697',
      medium: 'gid://shopify/ProductVariant/52522257842465',
      large: 'gid://shopify/ProductVariant/52522257875233',
    },
  },
  'terre-haute-indiana-1886': {
    productId: 'gid://shopify/Product/10303521456417',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253320481',
      medium: 'gid://shopify/ProductVariant/52522253353249',
      large: 'gid://shopify/ProductVariant/52522253386017',
    },
  },
  'topeka-kansas-1883': {
    productId: 'gid://shopify/Product/10303521620257',
    variants: {
      small: 'gid://shopify/ProductVariant/52522253812001',
      medium: 'gid://shopify/ProductVariant/52522253844769',
      large: 'gid://shopify/ProductVariant/52522253877537',
    },
  },
  'wilmington-north-carolina-1884': {
    productId: 'gid://shopify/Product/10303522177313',
    variants: {
      small: 'gid://shopify/ProductVariant/52522255745313',
      medium: 'gid://shopify/ProductVariant/52522255778081',
      large: 'gid://shopify/ProductVariant/52522255810849',
    },
  },
  'youngstown-ohio-1884': {
    productId: 'gid://shopify/Product/10303522308385',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256138529',
      medium: 'gid://shopify/ProductVariant/52522256171297',
      large: 'gid://shopify/ProductVariant/52522256204065',
    },
  },
  // --- Batch 3 (PA re-imports) ---
  'allentown-pennsylvania-1885': {
    productId: 'gid://shopify/Product/10303522373921',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256335137',
      medium: 'gid://shopify/ProductVariant/52522256367905',
      large: 'gid://shopify/ProductVariant/52522256400673',
    },
  },
  'erie-pennsylvania-1888': {
    productId: 'gid://shopify/Product/10303522406689',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256433441',
      medium: 'gid://shopify/ProductVariant/52522256466209',
      large: 'gid://shopify/ProductVariant/52522256498977',
    },
  },
  'harrisburg-pennsylvania-1884': {
    productId: 'gid://shopify/Product/10303522439457',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256531745',
      medium: 'gid://shopify/ProductVariant/52522256564513',
      large: 'gid://shopify/ProductVariant/52522256597281',
    },
  },
  'pittsburgh-pennsylvania-1884': {
    productId: 'gid://shopify/Product/10303522472225',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256630049',
      medium: 'gid://shopify/ProductVariant/52522256662817',
      large: 'gid://shopify/ProductVariant/52522256695585',
    },
  },
  'reading-pennsylvania-1887': {
    productId: 'gid://shopify/Product/10303522504993',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256728353',
      medium: 'gid://shopify/ProductVariant/52522256761121',
      large: 'gid://shopify/ProductVariant/52522256793889',
    },
  },
  'scranton-pennsylvania-1884': {
    productId: 'gid://shopify/Product/10303522537761',
    variants: {
      small: 'gid://shopify/ProductVariant/52522256826657',
      medium: 'gid://shopify/ProductVariant/52522256859425',
      large: 'gid://shopify/ProductVariant/52522256892193',
    },
  },
  // --- Batch 4 (favorites gap-fill) ---
  'abilene-texas-1929': {
    productId: 'gid://shopify/Product/10304334561569',
    variants: {
      small: 'gid://shopify/ProductVariant/52524703777057',
      medium: 'gid://shopify/ProductVariant/52524703809825',
      large: 'gid://shopify/ProductVariant/52524703842593',
    },
  },
  'akron-ohio-1892': {
    productId: 'gid://shopify/Product/10304334496033',
    variants: {
      small: 'gid://shopify/ProductVariant/52524703580449',
      medium: 'gid://shopify/ProductVariant/52524703613217',
      large: 'gid://shopify/ProductVariant/52524703645985',
    },
  },
  'baltimore-maryland-1914': {
    productId: 'gid://shopify/Product/10304334332193',
    variants: {
      small: 'gid://shopify/ProductVariant/52524703121697',
      medium: 'gid://shopify/ProductVariant/52524703154465',
      large: 'gid://shopify/ProductVariant/52524703187233',
    },
  },
  'bridgeport-connecticut-1913': {
    productId: 'gid://shopify/Product/10304333414689',
    variants: {
      small: 'gid://shopify/ProductVariant/52524699746593',
      medium: 'gid://shopify/ProductVariant/52524699779361',
      large: 'gid://shopify/ProductVariant/52524699812129',
    },
  },
  'cedar-rapids-iowa-1913': {
    productId: 'gid://shopify/Product/10304334004513',
    variants: {
      small: 'gid://shopify/ProductVariant/52524701942049',
      medium: 'gid://shopify/ProductVariant/52524701974817',
      large: 'gid://shopify/ProductVariant/52524702007585',
    },
  },
  'des-moines-iowa-1891': {
    productId: 'gid://shopify/Product/10304334037281',
    variants: {
      small: 'gid://shopify/ProductVariant/52524702040353',
      medium: 'gid://shopify/ProductVariant/52524702073121',
      large: 'gid://shopify/ProductVariant/52524702105889',
    },
  },
  'dubuque-iowa-1891': {
    productId: 'gid://shopify/Product/10304334070049',
    variants: {
      small: 'gid://shopify/ProductVariant/52524702138657',
      medium: 'gid://shopify/ProductVariant/52524702171425',
      large: 'gid://shopify/ProductVariant/52524702204193',
    },
  },
  'east-saint-louis-illinois-1905': {
    productId: 'gid://shopify/Product/10304333545761',
    variants: {
      small: 'gid://shopify/ProductVariant/52524700074273',
      medium: 'gid://shopify/ProductVariant/52524700107041',
      large: 'gid://shopify/ProductVariant/52524700139809',
    },
  },
  'elkhart-indiana-1927': {
    productId: 'gid://shopify/Product/10304333611297',
    variants: {
      small: 'gid://shopify/ProductVariant/52524700205345',
      medium: 'gid://shopify/ProductVariant/52524700238113',
      large: 'gid://shopify/ProductVariant/52524700270881',
    },
  },
  'evansville-indiana-1910': {
    productId: 'gid://shopify/Product/10304333644065',
    variants: {
      small: 'gid://shopify/ProductVariant/52524700303649',
      medium: 'gid://shopify/ProductVariant/52524700336417',
      large: 'gid://shopify/ProductVariant/52524700369185',
    },
  },
  'indianapolis-indiana-1915': {
    productId: 'gid://shopify/Product/10304333676833',
    variants: {
      small: 'gid://shopify/ProductVariant/52524700401953',
      medium: 'gid://shopify/ProductVariant/52524700434721',
      large: 'gid://shopify/ProductVariant/52524700467489',
    },
  },
  'kansas-city-kansas-1907': {
    productId: 'gid://shopify/Product/10304334201121',
    variants: {
      small: 'gid://shopify/ProductVariant/52524702466337',
      medium: 'gid://shopify/ProductVariant/52524702499105',
      large: 'gid://shopify/ProductVariant/52524702531873',
    },
  },
  'lafayette-indiana-1915': {
    productId: 'gid://shopify/Product/10304333709601',
    variants: {
      small: 'gid://shopify/ProductVariant/52524700500257',
      medium: 'gid://shopify/ProductVariant/52524700533025',
      large: 'gid://shopify/ProductVariant/52524700565793',
    },
  },
  'louisville-kentucky-1905': {
    productId: 'gid://shopify/Product/10304334233889',
    variants: {
      small: 'gid://shopify/ProductVariant/52524702564641',
      medium: 'gid://shopify/ProductVariant/52524702597409',
      large: 'gid://shopify/ProductVariant/52524702630177',
    },
  },
  'muncie-indiana-1911': {
    productId: 'gid://shopify/Product/10304333742369',
    variants: {
      small: 'gid://shopify/ProductVariant/52524700598561',
      medium: 'gid://shopify/ProductVariant/52524700631329',
      large: 'gid://shopify/ProductVariant/52524700664097',
    },
  },
  'new-albany-indiana-1905': {
    productId: 'gid://shopify/Product/10304333807905',
    variants: {
      small: 'gid://shopify/ProductVariant/52524701417761',
      medium: 'gid://shopify/ProductVariant/52524701450529',
      large: 'gid://shopify/ProductVariant/52524701483297',
    },
  },
  'new-haven-connecticut-1901': {
    productId: 'gid://shopify/Product/10304333480225',
    variants: {
      small: 'gid://shopify/ProductVariant/52524699877665',
      medium: 'gid://shopify/ProductVariant/52524699910433',
      large: 'gid://shopify/ProductVariant/52524699943201',
    },
  },
  'newport-kentucky-1910': {
    productId: 'gid://shopify/Product/10304334266657',
    variants: {
      small: 'gid://shopify/ProductVariant/52524702662945',
      medium: 'gid://shopify/ProductVariant/52524702695713',
      large: 'gid://shopify/ProductVariant/52524702728481',
    },
  },
  'norwalk-connecticut-1922': {
    productId: 'gid://shopify/Product/10304333512993',
    variants: {
      small: 'gid://shopify/ProductVariant/52524699975969',
      medium: 'gid://shopify/ProductVariant/52524700008737',
      large: 'gid://shopify/ProductVariant/52524700041505',
    },
  },
  'owego-new-york-1888': {
    productId: 'gid://shopify/Product/10304334430497',
    variants: {
      small: 'gid://shopify/ProductVariant/52524703383841',
      medium: 'gid://shopify/ProductVariant/52524703416609',
      large: 'gid://shopify/ProductVariant/52524703449377',
    },
  },
  'owensboro-kentucky-1910': {
    productId: 'gid://shopify/Product/10304334299425',
    variants: {
      small: 'gid://shopify/ProductVariant/52524702761249',
      medium: 'gid://shopify/ProductVariant/52524702794017',
      large: 'gid://shopify/ProductVariant/52524702826785',
    },
  },
  'sioux-city-iowa-1902': {
    productId: 'gid://shopify/Product/10304334168353',
    variants: {
      small: 'gid://shopify/ProductVariant/52524702302497',
      medium: 'gid://shopify/ProductVariant/52524702335265',
      large: 'gid://shopify/ProductVariant/52524702368033',
    },
  },
  'south-bend-indiana-1899': {
    productId: 'gid://shopify/Product/10304333840673',
    variants: {
      small: 'gid://shopify/ProductVariant/52524701516065',
      medium: 'gid://shopify/ProductVariant/52524701548833',
      large: 'gid://shopify/ProductVariant/52524701581601',
    },
  },
  'terre-haute-indiana-1892': {
    productId: 'gid://shopify/Product/10304333873441',
    variants: {
      small: 'gid://shopify/ProductVariant/52524701614369',
      medium: 'gid://shopify/ProductVariant/52524701647137',
      large: 'gid://shopify/ProductVariant/52524701679905',
    },
  },
  'terre-haute-indiana-1896': {
    productId: 'gid://shopify/Product/10304333906209',
    variants: {
      small: 'gid://shopify/ProductVariant/52524701712673',
      medium: 'gid://shopify/ProductVariant/52524701745441',
      large: 'gid://shopify/ProductVariant/52524701778209',
    },
  },
  'terre-haute-indiana-1911': {
    productId: 'gid://shopify/Product/10304333971745',
    variants: {
      small: 'gid://shopify/ProductVariant/52524701843745',
      medium: 'gid://shopify/ProductVariant/52524701876513',
      large: 'gid://shopify/ProductVariant/52524701909281',
    },
  },
  'texarkana-texas-1915': {
    productId: 'gid://shopify/Product/10304334594337',
    variants: {
      small: 'gid://shopify/ProductVariant/52524703875361',
      medium: 'gid://shopify/ProductVariant/52524703908129',
      large: 'gid://shopify/ProductVariant/52524703940897',
    },
  },
  'the-oranges-new-jersey-1895': {
    productId: 'gid://shopify/Product/10304334364961',
    variants: {
      small: 'gid://shopify/ProductVariant/52524703220001',
      medium: 'gid://shopify/ProductVariant/52524703252769',
      large: 'gid://shopify/ProductVariant/52524703285537',
    },
  },
  'wilmington-north-carolina-1915': {
    productId: 'gid://shopify/Product/10304334463265',
    variants: {
      small: 'gid://shopify/ProductVariant/52524703482145',
      medium: 'gid://shopify/ProductVariant/52524703514913',
      large: 'gid://shopify/ProductVariant/52524703547681',
    },
  },
  'youngstown-ohio-1896': {
    productId: 'gid://shopify/Product/10304334528801',
    variants: {
      small: 'gid://shopify/ProductVariant/52524703678753',
      medium: 'gid://shopify/ProductVariant/52524703711521',
      large: 'gid://shopify/ProductVariant/52524703744289',
    },
  },
};

// Maps fully connected in Simply Framed (print file + Favorite linked for all variants)
// Only these maps show the print ordering UI on the site
const FULFILLMENT_READY = new Set([
  // Only maps with 0.843 aspect ratio that match Simply Framed Favorites
  // --- Batch 1 & 2 ---
  'astoria-oregon-1908',
  'atlanta-georgia-1886',
  'atlanta-georgia-1899',
  'baltimore-maryland-1901',
  'boise-idaho-1912',
  'buffalo-new-york-1889',
  'butte-montana-1900',
  'charleston-south-carolina-1902',
  'des-moines-iowa-1901',
  'fort-wayne-indiana-1902',
  'galveston-texas-1899',
  'hartford-connecticut-1922',
  'indianapolis-indiana-1898',
  'jacksonville-florida-1913',
  'louisville-kentucky-1892',
  'miami-florida-1921',
  'missoula-montana-1921',
  'new-orleans-louisiana-1885',
  'new-orleans-louisiana-1896',
  'new-orleans-louisiana-1908',
  'norfolk-virginia-1898',
  'omaha-nebraska-1901',
  'oshkosh-wisconsin-1903',
  'portland-maine-1896',
  'raleigh-north-carolina-1914',
  'roanoke-virginia-1907',
  'saint-paul-minnesota-1903',
  'san-francisco-california-1886',
  'seattle-washington-1893',
  'tampa-florida-1915',
  'tulsa-oklahoma-1915',
  'wichita-kansas-1914',
  // --- Batch 3 ---
  'akron-ohio-1888',
  'augusta-georgia-1884',
  'baton-rouge-louisiana-1885',
  'birmingham-alabama-1885',
  'boston-massachusetts-1867',
  'canton-ohio-1887',
  'cedar-rapids-iowa-1884',
  'charleston-south-carolina-1884',
  'colorado-springs-colorado-1890',
  'covington-kentucky-1886',
  'davenport-iowa-1886',
  'dayton-ohio-1887',
  'detroit-michigan-1889',
  'duluth-minnesota-1884',
  'evansville-indiana-1884',
  'jackson-mississippi-1885',
  'kansas-city-kansas-1889',
  'knoxville-tennessee-1884',
  'lexington-kentucky-1886',
  'lincoln-nebraska-1884',
  'macon-georgia-1884',
  'memphis-tennessee-1888',
  'minneapolis-minnesota-1885',
  'montgomery-alabama-1884',
  'nashville-tennessee-1888',
  'new-haven-connecticut-1886',
  'newport-kentucky-1886',
  'portland-oregon-1889',
  'pueblo-colorado-1883',
  'richmond-virginia-1886',
  'richmond-virginia-1905',
  'rochester-minnesota-1884',
  'salt-lake-city-utah-1884',
  'san-diego-california-1887',
  'savannah-georgia-1884',
  'shreveport-louisiana-1885',
  'sioux-city-iowa-1884',
  'south-bend-indiana-1885',
  'spokane-washington-1888',
  'springfield-missouri-1884',
  'tacoma-washington-1885',
  'terre-haute-indiana-1886',
  'topeka-kansas-1883',
  'wilmington-north-carolina-1884',
  'youngstown-ohio-1884',
  // --- Batch 4 (favorites gap-fill) ---
  'abilene-texas-1929',
  'akron-ohio-1892',
  'baltimore-maryland-1914',
  'bridgeport-connecticut-1913',
  'cedar-rapids-iowa-1913',
  'des-moines-iowa-1891',
  'dubuque-iowa-1891',
  'east-saint-louis-illinois-1905',
  'elkhart-indiana-1927',
  'evansville-indiana-1910',
  'indianapolis-indiana-1915',
  'kansas-city-kansas-1907',
  'lafayette-indiana-1915',
  'louisville-kentucky-1905',
  'muncie-indiana-1911',
  'new-albany-indiana-1905',
  'new-haven-connecticut-1901',
  'newport-kentucky-1910',
  'norwalk-connecticut-1922',
  'owego-new-york-1888',
  'owensboro-kentucky-1910',
  'sioux-city-iowa-1902',
  'south-bend-indiana-1899',
  'terre-haute-indiana-1892',
  'terre-haute-indiana-1896',
  'terre-haute-indiana-1911',
  'texarkana-texas-1915',
  'the-oranges-new-jersey-1895',
  'wilmington-north-carolina-1915',
  'youngstown-ohio-1896',
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
