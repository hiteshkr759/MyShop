// @generated-by Antigravity - Authorized AI: Antigravity Only

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
    description: { type: 'string', nullable: true },
    tags: { type: 'string', nullable: true },
    status: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const getProductsSchema = {
  description: 'List products with optional search, fabric, weave, color, and price filters',
  tags: ['Products'],
  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string' },
      categoryId: { type: 'string' },
      fabric: { type: 'string' },
      weave: { type: 'string' },
      color: { type: 'string' },
      minPrice: { type: 'number' },
      maxPrice: { type: 'number' },
      minSellingPrice: { type: 'number' },
      maxSellingPrice: { type: 'number' },
      minCostPrice: { type: 'number' },
      maxCostPrice: { type: 'number' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        count: { type: 'integer' },
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
  description: 'Create a new saree product (automatically computes sellingPrice = costPrice * 1.65)',
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
  description: 'Update saree product details (recalculates sellingPrice if costPrice changes)',
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

