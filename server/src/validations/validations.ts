import { body } from "express-validator";

export const registerValidation = [
	body('email').notEmpty().isEmail(),
	body('password').notEmpty().isString().isLength({ min: 6 }),
];

export const loginValidation = [
	body('email').notEmpty().isEmail(),
	body('password').notEmpty(),
];