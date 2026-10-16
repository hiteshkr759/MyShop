// @generated-by Antigravity - Authorized AI: Antigravity Only

import '../config/index.js';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ CRITICAL: DATABASE_URL is not defined in environment variables. Please configure DATABASE_URL in Vercel Project Settings.');
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });
}

/**
 * Initializes and manages the shared Prisma database client
 * Enforces serverless global caching and graceful connection management
 */
export function initDatabase(app) {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();

    // Register cleanup on Fastify close (persistent servers only, omitted on Vercel serverless)
    if (app && !process.env.VERCEL) {
      app.addHook('onClose', async () => {
        app.log.info('Closing Prisma database connection...');
        await globalForPrisma.prisma.$disconnect();
      });
    }
  }

  return globalForPrisma.prisma;
}

export function getDatabase() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = globalForPrisma.prisma;
