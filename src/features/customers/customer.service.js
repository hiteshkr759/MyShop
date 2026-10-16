// @generated-by Antigravity - Authorized AI: Antigravity Only

import { getDatabase } from '../../bootstrap/database.js';

export class CustomerService {
  constructor(db) {
    this.db = db || getDatabase();
  }

  /**
   * Cleans/standardizes phone numbers by trimming whitespace
   */
  normalizePhoneNumber(phone) {
    if (!phone) return '';
    return phone.trim();
  }

  /**
   * Retrieves all active customers with search/filter and order metrics
   */
  async getCustomers({ search, area } = {}) {
    const where = { deletedAt: null };

    if (area) {
      where.area = { contains: area, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search } },
        { area: { contains: search, mode: 'insensitive' } }
      ];
    }

    const customers = await this.db.customer.findMany({
      where,
      include: {
        orders: {
          where: { deletedAt: null },
          select: {
            id: true,
            totalAmount: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return customers.map(customer => {
      const orderCount = customer.orders.length;
      const totalSpend = customer.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const { orders, ...rest } = customer;
      return {
        ...rest,
        orderCount,
        totalSpend: Number(totalSpend.toFixed(2))
      };
    });
  }

  /**
   * Retrieves single customer by ID with complete past order details
   */
  async getCustomerById(id) {
    return this.db.customer.findFirst({
      where: { id, deletedAt: null },
      include: {
        orders: {
          where: { deletedAt: null },
          orderBy: { createdAt: 'desc' },
          include: {
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    sellingPrice: true,
                    color: true,
                    fabric: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  /**
   * Retrieves single customer by phone number with complete past order details
   */
  async getCustomerByPhone(phone) {
    const normalizedPhone = this.normalizePhoneNumber(phone);
    return this.db.customer.findFirst({
      where: {
        phoneNumber: normalizedPhone,
        deletedAt: null
      },
      include: {
        orders: {
          where: { deletedAt: null },
          orderBy: { createdAt: 'desc' },
          include: {
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    sellingPrice: true,
                    color: true,
                    fabric: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  /**
   * Creates a new customer or reactivates soft-deleted record with the same phone
   */
  async createCustomer({ name, phoneNumber, address, area }) {
    const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

    const existing = await this.db.customer.findUnique({
      where: { phoneNumber: normalizedPhone }
    });

    if (existing) {
      if (existing.deletedAt === null) {
        throw new Error(`A customer with phone number '${normalizedPhone}' already exists.`);
      }

      // Reactivate previously soft-deleted customer record with updated details
      return this.db.customer.update({
        where: { id: existing.id },
        data: {
          name,
          address: address || existing.address,
          area: area || existing.area,
          deletedAt: null
        },
        include: {
          orders: {
            where: { deletedAt: null },
            include: { items: true }
          }
        }
      });
    }

    return this.db.customer.create({
      data: {
        name,
        phoneNumber: normalizedPhone,
        address: address || null,
        area: area || null
      },
      include: {
        orders: true
      }
    });
  }

  /**
   * Finds or creates a customer for seamless order processing
   */
  async upsertCustomerForOrder(tx, { name, phone, address, area }) {
    const normalizedPhone = this.normalizePhoneNumber(phone);
    const client = tx || this.db;

    const existing = await client.customer.findUnique({
      where: { phoneNumber: normalizedPhone }
    });

    if (existing) {
      // Update contact / address details if provided
      return client.customer.update({
        where: { id: existing.id },
        data: {
          name: name || existing.name,
          address: address || existing.address,
          area: area || existing.area,
          deletedAt: null
        }
      });
    }

    return client.customer.create({
      data: {
        name,
        phoneNumber: normalizedPhone,
        address: address || null,
        area: area || null
      }
    });
  }

  /**
   * Updates customer profile
   */
  async updateCustomer(id, { name, phoneNumber, address, area }) {
    const customer = await this.db.customer.findFirst({
      where: { id, deletedAt: null }
    });

    if (!customer) {
      throw new Error(`Customer with ID '${id}' not found.`);
    }

    const data = {};
    if (name !== undefined) data.name = name;
    if (address !== undefined) data.address = address;
    if (area !== undefined) data.area = area;

    if (phoneNumber !== undefined) {
      const normalizedPhone = this.normalizePhoneNumber(phoneNumber);
      if (normalizedPhone !== customer.phoneNumber) {
        const phoneConflict = await this.db.customer.findUnique({
          where: { phoneNumber: normalizedPhone }
        });
        if (phoneConflict && phoneConflict.id !== id) {
          throw new Error(`Another customer with phone number '${normalizedPhone}' already exists.`);
        }
        data.phoneNumber = normalizedPhone;
      }
    }

    return this.db.customer.update({
      where: { id },
      data,
      include: {
        orders: {
          where: { deletedAt: null },
          orderBy: { createdAt: 'desc' },
          include: {
            items: {
              include: { product: true }
            }
          }
        }
      }
    });
  }

  /**
   * Soft-deletes a customer (preserves order integrity under Zero-Deletion Directive)
   */
  async deleteCustomer(id) {
    const customer = await this.db.customer.findFirst({
      where: { id, deletedAt: null }
    });

    if (!customer) {
      throw new Error(`Customer with ID '${id}' not found.`);
    }

    await this.db.customer.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    return true;
  }
}

export const customerService = new CustomerService();

