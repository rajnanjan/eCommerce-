import { Router } from 'express';
import { validate_product } from '../validationschema/products.schema.js';
import { validate } from '../middlewares/joi.middleware.js';
import { addProduct,getProduts } from '../controllers/product.controller.js';

const router = new Router();

router.post('/create', validate(validate_product), addProduct);
router.get('/get',getProduts);

export default router;
