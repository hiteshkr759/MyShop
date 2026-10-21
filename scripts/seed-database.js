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
  // Default: load .env, override with .env.local if present
  dotenv.config();
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath, override: true });
  }
}

const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

// ==========================================
// TEST DATA DEFINITIONS
// ==========================================

export const seedCategories = [
  // Saree Reselling Categories
  {
    id: 'cat-saree-silk',
    name: 'Silk Sarees',
    description: 'Pure Silk, Kanjeevaram, Banarasi Katan, Tussar, and Chanderi handlooms'
  },
  {
    id: 'cat-saree-cotton',
    name: 'Cotton Sarees',
    description: 'Pure Cotton, Mulmul, Linen, Khadi, Jamdani handweaves'
  },
  {
    id: 'cat-saree-party',
    name: 'Party Wear Sarees',
    description: 'Organza, Georgette, Chiffon, Net, and Crepe designer sarees'
  },
  {
    id: 'cat-saree-traditional',
    name: 'Traditional Sarees',
    description: 'Paithani, Bandhani, Patola, Sambalpuri, Kasavu heritage weaves'
  },
  // General E-Commerce Categories
  {
    id: 'cat-1',
    name: 'Electronics',
    description: 'Gadgets, devices, and accessories'
  },
  {
    id: 'cat-2',
    name: 'Clothing',
    description: 'Men, women, and kids apparel'
  },
  {
    id: 'cat-3',
    name: 'Home & Kitchen',
    description: 'Appliances, decor, and cookware'
  },
  {
    id: 'cat-4',
    name: 'Books',
    description: 'Fiction, non-fiction, and educational'
  }
];

