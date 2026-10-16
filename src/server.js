// @generated-by Antigravity - Authorized AI: Antigravity Only

import { fileURLToPath } from 'url';
import path from 'path';
import { buildApp } from './app.js';
import { config } from './config/index.js';

let appInstance = null;

/**
 * Retrieves or initializes the cached Fastify instance for serverless invocations
 */
export async function getServerlessApp() {
  if (!appInstance) {
    appInstance = await buildApp({
      logger: process.env.NODE_ENV === 'development'
    });
    await appInstance.ready();
  }
  return appInstance;
}

/**
 * Starts standalone HTTP server listening on configured port (Local / Docker / PM2)
 */
export async function startServer() {
  try {
    const app = await buildApp();

    await app.listen({
      port: config.port,
      host: '0.0.0.0'
    });

    console.log(`===============================================`);
    console.log(`🚀 ${config.shopName} Fastify Server is running`);
    console.log(`📡 URL: http://localhost:${config.port}`);
    console.log(`📖 Swagger Docs: http://localhost:${config.port}/docs`);
    console.log(`🏥 Health Check: http://localhost:${config.port}${config.apiPrefix}/health`);
    console.log(`🛍️  Products: http://localhost:${config.port}${config.apiPrefix}/products`);
    console.log(`📁 Architecture: Feature-Wise with Central Bootstrap`);
    console.log(`🗄️  Database: Prisma ORM (Supabase PostgreSQL)`);
    console.log(`⚙️  Environment: ${config.env}`);
    console.log(`🛡️  AI Guardrails: Active (Zero-Deletion, Scope Restricted)`);
    console.log(`===============================================`);

    return app;
  } catch (err) {
    console.error('Fatal error starting Fastify server:', err);
    process.exit(1);
  }
}

/**
 * Default export required by Vercel Serverless Functions
 * Bridges incoming HTTP requests (req, res) directly to the Fastify application
 */
export default async function handler(req, res) {
  try {
    const app = await getServerlessApp();
    app.server.emit('request', req, res);
  } catch (error) {
    console.error('Fatal Serverless Function Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        error: {
          message: 'Internal Server Error',
          code: 'SERVERLESS_FUNCTION_ERROR',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }
      })
    );
  }
}

// Auto-start server ONLY when executed directly via node (not when imported by Vercel or tests)
if (!process.env.VERCEL) {
  const currentFilePath = fileURLToPath(import.meta.url);
  const executedFilePath = process.argv[1] ? path.resolve(process.argv[1]) : '';
  if (executedFilePath && currentFilePath === executedFilePath) {
    startServer();
  }
}
