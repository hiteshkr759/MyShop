// @generated-by Antigravity - Authorized AI: Antigravity Only

import path from 'path';
import fs from 'fs';
import os from 'os';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifySensible from '@fastify/sensible';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { initDatabase } from './database.js';
import { initSupabase } from './supabase.js';
import { initSwagger } from './swagger.js';

/**
 * Initializes and registers shared Fastify integration plugins
 * Enforces security headers, CORS, error helpers, file uploads, and database decoration
 */
export async function initPlugins(app) {
  // Security headers via Helmet (configured to allow Swagger UI and cross-origin image embedding)
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  });

  // CORS configuration
  await app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  });

  // Sensible default error utilities (httpErrors, etc.)
  await app.register(fastifySensible);

  // Multipart form-data parser for saree image uploads (10MB limit)
  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
      files: 5
    }
  });

  // Resolve uploads directory safely (using os.tmpdir() on Vercel/serverless environments)
  let uploadsDir = process.env.VERCEL
    ? path.join(os.tmpdir(), 'uploads')
    : path.resolve(process.cwd(), 'public', 'uploads');

  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (err) {
    // Fallback to os.tmpdir() on read-only serverless platforms
    uploadsDir = path.join(os.tmpdir(), 'uploads');
    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
    } catch {
      // Do not crash serverless cold start
    }
  }

  // Static file serving for uploaded images at /uploads/
  if (fs.existsSync(uploadsDir)) {
    await app.register(fastifyStatic, {
      root: uploadsDir,
      prefix: '/uploads/'
    });
  }

  // Initialize and decorate shared Prisma database client
  const db = initDatabase(app);
  app.decorate('db', db);

  // Initialize and decorate shared Supabase SDK client
  initSupabase(app);

  // Initialize Swagger OpenAPI specification & Swagger UI
  await initSwagger(app);

  app.log.info('Shared plugins, database, static uploads, and Swagger documentation initialized.');
}
