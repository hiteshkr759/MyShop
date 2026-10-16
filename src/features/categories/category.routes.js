// @generated-by Antigravity - Authorized AI: Antigravity Only

import {
  getCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler
} from './category.controller.js';
import {
  getCategoriesSchema,
  getCategoryByIdSchema,
  createCategorySchema
} from './category.schema.js';

export default async function categoryRoutes(fastify) {
  fastify.get('/', { schema: getCategoriesSchema }, getCategoriesHandler);
  fastify.get('/:id', { schema: getCategoryByIdSchema }, getCategoryByIdHandler);
  fastify.post('/', { schema: createCategorySchema }, createCategoryHandler);
}
