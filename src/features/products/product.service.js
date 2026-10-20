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
 * Enriches product entity with calculated profit, unified price fields, and image arrays
 */
export function enrichProduct(product) {
  if (!product) return null;
  const sellingPrice = product.sellingPrice !== undefined && product.sellingPrice !== null
    ? Number(product.sellingPrice)
    : Number(product.price || 0);
  const costPrice = Number(product.costPrice || 0);
  const profit = calculateProfit(sellingPrice, costPrice);

  const images = Array.isArray(product.images) ? product.images : [];
  const imageUrl = product.imageUrl || (images.length > 0 ? images[0] : null);

  return {
    ...product,
    costPrice,
    sellingPrice,
    profit,
    price: sellingPrice,
    imageUrl,
    images
  };
}

export class ProductService {
  constructor(db) {
    this.db = db || getDatabase();
  }

  /**
   * Fetches paginated and filtered saree products
   */
  async getProducts(query = {}) {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null
    };

    // Status filter (default: 'active', or custom e.g. 'archived', or 'all')
    if (query.status && query.status !== 'all') {
      where.status = query.status;
    } else if (!query.status) {
      where.status = 'active';
    }

    // Category filters
    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }
    if (query.category) {
      where.category = {
        name: { contains: query.category, mode: 'insensitive' }
      };
    }

    // Saree attribute filters
    if (query.fabric) {
      where.fabric = { contains: query.fabric, mode: 'insensitive' };
    }
    if (query.weave) {
      where.weave = { contains: query.weave, mode: 'insensitive' };
    }
    if (query.color) {
      where.color = { contains: query.color, mode: 'insensitive' };
    }

    if (query.blousePiece !== undefined) {
      where.blousePiece = query.blousePiece === 'true' || query.blousePiece === true;
    }

    if (query.inStock !== undefined) {
      const inStock = query.inStock === 'true' || query.inStock === true;
      where.stock = inStock ? { gt: 0 } : { equals: 0 };
    }

    // Price range filters
    const effectiveMinSelling = query.minSellingPrice !== undefined ? query.minSellingPrice : query.minPrice;
    const effectiveMaxSelling = query.maxSellingPrice !== undefined ? query.maxSellingPrice : query.maxPrice;

    if (effectiveMinSelling !== undefined || effectiveMaxSelling !== undefined) {
      where.sellingPrice = {};
      if (effectiveMinSelling !== undefined && !isNaN(effectiveMinSelling)) {
        where.sellingPrice.gte = Number(effectiveMinSelling);
      }
      if (effectiveMaxSelling !== undefined && !isNaN(effectiveMaxSelling)) {
        where.sellingPrice.lte = Number(effectiveMaxSelling);
      }
    }

    if (query.minCostPrice !== undefined || query.maxCostPrice !== undefined) {
      where.costPrice = {};
      if (query.minCostPrice !== undefined && !isNaN(query.minCostPrice)) {
        where.costPrice.gte = Number(query.minCostPrice);
      }
      if (query.maxCostPrice !== undefined && !isNaN(query.maxCostPrice)) {
        where.costPrice.lte = Number(query.maxCostPrice);
      }
    }

    // Text search query across all product attributes
    const searchQuery = query.search || query.q;
    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        { tags: { contains: searchQuery, mode: 'insensitive' } },
        { fabric: { contains: searchQuery, mode: 'insensitive' } },
        { weave: { contains: searchQuery, mode: 'insensitive' } },
        { color: { contains: searchQuery, mode: 'insensitive' } },
        { category: { name: { contains: searchQuery, mode: 'insensitive' } } }
      ];
    }

    // Sort options
    let orderBy = { createdAt: 'desc' };
    switch (query.sortBy) {
      case 'price_asc':
        orderBy = { sellingPrice: 'asc' };
        break;
      case 'price_desc':
        orderBy = { sellingPrice: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'name_asc':
        orderBy = { name: 'asc' };
        break;
      case 'name_desc':
        orderBy = { name: 'desc' };
        break;
      case 'stock_desc':
        orderBy = { stock: 'desc' };
        break;
      case 'stock_asc':
        orderBy = { stock: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [total, products] = await Promise.all([
      this.db.product.count({ where }),
      this.db.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true
        },
        orderBy
      })
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      products: products.map(enrichProduct),
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
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
      sellingPrice = Number(data.price);
      costPrice = Number((sellingPrice / 1.65).toFixed(2));
    } else if (data.sellingPrice !== undefined && data.sellingPrice !== null && !isNaN(data.sellingPrice)) {
      sellingPrice = Number(data.sellingPrice);
      costPrice = Number((sellingPrice / 1.65).toFixed(2));
    }

    const images = Array.isArray(data.images)
      ? data.images
      : (data.imageUrl ? [data.imageUrl] : []);
    const imageUrl = data.imageUrl || (images.length > 0 ? images[0] : null);

    const created = await this.db.product.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        costPrice,
        sellingPrice,
        price: sellingPrice,
        stock: data.stock !== undefined ? Number(data.stock) : 1,
        fabric: data.fabric || null,
        weave: data.weave || null,
        color: data.color || null,
        blousePiece: data.blousePiece !== undefined ? Boolean(data.blousePiece) : true,
        imageUrl,
        images,
        description: data.description || '',
        tags: Array.isArray(data.tags) ? data.tags.join(',') : (data.tags || ''),
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

    if (data.images !== undefined && Array.isArray(data.images)) {
      if (!data.imageUrl && data.images.length > 0) {
        data.imageUrl = data.images[0];
      }
    }

    const updated = await this.db.product.update({
      where: { id },
      data,
      include: {
        category: true
      }
    });

    return enrichProduct(updated);
  }

  /**
   * Appends an image to product gallery and optionally sets it as cover image
   */
  async addProductImage(id, imageUrl, isCover = false) {
    const existing = await this.db.product.findFirst({
      where: { id, deletedAt: null }
    });
    if (!existing) return null;

    const currentImages = Array.isArray(existing.images) ? [...existing.images] : [];
    if (!currentImages.includes(imageUrl)) {
      currentImages.push(imageUrl);
    }

    const updated = await this.db.product.update({
      where: { id },
      data: {
        imageUrl: isCover || !existing.imageUrl ? imageUrl : existing.imageUrl,
        images: currentImages
      },
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
