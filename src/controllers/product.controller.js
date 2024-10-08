import { createProduct } from './../services/product.service.js';

export const addProduct = async (req, res, next) => {
  try {
    const request = { ...req.body };
    const response = await createProduct(request);
    return res.status(200).json({ status: true, data: response });
  } catch (error) {
    next(error);
  }
};
