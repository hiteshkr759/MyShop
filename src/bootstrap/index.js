// @generated-by Antigravity - Authorized AI: Antigravity Only

import Fastify from 'fastify';
import { config } from '../config/index.js';
import { initPlugins } from './plugins.js';
import { initRoutes } from './routes.js';
import { initLifecycle } from './lifecycle.js';
import { initDatabase } from './database.js';
import { initialCategories, initialProducts } from '../data/mockData.js';

/**
 * Master Bootstrap Function
 * Loads all integration shared resources in one single central place:
 * 1. Fastify instance with structured Pino logging and sensitive data redaction
 * 2. Shared database integration resource (Prisma)
 * 3. Security, CORS, and utility plugins
 * 4. Feature-wise routes
 * 5. Lifecycle and error management
 */
export async function bootstrapApp(options = {}) {
  const app = Fastify({
    logger: {
      level: config.isDev ? 'info' : 'warn',
      redact: [
        'req.headers.authorization',
        'req.headers.cookie',
        'body.password',
        'body.creditCard',
        'body.customer.creditCard'
      ]
    },
    ...options
  });

  // 1. Initialize Plugins & Shared Resources (Database, Security, CORS)
  await initPlugins(app);

  // 2. Seed initial catalog if DB is clean
  await seedInitialData(app);

  // 3. Register Feature Routes
  await initRoutes(app);

  // 4. Register Lifecycle & Error Management
  initLifecycle(app);

  return app;
}

/**
 * Seeds initial catalog and products into Prisma if database is fresh
 */
async function seedInitialData(app) {
  try {
    const db = initDatabase(app);
    const categoryCount = await db.category.count();

    if (categoryCount === 0) {
      app.log.info('Fresh database detected. Seeding initial catalog data...');

      for (const cat of initialCategories) {
        await db.category.upsert({
          where: { name: cat.name },
          update: {},
          create: {
            id: cat.id,
            name: cat.name,
            description: cat.description
          }
        });
      }

      for (const prod of initialProducts) {
        const costPrice = prod.costPrice !== undefined ? prod.costPrice : Number((prod.price / 1.65).toFixed(2));
        const sellingPrice = prod.sellingPrice !== undefined ? prod.sellingPrice : prod.price;

        await db.product.upsert({
          where: { id: prod.id },
          update: {},
          create: {
            id: prod.id,
            name: prod.name,
            categoryId: prod.categoryId,
            costPrice,
            sellingPrice,
            price: sellingPrice,
            stock: prod.stock !== undefined ? prod.stock : 1,
            fabric: prod.fabric || null,
            weave: prod.weave || null,
            color: prod.color || null,
            blousePiece: prod.blousePiece !== undefined ? prod.blousePiece : true,
            description: prod.description,
            tags: Array.isArray(prod.tags) ? prod.tags.join(',') : (prod.tags || ''),
            status: 'active'
          }
        });
      }

      app.log.info('Initial catalog seeded successfully.');
    }
  } catch (err) {
    app.log.warn({ err }, 'Seed check warning (non-fatal)');
  }
}

export * from './database.js';
export * from './supabase.js';
export * from './swagger.js';
export * from './plugins.js';
export * from './routes.js';
export * from './lifecycle.js';

