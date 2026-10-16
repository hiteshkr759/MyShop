// @generated-by Antigravity - Authorized AI: Antigravity Only

import { getHealthHandler } from './health.controller.js';
import { healthSchema } from './health.schema.js';

export default async function healthRoutes(fastify) {
  fastify.get('/', { schema: healthSchema }, getHealthHandler);
}
