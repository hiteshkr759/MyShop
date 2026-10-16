// @generated-by Antigravity - Authorized AI: Antigravity Only

import { getDatabase } from '../../bootstrap/database.js';

export class CategoryService {
  constructor(db) {
    this.db = db || getDatabase();
  }

  async getAllCategories() {
    return this.db.category.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' }
    });
  }

  async getCategoryById(id) {
    return this.db.category.findFirst({
      where: { id, deletedAt: null }
    });
  }

  async createCategory(data) {
    return this.db.category.create({
      data: {
        name: data.name,
        description: data.description || ''
      }
    });
  }

  // Soft delete respecting zero-deletion policy
  async softDeleteCategory(id) {
    return this.db.category.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}

export const categoryService = new CategoryService();
