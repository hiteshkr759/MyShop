// @generated-by Antigravity - Authorized AI: Antigravity Only

const paginationSchema = {
  type: 'object',
  properties: {
    total: { type: 'integer' },
    page: { type: 'integer' },
    limit: { type: 'integer' },
    totalPages: { type: 'integer' },
    hasNextPage: { type: 'boolean' },
    hasPrevPage: { type: 'boolean' }
  }
};

const productItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    categoryId: { type: 'string' },
    category: {
      type: 'object',
      nullable: true,
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string', nullable: true }
      }
    },
    costPrice: { type: 'number' },
    sellingPrice: { type: 'number' },
    profit: { type: 'number' },
    price: { type: 'number' },
    stock: { type: 'integer' },
    fabric: { type: 'string', nullable: true },
    weave: { type: 'string', nullable: true },
    color: { type: 'string', nullable: true },
    blousePiece: { type: 'boolean' },
    imageUrl: { type: 'string', nullable: true },
    images: {
      type: 'array',
      items: { type: 'string' }
    },
    description: { type: 'string', nullable: true },
    tags: { type: 'string', nullable: true },
    status: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const getProductsSchema = {
  description: 'List products with pagination, sorting, search, and comprehensive attribute filters (fabric, weave, color, price)',
  tags: ['Products'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
      search: { type: 'string', description: 'Search by product name, description, tags, fabric, weave, or color' },
      q: { type: 'string', description: 'Alias for search' },
      categoryId: { type: 'string', description: 'Filter by Category UUID' },
      category: { type: 'string', description: 'Filter by Category name (e.g. Silk Sarees)' },
      fabric: { type: 'string', description: 'Filter by fabric (e.g. Pure Silk, Organza, Cotton)' },
      weave: { type: 'string', description: 'Filter by weave (e.g. Banarasi, Kanjeevaram, Handloom)' },
      color: { type: 'string', description: 'Filter by saree color' },
      blousePiece: { type: 'string', description: 'Filter by blouse piece inclusion ("true" / "false")' },
      inStock: { type: 'string', description: 'Filter by stock availability ("true" / "false")' },
      minPrice: { type: 'number', description: 'Minimum retail selling price' },
      maxPrice: { type: 'number', description: 'Maximum retail selling price' },
      minSellingPrice: { type: 'number' },
      maxSellingPrice: { type: 'number' },
      minCostPrice: { type: 'number', description: 'Minimum procurement cost price' },
      maxCostPrice: { type: 'number', description: 'Maximum procurement cost price' },
      status: { type: 'string', description: 'Filter by status ("active", "archived", or "all"). Default returns active first and archived last.' },
      sortBy: {
        type: 'string',
        enum: ['newest', 'oldest', 'price_asc', 'price_desc', 'name_asc', 'name_desc', 'stock_desc', 'stock_asc'],
        default: 'newest',
        description: 'Sort order'
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        count: { type: 'integer' },
        pagination: paginationSchema,
        data: {
          type: 'array',
          items: productItemSchema
        }
      }
    }
  }
};

export const getProductByIdSchema = {
  description: 'Get single product by ID',
  tags: ['Products'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: productItemSchema
      }
    },
    404: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }
};

export const createProductSchema = {
  description: 'Create a new saree product with image URL and automatic selling price calculation (SP = CP * 1.65)',
  tags: ['Products'],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 2 },
      costPrice: { type: 'number', minimum: 0 },
      sellingPrice: { type: 'number', minimum: 0 },
      price: { type: 'number', minimum: 0 },
      categoryId: { type: 'string' },
      stock: { type: 'integer', minimum: 0, default: 1 },
      fabric: { type: 'string' },
      weave: { type: 'string' },
      color: { type: 'string' },
      blousePiece: { type: 'boolean', default: true },
      imageUrl: { type: 'string', description: 'Primary saree cover image URL' },
      images: {
        type: 'array',
        items: { type: 'string' },
        description: 'Gallery image URLs'
      },
      description: { type: 'string' },
      tags: { type: 'string' }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: productItemSchema
      }
    }
  }
};

export const updateProductSchema = {
  description: 'Update saree product details, attributes, or image URLs',
  tags: ['Products'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      costPrice: { type: 'number', minimum: 0 },
      sellingPrice: { type: 'number', minimum: 0 },
      price: { type: 'number', minimum: 0 },
      categoryId: { type: 'string' },
      stock: { type: 'integer', minimum: 0 },
      fabric: { type: 'string' },
      weave: { type: 'string' },
      color: { type: 'string' },
      blousePiece: { type: 'boolean' },
      imageUrl: { type: 'string' },
      images: {
        type: 'array',
        items: { type: 'string' }
      },
      description: { type: 'string' },
      tags: { type: 'string' },
      status: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: productItemSchema
      }
    }
  }
};

export const archiveProductSchema = {
  description: 'Soft-archive product (Zero-Deletion directive compliant)',
  tags: ['Products'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: productItemSchema
      }
    }
  }
};

export const unarchiveProductSchema = {
  description: 'Restore an archived product back to active catalog',
  tags: ['Products'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: productItemSchema
      }
    },
    404: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }
};

export const uploadProductImageSchema = {
  description: 'Upload and attach an image to a saree product (multipart/form-data with file or JSON with base64)',
  tags: ['Products'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  querystring: {
    type: 'object',
    properties: {
      isCover: { type: 'string', description: 'Set as primary cover image ("true" / "false")' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            imageUrl: { type: 'string' },
            product: productItemSchema
          }
        }
      }
    }
  }
};

export const uploadStandaloneImageSchema = {
  description: 'Upload saree image asset and receive public URL for form creation',
  tags: ['Products'],
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            filename: { type: 'string' },
            storage: { type: 'string' }
          }
        }
      }
    }
  }
};
