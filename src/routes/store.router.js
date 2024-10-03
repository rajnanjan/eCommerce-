import { Router } from "express";
import {validate} from '../middlewares/joi.middleware.js';
import {addStore} from '../controllers/store.controller.js';
import {storevalidate} from '../validationschema/store.schema.js';
const router = new Router();

router.post('/add',validate(storevalidate),addStore);

export default router;


