// @generated-by Antigravity - Authorized AI: Antigravity Only

import { productService } from './product.service.js';

export async function getProductsHandler(request, reply) {
  const products = await productService.getProducts(request.query);

  return reply.status(200).send({
    success: true,
    count: products.length,
    data: products
  });
}

export async function getProductByIdHandler(request, reply) {
  const { id } = request.params;
  const product = await productService.getProductById(id);

  if (!product) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    data: product
  });
}

export async function createProductHandler(request, reply) {
  const {
    name,
    costPrice,
    sellingPrice,
    price,
    categoryId,
    stock,
    fabric,
    weave,
    color,
    blousePiece,
    description,
    tags
  } = request.body;

  const created = await productService.createProduct({
    name,
    costPrice,
    sellingPrice,
    price,
    categoryId,
    stock,
    fabric,
    weave,
    color,
    blousePiece,
    description,
    tags
  });

  return reply.status(201).send({
    success: true,
    message: 'Product created successfully',
    data: created
  });
}

export async function updateProductHandler(request, reply) {
  const { id } = request.params;
  const updated = await productService.updateProduct(id, request.body);

  if (!updated) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    message: 'Product updated successfully',
    data: updated
  });
}

export async function archiveProductHandler(request, reply) {
  const { id } = request.params;
  const archived = await productService.archiveProduct(id);

  if (!archived) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    message: 'Product archived successfully (Zero-Deletion Guardrail preserved)',
    data: archived
  });
}
