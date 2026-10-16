// @generated-by Antigravity - Authorized AI: Antigravity Only
import { initialCategories, initialProducts, initialOrders } from '../data/mockData.js';

class ShopService {
  constructor() {
    this.categories = [...initialCategories];
    this.products = [...initialProducts];
    this.orders = [...initialOrders];
  }

  // Categories
  getCategories() {
    return this.categories;
  }

  getCategoryById(id) {
    return this.categories.find(c => c.id === id);
  }

  // Products
  getProducts({ search, categoryId, minPrice, maxPrice }) {
    let filtered = [...this.products];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (categoryId) {
      filtered = filtered.filter(p => p.categoryId === categoryId);
    }

    if (minPrice !== undefined && !isNaN(minPrice)) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice !== undefined && !isNaN(maxPrice)) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    return filtered;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  createProduct(data) {
    const newProduct = {
      id: `prod-${Date.now()}`,
      name: data.name,
      categoryId: data.categoryId || 'cat-1',
      price: Number(data.price) || 0,
      stock: Number(data.stock) || 0,
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      status: 'active',
      createdAt: new Date().toISOString()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.products[index];
  }

  // Strictly respect zero-deletion: soft-archive instead of hard-delete
  archiveProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.products[index].status = 'archived';
    this.products[index].archivedAt = new Date().toISOString();
    return this.products[index];
  }

  // Orders
  getOrders() {
    return this.orders;
  }

  getOrderById(id) {
    return this.orders.find(o => o.id === id);
  }

  createOrder({ customer, items }) {
    let calculatedTotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = this.getProductById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name} (Available: ${product.stock})`);
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;

      // Update product inventory safely
      product.stock -= item.quantity;

      validatedItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        itemTotal: Number(itemTotal.toFixed(2))
      });
    }

    const newOrder = {
      id: `ord-${Date.now()}`,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || ''
      },
      items: validatedItems,
      totalAmount: Number(calculatedTotal.toFixed(2)),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.orders.push(newOrder);
    return newOrder;
  }
}

export const shopService = new ShopService();
