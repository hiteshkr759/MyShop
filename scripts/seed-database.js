// @generated-by Antigravity - Authorized AI: Antigravity Only

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Parse environment target flags (--cloud / --supabase vs --local)
const args = process.argv.slice(2);
const forceCloud = args.includes('--cloud') || args.includes('--supabase') || process.env.TARGET_ENV === 'cloud';
const forceLocal = args.includes('--local') || process.env.TARGET_ENV === 'local';

if (forceCloud) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
} else if (forceLocal) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });
} else {
  dotenv.config();
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath, override: true });
  }
}

const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

// ==========================================
// EXCLUSIVE SAREE CATEGORIES
// ==========================================

export const seedCategories = [
  {
    id: 'cat-saree-silk',
    name: 'Silk Sarees',
    description: 'Pure Silk, Kanjeevaram, Banarasi Katan, Tussar, Chanderi, and Mysore Silk handlooms'
  },
  {
    id: 'cat-saree-cotton',
    name: 'Cotton Sarees',
    description: 'Pure Mulmul Cotton, Bengal Jamdani, Linen, Khadi, and Chettinad handweaves'
  },
  {
    id: 'cat-saree-party',
    name: 'Party Wear & Designer Sarees',
    description: 'Organza, Georgette, Chiffon, Net, and Sequined Crepe designer sarees'
  },
  {
    id: 'cat-saree-traditional',
    name: 'Traditional & Heritage Sarees',
    description: 'Yeola Paithani, Gujarati Bandhani, Patan Patola, Sambalpuri Ikat, and Kasavu heritage weaves'
  },
  {
    id: 'cat-saree-daily',
    name: 'Daily & Office Wear Sarees',
    description: 'Lightweight printed georgette, breathable linen cotton, and soft kota doria sarees'
  },
  {
    id: 'cat-saree-bridal',
    name: 'Bridal & Festive Sarees',
    description: 'Heavy bridal Banarasi, real gold zari Kanchipuram, and embroidered bridal silks'
  }
];

// ==========================================
// EXCLUSIVE SAREE PRODUCTS (+65% MARKUP: SP = CP * 1.65)
// ==========================================

