// @generated-by Antigravity - Authorized AI: Antigravity Only
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  env: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  shopName: process.env.SHOP_NAME || 'MyShop',
  defaultCurrency: process.env.DEFAULT_CURRENCY || 'USD',
  isDev: (process.env.NODE_ENV || 'development') === 'development'
};
