// @generated-by Antigravity - Authorized AI: Antigravity Only

import {
  getProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  archiveProductHandler,
  uploadProductImageHandler,
  uploadStandaloneImageHandler
} from './product.controller.js';

import {
  getProductsSchema,
  getProductByIdSchema,
  createProductSchema,
  updateProductSchema,
  archiveProductSchema,
  uploadProductImageSchema,
  uploadStandaloneImageSchema
} from './product.schema.js';

export default async function productRoutes(fastify) {
  // 1. Standalone image upload (e.g. before product creation)
  fastify.post('/upload-image', { schema: uploadStandaloneImageSchema }, uploadStandaloneImageHandler);

  // 2. Core product CRUD endpoints
  fastify.get('/', { schema: getProductsSchema }, getProductsHandler);
  fastify.get('/:id', { schema: getProductByIdSchema }, getProductByIdHandler);
  fastify.post('/', { schema: createProductSchema }, createProductHandler);
  fastify.put('/:id', { schema: updateProductSchema }, updateProductHandler);
  fastify.patch('/:id/archive', { schema: archiveProductSchema }, archiveProductHandler);

  // 3. Product image upload & attachment endpoints
  fastify.post('/:id/upload-image', { schema: uploadProductImageSchema }, uploadProductImageHandler);
  fastify.post('/:id/image', { schema: uploadProductImageSchema }, uploadProductImageHandler);
}
