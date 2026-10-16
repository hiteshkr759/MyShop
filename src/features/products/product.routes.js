// @generated-by Antigravity - Authorized AI: Antigravity Only

import {
  getProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  archiveProductHandler
} from './product.controller.js';
import {
  getProductsSchema,
  getProductByIdSchema,
  createProductSchema,
  updateProductSchema,
  archiveProductSchema
} from './product.schema.js';

export default async function productRoutes(fastify) {
  fastify.get('/', { schema: getProductsSchema }, getProductsHandler);
  fastify.get('/:id', { schema: getProductByIdSchema }, getProductByIdHandler);
  fastify.post('/', { schema: createProductSchema }, createProductHandler);
  fastify.put('/:id', { schema: updateProductSchema }, updateProductHandler);
  fastify.patch('/:id/archive', { schema: archiveProductSchema }, archiveProductHandler);
}
