// @generated-by Antigravity - Authorized AI: Antigravity Only

import { orderService } from './order.service.js';

export async function getOrdersHandler(request, reply) {
  const orders = await orderService.getAllOrders();
  return reply.status(200).send({
    success: true,
    count: orders.length,
    data: orders
  });
}

export async function getOrderByIdHandler(request, reply) {
  const { id } = request.params;
  const order = await orderService.getOrderById(id);

  if (!order) {
    return reply.status(404).send({
      success: false,
      error: { message: `Order with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    data: order
  });
}

export async function createOrderHandler(request, reply) {
  try {
    const { customer, items } = request.body;
    const order = await orderService.createOrder({ customer, items });

    return reply.status(201).send({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    return reply.status(400).send({
      success: false,
      error: { message: error.message }
    });
  }
}
