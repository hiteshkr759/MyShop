// @generated-by Antigravity - Authorized AI: Antigravity Only

import { config } from '../../config/index.js';

export async function getHealthHandler(request, reply) {
  return reply.status(200).send({
    success: true,
    data: {
      status: 'UP',
      app: config.shopName,
      environment: config.env,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    }
  });
}

