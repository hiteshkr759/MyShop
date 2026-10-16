// @generated-by Antigravity - Authorized AI: Antigravity Only

import { getDatabase } from '../../bootstrap/database.js';
import { customerService } from '../customers/customer.service.js';

export class OrderService {
  constructor(db) {
    this.db = db || getDatabase();
  }

  async getAllOrders() {
    return this.db.order.findMany({
      where: { deletedAt: null },
      include: {
        customer: true,
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getOrderById(id) {
    return this.db.order.findFirst({
      where: { id, deletedAt: null },
      include: {
        customer: true,
        items: {
          include: { product: true }
        }
      }
    });
  }

  /**
   * Places an order atomically with inventory deduction using Prisma transactions
   */
  async createOrder({ customer, items }) {
    return this.db.$transaction(async (tx) => {
      let calculatedTotal = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product || product.deletedAt !== null) {
          throw new Error(`Product '${item.productId}' not found or inactive`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product '${product.name}' (Available: ${product.stock}, Requested: ${item.quantity})`);
        }

        // Deduct inventory atomically - ensure stock never drops below 0
        const updatedProduct = await tx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });

        if (updatedProduct.stock < 0) {
          throw new Error(`Stock deduction violation: stock cannot be negative for '${product.name}'`);
        }

        const unitPrice = product.sellingPrice || product.price || 0;
        const itemTotal = Number((unitPrice * item.quantity).toFixed(2));
        calculatedTotal += itemTotal;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          unitPrice,
          itemTotal
        });
      }

      // Identify or register customer via phone number
      let customerRecord = null;
      if (customer.phone) {
        customerRecord = await customerService.upsertCustomerForOrder(tx, {
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          area: customer.area
        });
      }

      // Create Order and nested OrderItems
      const order = await tx.order.create({
        data: {
          customerId: customerRecord ? customerRecord.id : null,
          customerName: customer.name,
          customerEmail: customer.email || null,
          customerPhone: customer.phone || null,
          deliveryAddress: customer.address || (customerRecord ? customerRecord.address : null),
          deliveryArea: customer.area || (customerRecord ? customerRecord.area : null),
          totalAmount: Number(calculatedTotal.toFixed(2)),
          status: 'confirmed',
          items: {
            create: orderItemsData
          }
        },
        include: {
          items: {
            include: { product: true }
          },
          customer: true
        }
      });

      return order;
    });
  }
}

export const orderService = new OrderService();

