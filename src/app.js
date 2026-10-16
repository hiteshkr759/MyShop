import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/index.js';
import apiRoutes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.env !== 'test') {
  app.use(morgan(config.isDev ? 'dev' : 'combined'));
}

// Root landing endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to ${config.shopName} API`,
    documentation: {
      health: `${config.apiPrefix}/health`,
      products: `${config.apiPrefix}/products`,
      categories: `${config.apiPrefix}/categories`,
      orders: `${config.apiPrefix}/orders`
    },
    version: '1.0.0'
  });
});

// Mount API routes
app.use(config.apiPrefix, apiRoutes);

// 404 & Central Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
