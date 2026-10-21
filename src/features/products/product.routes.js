// @generated-by Antigravity - Authorized AI: Antigravity Only

import {
  getProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  archiveProductHandler,
  unarchiveProductHandler,
  uploadProductImageHandler,
  uploadStandaloneImageHandler,
  createVariantHandler,
  updateVariantHandler,
  archiveVariantHandler,
  uploadVariantImagesHandler
} from './product.controller.js';

import {
  getProductsSchema,
  getProductByIdSchema,
  createProductSchema,
  updateProductSchema,
  archiveProductSchema,
  unarchiveProductSchema,
  uploadProductImageSchema,
  uploadStandaloneImageSchema,
  createVariantSchema,
  updateVariantSchema,
  archiveVariantSchema,
  uploadVariantImagesSchema
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
  fastify.patch('/:id/unarchive', { schema: unarchiveProductSchema }, unarchiveProductHandler);

  // 3. Product image upload & attachment endpoints
  fastify.post('/:id/upload-image', { schema: uploadProductImageSchema }, uploadProductImageHandler);
  fastify.post('/:id/image', { schema: uploadProductImageSchema }, uploadProductImageHandler);

  // 4. Color Variant & Multi-Photo Gallery endpoints
  fastify.post('/:id/variants', { schema: createVariantSchema }, createVariantHandler);
  fastify.put('/:id/variants/:variantId', { schema: updateVariantSchema }, updateVariantHandler);
  fastify.delete('/:id/variants/:variantId', { schema: archiveVariantSchema }, archiveVariantHandler);
  fastify.post('/:id/variants/:variantId/images', { schema: uploadVariantImagesSchema }, uploadVariantImagesHandler);
}
