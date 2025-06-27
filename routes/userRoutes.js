import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser
} from '../controllers/user.controller.js';

import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/role.middleware.js';

import {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  
} from '../middleware/validators/user.validator.js';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUser);
router.post('/login', validate(loginUserSchema), loginUser);

//Protect all routes below this line with authentication
router.use(authenticate);

// Admin-Only Routes

router.get('/',authorizeRole('admin'),authenticate, getAllUsers);
router.get('/:id', authorizeRole('admin'), getUserById);
router.put('/:id', authorizeRole('admin'), validate(updateUserSchema), updateUser);
router.delete('/:id', authorizeRole('admin'), deleteUser);


export default router;