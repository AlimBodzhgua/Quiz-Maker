import { body, query } from 'express-validator';

export const registerValidation = [
	body('email').notEmpty().isEmail(),
	body('password').notEmpty().isString().isLength({ min: 6 }),
];

export const loginValidation = [
	body('email').notEmpty().isEmail(),
	body('password').notEmpty(),
];

export const quizCreateValidation = [
	body('title').notEmpty().isString().isLength({ min: 4 }),
	body('privacy').notEmpty().isString(),
	body('withTimer').optional().isBoolean(),
	body('timerLimit').optional().isObject(),
];

export const quizUpdateValidation = [
	body('title').optional().isString().isLength({ min: 4 }),
	body('privacy').optional().isString(),
	body('withTimer').optional().isBoolean(),
	body('timerLimit').optional().isObject(),
];

export const quizRemoveValidation = [
	body('quizId').notEmpty(),
];

export const completedQuizCreateValidation = [
	body('quizId').notEmpty(),
	body('quizTitle').notEmpty().isString(),
	body('correct').notEmpty().isNumeric(),
	body('incorrect').notEmpty().isNumeric(),
	body('timeResult').optional().isObject(),
	body('date').notEmpty().isString(),
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

export const quizzesQueryValidation = [
	query('privacy')
		.optional()
		.isIn(['public', 'private', 'privateLink', 'privateLinkPassword', 'privateUsers'])
		.withMessage(
			'Privacy value must be one of the following listed values: public, private, privateLink, privateLinkPassword, privateUsers',
		),
	query('authorId').optional().isString()
];

export const usersQueryValidation = [
	query('userId').optional().isString(),
];

export const rateQuizValidation = [
	body('rate').notEmpty().isNumeric(),
];