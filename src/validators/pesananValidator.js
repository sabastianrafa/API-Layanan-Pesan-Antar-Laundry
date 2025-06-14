import Joi from 'joi';

export const createPesananSchema = Joi.object({
  layananId: Joi.number().integer().required(),
  berat_kg: Joi.number().min(0.1).max(20).required()
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid(
    'PENDING', 
    'ACCEPTED', 
    'REJECTED', 
    'IN_PROGRESS', 
    'COMPLETED'
  ).required()
});