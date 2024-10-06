import { Router } from 'express';
import { loginValidation, registerValidation } from '../validations/validations';
import * as UserController from '../controllers/UserController';

const router = Router();

// /users
router.post('/registration', registerValidation, UserController.register);
router.post('/login', loginValidation, UserController.login);

export default router;