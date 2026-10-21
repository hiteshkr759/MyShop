// @generated-by Antigravity - Authorized AI: Antigravity Only
export const initialCategories = [
  { id: 'cat-1', name: 'Electronics', description: 'Gadgets, devices, and accessories' },
  { id: 'cat-2', name: 'Clothing', description: 'Men, women, and kids apparel' },
  { id: 'cat-3', name: 'Home & Kitchen', description: 'Appliances, decor, and cookware' },
  { id: 'cat-4', name: 'Books', description: 'Fiction, non-fiction, and educational' },
  // Saree Reselling Categories
  { id: 'cat-saree-silk', name: 'Silk Sarees', description: 'Pure Silk, Kanjeevaram, Banarasi Katan, Tussar, and Chanderi handlooms' },
  { id: 'cat-saree-cotton', name: 'Cotton Sarees', description: 'Pure Cotton, Mulmul, Linen, Khadi, Jamdani handweaves' },
  { id: 'cat-saree-party', name: 'Party Wear Sarees', description: 'Organza, Georgette, Chiffon, Net, and Crepe designer sarees' },
  { id: 'cat-saree-traditional', name: 'Traditional Sarees', description: 'Paithani, Bandhani, Patola, Sambalpuri, Kasavu heritage weaves' }
];

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Wireless Noise-Canceling Headphones',
    categoryId: 'cat-1',
    costPrice: 90.9,
    sellingPrice: 149.99,
    price: 149.99,
    stock: 25,
    description: 'High-fidelity audio with active noise cancellation.',
    tags: ['audio', 'wireless', 'bluetooth']
  },
  {
    id: 'prod-2',
    name: 'Ergonomic Mechanical Keyboard',
    categoryId: 'cat-1',
    costPrice: 54.54,
    sellingPrice: 89.99,
    price: 89.99,
    stock: 40,
    description: 'Compact mechanical keyboard with RGB backlighting.',
    tags: ['keyboard', 'pc', 'gaming']
  },
  {
    id: 'prod-3',
    name: 'Classic Organic Cotton T-Shirt',
    categoryId: 'cat-2',
    costPrice: 15.15,
    sellingPrice: 25,
    price: 24.99,
    stock: 100,
    description: 'Comfortable, breathable 100% organic cotton t-shirt.',
    tags: ['apparel', 'cotton', 'casual']
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel Insulated Water Bottle (750ml)',
    categoryId: 'cat-3',
    costPrice: 12.12,
    sellingPrice: 20,
    price: 19.99,
    stock: 60,
    description: 'Keeps drinks cold for 24 hours or hot for 12 hours.',
    tags: ['drinkware', 'kitchen', 'eco-friendly']
  },
  // Saree Reselling Catalog (+65% Markup Formula: SP = CP * 1.65)
  {
    id: 'saree-1',
    name: 'Banarasi Katan Silk Handloom Saree',
    categoryId: 'cat-saree-silk',
    costPrice: 5000,
    sellingPrice: 8250, // 5000 * 1.65
    price: 8250,
    stock: 1, // Single-piece exclusive design
    fabric: 'Pure Katan Silk',
    weave: 'Banarasi Kadwa',
    color: 'Crimson Red & Antique Gold',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
    description: 'Handwoven pure katan silk saree adorned with intricate floral zari jaal and regal pallu.',
    tags: ['silk', 'banarasi', 'handloom', 'bridal', 'wedding']
  },
  {
    id: 'saree-2',
    name: 'Kanjeevaram Pure Zari Silk Saree',
    categoryId: 'cat-saree-silk',
    costPrice: 8000,
    sellingPrice: 13200, // 8000 * 1.65
    price: 13200,
    stock: 1,
    fabric: 'Mulberry Silk',
    weave: 'Kanjeevaram Korvai',
    color: 'Peacock Blue & Magenta',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'],
    description: 'Authentic Kanchipuram silk saree with contrasting korvai border and pure gold zari motifs.',
    tags: ['silk', 'kanjeevaram', 'temple-border', 'bridal']
  },
  {
    id: 'saree-3',
    name: 'Chanderi Handloom Cotton Silk Saree',
    categoryId: 'cat-saree-cotton',
    costPrice: 1800,
    sellingPrice: 2970, // 1800 * 1.65
    price: 2970,
    stock: 3,
    fabric: 'Cotton Silk',
    weave: 'Chanderi Handloom',
    color: 'Mint Green & Silver',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'],
    description: 'Lightweight and sheer Chanderi handloom saree featuring silver zari booti and soft drape.',
    tags: ['cotton-silk', 'chanderi', 'handloom', 'summer-wear']
  },
  {
    id: 'saree-4',
    name: 'Floral Embroidered Organza Silk Saree',
    categoryId: 'cat-saree-party',
    costPrice: 2400,
    sellingPrice: 3960, // 2400 * 1.65
    price: 3960,
    stock: 2,
    fabric: 'Pure Organza',
    weave: 'Embroidered',
    color: 'Pastel Lavender',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'],
    description: 'Contemporary pastel organza saree featuring delicate floral thread embroidery and scalloped border.',
    tags: ['organza', 'party-wear', 'pastel', 'designer']
  }
];

export const initialOrders = [
  {
    id: 'ord-1001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    items: [
      { productId: 'prod-1', quantity: 1, unitPrice: 149.99 }
    ],
    totalAmount: 149.99,
    status: 'completed',
    createdAt: new Date().toISOString()
  }
];
