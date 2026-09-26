export const catalog = [
  {
    id: 'nars-velvet-matte-lip-pencil-rosewood',
    name: 'Velvet Matte Lip Pencil',
    brand: 'NARS',
    category: 'Lip Liner',
    finish: 'Matte',
    hex: '#9D5A4D',
    price: 29,
    undertone: 'Warm',
    rating: 4.8,
    stock: 'In stock',
    description: 'Classic rosewood tone with a soft velvet finish.'
  },
  {
    id: 'fenty-match-stix-rose',
    name: 'Match Stix Matte Skinstick',
    brand: 'Fenty Beauty',
    category: 'Blush',
    finish: 'Matte',
    hex: '#D68F7D',
    price: 34,
    undertone: 'Neutral',
    rating: 4.7,
    stock: 'In stock',
    description: 'Warm rose with a soft neutral undertone.'
  },
  {
    id: 'rare-beauty-uplifted-rose',
    name: 'Stay Vulnerable Gloss',
    brand: 'Rare Beauty',
    category: 'Lip Gloss',
    finish: 'Gloss',
    hex: '#D77B72',
    price: 20,
    undertone: 'Warm',
    rating: 4.9,
    stock: 'Low stock',
    description: 'Light rose gloss that brightens and adds definition.'
  },
  {
    id: 'pat-mcgrath-mothership-satin',
    name: 'Mothership II Eyeshadow Palette',
    brand: 'Pat McGrath Labs',
    category: 'Eyeshadow',
    finish: 'Satin',
    hex: '#B77263',
    price: 128,
    undertone: 'Warm',
    rating: 5.0,
    stock: 'Limited',
    description: 'Rich satin mauve with a luminous warm undertone.'
  },
  {
    id: 'westman-atelier-baby-rose',
    name: 'Baby Cheeks Blush',
    brand: 'Westman Atelier',
    category: 'Blush',
    finish: 'Cream',
    hex: '#D39B8B',
    price: 48,
    undertone: 'Neutral',
    rating: 4.8,
    stock: 'In stock',
    description: 'Cream blush with a lived-in rose warmth.'
  },
  {
    id: 'huda-beauty-brown-rose',
    name: 'Power Bullet Matte Lipstick',
    brand: 'Huda Beauty',
    category: 'Lipstick',
    finish: 'Matte',
    hex: '#7A453B',
    price: 26,
    undertone: 'Warm',
    rating: 4.6,
    stock: 'In stock',
    description: 'Deep brown-red shade for a luxurious statement look.'
  },
  {
    id: 'makeup-forever-rose-cocoa',
    name: 'HD Skin Foundation',
    brand: 'MAKEUP FOREVER',
    category: 'Foundation',
    finish: 'Natural',
    hex: '#CF9B82',
    price: 43,
    undertone: 'Neutral',
    rating: 4.7,
    stock: 'In stock',
    description: 'Warm neutral beige with an elegant finish.'
  },
  {
    id: 'tom-ford-shadow-sand',
    name: 'Eye Color Quad',
    brand: 'Tom Ford',
    category: 'Eyeshadow',
    finish: 'Shimmer',
    hex: '#D7B8A7',
    price: 88,
    undertone: 'Warm',
    rating: 4.9,
    stock: 'Limited',
    description: 'Soft warm sand shimmer with sheen and dimension.'
  },
  {
    id: 'mac-caramel-satin',
    name: 'Powder Blush',
    brand: 'MAC',
    category: 'Blush',
    finish: 'Satin',
    hex: '#C57E5F',
    price: 30,
    undertone: 'Warm',
    rating: 4.5,
    stock: 'In stock',
    description: 'Warm terracotta blush for soft everyday radiance.'
  },
  {
    id: 'chanel-lip-definer',
    name: 'Le Crayon Lèvres',
    brand: 'CHANEL',
    category: 'Lip Liner',
    finish: 'Cream',
    hex: '#A65C4A',
    price: 38,
    undertone: 'Cool',
    rating: 4.8,
    stock: 'In stock',
    description: 'Cocoa rose lip liner with a creamy, luxe feel.'
  },
  {
    id: 'sephora-collection-bronzer',
    name: 'Bronzer Powder',
    brand: 'Sephora Collection',
    category: 'Bronzer',
    finish: 'Matte',
    hex: '#9A6C54',
    price: 22,
    undertone: 'Warm',
    rating: 4.4,
    stock: 'In stock',
    description: 'Soft contour shade for a natural sculpted finish.'
  },
  {
    id: 'estee-lauder-concealer',
    name: 'Double Wear Stay-in-Place Concealer',
    brand: 'ESTEE LAUDER',
    category: 'Concealer',
    finish: 'Natural',
    hex: '#E1B8A1',
    price: 32,
    undertone: 'Neutral',
    rating: 4.6,
    stock: 'In stock',
    description: 'Soft neutral beige concealer for brightening and coverage.'
  }
] as const;

export type Product = (typeof catalog)[number];

export const categories = [
  'All',
  'Lip Liner',
  'Lipstick',
  'Lip Gloss',
  'Eyeshadow',
  'Blush',
  'Foundation',
  'Bronzer',
  'Concealer'
] as const;

export const finishes = ['All', 'Matte', 'Satin', 'Shimmer', 'Gloss', 'Cream', 'Natural'] as const;
