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

export async function initPlugins(app) {
  // CORS configuration allowing cross-origin client access
  await app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  });

  // Security Headers with relaxed CSP for Swagger UI & local image assets
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io', 'blob:', 'https:']
      }
    }
  });

  // Sensible default error utilities (httpErrors, etc.)
  await app.register(fastifySensible);

  // Multipart form-data parser for saree image uploads (10MB limit, up to 10 files)
  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
      files: 10
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
  } catch {
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
}