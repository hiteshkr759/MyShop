// @generated-by Antigravity - Authorized AI: Antigravity Only
import app from './app.js';
import { config } from './config/index.js';

const server = app.listen(config.port, () => {
  console.log(`===============================================`);
  console.log(`🚀 ${config.shopName} Server is running`);
  console.log(`📡 URL: http://localhost:${config.port}`);
  console.log(`🏥 Health Check: http://localhost:${config.port}${config.apiPrefix}/health`);
  console.log(`🛍️  Products: http://localhost:${config.port}${config.apiPrefix}/products`);
  console.log(`⚙️  Environment: ${config.env}`);
  console.log(`🛡️  AI Guardrails: Active (Zero-Deletion, Scope Restricted)`);
  console.log(`===============================================`);
});

const handleShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`);
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

export default server;
