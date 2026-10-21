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
 * Enriches product variant entity
 */
export function enrichVariant(variant) {
  if (!variant) return null;
  const images = Array.isArray(variant.images) ? variant.images : [];
  return {
    ...variant,
    stock: Number(variant.stock || 0),
    images
  };
}

/**
 * Enriches product entity with calculated profit, unified price fields, color variants, and image arrays
 */
export function enrichProduct(product) {
  if (!product) return null;
  const sellingPrice = product.sellingPrice !== undefined && product.sellingPrice !== null
    ? Number(product.sellingPrice)
    : Number(product.price || 0);
  const costPrice = Number(product.costPrice || 0);
  const profit = calculateProfit(sellingPrice, costPrice);

  const rawVariants = Array.isArray(product.variants) ? product.variants : [];
  const variants = rawVariants.map(enrichVariant);

  // Compute total stock from active variants if variants exist
  const activeVariants = variants.filter(v => !v.deletedAt && v.status === 'active');
  const totalStock = activeVariants.length > 0
    ? activeVariants.reduce((sum, v) => sum + v.stock, 0)
    : Number(product.stock || 0);

  const images = Array.isArray(product.images) ? product.images : [];

  // If no parent image, fallback to default variant's first image or first variant's image
  let imageUrl = product.imageUrl || (images.length > 0 ? images[0] : null);
  if (!imageUrl && activeVariants.length > 0) {
    const defaultVar = activeVariants.find(v => v.isDefault) || activeVariants[0];
    if (defaultVar && defaultVar.images.length > 0) {
      imageUrl = defaultVar.images[0];
    }
  }

  return {
    ...product,
    costPrice,
    sellingPrice,
    profit,
    price: sellingPrice,
    stock: Number(product.stock || 0),
    totalStock,
    imageUrl,
    images,
    variants
  };
}

export class ProductService {
  constructor(db) {
    this.db = db || getDatabase();
  }

