import express from 'express';
import {
  getAllLayananController,
  createLayananController,
  updateLayananController,
  deleteLayananController
} from '../controllers/layananController.js';
import { validate } from '../middlewares/validate.js';
import { createLayananSchema, updateLayananSchema } from '../validators/layananValidator.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllLayananController);

// Admin-only routes
router.post('/', authenticate, isAdmin, validate(createLayananSchema), createLayananController);
router.put('/:id', authenticate, isAdmin, validate(updateLayananSchema), updateLayananController);
router.delete('/:id', authenticate, isAdmin, deleteLayananController);

export default router;