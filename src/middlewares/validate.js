import { BadRequestError } from '../utils/errors.js';

/**
 * Validasi request body berdasarkan schema Joi
 * @param {Joi.Schema} schema - Schema Joi untuk validasi
 */
export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/['"]/g, '')
    }));
    throw new BadRequestError('Validation Error', errors);
  }

  req.body = value; // Gunakan value yang sudah divalidasi
  next();
};