export const seedProducts = [
  {
    id: 'saree-1',
    name: 'Banarasi Katan Silk Handloom Saree',
    categoryId: 'cat-saree-silk',
    costPrice: 5000,
    sellingPrice: 8250,
    price: 8250,
    stock: 6,
    fabric: 'Pure Katan Silk',
    weave: 'Banarasi Kadwa',
    color: 'Crimson Red & Antique Gold',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handwoven pure katan silk saree adorned with intricate floral zari jaal and regal pallu.',
    tags: 'silk,banarasi,handloom,kadwa,wedding',
    status: 'active'
  },
  {
    id: 'saree-2',
    name: 'Kanjeevaram Pure Zari Silk Saree',
    categoryId: 'cat-saree-silk',
    costPrice: 8000,
    sellingPrice: 13200,
    price: 13200,
    stock: 5,
    fabric: 'Mulberry Silk',
    weave: 'Kanjeevaram Korvai',
    color: 'Peacock Blue & Magenta',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Authentic Kanchipuram silk saree with contrasting korvai border and pure gold zari motifs.',
    tags: 'silk,kanjeevaram,korvai,temple-border,bridal',
    status: 'active'
  },
  {
    id: 'saree-3',
    name: 'Chanderi Handloom Cotton Silk Saree',
    categoryId: 'cat-saree-cotton',
    costPrice: 1800,
    sellingPrice: 2970,
    price: 2970,
    stock: 7,
    fabric: 'Cotton Silk',
    weave: 'Chanderi Handloom',
    color: 'Mint Green & Silver',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Lightweight and sheer Chanderi handloom saree featuring silver zari booti and soft drape.',
    tags: 'cotton-silk,chanderi,handloom,summer-wear,booti',
    status: 'active'
  },
  {
    id: 'saree-4',
    name: 'Floral Embroidered Organza Silk Saree',
    categoryId: 'cat-saree-party',
    costPrice: 2400,
    sellingPrice: 3960,
    price: 3960,
    stock: 5,
    fabric: 'Pure Organza',
    weave: 'Embroidered',
    color: 'Pastel Lavender',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Contemporary pastel organza saree featuring delicate floral thread embroidery and scalloped border.',
    tags: 'organza,party-wear,pastel,designer,embroidery',
    status: 'active'
  },
  {
    id: 'saree-5',
    name: 'Yeola Paithani Pure Silk Heritage Saree',
    categoryId: 'cat-saree-traditional',
    costPrice: 6500,
    sellingPrice: 10725,
    price: 10725,
    stock: 3,
    fabric: 'Pure Silk',
    weave: 'Yeola Paithani',
    color: 'Parrot Green & Royal Purple',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Authentic Maharashtrian Yeola Paithani saree with kaleidoscope peacock pallu and gold zari border.',
    tags: 'silk,paithani,heritage,traditional,peacock-pallu',
    status: 'active'
  },
  {
    id: 'saree-6',
    name: 'Dhakai Jamdani Handwoven Pure Cotton Saree',
    categoryId: 'cat-saree-cotton',
    costPrice: 1500,
    sellingPrice: 2475,
    price: 2475,
    stock: 5,
    fabric: 'Fine Cotton',
    weave: 'Dhakai Jamdani',
    color: 'Off-White & Scarlet Red',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Breathable Dhakai Jamdani cotton saree with geometric floral motifs hand-loomed with precision.',
    tags: 'cotton,jamdani,handloom,bengal-weave,traditional',
    status: 'active'
  },
  {
    id: 'saree-7',
    name: 'Traditional Bandhani Pure Georgette Saree',
    categoryId: 'cat-saree-traditional',
    costPrice: 3200,
    sellingPrice: 5280,
    price: 5280,
    stock: 4,
    fabric: 'Pure Georgette',
    weave: 'Traditional Bandhej',
    color: 'Royal Blue & Marigold Yellow',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Exquisite Jaipuri hand-tied bandhani dots across pure georgette fabric with rich zari gota patti border.',
    tags: 'georgette,bandhani,bandhej,gota-patti,rajasthani',
    status: 'active'
  },
  {
    id: 'saree-8',
    name: 'Tussar Silk Handloom Floral Saree',
    categoryId: 'cat-saree-silk',
    costPrice: 3800,
    sellingPrice: 6270,
    price: 6270,
    stock: 3,
    fabric: 'Wild Tussar Silk',
    weave: 'Handloom Weave',
    color: 'Natural Tussar Beige & Rust',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Textured wild tussar silk saree with earthy botanical prints and golden zari highlights.',
    tags: 'tussar,silk,handloom,floral,earthy',
    status: 'active'
  },
  {
    id: 'saree-9',
    name: 'Heavy Bridal Banarasi Katan Silk Saree',
    categoryId: 'cat-saree-bridal',
    costPrice: 9500,
    sellingPrice: 15675,
    price: 15675,
    stock: 3,
    fabric: 'Pure Katan Silk',
    weave: 'Banarasi Jangla',
    color: 'Sindoor Red & Pure Gold Jangla',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Imperial bridal Banarasi masterpiece with all-over intricate jangla gold zari weaving and heavy royal pallu.',
    tags: 'bridal,banarasi,katan-silk,wedding,jangla,gold-zari',
    status: 'active'
  },
  {
    id: 'saree-10',
    name: 'Printed Daily Wear Khadi Linen Saree',
    categoryId: 'cat-saree-daily',
    costPrice: 950,
    sellingPrice: 1567.5,
    price: 1567.5,
    stock: 7,
    fabric: 'Khadi Linen',
    weave: 'Handloom Weave',
    color: 'Indigo Blue & Geometric Print',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Soft, breathable pure khadi linen saree suited for office and daily casual elegance.',
    tags: 'khadi,linen,daily-wear,office-wear,breathable',
    status: 'active'
  }
];

// ==========================================
// SAREE COLOR VARIANTS WITH MULTI-PHOTO GALLERIES
// ==========================================

