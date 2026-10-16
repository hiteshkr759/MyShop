// @generated-by Antigravity - Authorized AI: Antigravity Only

export const healthSchema = {
  description: 'Health check and service status',
  tags: ['Health'],
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            app: { type: 'string' },
            environment: { type: 'string' },
            uptimeSeconds: { type: 'number' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }
};

