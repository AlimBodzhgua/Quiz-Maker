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

export const completedTestCreateValidation = [
	body('testId').notEmpty(),
	body('testId').notEmpty(),
	body('correct').notEmpty().isNumeric(),
	body('incorrect').notEmpty().isNumeric(),
];

export const questionValidation = [
	body('_id').notEmpty().isString(),
	body('description').notEmpty().isString(),
	body('type').notEmpty().isString(),
	body('order').notEmpty().isNumeric(),
];

export const questionUpdateValidation = [
	body('description').optional().isString(),
	body('type').optional().isString(),
	body('order').optional().isNumeric(),
];

export const answerValidation = [
	body('value').notEmpty().isString(),
	body('isCorrect').notEmpty().isBoolean(),
	body('order').notEmpty().isNumeric(),
];