// @generated-by Antigravity - Authorized AI: Antigravity Only

import { categoryService } from './category.service.js';

export async function getCategoriesHandler(request, reply) {
  const categories = await categoryService.getAllCategories();
  return reply.status(200).send({
    success: true,
    count: categories.length,
    data: categories
  });
}

export async function getCategoryByIdHandler(request, reply) {
  const { id } = request.params;
  const category = await categoryService.getCategoryById(id);

  if (!category) {
    return reply.status(404).send({
      success: false,
      error: { message: `Category with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    data: category
  });
}

export async function createCategoryHandler(request, reply) {
  const { name, description } = request.body;
  const created = await categoryService.createCategory({ name, description });

  return reply.status(201).send({
    success: true,
    message: 'Category created successfully',
    data: created
  });
}

