// @generated-by Antigravity - Authorized AI: Antigravity Only

import { config } from '../config/index.js';
import healthRoutes from '../features/health/health.routes.js';
import categoryRoutes from '../features/categories/category.routes.js';
import productRoutes from '../features/products/product.routes.js';
import orderRoutes from '../features/orders/order.routes.js';

/**
 * Registers all feature routes under the configured API prefix
 */
export async function initRoutes(app) {
  // Root landing endpoint
  app.get('/', async (request, reply) => {
    return reply.send({
      success: true,
      message: `Welcome to ${config.shopName} Fastify API`,
      architecture: 'Feature-Wise Modular with Central Bootstrap',
      documentation: {
        swagger: '/docs',
        health: `${config.apiPrefix}/health`,
        products: `${config.apiPrefix}/products`,
        categories: `${config.apiPrefix}/categories`,
        orders: `${config.apiPrefix}/orders`
      },
      version: '1.0.0'
    });
  });

  // Feature modules registration under API prefix
  await app.register(async function apiRoutes(api) {
    await api.register(healthRoutes, { prefix: '/health' });
    await api.register(categoryRoutes, { prefix: '/categories' });
    await api.register(productRoutes, { prefix: '/products' });
    await api.register(orderRoutes, { prefix: '/orders' });
  }, { prefix: config.apiPrefix });

  app.log.info('Feature routes registered under %s', config.apiPrefix);
}

