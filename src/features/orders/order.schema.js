// @generated-by Antigravity - Authorized AI: Antigravity Only

const orderItemResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    productId: { type: 'string' },
    variantId: { type: 'string', nullable: true },
    colorName: { type: 'string', nullable: true },
    quantity: { type: 'integer' },
    unitPrice: { type: 'number' },
    itemTotal: { type: 'number' }
  }
};

const orderResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    customerId: { type: 'string', nullable: true },
    customerName: { type: 'string' },
    customerEmail: { type: 'string', nullable: true },
    customerPhone: { type: 'string', nullable: true },
    deliveryAddress: { type: 'string', nullable: true },
    deliveryArea: { type: 'string', nullable: true },
    totalAmount: { type: 'number' },
    status: { type: 'string' },
    items: {
      type: 'array',
      items: orderItemResponseSchema
    },
    customer: {
      type: 'object',
      nullable: true,
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        phoneNumber: { type: 'string' },
        address: { type: 'string', nullable: true },
        area: { type: 'string', nullable: true }
      }
    },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const getOrdersSchema = {
  description: 'List all orders',
  tags: ['Orders'],
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        count: { type: 'integer' },
        data: {
          type: 'array',
          items: orderResponseSchema
        }
      }
    }
  }
};

export const getOrderByIdSchema = {
  description: 'Get order details by ID',
  tags: ['Orders'],
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
        data: orderResponseSchema
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

export const createOrderSchema = {
  description: 'Place an order with atomic stock validation, color variant tracking, and customer identification by phone',
  tags: ['Orders'],
  body: {
    type: 'object',
    required: ['customer', 'items'],
    properties: {
      customer: {
        type: 'object',
        required: ['name', 'phone'],
        properties: {
          name: { type: 'string', minLength: 2 },
          phone: { type: 'string', minLength: 7, maxLength: 20 },
          email: { type: 'string', format: 'email' },
          address: { type: 'string' },
          area: { type: 'string' }
        }
      },
      items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: { type: 'string' },
            variantId: { type: 'string', description: 'Optional color variant UUID' },
            quantity: { type: 'integer', minimum: 1 }
          }
        }
      }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: orderResponseSchema
      }
    }
  }
};
