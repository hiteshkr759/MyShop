import { shopService } from '../services/shop.service.js';

export const getOrders = (req, res) => {
  const orders = shopService.getOrders();
  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
};

export const getOrderById = (req, res, next) => {
  try {
    const { id } = req.params;
    const order = shopService.getOrderById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: `Order with ID '${id}' not found` }
      });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = (req, res, next) => {
  try {
    const { customer, items } = req.body;

    if (!customer?.name || !customer?.email) {
      return res.status(400).json({
        success: false,
        error: { message: 'Customer name and email are required' }
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Order must contain at least one item' }
      });
    }

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          error: { message: 'Each item must have a valid productId and quantity >= 1' }
        });
      }
    }

    const order = shopService.createOrder({ customer, items });
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message }
    });
  }
};
