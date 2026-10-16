// @generated-by Antigravity - Authorized AI: Antigravity Only

/**
 * Configures lifecycle hooks, error handling, and process signal handlers
 */
export function initLifecycle(app) {
  // Central 404 Handler
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      success: false,
      error: {
        message: `Route '${request.method} ${request.url}' not found`
      }
    });
  });

  // Central Error Handler
  app.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode || 500;
    app.log.error({
      err: error,
      url: request.url,
      method: request.method
    }, 'Request encountered error');

    reply.status(statusCode).send({
      success: false,
      error: {
        message: error.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { validation: error.validation })
      }
    });
  });

  // Graceful shutdown handling
  const signals = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      app.log.info({ signal }, 'Received termination signal, shutting down gracefully...');
      try {
        await app.close();
        app.log.info('Fastify application closed successfully.');
        process.exit(0);
      } catch (err) {
        app.log.error(err, 'Error during shutdown');
        process.exit(1);
      }
    });
  });
}
