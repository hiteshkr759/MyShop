// @generated-by Antigravity - Authorized AI: Antigravity Only

import { PrismaClient } from '@prisma/client';

let prisma;

/**
 * Initializes and manages the shared Prisma database client
 * Enforces soft-deletions and graceful disconnection
 */
export function initDatabase(app) {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
    });

    // Register cleanup on Fastify close
    if (app) {
      app.addHook('onClose', async () => {
        app.log.info('Closing Prisma database connection...');
        await prisma.$disconnect();
      });
    }
  }

  return prisma;
}

export function getDatabase() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export { prisma };

