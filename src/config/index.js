// @generated-by Antigravity - Authorized AI: Antigravity Only
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load base .env first
dotenv.config();

// Priority: If .env.local exists, override with local development variables
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
}

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  env: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  shopName: process.env.SHOP_NAME || 'MyShop',
  defaultCurrency: process.env.DEFAULT_CURRENCY || 'INR',
  isDev: (process.env.NODE_ENV || 'development') === 'development'
};
