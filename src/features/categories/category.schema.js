// @generated-by Antigravity - Authorized AI: Antigravity Only

const categoryItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const getCategoriesSchema = {
  description: 'List all active categories',
  tags: ['Categories'],
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        count: { type: 'integer' },
        data: {
          type: 'array',
          items: categoryItemSchema
        }
      }
    }
  }
};

export const getCategoryByIdSchema = {
  description: 'Get category by ID',
  tags: ['Categories'],
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
        data: categoryItemSchema
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

export const createCategorySchema = {
  description: 'Create a new category',
  tags: ['Categories'],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 2 },
      description: { type: 'string' }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: categoryItemSchema
      }
    }
  }
};

