
import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { registerUserSchema, loginUserSchema } from '../middleware/validators/user.validator.js';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUser);
router.post('/login', loginUser);

export default router;
