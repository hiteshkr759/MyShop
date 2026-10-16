// @generated-by Antigravity - Authorized AI: Antigravity Only

import { buildApp } from '../src/app.js';

let appInstance = null;

async function getApp() {
  if (!appInstance) {
    appInstance = await buildApp({
      logger: process.env.NODE_ENV === 'development'
    });
    await appInstance.ready();
  }
  return appInstance;
}

/**
 * Vercel Serverless Function entry point
 * Bridges incoming HTTP requests to the initialized Fastify application
 */
export default async function handler(req, res) {
  try {
    const app = await getApp();
    app.server.emit('request', req, res);
  } catch (error) {
    console.error('Fatal Serverless Function Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        error: {
          message: 'Internal Server Error',
          code: 'SERVERLESS_INVOCATION_FAILED',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }
      })
    );
  }
}
