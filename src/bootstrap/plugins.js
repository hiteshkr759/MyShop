// @generated-by Antigravity - Authorized AI: Antigravity Only

import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifySensible from '@fastify/sensible';
import { initDatabase } from './database.js';
import { initSupabase } from './supabase.js';

/**
 * Initializes and registers shared Fastify integration plugins
 * Enforces security headers, CORS, error helpers, and database decoration
 */
export async function initPlugins(app) {
  // Security headers via Helmet
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: process.env.NODE_ENV === 'production'
  });

  // CORS configuration
  await app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  });

  // Sensible default error utilities (httpErrors, etc.)
  await app.register(fastifySensible);

  // Initialize and decorate shared Prisma database client
  const db = initDatabase(app);
  app.decorate('db', db);

  // Initialize and decorate shared Supabase SDK client
  initSupabase(app);

  app.log.info('Shared plugins and integration resources initialized.');
}

