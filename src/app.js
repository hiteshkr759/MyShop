// @generated-by Antigravity - Authorized AI: Antigravity Only

import { bootstrapApp } from './bootstrap/index.js';

/**
 * Builds and initializes the Fastify application using the central bootstrap module
 */
export async function buildApp(options = {}) {
  const app = await bootstrapApp(options);
  return app;
}

export default buildApp;
