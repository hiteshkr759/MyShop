// @generated-by Antigravity - Authorized AI: Antigravity Only

import { getDatabase } from '../src/bootstrap/database.js';
import { initialCategories, initialProducts } from '../src/data/mockData.js';

async function seedSarees() {
  const db = getDatabase();
  console.log('Seeding saree categories and products to Supabase...');

  // Upsert categories
  for (const cat of initialCategories) {
    const upsertedCat = await db.category.upsert({
      where: { name: cat.name },
      update: {
        description: cat.description
      },
      create: {
        id: cat.id,
        name: cat.name,
        description: cat.description
      }
    });
    console.log(`Category: ${upsertedCat.name} (${upsertedCat.id})`);
  }

  // Upsert products
  for (const prod of initialProducts) {
    const costPrice = prod.costPrice !== undefined ? prod.costPrice : Number((prod.price / 1.65).toFixed(2));
    const sellingPrice = prod.sellingPrice !== undefined ? prod.sellingPrice : prod.price;

    const upsertedProd = await db.product.upsert({
      where: { id: prod.id },
      update: {
        costPrice,
        sellingPrice,
        price: sellingPrice,
        fabric: prod.fabric || null,
        weave: prod.weave || null,
        color: prod.color || null,
        blousePiece: prod.blousePiece !== undefined ? prod.blousePiece : true,
        imageUrl: prod.imageUrl || null,
        images: Array.isArray(prod.images) ? prod.images : (prod.imageUrl ? [prod.imageUrl] : []),
        status: 'active',
        deletedAt: null
      },
      create: {
        id: prod.id,
        name: prod.name,
        categoryId: prod.categoryId,
        costPrice,
        sellingPrice,
        price: sellingPrice,
        stock: prod.stock !== undefined ? prod.stock : 1,
        fabric: prod.fabric || null,
        weave: prod.weave || null,
        color: prod.color || null,
        blousePiece: prod.blousePiece !== undefined ? prod.blousePiece : true,
        imageUrl: prod.imageUrl || null,
        images: Array.isArray(prod.images) ? prod.images : (prod.imageUrl ? [prod.imageUrl] : []),
        status: 'active',
        deletedAt: null,
        description: prod.description || '',
        tags: Array.isArray(prod.tags) ? prod.tags.join(',') : (prod.tags || ''),
        status: 'active'
      }
    });
    console.log(`Product: ${upsertedProd.name} | CP: ₹${upsertedProd.costPrice} | SP: ₹${upsertedProd.sellingPrice} (+65%)`);
  }

  console.log('Saree seeding completed successfully!');
  process.exit(0);
}

seedSarees().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});

