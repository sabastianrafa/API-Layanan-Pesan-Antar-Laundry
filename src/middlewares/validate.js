import { BadRequestError } from '../utils/errors.js';

/**
 * Validasi request body berdasarkan schema Joi
 * @param {Joi.Schema} schema - Schema Joi untuk validasi
 */
export const validate = (schema) => (req, res, next) => {
  // Periksa jika Content-Type adalah JSON
  if (!req.is('application/json')) {
    return res.status(400).json({
      success: false,
      message: 'Content-Type harus application/json',
      errors: []
    });
  }

  // Biarkan Joi yang menangani validasi body kosong
  const { error, value } = schema.validate(req.body || {}, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: false
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/['"]/g, '')
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }

  req.body = value;
  next();
};