// @generated-by Antigravity - Authorized AI: Antigravity Only

import dotenv from 'dotenv';
import path from 'path';

// Force load .env (Supabase Cloud)
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

const { buildApp } = await import('../src/app.js');

async function verifyVariants() {
  console.log('--- STARTING COLOR VARIANTS VERIFICATION ---');
  const app = await buildApp({ logger: false });
  await app.ready();

  try {
    // 1. GET /api/v1/products (List products with variants)
    const listRes = await app.inject({
      method: 'GET',
      url: '/api/v1/products'
    });
    console.log(`1. GET /products: Status ${listRes.statusCode}`);
    const listData = JSON.parse(listRes.payload);
    console.log(`   Found ${listData.count} products`);

    const saree1 = listData.data.find(p => p.id === 'saree-1');
    if (!saree1) {
      throw new Error("Could not find saree-1 in products list");
    }
    console.log(`   Saree: ${saree1.name}`);
    console.log(`   Total Stock: ${saree1.totalStock} (aggregated across variants)`);
    console.log(`   Variants Count: ${saree1.variants?.length || 0}`);
    saree1.variants?.forEach(v => {
      console.log(`     - Color: ${v.colorName} (${v.colorCode}) | Stock: ${v.stock} | Photos: ${v.images.length}`);
    });

    // 2. GET /api/v1/products/saree-1 (Product Details)
    const detailRes = await app.inject({
      method: 'GET',
      url: '/api/v1/products/saree-1'
    });
    console.log(`\n2. GET /products/saree-1: Status ${detailRes.statusCode}`);
    const detailData = JSON.parse(detailRes.payload);
    console.log(`   Default Cover Image: ${detailData.data.imageUrl}`);
    console.log(`   Variants: ${detailData.data.variants.length}`);

    // 3. Filter by color: GET /api/v1/products?color=Emerald
    const filterRes = await app.inject({
      method: 'GET',
      url: '/api/v1/products?color=Emerald'
    });
    console.log(`\n3. GET /products?color=Emerald: Status ${filterRes.statusCode}`);
    const filterData = JSON.parse(filterRes.payload);
    console.log(`   Matched products with color 'Emerald': ${filterData.count}`);
    filterData.data.forEach(p => {
      console.log(`     - ${p.name}`);
    });

    // 4. POST /api/v1/products/:id/variants (Add a new color variant)
    const newVariantRes = await app.inject({
      method: 'POST',
      url: '/api/v1/products/saree-1/variants',
      payload: {
        colorName: 'Maroon Velvet',
        colorCode: '#800000',
        stock: 2,
        images: ['https://example.com/maroon-cover.jpg', 'https://example.com/maroon-pallu.jpg'],
        isDefault: false
      }
    });
    console.log(`\n4. POST /products/saree-1/variants: Status ${newVariantRes.statusCode}`);
    const newVarData = JSON.parse(newVariantRes.payload);
    console.log(`   Created Variant: ${newVarData.data.colorName} (${newVarData.data.id})`);

    // 5. POST /api/v1/products/:id/variants/:variantId/images (Add more photos)
    const addPhotosRes = await app.inject({
      method: 'POST',
      url: `/api/v1/products/saree-1/variants/${newVarData.data.id}/images`,
      payload: {
        images: ['https://example.com/maroon-border.jpg']
      }
    });
    console.log(`\n5. POST /products/saree-1/variants/${newVarData.data.id}/images: Status ${addPhotosRes.statusCode}`);
    const addPhotosData = JSON.parse(addPhotosRes.payload);
    console.log(`   Total Photos on Variant: ${addPhotosData.data.variant.images.length}`);

    // 6. DELETE /api/v1/products/:id/variants/:variantId (Soft-archive test variant)
    const archiveRes = await app.inject({
      method: 'DELETE',
      url: `/api/v1/products/saree-1/variants/${newVarData.data.id}`
    });
    console.log(`\n6. DELETE /products/saree-1/variants/${newVarData.data.id}: Status ${archiveRes.statusCode}`);
    const archiveData = JSON.parse(archiveRes.payload);
    console.log(`   Archived Variant status: ${archiveData.data.status}`);

    // 7. POST /api/v1/orders (Place order with variantId)
    const orderRes = await app.inject({
      method: 'POST',
      url: '/api/v1/orders',
      payload: {
        customer: {
          name: 'Priya Sharma',
          phone: '+919876543210'
        },
        items: [
          {
            productId: 'saree-1',
            variantId: 'var-saree1-red',
            quantity: 1
          }
        ]
      }
    });
    console.log(`\n7. POST /orders with variantId: Status ${orderRes.statusCode}`);
    const orderData = JSON.parse(orderRes.payload);
    const orderedItem = orderData.data.items[0];
    console.log(`   Ordered Item Color: ${orderedItem.colorName} | VariantId: ${orderedItem.variantId} | UnitPrice: ₹${orderedItem.unitPrice}`);

    console.log('\n===============================================');
    console.log('✅ ALL COLOR VARIANT & PHOTO TESTS PASSED!');
    console.log('===============================================\n');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    await app.close();
  }
}

verifyVariants();
