import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  alamat: Joi.string().max(255).allow('').optional(),
  telepon: Joi.string().pattern(/^[0-9]+$/).max(20).allow('').optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});