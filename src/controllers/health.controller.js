import { config } from '../config/index.js';

export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'UP',
      app: config.shopName,
      environment: config.env,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    }
  });
};
