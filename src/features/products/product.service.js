// @generated-by Antigravity - Authorized AI: Antigravity Only

import { getDatabase } from '../../bootstrap/database.js';

export class ProductService {
  constructor(db) {
    this.db = db || getDatabase();
  }

  async getProducts({ search, categoryId, minPrice, maxPrice }) {
    const where = {
      deletedAt: null
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined && !isNaN(minPrice)) {
        where.price.gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !isNaN(maxPrice)) {
        where.price.lte = Number(maxPrice);
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } }
      ];
    }

    return this.db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getProductById(id) {
    return this.db.product.findFirst({
      where: { id, deletedAt: null }
    });
  }

  async createProduct(data) {
    return this.db.product.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        price: Number(data.price),
        stock: Number(data.stock) || 0,
        description: data.description || '',
        tags: data.tags || '',
        status: 'active'
      }
    });
  }

  async updateProduct(id, updates) {
    const existing = await this.getProductById(id);
    if (!existing) return null;

    const data = { ...updates };
    if (data.price !== undefined) data.price = Number(data.price);
    if (data.stock !== undefined) data.stock = Number(data.stock);

    return this.db.product.update({
      where: { id },
      data
    });
  }

  // Soft-archive product respecting zero-deletion policy
  async archiveProduct(id) {
    const existing = await this.getProductById(id);
    if (!existing) return null;

    return this.db.product.update({
      where: { id },
      data: {
        status: 'archived',
        deletedAt: new Date()
      }
    });
  }
}

export const productService = new ProductService();
