// @generated-by Antigravity - Authorized AI: Antigravity Only

const customerResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    phoneNumber: { type: 'string' },
    address: { type: 'string', nullable: true },
    area: { type: 'string', nullable: true },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    orders: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          totalAmount: { type: 'number' },
          status: { type: 'string' },
          deliveryAddress: { type: 'string', nullable: true },
          deliveryArea: { type: 'string', nullable: true },
          createdAt: { type: 'string' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                productId: { type: 'string' },
                quantity: { type: 'integer' },
                unitPrice: { type: 'number' },
                itemTotal: { type: 'number' },
                product: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    sellingPrice: { type: 'number' },
                    color: { type: 'string', nullable: true },
                    fabric: { type: 'string', nullable: true },
                    imageUrl: { type: 'string', nullable: true }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

const customerSummaryResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    phoneNumber: { type: 'string' },
    address: { type: 'string', nullable: true },
    area: { type: 'string', nullable: true },
    orderCount: { type: 'integer' },
    totalSpend: { type: 'number' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

export const getCustomersSchema = {
  description: 'List all active customers with search and order summary',
  tags: ['Customers'],
  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string', description: 'Search by customer name, phone number, or area' },
      area: { type: 'string', description: 'Filter by area' }
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
          items: customerSummaryResponseSchema
        }
      }
    }
  }
};

export const getCustomerByIdSchema = {
  description: 'Get customer by ID with full past order history',
  tags: ['Customers'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: customerResponseSchema
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

export const getCustomerByPhoneSchema = {
  description: 'Lookup customer by unique phone number with past order history',
  tags: ['Customers'],
  params: {
    type: 'object',
    required: ['phone'],
    properties: {
      phone: { type: 'string', minLength: 7, maxLength: 20 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: customerResponseSchema
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

export const createCustomerSchema = {
  description: 'Create a new customer identified by phone number',
  tags: ['Customers'],
  body: {
    type: 'object',
    required: ['name', 'phoneNumber'],
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 100 },
      phoneNumber: { type: 'string', minLength: 7, maxLength: 20, pattern: '^[0-9+()\\-\\s]+$' },
      address: { type: 'string', maxLength: 300 },
      area: { type: 'string', maxLength: 100 }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: customerResponseSchema
      }
    },
    400: {
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

export const updateCustomerSchema = {
  description: 'Update customer information',
  tags: ['Customers'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 100 },
      phoneNumber: { type: 'string', minLength: 7, maxLength: 20, pattern: '^[0-9+()\\-\\s]+$' },
      address: { type: 'string', maxLength: 300 },
      area: { type: 'string', maxLength: 100 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        data: customerResponseSchema
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

export const deleteCustomerSchema = {
  description: 'Soft-delete a customer (sets deletedAt timestamp without hard deleting)',
  tags: ['Customers'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
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

