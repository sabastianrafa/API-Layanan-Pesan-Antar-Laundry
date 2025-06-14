import Joi from 'joi';

export const createLayananSchema = Joi.object({
  nama: Joi.string().max(100).required(),
  harga_kg: Joi.number().min(1000).required()
});

export const updateLayananSchema = Joi.object({
  nama: Joi.string().max(100),
  harga_kg: Joi.number().min(1000)
}).min(1); // Minimal 1 field di-update