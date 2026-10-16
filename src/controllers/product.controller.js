// @generated-by Antigravity - Authorized AI: Antigravity Only
import { shopService } from '../services/shop.service.js';

export const getProducts = (req, res) => {
  const { search, categoryId, minPrice, maxPrice } = req.query;
  const products = shopService.getProducts({ search, categoryId, minPrice, maxPrice });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
};

export const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = shopService.getProductById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: { message: `Product with ID '${id}' not found` }
      });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = (req, res, next) => {
  try {
    const { name, price, categoryId, stock, description, tags } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        error: { message: 'Fields "name" and "price" are required' }
      });
    }

    const created = shopService.createProduct({ name, price, categoryId, stock, description, tags });
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = shopService.updateProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { message: `Product with ID '${id}' not found` }
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// Non-destructive soft archive
export const archiveProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const archived = shopService.archiveProduct(id);
    if (!archived) {
      return res.status(404).json({
        success: false,
        error: { message: `Product with ID '${id}' not found` }
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product archived successfully (Zero-Deletion Guardrail preserved)',
      data: archived
    });
  } catch (error) {
    next(error);
  }
};
