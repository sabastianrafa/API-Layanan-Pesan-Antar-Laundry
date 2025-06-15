import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  alamat: Joi.string().allow('').optional(),
  telepon: Joi.string().pattern(/^[0-9]+$/).allow('').optional()
}).min(1);

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});

export const updateRoleSchema = Joi.object({
  role: Joi.string().valid('USER', 'ADMIN').required()
});