import express from 'express';
import { login, loginViaMobile, signUp, verifyByOTP } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/joi.middleware.js';
import {
  LoginMobileSchema,
  loginSchema,
  signupSchema,
  verifyOtpSchema
} from '../validationschema/auth.schema.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/login-via-mobile', validate(LoginMobileSchema), loginViaMobile);
router.post('/verify-otp', validate(verifyOtpSchema), verifyByOTP);
router.post('/sign-up', validate(signupSchema), signUp);

export default router;
