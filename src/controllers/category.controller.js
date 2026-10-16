// @generated-by Antigravity - Authorized AI: Antigravity Only
import { shopService } from '../services/shop.service.js';

export const getCategories = (req, res) => {
  const categories = shopService.getCategories();
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
};

export const getCategoryById = (req, res, next) => {
  try {
    const { id } = req.params;
    const category = shopService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: { message: `Category with ID '${id}' not found` }
      });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};
