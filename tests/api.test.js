import test, { describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

let server;
let baseUrl;

describe('MyShop API Integration Tests', () => {
  before(async () => {
    // Start server on a dynamic port for tests
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('GET / returns API welcome message and documentation links', async () => {
    const res = await fetch(`${baseUrl}/`);
    const data = await res.json();

    assert.equal(res.status, 200);
    assert.equal(data.success, true);
    assert.ok(data.documentation);
  });

  test('GET /api/v1/health returns UP status', async () => {
    const res = await fetch(`${baseUrl}/api/v1/health`);
    const data = await res.json();

    assert.equal(res.status, 200);
    assert.equal(data.success, true);
    assert.equal(data.data.status, 'UP');
  });

  test('GET /api/v1/categories returns default categories', async () => {
    const res = await fetch(`${baseUrl}/api/v1/categories`);
    const data = await res.json();

    assert.equal(res.status, 200);
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length > 0);
  });

  test('GET /api/v1/products returns product list', async () => {
    const res = await fetch(`${baseUrl}/api/v1/products`);
    const data = await res.json();

    assert.equal(res.status, 200);
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.length > 0);
  });

  test('POST /api/v1/products creates a new product', async () => {
    const newProduct = {
      name: 'Wireless Gaming Mouse',
      price: 49.99,
      categoryId: 'cat-1',
      stock: 15,
      description: 'High DPI optical gaming mouse'
    };

    const res = await fetch(`${baseUrl}/api/v1/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    const data = await res.json();

    assert.equal(res.status, 201);
    assert.equal(data.success, true);
    assert.equal(data.data.name, 'Wireless Gaming Mouse');
    assert.equal(data.data.price, 49.99);
  });

  test('POST /api/v1/orders places an order and decreases stock', async () => {
    const orderPayload = {
      customer: {
        name: 'Alice Smith',
        email: 'alice@example.com'
      },
      items: [
        { productId: 'prod-2', quantity: 2 }
      ]
    };

    const res = await fetch(`${baseUrl}/api/v1/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const data = await res.json();

    assert.equal(res.status, 201);
    assert.equal(data.success, true);
    assert.equal(data.data.customer.email, 'alice@example.com');
    assert.equal(data.data.items[0].quantity, 2);
  });

  test('GET /unknown-route returns 404', async () => {
    const res = await fetch(`${baseUrl}/api/v1/does-not-exist`);
    const data = await res.json();

    assert.equal(res.status, 404);
    assert.equal(data.success, false);
  });
});
