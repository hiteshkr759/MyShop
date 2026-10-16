// @generated-by Antigravity - Authorized AI: Antigravity Only

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { config } from '../config/index.js';

/**
 * Initializes Swagger / OpenAPI documentation and UI
 */
export async function initSwagger(app) {
  // 1. Register OpenAPI generator
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: `${config.shopName} RESTful API`,
        description: 'E-Commerce Backend API documentation built with Fastify, Prisma, and Supabase',
        version: '1.0.0',
        contact: {
          name: 'MyShop Development Team'
        }
      },
      servers: [
        {
          url: `http://localhost:${config.port}`,
          description: 'Local Development Server'
        }
      ],
      tags: [
        { name: 'Health', description: 'Application health and diagnostic checks' },
        { name: 'Categories', description: 'Product category catalog operations' },
        { name: 'Products', description: 'Product catalog browsing, creation, and soft-archival' },
        { name: 'Orders', description: 'Order checkout and atomic inventory operations' }
      ]
    }
  });

  // 2. Register interactive Swagger UI served at /docs and /documentation
  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
      displayRequestDuration: true
    },
    staticCSP: true,
    transformStaticCSP: (header) => header
  });

  app.log.info('Swagger OpenAPI documentation initialized at /docs');
}

