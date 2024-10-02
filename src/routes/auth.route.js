import express from 'express';
import { login } from '../controllers/auth.controller.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/login', login);
// router.post("/login-via-mobile",)

export default router;
