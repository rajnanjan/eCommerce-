import express from 'express';
import { login } from '../controllers/user.controller.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/login', login);

export default router;
