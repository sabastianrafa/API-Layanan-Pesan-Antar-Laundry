import express from 'express';
import {
  createPesananController,
  getPesananUserController,
  getAllPesananController,
  updateStatusController
} from '../controllers/pesananController.js';
import { validate } from '../middlewares/validate.js';
import { 
  createPesananSchema,
  updateStatusSchema
} from '../validators/pesananValidator.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', 
  authenticate, 
  validate(createPesananSchema), 
  createPesananController
);

router.get('/me', 
  authenticate, 
  getPesananUserController
);

// Admin routes
router.get('/', 
  authenticate, 
  isAdmin, 
  getAllPesananController
);

router.put('/:id/status', 
  authenticate, 
  isAdmin, 
  validate(updateStatusSchema), 
  updateStatusController
);

export default router;