export const seedProducts = [
  // Sarees (+65% Markup Formula: SP = CP * 1.65)
  {
    id: 'saree-1',
    name: 'Banarasi Katan Silk Handloom Saree',
    categoryId: 'cat-saree-silk',
    costPrice: 5000,
    sellingPrice: 8250,
    price: 8250,
    stock: 1,
    fabric: 'Pure Katan Silk',
    weave: 'Banarasi Kadwa',
    color: 'Crimson Red & Antique Gold',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
    description: 'Handwoven pure katan silk saree adorned with intricate floral zari jaal and regal pallu.',
    tags: 'silk,banarasi,handloom,bridal,wedding',
    status: 'active'
  },
  {
    id: 'saree-2',
    name: 'Kanjeevaram Pure Zari Silk Saree',
    categoryId: 'cat-saree-silk',
    costPrice: 8000,
    sellingPrice: 13200,
    price: 13200,
    stock: 1,
    fabric: 'Mulberry Silk',
    weave: 'Kanjeevaram Korvai',
    color: 'Peacock Blue & Magenta',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'],
    description: 'Authentic Kanchipuram silk saree with contrasting korvai border and pure gold zari motifs.',
    tags: 'silk,kanjeevaram,temple-border,bridal',
    status: 'active'
  },
  {
    id: 'saree-3',
    name: 'Chanderi Handloom Cotton Silk Saree',
    categoryId: 'cat-saree-cotton',
    costPrice: 1800,
    sellingPrice: 2970,
    price: 2970,
    stock: 3,
    fabric: 'Cotton Silk',
    weave: 'Chanderi Handloom',
    color: 'Mint Green & Silver',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'],
    description: 'Lightweight and sheer Chanderi handloom saree featuring silver zari booti and soft drape.',
    tags: 'cotton-silk,chanderi,handloom,summer-wear',
    status: 'active'
  },
  {
    id: 'saree-4',
    name: 'Floral Embroidered Organza Silk Saree',
    categoryId: 'cat-saree-party',
    costPrice: 2400,
    sellingPrice: 3960,
    price: 3960,
    stock: 2,
    fabric: 'Pure Organza',
    weave: 'Embroidered',
    color: 'Pastel Lavender',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'],
    description: 'Contemporary pastel organza saree featuring delicate floral thread embroidery and scalloped border.',
    tags: 'organza,party-wear,pastel,designer',
    status: 'active'
  },
  {
    id: 'saree-5',
    name: 'Paithani Pure Silk Heritage Saree',
    categoryId: 'cat-saree-traditional',
    costPrice: 6500,
    sellingPrice: 10725,
    price: 10725,
    stock: 1,
    fabric: 'Pure Silk',
    weave: 'Yeola Paithani',
    color: 'Emerald Green & Gold',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
    description: 'Authentic Maharashtrian Yeola Paithani saree with kaleidoscope peacock pallu and gold zari border.',
    tags: 'silk,paithani,heritage,traditional,wedding',
    status: 'active'
  },
  {
    id: 'saree-6',
    name: 'Jamdani Handwoven Pure Cotton Saree',
    categoryId: 'cat-saree-cotton',
    costPrice: 1500,
    sellingPrice: 2475,
    price: 2475,
    stock: 4,
    fabric: 'Fine Cotton',
    weave: 'Dhakai Jamdani',
    color: 'Off-White & Red',
    blousePiece: true,
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'],
    description: 'Breathable Dhakai Jamdani cotton saree with geometric floral motifs hand-loomed with precision.',
    tags: 'cotton,jamdani,handloom,bengal-weave',
    status: 'active'
  },
  // General Catalog Products
  {
    id: 'prod-1',
    name: 'Wireless Noise-Canceling Headphones',
    categoryId: 'cat-1',
    costPrice: 90.9,
    sellingPrice: 149.99,
    price: 149.99,
    stock: 25,
    description: 'High-fidelity audio with active noise cancellation.',
    tags: 'audio,wireless,bluetooth',
    status: 'active'
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
    tags: 'keyboard,pc,gaming',
    status: 'active'
  },
  {
    id: 'prod-3',
    name: 'Classic Organic Cotton T-Shirt',
    categoryId: 'cat-2',
    costPrice: 15.15,
    sellingPrice: 25.0,
    price: 25.0,
    stock: 100,
    description: 'Comfortable, breathable 100% organic cotton t-shirt.',
    tags: 'apparel,cotton,casual',
    status: 'active'
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel Insulated Water Bottle (750ml)',
    categoryId: 'cat-3',
    costPrice: 12.12,
    sellingPrice: 20.0,
    price: 20.0,
    stock: 60,
    description: 'Keeps drinks cold for 24 hours or hot for 12 hours.',
    tags: 'drinkware,kitchen,eco-friendly',
    status: 'active'
  }
];

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
        quantity: 1,
        unitPrice: 8250.0,
        itemTotal: 8250.0
      }
    ]
  },
  {
    id: 'ord-test-102',
    customerId: 'cust-101', // Second order for Priya to demonstrate past order history
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
  console.log(`🚀 STARTING DATABASE SEEDING PROCESS`);
  console.log(`🌍 Target Environment: ${targetLabel}`);
  console.log(`🔗 Database URL Host: ${(process.env.DATABASE_URL || '').split('@')[1] || 'localhost'}`);
  console.log(`====================================================\n`);

  try {
    // 1. Seed Categories
    console.log(`📦 [1/4] Seeding ${seedCategories.length} Categories...`);
    for (const cat of seedCategories) {
      const record = await prisma.category.upsert({
        where: { name: cat.name },
        update: {
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

    // 2. Seed Products
    console.log(`\n👗 [2/4] Seeding ${seedProducts.length} Products (Sarees + Catalog)...`);
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
          status: prod.status || 'active',
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
          status: prod.status || 'active',
          deletedAt: null
        }
      });
      console.log(`   ✓ Product: ${record.name} | CP: ₹${record.costPrice} | SP: ₹${record.sellingPrice} (+65%)`);
    }

    // 3. Seed Customers
    console.log(`\n👥 [3/4] Seeding ${seedCustomers.length} Customers...`);
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

    // 4. Seed Orders & Items
    console.log(`\n🧾 [4/4] Seeding ${seedOrders.length} Orders & Order Items...`);
    for (const ord of seedOrders) {
      const { items, ...orderData } = ord;

      const orderRecord = await prisma.order.upsert({
        where: { id: orderData.id },
        update: {
          customerId: orderData.customerId,
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
          customerId: orderData.customerId,
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
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            itemTotal: item.itemTotal
          },
          create: {
            id: item.id,
            orderId: orderRecord.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            itemTotal: item.itemTotal
          }
        });
      }

      console.log(`   ✓ Order ${orderRecord.id}: Customer: ${orderRecord.customerName} | Total: ₹${orderRecord.totalAmount} | Status: ${orderRecord.status}`);
    }

    // 5. Verification & Record Counts
    console.log(`\n====================================================`);
    console.log(`🎉 SEEDING COMPLETED SUCCESSFULLY!`);
    console.log(`📊 Synchronized Table Counts in ${targetLabel}:`);
    console.log(`   - Categories: ${await prisma.category.count()}`);
    console.log(`   - Products:   ${await prisma.product.count()}`);
    console.log(`   - Customers:  ${await prisma.customer.count()}`);
    console.log(`   - Orders:     ${await prisma.order.count()}`);
    console.log(`   - OrderItems: ${await prisma.orderItem.count()}`);
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

