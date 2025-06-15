import express from 'express';
import {
  getProfileController,
  updateProfileController,
  changePasswordController,
  getAllUsersController,
  updateUserRoleController
} from '../controllers/userController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import {
  updateProfileSchema,
  changePasswordSchema,
  updateRoleSchema
} from '../validators/userValidator.js';

const router = express.Router();

// User routes
router.get('/me', authenticate, getProfileController);
router.put('/me', authenticate, validate(updateProfileSchema), updateProfileController);
router.put('/change-password', authenticate, validate(changePasswordSchema), changePasswordController);

// Admin routes
router.get('/admin/users', authenticate, isAdmin, getAllUsersController);
router.put('/admin/users/:id/role', authenticate, isAdmin, validate(updateRoleSchema), updateUserRoleController);

export default router;