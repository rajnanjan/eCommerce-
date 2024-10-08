import Joi from 'joi';

export const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required()
});

export const LoginMobileSchema = Joi.object({
  mobile_no: Joi.string().length(10).required()
});

export const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile_no: Joi.string().length(10).required()
});

export const verifyOtpSchema = Joi.object({
  mobile_no: Joi.string().length(10).required(),
  otp: Joi.number().integer().strict().required()
});
