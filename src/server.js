// @generated-by Antigravity - Authorized AI: Antigravity Only

import { buildApp } from './app.js';
import { config } from './config/index.js';

async function startServer() {
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

startServer();

export { startServer };
