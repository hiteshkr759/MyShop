// @generated-by Antigravity - Authorized AI: Antigravity Only

import { getDatabase } from '../../bootstrap/database.js';

/**
 * Calculates retail selling price based on mandatory business rule:
 * Selling Price = Cost Price + 65% markup (CP * 1.65)
 */
export function calculateSellingPrice(costPrice) {
  return Number((Number(costPrice) * 1.65).toFixed(2));
}

/**
 * Calculates expected gross profit per saree unit:
 * Profit = Selling Price - Cost Price
 */
export function calculateProfit(sellingPrice, costPrice) {
  return Number(((Number(sellingPrice) || 0) - (Number(costPrice) || 0)).toFixed(2));
}

/**
 * Enriches product entity with calculated profit and unified price fields
 */
export function enrichProduct(product) {
  if (!product) return null;
  const sellingPrice = product.sellingPrice !== undefined && product.sellingPrice !== null
    ? Number(product.sellingPrice)
    : Number(product.price || 0);
  const costPrice = Number(product.costPrice || 0);
  const profit = calculateProfit(sellingPrice, costPrice);

  return {
    ...product,
    costPrice,
    sellingPrice,
    profit,
    price: sellingPrice
  };
}

export class ProductService {
  constructor(db) {
    this.db = db || getDatabase();
  }

  async getProducts(filters = {}) {
    const {
      search,
      categoryId,
      fabric,
      weave,
      color,
      minPrice,
      maxPrice,
      minSellingPrice,
      maxSellingPrice,
      minCostPrice,
      maxCostPrice
    } = filters;

    const where = {
      deletedAt: null
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (fabric) {
      where.fabric = { contains: fabric, mode: 'insensitive' };
    }

    if (weave) {
      where.weave = { contains: weave, mode: 'insensitive' };
    }

    if (color) {
      where.color = { contains: color, mode: 'insensitive' };
    }

    const effectiveMinSelling = minSellingPrice !== undefined ? minSellingPrice : minPrice;
    const effectiveMaxSelling = maxSellingPrice !== undefined ? maxSellingPrice : maxPrice;

    if (effectiveMinSelling !== undefined || effectiveMaxSelling !== undefined) {
      where.sellingPrice = {};
      if (effectiveMinSelling !== undefined && !isNaN(effectiveMinSelling)) {
        where.sellingPrice.gte = Number(effectiveMinSelling);
      }
      if (effectiveMaxSelling !== undefined && !isNaN(effectiveMaxSelling)) {
        where.sellingPrice.lte = Number(effectiveMaxSelling);
      }
    }

    if (minCostPrice !== undefined || maxCostPrice !== undefined) {
      where.costPrice = {};
      if (minCostPrice !== undefined && !isNaN(minCostPrice)) {
        where.costPrice.gte = Number(minCostPrice);
      }
      if (maxCostPrice !== undefined && !isNaN(maxCostPrice)) {
        where.costPrice.lte = Number(maxCostPrice);
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } },
        { fabric: { contains: search, mode: 'insensitive' } },
        { weave: { contains: search, mode: 'insensitive' } },
        { color: { contains: search, mode: 'insensitive' } }
      ];
    }

    const products = await this.db.product.findMany({
      where,
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return products.map(enrichProduct);
  }

  async getProductById(id) {
    const product = await this.db.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        category: true
      }
    });

    return enrichProduct(product);
  }

  async createProduct(data) {
    let costPrice = 0;
    let sellingPrice = 0;

    if (data.costPrice !== undefined && data.costPrice !== null && !isNaN(data.costPrice)) {
      costPrice = Number(data.costPrice);
      sellingPrice = calculateSellingPrice(costPrice);
    } else if (data.price !== undefined && data.price !== null && !isNaN(data.price)) {
      // Legacy backwards-compatibility
      sellingPrice = Number(data.price);
      costPrice = Number((sellingPrice / 1.65).toFixed(2));
    } else if (data.sellingPrice !== undefined && data.sellingPrice !== null && !isNaN(data.sellingPrice)) {
      sellingPrice = Number(data.sellingPrice);
      costPrice = Number((sellingPrice / 1.65).toFixed(2));
    }

    const created = await this.db.product.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        costPrice,
        sellingPrice,
        price: sellingPrice, // Synchronized with sellingPrice for backward compatibility
        stock: data.stock !== undefined ? Number(data.stock) : 1,
        fabric: data.fabric || null,
        weave: data.weave || null,
        color: data.color || null,
        blousePiece: data.blousePiece !== undefined ? Boolean(data.blousePiece) : true,
        description: data.description || '',
        tags: data.tags || '',
        status: data.status || 'active'
      },
      include: {
        category: true
      }
    });

    return enrichProduct(created);
  }

  async updateProduct(id, updates) {
    const existing = await this.db.product.findFirst({
      where: { id, deletedAt: null }
    });
    if (!existing) return null;

    const data = { ...updates };

    if (data.costPrice !== undefined && data.costPrice !== null) {
      data.costPrice = Number(data.costPrice);
      // Mandatory business rule: Selling Price is always Cost Price + 65% markup
      data.sellingPrice = calculateSellingPrice(data.costPrice);
      data.price = data.sellingPrice;
    } else if (data.sellingPrice !== undefined && data.sellingPrice !== null) {
      data.sellingPrice = Number(data.sellingPrice);
      data.costPrice = Number((data.sellingPrice / 1.65).toFixed(2));
      data.price = data.sellingPrice;
    } else if (data.price !== undefined && data.price !== null) {
      data.sellingPrice = Number(data.price);
      data.costPrice = Number((data.sellingPrice / 1.65).toFixed(2));
      data.price = data.sellingPrice;
    }

    if (data.stock !== undefined) data.stock = Number(data.stock);
    if (data.blousePiece !== undefined) data.blousePiece = Boolean(data.blousePiece);

    const updated = await this.db.product.update({
      where: { id },
      data,
      include: {
        category: true
      }
    });

    return enrichProduct(updated);
  }

  // Soft-archive product respecting zero-deletion policy
  async archiveProduct(id) {
    const existing = await this.db.product.findFirst({
      where: { id, deletedAt: null }
    });
    if (!existing) return null;

    const archived = await this.db.product.update({
      where: { id },
      data: {
        status: 'archived',
        deletedAt: new Date()
      },
      include: {
        category: true
      }
    });

    return enrichProduct(archived);
  }
}

export const productService = new ProductService();
