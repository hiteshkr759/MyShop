export const initialCategories = [
  { id: 'cat-1', name: 'Electronics', description: 'Gadgets, devices, and accessories' },
  { id: 'cat-2', name: 'Clothing', description: 'Men, women, and kids apparel' },
  { id: 'cat-3', name: 'Home & Kitchen', description: 'Appliances, decor, and cookware' },
  { id: 'cat-4', name: 'Books', description: 'Fiction, non-fiction, and educational' }
];

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Wireless Noise-Canceling Headphones',
    categoryId: 'cat-1',
    price: 149.99,
    stock: 25,
    description: 'High-fidelity audio with active noise cancellation.',
    tags: ['audio', 'wireless', 'bluetooth']
  },
  {
    id: 'prod-2',
    name: 'Ergonomic Mechanical Keyboard',
    categoryId: 'cat-1',
    price: 89.99,
    stock: 40,
    description: 'Compact mechanical keyboard with RGB backlighting.',
    tags: ['keyboard', 'pc', 'gaming']
  },
  {
    id: 'prod-3',
    name: 'Classic Organic Cotton T-Shirt',
    categoryId: 'cat-2',
    price: 24.99,
    stock: 100,
    description: 'Comfortable, breathable 100% organic cotton t-shirt.',
    tags: ['apparel', 'cotton', 'casual']
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel Insulated Water Bottle (750ml)',
    categoryId: 'cat-3',
    price: 19.99,
    stock: 60,
    description: 'Keeps drinks cold for 24 hours or hot for 12 hours.',
    tags: ['drinkware', 'kitchen', 'eco-friendly']
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
