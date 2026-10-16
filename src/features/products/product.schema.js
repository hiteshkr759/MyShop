// @generated-by Antigravity - Authorized AI: Antigravity Only

const productItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    categoryId: { type: 'string' },
    price: { type: 'number' },
    stock: { type: 'integer' },
    description: { type: 'string', nullable: true },
    tags: { type: 'string', nullable: true },
    status: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const getProductsSchema = {
  description: 'List products with optional search and filters',
  tags: ['Products'],
  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string' },
      categoryId: { type: 'string' },
      minPrice: { type: 'number' },
      maxPrice: { type: 'number' }
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
  description: 'Create a new product',
  tags: ['Products'],
  body: {
    type: 'object',
    required: ['name', 'price'],
    properties: {
      name: { type: 'string', minLength: 2 },
      price: { type: 'number', minimum: 0.01 },
      categoryId: { type: 'string' },
      stock: { type: 'integer', minimum: 0 },
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
  description: 'Update product details',
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
      price: { type: 'number', minimum: 0.01 },
      categoryId: { type: 'string' },
      stock: { type: 'integer', minimum: 0 },
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
