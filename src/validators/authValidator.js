import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  alamat: Joi.string().allow('').optional(),
  telepon: Joi.string().pattern(/^[0-9]+$/).allow('').optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email harus format valid',
    'any.required': 'Email harus diisi'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password harus diisi'
  })
});