  /**
   * Fetches paginated and filtered saree products including color variants
   */
  async getProducts(query = {}) {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const where = {};

    // Status filtering:
    if (query.status === 'active') {
      where.status = 'active';
      where.deletedAt = null;
    } else if (query.status === 'archived') {
      where.status = 'archived';
    } else if (query.status && query.status !== 'all') {
      where.status = query.status;
    } else {
      where.status = { in: ['active', 'archived'] };
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

    // Color filter checks both parent color and nested active variant colorNames
    if (query.color) {
      where.OR = [
        { color: { contains: query.color, mode: 'insensitive' } },
        {
          variants: {
            some: {
              colorName: { contains: query.color, mode: 'insensitive' },
              deletedAt: null
            }
          }
        }
      ];
    }

    if (query.blousePiece !== undefined) {
      where.blousePiece = query.blousePiece === 'true' || query.blousePiece === true;
    }

    if (query.inStock !== undefined) {
      const inStock = query.inStock === 'true' || query.inStock === true;
      if (inStock) {
        where.OR = [
          { stock: { gt: 0 } },
          { variants: { some: { stock: { gt: 0 }, deletedAt: null } } }
        ];
      } else {
        where.AND = [
          { stock: { equals: 0 } },
          { variants: { none: { stock: { gt: 0 }, deletedAt: null } } }
        ];
      }
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

    // Text search query across all product attributes and variant colors
    const searchQuery = query.search || query.q;
    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        { tags: { contains: searchQuery, mode: 'insensitive' } },
        { fabric: { contains: searchQuery, mode: 'insensitive' } },
        { weave: { contains: searchQuery, mode: 'insensitive' } },
        { color: { contains: searchQuery, mode: 'insensitive' } },
        {
          variants: {
            some: {
              colorName: { contains: searchQuery, mode: 'insensitive' },
              deletedAt: null
            }
          }
        },
        { category: { name: { contains: searchQuery, mode: 'insensitive' } } }
      ];
    }

    // Sort options: By default, active products first and archived products last ('status: asc'), with 'createdAt: desc'
    let orderBy = [{ status: 'asc' }, { createdAt: 'desc' }];
    switch (query.sortBy) {
      case 'price_asc':
        orderBy = [{ status: 'asc' }, { sellingPrice: 'asc' }, { createdAt: 'desc' }];
        break;
      case 'price_desc':
        orderBy = [{ status: 'asc' }, { sellingPrice: 'desc' }, { createdAt: 'desc' }];
        break;
      case 'oldest':
        orderBy = [{ status: 'asc' }, { createdAt: 'asc' }];
        break;
      case 'name_asc':
        orderBy = [{ status: 'asc' }, { name: 'asc' }, { createdAt: 'desc' }];
        break;
      case 'name_desc':
        orderBy = [{ status: 'asc' }, { name: 'desc' }, { createdAt: 'desc' }];
        break;
      case 'stock_desc':
        orderBy = [{ status: 'asc' }, { stock: 'desc' }, { createdAt: 'desc' }];
        break;
      case 'stock_asc':
        orderBy = [{ status: 'asc' }, { stock: 'asc' }, { createdAt: 'desc' }];
        break;
      case 'newest':
      default:
        orderBy = [{ status: 'asc' }, { createdAt: 'desc' }];
    }

    const [total, products] = await Promise.all([
      this.db.product.count({ where }),
      this.db.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          variants: {
            where: { deletedAt: null },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }]
          }
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
      where: { id },
      include: {
        category: true,
        variants: {
          where: { deletedAt: null },
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }]
        }
      }
    });

    return enrichProduct(product);
  }

  /**
   * Creates a product, optionally with nested color variants
   */
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

    const variants = Array.isArray(data.variants) ? data.variants : [];
    const totalVariantStock = variants.reduce((sum, v) => sum + (Number(v.stock) || 1), 0);
    const stock = data.stock !== undefined
      ? Number(data.stock)
      : (variants.length > 0 ? totalVariantStock : 1);

    return this.db.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          name: data.name,
          categoryId: data.categoryId,
          costPrice,
          sellingPrice,
          price: sellingPrice,
          stock,
          fabric: data.fabric || null,
          weave: data.weave || null,
          color: data.color || (variants[0]?.colorName || null),
          blousePiece: data.blousePiece !== undefined ? Boolean(data.blousePiece) : true,
          imageUrl,
          images,
          description: data.description || '',
          tags: Array.isArray(data.tags) ? data.tags.join(',') : (data.tags || ''),
          status: data.status || 'active'
        }
      });

      if (variants.length > 0) {
        for (let i = 0; i < variants.length; i++) {
          const v = variants[i];
          const varImages = Array.isArray(v.images) ? v.images : [];
          await tx.productVariant.create({
            data: {
              productId: created.id,
              colorName: v.colorName,
              colorCode: v.colorCode || null,
              stock: v.stock !== undefined ? Number(v.stock) : 1,
              costPrice: v.costPrice !== undefined ? Number(v.costPrice) : null,
              sellingPrice: v.sellingPrice !== undefined ? Number(v.sellingPrice) : null,
              images: varImages,
              isDefault: v.isDefault !== undefined ? Boolean(v.isDefault) : (i === 0)
            }
          });
        }
      }

      const fullProduct = await tx.product.findUnique({
        where: { id: created.id },
        include: {
          category: true,
          variants: {
            where: { deletedAt: null },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }]
          }
        }
      });

      return enrichProduct(fullProduct);
    });
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

    // Do not pass raw variants into product.update
    delete data.variants;

    const updated = await this.db.product.update({
      where: { id },
      data,
      include: {
        category: true,
        variants: {
          where: { deletedAt: null },
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }]
        }
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
        category: true,
        variants: {
          where: { deletedAt: null },
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }]
        }
      }
    });

    return enrichProduct(updated);
  }

  // Soft-archive product respecting zero-deletion policy
  async archiveProduct(id) {
    const existing = await this.db.product.findFirst({
      where: { id }
    });
    if (!existing) return null;

    const archived = await this.db.product.update({
      where: { id },
      data: {
        status: 'archived',
        deletedAt: new Date()
      },
      include: {
        category: true,
        variants: {
          where: { deletedAt: null },
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }]
        }
      }
    });

    return enrichProduct(archived);
  }

  // Restores an archived product back to active status
  async unarchiveProduct(id) {
    const existing = await this.db.product.findFirst({
      where: { id }
    });
    if (!existing) return null;

    const unarchived = await this.db.product.update({
      where: { id },
      data: {
        status: 'active',
        deletedAt: null
      },
      include: {
        category: true,
        variants: {
          where: { deletedAt: null },
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }]
        }
      }
    });

    return enrichProduct(unarchived);
  }

  // ==========================================
  // COLOR VARIANT MANAGEMENT METHODS
  // ==========================================

  /**
   * Adds a new color variant to a saree product (or reactivates if previously soft-archived)
   */
  async addVariant(productId, variantData) {
    const product = await this.db.product.findUnique({
      where: { id: productId }
    });
    if (!product || product.deletedAt !== null) {
      throw new Error(`Product '${productId}' not found or inactive`);
    }

    return this.db.$transaction(async (tx) => {
      // If marking as default, reset other variants for this product
      if (variantData.isDefault) {
        await tx.productVariant.updateMany({
          where: { productId },
          data: { isDefault: false }
        });
      }

      const images = Array.isArray(variantData.images) ? variantData.images : [];
      const stock = variantData.stock !== undefined ? Number(variantData.stock) : 1;

      // Check if variant with this colorName already exists on this product
      const existing = await tx.productVariant.findUnique({
        where: {
          productId_colorName: {
            productId,
            colorName: variantData.colorName
          }
        }
      });

      let variant;
      if (existing) {
        if (!existing.deletedAt && existing.status === 'active') {
          throw new Error(`Color variant '${variantData.colorName}' already exists on this product`);
        }
        // Reactivate soft-archived variant with new details
        variant = await tx.productVariant.update({
          where: { id: existing.id },
          data: {
            colorCode: variantData.colorCode !== undefined ? variantData.colorCode : existing.colorCode,
            stock,
            costPrice: variantData.costPrice !== undefined ? Number(variantData.costPrice) : existing.costPrice,
            sellingPrice: variantData.sellingPrice !== undefined ? Number(variantData.sellingPrice) : existing.sellingPrice,
            images: images.length > 0 ? images : existing.images,
            isDefault: Boolean(variantData.isDefault),
            status: 'active',
            deletedAt: null
          }
        });
      } else {
        variant = await tx.productVariant.create({
          data: {
            productId,
            colorName: variantData.colorName,
            colorCode: variantData.colorCode || null,
            stock,
            costPrice: variantData.costPrice !== undefined ? Number(variantData.costPrice) : null,
            sellingPrice: variantData.sellingPrice !== undefined ? Number(variantData.sellingPrice) : null,
            images,
            isDefault: Boolean(variantData.isDefault),
            status: 'active'
          }
        });
      }

      // Synchronize parent product stock
      const allActiveVariants = await tx.productVariant.findMany({
        where: { productId, deletedAt: null, status: 'active' }
      });
      const newTotalStock = allActiveVariants.reduce((sum, v) => sum + v.stock, 0);
      await tx.product.update({
        where: { id: productId },
        data: { stock: newTotalStock }
      });

      return enrichVariant(variant);
    });
  }

  /**
   * Updates an existing color variant
   */
  async updateVariant(productId, variantId, variantData) {
    const existing = await this.db.productVariant.findFirst({
      where: { id: variantId, productId, deletedAt: null }
    });
    if (!existing) return null;

    return this.db.$transaction(async (tx) => {
      if (variantData.isDefault) {
        await tx.productVariant.updateMany({
          where: { productId, id: { not: variantId } },
          data: { isDefault: false }
        });
      }

      const data = { ...variantData };
      if (data.stock !== undefined) data.stock = Number(data.stock);
      if (data.costPrice !== undefined) data.costPrice = Number(data.costPrice);
      if (data.sellingPrice !== undefined) data.sellingPrice = Number(data.sellingPrice);

      const updated = await tx.productVariant.update({
        where: { id: variantId },
        data
      });

      // Synchronize parent product stock if stock changed
      if (variantData.stock !== undefined) {
        const allActiveVariants = await tx.productVariant.findMany({
          where: { productId, deletedAt: null, status: 'active' }
        });
        const newTotalStock = allActiveVariants.reduce((sum, v) => sum + v.stock, 0);
        await tx.product.update({
          where: { id: productId },
          data: { stock: newTotalStock }
        });
      }

      return enrichVariant(updated);
    });
  }

  /**
   * Soft-archives a color variant under Zero-Deletion policy
   */
  async archiveVariant(productId, variantId) {
    const existing = await this.db.productVariant.findFirst({
      where: { id: variantId, productId, deletedAt: null }
    });
    if (!existing) return null;

    return this.db.$transaction(async (tx) => {
      const archived = await tx.productVariant.update({
        where: { id: variantId },
        data: {
          status: 'archived',
          deletedAt: new Date()
        }
      });

      // Recalculate parent stock from remaining active variants
      const remainingVariants = await tx.productVariant.findMany({
        where: { productId, deletedAt: null, status: 'active' }
      });
      const newTotalStock = remainingVariants.reduce((sum, v) => sum + v.stock, 0);
      await tx.product.update({
        where: { id: productId },
        data: { stock: newTotalStock }
      });

      return enrichVariant(archived);
    });
  }

  /**
   * Attaches multiple photo URLs to a specific color variant
   */
  async addVariantImages(productId, variantId, newUrls, setCover = false) {
    const existing = await this.db.productVariant.findFirst({
      where: { id: variantId, productId, deletedAt: null }
    });
    if (!existing) return null;

    const currentImages = Array.isArray(existing.images) ? [...existing.images] : [];
    const urlsToAdd = Array.isArray(newUrls) ? newUrls : [newUrls];

    let updatedImages;
    if (setCover) {
      // Filter out existing duplicates and prepend
      const filtered = currentImages.filter(url => !urlsToAdd.includes(url));
      updatedImages = [...urlsToAdd, ...filtered];
    } else {
      for (const url of urlsToAdd) {
        if (!currentImages.includes(url)) {
          currentImages.push(url);
        }
      }
      updatedImages = currentImages;
    }

    const updated = await this.db.productVariant.update({
      where: { id: variantId },
      data: { images: updatedImages }
    });

    return enrichVariant(updated);
  }
}

export const productService = new ProductService();
