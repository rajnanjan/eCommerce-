import imageupload from '../middlewares/multer.middleware.js';
import { validateImages, validateQuery } from '../middlewares/joi.middleware.js';
import { imageget, imagesadd } from '../controllers/productsimages.controller.js';
import { getimage, uploadimages } from '../validationschema/productsimages.schema.js';
import { Router } from 'express';
const router = new Router();
router.post('/attach', imageupload, validateImages(uploadimages), imagesadd);
router.get('/get', validateQuery(getimage), imageget);

export default router;
