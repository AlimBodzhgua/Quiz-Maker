import { Router } from 'express';
import { loginValidation, registerValidation, usersQueryValidation } from '../validations/validations';
import * as UserController from '../controllers/UserController';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

// /users
router.get('/', usersQueryValidation, UserController.getUsers);
router.get('/auth/me', requireAuth, UserController.getMe),
router.post('/registration', registerValidation, UserController.register);
router.post('/login', loginValidation, UserController.login);

export default router;