// @generated-by Antigravity - Authorized AI: Antigravity Only
import test, { describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.js';

let app;

describe('MyShop Fastify API Integration Tests', () => {
  before(async () => {
    app = await buildApp({ logger: false });
    await app.ready();
  });

  after(async () => {
    await app.close();
  });

  test('GET / returns Fastify API welcome and documentation links', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/'
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.equal(data.success, true);
    assert.ok(data.documentation);
    assert.equal(data.documentation.swagger, '/docs');
  });

  test('GET /docs serves interactive Swagger UI', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/docs/'
    });

    assert.equal(res.statusCode, 200);
    assert.ok(res.body.includes('swagger-ui') || res.headers['content-type'].includes('html'));
  });

  test('GET /docs/json returns valid OpenAPI 3.0 specification', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/docs/json'
    });
    const spec = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.ok(spec.openapi);
    assert.ok(spec.paths['/api/v1/health/'] || spec.paths['/api/v1/health']);
    assert.ok(spec.paths['/api/v1/products/'] || spec.paths['/api/v1/products']);
    assert.ok(spec.paths['/api/v1/categories/'] || spec.paths['/api/v1/categories']);
    assert.ok(spec.paths['/api/v1/orders/'] || spec.paths['/api/v1/orders']);
  });

  test('GET /api/v1/health returns UP status', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/health'
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.equal(data.success, true);
    assert.equal(data.data.status, 'UP');
  });

  test('GET /api/v1/categories returns category list including saree categories', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/categories'
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length > 0);

    const silkCategory = data.data.find(c => c.name === 'Silk Sarees');
    assert.ok(silkCategory, 'Expected Silk Sarees category to exist');
  });

  test('GET /api/v1/products returns product list with CP, SP (+65%), and profit', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/products'
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length > 0);

    const product = data.data[0];
    assert.ok(product.id);
    assert.ok(product.name);
    assert.ok(product.costPrice !== undefined);
    assert.ok(product.sellingPrice !== undefined);
    assert.ok(product.profit !== undefined);
  });

  test('POST /api/v1/products creates a saree and enforces +65% markup formula', async () => {
    const catRes = await app.inject({ method: 'GET', url: '/api/v1/categories' });
    const catData = JSON.parse(catRes.body);
    const silkCategory = catData.data.find(c => c.name === 'Silk Sarees') || catData.data[0];

    const sareePayload = {
      name: 'Tussar Handloom Ghicha Silk Saree',
      costPrice: 2000,
      categoryId: silkCategory.id,
      stock: 1,
      fabric: 'Pure Tussar Silk',
      weave: 'Handloom Ghicha',
      color: 'Honey Gold & Rust',
      blousePiece: true,
      description: 'Authentic hand-reeled Tussar silk saree with natural texture.'
    };

    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/products',
      payload: sareePayload
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 201);
    assert.equal(data.success, true);
    assert.equal(data.data.name, 'Tussar Handloom Ghicha Silk Saree');
    assert.equal(data.data.costPrice, 2000);
    // +65% Markup Formula: 2000 * 1.65 = 3300
    assert.equal(data.data.sellingPrice, 3300);
    assert.equal(data.data.profit, 1300);
    assert.equal(data.data.fabric, 'Pure Tussar Silk');
    assert.equal(data.data.weave, 'Handloom Ghicha');
    assert.equal(data.data.blousePiece, true);
    assert.equal(data.data.stock, 1);
  });

  test('PUT /api/v1/products/:id updates costPrice and dynamically recalculates sellingPrice (+65%)', async () => {
    // 1. Create a saree first
    const catRes = await app.inject({ method: 'GET', url: '/api/v1/categories' });
    const catData = JSON.parse(catRes.body);
    const categoryId = catData.data[0].id;

    const createRes = await app.inject({
      method: 'POST',
      url: '/api/v1/products',
      payload: {
        name: 'Paithani Silk Heritage Saree',
        costPrice: 4000,
        categoryId,
        stock: 1,
        fabric: 'Pure Silk',
        weave: 'Paithani',
        color: 'Emerald Green'
      }
    });
    const created = JSON.parse(createRes.body).data;
    assert.equal(created.sellingPrice, 6600); // 4000 * 1.65 = 6600

    // 2. Update costPrice to 5000
    const updateRes = await app.inject({
      method: 'PUT',
      url: `/api/v1/products/${created.id}`,
      payload: {
        costPrice: 5000
      }
    });
    const updated = JSON.parse(updateRes.body).data;

    assert.equal(updateRes.statusCode, 200);
    assert.equal(updated.costPrice, 5000);
    // Dynamic recalculation: 5000 * 1.65 = 8250
    assert.equal(updated.sellingPrice, 8250);
    assert.equal(updated.profit, 3250);
  });

  test('GET /api/v1/products supports filtering by fabric and category', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/products?fabric=Silk'
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length > 0);
    for (const item of data.data) {
      assert.ok(item.fabric.toLowerCase().includes('silk'));
    }
  });

  test('POST /api/v1/orders places an order using sellingPrice and deducts inventory', async () => {
    // Get product to order
    const prodRes = await app.inject({ method: 'GET', url: '/api/v1/products' });
    const prodData = JSON.parse(prodRes.body);
    const targetProduct = prodData.data.find(p => p.stock >= 2 && p.sellingPrice > 0) || prodData.data[0];
    const initialStock = targetProduct.stock;
    const expectedPrice = (targetProduct.sellingPrice && targetProduct.sellingPrice > 0)
      ? targetProduct.sellingPrice
      : targetProduct.price;

    const orderPayload = {
      customer: {
        name: 'Aishwarya Sharma',
        email: 'aishwarya@example.com',
        phone: '9876543210'
      },
      items: [
        { productId: targetProduct.id, quantity: 1 }
      ]
    };

    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/orders',
      payload: orderPayload
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 201);
    assert.equal(data.success, true);
    assert.equal(data.data.customerEmail, 'aishwarya@example.com');
    assert.equal(data.data.items[0].unitPrice, expectedPrice);
    assert.equal(data.data.totalAmount, expectedPrice);

    // Verify stock deduction in database
    const verifyProdRes = await app.inject({ method: 'GET', url: `/api/v1/products/${targetProduct.id}` });
    const verifyProdData = JSON.parse(verifyProdRes.body);
    assert.equal(verifyProdData.data.stock, initialStock - 1);
  });

  test('GET /unknown-route returns 404', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/not-found-endpoint'
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 404);
    assert.equal(data.success, false);
  });
});