export const seedVariants = [
  // Saree 1 variants (Banarasi Katan Silk)
  {
    id: 'var-saree1-red',
    productId: 'saree-1',
    colorName: 'Crimson Red & Antique Gold',
    colorCode: '#8B0000',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree1-green',
    productId: 'saree-1',
    colorName: 'Royal Emerald Green',
    colorCode: '#046A38',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },
  {
    id: 'var-saree1-blue',
    productId: 'saree-1',
    colorName: 'Deep Royal Blue',
    colorCode: '#002366',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 2 variants (Kanjeevaram Pure Zari Silk)
  {
    id: 'var-saree2-blue',
    productId: 'saree-2',
    colorName: 'Peacock Blue & Magenta',
    colorCode: '#005F73',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree2-mustard',
    productId: 'saree-2',
    colorName: 'Sunset Mustard & Vermillion',
    colorCode: '#E0A96D',
    stock: 1,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },
  {
    id: 'var-saree2-gold',
    productId: 'saree-2',
    colorName: 'Temple Gold & Wine',
    colorCode: '#B8860B',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 3 variants (Chanderi Handloom)
  {
    id: 'var-saree3-mint',
    productId: 'saree-3',
    colorName: 'Mint Green & Silver',
    colorCode: '#98FF98',
    stock: 3,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree3-peach',
    productId: 'saree-3',
    colorName: 'Pastel Peach & Gold',
    colorCode: '#FFE5B4',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },
  {
    id: 'var-saree3-sky',
    productId: 'saree-3',
    colorName: 'Sky Blue & Pearl',
    colorCode: '#87CEEB',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 4 variants (Floral Organza)
  {
    id: 'var-saree4-lavender',
    productId: 'saree-4',
    colorName: 'Pastel Lavender',
    colorCode: '#E6E6FA',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree4-pink',
    productId: 'saree-4',
    colorName: 'Blush Powder Pink',
    colorCode: '#FFB6C1',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },
  {
    id: 'var-saree4-champagne',
    productId: 'saree-4',
    colorName: 'Champagne Gold',
    colorCode: '#F7E7CE',
    stock: 1,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 5 variants (Paithani)
  {
    id: 'var-saree5-green',
    productId: 'saree-5',
    colorName: 'Parrot Green & Royal Purple',
    colorCode: '#50C878',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree5-red',
    productId: 'saree-5',
    colorName: 'Ruby Red & Peacock Pallu',
    colorCode: '#9B111E',
    stock: 1,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 6 variants (Dhakai Jamdani)
  {
    id: 'var-saree6-white',
    productId: 'saree-6',
    colorName: 'Off-White & Scarlet Red',
    colorCode: '#FAF9F6',
    stock: 3,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree6-black',
    productId: 'saree-6',
    colorName: 'Midnight Black & Silver Zari',
    colorCode: '#1B1B1B',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 7 variants (Bandhani)
  {
    id: 'var-saree7-blue',
    productId: 'saree-7',
    colorName: 'Royal Blue & Marigold Yellow',
    colorCode: '#4169E1',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree7-pink',
    productId: 'saree-7',
    colorName: 'Rani Pink & Orange Bandhej',
    colorCode: '#E4007C',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 8 variants (Tussar Silk)
  {
    id: 'var-saree8-beige',
    productId: 'saree-8',
    colorName: 'Natural Tussar Beige & Rust',
    colorCode: '#D2B48C',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree8-ochre',
    productId: 'saree-8',
    colorName: 'Mustard Ochre & Olive',
    colorCode: '#C68642',
    stock: 1,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 9 variants (Bridal Banarasi)
  {
    id: 'var-saree9-vermillion',
    productId: 'saree-9',
    colorName: 'Sindoor Red & Pure Gold Jangla',
    colorCode: '#E34234',
    stock: 2,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree9-plum',
    productId: 'saree-9',
    colorName: 'Royal Plum & Antique Zari',
    colorCode: '#4A0E2E',
    stock: 1,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  },

  // Saree 10 variants (Daily Khadi Linen)
  {
    id: 'var-saree10-indigo',
    productId: 'saree-10',
    colorName: 'Indigo Blue & Geometric Print',
    colorCode: '#4B0082',
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: true
  },
  {
    id: 'var-saree10-terracotta',
    productId: 'saree-10',
    colorName: 'Terracotta Earth & Beige',
    colorCode: '#E2725B',
    stock: 3,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    isDefault: false
  }
];

// ==========================================
// SAREE CUSTOMERS & SAMPLE ORDERS
// ==========================================

export const seedCustomers = [
  {
    id: 'cust-101',
    name: 'Priya Sharma',
    phoneNumber: '+919876543210',
    address: 'Flat 402, Lotus Residency, 14th Main Road',
    area: 'Indiranagar, Bengaluru'
  },
  {
    id: 'cust-102',
    name: 'Ananya Iyer',
    phoneNumber: '+919812345678',
    address: 'No. 27, Temple View Apartments, Mylapore',
    area: 'Mylapore, Chennai'
  },
  {
    id: 'cust-103',
    name: 'Sneha Patel',
    phoneNumber: '+919898765432',
    address: 'B-12, Shanti Kunj, Near Law Garden',
    area: 'Ellisbridge, Ahmedabad'
  },
  {
    id: 'cust-104',
    name: 'Ritu Banerjee',
    phoneNumber: '+919830123456',
    address: '78A, Southern Avenue, Lake Market',
    area: 'South Kolkata, Kolkata'
  }
];

export const seedOrders = [
  {
    id: 'ord-test-101',
    customerId: 'cust-101',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    customerPhone: '+919876543210',
    deliveryAddress: 'Flat 402, Lotus Residency, 14th Main Road',
    deliveryArea: 'Indiranagar, Bengaluru',
    totalAmount: 8250.0,
    status: 'delivered',
    items: [
      {
        id: 'item-101-1',
        productId: 'saree-1',
        variantId: 'var-saree1-red',
        colorName: 'Crimson Red & Antique Gold',
        quantity: 1,
        unitPrice: 8250.0,
        itemTotal: 8250.0
      }
    ]
  },
  {
    id: 'ord-test-102',
    customerId: 'cust-101',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@example.com',
    customerPhone: '+919876543210',
    deliveryAddress: 'Flat 402, Lotus Residency, 14th Main Road',
    deliveryArea: 'Indiranagar, Bengaluru',
    totalAmount: 2970.0,
    status: 'confirmed',
    items: [
      {
        id: 'item-102-1',
        productId: 'saree-3',
        variantId: 'var-saree3-mint',
        colorName: 'Mint Green & Silver',
        quantity: 1,
        unitPrice: 2970.0,
        itemTotal: 2970.0
      }
    ]
  },
  {
    id: 'ord-test-103',
    customerId: 'cust-102',
    customerName: 'Ananya Iyer',
    customerEmail: 'ananya.iyer@example.com',
    customerPhone: '+919812345678',
    deliveryAddress: 'No. 27, Temple View Apartments, Mylapore',
    deliveryArea: 'Mylapore, Chennai',
    totalAmount: 13200.0,
    status: 'processing',
    items: [
      {
        id: 'item-103-1',
        productId: 'saree-2',
        variantId: 'var-saree2-blue',
        colorName: 'Peacock Blue & Magenta',
        quantity: 1,
        unitPrice: 13200.0,
        itemTotal: 13200.0
      }
    ]
  },
  {
    id: 'ord-test-104',
    customerId: 'cust-103',
    customerName: 'Sneha Patel',
    customerEmail: 'sneha.patel@example.com',
    customerPhone: '+919898765432',
    deliveryAddress: 'B-12, Shanti Kunj, Near Law Garden',
    deliveryArea: 'Ellisbridge, Ahmedabad',
    totalAmount: 3960.0,
    status: 'delivered',
    items: [
      {
        id: 'item-104-1',
        productId: 'saree-4',
        variantId: 'var-saree4-lavender',
        colorName: 'Pastel Lavender',
        quantity: 1,
        unitPrice: 3960.0,
        itemTotal: 3960.0
      }
    ]
  }
];

// ==========================================
// SEED EXECUTION LOGIC
// ==========================================

async function seedDatabase() {
  const isLocalhost = (process.env.DATABASE_URL || '').includes('localhost') || (process.env.DATABASE_URL || '').includes('127.0.0.1');
  const targetLabel = isLocalhost ? 'LOCAL POSTGRESQL' : 'SUPABASE CLOUD';

  console.log(`====================================================`);
  console.log(`🚀 STARTING SAREE-ONLY DATABASE SEEDING PROCESS`);
  console.log(`🌍 Target Environment: ${targetLabel}`);
  console.log(`🔗 Database URL Host: ${(process.env.DATABASE_URL || '').split('@')[1] || 'localhost'}`);
  console.log(`====================================================\n`);

  try {
    // 0. CLEANUP: Soft-archive non-saree legacy seed data under Zero-Deletion Policy
    console.log(`🧹 [0/5] Archiving non-saree legacy seed items...`);
    const archivedCategories = await prisma.category.updateMany({
      where: {
        OR: [
          { id: { in: ['cat-1', 'cat-2', 'cat-3', 'cat-4'] } },
          { name: { in: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books'] } }
        ]
      },
      data: { deletedAt: new Date() }
    });
    console.log(`   ✓ Soft-archived ${archivedCategories.count} non-saree categories`);

    const archivedProducts = await prisma.product.updateMany({
      where: {
        OR: [
          { id: { in: ['prod-1', 'prod-2', 'prod-3', 'prod-4'] } },
          { name: { in: [
            'Wireless Noise-Canceling Headphones',
            'Ergonomic Mechanical Keyboard',
            'Classic Organic Cotton T-Shirt',
            'Stainless Steel Insulated Water Bottle (750ml)'
          ] } }
        ]
      },
      data: {
        status: 'archived',
        deletedAt: new Date()
      }
    });
    console.log(`   ✓ Soft-archived ${archivedProducts.count} non-saree products`);

    // 1. Seed Saree Categories
    console.log(`\n📦 [1/5] Seeding ${seedCategories.length} Saree Categories...`);
    for (const cat of seedCategories) {
      const record = await prisma.category.upsert({
        where: { id: cat.id },
        update: {
          name: cat.name,
          description: cat.description,
          deletedAt: null
        },
        create: {
          id: cat.id,
          name: cat.name,
          description: cat.description
        }
      });
      console.log(`   ✓ Category: ${record.name} (${record.id})`);
    }

    // 2. Seed Saree Products
    console.log(`\n👗 [2/5] Seeding ${seedProducts.length} Saree Products (+65% Markup)...`);
    for (const prod of seedProducts) {
      const record = await prisma.product.upsert({
        where: { id: prod.id },
        update: {
          name: prod.name,
          categoryId: prod.categoryId,
          costPrice: prod.costPrice,
          sellingPrice: prod.sellingPrice,
          price: prod.price,
          stock: prod.stock,
          description: prod.description || null,
          fabric: prod.fabric || null,
          weave: prod.weave || null,
          color: prod.color || null,
          blousePiece: prod.blousePiece !== undefined ? prod.blousePiece : true,
          imageUrl: prod.imageUrl || null,
          images: Array.isArray(prod.images) ? prod.images : (prod.imageUrl ? [prod.imageUrl] : []),
          tags: prod.tags || null,
          status: 'active',
          deletedAt: null
        },
        create: {
          id: prod.id,
          name: prod.name,
          categoryId: prod.categoryId,
          costPrice: prod.costPrice,
          sellingPrice: prod.sellingPrice,
          price: prod.price,
          stock: prod.stock,
          description: prod.description || null,
          fabric: prod.fabric || null,
          weave: prod.weave || null,
          color: prod.color || null,
          blousePiece: prod.blousePiece !== undefined ? prod.blousePiece : true,
          imageUrl: prod.imageUrl || null,
          images: Array.isArray(prod.images) ? prod.images : (prod.imageUrl ? [prod.imageUrl] : []),
          tags: prod.tags || null,
          status: 'active',
          deletedAt: null
        }
      });
      console.log(`   ✓ Saree: ${record.name} | CP: ₹${record.costPrice} | SP: ₹${record.sellingPrice} (+65%)`);
    }

    // 3. Seed Color Variants with Multi-Photo Galleries
    console.log(`\n🎨 [3/5] Seeding ${seedVariants.length} Saree Colorways & Photo Galleries...`);
    for (const v of seedVariants) {
      const variantRecord = await prisma.productVariant.upsert({
        where: {
          productId_colorName: {
            productId: v.productId,
            colorName: v.colorName
          }
        },
        update: {
          colorCode: v.colorCode,
          stock: v.stock,
          images: v.images,
          isDefault: v.isDefault,
          status: 'active',
          deletedAt: null
        },
        create: {
          id: v.id,
          productId: v.productId,
          colorName: v.colorName,
          colorCode: v.colorCode,
          stock: v.stock,
          images: v.images,
          isDefault: v.isDefault,
          status: 'active'
        }
      });
      console.log(`   ✓ Color: ${variantRecord.colorName} (${variantRecord.colorCode}) | Stock: ${variantRecord.stock} | Photos: ${variantRecord.images.length}`);
    }

    // 4. Seed Saree Customers
    console.log(`\n👥 [4/5] Seeding ${seedCustomers.length} Saree Customers...`);
    for (const cust of seedCustomers) {
      const record = await prisma.customer.upsert({
        where: { phoneNumber: cust.phoneNumber },
        update: {
          name: cust.name,
          address: cust.address,
          area: cust.area,
          deletedAt: null
        },
        create: {
          id: cust.id,
          name: cust.name,
          phoneNumber: cust.phoneNumber,
          address: cust.address,
          area: cust.area
        }
      });
      console.log(`   ✓ Customer: ${record.name} | Phone: ${record.phoneNumber} | Area: ${record.area}`);
    }

    // 5. Seed Saree Orders & Items
    console.log(`\n🧾 [5/5] Seeding ${seedOrders.length} Saree Orders & Item Lines...`);
    for (const ord of seedOrders) {
      const { items, ...orderData } = ord;

      let effectiveCustomerId = orderData.customerId;
      if (orderData.customerPhone) {
        const foundCustomer = await prisma.customer.findUnique({
          where: { phoneNumber: orderData.customerPhone }
        });
        if (foundCustomer) {
          effectiveCustomerId = foundCustomer.id;
        }
      }

      const orderRecord = await prisma.order.upsert({
        where: { id: orderData.id },
        update: {
          customerId: effectiveCustomerId,
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          customerPhone: orderData.customerPhone,
          deliveryAddress: orderData.deliveryAddress,
          deliveryArea: orderData.deliveryArea,
          totalAmount: orderData.totalAmount,
          status: orderData.status,
          deletedAt: null
        },
        create: {
          id: orderData.id,
          customerId: effectiveCustomerId,
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          customerPhone: orderData.customerPhone,
          deliveryAddress: orderData.deliveryAddress,
          deliveryArea: orderData.deliveryArea,
          totalAmount: orderData.totalAmount,
          status: orderData.status
        }
      });

      for (const item of items) {
        await prisma.orderItem.upsert({
          where: { id: item.id },
          update: {
            orderId: orderRecord.id,
            productId: item.productId,
            variantId: item.variantId || null,
            colorName: item.colorName || null,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            itemTotal: item.itemTotal
          },
          create: {
            id: item.id,
            orderId: orderRecord.id,
            productId: item.productId,
            variantId: item.variantId || null,
            colorName: item.colorName || null,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            itemTotal: item.itemTotal
          }
        });
      }

      console.log(`   ✓ Order ${orderRecord.id}: Customer: ${orderRecord.customerName} | Saree Total: ₹${orderRecord.totalAmount} | Status: ${orderRecord.status}`);
    }

    // Active counts verification
    const activeCategories = await prisma.category.count({ where: { deletedAt: null } });
    const activeProducts = await prisma.product.count({ where: { deletedAt: null, status: 'active' } });
    const activeVariants = await prisma.productVariant.count({ where: { deletedAt: null, status: 'active' } });

    console.log(`\n====================================================`);
    console.log(`🎉 SAREE SEEDING COMPLETED SUCCESSFULLY!`);
    console.log(`📊 Active Saree Entities in ${targetLabel}:`);
    console.log(`   - Active Saree Categories: ${activeCategories}`);
    console.log(`   - Active Saree Products:   ${activeProducts}`);
    console.log(`   - Active Colorways:        ${activeVariants}`);
    console.log(`   - Customers:               ${await prisma.customer.count()}`);
    console.log(`   - Orders:                  ${await prisma.order.count()}`);
    console.log(`   - OrderItems:              ${await prisma.orderItem.count()}`);
    console.log(`====================================================\n`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed with error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
