// @generated-by Antigravity - Authorized AI: Antigravity Only

import {
  getOrdersHandler,
  getOrderByIdHandler,
  createOrderHandler
} from './order.controller.js';
import {
  getOrdersSchema,
  getOrderByIdSchema,
  createOrderSchema
} from './order.schema.js';

export default async function orderRoutes(fastify) {
  fastify.get('/', { schema: getOrdersSchema }, getOrdersHandler);
  fastify.get('/:id', { schema: getOrderByIdSchema }, getOrderByIdHandler);
  fastify.post('/', { schema: createOrderSchema }, createOrderHandler);
}

