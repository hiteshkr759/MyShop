// @generated-by Antigravity - Authorized AI: Antigravity Only

import {
  getCustomersSchema,
  getCustomerByIdSchema,
  getCustomerByPhoneSchema,
  createCustomerSchema,
  updateCustomerSchema,
  deleteCustomerSchema
} from './customer.schema.js';

import {
  getCustomersHandler,
  getCustomerByIdHandler,
  getCustomerByPhoneHandler,
  createCustomerHandler,
  updateCustomerHandler,
  deleteCustomerHandler
} from './customer.controller.js';

export default async function customerRoutes(fastify, options) {
  fastify.get('/', { schema: getCustomersSchema }, getCustomersHandler);
  fastify.post('/', { schema: createCustomerSchema }, createCustomerHandler);
  fastify.get('/phone/:phone', { schema: getCustomerByPhoneSchema }, getCustomerByPhoneHandler);
  fastify.get('/:id', { schema: getCustomerByIdSchema }, getCustomerByIdHandler);
  fastify.put('/:id', { schema: updateCustomerSchema }, updateCustomerHandler);
  fastify.delete('/:id', { schema: deleteCustomerSchema }, deleteCustomerHandler);
}

