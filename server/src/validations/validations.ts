import { body } from 'express-validator';

export const registerValidation = [
	body('email').notEmpty().isEmail(),
	body('password').notEmpty().isString().isLength({ min: 6 }),
];

export const loginValidation = [
	body('email').notEmpty().isEmail(),
	body('password').notEmpty(),
];

export const testCreateValidation = [
	body('title').notEmpty().isString().isLength({ min: 4 }),
];

export const testRemoveValidation = [
	body('testId').notEmpty(),
];

export const questionValidation = [
	body('description').notEmpty().isString(),
	body('type').notEmpty().isString(),
	body('order').notEmpty().isNumeric(),
];

export const answerValidation = [
	body('value').notEmpty().isString(),
	body('isCorrect').notEmpty().isBoolean(),
	body('order').notEmpty().isNumeric(),
];