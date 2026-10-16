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

  test('GET /api/v1/categories returns category list', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/categories'
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length > 0);
  });

  test('GET /api/v1/products returns product list from Prisma database', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/products'
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 200);
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length > 0);
  });

  test('POST /api/v1/products creates a new product in Prisma database', async () => {
    // Fetch a category first
    const catRes = await app.inject({ method: 'GET', url: '/api/v1/categories' });
    const catData = JSON.parse(catRes.body);
    const categoryId = catData.data[0].id;

    const newProduct = {
      name: 'Wireless Ergonomic Vertical Mouse',
      price: 59.99,
      categoryId,
      stock: 20,
      description: 'Vertical mouse preventing wrist strain'
    };

    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/products',
      payload: newProduct
    });
    const data = JSON.parse(res.body);

    assert.equal(res.statusCode, 201);
    assert.equal(data.success, true);
    assert.equal(data.data.name, 'Wireless Ergonomic Vertical Mouse');
    assert.equal(data.data.price, 59.99);
  });

  test('POST /api/v1/orders places an order atomically and updates Prisma inventory', async () => {
    // Get product to order
    const prodRes = await app.inject({ method: 'GET', url: '/api/v1/products' });
    const prodData = JSON.parse(prodRes.body);
    const targetProduct = prodData.data[0];
    const initialStock = targetProduct.stock;

    const orderPayload = {
      customer: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '123-456-7890'
      },
      items: [
        { productId: targetProduct.id, quantity: 2 }
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
    assert.equal(data.data.customerEmail, 'jane@example.com');
    assert.equal(data.data.items[0].quantity, 2);

    // Verify stock deduction in database
    const verifyProdRes = await app.inject({ method: 'GET', url: `/api/v1/products/${targetProduct.id}` });
    const verifyProdData = JSON.parse(verifyProdRes.body);
    assert.equal(verifyProdData.data.stock, initialStock - 2);
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
